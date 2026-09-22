import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-provision-secret",
};

// Keeps only digits, so "052-710-8219" / "+972 52 710 8219" all become the same password.
const normalizePhone = (raw: string) => raw.replace(/\D/g, "");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ── Shared-secret check ──────────────────────────────────────
    // This endpoint creates real login accounts, so it must not be callable
    // by anyone who finds the URL. Set PROVISION_SECRET as a Supabase secret,
    // and send the same value as the "x-provision-secret" header from Base44.
    const expectedSecret = Deno.env.get("PROVISION_SECRET");
    const providedSecret = req.headers.get("x-provision-secret");
    if (!expectedSecret || providedSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { name, email, phone } = await req.json();

    if (!email || !phone) {
      return new Response(JSON.stringify({ error: "email and phone are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const password = normalizePhone(String(phone));

    if (password.length < 6) {
      return new Response(JSON.stringify({ error: "phone number too short to use as a password" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // ── Create the login, or reset the password if the client already exists ──
    const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true, // skip email verification — this account is handed out pre-made
      user_metadata: name ? { name } : undefined,
    });

    if (createError) {
      const alreadyExists = createError.message?.toLowerCase().includes("already");
      if (!alreadyExists) {
        return new Response(JSON.stringify({ error: createError.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Existing client: look them up and reset their password to the new phone number.
      const { data: list, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) throw listError;

      const existing = list.users.find((u) => u.email?.toLowerCase() === normalizedEmail);
      if (!existing) throw new Error("user reported as existing but not found in listUsers");

      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(existing.id, { password });
      if (updateError) throw updateError;
    } else {
      void created; // account created fresh
    }

    // ── Welcome email via Resend ─────────────────────────────────
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "HEY Digital <onboarding@resend.dev>",
          to: normalizedEmail,
          subject: "הפרטים שלך לכניסה לפאנל הלקוחות",
          html: `
            <div dir="rtl" style="font-family:Arial,sans-serif;max-width:480px">
              <h2 style="color:#0f766e">ברוך הבא ל-HEY Digital 👋</h2>
              <p>הפאנל האישי שלך מוכן. אלו פרטי ההתחברות שלך:</p>
              <table style="width:100%;border-collapse:collapse;margin:16px 0">
                <tr><td style="padding:8px 0;color:#6b7280">אימייל</td><td style="padding:8px 0;font-weight:600">${normalizedEmail}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">סיסמה</td><td style="padding:8px 0;font-weight:600">${password}</td></tr>
              </table>
              <a href="https://www.heydigital.co.il/login" style="display:inline-block;padding:10px 20px;background:#0f766e;color:#fff;border-radius:8px;text-decoration:none">כניסה לפאנל</a>
              <p style="color:#9ca3af;font-size:12px;margin-top:24px">אפשר לשנות את הסיסמה בכל רגע דרך "שכחתי סיסמה" במסך הכניסה.</p>
            </div>
          `,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Pushes a GTM-compatible event so Google Ads / GA4 can measure real lead
// submissions as conversions, instead of only generic pageviews.
export function trackLead(formType: 'main_form' | 'chatbot') {
  try {
    (window as { dataLayer?: unknown[] }).dataLayer = (window as { dataLayer?: unknown[] }).dataLayer || [];
    (window as { dataLayer?: unknown[] }).dataLayer!.push({ event: 'lead_submit', form_type: formType });
  } catch { /* ignore */ }
}

import Section from '@/components/Section';
import eladHeadshot from '@/assets/elad-headshot.png';
import RevealText from '@/components/RevealText';

const AboutSection = () => {
  return (
    <Section id="about" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center" dir="rtl">

          {/* ── Content side ── */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-4">הפילוסופיה שלנו</p>

            <RevealText className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              מבינים עסק לפני שמוכרים שיווק
            </RevealText>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                לפני שבונים קמפיין, אתר או אוטומציה — אנחנו מבינים את העסק. בלי אסטרטגיה ברורה, גם הכלי הטוב בעולם לא יזיז מספרים.
              </p>
              <p>
                HEY Digital היא לא עוד סוכנות שיווק. פיתוח אתרים, ניהול סושיאל, קמפיינים, CRM ואוטומציות AI ואימוני מכירות — הכול בנוי על אסטרטגיה עסקית אחת, לא על טקטיקות מפוזרות.
              </p>
              <p>
                המטרה היא תמיד אחת: להפוך תהליכים מורכבים לפשוטים, כדי שהעסק שלכם יצמח בלי להסתבך.
              </p>
            </div>
          </div>

          {/* ── Image side ── */}
          <div className="relative flex justify-center md:justify-start">

            {/* Ambient glow */}
            <div style={{
              position: 'absolute',
              inset: -40,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, hsl(24,100%,39%,0.10), transparent 65%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }} />

            {/* Offset decorative frame */}
            <div
              className="absolute rounded-2xl"
              style={{
                inset: 0,
                transform: 'translate(14px, 14px)',
                border: '1px solid hsl(24,100%,39%,0.22)',
                borderRadius: '16px',
                maxWidth: 340,
              }}
            />

            {/* Photo container */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                width: '100%',
                maxWidth: 340,
                aspectRatio: '1 / 1',
                border: '1px solid hsl(215,20%,22%)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={eladHeadshot}
                alt="אלעד חנינה - HEY Digital"
                className="w-full h-full object-cover object-top"
              />

              {/* Bottom fade */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, hsl(220,15%,9%) 0%, transparent 45%)' }}
              />

              {/* Name badge overlay */}
              <div className="absolute bottom-4 right-4 left-4">
                <div
                  className="rounded-xl px-4 py-2.5 border"
                  style={{
                    background: 'hsl(220,15%,9%,0.85)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'hsl(215,20%,22%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  }}
                >
                  <p className="text-sm font-semibold text-foreground">אלעד חנינה</p>
                  <p className="text-xs font-mono" style={{ color: 'hsl(24,100%,50%)' }}>
                    Founder · HEY Digital
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default AboutSection;

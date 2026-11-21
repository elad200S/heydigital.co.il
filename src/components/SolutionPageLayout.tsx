import { ArrowLeft, CheckCircle2, Users, Zap, Target } from 'lucide-react';
import WebsiteAuditTool from '@/components/WebsiteAuditTool';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEOHead, BreadcrumbSchema, FAQSchema, ServiceSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';
import { useContactPopup } from '@/contexts/ContactPopupContext';

export interface SolutionPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    label: string;
    headline: string;
    subtext: string;
    heroImage?: string;
    heroBackMessages?: string[];
  };
  whoIsItFor: {
    title: string;
    audiences: string[];
    showAuditTool?: boolean;
  };
  problems: {
    title: string;
    items: { title: string; description: string }[];
  };
  useCases: {
    title: string;
    cases: { title: string; description: string }[];
  };
  whatWeDeliver: {
    title: string;
    items: string[];
  };
  process: {
    title: string;
    steps: { label: string; description: string }[];
  };
  faq?: {
    title: string;
    items: { question: string; answer: string }[];
  };
}

const STATUS_DOT_COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#a78bfa'];

/** Dark terminal-chrome readout — the "live system" visual anchor for every
 *  automation pillar page. Content is the page's own `whatWeDeliver` items,
 *  never invented copy. Rows reveal in sequence once `active` (hero flipped
 *  into view), matching the same chrome/mono language used in
 *  AutomationShowcaseSection on the homepage. */
const TerminalReadout = ({ items, active }: { items: string[]; active: boolean }) => (
  <div className="w-full rounded-lg overflow-hidden border border-white/10" style={{ background: 'hsl(220,15%,9%)' }}>
    <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10" dir="ltr" style={{ background: 'hsl(220,15%,11%)' }}>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
      </div>
      <span className="text-[10px] font-mono text-white/40 ml-2">system.status</span>
    </div>
    <div className="p-4 space-y-2.5" dir="rtl">
      {items.map((item, i) => {
        const color = STATUS_DOT_COLORS[i % STATUS_DOT_COLORS.length];
        return (
          <div
            key={i}
            className="flex items-center gap-2.5 transition-all"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(6px)',
              transitionDuration: '420ms',
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: color, boxShadow: `0 0 8px ${color}` }} />
            <span className="text-[11px] text-white/80 font-mono flex-1 truncate">{item}</span>
            <span className="text-[10px] font-mono" style={{ color: '#10b981' }}>✓</span>
          </div>
        );
      })}
    </div>
    <div className="px-4 py-2 border-t border-white/10 flex items-center gap-2" style={{ background: 'hsl(220,15%,11%)' }}>
      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      <span className="text-[10px] text-green-400 font-mono">מערכת פעילה</span>
    </div>
  </div>
);

/** Process timeline rendered as a running pipeline — numbered nodes joined by
 *  an animated dashed connector, instead of a static circle row. */
const PipelineArrow = () => (
  <svg className="hidden md:block flex-shrink-0 w-10 h-5 text-primary/50" viewBox="0 0 40 20" overflow="visible">
    <path
      d="M0 10h30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" fill="none" strokeLinecap="round"
      style={{ animation: 'pipeline-dash 0.9s linear infinite' }}
    />
    <path d="M26 6l8 4-8 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SolutionPageLayout = ({ data }: { data: SolutionPageData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openPopup } = useContactPopup();
  const faqItems = data?.faq?.items ?? [];
  const hasFaq = faqItems.length > 0;
  const backMessages = data.hero.heroBackMessages ?? [];
  const [isSpinning, setIsSpinning] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroImageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSpinning(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        path={`/${data.slug}`}
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'פתרונות', path: '/solutions' },
        { name: data.hero.headline, path: `/${data.slug}` },
      ]} />
      <FAQSchema items={faqItems} />
      <ServiceSchema name={data.hero.headline} description={data.metaDescription} path={`/${data.slug}`} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero */}
        <section className="min-h-[50vh] flex items-center relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background py-20 md:py-28">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className={`flex flex-col ${data.hero.heroImage ? 'md:flex-row items-center gap-10 md:gap-16' : ''}`}>
              <div className="flex-1 min-w-0 max-w-3xl">
                <Breadcrumbs items={[
                  { label: 'בית', href: '/' },
                  { label: 'פתרונות', href: '/solutions' },
                  { label: data.hero.headline },
                ]} />
                <p className="text-sm font-medium text-primary mb-3">{data.hero.label}</p>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">{data.hero.headline}</h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">{data.hero.subtext}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={openPopup} className="cta-gradient group">
                    שיחת אסטרטגיה
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <Link to="/solutions" className="btn-outline">
                    כל הפתרונות
                  </Link>
                </div>
                {backMessages.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    {backMessages.map((msg, i) => (
                      <div key={i} className="flex items-start gap-2.5 px-4 py-3 rounded-xl border"
                        style={{ background: 'hsl(160,84%,39%,0.07)', borderColor: 'hsl(160,84%,39%,0.22)' }}>
                        <span className="text-primary text-xs mt-0.5 flex-shrink-0 font-bold">✦</span>
                        <p className="text-xs text-muted-foreground leading-relaxed" dir="rtl">{msg}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {data.hero.heroImage && (
                <div className="flex-1 flex items-center justify-center mt-8 md:mt-0" ref={heroImageRef}>
                  <div className="hero-3d-scene w-full max-w-[460px]">
                    <div className={`hero-3d-card${isSpinning ? ' is-spinning' : ''}`}>
                      <img
                        src={data.hero.heroImage}
                        alt={data.hero.headline}
                        className="hero-3d-front"
                        width={920}
                        height={920}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                      {/* Back face: a live-feeling terminal readout instead of a static
                          text card — reinforces "this is a running system", built from
                          the page's own deliverables so it's real content, not invented. */}
                      <div className="hero-3d-back flex items-center justify-center p-5">
                        <TerminalReadout items={data.whatWeDeliver.items.slice(0, 4)} active={isSpinning} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <Section id="audience">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{data.whoIsItFor.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.whoIsItFor.audiences.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl info-card">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{a}</span>
                </div>
              ))}
            </div>
            {data.whoIsItFor.showAuditTool && <WebsiteAuditTool />}
          </div>
        </Section>

        {/* Problems it solves */}
        <Section id="problems" className="bg-muted/30">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{data.problems.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {data.problems.items.map((item, i) => (
                <div key={i} className="relative p-6 bg-card rounded-xl border border-border overflow-hidden"
                  style={{ borderRight: '3px solid hsl(160,84%,39%)' }}>
                  <div className="absolute top-0 left-3 font-mono font-black pointer-events-none select-none leading-none"
                    style={{ fontSize: 72, color: 'rgba(16,185,129,0.06)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="relative">
                    <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Use cases */}
        <Section id="use-cases">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{data.useCases.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {data.useCases.cases.map((c, i) => (
                <div key={i} className="bg-background rounded-xl border border-border overflow-hidden hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200">
                  {/* Terminal bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border"
                    style={{ background: 'hsl(220,15%,11%)' }}>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] font-mono text-background/55 mr-2">
                      case_{String(i + 1).padStart(2, '0')}.run
                    </span>
                  </div>
                  <div className="p-5" dir="rtl">
                    <h3 className="text-sm font-semibold text-foreground mb-3">{c.title}</h3>
                    <div className="space-y-2">
                      {c.description.split('→').map((step, j) => (
                        <div key={j} className="flex items-start gap-2">
                          {j === 0
                            ? <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            : <span className="text-primary text-xs font-mono mt-0.5 flex-shrink-0">→</span>
                          }
                          <span className="text-xs text-muted-foreground leading-relaxed">{step.trim()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-green-400">completed ✓</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* What we deliver */}
        <Section id="deliverables" className="bg-muted/30">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">{data.whatWeDeliver.title}</h2>
            <div className="space-y-3">
              {data.whatWeDeliver.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 info-card rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Process */}
        <Section id="process">
          <div className="max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10 text-center">{data.process.title}</h2>
            {/* Desktop — running pipeline: nodes joined by an animated dashed connector */}
            <div className="hidden md:flex items-center justify-center">
              {data.process.steps.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center text-center w-32 lg:w-36">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs mb-3 flex-shrink-0"
                      style={{
                        background: 'hsl(var(--background))',
                        border: '2px solid hsl(160,84%,39%)',
                        color: 'hsl(160,84%,39%)',
                        boxShadow: '0 0 14px hsl(160,84%,39%,0.18)',
                      }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{step.label}</h3>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {i < data.process.steps.length - 1 && <PipelineArrow />}
                </div>
              ))}
            </div>
            {/* Mobile vertical timeline */}
            <div className="md:hidden space-y-2">
              {data.process.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs"
                      style={{ border: '2px solid hsl(160,84%,39%)', color: 'hsl(160,84%,39%)', background: 'hsl(var(--background))' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {i < data.process.steps.length - 1 && (
                      <div className="w-px h-6 bg-border/50 mt-1" />
                    )}
                  </div>
                  <div className="pt-1.5 pb-2">
                    <h3 className="text-sm font-semibold text-foreground">{step.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes pipeline-dash { from { stroke-dashoffset: 14; } to { stroke-dashoffset: 0; } }
          `}</style>
        </Section>

        {/* FAQ */}
        {hasFaq && (
        <Section id="faq" className="bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center">{data.faq?.title ?? 'שאלות נפוצות'}</h2>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <div key={i} className={cn('bg-card rounded-xl border border-border overflow-hidden transition-all', openFaq === i && 'border-primary/30')}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-right">
                    <span className="text-base font-medium text-foreground">{item.question}</span>
                    <ChevronDown className={cn('w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300', openFaq === i && 'rotate-180')} />
                  </button>
                  <div className={cn('overflow-hidden transition-all duration-300', openFaq === i ? 'max-h-60' : 'max-h-0')}>
                    <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
        )}

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-b from-background to-primary-light/30">
          <div className="container text-center">
            <p className="text-sm font-medium text-primary mb-3">הצעד הבא</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">מוכנים להתחיל?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">שיחת אפיון ראשונית ללא עלות. נבין מה העסק צריך ונתאים פתרון מדויק.</p>
            <button onClick={openPopup} className="cta-gradient group">
              שיחת אסטרטגיה
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default SolutionPageLayout;

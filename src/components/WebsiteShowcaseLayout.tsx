import { ArrowLeft, CheckCircle2, Users, Target } from 'lucide-react';
import WebsiteAuditTool from '@/components/WebsiteAuditTool';
import { Link } from 'react-router-dom';
import { useRef, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEOHead, BreadcrumbSchema, FAQSchema, ServiceSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';
import RevealText from '@/components/RevealText';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { useState } from 'react';
import type { SolutionPageData } from '@/components/SolutionPageLayout';

/**
 * Editorial / portfolio treatment for the "Websites" pillar (web-development,
 * seo-marketing). Same SolutionPageData contract as SolutionPageLayout — this
 * is presentation only, no new business content.
 */

const BrowserFrame = ({ url, children }: { url: string; children: ReactNode }) => (
  <div className="rounded-xl overflow-hidden border border-border shadow-sm bg-card">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40" dir="ltr">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
        <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
        <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
      </div>
      <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-background/70 text-[11px] text-muted-foreground font-mono truncate text-center">
        {url}
      </div>
    </div>
    {children}
  </div>
);

const PortfolioCard = ({ title, description, index }: { title: string; description: string; index: number }) => {
  // GSAP owns transform/opacity on the reveal element itself — any other
  // transform (rotation, hover lift) must live on a separate wrapper so the
  // two never fight over the same inline style.
  const { ref } = useScrollReveal<HTMLDivElement>();
  const palettes = [
    ['hsl(160,45%,88%)', 'hsl(160,55%,72%)'],
    ['hsl(210,45%,90%)', 'hsl(210,55%,76%)'],
    ['hsl(35,55%,90%)', 'hsl(35,65%,76%)'],
  ];
  const [a, b] = palettes[index % palettes.length];

  return (
    <div ref={ref}>
      <div
        className={cn(
          'transition-transform duration-300 hover:-translate-y-1 hover:rotate-0',
          index % 2 === 0 ? '-rotate-1' : 'rotate-1'
        )}
      >
        <BrowserFrame url={`heydigital.co.il/preview/0${index + 1}`}>
          <div
            className="h-40 relative overflow-hidden"
            style={{ background: `linear-gradient(155deg, ${a}, ${b})` }}
          >
            <div className="absolute inset-0 p-5 flex flex-col gap-2 opacity-80">
              <div className="h-2.5 w-2/3 rounded-full bg-background/70" />
              <div className="h-2 w-1/2 rounded-full bg-background/50" />
              <div className="mt-auto h-7 w-24 rounded-md bg-background/80" />
            </div>
          </div>
        </BrowserFrame>
        <div className="pt-4 px-1">
          <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const WebsiteShowcaseLayout = ({ data }: { data: SolutionPageData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openPopup } = useContactPopup();
  const faqItems = data?.faq?.items ?? [];
  const hasFaq = faqItems.length > 0;
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SEOHead title={data.metaTitle} description={data.metaDescription} path={`/${data.slug}`} />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'פתרונות', path: '/solutions' },
        { name: data.hero.headline, path: `/${data.slug}` },
      ]} />
      <FAQSchema items={faqItems} />
      <ServiceSchema name={data.hero.headline} description={data.metaDescription} path={`/${data.slug}`} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero — editorial type, browser-frame artifact instead of abstract blobs */}
        <section className="relative overflow-hidden py-20 md:py-28 border-b border-border/60">
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
              <div className="flex-1 min-w-0 max-w-2xl">
                <Breadcrumbs items={[
                  { label: 'בית', href: '/' },
                  { label: 'פתרונות', href: '/solutions' },
                  { label: data.hero.headline },
                ]} />
                <p className="text-sm font-medium text-primary mb-4 font-mono tracking-wide">{data.hero.label}</p>
                <RevealText as="h1" className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  {data.hero.headline}
                </RevealText>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  {data.hero.subtext}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={openPopup} className="cta-gradient group">
                    שיחת אסטרטגיה
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <Link to="/solutions" className="btn-outline">כל הפתרונות</Link>
                </div>
              </div>

              <div ref={heroRef} className="flex-1 w-full max-w-md md:mt-6">
                <BrowserFrame url={`heydigital.co.il`}>
                  {data.hero.heroImage ? (
                    <img
                      src={data.hero.heroImage}
                      alt={data.hero.headline}
                      className="w-full aspect-[4/3] object-cover"
                      width={920}
                      height={690}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  ) : (
                    <div className="aspect-[4/3] p-8 flex flex-col gap-3 justify-center bg-gradient-to-br from-primary-light/60 to-background">
                      <div className="h-3 w-3/4 rounded-full bg-primary/25" />
                      <div className="h-2.5 w-1/2 rounded-full bg-primary/15" />
                      <div className="h-2.5 w-2/3 rounded-full bg-primary/15" />
                      <div className="mt-4 h-9 w-28 rounded-md bg-primary/30" />
                    </div>
                  )}
                </BrowserFrame>
                {data.hero.heroBackMessages?.[0] && (
                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed text-center">
                    ✦ {data.hero.heroBackMessages[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <Section id="audience">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground">
                {data.whoIsItFor.title}
              </RevealText>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {data.whoIsItFor.audiences.map((a, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">{a}</span>
                </div>
              ))}
            </div>
            {data.whoIsItFor.showAuditTool && <WebsiteAuditTool />}
          </div>
        </Section>

        {/* Problems — editorial numbered list, no neon */}
        <Section id="problems" className="bg-muted/30">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-10">
              <Target className="w-6 h-6 text-primary" />
              <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground">
                {data.problems.title}
              </RevealText>
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              {data.problems.items.map((item, i) => (
                <div key={i} className="flex gap-5 pb-8 border-b border-border/60">
                  <span className="font-serif text-3xl text-primary/40 leading-none flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Use cases — the portfolio showcase */}
        <Section id="use-cases">
          <div className="max-w-5xl">
            <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground mb-10">
              {data.useCases.title}
            </RevealText>
            <div className="grid md:grid-cols-3 gap-8">
              {data.useCases.cases.map((c, i) => (
                <PortfolioCard key={i} title={c.title} description={c.description} index={i} />
              ))}
            </div>
          </div>
        </Section>

        {/* What we deliver */}
        <Section id="deliverables" className="bg-muted/30">
          <div className="max-w-3xl">
            <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
              {data.whatWeDeliver.title}
            </RevealText>
            <div className="space-y-0">
              {data.whatWeDeliver.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3.5 border-b border-border/50">
                  <span className="font-serif text-lg text-primary/50 flex-shrink-0 w-6">{i + 1}</span>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Process — editorial horizontal timeline */}
        <Section id="process">
          <div className="max-w-5xl">
            <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">
              {data.process.title}
            </RevealText>
            <div className="hidden md:grid relative" style={{ gridTemplateColumns: `repeat(${data.process.steps.length}, 1fr)` }}>
              <div className="absolute top-6 right-0 left-0 h-px bg-border" />
              {data.process.steps.map((step, i) => (
                <div key={i} className="relative px-3 text-center">
                  <div className="font-serif text-5xl text-foreground/15 mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{step.label}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="md:hidden space-y-5">
              {data.process.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="font-serif text-3xl text-foreground/20 flex-shrink-0 w-10">{String(i + 1).padStart(2, '0')}</span>
                  <div className="pt-1">
                    <h3 className="text-sm font-semibold text-foreground">{step.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ */}
        {hasFaq && (
          <Section id="faq" className="bg-muted/30">
            <div className="max-w-3xl mx-auto">
              <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center">
                {data.faq?.title ?? 'שאלות נפוצות'}
              </RevealText>
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
        <section className="py-20 border-t border-border/60">
          <div className="container text-center">
            <p className="text-sm font-medium text-primary mb-3 font-mono tracking-wide">הצעד הבא</p>
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

export default WebsiteShowcaseLayout;

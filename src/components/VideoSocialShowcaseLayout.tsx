import { ArrowLeft, CheckCircle2, Users, Target, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
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
import type { SolutionPageData } from '@/components/SolutionPageLayout';

/**
 * Video/social treatment for the "AI videos & social" pillar — its own
 * identity, parallel to WebsiteShowcaseLayout (editorial) and
 * SolutionPageLayout (technical/terminal). Same SolutionPageData contract —
 * presentation only, no new business content shape.
 *
 * Motif: a vertical (9:16) phone/player frame instead of a browser chrome or
 * terminal window, and a clip-timeline scrubber (segments + moving playhead)
 * instead of pipeline nodes or serif numerals, so motion reads as "editing/
 * playback" rather than "a running system" or "a case study flipping by".
 */

const PhoneFrame = ({
  gradient,
  caption,
  index,
}: {
  gradient: [string, string];
  caption: string;
  index: number;
}) => {
  const [a, b] = gradient;
  return (
    <div className="rounded-[1.75rem] border border-border bg-card p-2 shadow-sm">
      <div
        className="relative aspect-[9/16] rounded-[1.25rem] overflow-hidden"
        style={{ background: `linear-gradient(165deg, ${a}, ${b})` }}
      >
        {/* notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-black/15" />
        {/* illustrative caption chrome, not a real post */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between bg-gradient-to-t from-black/35 to-transparent">
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-16 rounded-full bg-white/70" />
            <div className="h-1.5 w-10 rounded-full bg-white/45" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/80" />
            <div className="w-6 h-6 rounded-full bg-white/50" />
          </div>
        </div>
        {/* play badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-white/85 flex items-center justify-center">
            <Play className="w-[18px] h-[18px] text-foreground fill-foreground ms-0.5" />
          </div>
        </div>
        <span className="absolute top-3 right-3 text-[10px] font-mono text-white/80 bg-black/25 px-1.5 py-0.5 rounded">
          0{index + 1} · 00:{15 + index * 7}s
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed text-center px-1 pt-3 pb-1">{caption}</p>
    </div>
  );
};

const ClipCard = ({ title, description, index }: { title: string; description: string; index: number }) => {
  const { ref } = useScrollReveal<HTMLDivElement>();
  const palettes: [string, string][] = [
    ['hsl(160,55%,80%)', 'hsl(190,55%,62%)'],
    ['hsl(280,45%,82%)', 'hsl(230,55%,66%)'],
    ['hsl(20,70%,82%)', 'hsl(340,55%,68%)'],
  ];
  return (
    <div ref={ref}>
      <PhoneFrame gradient={palettes[index % palettes.length]} caption="" index={index} />
      <div className="pt-1 px-1">
        <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/** Clip-timeline scrubber: colored segments with a continuously moving
 *  playhead — the section's recurring "this is footage, not a flowchart"
 *  motif, used under the hero and again to carry the process steps. */
const ClipTimeline = ({ segments }: { segments: number }) => {
  const colors = ['#10b981', '#06b6d4', '#a78bfa', '#f59e0b', '#ef4444'];
  return (
    <div className="w-full">
      <div className="relative h-7 rounded-md overflow-hidden flex gap-0.5 bg-muted/60 p-0.5">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{ background: colors[i % colors.length], opacity: 0.35 }}
          />
        ))}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-foreground/80"
          style={{ animation: `clip-scrub ${segments * 1.1}s linear infinite` }}
        />
      </div>
      <style>{`
        @keyframes clip-scrub {
          from { left: 0%; }
          to { left: calc(100% - 2px); }
        }
      `}</style>
    </div>
  );
};

const VideoSocialShowcaseLayout = ({ data }: { data: SolutionPageData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openPopup } = useContactPopup();
  const faqItems = data?.faq?.items ?? [];
  const hasFaq = faqItems.length > 0;

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
        {/* Hero — vertical phone/player frame instead of browser chrome or terminal */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-primary-light/40 to-background">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
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
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  {data.hero.subtext}
                </p>
                <div className="max-w-sm mb-8">
                  <ClipTimeline segments={8} />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={openPopup} className="cta-gradient group">
                    שיחת אסטרטגיה
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <Link to="/solutions" className="btn-outline">כל הפתרונות</Link>
                </div>
              </div>

              <div className="flex-1 w-full max-w-[280px] mx-auto">
                <PhoneFrame gradient={['hsl(160,55%,82%)', 'hsl(195,60%,64%)']} caption="" index={0} />
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
          </div>
        </Section>

        {/* Problems */}
        <Section id="problems" className="bg-muted/30">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-10">
              <Target className="w-6 h-6 text-primary" />
              <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground">
                {data.problems.title}
              </RevealText>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {data.problems.items.map((item, i) => (
                <div key={i} className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Use cases — the reel showcase */}
        <Section id="use-cases">
          <div className="max-w-5xl">
            <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground mb-10">
              {data.useCases.title}
            </RevealText>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {data.useCases.cases.map((c, i) => (
                <ClipCard key={i} title={c.title} description={c.description} index={i} />
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

        {/* Process — steps riding the clip-timeline scrubber */}
        <Section id="process">
          <div className="max-w-5xl">
            <RevealText as="h2" className="text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">
              {data.process.title}
            </RevealText>
            <div className="mb-6">
              <ClipTimeline segments={data.process.steps.length} />
            </div>
            <div className="hidden md:grid" style={{ gridTemplateColumns: `repeat(${data.process.steps.length}, 1fr)` }}>
              {data.process.steps.map((step, i) => (
                <div key={i} className="text-center px-2">
                  <span className="font-mono text-xs text-primary/60">0{i + 1}</span>
                  <h3 className="text-sm font-semibold text-foreground mt-1 mb-1">{step.label}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="md:hidden space-y-5">
              {data.process.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="font-mono text-xs text-primary/60 flex-shrink-0 w-6 pt-0.5">0{i + 1}</span>
                  <div>
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
        <section className="py-20 bg-gradient-to-b from-background to-primary-light/30">
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

export default VideoSocialShowcaseLayout;

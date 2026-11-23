import { lazy, Suspense } from 'react';
import { SEOHead, OrganizationSchema } from '@/lib/seo';
import ParticleField from '@/components/ParticleField';
import ScrollOrb from '@/components/ScrollOrb';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';

const ProcessSection = lazy(() => import('@/components/sections/ProcessSection'));
const AutomationShowcaseSection = lazy(() => import('@/components/sections/AutomationShowcaseSection'));
const ToolsSection = lazy(() => import('@/components/sections/ToolsSection'));
const SolutionsOverviewSection = lazy(() => import('@/components/sections/SolutionsOverviewSection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));
const Footer = lazy(() => import('@/components/sections/Footer'));

const Index = () => {
  return (
    <>
      <SEOHead
        title="HEY Digital | אוטומציה, בינה מלאכותית ובניית אתרים לעסקים"
        description="בניית אתרים, אוטומציה עסקית וסוכני AI לעסקים בישראל. מערכות שחוסכות זמן, מטפלות בלידים ועובדות גם כשאתם לא. פגישת ייעוץ חינם."
        path="/"
      />
      <OrganizationSchema />

      <ParticleField />
      <ScrollOrb />
      <main className="relative z-10 bg-transparent min-h-screen">

        {/* Hero — has its own entrance animation */}
        <HeroSection />

        {/* Every section below renders its own <Section> wrapper, which already
            owns a scroll-scrubbed GSAP entrance + exit (see Section.tsx). This
            used to also be wrapped in <CinematicReveal>, a second, independent
            Framer Motion viewport-triggered fade/slide/blur on the same content.
            Two animation engines racing each other — one continuously tied to
            scroll position, the other a one-shot tween fired at 8% into view —
            is what made consecutive sections feel like separate, disconnected
            blocks instead of one continuous scroll. Removed; Section.tsx's own
            animation is the only one now, so entrance/exit stays perfectly
            scroll-synced across every section. */}
        <ProblemSection />

        {/* Reordered so the narrative doesn't repeat "watch an automation run" three
            times in a row (DemoVideo, AutomationShowcase and the now-removed
            AutomationAnimation all showed the same beat back-to-back). Arc is now:
            pain (Problem) -> proof it works on your own site (DemoVideo) -> how we
            build it for you (Process) -> breadth of real examples (AutomationShowcase)
            -> compatibility (Tools) -> explore the three offerings (SolutionsOverview).
            AutomationAnimation's "form -> webhook -> Make -> sub-actions" diagram was
            the most redundant of the three (same message, generic/abstract, and least
            distinctive visually) and was cut rather than merged. */}
        <Suspense fallback={null}>
          <ProcessSection />
          <AutomationShowcaseSection />
          <ToolsSection />
          <SolutionsOverviewSection />
          <AboutSection />
          <FAQSection />
          <ContactSection />
          <Footer />
        </Suspense>

      </main>
    </>
  );
};

export default Index;

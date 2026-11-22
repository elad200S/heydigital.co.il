import { lazy, Suspense } from 'react';
import { SEOHead, OrganizationSchema } from '@/lib/seo';
import ParticleField from '@/components/ParticleField';
import ScrollOrb from '@/components/ScrollOrb';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import CinematicReveal from '@/components/CinematicReveal';

const ProcessSection = lazy(() => import('@/components/sections/ProcessSection'));
const DemoVideoSection = lazy(() => import('@/components/sections/DemoVideoSection'));
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

        <CinematicReveal index={1}><ProblemSection /></CinematicReveal>

        {/* Reordered so the narrative doesn't repeat "watch an automation run" three
            times in a row (DemoVideo, AutomationShowcase and the now-removed
            AutomationAnimation all showed the same beat back-to-back). Arc is now:
            pain (Problem) -> proof it works on your own site (DemoVideo) -> how we
            build it for you (Process) -> breadth of real examples (AutomationShowcase)
            -> compatibility (Tools) -> explore the two offerings (SolutionsOverview).
            AutomationAnimation's "form -> webhook -> Make -> sub-actions" diagram was
            the most redundant of the three (same message, generic/abstract, and least
            distinctive visually) and was cut rather than merged. */}
        <Suspense fallback={null}>
          <CinematicReveal index={2}><DemoVideoSection /></CinematicReveal>
          <CinematicReveal index={3}><ProcessSection /></CinematicReveal>
          <AutomationShowcaseSection />
          <CinematicReveal index={5}><ToolsSection /></CinematicReveal>
          {/* No longer needs a sticky-safe exemption — SolutionsOverviewSection
              is a plain two-card grid now, not a position:sticky stack, so it
              gets the same entrance treatment as every other section here. */}
          <CinematicReveal index={6}><SolutionsOverviewSection /></CinematicReveal>

          <CinematicReveal index={7}><AboutSection /></CinematicReveal>
          <CinematicReveal index={8}><FAQSection /></CinematicReveal>
          <CinematicReveal index={9}><ContactSection /></CinematicReveal>
          <Footer />
        </Suspense>

      </main>
    </>
  );
};

export default Index;

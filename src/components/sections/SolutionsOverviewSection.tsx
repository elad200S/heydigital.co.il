import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow, BarChart3, Globe } from 'lucide-react';
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import RevealText from '@/components/RevealText';
import ScrambleText from '@/components/ScrambleText';

const solutions = [
  {
    icon: Bot,
    title: 'סוכני AI חכמים',
    description: 'בוטים חכמים שעובדים 24/7 – מענה ללקוחות וטיפול בלידים.',
    href: '/solutions/ai-agents',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/15',
    accent: 'hsl(160,84%,39%)',
  },
  {
    icon: Zap,
    title: 'אוטומציה עסקית',
    description: 'ביטול משימות ידניות וייעול תהליכים בעסק.',
    href: '/solutions/business-automation',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-400/15',
    accent: '#facc15',
  },
  {
    icon: MessageCircle,
    title: 'אוטומציית WhatsApp',
    description: 'מענה אוטומטי, ניהול לידים ושליחת הודעות מותאמות.',
    href: '/solutions/whatsapp-automation',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/15',
    accent: '#4ade80',
  },
  {
    icon: GitBranch,
    title: 'אוטומציית CRM',
    description: 'תהליכי CRM שמוודאים שאף ליד לא נופל בין הכיסאות.',
    href: '/solutions/crm-automation',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-400/15',
    accent: '#38bdf8',
  },
  {
    icon: Workflow,
    title: 'אוטומציית תהליכי עבודה',
    description: 'מיפוי ואוטומציה של דוחות, אישורים ועדכונים.',
    href: '/solutions/workflow-automation',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/15',
    accent: '#fb923c',
  },
  {
    icon: BarChart3,
    title: 'דוחות וניתוח נתונים',
    description: 'מעקב אוטומטי אחרי ביצועים והפקת תובנות לעסק.',
    href: '/solutions/business-automation',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/15',
    accent: '#c084fc',
  },
  {
    icon: Globe,
    title: 'בניית אתרים',
    description: 'אתרים מודרניים, מהירים ומותאמים לעסק — מהתכנון ועד ההשקה. מחוברים לאוטומציות מהיום הראשון.',
    href: '/solutions/web-development',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/15',
    accent: '#60a5fa',
  },
];

type Solution = typeof solutions[number];

/** Fixed ambient backdrop behind the stacking cards — faded in only while the stack is in view. */
const PinnedBackdrop = ({ areaRef }: { areaRef: React.RefObject<HTMLElement> }) => {
  const isInView = useInView(areaRef, { margin: '0px 0px -10% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-white/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-[140px] opacity-25 bg-[radial-gradient(circle,hsl(var(--primary))_0%,transparent_70%)]" />
    </motion.div>
  );
};

/** Static card used for the prefers-reduced-motion fallback — plain list, no scroll effects. */
const StaticCard = ({ solution: s }: { solution: Solution }) => (
  <Link
    to={s.href}
    className="group relative block w-full max-w-2xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-10 bg-transparent sm:bg-black/40 sm:backdrop-blur-xl sm:border sm:border-white/10"
  >
    <div
      className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none hidden sm:block"
      style={{ background: `radial-gradient(ellipse at top right, ${s.accent}18, transparent 60%)` }}
    />
    <div
      className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none hidden sm:block"
      style={{ boxShadow: `inset 0 0 0 1px ${s.accent}40` }}
    />
    <div className="relative flex items-start gap-4" dir="rtl">
      <div className={cn('rounded-xl flex items-center justify-center flex-shrink-0 w-14 h-14', s.iconBg)}>
        <s.icon className={cn('w-7 h-7', s.iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{s.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{s.description}</p>
      </div>
      <ArrowLeft className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
    </div>
  </Link>
);

// Top offset (px) of the oldest card once every card has arrived. Small on
// purpose, so the whole accumulated deck of peeking edges fits near the top
// of the screen instead of pushing the active card down too far — but not
// so small that it sits under the fixed navbar (top-3 + h-12/h-16, i.e. it
// occupies roughly the first ~75px of the viewport when visible), which
// would both visually clip the oldest card's sliver and block taps on it.
const STACK_TOP_BASE_PX = 88;
// How much further down (px) each next card sticks, relative to the one
// before it. This is also exactly how much of a covered card stays exposed —
// sized for the icon+title row (title is forced to a single line via
// line-clamp specifically so this number can be a reliable, known quantity —
// see the comment on the title below) with a safety margin, so only that
// "header" strip peeks out and the description underneath it stays hidden.
const STACK_STEP_PX = 80;
// Scroll distance consumed before each card (after the first) arrives —
// this is what paces the stacking. Kept short: once a card is stuck it
// doesn't move or change until the next one arrives (no scroll-driven
// size/opacity animation happens in between), so a long gap here just reads
// as the page being stuck, not as anticipation.
const ENTRY_GAP_DVH = 70;
const FIRST_APPROACH_DVH = 50;
const TAIL_RUNWAY_DVH = 90;

/**
 * One card in the deck. Unlike a "one card fully replaces the next" stack,
 * every card here keeps its `position: sticky` for the rest of the section
 * once it arrives — it is never explicitly released. Concretely: each card
 * is a plain flow sibling (no per-card wrapper), preceded by an invisible
 * spacer (see SolutionsOverviewSection) that delays when it reaches its own
 * `top` offset. Once stuck there, it just stays — there's nothing after it
 * in its own little box that would make it un-stick early. Card `index`
 * sticks `STACK_STEP_PX` further down than card `index - 1`, so as later
 * cards arrive and physically sit lower on screen (with a higher z-index,
 * so they paint over what's above them), each earlier card keeps showing
 * only the sliver above the next one's top edge — the classic fanned deck /
 * accordion look, entirely from layout, no scroll-driven size/opacity math
 * needed to fake "being covered."
 *
 * The peek interaction is split across two nested elements on purpose:
 *   - the OUTER motion.div is the actual `position: sticky` element, and its
 *     hover/tap response only ever changes z-index — never a transform. Its
 *     geometry is 100% static.
 *   - the INNER motion.div is a plain (non-sticky) child that does the
 *     `-15px` visual pop, and has no gesture listener of its own — it
 *     inherits the outer's hover/tap state via matching `variants` labels.
 * Both matter: animating `transform` directly on a `position: sticky`
 * element is what caused the earlier "hover gets stuck and breaks the next
 * card" bug — once a transform briefly touches a sticky element, some
 * engines don't cleanly recompute its stuck offset afterward, plus the
 * element's own bounding box moving out from under a stationary cursor can
 * flip hover on/off rapidly (mouse leaves the spot it just moved away from,
 * re-enters where it moved back to, repeat). Keeping the sticky element's
 * box completely stationary and only moving an inner, non-sticky child
 * removes both problems at once. z-index still has to live on the outer:
 * stacking order is decided between the positioned siblings, so a moving
 * inner child alone could never paint above a higher z-index sibling.
 */
const StackCard = ({ solution: s, index, total }: { solution: Solution; index: number; total: number }) => {
  const top = STACK_TOP_BASE_PX + index * STACK_STEP_PX;
  const outerVariants = { rest: { zIndex: index + 1 }, peek: { zIndex: total + 20 } };
  const innerVariants = { rest: { y: 0 }, peek: { y: -15 } };

  return (
    <motion.div
      className="sticky px-4 sm:px-6"
      style={{ top: `${top}px` }}
      variants={outerVariants}
      initial="rest"
      whileHover="peek"
      whileTap="peek"
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full max-w-2xl mx-auto"
        variants={innerVariants}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform' }}
      >
        <Link
          to={s.href}
          // Solid flat fill on mobile — no blur, no border, no glow, so it
          // still reads as "clean," but opaque enough that a covered card's
          // title actually hides the one behind it (fully transparent here
          // would let a covered card's text bleed straight through the one
          // stacked in front of it). Desktop keeps the glass-card look.
          className="group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-10 bg-card sm:bg-black/40 sm:backdrop-blur-xl sm:border sm:border-white/10 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.45)] sm:shadow-none"
        >
          {/* Accent glow + border glow — desktop only, part of the glass look */}
          <div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none hidden sm:block"
            style={{ background: `radial-gradient(ellipse at top right, ${s.accent}18, transparent 60%)` }}
          />
          <div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none hidden sm:block"
            style={{ boxShadow: `inset 0 0 0 1px ${s.accent}40` }}
          />

          <div className="relative flex items-start gap-3 sm:gap-4" dir="rtl">
            <div className={cn('rounded-xl flex items-center justify-center flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14', s.iconBg)}>
              <s.icon className={cn('w-6 h-6 sm:w-7 sm:h-7', s.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              {/* line-clamp-1 keeps the title reliably one line tall — this is
                  what STACK_STEP_PX is sized against, so a long title
                  wrapping to 2 lines can never land in the zone the next
                  card is already covering (that was the actual cause of
                  titles reading as cut off mid-word). */}
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 line-clamp-1">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{s.description}</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const SolutionsOverviewSection = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    // Deliberately not using the shared `Section` wrapper or `CinematicReveal` here —
    // both apply scroll-driven transforms to their contents, and a transform on any
    // ancestor redefines the containing block that position:sticky resolves against.
    <section id="solutions-overview" className="relative py-10 md:py-14">
      <div className="container">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="text-center md:text-right flex-1">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3 text-center">
              <ScrambleText text="מה אנחנו בונים" />
            </p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground">
              פתרונות אוטומציה לעסקים
            </RevealText>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mx-auto md:mx-0 flex-shrink-0"
          >
            לכל הפתרונות
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {prefersReducedMotion ? (
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-4">
            {solutions.map((s, i) => (
              <StaticCard key={i} solution={s} />
            ))}
          </div>
        </div>
      ) : (
        // No explicit height here — it's just normal document flow (spacers +
        // sticky cards, each sized to its own natural content), so the total
        // scroll distance is whatever the spacers below add up to.
        <div ref={stackRef} className="relative">
          <PinnedBackdrop areaRef={stackRef} />
          <div style={{ height: `${FIRST_APPROACH_DVH}dvh` }} aria-hidden="true" />
          {/*
            StackCard and its trailing spacer must be direct children here, not
            wrapped in a per-card div — position:sticky's containing block is
            its immediate parent, so a wrapper div would recreate the "releases
            after its own small block" bug this component's comment describes.
            flatMap keeps them flat while still giving each a stable key.
          */}
          {solutions.flatMap((s, i) => [
            <StackCard key={`card-${i}`} solution={s} index={i} total={solutions.length} />,
            i < solutions.length - 1 ? (
              <div key={`gap-${i}`} style={{ height: `${ENTRY_GAP_DVH}dvh` }} aria-hidden="true" />
            ) : null,
          ])}
          <div style={{ height: `${TAIL_RUNWAY_DVH}dvh` }} aria-hidden="true" />
        </div>
      )}
    </section>
  );
};

export default SolutionsOverviewSection;

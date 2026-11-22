import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Search, Bot, MessageCircle, GitBranch, Workflow, Zap } from 'lucide-react';
import RevealText from '@/components/RevealText';
import Section from '@/components/Section';

// Two pillars (a third, AI video/social, is intentionally not here yet).
// This replaces an 8-card scroll-jacked stack that consumed roughly 7x the
// viewport height in pure scroll distance for one homepage section — the
// single biggest contributor to the site feeling like disconnected blocks
// with no flow. Two cards, no pinning, read in one glance instead.
const pillars = [
  {
    id: 'websites',
    title: 'אתרים ונוכחות דיגיטלית',
    description: 'אתרים מהירים ומותאמים לעסק, מהתכנון ועד השקה — וקידום אורגני שמביא לידים בלי תלות בפרסום.',
    href: '/solutions#websites',
    icon: Globe,
    accent: 'hsl(210,90%,62%)',
    items: [
      { label: 'בניית אתרים', icon: Globe },
      { label: 'קידום אתרים (SEO)', icon: Search },
    ],
  },
  {
    id: 'automation',
    title: 'אוטומציות למערכת CRM',
    description: 'חמש יכולות שעובדות כמערכת אחת — מעקב לידים, סוכני AI, WhatsApp, תהליכי עבודה ודוחות — כך שאף ליד לא נופל.',
    href: '/solutions#automation',
    icon: GitBranch,
    accent: 'hsl(160,84%,39%)',
    items: [
      { label: 'אוטומציית CRM', icon: GitBranch },
      { label: 'סוכני AI חכמים', icon: Bot },
      { label: 'אוטומציית WhatsApp', icon: MessageCircle },
      { label: 'תהליכי עבודה', icon: Workflow },
      { label: 'אוטומציה עסקית', icon: Zap },
    ],
  },
];

const PillarCard = ({ pillar }: { pillar: typeof pillars[number] }) => {
  const Icon = pillar.icon;
  return (
    <Link
      to={pillar.href}
      className="group relative flex flex-col rounded-[28px] overflow-hidden p-7 sm:p-9 bg-card border border-white/[0.06] sm:bg-black/25 sm:backdrop-blur-2xl sm:border-white/10 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top right, ${pillar.accent}16, transparent 62%)` }}
      />
      <div className="relative flex items-center gap-4 mb-5" dir="rtl">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${pillar.accent}18` }}
        >
          <Icon className="w-7 h-7" style={{ color: pillar.accent }} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{pillar.title}</h3>
      </div>

      <p className="relative text-muted-foreground leading-relaxed mb-6" dir="rtl">
        {pillar.description}
      </p>

      <div className="relative flex flex-wrap gap-2 mb-6" dir="rtl">
        {pillar.items.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 text-xs font-medium text-muted-foreground"
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </span>
        ))}
      </div>

      <div
        className="relative mt-auto flex items-center gap-2 text-sm font-medium transition-colors"
        style={{ color: pillar.accent }}
        dir="rtl"
      >
        לפרטים נוספים
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
};

const SolutionsOverviewSection = () => (
  <Section id="solutions-overview">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
      <div className="text-center md:text-right flex-1">
        <RevealText className="text-4xl md:text-5xl font-bold text-foreground">
          אתרים ואוטומציות לעסקים
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

    <div className="max-w-5xl mx-auto grid gap-5 md:grid-cols-2">
      {pillars.map((pillar) => (
        <PillarCard key={pillar.id} pillar={pillar} />
      ))}
    </div>
  </Section>
);

export default SolutionsOverviewSection;

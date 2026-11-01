import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow, Globe, Search } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const solutions = [
  {
    icon: Bot,
    title: 'סוכני AI חכמים',
    description: 'בוטים חכמים מבוססי בינה מלאכותית שמנהלים שיחות, עונים ללקוחות ומבצעים פעולות אוטומטיות – 24 שעות ביממה.',
    href: '/solutions/ai-agents',
    audiences: ['עסקי שירות', 'חנויות אונליין', 'סוכנויות'],
  },
  {
    icon: Zap,
    title: 'אוטומציה עסקית',
    description: 'חיבור מערכות, ייעול תהליכים ובניית זרימות עבודה אוטומטיות שמחליפות עשרות שעות של עבודה ידנית בשבוע.',
    href: '/solutions/business-automation',
    audiences: ['עסקים קטנים', 'סטארטאפים', 'צוותי תפעול'],
  },
  {
    icon: MessageCircle,
    title: 'אוטומציית WhatsApp',
    description: 'מערכת WhatsApp אוטומטית שמנהלת לידים, שולחת תזכורות, עוקבת אחרי לקוחות ומספקת מענה מיידי.',
    href: '/solutions/whatsapp-automation',
    audiences: ['עסקים עם לידים', 'שירותי לקוחות', 'מכירות'],
  },
  {
    icon: GitBranch,
    title: 'אוטומציית CRM',
    description: 'בנייה והטמעה של תהליכי CRM אוטומטיים – מעקב לידים, משפכי מכירות ותקשורת לקוחות ללא מאמץ ידני.',
    href: '/solutions/crm-automation',
    audiences: ['צוותי מכירות', 'ניהול לקוחות', 'יועצים'],
  },
  {
    icon: Workflow,
    title: 'אוטומציית תהליכי עבודה',
    description: 'מיפוי ואוטומציה של תהליכים פנימיים – דוחות, אישורים, הקצאת משימות ועדכוני סטטוס אוטומטיים.',
    href: '/solutions/workflow-automation',
    audiences: ['צוותים פנימיים', 'מנהלי פרויקטים', 'חברות שירות'],
  },
  {
    icon: Globe,
    title: 'בניית אתרים',
    description: 'אתרים מודרניים, מהירים ומותאמים לעסק — מהתכנון ועד ההשקה, מחוברים לאוטומציות מהיום הראשון.',
    href: '/solutions/web-development',
    audiences: ['עסקים בלי אתר', 'מיתוג מחדש', 'חנויות אונליין'],
  },
  {
    icon: Search,
    title: 'קידום אתרים (SEO)',
    description: 'קידום אורגני שמביא לידים בלי תלות בפרסום — מחקר מילות מפתח, תוכן, קידום מקומי ונראות במנועי AI.',
    href: '/solutions/seo-marketing',
    audiences: ['עסקים תלויים בפרסום ממומן', 'עסקים מקומיים', 'אתרי תוכן ובלוגים'],
  },
];

const Solutions = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="בניית אתרים, קידום אתרים ואוטומציה עסקית | HEY Digital"
        description="פתרונות בניית אתרים, קידום אתרים אורגני (SEO) ואוטומציה עסקית ובינה מלאכותית: אתרים, SEO/GEO, סוכני AI, אוטומציית WhatsApp, CRM ותהליכי עבודה מותאמים."
        path="/solutions"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'פתרונות', path: '/solutions' },
      ]} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero */}
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary mb-3">פתרונות</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                אתרים, קידום אורגני ומערכות שעובדות בשבילכם
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                כל פתרון מותאם אישית לעסק שלכם. אנחנו בונים אתרים, מקדמים אותם אורגנית בגוגל ובמנועי AI, ובונים מערכות חכמות שמחליפות תהליכים ידניים ומאפשרות צמיחה.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions grid */}
        <Section id="all-solutions">
          <div className="max-w-5xl">
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <Link
                  key={index}
                  to={solution.href}
                  className="group block p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <solution.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {solution.title}
                        </h2>
                        <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">{solution.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {solution.audiences.map((a, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-b from-background to-primary-light/30">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">לא בטוחים מה מתאים לכם?</h2>
            <p className="text-muted-foreground mb-8">בשיחת אפיון קצרה נבין מה העסק צריך ונתאים את הפתרון המדויק.</p>
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

export default Solutions;

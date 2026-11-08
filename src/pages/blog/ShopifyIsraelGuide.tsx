import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  {
    question: 'כמה עולה Shopify בישראל בחודש?',
    answer: 'שלוש התוכניות המרכזיות הן Basic ב-39$ לחודש (29$ בחיוב שנתי), Grow ב-105$ לחודש (79$ שנתי) ו-Advanced ב-399$ לחודש (299$ שנתי), עם חיסכון של כ-25% בחיוב שנתי. Plus, לחנויות ארגוניות גדולות, מתחילה ב-2,300$ לחודש. לכך מתווספת עמלת סליקה חיצונית, כי Shopify Payments לא נתמך בישראל.'
  },
  {
    question: 'האם Shopify Payments עובד בישראל?',
    answer: 'לא. ישראל לא מופיעה ברשימת המדינות הנתמכות ב-Shopify Payments, כך שחנות ישראלית חייבת לעבוד עם ספק סליקה חיצוני. בתמורה, Shopify גובה עמלת עסקה נוספת שנעה בין 2% בתוכנית Basic ל-0.6% בתוכנית Advanced, בנוסף לעמלת הסליקה עצמה.'
  },
  {
    question: 'כמה חנויות Shopify פעילות יש בישראל?',
    answer: 'לפי נתוני StoreCensus, יש כיום כ-5,809 חנויות Shopify פעילות שהוקמו על ידי עסקים המבוססים בישראל — מדובר במקור נתונים צד שלישי ולא בדוח רשמי של Shopify, אבל הוא מצביע על פלטפורמה עם נוכחות משמעותית בשוק המקומי.'
  },
  {
    question: 'מה ההבדל בין Shopify ל-WooCommerce ול-AI לבניית חנות?',
    answer: 'Shopify היא פלטפורמה מאוחסנת שמנהלת בעצמה אבטחה ותחזוקה בתמורה לדמי מנוי קבועים. WooCommerce חינמית כתוסף אבל מטילה עליכם את כל האחריות התחזוקתית. כלי AI כמו Lovable זולים ומהירים להקמה אבל חסרים "מנוע מסחר" מובנה. הרחבה מלאה בהשוואה בין שלוש הדרכים נמצאת במאמר על בחירת פלטפורמת איקומרס.'
  },
  {
    question: 'כמה זמן לוקח לפתוח חנות Shopify?',
    answer: 'חנות בסיסית עם תבנית מוכנה אפשר להקים תוך יום-יומיים. חנות מלאה עם התאמת שיטות תשלום ומשלוחים לישראל, עיצוב מותאם וחיבור קטלוג מלא אורכת בדרך כלל בין כמה ימים לשבועיים כשעובדים לבד, ומתקצרת משמעותית כשעובדים עם איש מקצוע שמכיר את הפלטפורמה.'
  },
];

const ShopifyIsraelGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="Shopify ישראל — מדריך פתיחת חנות 2026 | HEY Digital"
        description="Shopify ישראל: מדריך מלא לפתיחת חנות ב-2026 — מחירים מעודכנים, עמלות סליקה בישראל, שלבי הקמה, יתרונות וחסרונות, והשוואה ל-WooCommerce ול-AI."
        path="/blog/shopify-israel-guide"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'Shopify ישראל — מדריך פתיחת חנות', path: '/blog/shopify-israel-guide' },
      ]} />
      <ArticleSchema
        title="Shopify ישראל — מדריך פתיחת חנות 2026"
        description="Shopify ישראל: מדריך מלא לפתיחת חנות ב-2026 — מחירים מעודכנים, עמלות סליקה בישראל, שלבי הקמה, יתרונות וחסרונות, והשוואה ל-WooCommerce ול-AI."
        path="/blog/shopify-israel-guide"
        datePublished="2026-11-08"
      />
      <FAQSchema items={faqItems} />
      <Navbar />
      <main className="bg-background min-h-screen pt-16" dir="rtl">
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">בניית אתרים</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">Shopify ישראל — מדריך פתיחת חנות 2026</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Shopify היא אחת מפלטפורמות המסחר האלקטרוני הגדולות בעולם, ועסקים ישראלים רבים פותחים עליה חנות כי היא מגיעה עם תשתית מסחר שלמה מהיום הראשון — בלי צורך בשרת, אבטחה או תחזוקה עצמאית. במדריך הזה נפרק את כל מה שצריך לדעת לפני פתיחת חנות Shopify בישראל ב-2026: מחירים מעודכנים, איך עובדת הסליקה כשאין Shopify Payments מקומי, שלבי ההקמה בפועל, ומה היתרונות והחסרונות שחשוב להכיר לפני שמתחילים.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה Shopify ולמה עסקים ישראלים בוחרים בה ב-2026?</h2>
              <p>
                Shopify היא פלטפורמת מסחר אלקטרוני מאוחסנת (SaaS) — כלומר החברה מנהלת בעצמה את השרתים, האבטחה והעדכונים, ואתם משלמים דמי מנוי חודשיים על תשתית מוכנה לשימוש. בניגוד לבניית חנות עצמאית על וורדפרס או שרת פרטי, לא צריך להתעסק בהתקנת SSL, עדכוני אבטחה או ניהול אחסון — הכל כלול במנוי.
              </p>
              <p>
                לפי נתוני StoreCensus, יש כיום כ-5,809 חנויות Shopify פעילות שהוקמו על ידי עסקים המבוססים בישראל. מדובר במקור צד שלישי ולא בדוח רשמי של Shopify עצמה, אבל הוא מצביע על כך שהפלטפורמה כבר לא "אקזוטית" בשוק המקומי — יש כיום אקוסיסטם שלם של סוכנויות Shopify Plus ישראליות, כפי שמדווח Globes על צמיחה מהירה של השוק המקומי בשנים האחרונות.
              </p>
              <p>
                הסיבה המרכזית שעסקים בוחרים ב-Shopify היא פשטות: אין צורך בצוות טכני פנימי כדי לשמור על החנות פועלת, ויש מעל 10,000 אפליקציות בחנות האפליקציות של Shopify שמכסות כמעט כל צורך תפעולי — ממועדוני לקוחות ועד דוחות מכירה מתקדמים.
              </p>
              <p>
                חשוב להבהיר למי Shopify בעיקר מתאימה: עסקים עם קטלוג של עשרות עד אלפי מוצרים, שרוצים למכור בכמה ערוצים במקביל (אתר, רשתות חברתיות, מרקטפלייס) בלי לבנות אינטגרציה בעצמם. עסק שמוכר רק כמה מוצרים בודדים, או שעדיין בודק אם יש ביקוש לרעיון, לעיתים ימצא שכלי בניית אתר מהיר עם AI זול ומהיר יותר בשלב הראשוני — אבל ברגע שהמכירות עולות, Shopify היא הכתובת הבטוחה ביותר להמשך צמיחה בלי לבנות תשתית מאפס.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה Shopify בישראל ב-2026?</h2>
              <p>
                Shopify מציעה כיום חמש תוכניות. Starter מתחילה ב-5$ לחודש (מתאימה למי שמוכר רק בדפי נחיתה או ברשתות חברתיות, בלי חנות מלאה). Basic עולה 39$ לחודש, או 29$ לחודש בחיוב שנתי. Grow (שנקראת גם "Shopify") עולה 105$ לחודש, או 79$ שנתי. Advanced עולה 399$ לחודש, או 299$ שנתי. Plus, המיועדת לארגונים גדולים עם מחזור גבוה, מתחילה בסביבות 2,300$ לחודש. בכל התוכניות הליניאריות, חיוב שנתי חוסך כ-25% בהשוואה לחיוב חודשי.
              </p>
              <p>
                חשוב להבין שהמחיר המפורסם הוא רק חלק מהעלות הכוללת. בנוסף למנוי יש עמלות סליקה (שמפורטות בסעיף הבא), ולרוב גם עלות של אפליקציות נוספות — ניהול מלאי מתקדם, שיווק אוטומטי, תמיכה בעברית בצ'אט — שמייקרות את העלות האפקטיבית מעבר למחיר הבסיסי שמופיע בעמוד התמחור.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך עובדת הסליקה בישראל אם Shopify Payments לא נתמך?</h2>
              <p>
                זו אחת הנקודות הקריטיות שבעלי עסקים ישראלים מפספסים: ישראל לא מופיעה ברשימת המדינות הנתמכות ב-Shopify Payments, פתרון הסליקה המובנה של Shopify. המשמעות: חנות ישראלית חייבת לעבוד עם ספק סליקה חיצוני (לדוגמה חברת סליקה מקומית או שער תשלום בינלאומי שמתממשק ל-Shopify).
              </p>
              <p>
                כשמשתמשים בספק סליקה חיצוני, Shopify גובה עמלת עסקה נוספת מעבר לעמלת הסליקה עצמה: 2% בתוכנית Basic, 1% בתוכנית Grow, ו-0.6% בתוכנית Advanced. ככל שמשדרגים תוכנית, העמלה הנוספת פוחתת — אחד השיקולים שחשוב לקחת בחשבון כשבוחרים תוכנית, לא רק לפי דמי המנוי החודשיים.
              </p>
              <p>
                בפועל, זה אומר שהעלות הכוללת בישראל גבוהה מעט ממה שרואים בעמוד התמחור הרשמי, כי צריך לחבר גם את עמלת הסליקה החיצונית וגם את עמלת העסקה הנוספת של Shopify. בעת בחירת ספק סליקה, שווה להשוות בין כמה ספקים מקומיים ולבדוק את העמלה המשולבת לפני החתימה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה זה עולה בפועל? דוגמה לחנות עם מחזור של 10,000 ש"ח בחודש</h2>
              <p>
                כדי להמחיש את העלות האמיתית ולא רק את דמי המנוי, שווה להסתכל על דוגמה מחושבת: עבור חנות עם מחזור חודשי של 10,000 ש"ח, העלות הכוללת (מנוי + עמלות) על תוכנית Shopify Basic מוערכת בכ-550 ש"ח בחודש, בהשוואה לכ-650 ש"ח על Wix תחת הנחות חישוב דומות. מדובר בדוגמה ממקור השוואתי חיצוני ולא בהצעת מחיר רשמית, אבל היא מראה שבמחזורים קטנים-בינוניים, Shopify יכולה להיות משתלמת יותר ממה שנדמה ממבט ראשון על המחיר הבסיסי בדולרים.
              </p>
              <p>
                חנויות עם מחזור גבוה יותר צריכות לשים לב במיוחד לעמלת העסקה הנוספת: ככל שהמחזור עולה, ההפרש בין 2% (Basic) ל-0.6% (Advanced) יכול להצטבר לסכומים משמעותיים בחודש — מה שהופך את השדרוג לתוכנית גבוהה יותר למשתלם כלכלית מעבר נקודת מחזור מסוימת, גם אם דמי המנוי עצמם גבוהים יותר.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך פותחים חנות Shopify שלב אחרי שלב?</h2>
              <p>
                התהליך הרשמי, לפי מרכז העזרה של Shopify, מתחיל בהרשמה באתר shopify.com עם כתובת דוא"ל וסיסמה, או עם חשבון Google, Apple או Facebook. פרטי חיוב הם אופציונליים בשלב הראשוני, אבל נדרשים לפני שתקופת הניסיון מסתיימת והחנות ממשיכה לפעול בתשלום.
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>הכנת מספר עוסק/ח"פ וחשבון בנק עסקי מראש — זה מקצר משמעותית את תהליך ההקמה.</li>
                <li>בחירת תבנית (Theme) — יש עשרות תבניות חינמיות ובתשלום, חלקן בעברית ו-RTL מובנה.</li>
                <li>הגדרת דומיין — אפשר לרכוש דומיין דרך Shopify בכ-14$ לשנה, או להשתמש זמנית בדומיין חינמי מסוג myshopify.com.</li>
                <li>חיבור ספק סליקה חיצוני, כי Shopify Payments לא פעיל בישראל (ראו הסעיף הקודם).</li>
                <li>העלאת קטלוג מוצרים, הגדרת משלוחים ומיסוי מקומי.</li>
                <li>הגדרת שיטות תשלום פופולריות בישראל (כרטיסי אשראי, ולעיתים ביט או תשלומים).</li>
              </ul>
              <p>
                חנות בסיסית עם תבנית מוכנה אפשר להריץ תוך יום-יומיים. חנות מלאה, עם התאמת שיטות תשלום ומשלוחים לישראל ועיצוב מותאם, אורכת בדרך כלל בין כמה ימים לשבועיים כשעובדים לבד — ופחות מזה כשעובדים עם מי שמכיר את הפלטפורמה לעומק.
              </p>
              <p>
                טעות נפוצה בשלב ההקמה היא להעתיק קטלוג גדול "כמו שהוא" מפלטפורמה קודמת בלי לעבור על תיאורי המוצרים ותגיות ה-SEO. מכיוון שכל דף מוצר ב-Shopify הוא בפועל דף שאפשר למצוא בגוגל, שווה לכתוב כותרות ותיאורים בעברית תקנית וממוקדת לפני ההשקה, ולא לאחר שהתנועה הראשונה כבר מגיעה — זה חוסך סבב שני של עריכות על כל הקטלוג.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איזו תוכנית Shopify מתאימה לכל סוג עסק?</h2>
              <p>
                הבחירה בין התוכניות צריכה להתבסס על מחזור חודשי צפוי ולא רק על התקציב הפנוי כרגע, כי עמלת העסקה הנוספת (2% ל-0.6%, בהתאם לתוכנית) יכולה להפוך תוכנית "זולה" ליקרה יותר בפועל כשהמחזור עולה:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>Starter (5$ לחודש):</strong> עסק שמוכר דרך דף נחיתה בודד או רשתות חברתיות, בלי צורך בחנות מלאה עם קטלוג וניווט.</li>
                <li><strong>Basic (39$/29$ לחודש):</strong> חנות חדשה עם מחזור חודשי נמוך-בינוני, שרוצה את כל הפונקציונליות הבסיסית בלי לשלם על תכונות שלא תשתמש בהן.</li>
                <li><strong>Grow (105$/79$ לחודש):</strong> חנות עם כמה אנשי צוות, צורך בדוחות מתקדמים יותר ומחזור שגדל בהדרגה.</li>
                <li><strong>Advanced (399$/299$ לחודש):</strong> חנות עם מחזור גבוה, שבה החיסכון בעמלת העסקה הנוספת (0.6% בלבד) מכסה בקלות את ההפרש במנוי החודשי.</li>
                <li><strong>Plus (מ-2,300$ לחודש):</strong> ארגונים גדולים עם צרכים מותאמים אישית, API מלא ותמיכה ייעודית.</li>
              </ul>
              <p>
                ברוב המקרים, כדאי להתחיל בתוכנית Basic ולשדרג רק כשהנתונים בפועל — מחזור, מספר הזמנות, צורך בדוחות — מצדיקים זאת, ולא מראש "ליתר ביטחון". שימו לב שבחיוב שנתי (לא חודשי) ההנחה של כ-25% על שלוש התוכניות המרכזיות משמעותית מספיק כדי להצדיק מעבר לחיוב שנתי כבר אחרי החודשים הראשונים של פעילות קבועה, במיוחד אם ברור שהעסק ימשיך לפעול על הפלטפורמה לאורך זמן.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה היתרונות של Shopify לעסק ישראלי?</h2>
              <p>
                היתרון הגדול ביותר הוא שהפלטפורמה מתארחת אצל Shopify, כולל שרתים, הצפנת SSL ועמידה בתקן PCI-DSS ללא צורך בפעולה נוספת מהצד שלכם. תהליך התשלום המובנה, לפי הצהרת Shopify עצמה, מגדיל המרות בכ-15% בממוצע בהשוואה לעמוד תשלום חיצוני — טענה של החברה שראוי לבדוק מול הנתונים של החנות שלכם בפועל.
              </p>
              <p>
                יתרונות נוספים: מעל 10,000 אפליקציות בחנות האפליקציות שמכסות כל צורך תפעולי, מערכות קופה (POS) לעסקים עם חנות פיזית שרוצים לנהל מכירות מקוונות ובחנות תחת מערכת אחת, אינטגרציות ישירות עם ערוצי מכירה כמו TikTok, Instagram ו-Amazon, ותמיכה 24/7 מהחברה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה החסרונות וממה להיזהר לפני שפותחים חנות?</h2>
              <p>
                החיסרון המרכזי לעסק ישראלי הוא היעדר Shopify Payments, מה שמוסיף שכבת עמלה נוספת (2%-0.6% בהתאם לתוכנית) מעבר לדמי הסליקה הרגילים של הספק החיצוני שבוחרים. כלומר מתוך שלושה גורמי עלות — מנוי, עמלת סליקה ועמלת עסקה — רק שניים נראים בבירור בעמוד התמחור.
              </p>
              <p>
                חסרונות נוספים: Shopify לא מספקת אירוח דואר אלקטרוני כחלק מהשירות, יש צורך לשדרג תוכנית כדי לקבל פונקציונליות מתקדמת מסוימת, ובניגוד ל-WooCommerce אין "גרסת קוד פתוח" חינמית מעבר לתקופת הניסיון — אתם תלויים בפלטפורמה הסגורה לאורך זמן, כולל אם בעוד שנתיים תרצו לעבור לפתרון אחר.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Shopify מול WooCommerce מול בניית אתר עם AI — מה מתאים לי?</h2>
              <p>
                לפי נתוני W3Techs מ-2026, WooCommerce מופעל על כ-8.2% מכלל האתרים ברשת לעומת כ-5.3% ב-Shopify — כך ש-WooCommerce נפוץ יותר בכמות מוחלטת, בעיקר בין חנויות קטנות. אבל בין האתרים בעלי התנועה הגבוהה ביותר היחס מתהפך לטובת Shopify, שגם צומח מהר יותר בשנים האחרונות. המשמעות הפרקטית: ככל שחנות גדלה, Shopify מתחזקת.
              </p>
              <p>
                מי שמחפש את הדרך הזולה והמהירה ביותר לבדוק רעיון עסקי לפני השקעה בתשתית מסחר מלאה, יכול להתחיל עם כלי AI כמו <Link to="/blog/ai-ecommerce-vs-shopify-2026" className="text-primary hover:underline">Lovable ולהשוות מול Shopify</Link> — ולעבור לתשתית מלאה כשהקטלוג וההזמנות מצדיקים זאת. למי שעדיין מתלבט בין שלוש האפשרויות עם נתוני מחיר ושוק מפורטים, מומלץ לקרוא את ה<Link to="/blog/ecommerce-platform-decision-guide-2026" className="text-primary hover:underline">מדריך ההחלטה המלא בין AI, Shopify ו-WooCommerce</Link>.
              </p>
              <p>
                עסקים שעדיין מתלבטים אם בכלל לפתוח חנות אונליין, או להישאר רק עם נוכחות פיזית, יכולים להיעזר ב<Link to="/blog/online-vs-physical-store" className="text-primary hover:underline">השוואה בין חנות אונליין לחנות פיזית</Link> כצעד מקדים לפני בחירת פלטפורמה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך HEY Digital עוזרת להקים ולחבר חנות Shopify בישראל?</h2>
              <p>
                מעבר לבחירת תוכנית ותבנית, הערך האמיתי מתחיל כשחנות Shopify מחוברת לשאר המערכות העסקיות. אנחנו ב-HEY Digital בונים חנויות Shopify מותאמות לשוק הישראלי — כולל הגדרת ספק סליקה מקומי, התאמת שיטות תשלום ו<Link to="/solutions/web-development" className="text-primary hover:underline">פיתוח עיצוב מותאם אישית</Link> שמעבר לתבנית הסטנדרטית.
              </p>
              <p>
                מה שמבדיל חנות שעובדת מחנות שרק "קיימת" הוא <Link to="/solutions/business-automation" className="text-primary hover:underline">האוטומציה שרצה מתחתיה</Link> — תזכורות אוטומטיות על עגלות נטושות, עדכוני מלאי בזמן אמת וסנכרון הזמנות למערכת ה-CRM. אנחנו גם מחברים חנויות Shopify ל<Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">אוטומציית וואטסאפ</Link>, כדי שאישורי הזמנה, עדכוני משלוח ושירות לקוחות יתנהלו בערוץ שהלקוח הישראלי הממוצע בודק כל כמה דקות.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לפתוח חנות Shopify שמותאמת לשוק הישראלי?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת ייעוץ חינם — בלי מחויבות.</p>
              <button
                onClick={openPopup}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                קבעו שיחה עכשיו
              </button>
            </div>

          </div>
        </Section>
        <Footer />
      </main>
    </>
  );
};

export default ShopifyIsraelGuide;

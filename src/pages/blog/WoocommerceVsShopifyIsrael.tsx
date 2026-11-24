import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  {
    question: 'מה ההבדל הכי חשוב בין WooCommerce ל-Shopify בשביל עסק ישראלי?',
    answer: 'ההבדל המרכזי הוא בין בעלות מלאה לנוחות מלאה. WooCommerce הוא תוסף חינמי לוורדפרס שדורש אחסון, התקנה ותחזוקה משלכם, אבל נותן שליטה מלאה בקוד, בעיצוב ובנתונים. Shopify הוא פלטפורמה סגורה שבה מקבלים אחסון, אבטחה ומערכת קופה מובנית במחיר חודשי קבוע של 39$-399$ (29$-299$ בחיוב שנתי), אבל השליטה מוגבלת למה שהפלטפורמה מתירה. עסק עם צוות טכני או מפתח יבחר בדרך כלל ב-WooCommerce, ועסק שרוצה לפתוח חנות הכי מהר בלי לדאוג לתחזוקה יבחר ב-Shopify.',
  },
  {
    question: 'איזו פלטפורמה נפוצה יותר בפועל, WooCommerce או Shopify?',
    answer: 'זה תלוי איך סופרים. לפי StoreLeads מאוגוסט 2026, ל-WooCommerce יש כ-4.08 מיליון חנויות פעילות מול כ-3.06 מיליון ל-Shopify — WooCommerce מוביל במספר הכולל. אבל Shopify צומח מהר יותר: מספר החנויות שלו עלה כ-11% בין השנים ברביע השני של 2026, בעוד WooCommerce ירד כ-8% באותה תקופה. בנוסף, בין האתרים הגדולים והעמוסים ביותר ברשת, Shopify מוביל: לפי BuiltWith, יש לו כ-28.8% נתח בקרב מיליון האתרים המובילים, מול כ-18.2% ל-WooCommerce.',
  },
  {
    question: 'כמה עולה להקים חנות WooCommerce בפועל?',
    answer: 'לפי הערכה של Hostinger, חנות קטנה עם כעשרה מוצרים עולה בין כ-75$ ל-920$ בשנה (אחסון, דומיין, תבנית ותוספים בסיסיים), וחנות בינונית יכולה לנוע בין 1,420$ ל-6,550$ בשנה, בהתאם לתוספים, לאבטחה ולפיתוח מותאם. התוסף עצמו חינמי, אך העלות האמיתית נובעת מהאחסון, התבניות, התוספים הפרימיום ועלויות הפיתוח — ולכן מומלץ לבקש הצעת מחיר ישראלית ספציפית ולא להסתמך רק על הערכות דולריות כלליות.',
  },
  {
    question: 'האם Shopify זול יותר או יקר יותר מ-WooCommerce בטווח הארוך?',
    answer: 'אין תשובה אחת נכונה לכל המקרים. Shopify גובה מחיר חודשי קבוע של 39$ (תוכנית Basic, או 29$ בחיוב שנתי), בנוסף לעמלות עסקה ולעלויות אפליקציות שיכולות להעלות את העלות החודשית הכוללת ל-400$-800$ בחנות עם מחזור מכירות גבוה, לפי הערכות של מדריכי תמחור. WooCommerce ללא עלות רישיון חודשי, אבל מצריך תקציב עצמאי לאחסון, תחזוקה ולעיתים מפתח, כך שבחנות קטנה הוא יכול להיות זול יותר, ובחנות גדולה עם הרבה תוספים ההבדל מצטמצם.',
  },
  {
    question: 'מה קרה למערכת הקופה (POS) של WooCommerce ואיך זה משפיע על חנות עם סניף פיזי?',
    answer: 'לפי כמה מקורות בתעשייה, WooCommerce הפסיקה בפברואר 2026 את מערכת הקופה (POS) המקורית שלה, כך שמי שמנהל גם חנות פיזית צריך להתקין אפליקציית קופה חיצונית ולחבר אותה בעצמו. ב-Shopify, לעומת זאת, מערכת ה-POS נשארת מובנית וזמינה בחינם בכל התוכניות, מה שהופך אותה לאופציה פשוטה יותר לעסק שמוכר גם באינטרנט וגם בחנות פיזית במקביל.',
  },
];

const WoocommerceVsShopifyIsrael = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="WooCommerce vs Shopify — מה עדיף לחנות ישראלית ב-2026? | HEY Digital"
        description="WooCommerce vs Shopify: השוואת מחירים, יתרונות וחסרונות לחנות ישראלית ב-2026 — כמה עולה כל פלטפורמה, מה נתוני השוק האמיתיים, ואיזו מתאימה לעסק שלכם."
        path="/blog/woocommerce-vs-shopify-israel"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'WooCommerce vs Shopify — מה עדיף לחנות ישראלית?', path: '/blog/woocommerce-vs-shopify-israel' },
      ]} />
      <ArticleSchema
        title="WooCommerce vs Shopify — מה עדיף לחנות ישראלית?"
        description="WooCommerce vs Shopify: השוואת מחירים, יתרונות וחסרונות לחנות ישראלית ב-2026 — כמה עולה כל פלטפורמה, מה נתוני השוק האמיתיים, ואיזו מתאימה לעסק שלכם."
        path="/blog/woocommerce-vs-shopify-israel"
        datePublished="2026-11-24"
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">WooCommerce vs Shopify — מה עדיף לחנות ישראלית?</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                WooCommerce מתאים לעסק שרוצה שליטה מלאה בנתונים ובעיצוב ומוכן להשקיע בתחזוקה, ו-Shopify מתאים לעסק שרוצה לפתוח חנות הכי מהר בלי לדאוג לאחסון ולאבטחה. אין תשובה אחת ש"מנצחת" את השנייה — יש התאמה שונה לכל סוג עסק, וההחלטה בין WooCommerce ל-Shopify תלויה בתקציב, בצוות הטכני ובקצב הצמיחה שאתם מתכננים. במאמר הזה נפרק את ההבדלים בפועל: כמה כל אחת עולה, מה נתוני השוק האמיתיים ב-2026, ואיזו מתאימה לחנות ישראלית קטנה או בינונית.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה בעצם ההבדל הטכני בין WooCommerce ל-Shopify?</h2>
              <p>
                WooCommerce הוא תוסף (plugin) חינמי שמותקן על אתר וורדפרס קיים, ומוסיף לו יכולות של חנות אונליין — עגלת קניות, קטלוג מוצרים, סליקה ועוד. המשמעות היא שהעסק צריך אחסון (hosting), דומיין, ובדרך כלל גם תחזוקה שוטפת של גרסאות וורדפרס והתוספים. Shopify, בניגוד לכך, היא פלטפורמה "הכול באתר אחד" (hosted) — החנות, האחסון, האבטחה ומערכת הקופה כולם כלולים במחיר החודשי, בלי צורך בהתקנה עצמאית.
              </p>
              <p>
                ההבדל הזה הוא שורש כל ההבדלים האחרים בין שתי הפלטפורמות: WooCommerce נותנת גמישות ושליטה מלאה כי העסק "בעל הבית" על כל חלק בקוד ובנתונים, ואילו Shopify נותנת פשטות ומהירות הקמה כי הרבה מההחלטות הטכניות כבר נעשו מראש. ברוב המקרים, עסק עם מפתח או צוות טכני ייהנה יותר מ-WooCommerce, ועסק בלי משאבים טכניים ייהנה יותר מ-Shopify.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה Shopify בחודש ב-2026?</h2>
              <p>
                לפי כמה מדריכי תמחור עדכניים מ-2026 (NerdWallet, WebsiteBuilderExpert ואחרים), ל-Shopify יש היום שלוש תוכניות עיקריות: Basic בעלות של 39$ לחודש (או 29$ לחודש בחיוב שנתי), Grow בעלות של 105$ לחודש (79$ שנתי), ו-Advanced בעלות של 399$ לחודש (299$ שנתי). קיימת גם תוכנית Starter במחיר 5$ לחודש, שמתאימה למי שמוכר רק באתר קיים או ברשתות חברתיות ולא צריך חנות מלאה. עסקים גדולים יותר שצריכים יכולות ארגוניות עוברים ל-Shopify Plus, שמתומחרת לפי הצעת מחיר ומתחילה בסביבות 2,300$ לחודש.
              </p>
              <p>
                חשוב לדעת שהמחיר החודשי הוא רק חלק מהעלות הכוללת. עמלות עסקה (אם לא משתמשים במערכת הסליקה הפנימית של Shopify), אפליקציות בתשלום, ועיצוב תבנית פרימיום יכולים להעלות את העלות החודשית האפקטית. לפי אחת ההערכות, בחנות עם מחזור מכירות של מעל 100,000$ בשנה, העלות החודשית הכוללת (מנוי + עמלות + אפליקציות) יכולה להגיע ל-400$-800$ לחודש או יותר — משמעותית מעבר למחיר התוכנית הבסיסי.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה להקים ולתחזק חנות WooCommerce בפועל?</h2>
              <p>
                מכיוון שהתוסף עצמו חינמי, קל לחשוב ש-WooCommerce "לא עולה כלום" — אבל זה מטעה. לפי הערכה של Hostinger, חנות WooCommerce קטנה עם בערך עשרה מוצרים עולה בפועל בין 75$ ל-920$ בשנה, כשההוצאות העיקריות הן אחסון, דומיין, תבנית עיצוב ותוספי הרחבה. חנות בינונית, עם יותר מוצרים ויותר פונקציונליות, יכולה לנוע בין 1,420$ ל-6,550$ בשנה, בהתאם לאיכות האחסון, לתוספים הפרימיום ולעלויות פיתוח שנדרשות.
              </p>
              <p>
                לגבי אחסון עצמו — המרכיב המשמעותי ביותר — אחסון משותף בסיסי לחנות קטנה-בינונית עולה בדרך כלל בין 3$ ל-25$ לחודש, ולמשל חברת Hostinger מציעה בישראל מחיר פרסומי שמתחיל מ-11.99 ₪ לחודש לחבילת אחסון WooCommerce (מחיר שכולל הנחת הרשמה ולא בהכרח משקף את המחיר לטווח ארוך). מעבר לאחסון, תבניות עיצוב נעות בין 0$ ל-100$ בשנה, ועלויות פיתוח מותאם אישית — אם צריך פונקציונליות מיוחדת — הן נפרדות ותלויות בפרויקט.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איזו פלטפורמה פופולרית יותר בפועל — WooCommerce או Shopify?</h2>
              <p>
                התשובה תלויה איך סופרים. לפי נתוני StoreLeads מאוגוסט 2026, ל-WooCommerce יש כ-4.08 מיליון חנויות פעילות מול כ-3.06 מיליון ל-Shopify — יתרון מספרי ל-WooCommerce. אבל מגמת הצמיחה הפוכה: מספר החנויות של Shopify עלה כ-11% בין השנים ברביע השני של 2026, בזמן שמספר החנויות של WooCommerce ירד כ-8% באותה תקופה. כלומר WooCommerce עדיין מוביל בכמות הכוללת, אבל Shopify צומח ו-WooCommerce מתכווץ.
              </p>
              <p>
                התמונה משתנה כשבודקים את האתרים הגדולים והעמוסים ביותר ברשת. לפי HTTP Archive, על פני כל האינטרנט WooCommerce מוביל ב-6.64% נתח מול 4.76% ל-Shopify (יתרון של כ-1.4x). אבל לפי BuiltWith, בין מיליון האתרים המובילים בעולם, Shopify מוביל עם כ-28.8% נתח מול כ-18.2% ל-WooCommerce. ומצד ההכנסות, Shopify מדווח על מחזור מכירות (GMV) של 115.6 מיליארד דולר ברביע השני של 2026 בלבד — נתון שמעיד שחנויות Shopify, גם אם הן מספרית פחות, נוטות להיות גדולות ועמוסות יותר בממוצע.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה היתרונות והחסרונות האמיתיים של WooCommerce?</h2>
              <p>
                היתרון הגדול ביותר של WooCommerce הוא גמישות: מכיוון שהוא תוסף לוורדפרס ולא פלטפורמה סגורה, אפשר לשנות כל חלק בעיצוב, בקוד ובלוגיקה העסקית, ולהעביר את האתר לכל שרת שרוצים בלי להיות "נעולים" לספק יחיד. עלויות התוספים הן בדרך כלל תשלום חד-פעמי עם חידוש אופציונלי לתמיכה, לעומת Shopify שגובה דמי מנוי חודשיים על כל אפליקציה שמתקינים.
              </p>
              <p>
                החיסרון המרכזי הוא שהקמה ותחזוקה דורשות יותר ידע טכני: צריך לרכוש אחסון בנפרד, להתקין וורדפרס, ולדאוג לעדכוני אבטחה באופן שוטף. WooCommerce נותן רק את הבסיס, ומסתמך על תוספים רבים כדי להגיע ליכולות מלאות — מה שאומר יותר רכיבים שצריך לנהל ולתחזק ביחד.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה היתרונות והחסרונות האמיתיים של Shopify?</h2>
              <p>
                היתרון הבולט של Shopify הוא פשטות: האתר, האחסון, האבטחה ומערכת המכירות חיים כולם בלוח בקרה אחד, וההקמה הראשונית יכולה לקחת שעה עד כמה שעות בלבד, ללא התעסקות טכנית. יש גם שילוב מובנה עם ערוצי מכירה נוספים כמו רשתות חברתיות ושווקים מקוונים, מה שמקל על עסק שרוצה למכור בכמה מקומות בלי הגדרה טכנית מורכבת.
              </p>
              <p>
                החיסרון הוא שהשליטה מוגבלת למה שהפלטפורמה מתירה — אי אפשר "לפתוח את המכסה" ולשנות כל דבר כמו בוורדפרס. יש גם עלות חודשית קבועה שמתחילה ב-39$ (29$ בחיוב שנתי) ועולה עם הצמיחה, ועמלות עסקה נוספות אם לא משתמשים במערכת הסליקה המובנית של Shopify — עלות שכדאי לתקצב מראש ולא לגלות אחרי הפתיחה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה קרה למערכת הקופה (POS) של WooCommerce ב-2026, ולמה זה חשוב לחנות עם סניף פיזי?</h2>
              <p>
                שינוי שחשוב להכיר לפני שמחליטים: לפי כמה מקורות בתעשייה, WooCommerce הפסיקה בפברואר 2026 את מערכת הקופה המקורית שלה (WooCommerce POS), כך שעסק שמוכר גם בחנות פיזית וגם אונליין צריך למצוא ולחבר אפליקציית קופה חיצונית בנפרד מהחנות המקוונת. זה מוסיף שלב נוסף של הגדרה ואינטגרציה שלא היה קיים קודם.
              </p>
              <p>
                ב-Shopify, לעומת זאת, מערכת ה-POS נשארת מובנית וזמינה בחינם בכל התוכניות, כך שעסק עם סניף פיזי אחד או יותר יכול לחבר קופה ואתר באותה פלטפורמה בלי הגדרה חיצונית נפרדת. לעסקים "פיזי + דיגיטלי" במקביל — כמו חנות בגדים, חנות מוצרי בית או עסק עם דוכן בשוק — זה שיקול ממשי שיכול להכריע את הכף לכיוון Shopify, גם אם WooCommerce מנצח בפרמטרים אחרים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה עם ביצועים ו-SEO — איזו פלטפורמה מתאימה יותר לקידום בגוגל?</h2>
              <p>
                הנתונים כאן סותרים, ולכן כדאי להתייחס אליהם בזהירות. מקור אחד מדווח ש-WooCommerce מדורגת בממוצע על כ-34% יותר מילות מפתח אורגניות לעומת Shopify, אבל הנתון מגיע ממקור שלא מפרט את המתודולוגיה שלו במלואה, ולכן אין לראות בו קביעה מוחלטת. מקור אחר מציין ש-Shopify מציעה זמן טעינה ממוצע של כ-1.8 שניות "מהקופסה" בלי אופטימיזציה נוספת, יתרון שנובע מכך שהתשתית מנוהלת ומותאמת מראש על ידי הפלטפורמה.
              </p>
              <p>
                בפועל, SEO של חנות אונליין תלוי הרבה יותר באיך שבונים אותה — מבנה כתובות URL, מהירות תמונות, תוכן איכותי ובניית קישורים — מאשר בבחירת הפלטפורמה עצמה. גם WooCommerce וגם Shopify יכולים להגיע לדירוג גבוה בגוגל כשבונים אותם נכון, אבל WooCommerce דורש יותר עבודת אופטימיזציה ידנית, ו-Shopify נותן בסיס טכני מהיר יותר עם פחות התעסקות.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איזו פלטפורמה מתאימה יותר לחנות ישראלית קטנה או בינונית?</h2>
              <p>
                לחנות ישראלית קטנה בלי צוות טכני, שרוצה לפתוח מהר ולא להתעסק עם אחסון ואבטחה, Shopify בדרך כלל יתרון: מחיר חודשי קבוע וידוע מראש (39$, או כ-150 ₪ לחודש בערך לפי שער חליפין משתנה), הקמה מהירה, ותמיכה בערוצי מכירה נוספים. לעסק שכולל גם מכירה בחנות פיזית, הפתרון המובנה של Shopify ל-POS הוא יתרון נוסף שמונע הגדרה נפרדת.
              </p>
              <p>
                לעומת זאת, עסק עם מפתח בצוות, או עם צרכים מיוחדים שלא מכוסים ברכיבי המדף הסטנדרטיים (כמו הגדרות מורכבות של מחירים לפי לקוח, שילוב ייחודי עם מערכת ERP קיימת, או עיצוב מאוד שונה מהתבניות הסטנדרטיות), ימצא ב-WooCommerce גמישות שאין ב-Shopify, גם במחיר של יותר עבודת תחזוקה. חנות שמתכננת צמיחה משמעותית בהיקף רחב, עם הרבה תוספים ואינטגרציות, צריכה לבדוק את שתי האופציות מול הצעת מחיר ישראלית ספציפית, כי ההבדל בעלות הכוללת לאורך זמן תלוי מאוד בפרטי המקרה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">במה זה שונה ממאמרים אחרים שכתבנו על בניית חנויות אונליין?</h2>
              <p>
                כתבנו בעבר על <Link to="/blog/shopify-israel-guide" className="text-primary hover:underline">Shopify ישראל — מדריך פתיחת חנות 2026</Link>, שמתמקד במה שצריך לדעת כדי לפתוח חנות Shopify בישראל בפועל — תשלומים, מיסוי ושילוח. במאמר הזה הזווית שונה: השוואה ישירה בין WooCommerce ל-Shopify, לפני שבוחרים פלטפורמה בכלל. למי שרוצה להשוות גם כלי בנייה מבוססי AI, כתבנו על <Link to="/blog/ai-ecommerce-vs-shopify-2026" className="text-primary hover:underline">חנות איקומרס עם AI מול Shopify</Link>, ועל <Link to="/blog/ecommerce-platform-decision-guide-2026" className="text-primary hover:underline">מדריך החלטה להקמת חנות איקומרס</Link> שמשווה בין כמה פלטפורמות במקביל, כולל WooCommerce ו-Shopify.
              </p>
              <p>
                מי שעדיין שוקל אם לפתוח חנות אונליין בכלל, לפני שבוחרים פלטפורמה ספציפית, מוזמן לקרוא את <Link to="/blog/ecommerce-store-guide-2026" className="text-primary hover:underline">חנות איקומרס — איך פותחים ומה חייב להיות בה ב-2026</Link>, שמסביר את השלבים הבסיסיים שנכונים לכל פלטפורמה שתבחרו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך HEY Digital עוזרת לעסק ישראלי לבחור ולבנות את החנות הנכונה?</h2>
              <p>
                אצלנו ב-HEY Digital התהליך מתחיל במיפוי הצרכים האמיתיים של העסק, לפני שמדברים על פלטפורמה ספציפית: כמה מוצרים יש, האם יש סניף פיזי שצריך לחבר לקופה, האם צריך אינטגרציה עם מערכת CRM או חיוב קיימת, ומה קצב הצמיחה המתוכנן לשנה-שנתיים הקרובות. רק אחרי שהצרכים האלה ברורים, אנחנו מציעים בין WooCommerce ל-Shopify, או לחלופין כלי בנייה מהיר יותר שמתאים לעסקים שרוצים להתחיל קטן.
              </p>
              <p>
                חלק מרכזי מהעבודה שלנו הוא לא רק להקים את החנות, אלא לחבר אותה ל<Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה עסקית</Link> שחוסכת זמן אחרי ההקמה — תזכורות מלאי אוטומטיות, חיבור בין הזמנות חדשות לוואטסאפ העסקי, ועדכון CRM בזמן אמת בלי הזנה ידנית. בנייה טכנית נכונה היא תחת <Link to="/solutions/web-development" className="text-primary hover:underline">פיתוח אתרים</Link>, אבל ההבדל האמיתי בין חנות שעובדת לחנות שתקועה מתגלה בדרך כלל רק כמה חודשים אחרי ההשקה, כשצריך להרחיב, לתחזק ולהוסיף יכולות — ולכן אנחנו בודקים את זה מראש כחלק מההחלטה, ולא רק את מסך הקופה ביום הפתיחה.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">מתלבטים בין WooCommerce ל-Shopify לחנות שלכם?</h3>
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

export default WoocommerceVsShopifyIsrael;

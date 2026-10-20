import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  {
    question: 'מה עדיף לחנות איקומרס חדשה בישראל — AI, Shopify או WooCommerce?',
    answer: 'אין תשובה אחת — זה תלוי בתקציב, בידע הטכני ובקצב הצמיחה הצפוי. חנות קטנה שבודקת שוק עם קטלוג מצומצם מתחילה הכי מהר וזול עם כלי AI כמו Lovable או Base44. עסק שרוצה תשתית מסחר מוכחת בלי להתעסק בתחזוקה טכנית הולך ל-Shopify. ומי שמכיר וורדפרס, רוצה שליטה מלאה ולא מפריע לו לנהל אחסון ותוספים בעצמו — WooCommerce נותן את העלות התחזוקתית הנמוכה ביותר לאורך זמן.'
  },
  {
    question: 'כמה עולה כל פלטפורמה בפועל ב-2026?',
    answer: 'Shopify נעה בין 29$ ל-299$ לחודש בחיוב שנתי (כ-350$-3,600$ בשנה) לפני עמלות סליקה. WooCommerce עצמו חינמי, אבל אחסון, תבנית ותוספים מוסיפים בפועל כ-10-50$ בחודש, ולעיתים הרבה יותר עם תוספי תשלום מתקדמים. כלי AI כמו Lovable עולים בין 25$ ל-50$ לחודש (300$-600$ בשנה) בתוכניות הסטנדרטיות. בישראל, פלטפורמות מקומיות דומות כמו Maxicart ו-e-shop גובות בין 390 ל-990 ₪ לחודש.'
  },
  {
    question: 'מי יותר פופולרי ב-2026 — Shopify או WooCommerce?',
    answer: 'לפי נתוני W3Techs מ-2026, WooCommerce מופעל על 8.2% מכלל האתרים ברשת ו-11.7% מהאתרים המבוססי-CMS, לעומת Shopify על 5.3% מכלל האתרים ו-7.6% מהאתרים המבוססי-CMS — כך ש-WooCommerce מוביל בכמות מוחלטת. אבל בין מיליון האתרים בעלי התנועה הגבוהה ביותר היחס מתהפך לטובת Shopify, ולפי נתוני Store Leads מ-2026 Shopify גם צומח מהר יותר — קצב גידול של כ-11.7% בשנה מול ירידה של כ-6.8% ב-WooCommerce באותה תקופה.'
  },
  {
    question: 'אפשר להתחיל עם AI ולעבור ל-Shopify או WooCommerce בהמשך?',
    answer: 'כן, וזו דרך נפוצה להתחיל בעלות נמוכה. חנות שהוקמה עם Lovable או Base44 יכולה לעבור בהדרגה: Lovable משיקה אינטגרציה ייעודית ל-Shopify, ו-Base44 מאפשרת בנייה מהירה שניתן להרחיב או להחליף לתשתית מסחר מלאה ברגע שהקטלוג וההזמנות מצדיקים זאת. הטעות הנפוצה היא לדחות את ההחלטה יותר מדי זמן ולהעביר מלאי ולקוחות בין מערכות באמצע עומס מכירות.'
  },
  {
    question: 'מה הסיכון הכי גדול בבחירת פלטפורמה לא מתאימה?',
    answer: 'הסיכון המרכזי הוא לא העלות החודשית אלא עלות ההעברה בעתיד — מעבר קטלוג, הזמנות פתוחות ונתוני לקוחות בין פלטפורמות באמצע תקופת מכירות הוא תהליך מורכב שעולה זמן וכסף הרבה יותר מההפרש בדמי המנוי. לכן כדאי לבחור פלטפורמה לפי קצב הצמיחה הצפוי לשנה-שנתיים הקרובות, לא רק לפי המצב הנוכחי.'
  },
];

const EcommercePlatformDecisionGuide2026 = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="בניית חנות איקומרס — AI מול Shopify מול WooCommerce 2026 | HEY Digital"
        description="חנות איקומרס השוואה בין AI מול Shopify מול WooCommerce: מחירים אמיתיים, נתוני שוק 2026 ומדריך החלטה פרקטי לבחירת הפלטפורמה הנכונה לעסק שלכם."
        path="/blog/ecommerce-platform-decision-guide-2026"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'בניית חנות איקומרס — AI מול Shopify מול WooCommerce', path: '/blog/ecommerce-platform-decision-guide-2026' },
      ]} />
      <ArticleSchema
        title="בניית חנות איקומרס — AI מול Shopify מול WooCommerce, מדריך החלטה"
        description="חנות איקומרס השוואה בין AI מול Shopify מול WooCommerce: מחירים אמיתיים, נתוני שוק 2026 ומדריך החלטה פרקטי לבחירת הפלטפורמה הנכונה לעסק שלכם."
        path="/blog/ecommerce-platform-decision-guide-2026"
        datePublished="2026-10-20"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">כלי No-Code</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">בניית חנות איקומרס — AI מול Shopify מול WooCommerce, מדריך החלטה</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                חנות איקומרס השוואה אמיתית בין שלוש הדרכים הנפוצות לפתוח חנות ב-2026 — כלי AI כמו Lovable או Base44, Shopify המאוחסנת והמוכנה, ו-WooCommerce הפתוחה שרצה על וורדפרס — חייבת להסתכל על מחיר, זמן הקמה ותחזוקה לאורך זמן, לא רק על מי "הכי חדש". במדריך הזה נפרק את כל שלוש האפשרויות לפי נתונים אמיתיים מ-2026, כדי שתדעו בדיוק לאיזה כיוון לפנות.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה בעצם ההבדל בין AI, Shopify ל-WooCommerce?</h2>
              <p>
                שלוש האפשרויות פותרות את אותה בעיה בדרכים שונות מהותית. כלי AI כמו <Link to="/blog/lovable-ai-website-builder-guide" className="text-primary hover:underline">Lovable</Link> או Base44 בונים סטורפרונט מתוך תיאור בשפה חופשית — הם מייצרים קוד עובד תוך דקות, אבל לא כוללים "מנוע מסחר" מובנה. Shopify היא פלטפורמה מאוחסנת וסגורה: החברה מנהלת את האחסון, האבטחה והעדכונים, ואתם משלמים דמי מנוי חודשיים על תשתית מוכנה. WooCommerce היא תוסף קוד-פתוח וחינמי שרץ על וורדפרס קיים — זה נותן שליטה מלאה ועלות תוכנה אפסית, אבל מטיל עליכם את האחריות לאחסון, אבטחה ותחזוקה.
              </p>
              <p>
                ההבדל הזה קובע לא רק כמה זה עולה ביום הראשון, אלא כמה עבודה ידנית תישאר עליכם אחרי ההשקה. חנות AI טהורה דורשת חיבור נפרד לניהול מלאי ומיסוי. WooCommerce דורש מישהו שמעדכן תוספים ושומר על גיבויים. Shopify לוקחת את שתי הכאבים האלה מכם, בתמורה למחיר קבוע שאי אפשר להתגמד מתחת לו.
              </p>
              <p>
                יש גם הבדל פחות מדובר אבל חשוב באותה מידה: מי "בעלים" של הקוד והנתונים. ב-Shopify הקטלוג, ההזמנות וההיסטוריה שלכם יושבים בתוך מערכת סגורה של החברה — נוח מאוד לתפעול יומיומי, אבל פחות גמיש אם רוצים בעוד שנתיים לעבור לפלטפורמה אחרת. ב-WooCommerce, הנתונים יושבים על בסיס הנתונים של וורדפרס שלכם, ובכלי AI כמו Lovable הקוד נוצר כפרויקט עצמאי שאפשר להעביר למפתח. זה שיקול שכדאי לשים על השולחן לפני שבוחרים, לא רק אחרי.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה כל פלטפורמה בפועל ב-2026?</h2>
              <p>
                Shopify מציעה כיום חמש תוכניות: Basic ב-39$ לחודש (29$ בחיוב שנתי), Grow ב-105$ לחודש (79$ שנתי), Advanced ב-399$ לחודש (299$ שנתי) ו-Plus שמתחילה ב-2,300$ לחודש לארגונים גדולים, בתוספת עמלות סליקה שנעות בין 1.1% ל-2.9%+30 סנט לעסקה. WooCommerce עצמו חינמי כתוסף, אבל אחסון וורדפרס איכותי, תבנית מקצועית ותוספי תשלום/משלוח מוסיפים בפועל עשרות דולרים בחודש — ועדיין ללא עמלת פלטפורמה, רק עמלת ספק הסליקה שבחרתם.
              </p>
              <p>
                כלי AI נעים בטווח נמוך משמעותית: תוכנית Pro של Lovable עולה 25$ לחודש עם 100 קרדיטים, ותוכנית Business 50$ לחודש — כך שטווח עלות שנתי ריאלי הוא 300$-600$, הרבה מתחת לתוכנית הבסיס של Shopify. בישראל, פלטפורמות מקומיות מקבילות כמו Maxicart ו-e-shop גובות בין 390 ל-990 ₪ לחודש, ועיצוב מותאם אישית יכול להוסיף עוד 10,000-30,000 ₪ בהקמה חד-פעמית, בכל אחת מהאפשרויות שבוחרים בה חברת פיתוח.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מי מוביל בנתוני שוק ב-2026 — Shopify או WooCommerce?</h2>
              <p>
                לפי נתוני W3Techs מ-2026, WooCommerce מותקן על 8.2% מכלל האתרים ברשת ו-11.7% מהאתרים המבוססי-CMS, לעומת 5.3% ו-7.6% בהתאמה ל-Shopify — כלומר בכמות מוחלטת WooCommerce גדולה יותר. אותו דבר עולה מנתוני Store Leads: כ-4.34 מיליון חנויות WooCommerce פעילות (40.1% מהחנויות שנמדדו) לעומת כ-2.84 מיליון חנויות Shopify (26.3%).
              </p>
              <p>
                אבל התמונה מתהפכת כשבודקים את מיליון האתרים בעלי התנועה הגבוהה ביותר — שם Shopify מוביל, ולפי נתוני Store Leads הוא גם צומח הרבה יותר מהר: קצב גידול של כ-11.7% בשנה האחרונה מול ירידה של כ-6.8% בכמות אתרי WooCommerce באותה תקופה. המשמעות הפרקטית: WooCommerce נפוץ יותר בין חנויות קטנות, ו-Shopify מתחזק ככל שחנות גדלה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה היתרונות והחסרונות של WooCommerce לחנות ישראלית?</h2>
              <p>
                היתרון המרכזי של WooCommerce הוא עלות תוכנה אפסית ושליטה מוחלטת — אין עמלת פלטפורמה, אין הגבלת תבניות, ואפשר להתאים כל רכיב בחנות דרך קוד פתוח. זה הופך אותו למתאים במיוחד למי שמכיר וורדפרס או שכבר יש לו אתר וורדפרס פעיל ורוצה להוסיף חנות מעליו בלי לבנות הכל מאפס.
              </p>
              <p>
                החיסרון: כל האחריות התחזוקתית נופלת עליכם — התקנת SSL, גיבויים, עדכוני אבטחה לתוספים, ובחירת אחסון שעומד בעומסי תנועה. ברגע שהקטלוג גדל, יש צורך בתוספים נוספים לניהול מלאי ומיסוי, וכל תוסף הוא נקודת כשל פוטנציאלית נוספת שצריך לעקוב אחריה. זה פתרון חסכוני בכסף, אבל יקר בזמן אם אין מישהו שמנהל אותו באופן שוטף.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה היתרונות והחסרונות של Shopify לחנות ישראלית?</h2>
              <p>
                Shopify נותנת תשתית מסחר שלמה מהיום הראשון: מעל 100 שערי תשלום, ניהול מלאי אוטומטי, שחזור עגלות נטושות, אנליטיקס מובנה ומעל 10,000 אפליקציות שמכסות כמעט כל צורך תפעולי — הצפנת SSL, עמידה בתקן PCI-DSS ועדכונים אוטומטיים כלולים במחיר. זה מתאים במיוחד למי שרוצה להתחיל למכור מהר בלי להתעסק באינפרה.
              </p>
              <p>
                החיסרון: מודל התמחור קבוע ועולה עם הצמיחה — דמי מנוי חודשיים קבועים בתוספת עמלת עסקה, ואפליקציות נוספות שמייקרות את העלות האפקטיבית הרבה מעבר למחיר המפורסם. בניגוד ל-WooCommerce, אין פה "גרסה חינמית" אמיתית מעבר לתקופת הניסיון.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מתי כלי AI כמו Lovable או Base44 הוא הבחירה הנכונה?</h2>
              <p>
                כלי AI מתאימים כשהמטרה היא לבדוק רעיון עסקי מהר ובתקציב מצומצם — קטלוג קטן, עגלת קניות פשוטה ועמוד תשלום בודד, הכל תוך שעות עד יום-יומיים של איטרציות. זו הדרך הזולה ביותר להוציא חנות לאוויר ולראות אם יש ביקוש אמיתי, לפני שמשקיעים בתשתית מסחר מלאה. בנוסף, <Link to="/blog/base44-vs-wordpress-plugins" className="text-primary hover:underline">Base44</Link> ו-Lovable מייצרים קוד עובד שאפשר להעביר למפתח או להרחיב בהמשך.
              </p>
              <p>
                החיסרון המרכזי כבר ברור מהשוואת היתרונות: אין מתחת לממשק "מנוע מסחר" — ניהול וריאציות מוצר, חישוב מיסים אוטומטי וכללי משלוח צריך לבנות בנפרד. ברגע שההזמנות עולות למאות בחודש, הפער הזה הופך משמעותי, ואז עדיף לשלב עם Shopify (קיימת אינטגרציה רשמית ייעודית בין Lovable ל-Shopify) או לעבור לתשתית מלאה.
              </p>
              <p>
                דוגמה פרקטית: עסק שמוכר עשרה מוצרים בלבד, בלי וריאציות מידה או צבע, יכול לרוץ שנים עם חנות AI בלי להרגיש שחסר לו כלום. עסק שמוכר בגדים עם וריאציות מידה, צבע ומלאי מתחלף בכל סניף ירגיש את המגבלה הזו תוך חודשים. ההבדל הוא לא "כמה מוצרים" אלא "כמה מורכבות תפעולית" יש מתחת לקטלוג.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה זמן לוקח להקים כל פתרון?</h2>
              <p>
                חנות AI בסיסית אפשר להריץ תוך שעות בודדות עד יום-יומיים. הקמת חנות WooCommerce דורשת התקנת וורדפרס, בחירת תבנית ותוספים והגדרת תשלום ומשלוח — בדרך כלל כמה ימים לשבוע, תלוי בניסיון הטכני של מי שמקים. הקמת Shopify מלאה, כולל בחירת תבנית, הגדרת מוצרים, שיטות תשלום מקומיות ומשלוחים בהתאמה לישראל, אורכת בדרך כלל בין כמה ימים לשבועיים כשעובדים לבד — ופחות מזה כשעובדים עם איש מקצוע שמכיר את הפלטפורמה לעומק.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">טבלת השוואה — AI מול Shopify מול WooCommerce</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-muted/50 text-foreground">
                      <th className="p-3 text-right font-semibold border-b border-border">קריטריון</th>
                      <th className="p-3 text-right font-semibold border-b border-border">AI (Lovable/Base44)</th>
                      <th className="p-3 text-right font-semibold border-b border-border">Shopify</th>
                      <th className="p-3 text-right font-semibold border-b border-border">WooCommerce</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">עלות שנתית</td>
                      <td className="p-3">300$-600$</td>
                      <td className="p-3">כ-350$-3,600$+ (לפני עמלות)</td>
                      <td className="p-3">תוכנה חינמית, אחסון+תוספים ~100-600$</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">זמן הקמה</td>
                      <td className="p-3">שעות עד יום-יומיים</td>
                      <td className="p-3">כמה ימים עד שבועיים</td>
                      <td className="p-3">כמה ימים עד שבוע</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">תחזוקה טכנית</td>
                      <td className="p-3">מינימלית</td>
                      <td className="p-3">מנוהלת על ידי הפלטפורמה</td>
                      <td className="p-3">באחריותכם (אחסון, גיבויים, עדכונים)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">נפוצות ברשת (2026)</td>
                      <td className="p-3">—</td>
                      <td className="p-3">5.3% מהאתרים</td>
                      <td className="p-3">8.2% מהאתרים</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">מתאים ל-</td>
                      <td className="p-3">MVP, בדיקת שוק, קטלוג קטן</td>
                      <td className="p-3">חנות גדלה, מאות-אלפי הזמנות</td>
                      <td className="p-3">מי שמכיר וורדפרס, רוצה שליטה מלאה</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אז איך בוחרים נכון לפי סוג העסק?</h2>
              <p>
                אין תשובה אחידה לכל העסקים — הבחירה הנכונה תלויה בשילוב של תקציב, ידע טכני פנימי וקצב הצמיחה שאתם מתכננים לשנה-שנתיים הקרובות:
              </p>
              <ul className="list-disc list-inside space-y-3 mr-4">
                <li><strong>בודקים רעיון עסקי, קטלוג קטן, תקציב מצומצם:</strong> כלי AI כמו Lovable או Base44 — הדרך הזולה והמהירה ביותר.</li>
                <li><strong>יש לכם אתר וורדפרס פעיל, או מישהו טכני שמנהל אותו:</strong> WooCommerce — עלות תוכנה אפסית תמורת תחזוקה עצמית.</li>
                <li><strong>רוצים תשתית מוכחת שלא דורשת ניהול טכני, עם קטלוג בינוני-גדול:</strong> Shopify.</li>
                <li><strong>צופים צמיחה משמעותית בשנה הקרובה:</strong> כדאי להתחיל ישר ב-Shopify או בשילוב AI+Shopify, כדי לא להעביר מלאי ולקוחות בין מערכות באמצע עומס מכירות.</li>
              </ul>
              <p>
                חשוב לזכור: הסיכון הגדול ביותר הוא לא דמי המנוי החודשיים, אלא עלות ההעברה אם בוחרים פלטפורמה שלא גדלה עם העסק. מעבר קטלוג, הזמנות פתוחות ונתוני לקוחות בין פלטפורמות הוא תהליך שעולה הרבה יותר זמן וכסף מההפרש בין התוכניות.
              </p>
              <p>
                שאלה פשוטה שעוזרת להכריע מהר: "אם תוך שנה אהפוך פי שלושה בהיקף ההזמנות, הפלטפורמה הזו עדיין תעבוד בלי שאני אצטרך לעצור ולבנות מחדש?" אם התשובה היא לא — שווה להתחיל כבר עכשיו עם Shopify או שילוב AI+Shopify, גם אם המחיר ההתחלתי גבוה יותר. אם התשובה היא כן, או שהצמיחה הצפויה מתונה, אפשר להתחיל זול עם AI או WooCommerce ולשקול מעבר רק כשהנתונים בפועל מצדיקים זאת.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך HEY Digital עוזרת לבחור ולהקים את הפלטפורמה הנכונה?</h2>
              <p>
                האתר של HEY Digital עצמו נבנה ב-Lovable, כך שכשאנחנו משווים בין כלי AI, Shopify ו-WooCommerce, אנחנו מדברים מניסיון יומיומי ולא מתיאוריה. אנחנו עוברים עם כל לקוח על קצב הצמיחה הצפוי, הידע הטכני הקיים בעסק והתקציב, ובונים את החנות על הפלטפורמה שתשרת אתכם גם בעוד שנה — לא רק ביום ההקמה. במקרים רבים אנחנו גם ממליצים לשלב בין עולם AI ל-<Link to="/blog/supabase-vs-base44-backend-guide" className="text-primary hover:underline">תשתית בקאפ מלאה</Link>, כדי לקבל את היתרונות של שתי הגישות.
              </p>
              <p>
                מעבר להקמה, אנחנו מחברים כל חנות ל<Link to="/solutions/business-automation" className="text-primary hover:underline">תהליכי אוטומציה עסקית</Link> ול<Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">אוטומציית וואטסאפ</Link> — תזכורות על עגלות נטושות, עדכוני מלאי אוטומטיים ומעקב הזמנות — כדי שהחנות לא תישאר "עמוד סטטי שמוכר" אלא תהפוך למערכת שממשיכה לעבוד בשבילכם גם אחרי ההשקה. למי שעדיין בשלב ההתלבטות בין בניית אתר עם AI לבין פיתוח קלאסי, כדאי גם לקרוא את ה<Link to="/blog/ai-ecommerce-vs-shopify-2026" className="text-primary hover:underline">השוואה המפורטת בין AI ל-Shopify</Link> שלנו.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">לא בטוחים איזו פלטפורמת איקומרס מתאימה לעסק שלכם?</h3>
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

export default EcommercePlatformDecisionGuide2026;

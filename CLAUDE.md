# HEY Digital — Project Context

## דומיין האתר

**הדומיין הפעיל הוא: `https://www.heydigital.co.il`**

כל הסוכנים האוטומטיים (SEO tracker, blog publisher, ועוד) חייבים לחפש ולמדוד **`heydigital.co.il`** בלבד.

- דומיין ישן (לא בשימוש): `ehautomation.co.il`
- דומיין חדש (פעיל): `heydigital.co.il`

---

## SEO Keyword Tracker

כשהסוכן רץ לבדיקת מיקומים בגוגל:
- אתר יעד: `https://www.heydigital.co.il`
- לחפש האם `heydigital.co.il` מופיע בתוצאות — לא `ehautomation.co.il`
- לשמור תוצאות ב-`keyword-rankings.md`

---

## Blog Publisher

כשהסוכן מפרסם מאמר:
- URL בסיס: `https://www.heydigital.co.il`
- Sitemap: `/public/sitemap.xml` (כבר מכיל `heydigital.co.il`)
- SEO metadata: `src/lib/seo.tsx` (כבר מוגדר ל-`heydigital.co.il`)

**חובה: כל `<loc>` חדש ב-sitemap.xml חייב להתחיל ב-`https://www.heydigital.co.il/blog/...` — עם www, לא apex.**
כתובת apex (`https://heydigital.co.il/...`) מפנה (308 redirect) ל-www ו-Google Search Console מסמן אותה כ"הדף מפנה לכתובת אחרת" — דף כזה בsitemap לעולם לא ייכנס לאינדקס. זה קרה בפועל פעמיים (תוקן ב-2026-10-10 וב-2026-10-13) כי המאמרים האוטומטיים נוספו בלי www. לפני כל commit שמוסיף `<url>` חדש — לוודא שה-`<loc>` מתחיל ב-`www.`.

/**
 * Postbuild step #2 (runs after prerender-meta.mjs): gives every indexable
 * route a FULL static HTML snapshot — real H1, real body text, real internal
 * links, and the page's actual Schema.org JSON-LD — not just a patched
 * <head>. Search engines and especially non-JS GEO crawlers (GPTBot,
 * ClaudeBot, PerplexityBot, ...) only ever see the HTML byte stream Vercel
 * returns on first request; until now that stream was an empty
 * <div id="root"></div> for every route.
 *
 * How: boot `vite preview` to serve the real dist/ build, open each
 * indexable route in headless Chromium (Playwright), wait for the app's own
 * "content is visible" signal, capture the fully-rendered DOM, and write it
 * back over that route's prerender-meta.mjs output.
 *
 * Why a real browser and not renderToString/SSG: the homepage hero
 * (src/components/EnergyCore.tsx) renders a react-three-fiber/WebGL canvas.
 * That has no server-side equivalent — a real browser is the only way to
 * capture its final markup without rewriting it.
 *
 * Routes this script must NEVER touch: noindex routes (/services/*) and
 * auth-gated routes (/login, /portal, /dashboard, /auth, /reset-password).
 * Those keep exactly whatever prerender-meta.mjs already wrote for them.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { chromium } from 'playwright';
import sparticuzChromium from '@sparticuz/chromium';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'dist');
const PORT = 4321;
const BASE_URL = `http://127.0.0.1:${PORT}`;

// Defense-in-depth: these must never receive a full-content snapshot, even
// if a future edit accidentally adds a matching <SEOHead> to one of them.
const HARD_EXCLUDE_PREFIXES = ['/login', '/portal', '/dashboard', '/auth', '/reset-password'];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith('.tsx')) out.push(full);
  }
  return out;
}

// Same extraction rules as prerender-meta.mjs, kept in sync on purpose:
// anything indexed there is exactly what should get a full snapshot here.
function extractIndexableRoutes() {
  const paths = new Set();
  const files = walk(join(ROOT, 'src', 'pages'));
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const seoBlocks = content.match(/<SEOHead[\s\S]*?\/>/g) || [];
    for (const block of seoBlocks) {
      const path = block.match(/path="([^"]*)"/)?.[1];
      const noindex = /noindex/.test(block);
      if (path && !noindex) paths.add(path);
    }
    if (seoBlocks.length === 0) {
      const slug = content.match(/slug:\s*['"]([^'"]*)['"]/)?.[1];
      const title = content.match(/metaTitle:\s*['"]([^'"]*)['"]/)?.[1];
      if (slug && title) paths.add(`/${slug}`);
    }
  }
  return [...paths].filter((p) => !HARD_EXCLUDE_PREFIXES.some((pre) => p.startsWith(pre)));
}

async function startPreviewServer() {
  // Vite's own JS API — serves dist/ exactly like `vite preview` would, with
  // directory/index.html resolution (same shape Vercel's static file lookup
  // uses before it ever falls back to vercel.json's rewrite).
  const server = await preview({
    root: ROOT,
    preview: { port: PORT, strictPort: true, host: '127.0.0.1' },
  });
  return server;
}

// react-helmet-async re-renders canonical/description/OG/Twitter tags client-side
// (marked data-rh="true") on top of whatever prerender-meta.mjs already baked into
// <head>. Captured as-is that leaves two canonicals, two og:title, etc. — invalid
// and confusing to crawlers. Helmet's data-rh block is always the complete, correct
// one, so once it's present for a tag family, every non-data-rh tag in that same
// family is the stale duplicate and gets dropped.
function dedupeHead(html) {
  const families = [
    /<link rel="canonical"[^>]*>/gi,
    /<meta[^>]*name="description"[^>]*>/gi,
    /<meta[^>]*property="og:[a-z]+"[^>]*>/gi,
    /<meta[^>]*name="twitter:[a-z]+"[^>]*>/gi,
  ];
  let result = html;
  for (const re of families) {
    const matches = result.match(re) || [];
    const hasLive = matches.some((m) => /data-rh="true"/.test(m));
    if (!hasLive) continue;
    for (const m of matches) {
      if (!/data-rh="true"/.test(m)) result = result.replace(m, '');
    }
  }
  return result;
}

function stripForValidation(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('[prerender-static] dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  const routes = extractIndexableRoutes();
  console.log(`[prerender-static] ${routes.length} indexable routes to snapshot.`);

  const previewServer = await startPreviewServer();

  // Vercel's build container has no apt/sudo, so Playwright's own downloaded
  // Chromium can't run there — it's missing OS shared libs (libnspr4 etc.)
  // that only a normal desktop/dev Linux box has. @sparticuz/chromium ships a
  // Chromium build with its graphics stack (swiftshader/ANGLE, so the
  // homepage's WebGL canvas in EnergyCore.tsx still renders) and no such
  // system-library dependency — the standard fix for headless Chromium on
  // Vercel/Lambda-style containers. Locally (Windows/macOS/a normal Linux
  // dev box) that binary can't run at all, so there we use Playwright's own
  // bundled browser exactly as before.
  const browser = process.env.VERCEL
    ? await chromium.launch({
        executablePath: await sparticuzChromium.executablePath(),
        // --single-process is in @sparticuz/chromium's recommended args for
        // Puppeteer/Lambda, but it breaks Playwright's CDP connection
        // (newPage() fails with "Target closed" right after launch) — drop
        // it, keep the rest (sandboxing/zygote/graphics flags).
        args: sparticuzChromium.args.filter((a) => a !== '--single-process'),
      })
    : await chromium.launch({
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=swiftshader'],
      });

  const failures = [];
  let written = 0;
  let done = 0;

  // Sequential, one browser context at a time, used to take ~25-30 min on a
  // loaded Vercel build machine for ~95 routes with zero progress output in
  // between — indistinguishable from a real hang in the build log. Running a
  // small pool concurrently cuts wall time substantially and logging after
  // every route means a stuck run is now visible (the log just stops).
  const CONCURRENCY = 4;

  // One attempt at snapshotting a route. Throws on any failure (timeout,
  // missing h1, too little text) — caller decides whether to retry.
  async function attemptSnapshot(route) {
    const url = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}/`;
    const context = await browser.newContext(); // fresh, no storage/cookies
    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      await page.waitForSelector('[data-app-ready="true"]', { timeout: 30000 });
      await page.waitForSelector('h1', { timeout: 10000 });
      // let any in-flight lazy chunk / fetch settle before snapshotting
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

      const html = dedupeHead(await page.content());
      const text = stripForValidation(html);
      const hasH1 = /<h1[\s>]/i.test(html);
      const hasEnoughText = text.length > 200;
      if (!hasH1) throw new Error('no <h1> in rendered output');
      if (!hasEnoughText) throw new Error(`only ${text.length} chars of text`);

      const outPath = route === '/' ? join(DIST, 'index.html') : join(DIST, route.replace(/^\//, ''), 'index.html');
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
    } finally {
      await context.close();
    }
  }

  // A loaded Vercel build machine (2 vCPU, CONCURRENCY contexts competing for
  // it) occasionally makes a single route miss its timeout even though
  // nothing is actually wrong with it — one retry absorbs that without
  // masking a route that's genuinely broken (which fails twice in a row).
  async function snapshotRoute(route) {
    try {
      await attemptSnapshot(route);
      written++;
    } catch (firstErr) {
      try {
        await attemptSnapshot(route);
        written++;
        console.log(`[prerender-static] ${route} failed once, succeeded on retry`);
      } catch (secondErr) {
        const err = secondErr instanceof Error ? secondErr : firstErr;
        failures.push({ route, reason: err instanceof Error ? err.message : String(err) });
      }
    } finally {
      done++;
      console.log(`[prerender-static] ${done}/${routes.length} done — ${route}`);
    }
  }

  try {
    const queue = [...routes];
    const workers = Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length > 0) {
        const route = queue.shift();
        if (route !== undefined) await snapshotRoute(route);
      }
    });
    await Promise.all(workers);
  } finally {
    await browser.close();
    await new Promise((resolve) => previewServer.httpServer.close(resolve));
  }

  console.log(`[prerender-static] wrote full content for ${written}/${routes.length} routes.`);

  if (failures.length > 0) {
    console.error(`[prerender-static] FAILED — ${failures.length} route(s) did not render valid content:`);
    for (const f of failures) console.error(`  - ${f.route}: ${f.reason}`);
    process.exit(1);
  }
}

main();

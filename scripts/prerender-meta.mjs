/**
 * Postbuild step: gives every route its own static HTML file with the
 * correct <title>/<meta description>/canonical/og/twitter tags already
 * baked in — instead of all routes shipping the same shell and letting
 * react-helmet-async rewrite the <head> client-side after JS runs.
 *
 * Reads the per-page values straight out of each <SEOHead .../> usage in
 * src/pages, so there is nothing to keep in sync by hand — new pages the
 * auto-publish routine adds are picked up automatically on the next build.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'dist');
const SITE_URL = 'https://www.heydigital.co.il';

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith('.tsx')) out.push(full);
  }
  return out;
}

function extractSeoEntries() {
  const entries = [];
  const files = walk(join(ROOT, 'src', 'pages'));
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const seoBlocks = content.match(/<SEOHead[\s\S]*?\/>/g) || [];
    for (const block of seoBlocks) {
      const title = block.match(/title="([^"]*)"/)?.[1];
      const description = block.match(/description="([^"]*)"/)?.[1];
      const path = block.match(/path="([^"]*)"/)?.[1];
      const type = block.match(/type="([^"]*)"/)?.[1] || 'website';
      const noindex = /noindex/.test(block);
      if (title && description && path && !noindex) {
        entries.push({ title, description, path, type, file });
      }
    }
  }
  return entries;
}

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderPage(template, { title, description, path, type }) {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const t = esc(title);
  const d = esc(description);
  let html = template;
  html = html.replace(/<title>.*?<\/title>/s, `<title>${t}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${d}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${t}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${d}" />`);
  html = html.replace(/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${esc(type)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(url)}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${t}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${d}" />`);
  if (/<link rel="canonical"/.test(html)) {
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(url)}" />`);
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${esc(url)}" />\n  </head>`);
  }
  return html;
}

function main() {
  let template;
  try {
    template = readFileSync(join(DIST, 'index.html'), 'utf8');
  } catch {
    console.error('[prerender-meta] dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  const entries = extractSeoEntries();
  let written = 0;
  for (const entry of entries) {
    const html = renderPage(template, entry);
    const outPath = entry.path === '/' ? join(DIST, 'index.html') : join(DIST, entry.path.replace(/^\//, ''), 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    written++;
  }

  console.log(`[prerender-meta] wrote unique title/description/canonical for ${written} routes.`);
}

main();

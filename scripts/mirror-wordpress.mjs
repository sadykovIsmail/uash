import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_ORIGIN = 'https://uzbekamericansh.org';
const SITE_HOST = new URL(SITE_ORIGIN).host;
const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const MIRROR_DIR = path.join(PUBLIC_DIR, 'mirror');
const HTML_INPUTS = new Set(['index.html']);

const downloadedAssets = new Set();

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function clearDirContents(dirPath) {
  await ensureDir(dirPath);
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  await Promise.all(
    entries.map((entry) =>
      fs.rm(path.join(dirPath, entry.name), { force: true, recursive: true }),
    ),
  );
}

function toFsPath(urlPathname) {
  return decodeURIComponent(urlPathname.replace(/^\/+/, ''));
}

function stripHash(url) {
  const parsed = new URL(url);
  parsed.hash = '';
  return parsed.toString();
}

function stripHashAndSearch(url) {
  const parsed = new URL(url);
  parsed.hash = '';
  parsed.search = '';
  return parsed.toString();
}

function isSameSite(url) {
  return url.host === SITE_HOST;
}

function isMirrorAsset(url) {
  return (
    isSameSite(url) &&
    (url.pathname.startsWith('/wp-content/') ||
      url.pathname.startsWith('/wp-includes/'))
  );
}

function normalizePagePath(pathname) {
  if (pathname === '/' || pathname === '') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function toLocalPageHref(url) {
  const localPath = normalizePagePath(url.pathname);
  return `${localPath}${url.search}${url.hash}`;
}

function toLocalAssetHref(url) {
  return `/mirror${url.pathname}${url.search}${url.hash}`;
}

function htmlOutputPath(pathname) {
  if (pathname === '/') {
    return path.join(ROOT_DIR, 'index.html');
  }

  return path.join(ROOT_DIR, toFsPath(pathname), 'index.html');
}

function cssOutputPath(url) {
  return path.join(MIRROR_DIR, toFsPath(url.pathname));
}

function collectMatches(text, regex) {
  return [...text.matchAll(regex)].map((match) => match[1] ?? match[0]);
}

function collectUrlsFromText(text, baseUrl) {
  const candidates = new Set();
  const quotedUrlPattern = /(?:href|src|action|data-src|data-lazy-src|data-elementor-open-lightbox)\s*=\s*["']([^"']+)["']/gi;
  const srcsetPattern = /srcset\s*=\s*["']([^"']+)["']/gi;
  const cssUrlPattern = /url\(([^)]+)\)/gi;
  const absoluteSitePattern = /(https?:\/\/uzbekamericansh\.org[^"'\s)<>,]+)/gi;
  const rootAssetPattern = /((?:\/wp-content|\/wp-includes)\/[^"'\s)<>,]+)/gi;

  for (const value of collectMatches(text, quotedUrlPattern)) {
    candidates.add(value.trim());
  }

  for (const value of collectMatches(text, srcsetPattern)) {
    for (const part of value.split(',')) {
      const [src] = part.trim().split(/\s+/);
      if (src) {
        candidates.add(src.trim());
      }
    }
  }

  for (const value of collectMatches(text, cssUrlPattern)) {
    const cleaned = value.trim().replace(/^['"]|['"]$/g, '');
    if (cleaned) {
      candidates.add(cleaned);
    }
  }

  for (const value of collectMatches(text, absoluteSitePattern)) {
    candidates.add(value.trim());
  }

  for (const value of collectMatches(text, rootAssetPattern)) {
    candidates.add(value.trim());
  }

  const resolved = [];

  for (const value of candidates) {
    if (
      !value ||
      value.startsWith('data:') ||
      value.startsWith('mailto:') ||
      value.startsWith('tel:') ||
      value.startsWith('javascript:') ||
      value.startsWith('#')
    ) {
      continue;
    }

    try {
      resolved.push(new URL(value, baseUrl));
    } catch {
      // Ignore malformed URLs from third-party markup.
    }
  }

  return resolved;
}

function rewriteAssetUrls(text) {
  return text.replace(
    /https?:\/\/uzbekamericansh\.org(\/(?:wp-content|wp-includes)\/[^"'\s)<>,]*)/gi,
    (_, assetPath) => `/mirror${assetPath}`,
  );
}

function rewriteHtmlPageLinks(text, pagePathSet) {
  return text.replace(
    /<a\b([^>]*?)href=(["'])(https?:\/\/uzbekamericansh\.org\/[^"']*)\2/gi,
    (fullMatch, attributes, quote, rawUrl) => {
      try {
        const parsed = new URL(rawUrl);
        const normalizedPath = normalizePagePath(parsed.pathname);

        if (!pagePathSet.has(normalizedPath)) {
          return fullMatch;
        }

        return `<a${attributes}href=${quote}${toLocalPageHref(parsed)}${quote}`;
      } catch {
        return fullMatch;
      }
    },
  );
}

async function downloadAsset(url) {
  const dedupeKey = stripHashAndSearch(url.toString());

  if (downloadedAssets.has(dedupeKey)) {
    return;
  }

  downloadedAssets.add(dedupeKey);

  const response = await fetch(stripHash(url.toString()));

  if (!response.ok) {
    throw new Error(`Failed to download asset ${url}: ${response.status}`);
  }

  const targetPath = cssOutputPath(url);
  await ensureDir(path.dirname(targetPath));

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('text/css') || url.pathname.endsWith('.css')) {
    let cssText = await response.text();
    const nestedUrls = collectUrlsFromText(cssText, url);

    for (const nestedUrl of nestedUrls) {
      if (isMirrorAsset(nestedUrl)) {
        await downloadAsset(nestedUrl);
      }
    }

    cssText = rewriteAssetUrls(cssText);
    await fs.writeFile(targetPath, cssText);
    return;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(targetPath, buffer);
}

async function fetchPageList() {
  const response = await fetch(
    `${SITE_ORIGIN}/wp-json/wp/v2/pages?per_page=100&_fields=slug,link`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch page list: ${response.status}`);
  }

  const pages = await response.json();
  const pageUrls = [
    new URL('/', SITE_ORIGIN),
    ...pages.map((page) => new URL(page.link)),
  ];

  const uniqueByPath = new Map();

  for (const pageUrl of pageUrls) {
    uniqueByPath.set(normalizePagePath(pageUrl.pathname), pageUrl);
  }

  return [...uniqueByPath.values()];
}

async function writePageHtml(pageUrl, pagePathSet) {
  const response = await fetch(stripHash(pageUrl.toString()));

  if (!response.ok) {
    throw new Error(`Failed to fetch page ${pageUrl}: ${response.status}`);
  }

  let html = await response.text();
  const discoveredUrls = collectUrlsFromText(html, pageUrl);

  for (const discoveredUrl of discoveredUrls) {
    if (isMirrorAsset(discoveredUrl)) {
      await downloadAsset(discoveredUrl);
    }
  }

  html = rewriteAssetUrls(html);
  html = rewriteHtmlPageLinks(html, pagePathSet);

  const outputPath = htmlOutputPath(normalizePagePath(pageUrl.pathname));
  HTML_INPUTS.add(path.relative(ROOT_DIR, outputPath).replace(/\\/g, '/'));

  await ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, html);
}

async function removeGeneratedHtml(filePath) {
  try {
    await fs.rm(path.join(ROOT_DIR, filePath), { force: true, recursive: true });
  } catch {
    // Ignore missing files from previous runs.
  }
}

async function main() {
  await clearDirContents(MIRROR_DIR);

  const pageUrls = await fetchPageList();
  const pagePathSet = new Set(pageUrls.map((pageUrl) => normalizePagePath(pageUrl.pathname)));
  const knownGeneratedPages = [
    'index.html',
    'about-us',
    'become-a-member',
    'contact-us',
    'discover-uzbekistan',
    'gallery',
    'membership',
    'program-and-events',
  ];

  await Promise.all(knownGeneratedPages.map(removeGeneratedHtml));

  for (const pageUrl of pageUrls) {
    await writePageHtml(pageUrl, pagePathSet);
  }

  const inputList = [...HTML_INPUTS].sort();
  await fs.writeFile(
    path.join(ROOT_DIR, '.mirrored-pages.json'),
    JSON.stringify(inputList, null, 2),
  );

  console.log(`Mirrored ${pageUrls.length} pages and ${downloadedAssets.size} assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

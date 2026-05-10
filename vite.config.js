import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const STATIC_ROUTES = [
  'about-us',
  'become-a-member',
  'contact-us',
  'discover-uzbekistan',
  'gallery',
  'membership',
  'program-and-events',
]

function createStaticHtmlInputs() {
  const inputs = {
    'index.html': path.join(__dirname, 'index.html'),
  }

  for (const route of STATIC_ROUTES) {
    inputs[`${route}/index.html`] = path.join(__dirname, 'pages', route, 'index.html')
  }

  return inputs
}

// Dev-only: serve `pages/<route>/` when the browser asks for `/<route>/`.
// In build output we flatten the layout so this rewrite isn't needed.
function devRouteAliases() {
  return {
    name: 'dev-route-aliases',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const requestUrl = req.url ?? ''
        const [pathname, search = ''] = requestUrl.split('?')
        for (const route of STATIC_ROUTES) {
          if (pathname === `/${route}` || pathname === `/${route}/`) {
            req.url = `/pages/${route}/${search ? `?${search}` : ''}`
            return next()
          }
        }
        next()
      })
    },
  }
}

// Rewrite root-absolute nav links like `/about-us/` to use the configured base
// (e.g. `/uash/about-us/`), so the same source HTML works for any deploy prefix.
function rewriteRouteLinks() {
  return {
    name: 'rewrite-route-links',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let out = html
        for (const route of STATIC_ROUTES) {
          const pattern = new RegExp(`(href|action)="/${route}/?"`, 'g')
          out = out.replace(pattern, (_, attr) => `${attr}="${viteBase}${route}/"`)
        }
        // Vite only base-prefixes href/src/srcset. Elementor stashes image URLs
        // in data-thumbnail and inline style="...url(/...)" — rewrite both so
        // they resolve under the configured base.
        out = out.replace(
          /data-thumbnail="\/(mirror|images)\//g,
          (_, root) => `data-thumbnail="${viteBase}${root}/`,
        )
        out = out.replace(
          /url\(\/(mirror|images)\//g,
          (_, root) => `url(${viteBase}${root}/`,
        )
        return out
      },
    },
  }
}

let viteBase = '/'

// After build, move `dist/pages/<route>/` to `dist/<route>/` so URLs match
// the rewritten nav links (which now point at `<base><route>/`).
function flattenPagesOutput() {
  return {
    name: 'flatten-pages-output',
    apply: 'build',
    async closeBundle() {
      const distDir = path.join(__dirname, 'dist')
      const pagesDir = path.join(distDir, 'pages')
      let entries
      try {
        entries = await fs.readdir(pagesDir)
      } catch (err) {
        if (err.code === 'ENOENT') return
        throw err
      }
      for (const entry of entries) {
        await fs.rename(path.join(pagesDir, entry), path.join(distDir, entry))
      }
      await fs.rmdir(pagesDir)
    },
  }
}

export default defineConfig(({ command }) => {
  viteBase = process.env.VITE_BASE ?? '/'
  return {
    base: viteBase,
    plugins: [
      react(),
      devRouteAliases(),
      rewriteRouteLinks(),
      flattenPagesOutput(),
    ],
    build: {
      rollupOptions: {
        input: createStaticHtmlInputs(),
      },
    },
  }
})

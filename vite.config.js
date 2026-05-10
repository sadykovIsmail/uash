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

const ORIGIN_HOST = 'uzbekamericansh.org'

const galleryBootstrapScript = `
<script>
(function () {
  function init() {
    if (typeof jQuery === 'undefined' || typeof EGallery === 'undefined') {
      return setTimeout(init, 30)
    }
    var Ctor = EGallery.default || EGallery
    document.querySelectorAll('.elementor-widget-gallery').forEach(function (widget) {
      var $container = jQuery(widget).find('.elementor-gallery__container')
      if (!$container.length || $container.data('eGalleryInit')) return
      $container.data('eGalleryInit', true)
      var s = {}
      try { s = JSON.parse(widget.getAttribute('data-settings') || '{}') } catch (e) {}
      var gap = (s.gap && s.gap.size) || 10
      var rowH = (s.ideal_row_height && s.ideal_row_height.size) || 200
      var rowHTablet = (s.ideal_row_height_tablet && s.ideal_row_height_tablet.size) || 150
      var rowHMobile = (s.ideal_row_height_mobile && s.ideal_row_height_mobile.size) || 150
      new Ctor({
        container: $container,
        type: s.gallery_layout || 'justified',
        idealRowHeight: rowH,
        horizontalGap: gap,
        verticalGap: gap,
        lazyLoad: s.lazyload === 'yes',
        breakpoints: {
          1024: { idealRowHeight: rowHTablet, horizontalGap: gap, verticalGap: gap },
          768: { idealRowHeight: rowHMobile, horizontalGap: gap, verticalGap: gap },
        },
      })
    })
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
</script>`

// Rewrite root-absolute nav links like `/about-us/` to use the configured base
// (e.g. `/uash/about-us/`), so the same source HTML works for any deploy prefix.
// Also strips runtime references to the original WordPress origin so the site
// is fully self-contained.
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
        // Localize every reference to the original WP origin so the site
        // makes zero requests to it and clicking a link never leaves the
        // local domain. Order: specific (wp-*) before generic.
        const trimmedBase = viteBase.replace(/\/$/, '')
        const wpDirRe = new RegExp(`https?:\\\\?/\\\\?/${ORIGIN_HOST}\\\\?/(wp-[a-z]+)`, 'g')
        out = out.replace(wpDirRe, (_, dir) => `${trimmedBase}/mirror/${dir}`)
        const originRe = new RegExp(`https?:\\\\?/\\\\?/${ORIGIN_HOST}\\\\?/?`, 'g')
        out = out.replace(originRe, viteBase)
        // Strip Elementor's lazy-load CSS that forces background-image:none
        // on sections past the third/fourth until JS adds the .e-lazyloaded
        // class. We want every background to show regardless of scroll state.
        out = out.replace(
          /<style>\s*\.e-con\.e-parent:nth-of-type[\s\S]*?<\/style>/g,
          '',
        )
        // Inject the gallery bootstrap right before </body> so it runs after
        // jQuery + e-gallery.min.js have loaded.
        if (out.includes('elementor-widget-gallery')) {
          out = out.replace(/<\/body>/i, `${galleryBootstrapScript}\n</body>`)
        }
        return out
      },
    },
  }
}

let viteBase = '/'

// After build:
// 1. Move `dist/pages/<route>/` to `dist/<route>/` so URLs match the
//    rewritten nav links (which now point at `<base><route>/`).
// 2. Rewrite absolute URLs inside CSS files copied from public/. Vite's
//    base prefix doesn't touch CSS in publicDir, so post-XX.css would
//    keep `url("/mirror/...")` and break under a non-root base like /uash/.
function postProcessDist() {
  return {
    name: 'post-process-dist',
    apply: 'build',
    async closeBundle() {
      const distDir = path.join(__dirname, 'dist')
      const pagesDir = path.join(distDir, 'pages')
      try {
        const entries = await fs.readdir(pagesDir)
        for (const entry of entries) {
          await fs.rename(path.join(pagesDir, entry), path.join(distDir, entry))
        }
        await fs.rmdir(pagesDir)
      } catch (err) {
        if (err.code !== 'ENOENT') throw err
      }
      if (viteBase === '/') return
      const trimmedBase = viteBase.replace(/\/$/, '')
      async function walk(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            await walk(full)
          } else if (entry.isFile() && entry.name.endsWith('.css')) {
            const orig = await fs.readFile(full, 'utf8')
            const next = orig
              .replace(/url\((['"]?)\/(mirror|images)\//g, (_, q, root) => `url(${q}${trimmedBase}/${root}/`)
              .replace(/https?:\/\/uzbekamericansh\.org/g, trimmedBase)
            if (next !== orig) await fs.writeFile(full, next, 'utf8')
          }
        }
      }
      await walk(distDir)
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
      postProcessDist(),
    ],
    build: {
      rollupOptions: {
        input: createStaticHtmlInputs(),
      },
    },
  }
})

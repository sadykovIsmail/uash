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

function rootRouteAliases() {
  const rewriteRequest = req => {
    const requestUrl = req.url ?? ''
    const [pathname, search = ''] = requestUrl.split('?')

    for (const route of STATIC_ROUTES) {
      if (pathname === `/${route}` || pathname === `/${route}/`) {
        req.url = `/pages/${route}/${search ? `?${search}` : ''}`
        return
      }
    }
  }

  return {
    name: 'root-route-aliases',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteRequest(req)
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteRequest(req)
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), rootRouteAliases()],
  build: {
    rollupOptions: {
      input: createStaticHtmlInputs(),
    },
  },
})

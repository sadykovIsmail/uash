import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function collectHtmlInputs(dir, rootDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const inputs = {}

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'public') {
      continue
    }

    const absolutePath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      Object.assign(inputs, collectHtmlInputs(absolutePath, rootDir))
      continue
    }

    if (!entry.isFile() || !entry.name.endsWith('.html')) {
      continue
    }

    const relativePath = path.relative(rootDir, absolutePath).replace(/\\/g, '/')
    inputs[relativePath] = absolutePath
  }

  return inputs
}

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: collectHtmlInputs(__dirname),
    },
  },
})

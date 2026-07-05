import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const tailwindConfig = path.resolve(dir, '../../tailwind.config.js')

export default defineConfig({
  title: 'Solo Dev',
  description: 'mvtvn78 - Solo Dev Portfolio',
  base: '/my_portfolio/',
  cleanUrls: true,
  appearance: false,
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ],
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcss({ config: tailwindConfig }),
          autoprefixer(),
        ],
      },
    },
  },
})

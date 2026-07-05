import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const tailwindConfig = path.resolve(dir, '../../tailwind.config.js')

export default defineConfig({
  title: 'Portfolio',
  description: 'Mai Văn Tiền (Mvt) - Portfolio',
  base: '/My_Portfolio/',
  cleanUrls: true,
  appearance: false,
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

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: { plugins: [tailwind(), autoprefixer()] },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

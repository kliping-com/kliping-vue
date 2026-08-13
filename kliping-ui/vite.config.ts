import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      // import.meta.dirname, bukan __dirname: config loader bawaan Vite yang
      // baru tidak menyediakan __dirname.
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})

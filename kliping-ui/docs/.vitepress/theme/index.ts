import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BlockCanvas from './BlockCanvas.vue'
import BlockGallery from './BlockGallery.vue'
import ComponentPreview from './ComponentPreview.vue'
import Layout from './Layout.vue'
import Steps from './Steps.vue'

// Token tema dan preflight Tailwind yang sama dengan yang dipakai komponennya,
// supaya pratinjau di dokumentasi tampil persis seperti di aplikasi.
import '@/assets/main.css'
import './kliping.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Didaftarkan global karena markdown memanggilnya langsung tanpa import.
    app.component('ComponentPreview', ComponentPreview)
    app.component('Steps', Steps)
    app.component('BlockCanvas', BlockCanvas)
    app.component('BlockGallery', BlockGallery)
  },
} satisfies Theme

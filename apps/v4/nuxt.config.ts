import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

/**
 * Concrete URLs for every docs page.
 *
 * Nitro cannot expand a `/docs/**` route rule into real URLs by itself: it only
 * prerenders routes it was handed or found by crawling. Crawling is off (it
 * wandered into /view and /preview for every registry item and never finished),
 * and @nuxt/content registers only its sql dump for prerendering, not the pages.
 * Without this list the docs would quietly fall back to SSR.
 */
function docsRoutes(dir: string = fileURLToPath(new URL('./content/docs', import.meta.url)), base = '/docs'): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    // Dot-prefixed files are excluded from the collection in content.config.ts.
    if (entry.name.startsWith('.'))
      return []

    // Ordering prefixes are stripped from the URL: `01.introduction.md` is
    // served as `introduction`, and `index.md` stands in for its own folder.
    const name = entry.name.replace(/^\d+\./, '')

    if (entry.isDirectory())
      return docsRoutes(join(dir, entry.name), `${base}/${name}`)

    if (!name.endsWith('.md'))
      return []

    const slug = name.slice(0, -3)
    return [slug === 'index' ? base : `${base}/${slug}`]
  })
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-05',
  devtools: { enabled: true },
  srcDir: '.',
  // Server sourcemaps are on by default and cost bundling time plus a .map file
  // next to every chunk. Nothing reads them in production.
  sourcemap: { server: false, client: false },
  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],
  modules: ['@nuxtjs/color-mode', '@nuxt/content', 'nuxt-shiki', '@nuxt/image', '@nuxt/fonts'],
  components: [
    { path: '~/components', ignore: ['_internal/*', '_internal/**/*', 'examples/*', 'examples/**/*'] },
    { path: '~/components/demo', pathPrefix: false },
    { path: '~/components/content', global: true, pathPrefix: false },
    {
      path: '~/registry/new-york-v4/ui/accordion',
      global: true,
      pathPrefix: false,
      ignore: ['*.ts'],
    },
  ],
  content: {
    build: {
      markdown: {
        highlight: false,
      },
    },
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    // required to prevent error related to better-sqlite3 during build and deploy
    experimental: {
      sqliteConnector: 'native',
    },
  },
  shiki: {
    defaultTheme: {
      light: 'github-light-default',
      dark: 'github-dark',
    },
    bundledLangs: [
      'ts',
      'tsx',
      'js',
      'vue',
      'html',
      'json',
      'bash',
      'astro',
      'toml',
    ],
  },
  vite: {
    optimizeDeps: {
      include: [
        '@lucide/vue',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
      ],
    },
    plugins: [tailwindcss() as any],
    ssr: {
      noExternal: [
        '@tabler/icons-vue',
        '@lucide/vue',
        '@hugeicons/vue',
        '@hugeicons/core-free-icons',
        '@phosphor-icons/vue',
        '@remixicon/vue',
      ],
    },
  },
  build: {
    transpile: ['vee-validate', 'vue-sonner'],
  },
  routeRules: {
    // Static assets - immutable, long cache
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // Docs are the one surface worth paying build time for: they are the bulk of
    // the site, they rarely change between deploys, and they are what search
    // engines index. Everything else renders on demand.
    '/docs/**': { prerender: true },
    // Rendered per request and cached at the edge. Prerendering these meant
    // crawling into /view and /preview for all 138 registry items, which is what
    // pushed the Cloudflare build past its time limit.
    '/blocks/**': { swr: 3600 },
    '/charts/**': { swr: 3600 },
    '/examples/**': { swr: 3600 },
    '/colors/**': { swr: 3600 },
    '/themes': { swr: 3600 },
    '/view/**': { swr: 3600 },
    '/preview/**': { swr: 3600 },
    // JSON API - edge-cached at CF, survives across Worker invocations
    '/api/**': {
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
    // Raw markdown endpoint
    '/raw/**': {
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
  },
  nitro: {
    preset: 'cloudflare-module',
    // Off for Cloudflare. It compresses responses at the edge on its own, so
    // gzipping and brotli-ing every public asset at build time buys nothing and
    // costs real minutes — public/ alone is 21 MB, most of it registry JSON.
    // It also tripled the uploaded file count, which matters against the
    // 20,000-file limit on Workers static assets.
    compressPublicAssets: false,
    prerender: {
      // Off on purpose. The crawler followed links into /view/[name] and
      // /preview/[base]/[name], one route per registry item per base, and the
      // build never finished. Everything to prerender is listed explicitly.
      crawlLinks: false,
      routes: ['/', ...docsRoutes()],
      failOnError: false,
      autoSubfolderIndex: false,
    },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'kliping-vue',
        d1_databases: [
          {
            binding: 'DB',
            database_id: '4c26cb33-9277-4c9b-8433-42f0a6e84b69',
          },
        ],
        observability: {
          logs: {
            enabled: true,
            head_sampling_rate: 1,
            invocation_logs: true,
          },
        },
      },
    },
    serverAssets: [
      { baseName: 'blocks', dir: '../registry/new-york-v4/blocks' },
    ],
  },
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'shortcut icon', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // Geist/Geist Mono are emitted eagerly by @nuxt/fonts (see `fonts.families`).
        // Other fonts are resolved on demand via useFontLoader() + unifont, which
        // still hits Bunny at runtime — hence the preconnect.
        { rel: 'preconnect', href: 'https://fonts.bunny.net', crossorigin: '' },
      ],
      meta: [{ name: 'keywords', content: 'Kliping,Vue,Nuxt,Tailwind CSS,Komponen UI,Komponen Vue,UI Library Indonesia' }],
    },
  },
  fonts: {
    defaults: {
      subsets: ['latin'],
      styles: ['normal'],
    },
    // `global: true` emits the @font-face into nuxt-fonts-global.css, which is how
    // the docs get Geist without a render-blocking external stylesheet.
    families: [
      { name: 'Geist', weights: [400, 500, 600, 700], global: true },
      { name: 'Geist Mono', weights: [400, 500], global: true },
    ],
  },
})

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'

const akarSrc = path.resolve(fileURLToPath(new URL('../..', import.meta.url)), 'src')

/**
 * Daftar sidebar untuk 65 halaman komponen, dibaca dari isi foldernya.
 *
 * Judulnya diambil dari frontmatter tiap berkas supaya sama persis dengan yang
 * tampil di halamannya, dan tidak perlu ada dua daftar yang harus dijaga tetap
 * sinkron setiap kali komponen baru ditambahkan.
 */
function komponenSidebar() {
  const dir = fileURLToPath(new URL('../components', import.meta.url))
  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map((f) => {
      const isi = readFileSync(path.join(dir, f), 'utf-8')
      // Judulnya sekarang dikutip di sebagian berkas, karena prosa Bahasa
      // Indonesia sering memakai titik dua dan YAML membacanya sebagai pemetaan.
      const judul = isi.match(/^title:(.*)$/m)?.[1].trim().replace(/^(["'])(.*)\1$/, '$2')
      return { text: judul || f.slice(0, -3), link: `/components/${f.slice(0, -3)}` }
    })
    .sort((a, b) => a.text.localeCompare(b.text, 'id'))
}

/** Berkas sumber di balik sebuah nama contoh, dicari di tempat yang sama dengan pratinjaunya. */
function berkasSumber(nama: string) {
  const calon = [
    path.join(akarSrc, 'demo', `${nama}.vue`),
    path.join(akarSrc, 'charts', `${nama}.vue`),
    path.join(akarSrc, 'blocks', nama, 'page.vue'),
  ]
  return calon.find(existsSync)
}

/**
 * Sisipkan kode sumber tiap contoh ke dalam markdown sebelum dirender.
 *
 * Halaman komponen memanggil `<ComponentPreview name="..." />`, dan pembaca
 * yang ingin memakainya perlu melihat kodenya, bukan cuma hasilnya. Sumbernya
 * disisipkan sebagai blok kode biasa supaya disorot Shiki bawaan VitePress dan
 * ikut masuk halaman statis — bukan dimuat ulang di peramban, yang berarti
 * seluruh sumber harus ikut dibundel di tiap halaman.
 *
 * Berjalan sebelum markdown diurai: yang disisipkan adalah teks markdown, jadi
 * sisa pipeline memperlakukannya persis seperti blok kode yang ditulis tangan.
 */
function sumberPratinjau(md: any) {
  md.core.ruler.before('normalize', 'kliping-sumber-pratinjau', (state: any) => {
    state.src = state.src.replace(/<ComponentPreview\s([^>]*)\/>/g, (cocok: string, ruangAtribut: string) => {
      const atribut = ruangAtribut.trim()
      const nama = atribut.match(/name="([^"]+)"/)?.[1]
      const berkas = nama && berkasSumber(nama)
      if (!berkas)
        return cocok

      const kode = readFileSync(berkas, 'utf-8').trimEnd()
      // Pagar dibuat lebih panjang dari runtun backtick terpanjang di dalamnya,
      // supaya contoh yang kebetulan memuat blok kode tidak menutup pagarnya.
      const pagar = '`'.repeat(Math.max(3, ...[...kode.matchAll(/`+/g)].map(m => m[0].length + 1)))
      return `<ComponentPreview ${atribut}>\n\n${pagar}vue\n${kode}\n${pagar}\n\n</ComponentPreview>`
    })
  })
}

export default defineConfig({
  title: 'Kliping',
  description: 'Komponen Vue siap klip, siap pakai. Dokumentasi Bahasa Indonesia.',
  lang: 'id-ID',
  cleanUrls: true,

  // Berkas berawalan titik pernah dipakai upstream untuk menyembunyikan halaman.
  // Yang masih relevan sudah dinamai ulang, sisanya dihapus.
  srcExclude: ['**/.*.md'],

  markdown: { config: sumberPratinjau },

  // VitePress menjalankan Vite-nya sendiri dan tidak membaca vite.config.ts di
  // root, jadi alias dan Tailwind harus didaftarkan ulang di sini. Tanpa ini
  // pratinjau di dokumentasi tidak bisa mengimpor komponen dari src/.
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(fileURLToPath(new URL('../..', import.meta.url)), 'src') },
    },
  },

  themeConfig: {
    nav: [
      { text: 'Dokumentasi', link: '/introduction' },
      { text: 'Komponen', link: '/components/accordion' },
      { text: 'Blocks', link: '/blocks' },
    ],

    sidebar: [
      {
        text: 'Memulai',
        items: [
          { text: 'Pengenalan', link: '/introduction' },
          { text: 'Instalasi', link: '/installation' },
          { text: 'components.json', link: '/components-json' },
          { text: 'Tema & Kustomisasi', link: '/theming' },
          { text: 'Mode Gelap', link: '/dark-mode' },
          { text: 'CLI', link: '/cli' },
          { text: 'JavaScript', link: '/javascript' },
          { text: 'RTL', link: '/rtl' },
          { text: 'Figma', link: '/figma' },
          { text: 'Catatan Perubahan', link: '/changelog' },
          { text: 'Dokumentasi Lama', link: '/legacy' },
        ],
      },
      {
        text: 'Instalasi',
        collapsed: true,
        items: [
          { text: 'Vite', link: '/installation/vite' },
          { text: 'Nuxt', link: '/installation/nuxt' },
          { text: 'Astro', link: '/installation/astro' },
          { text: 'Laravel', link: '/installation/laravel' },
          { text: 'Manual', link: '/installation/manual' },
        ],
      },
      {
        text: 'Mode Gelap',
        collapsed: true,
        items: [
          { text: 'Vite', link: '/dark-mode/vite' },
          { text: 'Nuxt', link: '/dark-mode/nuxt' },
          { text: 'Vitepress', link: '/dark-mode/vitepress' },
          { text: 'Astro', link: '/dark-mode/astro' },
        ],
      },
      {
        text: 'Form',
        collapsed: true,
        items: [
          { text: 'Ikhtisar', link: '/forms' },
          { text: 'VeeValidate', link: '/forms/vee-validate' },
          { text: 'TanStack Form', link: '/forms/tanstack-form' },
          { text: 'Formisch', link: '/forms/formisch' },
        ],
      },
      {
        text: 'Registry',
        collapsed: true,
        items: [
          { text: 'Ikhtisar', link: '/registry' },
          { text: 'Memulai', link: '/registry/getting-started' },
          { text: 'Contoh', link: '/registry/examples' },
          { text: 'registry.json', link: '/registry/registry-json' },
          { text: 'registry-item.json', link: '/registry/registry-item-json' },
          { text: 'Tanya Jawab', link: '/registry/faq' },
        ],
      },
      {
        text: 'Blocks',
        items: [{ text: 'Galeri', link: '/blocks' }],
      },
      {
        text: 'Utilitas',
        collapsed: true,
        items: [
          { text: 'scroll-fade', link: '/utilities/scroll-fade' },
          { text: 'shimmer', link: '/utilities/shimmer' },
        ],
      },
      {
        text: 'Lainnya',
        collapsed: true,
        items: [
          { text: 'Typeset', link: '/typeset' },
          { text: 'Server MCP', link: '/mcp' },
          { text: 'Skills', link: '/skills' },
          { text: 'Direktori Registry', link: '/directory/' },
          { text: 'Tentang', link: '/about' },
          { text: 'Kontribusi', link: '/contribution' },
        ],
      },
      {
        text: 'Komponen',
        items: komponenSidebar(),
      },
    ],

    // Pencarian dijalankan di sisi pembaca dari indeks yang ikut dibangun, jadi
    // tidak ada layanan luar yang perlu dihubungi.
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Cari', buttonAriaLabel: 'Cari dokumentasi' },
          modal: {
            displayDetails: 'Tampilkan rincian',
            resetButtonTitle: 'Kosongkan pencarian',
            backButtonTitle: 'Tutup pencarian',
            noResultsText: 'Tidak ada hasil untuk',
            footer: {
              selectText: 'untuk memilih',
              navigateText: 'untuk berpindah',
              closeText: 'untuk menutup',
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kliping-com/kliping-vue' },
    ],

    footer: {
      message: 'Dirilis di bawah lisensi MIT. Fork dari shadcn-vue.',
      copyright: 'Hak cipta © 2026 Kliping',
    },

    outline: { label: 'Di halaman ini', level: [2, 3] },
    docFooter: { prev: 'Sebelumnya', next: 'Berikutnya' },
    darkModeSwitchLabel: 'Tampilan',
    lightModeSwitchTitle: 'Ganti ke mode terang',
    darkModeSwitchTitle: 'Ganti ke mode gelap',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Kembali ke atas',
    langMenuLabel: 'Ganti bahasa',
  },
})

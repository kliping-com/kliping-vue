# Kliping

**Komponen Vue siap klip, siap pakai.**

Vite + Vue 3 + TypeScript + Tailwind v4. Tanpa Nuxt, tanpa server, tanpa database.

## Isinya

| | Jumlah |
|---|---|
| Komponen primitif (`src/components/ui/`) | 66 |
| Block siap pakai (`src/blocks/`) | 34 |
| Grafik (`src/charts/`) | 23 |
| Contoh untuk dokumentasi (`src/demo/`) | 319 |
| Kartu beranda (`src/examples/cards/`) | 15 |
| Halaman dokumentasi (`docs/`) | 109 + beranda + 35 halaman blocks |

## Menjalankan

```bash
npm install
npm run docs:dev   # situs Kliping — http://localhost:5174
npm run dev        # halaman uji coba komponen — http://localhost:5173
```

Ada dua hal yang bisa dijalankan di sini, dan keduanya berbeda:

- **`docs:dev`** menjalankan situs Kliping — beranda, 109 halaman dokumentasi,
  galeri blocks. Ini yang dimaksud "situsnya".
- **`dev`** menjalankan aplikasi Vite di `src/App.vue`: satu halaman kecil untuk
  mencoba komponen dengan cepat, bukan bagian dari situs.

Port-nya sengaja dipisah supaya keduanya bisa jalan berbarengan dan tidak
tertukar — VitePress dan Vite sama-sama memakai 5173 kalau dibiarkan.

Perintah lain:

```bash
npm run typecheck    # vue-tsc, tanpa emit
npm run build        # typecheck lalu build produksi
npm run preview      # cek hasil build halaman uji coba
npm run docs:build   # build situs statis
npm run docs:preview # cek hasil build situs
```

## Struktur

```
src/
├── lib/
│   └── utils.ts          cn()
├── components/
│   └── ui/               66 komponen primitif
│       └── button/
│           ├── Button.vue
│           └── index.ts
├── blocks/               34 block siap pakai
├── charts/               23 grafik
├── demo/                 319 contoh yang dipakai dokumentasi
├── examples/cards/       15 kartu yang menyusun beranda
├── assets/
│   ├── main.css          token tema
│   └── utilities.css     scroll-fade, shimmer, scrollbar, animasi pesan
├── App.vue
└── main.ts

docs/                     109 halaman, Bahasa Indonesia
├── index.md              beranda
├── blocks.md             galeri 34 block
├── blocks/               satu halaman per block, tanpa kerangka docs
└── .vitepress/
    ├── config.ts         sidebar, nav, alias, penyisip kode sumber
    ├── theme/            Beranda, ComponentPreview, BlockGallery, BlockCanvas, Steps, Layout
    └── konversi-mdc.py   catatan konversi dari sintaks Nuxt Content
```

Alias `@` menunjuk ke `src/`, didaftarkan di tiga tempat: `vite.config.ts`,
`tsconfig.app.json`, dan `docs/.vitepress/config.ts`. VitePress menjalankan Vite
sendiri dan tidak membaca konfigurasi di root, jadi aliasnya perlu didaftarkan
ulang di sana.

## Cara memakai komponen

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button variant="outline">Klik saya</Button>
</template>
```

## Dokumentasi

Dokumentasinya adalah situsnya sendiri, bukan sub-rute `/docs` seperti di repo
asalnya. Tiap halaman komponen memuat contoh yang benar-benar berjalan: markdown
memanggil `<ComponentPreview name="ButtonDemo" />`, dan pemetaan nama ke komponen
disusun dari isi `src/demo/`, `src/charts/`, serta `src/blocks/*/page.vue`. Tidak
ada daftar impor yang perlu dijaga tetap sinkron; menambah berkas contoh sudah
cukup.

Tiap pratinjau punya tab **Kode**. Sumbernya disisipkan ke markdown saat build
lewat aturan markdown-it di `docs/.vitepress/config.ts`, jadi disorot Shiki
bawaan VitePress dan ikut masuk halaman statis — bukan dimuat ulang di peramban.
Konsekuensinya: kalau berkas contoh diubah saat `docs:dev` berjalan, halamannya
perlu di-refresh manual supaya kodenya ikut baru.

Galeri block di `/blocks` membingkai tiap block dengan iframe ke halamannya
sendiri di `/blocks/<nama>`, yang dirender tanpa kerangka dokumentasi
(`layout: false`). Block adalah tata letak selebar halaman; dirender langsung di
dalam kolom dokumentasi yang sempit, semuanya patah.

Beranda di `/` menyusun ulang halaman muka repo asal: hero, lalu petak kartu
yang isinya komponen yang sungguh berjalan, bukan tangkapan layar.

Pencarian memakai indeks lokal VitePress — dibangun ikut situsnya, tidak
menghubungi layanan luar.

Satu hal yang perlu diketahui kalau menyentuh `src/assets/main.css`: utility
Tailwind sengaja dikeluarkan dari cascade layer. CSS bawaan VitePress tidak
berada di layer mana pun, dan aturan tanpa layer selalu menang atas aturan di
dalam layer berapa pun spesifisitasnya — selama utility ada di layer `utilities`,
reset VitePress untuk `h1`..`h6` menimpanya dan judul beranda keluar seukuran
teks biasa.

## Asal komponen

Komponen di `src/components/ui/`, `src/blocks/`, `src/charts/`, dan `src/demo/`
diangkut dari [shadcn-vue](https://github.com/unovue/shadcn-vue) v2.8.2, lalu path
impornya disesuaikan dengan struktur `src/` di sini. Isinya tidak ditulis ulang.

Beberapa berkas perlu satu baris tambahan karena mengandalkan auto-import Nuxt di
repo asalnya — semuanya sudah diberi impor eksplisit di tempatnya:

- `src/blocks/dashboard-01/components/ChartAreaInteractive.vue` — `ref`, `computed`
- `src/blocks/dashboard-01/components/DataTable.vue` — `h`, `ref`
- `src/charts/ChartAreaInteractive.vue` — `ref`, `computed`
- `src/charts/ChartBarInteractive.vue` — `ref`, `computed`
- `src/charts/ChartLineInteractive.vue` — `ref`, `computed`
- `src/blocks/sidebar-12/components/AppSidebar.vue` — `Plus`
- `src/blocks/sidebar-15/components/SidebarRight.vue` — `Plus`
- `src/components/ui/attachment/AttachmentTrigger.vue` — `Primitive` dari reka-ui
- 10 demo MessageScroller — `MessageAnimated`, yang di repo asalnya tinggal di
  folder auto-import Nuxt dan bukan di folder demo

Dokumentasinya sudah diterjemahkan ke Bahasa Indonesia dan sintaks Nuxt Content-nya
dikonversi ke VitePress. Skrip konversinya disimpan di
`docs/.vitepress/konversi-mdc.py` sebagai catatan bagaimana pemetaannya dilakukan.

## Lisensi

MIT. Lihat [LICENSE](./LICENSE).

Rantai lisensinya: shadcn/ui (MIT) → shadcn-vue (MIT) → Kliping (MIT).

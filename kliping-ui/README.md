# Kliping

**Komponen Vue siap klip, siap pakai.**

Vite + Vue 3 + TypeScript + Tailwind v4. Tanpa Nuxt, tanpa server, tanpa database.

## Isinya

| | Jumlah |
|---|---|
| Komponen primitif (`src/components/ui/`) | 66 |
| Block siap pakai (`src/blocks/`) | 34 |
| Grafik (`src/charts/`) | 23 |
| Contoh untuk dokumentasi (`src/demo/`) | 318 |
| Halaman dokumentasi (`docs/`) | 109 |

## Menjalankan

```bash
npm install
npm run dev        # aplikasi contoh, http://localhost:5173
npm run docs:dev   # dokumentasi, http://localhost:5173
```

Perintah lain:

```bash
npm run typecheck    # vue-tsc, tanpa emit
npm run build        # typecheck lalu build produksi
npm run preview      # cek hasil build aplikasi
npm run docs:build   # build dokumentasi statis
npm run docs:preview # cek hasil build dokumentasi
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
├── demo/                 318 contoh yang dipakai dokumentasi
├── assets/
│   └── main.css          token tema
├── App.vue
└── main.ts

docs/                     109 halaman, Bahasa Indonesia
└── .vitepress/
    ├── config.ts         sidebar, nav, alias
    ├── theme/            ComponentPreview, Steps, Layout
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

Dokumentasinya sudah diterjemahkan ke Bahasa Indonesia dan sintaks Nuxt Content-nya
dikonversi ke VitePress. Skrip konversinya disimpan di
`docs/.vitepress/konversi-mdc.py` sebagai catatan bagaimana pemetaannya dilakukan.

## Lisensi

MIT. Lihat [LICENSE](./LICENSE).

Rantai lisensinya: shadcn/ui (MIT) → shadcn-vue (MIT) → Kliping (MIT).

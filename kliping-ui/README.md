# Kliping

**Komponen Vue siap klip, siap pakai.**

Vite + Vue 3 + TypeScript + Tailwind v4. Tanpa Nuxt, tanpa server, tanpa database.

## Isinya

| | Jumlah |
|---|---|
| Komponen primitif (`src/components/ui/`) | 65 |
| Block siap pakai (`src/blocks/`) | 34 |

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
```

Perintah lain:

```bash
npm run typecheck  # vue-tsc, tanpa emit
npm run build      # typecheck lalu build produksi
npm run preview    # cek hasil build
```

## Struktur

```
src/
├── lib/
│   └── utils.ts          cn()
├── components/
│   └── ui/               65 komponen primitif
│       └── button/
│           ├── Button.vue
│           └── index.ts
├── blocks/               34 block siap pakai
├── assets/
│   └── main.css          token tema
├── App.vue
└── main.ts
```

Alias `@` menunjuk ke `src/`, didaftarkan di `vite.config.ts` dan `tsconfig.app.json`.

## Cara memakai komponen

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button variant="outline">Klik saya</Button>
</template>
```

## Asal komponen

Komponen di `src/components/ui/` dan `src/blocks/` diangkut dari
[shadcn-vue](https://github.com/unovue/shadcn-vue) v2.8.2, lalu path impornya
disesuaikan dengan struktur `src/` di sini. Isinya tidak ditulis ulang.

Dua berkas perlu satu baris tambahan karena mengandalkan auto-import Nuxt di repo
asalnya — keduanya sudah diberi catatan di tempatnya:

- `src/blocks/dashboard-01/components/ChartAreaInteractive.vue` — `ref`, `computed`
- `src/blocks/dashboard-01/components/DataTable.vue` — `h`, `ref`

## Lisensi

MIT. Lihat [LICENSE](./LICENSE).

Rantai lisensinya: shadcn/ui (MIT) → shadcn-vue (MIT) → Kliping (MIT).

# 🧰 KLIPING — Setup Codebase Baru

> Dokumen teknis untuk memulai Kliping dari nol, tanpa membawa serta app Nuxt.
> Disusun: Agustus 2026
> Menggantikan pendekatan fork-utuh yang sebelumnya dipakai.

---

## 📌 Kenapa mulai dari nol, bukan memangkas fork

Fork `unovue/shadcn-vue` membawa serta seluruh aplikasi Nuxt 4-nya: `nuxt.config.ts`,
`server/` berisi API Nitro, binding database D1, generator OG image, 8 varian style Reka,
dan 318 berkas demo. Komponennya sendiri cuma sebagian kecil dari itu.

Mencabut satu per satu berarti kerja forensik: cari di mana ketergantungan nyangkut,
cabut, cek tidak ada yang pecah, ulangi. Mengambil yang bersih dari awal jauh lebih murah.

**Yang diambil: 570 berkas, 3 MB.** Sisanya tidak pernah ikut.

---

## ✅ Fakta yang sudah diverifikasi

Diperiksa langsung pada `apps/v4/registry/new-york-v4/` di fork:

**Nol ketergantungan Nuxt.** Pencarian `NuxtLink`, `NuxtImg`, `useNuxtApp`, `definePageMeta`,
`useHead`, `useSeoMeta`, `useAsyncData`, `useFetch`, `#imports`, `navigateTo` di seluruh
folder `ui/` menghasilkan **nol** kecocokan.

**Paket yang benar-benar dipakai** (hasil hitung impor):

| Paket | Jumlah impor | Keterangan |
|---|---|---|
| `reka-ui` | 488 | Primitif headless, bebas framework |
| `vue` | 358 | — |
| `@vueuse/core` | 160 | — |
| `@lucide/vue` | 47 | Ikon |
| `class-variance-authority` | 29 | Varian style |
| `@vee-validate/*` | 3 | Hanya komponen `form` |
| `vue-input-otp` | 3 | Hanya `input-otp` |
| `embla-carousel-vue` | 3 | Hanya `carousel` |
| `vue-sonner` | 2 | Hanya `sonner` |
| `@unovis/vue` | 1 | Hanya `chart` |
| `@internationalized/date` | 1 | Hanya `calendar` |

**Alias internal:** `@/lib/utils` (314 impor — hanya fungsi `cn`) dan
`@/registry/new-york-v4/*` (55 impor — antar komponen).

Artinya: cukup sediakan `cn()` dan sesuaikan path alias, komponennya langsung jalan.

---

## 🔑 Salin-Tempel atau Tulis Ulang?

**Salin-tempel, lalu sesuaikan path impor. Tidak perlu ditulis ulang.**

Ini bukan perkiraan — sudah diperiksa satu per satu pada 570 berkas di fork.

### Kenapa aman disalin

Berkas di `registry/new-york-v4/` memang dirancang untuk didistribusikan ke project
non-Nuxt: Vite, Astro, Laravel. Upstream menjaganya tetap mandiri. Dua pembuktiannya:

**Nol API Nuxt.** Pencarian `NuxtLink`, `NuxtImg`, `useNuxtApp`, `definePageMeta`,
`useHead`, `useSeoMeta`, `useAsyncData`, `useFetch`, `#imports`, `navigateTo` di seluruh
`ui/` dan `blocks/` — **nol kecocokan**.

**Nol ketergantungan auto-import.** Ini jebakan yang paling sering menggigit saat
memindahkan komponen dari Nuxt ke Vite polos: Nuxt otomatis menyediakan `ref`,
`computed`, `watch`, `onMounted` tanpa perlu di-import, jadi berkas yang mengandalkannya
akan langsung pecah di Vite.

Hasil pemeriksaan pada 65 komponen `ui/`: **nol berkas** bermasalah. Semua API Vue
sudah di-import eksplisit.

### Yang perlu disesuaikan — hanya path alias

Empat pola, semuanya mekanis:

| Dari | Menjadi | Jumlah |
|---|---|---|
| `@/registry/new-york-v4/ui/` | `@/components/ui/` | 315 |
| `@/registry/new-york-v4/blocks/` | `@/blocks/` | 81 |
| `@/registry/new-york-v4/lib/` | `@/lib/` | 9 |
| `@/lib/utils` | tetap | 317 |

Bisa dikerjakan sekali jalan:

```bash
# dari root project baru, setelah folder disalin
grep -rl '@/registry/new-york-v4' src/ | xargs sed -i \
  -e 's|@/registry/new-york-v4/ui/|@/components/ui/|g' \
  -e 's|@/registry/new-york-v4/blocks/|@/blocks/|g' \
  -e 's|@/registry/new-york-v4/lib/|@/lib/|g'
```

### Satu pengecualian yang sudah diketahui

`blocks/dashboard-01/components/ChartAreaInteractive.vue` memakai `ref()` dan
`computed()` pada baris 168–169 **tanpa meng-import-nya**. Di fork ini lolos karena
Nuxt menyediakannya otomatis; di Vite polos akan error.

Perbaikannya satu baris — tambahkan di bagian atas `<script setup>`:

```ts
import { computed, ref } from 'vue'
```

### Cara memverifikasi sendiri

Setelah menyalin, jalankan ini untuk menangkap berkas lain yang mungkin mengandalkan
auto-import:

```bash
python3 - <<'PY'
import re, glob, os
apis = ['ref','computed','watch','watchEffect','onMounted','onUnmounted',
        'provide','inject','nextTick','reactive','toRefs','shallowRef']
for f in glob.glob('src/**/*', recursive=True):
    if not f.endswith(('.vue','.ts')) or os.path.isdir(f): continue
    s = open(f, encoding='utf-8', errors='replace').read()
    imported = set()
    for m in re.finditer(r"import\s*\{([^}]*)\}\s*from\s*['\"]vue['\"]", s):
        for n in m.group(1).split(','):
            imported.add(n.strip().replace('type ','').strip())
    miss = [a for a in apis
            if re.search(r'(?<![\w.])' + a + r'\s*\(', s) and a not in imported]
    if miss:
        print(f"{f}: kurang import {', '.join(miss)}")
PY
```

Keluaran kosong berarti aman. Jalankan tiap selesai satu gelombang penyalinan.

### Kesimpulan

| Pertanyaan | Jawaban |
|---|---|
| Perlu ditulis ulang? | Tidak |
| Perlu dikonversi TS → JS? | Tidak, justru merugikan — type-safety-nya hilang |
| Perlu disesuaikan? | Ya, tapi hanya path alias — 4 pola, satu perintah `sed` |
| Ada yang benar-benar perlu disentuh tangan? | Satu berkas, satu baris |

Perkiraan waktu untuk seluruh 570 berkas: **hitungan jam, bukan hari.**

---

## 🧱 Stack

| Lapis | Pilihan | Alasan |
|---|---|---|
| Build tool | **Vite** | Sesuai keputusan "Vue saja, bukan Nuxt" |
| Framework | **Vue 3** | — |
| Bahasa | **TypeScript** | Seluruh source upstream sudah `lang="ts"`; mengubah ke JS justru menghapus type-safety yang sudah ada |
| Styling | **Tailwind CSS v4** | Sesuai upstream v2.8.2 |
| Primitif | **reka-ui** | Yang dipakai komponennya |
| Dokumentasi | **VitePress** | Vue-native, markdown, komponen Vue bisa langsung ditulis di dalam `.md` |
| Deploy | **Cloudflare Pages (statis)** | Tanpa Worker, tanpa D1, tanpa server — sesuai "pure static" |

### Soal TypeScript

Format berkasnya `.vue` (Single File Component), dan bagian skripnya memakai TypeScript:

```vue
<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type ButtonVariants, buttonVariants } from '.'

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = defineProps<Props>()
</script>

<template>
  <button :class="cn(buttonVariants({ variant, size }))">
    <slot />
  </button>
</template>
```

Berkas pendukung seperti `index.ts` (ekspor `buttonVariants` dan type) serta `utils.ts`
(fungsi `cn`) murni `.ts`. Tipe seperti `ButtonVariants['variant']` inilah yang mencegah
`variant="asdf"` lolos tanpa ketahuan.

---

## 🚀 Langkah Setup

### 1. Buat project

```bash
npm create vite@latest kliping-ui -- --template vue-ts
cd kliping-ui
npm install
```

Flag `vue-ts` penting — `tsconfig` dan type checking langsung ter-setup.

### 2. Pasang dependensi

```bash
# Inti
npm install reka-ui @vueuse/core @lucide/vue \
  class-variance-authority clsx tailwind-merge

# Tailwind v4
npm install -D tailwindcss @tailwindcss/vite tw-animate-css

# Opsional — hanya kalau komponen terkait ikut diangkut
npm install vee-validate @vee-validate/zod zod   # form
npm install vue-input-otp                         # input-otp
npm install embla-carousel-vue                    # carousel
npm install vue-sonner                            # sonner
npm install @unovis/vue @unovis/ts                # chart
npm install @internationalized/date               # calendar, range-calendar
```

Pasang yang opsional **belakangan**, saat komponennya benar-benar diangkut. Jangan
memasang semuanya di awal.

### 3. Atur alias path

`vite.config.ts`:

```ts
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

`tsconfig.app.json` — tambahkan di `compilerOptions`:

```json
{
  "baseUrl": ".",
  "paths": { "@/*": ["./src/*"] }
}
```

### 4. Buat `cn()`

`src/lib/utils.ts`:

```ts
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 5. Siapkan CSS tema

`src/assets/main.css` — salin blok token tema lengkap dari fork
(`apps/v4/content/docs/installation/05.manual.md`, bagian "Atur style"). Isinya
`@import "tailwindcss"`, `@custom-variant dark`, blok `:root` dan `.dark`, lalu
`@theme inline`.

### 6. Angkut komponen

Dari fork, salin **hanya** dua folder ini:

```
apps/v4/registry/new-york-v4/ui/      →  src/components/ui/       (65 komponen, 2,2 MB)
apps/v4/registry/new-york-v4/blocks/  →  src/blocks/              (33 block, 864 KB)
```

Lalu sesuaikan path impor:

```
@/registry/new-york-v4/ui/   →  @/components/ui/
@/lib/utils                  →  tetap (sudah dibuat di langkah 4)
```

Buang `_registry.ts` dan `_meta.ts` — itu berkas hasil generate milik sistem registry upstream.

**Jangan angkut sekaligus.** Mulai dari `button`, pastikan render, baru lanjut.
Urutan yang disarankan: `button` → `input` → `label` → `card` → `dialog` → sisanya.

### 7. Verifikasi

```bash
npm run dev
```

Render satu tombol di `App.vue`. Kalau muncul dan variannya bekerja, fondasinya benar.

---

## 📚 Situs Dokumentasi

Dipisah dari library, di folder `docs/` dengan VitePress:

```bash
npm install -D vitepress
```

VitePress menerima komponen Vue langsung di dalam markdown — tidak perlu sintaks khusus:

```md
# Button

Menampilkan tombol, atau komponen lain yang tampil seperti tombol.

<ButtonDemo />
```

### Mengangkut 107 dokumentasi Bahasa Indonesia

Dokumentasi Bahasa Indonesia di fork **sudah selesai seluruhnya** (112 berkas `.md`)
dan bisa diangkut. Yang perlu dikonversi hanya sintaksnya, bukan tulisannya:

| Sintaks Nuxt Content | Jumlah | Padanan VitePress |
|---|---|---|
| `::component-preview{...}` | 311 | `<ComponentPreview name="..." />` |
| `::tabs-trigger` | 145 | bagian dari `:::code-group` |
| `::steps` / `::step` | 70 | komponen `<Steps>` buatan sendiri |
| `:::code-tabs` | 63 | `:::code-group` bawaan VitePress |
| `::callout` / `<Callout>` | 41 | `::: tip` / `::: warning` bawaan |

Semuanya mekanis dan bisa dikerjakan dengan skrip regex — prosa Indonesianya utuh,
tidak perlu diterjemahkan ulang.

---

## ⚠️ Jebakan yang Sudah Terbukti Memakan Waktu

Empat hal ini membuat build fork gagal berulang kali di Cloudflare. Jangan diulang:

**1. Generator OG image per halaman.** `nuxt-og-image` merender satu gambar untuk tiap
halaman, dan render pertamanya menggantung menunggu font yang tidak ketemu — build mati
28,5 menit tanpa satu pun rute selesai. Pakai **satu gambar OG statis** lewat meta tag.

**2. Crawler prerender tanpa batas.** `crawlLinks: true` menyusuri tiap tautan, termasuk
halaman preview untuk tiap item registry. Jumlah rutenya tidak terkendali. **Daftarkan
rute yang mau dibangun statis secara eksplisit.**

**3. Batas heap Node yang kebesaran.** `--max-old-space-size=16384` meminta 16 GB. Di
container build yang RAM-nya jauh lebih kecil, V8 menunda GC sampai memori fisik habis
dan proses bertukar ke disk. **Jangan set di atas RAM container.**

**4. Kompresi aset saat build.** `compressPublicAssets: true` meng-gzip dan mem-brotli
tiap berkas publik. Cloudflare sudah mengompres di edge, jadi ini murni biaya — plus
melipattigakan jumlah berkas yang diunggah.

Dengan Vite + VitePress statis, keempatnya tidak ada sejak awal. Itu justru salah satu
alasan pendekatan ini lebih murah.

---

## 🗂️ Struktur Akhir

```
kliping-ui/
├── src/
│   ├── lib/
│   │   └── utils.ts              cn()
│   ├── components/
│   │   └── ui/                   65 komponen primitif
│   │       ├── button/
│   │       │   ├── Button.vue
│   │       │   └── index.ts
│   │       └── ...
│   ├── blocks/                   33 block siap pakai
│   │   ├── login-01/
│   │   └── ...
│   └── assets/
│       └── main.css              token tema
├── docs/                         VitePress
│   ├── .vitepress/
│   │   ├── config.ts
│   │   └── theme/
│   └── *.md                      dokumentasi Bahasa Indonesia
├── registry.json                 metadata komponen
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚖️ Lisensi

Tetap MIT, dengan rantai atribusi yang jelas:

```
MIT License

Copyright (c) 2026 Kliping

Berbasis pada shadcn-vue (https://github.com/unovue/shadcn-vue)
Copyright (c) 2023 unovue

Awalnya berbasis pada shadcn/ui (https://ui.shadcn.com)
Copyright (c) 2023 shadcn
```

Mengangkut komponen dari repo berlisensi MIT diperbolehkan selama pemberitahuan hak
ciptanya ikut dicantumkan. Cantumkan di `LICENSE` dan di halaman kredit dokumentasi.

---

## 🚫 Yang Sengaja Ditinggal

| Ditinggal | Alasan |
|---|---|
| Seluruh app Nuxt (`nuxt.config.ts`, `server/`, `content.config.ts`) | Sumber semua kerumitan build |
| 8 varian style Reka (17 MB) | Roadmap menetapkan `new-york-v4` sebagai fokus; 6 dari 8 varian bahkan tidak pernah diimpor |
| Database D1 + `seed-d1.ts` | Situs statis tidak butuh database |
| Generator OG image + WASM takumi (3,7 MB) | Diganti gambar statis |
| Halaman `/create` dan `/typeset` | Fitur upstream, tidak ada di roadmap Kliping |
| Paket CLI (`packages/cli`) | Fase awal memakai gunting-tempel, bukan CLI |
| `apps/deprecated/www` | Versi VitePress lama milik upstream |

---

*Dokumen ini pasangan dari KLIPING-ROADMAP.md.*

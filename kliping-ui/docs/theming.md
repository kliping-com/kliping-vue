---
title: Tema & Kustomisasi
description: Memakai CSS variable dan token tema.
---

::: tip 
Ingin merancang tema secara visual? Buka halaman Buat untuk melihat pratinjau
warna, radius, font, dan ikon, lalu hasilkan preset untuk project Anda.
:::

Kami memakai — dan menyarankan — CSS variable untuk theming.

Pendekatan ini memberi Anda token tema yang bermakna seperti `background`, `foreground`, dan
`primary`, yang sudah dipakai komponen secara bawaan. Cukup timpa token tersebut di CSS Anda
untuk mengubah tampilan aplikasi, tanpa perlu menulis ulang class di setiap komponen.

```vue /bg-background/ /text-foreground/
<div class="bg-background text-foreground" />
```

Untuk memakai CSS variable, isi `tailwind.cssVariables` dengan `true` di file `components.json` Anda. Ini nilai bawaannya.

```json {8} title="components.json" showLineNumbers
{
  "style": "default",
  "typescript": true,
  "tailwind": {
    "config": "",
    "css": "assets/css/tailwind.css",
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

Tailwind menerjemahkan token-token ini menjadi utility seperti `bg-background`, `text-foreground`, `border-border`, dan `ring-ring`.

Mode gelap bekerja dengan menimpa token yang sama di dalam selector `.dark`. Lihat [dokumentasi mode gelap](/dark-mode) untuk memasang theme provider dan mengatur class `.dark`.

## Konvensi Token

Kami memakai pasangan background dan foreground yang bermakna. Token dasarnya mengatur warna permukaan, sedangkan token `-foreground` mengatur warna teks dan ikon yang berada di atas permukaan tersebut.

::: tip 
Akhiran `background` sengaja tidak ditulis pada token permukaan. Contohnya, `primary` berpasangan dengan `primary-foreground`.
:::

Misalkan Anda punya CSS variable berikut:

```css
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
```

Maka warna `background` komponen di bawah ini adalah `var(--primary)`, dan warna `foreground`-nya `var(--primary-foreground)`.

```vue
<div class="bg-primary text-primary-foreground">Halo</div>
```

## Daftar Token Tema

Token-token ini tinggal di file CSS Anda, di dalam `:root` dan `.dark`.

| Token                                            | Mengatur apa                                           | Dipakai oleh                                                                 |
| ------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `background` / `foreground`                      | Background dan warna teks bawaan aplikasi.             | Kerangka halaman, section halaman, dan teks bawaan.                          |
| `card` / `card-foreground`                       | Permukaan yang terangkat dan isi di dalamnya.          | `Card`, panel dashboard, panel pengaturan.                                   |
| `popover` / `popover-foreground`                 | Permukaan mengambang dan isi di dalamnya.              | `Popover`, `DropdownMenu`, `ContextMenu`, dan overlay lainnya.               |
| `primary` / `primary-foreground`                 | Aksi utama dan permukaan bernuansa brand.              | `Button` bawaan, state terpilih, badge, dan aksen aktif.                     |
| `secondary` / `secondary-foreground`             | Aksi pendukung dan permukaan penunjang.                | Tombol sekunder, badge sekunder, dan UI penunjang.                           |
| `muted` / `muted-foreground`                     | Permukaan lembut dan konten yang tidak ditonjolkan.    | Deskripsi, placeholder, empty state, teks bantuan, dan permukaan redup.      |
| `accent` / `accent-foreground`                   | Permukaan saat hover, focus, dan aktif.                | Tombol ghost, sorotan menu, baris yang di-hover, dan item terpilih.          |
| `destructive`                                    | Aksi merusak dan penekanan error.                      | Tombol hapus, state tidak valid, dan item menu yang merusak.                 |
| `border`                                         | Border dan pemisah bawaan.                             | Card, menu, tabel, separator, dan pembatas layout.                           |
| `input`                                          | Border dan permukaan kontrol form.                     | `Input`, `Textarea`, `Select`, dan kontrol bergaya outline.                  |
| `ring`                                           | Cincin focus dan outline.                              | Tombol, input, checkbox, menu, dan kontrol lain yang bisa di-focus.          |
| `chart-1` ... `chart-5`                          | Palet warna bawaan untuk chart.                        | Chart dan block dashboard yang memuat chart.                                 |
| `sidebar` / `sidebar-foreground`                 | Permukaan dasar sidebar dan teks bawaannya.            | Container `Sidebar` dan isi bawaannya.                                       |
| `sidebar-primary` / `sidebar-primary-foreground` | Aksi utama di dalam sidebar.                           | Item aktif, kotak ikon, badge, dan CTA sidebar.                              |
| `sidebar-accent` / `sidebar-accent-foreground`   | State hover dan terpilih di dalam sidebar.             | Hover menu sidebar, item yang terbuka, dan baris interaktif.                 |
| `sidebar-border`                                 | Border dan pemisah khusus sidebar.                     | Header sidebar, grup, dan pembatas internal.                                 |
| `sidebar-ring`                                   | Cincin focus khusus sidebar.                           | Kontrol yang sedang di-focus di dalam sidebar.                               |
| `radius`                                         | Skala radius sudut dasar.                              | Card, input, tombol, popover, dan token `radius-*` turunannya.               |

::: tip 
Token untuk chart dibahas lebih detail di [dokumentasi tema Chart](/components/chart#tema).
:::

## Skala Radius

`--radius` adalah token radius dasar untuk tema Anda.

Dari satu nilai itu kami turunkan skala radius kecil, supaya semua komponen memakai ukuran sudut yang konsisten tapi tetap bersumber dari satu tempat.

```css title="assets/css/tailwind.css" showLineNumbers
@theme inline {
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

Artinya:

- `radius-lg` adalah nilai dasarnya.
- Radius yang lebih kecil diturunkan dari `--radius`.
- Radius yang lebih besar dinaikkan dari `--radius`.
- Mengubah `--radius` otomatis memperbarui seluruh skala radius.

## Menambah Token Baru

Untuk menambah token baru, deklarasikan di `:root` dan `.dark`, lalu perkenalkan ke Tailwind lewat `@theme inline`.

```css title="assets/css/tailwind.css" showLineNumbers
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Sekarang Anda bisa memakai `bg-warning` dan `text-warning-foreground` di komponen Anda.

```vue /bg-warning/ /text-warning-foreground/
<div class="bg-warning text-warning-foreground" />
```

## Warna Dasar

`tailwind.baseColor` menentukan nilai token bawaan yang dihasilkan untuk project Anda saat menjalankan `init` atau memakai sebuah preset.

Pilihan warna dasarnya: **Neutral**, **Gray**, **Zinc**, **Stone**, dan **Slate**.

## CSS Tema Bawaan

Berikut kerangka lengkap tema `neutral` bawaan. Salin ke file CSS global Anda, lalu sesuaikan token-tokennya sesuai kebutuhan.

::: details Lihat kode lengkap

```css showLineNumbers title="assets/css/tailwind.css"
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

:::

## Tanpa CSS Variable

Kalau Anda tidak ingin memakai CSS variable, CLI bisa menghasilkan komponen dengan utility warna Tailwind langsung di dalam class.

```bash
npx shadcn-vue@latest init --no-css-variables
```

Perintah ini mengisi `tailwind.cssVariables` dengan `false` di file `components.json` Anda.

```vue /bg-zinc-950/ /text-zinc-50/ /dark:bg-white/ /dark:text-zinc-950/
<div class="bg-zinc-950 text-zinc-50 dark:bg-white dark:text-zinc-950" />
```

::: tip 
Pilihan ini ditentukan saat instalasi. Untuk berpindah di project yang sudah jalan, Anda harus menghapus lalu memasang ulang komponen-komponen Anda.
:::

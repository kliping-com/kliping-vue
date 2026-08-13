---
title: Typeset
description: Sistem penataan untuk HTML dan markdown hasil render — dari tulisan blog sampai chat yang mengalir. Satu berkas CSS yang jadi milik Anda.
---

Anda me-render markdown, lalu yang keluar HTML polos tanpa style: heading, paragraf, list, tabel. Jadi Anda menata elemennya satu per satu — ukuran font, tinggi baris, jarak antar elemen.

Anda kerjakan itu untuk blog Anda. Lalu diulang lagi untuk dokumentasi. Lalu diulang lagi untuk aplikasi chat. Setiap kali, yang Anda lawan sama saja: ukuran dan jarak.

Untuk mengatasi itu, upstream membuat **Typeset**: satu berkas CSS yang menata semua isi di dalam container `typeset`. Berkasnya ada di project Anda, jadi bisa langsung Anda ubah kapan pun perlu.

Sebuah typeset pada dasarnya cuma class preset kecil. Anda boleh punya beberapa typeset dalam satu aplikasi, untuk konteks yang berbeda-beda.

```css
.typeset-docs {
  --typeset-font-body: var(--font-geist-sans);
  --typeset-font-heading: var(--font-geist-sans);
  --typeset-font-mono: var(--font-geist-mono);
  --typeset-size: 15px;
  --typeset-leading: 1.75;
  --typeset-flow: 1.25em;
}
```

[Susun typeset Anda](/typeset)

---

## Prinsipnya

Ada banyak sekali hal soal tipografi: rasio skala, tracking, kerning, optical sizing, measure, leading, sampai jarak di atas dan bawah tiap elemen. Membuka semuanya untuk diatur ternyata berlebihan — tidak ada yang mau mengisi selusin variabel hanya supaya markdown-nya enak dilihat.

Karena itu semuanya diringkas jadi tiga kendali saja: size, leading, dan flow. Sisanya — ukuran heading, indentasi list, jarak di bawah heading, ruang di sekitar garis pemisah — semuanya diturunkan dari ketiganya. Tiga kendali. Namanya rhythm.

---

## Fitur

- **Menyesuaikan container-nya.** Ditaruh di gelembung chat, ia mengikuti ukuran teks kecil di sekitarnya. Ditaruh di artikel, ia ikut membesar bersama halamannya. Di layar kecil, ukurannya dinaikkan sedikit demi keterbacaan.
- **Memakai tema Anda.** Warna, font, dan radius diambil dari aplikasi Anda. Mode gelapnya mengikuti token yang sama.
- **Mudah disetel.** Tiga nilai mengatur ukuran dasar, tinggi baris, dan jarak antar blok. Ubah di preset, seluruh dokumen ikut menyesuaikan.
- **Cocok untuk konten yang mengalir.** Saat blok baru datang, Typeset tidak membuat blok sebelumnya berganti margin, garis tepi, atau style.

---

## Menyusun Typeset Anda

Susun typeset Anda di [builder typeset](/typeset). Pilih font dan ritmenya, lalu lihat pratinjaunya pada dokumentasi, chat, artikel, dan konten nyata lainnya.

Panelnya memberi Anda berkas `typeset.css`, pengaturan font untuk framework Anda, class preset berisi pilihan Anda, serta pembungkus yang perlu dipasang di sekeliling konten.

Salin `typeset.css` ke samping berkas CSS utama Anda, lalu import setelah Tailwind:

```css
@import "tailwindcss";
@import "./typeset.css";
```

Lalu bungkus markdown hasil render Anda dengan `typeset` beserta class preset Anda:

```vue
<template>
  <div class="typeset typeset-docs">
    <ContentRenderer :value="page" />
  </div>
</template>
```

`typeset` yang menyalakan style-nya. `typeset-docs` adalah preset yang Anda buat di builder.

---

## Typeset Buatan Sendiri

Berkasnya sudah memuat nilai bawaan, jadi `typeset` bisa dipakai sendirian. Sebagian besar ritme bacanya ditentukan tiga nilai:

```css
.typeset {
  --typeset-font-body: inherit;
  --typeset-font-heading: var(--font-heading);
  --typeset-font-mono: var(--font-mono);

  --typeset-size: 1em; /* body font-size */
  --typeset-leading: 1.75; /* line-height */
  --typeset-flow: 1.25em; /* space between blocks */
}
```

- **`--typeset-size`** menentukan ukuran teks dasar. Nilai `1em` mengikuti tata letak di sekitarnya. Di layar kecil, Typeset menaikkannya sedikit.
- **`--typeset-leading`** menentukan jarak antar baris.
- **`--typeset-flow`** menentukan jarak antar blok. Heading dan elemen lain menurunkan jaraknya dari nilai ini.

Variabel font memberi tahu Typeset keluarga font mana yang dipakai. Biarkan apa adanya, dan ia akan mengikuti aplikasi Anda. Warna dan radius juga diambil dari tema Anda.

Typeset tidak menetapkan lebar maksimum — itu urusan tata letak Anda. Kendali Measure di builder menambahkan `max-width` pada pembungkusnya, bukan menyembunyikannya di dalam stylesheet.

Anda boleh menyimpan lebih dari satu preset dalam satu aplikasi. Berikut satu preset yang lebih rapat untuk chat, dan satu yang lebih lapang untuk dokumentasi:

```css
.typeset-chat {
  --typeset-flow: 1em;
  --typeset-leading: 1.6;
}

.typeset-docs {
  --typeset-size: 15px;
  --typeset-flow: 1.5em;
}
```

```vue
<template>
  <div class="typeset typeset-chat" v-html="message" />
  <article class="typeset typeset-docs" v-html="page" />
</template>
```

Untuk perubahan sekali pakai, lewati presetnya dan atur nilainya langsung di container:

```vue
<template>
  <article class="typeset [--typeset-flow:1.75em]">...</article>
</template>
```

---

## Tema Buatan Sendiri

Sebuah preset bisa mengubah keseluruhan nuansa konten, bukan sekadar jaraknya. Anda bisa memberi pembaca mode baca serif, mode UI ringkas, atau gaya lain apa pun yang cocok dengan produk Anda.

```css
/* Reading: serif, larger type, roomy rhythm. */
.typeset-reading {
  --typeset-font-body: var(--font-lora);
  --typeset-font-heading: var(--font-lora);
  --typeset-size: 18px;
  --typeset-leading: 1.9;
  --typeset-flow: 2em;
}

/* Compact: sans, smaller type, tighter rhythm. */
.typeset-compact {
  --typeset-font-body: var(--font-geist-sans);
  --typeset-font-heading: var(--font-geist-sans);
  --typeset-size: 14px;
  --typeset-leading: 1.6;
  --typeset-flow: 1em;
}
```

---

## Aksesibilitas dan Mode Gelap

Untuk pembaca yang lebih nyaman dengan teks besar dan ruang lega, buat typeset yang lebih lapang lalu tawarkan sebagai pengaturan:

```css
.typeset-large {
  --typeset-size: 16px;
  --typeset-leading: 2;
  --typeset-flow: 2em;
}
```

Mode gelap sudah mengikuti warna tema Anda. Kalau teksnya terasa agak sesak di atas permukaan gelap, longgarkan saja leading-nya di sana:

```css
.dark .typeset {
  --typeset-leading: 1.9;
}
```

---

## Tabel Responsif

Tabel tetap tabel sungguhan dan membungkus isinya agar muat. Kalau tabel lebar ingin digulir mendatar, bungkus dengan `typeset-scroll`. Pembungkusnya di-style sebagai bagian dari konten, jadi hanya bekerja *di dalam* container `typeset`:

```vue
<template>
  <article class="typeset typeset-docs">
    <div class="typeset-scroll">
      <table>...</table>
    </div>
  </article>
</template>
```

Lakukan ini di komponen tabel renderer Anda, atau lewat plugin rehype kecil, di titik ketika keluarannya sudah berada di dalam container. Cara ini berlaku untuk blok lebar apa pun, bukan hanya tabel.

---

## Menimpa Style

Typeset berada di layer `components` dan memakai `:where()` untuk selector elemennya. Utility Tailwind pada sebuah elemen otomatis menang tanpa perlu `!important`:

```vue
<template>
  <div class="typeset typeset-docs">
    <p class="text-lg">...</p>
  </div>
</template>
```

CSS biasa juga bisa menimpa Typeset lewat selector biasa.

---

## Mengecualikan Bagian Tertentu

Untuk mengeluarkan sebuah komponen dari jangkauan Typeset, tambahkan `not-typeset` atau `data-not-typeset`:

```vue
<template>
  <div class="typeset">
    <p>Styled prose.</p>
    <Card class="not-typeset">
      Untouched component.
    </Card>
  </div>
</template>
```

Keduanya mencakup komponen itu beserta seluruh isinya. Container `typeset` lain di dalam cabang tersebut juga ikut dikecualikan.

---

## Konten yang Mengalir

Typeset ditulis sedemikian rupa supaya menambahkan blok baru tidak mengubah style blok yang sudah tampil di layar.

- Tanpa selector yang menengok ke depan. `:last-child`, `:has()`, dan `:empty` sengaja tidak dipakai di aturan tata letak, karena kecocokannya bisa berubah begitu konten bertambah.
- Spacing flows in one direction, using `margin-block-start` only. A new block adds its own space.
- Pemisah tabel menempel pada sel yang sedang ditambahkan, jadi baris baru tidak mengubah style baris di atasnya.

Teks yang masih mengalir tetap bisa memanjang dan membungkus seperti biasa. Typeset hanya menghindari mengubah style blok yang sudah lebih dulu ada.

---

## Karya Pendahulu

Class `prose` dari `@tailwindcss/typography` sangat baik untuk tujuan pembuatannya: memberi tipografi bawaan yang rapi pada HTML polos, termasuk konten hasil render dari Markdown atau CMS.

Typeset menempuh jalan berbeda: ukurannya sadar container, memakai token tema aplikasi, menyediakan preset untuk konteks berbeda, dan stabil saat konten mengalir. Berikut perbedaannya:

|              | @tailwindcss/typography                      | Typeset                                          |
| ------------ | -------------------------------------------- | ------------------------------------------------ |
| Ukuran       | Skala `rem` tetap, `prose-sm` s/d `prose-2xl` | Relatif terhadap container, ukuran apa pun      |
| Mode gelap   | `prose-invert`, palet kedua                   | Token Anda yang berbalik, tanpa tambahan apa pun |
| Tema         | Variabel warna prose, skalanya sudah paten    | Token tema Anda, plus kendali font dan ritme    |
| Menimpa style| API modifier `prose-a:` dan `prose-headings:` | Utility biasa dan CSS langsung menang           |
| Konten mengalir | Tanpa jaminan stabil saat konten bertambah | Memang dirancang stabil saat konten bertambah   |
| Distribusi   | Plugin npm, CSS yang dihasilkan otomatis      | Satu berkas CSS yang jadi milik Anda            |

Typeset meminjam dua gagasan terbaik dari plugin itu: pola penjaga `:where()` yang berspesifisitas nol, dan class jalan keluar (`not-typeset`, meneruskan semangat `not-prose`).

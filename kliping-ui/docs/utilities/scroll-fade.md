---
title: scroll-fade
description: Utility untuk memberi efek pudar di tepi area gulir.
---

<ComponentPreview name="ScrollFadeDemo" previewClass="h-auto" />


## Instalasi

Kalau project Anda disiapkan lewat `npx shadcn-vue@latest init`, `scroll-fade` sudah tersedia. Utility ini ikut dalam paket `shadcn-vue`, yang di-import CLI ke file CSS global Anda.

Kalau belum, pasang paket `shadcn-vue`:

```bash
npm install shadcn-vue
```

Lalu import utility bersamanya di file CSS global Anda:

```css
@import "tailwindcss";
@import "shadcn-vue/tailwind.css";
```

## Penggunaan

| Class                             | Style                                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `scroll-fade`                     | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));` <br /> `animation-timeline: scroll(self y);`       |
| `scroll-fade-y`                   | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));` <br /> `animation-timeline: scroll(self y);`       |
| `scroll-fade-x`                   | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-inline));` <br /> `animation-timeline: scroll(self inline);` |
| `scroll-fade-t`                   | Mask pudar di tepi atas. <br /> `animation-timeline: scroll(self y);`                                               |
| `scroll-fade-b`                   | Mask pudar di tepi bawah. <br /> `animation-timeline: scroll(self y);`                                              |
| `scroll-fade-l`                   | Mask pudar di tepi kiri. <br /> `animation-timeline: scroll(self x);`                                               |
| `scroll-fade-r`                   | Mask pudar di tepi kanan. <br /> `animation-timeline: scroll(self x);`                                              |
| `scroll-fade-s`                   | Mask pudar di tepi awal, ikut terbalik pada RTL. <br /> `animation-timeline: scroll(self inline);`                  |
| `scroll-fade-e`                   | Mask pudar di tepi akhir, ikut terbalik pada RTL. <br /> `animation-timeline: scroll(self inline);`                 |
| `scroll-fade-<number>`            | `--scroll-fade-size: calc(var(--spacing) * <number>);`                                                              |
| `scroll-fade-[<value>]`           | `--scroll-fade-size: <value>;`                                                                                      |
| `scroll-fade-{t,b,s,e}-<number>`  | `--scroll-fade-{t,b,s,e}-size: calc(var(--spacing) * <number>);`                                                    |
| `scroll-fade-{t,b,s,e}-[<value>]` | `--scroll-fade-{t,b,s,e}-size: <value>;`                                                                            |
| `scroll-fade-none`                | `--scroll-fade-mask: none;`                                                                                         |

Tambahkan `scroll-fade` atau `scroll-fade-y` pada wadah gulirnya — yaitu elemen yang punya `overflow-y-auto`.

```vue
<template>
  <div class="scroll-fade overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

Efek pudarnya mengikuti posisi gulir:

- Saat diam, tepi atas tetap tajam sementara tepi bawah memudar sebagai isyarat masih ada konten lain.
- Saat digulir, tepi atas ikut memudar, dan di tengah gulir kedua tepinya sama-sama pudar.
- Di ujung akhir, tepi bawah kembali tajam untuk menandakan Anda sudah sampai item terakhir.

Efek pudarnya diterapkan lewat `mask-image`, jadi ia melarutkan kontennya sendiri, bukan menimpanya dengan warna. Mask-nya memakai gradasi linear dari transparan ke hitam, sehingga menyesuaikan latar apa pun tanpa perlu diatur. Kalau area gulir Anda berada di dalam sebuah card, taruh latar dan garis tepinya di elemen pembungkus, dan `scroll-fade` di area gulir bagian dalam — supaya yang larut adalah kontennya, bukan card-nya.

Komponen [`ScrollArea`](/components/scroll-area) dan [`MessageScroller`](/components/message-scroller) bisa memakai `scroll-fade` pada area gulirnya.

## Tidak Melimpah, Tidak Memudar

Kalau kontennya tidak melebihi wadah, efek pudarnya tidak muncul. Jadi `scroll-fade` bisa Anda pasang di daftar mana pun tanpa perlu mengecek apakah daftar itu bisa digulir.

<ComponentPreview name="ScrollFadeOverflowDemo" previewClass="h-auto" />


## Gulir Mendatar

Pakai `scroll-fade-x` pada wadah yang bergulir mendatar — yaitu elemen yang punya `overflow-x-auto`.

<ComponentPreview name="ScrollFadeHorizontalDemo" previewClass="h-64" />


```vue
<template>
  <div class="flex scroll-fade-x overflow-x-auto">
    <!-- ... -->
  </div>
</template>
```

Efek pudar mendatarnya sadar arah baca. Pada tata letak RTL, tepi yang tajam dan yang memudar otomatis mengikuti arah baca tanpa class tambahan. `scroll-fade-<angka>` dan `scroll-fade-none` bekerja sama untuk kedua sumbu.

## Pudar per Tepi

Pakai utility per tepi kalau hanya satu tepi yang perlu mengikuti posisi gulir.

<ComponentPreview name="ScrollFadeEdgeDemo" previewClass="h-auto" />


```vue
<template>
  <div class="scroll-fade-b overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

Utility per tepi ini mengikuti posisi gulir. Tepi awal mulai memudar setelah Anda menggulir menjauh dari awal, dan tepi akhir berhenti memudar begitu Anda sampai di ujung. Pakai `scroll-fade-t`, `scroll-fade-b`, `scroll-fade-l`, dan `scroll-fade-r` untuk tepi fisik; pakai `scroll-fade-s` dan `scroll-fade-e` untuk tepi logis yang ikut terbalik pada RTL.

## Ukuran Pudar

Kedalaman pudarnya secara bawaan `12%` dari tinggi wadah, dibatasi maksimal `40px` supaya area gulir yang tinggi tetap terlihat halus. Pakai `scroll-fade-<angka>` kalau Anda ingin menetapkan ukuran tetap dari skala spacing, sama seperti cara kerja `scroll-mt-<angka>`.

<ComponentPreview name="ScrollFadeSizeDemo" previewClass="h-auto" />


```vue
<template>
  <div class="scroll-fade scroll-fade-24 overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

Untuk nilai sekali pakai, gunakan panjang atau persentase bebas:

```vue
<template>
  <div class="scroll-fade scroll-fade-[15%] overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

Untuk memudarkan tepi yang berseberangan dengan takaran berbeda, pakai modifier per tepi: `scroll-fade-t-<angka>`, `scroll-fade-b-<angka>`, `scroll-fade-s-<angka>`, dan `scroll-fade-e-<angka>`. Semuanya menimpa `scroll-fade-<angka>` pada tepi yang disasar, dan menerima nilai bebas juga.

```vue
<template>
  <div class="scroll-fade scroll-fade-b-8 scroll-fade-t-2 overflow-y-auto">
    <!-- ... -->
  </div>
</template>
```

Untuk area gulir mendatar, pakai modifier logis `s`/`e` supaya ukurannya ikut terbalik pada RTL.

Efek pudarnya muncul dan hilang secara bertahap sepanjang jarak gulir tertentu, bukan seketika. Jarak itu diatur variabel `--scroll-fade-reveal`, bawaannya `96px` dan terpisah dari kedalaman pudarnya. Perkecil supaya lebih cepat muncul, perbesar supaya lebih bertahap:

```vue
<template>
  <div class="scroll-fade overflow-y-auto [--scroll-fade-reveal:64px]">
    <!-- ... -->
  </div>
</template>
```

## Mematikan Efek Pudar

Pakai `scroll-fade-none` untuk menghilangkan efek pudarnya. Urutan class-nya tidak berpengaruh, jadi biasanya dipakai secara responsif atau bergantung state:

```vue
<template>
  <div class="scroll-fade overflow-y-auto md:scroll-fade-none">
    <!-- ... -->
  </div>
</template>
```

<ComponentPreview name="ScrollFadeNoneDemo" previewClass="h-auto" />


## Kalau Browser Belum Mendukung

Perilaku yang mengikuti gulir ini dibangun dengan [animasi CSS berbasis gulir](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations) — tanpa JavaScript dan tanpa scroll listener. Di browser yang belum mendukungnya, `scroll-fade` turun menjadi pudar statis di kedua tepi, dan utility per tepi menjadi pudar statis di tepi yang dipilih.

Karena mask-nya dipasang di wadah gulirnya sendiri, scrollbar yang terlihat ikut memudar bersama konten di tepinya. Padukan `scroll-fade` dengan `scrollbar-none` — tersedia di paket yang sama — kalau Anda ingin menyembunyikan scrollbar sepenuhnya.

## RTL

`scroll-fade-x` mengikuti arah baca. Saat diam, tepi awal tajam dan tepi akhir memudar. Pada tata letak RTL itu berarti tepi kanan yang tajam dan tepi kiri yang memudar — kebalikan dari LTR.

<ComponentPreview name="ScrollFadeRTLDemo" previewClass="h-auto" />

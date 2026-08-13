---
title: shimmer
description: Utility untuk memberi efek kilat berjalan pada teks.
---

<ComponentPreview name="ShimmerDemo" />


## Instalasi

Kalau project Anda disiapkan lewat `npx shadcn-vue@latest init`, `shimmer` sudah tersedia. Utility ini ikut dalam paket `shadcn-vue`, yang di-import CLI ke file CSS global Anda.

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

| Class                         | Style                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| `shimmer`                     | `background-clip: text;` <br /> `animation: tw-shimmer var(--shimmer-duration, 2s) linear infinite;` |
| `shimmer-once`                | `animation-iteration-count: 1;`                                                                      |
| `shimmer-reverse`             | `animation-direction: reverse;`                                                                      |
| `shimmer-none`                | `--shimmer-image: none;` <br /> `--shimmer-text-fill: currentColor;`                                 |
| `shimmer-color-<color>`       | `--shimmer-color: <color>;`                                                                          |
| `shimmer-color-[<value>]`     | `--shimmer-color: <value>;`                                                                          |
| `shimmer-color-<color>/<pct>` | `--shimmer-color: color-mix(in oklch, <color> <pct>, transparent);`                                  |
| `shimmer-duration-<number>`   | `--shimmer-duration: calc(<number> * 1ms);`                                                          |
| `shimmer-spread-<number>`     | `--shimmer-spread: calc(var(--spacing) * <number>);`                                                 |
| `shimmer-spread-[<value>]`    | `--shimmer-spread: <value>;`                                                                         |
| `shimmer-angle-<number>`      | `--shimmer-angle: calc(<number> * 1deg);`                                                            |

Tambahkan `shimmer` pada sebuah elemen teks.

```tsx
<p class="shimmer text-muted-foreground">Generating response&hellip;</p>
```

Efek shimmer dibangun di atas `currentColor`, jadi ia menyesuaikan elemennya:

- Warna kilatnya diturunkan dari warna teks, tanpa perlu diatur.
- Berfungsi pada warna apa pun, dari `text-muted-foreground` sampai warna brand Anda.
- Di mode gelap, kilatnya otomatis dicerahkan supaya tetap terlihat.

Efeknya murni CSS. Teksnya digambar memakai `background-clip: text`, lalu kilatnya menyapu melintasi teks dalam putaran yang mulus.


## Warna

Pakai `shimmer-color-<warna>` untuk menentukan warna kilatnya secara langsung. Ia menerima warna tema, boleh disertai modifier opasitas, atau nilai warna bebas.

<ComponentPreview name="ShimmerColorDemo" />


## Durasi

Pakai `shimmer-duration-<angka>` untuk menentukan lama satu sapuan dalam milidetik. Bawaannya `2000`, alias `2s`.

<ComponentPreview name="ShimmerDurationDemo" />


## Lebar Kilat

Pakai `shimmer-spread-<angka>` untuk menentukan lebar pita kilatnya memakai skala spacing. Bawaannya `calc(3ch + 40px)` — nilai dasar tetap ditambah bagian `3ch` yang ikut membesar bersama ukuran font.

<ComponentPreview name="ShimmerSpreadDemo" />


Untuk nilai sekali pakai, gunakan panjang atau persentase bebas:

```tsx
<p class="shimmer shimmer-spread-[5rem]">Generating response&hellip;</p>
```


## Kemiringan

Pakai `shimmer-angle-<angka>` untuk menentukan kemiringan pita kilatnya dalam derajat. Bawaannya `20`.

<ComponentPreview name="ShimmerAngleDemo" />


## Arah Berlawanan

Pakai `shimmer-reverse` untuk menyapukan kilatnya ke arah sebaliknya. Pada tata letak RTL, sapuannya memang sudah mengikuti arah baca. Lihat [RTL](#rtl).


## Sekali Jalan

Pakai `shimmer-once` supaya kilatnya menyapu sekali saja, bukan berulang — berguna sebagai penanda saat proses streaming selesai. Padukan dengan `shimmer-duration-<angka>` untuk mengatur lama sapuannya.

<ComponentPreview name="ShimmerPlayOnceDemo" />


## Mematikan Efek Shimmer

Pakai `shimmer-none` untuk mematikan efeknya dan menampilkan teks seperti biasa. Urutan class-nya tidak berpengaruh, jadi biasanya dipakai secara responsif atau bergantung state:

<ComponentPreview name="ShimmerDisablingDemo" />


## Kalau Browser Belum Mendukung

Efek shimmer dibangun di atas fitur warna modern — [relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) dan `color-mix()` — yang sudah tersedia di semua browser terkini. Di browser lama yang belum mendukungnya, gradasi kilatnya dilepas dan teksnya bisa tampil transparan. Kalau Anda menyasar browser lama, pasang `shimmer` secara bersyarat lewat varian `supports-*`:

```vue
<p class="supports-[color:oklch(from_white_l_c_h)]:shimmer">
  Generating response&hellip;
</p>
```


## Saat Pengguna Membatasi Animasi

Kalau pengguna memilih membatasi animasi, efeknya otomatis dimatikan dan teksnya tampil seperti biasa. Tidak ada yang perlu Anda atur.


## RTL

Sapuannya mengikuti arah baca — kiri ke kanan pada LTR, kanan ke kiri pada RTL — tanpa class tambahan. Pakai `shimmer-reverse` kalau ingin membalik arahnya secara manual.

<ComponentPreview name="ShimmerRTLDemo" />

---
title: Marker
description: Menampilkan status sebaris, catatan sistem, baris berbingkai, atau pemisah berlabel di dalam percakapan.
component: true 
---

::component-preview
---
name: MarkerDemo
class: style-luma
previewClass: h-auto theme-blue
---
::

## Instalasi

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add marker
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/bases/reka/ui/marker) ke project Anda.
    ::

    ::step
    Sesuaikan path import dengan struktur project Anda.
    ::
  :::
::::

:::::

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Marker, MarkerContent, MarkerIcon, } from '@/components/ui/marker'
</script>

<template>
  <Marker>
    <MarkerIcon>
      <CheckIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </Marker>
</template>
```


## Komposisi

Susunan berikut adalah cara membangun sebuah marker:

```text
Marker
├── MarkerIcon
└── MarkerContent
```

## Fitur

- Tersedia varian marker sebaris, baris bergaris tepi, dan pemisah berlabel.
- Slot ikon dekoratif yang disembunyikan dari teknologi bantu.
- Elemen akar polimorfik lewat `render`, untuk marker berupa tautan dan tombol.
- Bisa dipadukan dengan utility [`shimmer`](/docs/utilities/shimmer) untuk teks status yang mengalir.
- Style tiap bagian bisa disesuaikan lewat prop `class`.

## Contoh

### Varian

Pakai `variant` untuk berpindah antara marker sebaris, baris bergaris tepi, dan pemisah berlabel.

::component-preview
---
name: MarkerVariantsDemo
class: style-luma
previewClass: h-auto theme-blue
---
::

| Variant     | Description                                          |
| ----------- | ---------------------------------------------------- |
| `default`   | An inline marker for status, notes, and actions.     |
| `border`    | A default marker with a bottom border under the row. |
| `separator` | A centered label with divider lines on each side.    |

### Status

Isi `role="status"` dan sertakan [`Spinner`](/docs/components/spinner) pada marker yang sedang berjalan, supaya pembaruannya ikut dibacakan.

::component-preview
---
name: MarkerStatusDemo
class: style-luma
previewClass: h-auto theme-blue
---
::


### Shimmer

Tambahkan utility class [`shimmer`](/docs/utilities/shimmer) pada `MarkerContent` untuk efek teks mengalir. Cara pemasangannya ada di dokumentasi shimmer.



::component-preview
---
name: MarkerShimmerDemo
class: style-luma
previewClass: h-auto theme-blue
---
::

### Separator

Pakai varian `separator` untuk pembatas berlabel di dalam percakapan, misalnya tanggal atau jeda antar bagian.

::component-preview
---
name: MarkerSeparatorDemo
class: style-luma
previewClass: h-auto theme-blue
---
::

### Garis Tepi

Pakai varian `border` untuk baris status yang tetap mengikuti perataan marker bawaan sekaligus memisahkan baris berikutnya.

::component-preview
---
name: MarkerBorderDemo
class: style-luma
previewClass: h-auto theme-blue
---
::

### Dengan Ikon

Pakai `MarkerIcon` untuk menampilkan ikon di samping konten. Pakai `flex-col` kalau ikonnya ingin ditumpuk di atas konten.


::component-preview
---
name: MarkerIconDemo
class: style-luma
previewClass: h-auto theme-blue
---
::

### Tautan dan Tombol

Ubah marker menjadi tautan atau tombol lewat prop `render` pada `Marker`.


::component-preview
---
name: MarkerLinkButtonDemo
class: style-luma
previewClass: h-auto theme-blue
---
::

```tsx showLineNumbers
import { Marker, MarkerContent } from "@/components/ui/marker"

<template>
  <Marker as-child>
    <a href="#links-and-buttons">
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>View the pull request</MarkerContent>
    </a>
  </Marker>
</template>
```

## Aksesibilitas

`Marker` bersifat presentasional secara bawaan. Makna yang tepat bergantung pada cara Anda memakainya, jadi pilih role sesuai maksudnya, bukan mengandalkan satu nilai bawaan.

### Status dan Progres

Untuk marker yang sedang berjalan seperti "Sedang berpikir..." atau tool yang aktif, isi `role="status"` supaya teknologi bantu membacakan pembaruannya begitu muncul. `Marker` meneruskan `role` ke elemen di baliknya.

```tsx showLineNumbers
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent>Compacting conversation</MarkerContent>
</Marker>
```

### Pemisah Berlabel

Pemisah yang memuat teks — misalnya tanggal atau label bagian — tidak butuh role. Garis pembatasnya hanya pseudo-element CSS yang dekoratif, dan teksnya dibacakan sebagai konten biasa.

```tsx showLineNumbers
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>
```

::callout
  **Catatan:** jangan menambahkan `role="separator"` pada pembatas berlabel. Sebuah separator
  mengambil nama aksesibelnya dari `aria-label`, bukan dari teksnya, dan isinya
  dianggap presentasional — sehingga label yang terlihat justru tidak akan
  dibacakan. Simpan `role="separator"` untuk pembatas yang memang tanpa teks bermakna.
::

### Marker Bergaris Tepi

Marker bergaris tepi punya makna yang sama dengan marker biasa. Garis bawahnya dekoratif, jadi pilih `role="status"`, `render`, atau tanpa role sama sekali, sesuai tujuan markernya.

```tsx showLineNumbers
<Marker variant="border">
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Opened implementation notes</MarkerContent>
</Marker>
```

### Ikon Dekoratif

`MarkerIcon` bersifat dekoratif dan disembunyikan dari teknologi bantu lewat `aria-hidden`, jadi maknanya dipegang `MarkerContent` di sebelahnya. Untuk marker yang hanya berisi ikon, berilah `aria-label` atau teks yang terlihat supaya tidak terbaca kosong.

```tsx showLineNumbers
<Marker aria-label="Synced">
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
</Marker>
```

### Marker yang Interaktif

Kalau marker berfungsi sebagai tautan atau pemicu aksi, tampilkan sebagai `<button>` atau `<a>` sungguhan lewat prop `render`, supaya bisa di-focus dan punya role yang benar. Nama aksesibelnya diambil dari teks marker.

```tsx showLineNumbers
<Marker as-child>
  <a href="/files" >
    <MarkerIcon>
      <FileTextIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </a>
</Marker>
```

## Referensi API

### Marker

Elemen akar marker. Berkasnya juga mengekspor `markerVariants` supaya style marker bisa Anda pakai ulang di komponen sendiri.

| Prop        | Type                                   | Default     | Description                                      |
| ----------- | -------------------------------------- | ----------- | ------------------------------------------------ |
| `variant`   | `"default" \| "border" \| "separator"` | `"default"` | The marker layout.                               |
| `render`    | `ReactElement \| function`             | -           | Render as a different element, such as a link.   |
| `class` | `string`                               | -           | Additional classes to apply to the root element. |

### MarkerIcon

Slot ikon dekoratif. Disembunyikan dari teknologi bantu lewat `aria-hidden`.

| Prop        | Tipe     | Bawaan  | Description                                   |
| ----------- | -------- | ------- | --------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the icon slot. |

### MarkerContent

Isi teks marker.

| Prop        | Tipe     | Bawaan  | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the content slot. |

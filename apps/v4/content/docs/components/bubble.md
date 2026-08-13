---
title: Bubble
description: Menampilkan isi percakapan dalam gelembung pesan. Mendukung varian, perataan, pengelompokan, reaksi, dan konten yang bisa dilipat.
component: true
---

::component-preview
---
name: BubbleDemo
previewClass: h-auto theme-blue
---
::

Komponen `Bubble` menampilkan isi percakapan dalam bingkai. Cocok untuk teks chat, keluaran terstruktur singkat, balasan berkutip, saran, dan reaksi.

Untuk antarmuka chat yang lengkap, pakai komponen [`Message`](/docs/components/message). `Bubble` memang sengaja dibatasi pada badan gelembungnya saja. Avatar, nama, waktu, metadata, dan aksi tingkat pesan diletakkan di [`Message`](/docs/components/message).


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
npx shadcn-vue@latest add bubble
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/bubble) ke project Anda.
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
import { Bubble, BubbleContent, BubbleReactions } from '@/components/ui/bubble'
</script>

<template>
  <Bubble>
    <BubbleContent>
      I checked the registry output and removed the stale route.
    </BubbleContent>
    <BubbleReactions>
      <span>👍</span>
    </BubbleReactions>
  </Bubble>
</template>
```

## Komposisi

Susunan berikut adalah cara membangun sebuah bubble:

```text
Bubble
├── BubbleContent
└── BubbleReactions
```

Pakai `BubbleGroup` untuk mengelompokkan bubble berurutan dari pengirim yang sama:

```text
BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent
```

## Fitur

- Tujuh varian tampilan, dari bubble primary yang tegas sampai konten ghost tanpa bingkai.
- Perataan awal dan akhir untuk bubble pengirim dan penerima.
- Reaksi yang menempel di tepi bubble, dengan sisi dan perataan yang bisa diatur.
- Ukuran bubble menyesuaikan isinya, maksimal 80% dari lebar container.
- Konten polimorfik lewat `as` atau `as-child` untuk bubble berupa tautan dan tombol.
- Style tiap bagian bisa disesuaikan lewat prop `class`.

## Contoh

### Varian

Pakai `variant` untuk mengubah tampilan bubble.

::component-preview
---
name: BubbleVariantsDemo
previewClass: h-auto theme-blue
---
::

| Variant       | Description                                            |
| ------------- | ------------------------------------------------------ |
| `default`     | A strong primary bubble, usually for the current user. |
| `secondary`   | The standard neutral bubble for conversation content.  |
| `muted`       | A lower-emphasis bubble for quiet supporting content.  |
| `tinted`      | A subtle primary-tinted bubble.                        |
| `outline`     | A bordered bubble for secondary or rich content.       |
| `ghost`       | Unframed content for assistant text or rich content.   |
| `destructive` | A destructive bubble for error or failed actions.      |

Ukuran bubble menyesuaikan isinya, maksimal 80% dari lebar container. Varian `ghost` melepas batas lebar itu, sehingga teks asisten dan konten kaya bisa memenuhi satu baris penuh.

### Perataan

Pakai `align` pada `Bubble` untuk menaruhnya di sisi awal atau akhir percakapan.

::component-preview
---
name: BubbleAlignmentDemo
previewClass: h-auto theme-blue
---
::

| align   | Description                                        |
| ------- | -------------------------------------------------- |
| `start` | Align the bubble to the start of the conversation. |
| `end`   | Align the bubble to the end of the conversation.   |

**Catatan:** saat membangun antarmuka chat, `align` biasanya lebih tepat diatur di komponen `Message`. Bubble di dalam `MessageContent` otomatis mengikuti perataan pesannya.

### Bubble Group

Pakai `BubbleGroup` untuk mengelompokkan bubble berurutan dari pengirim yang sama. Perlu dicatat, prop `align` diatur pada komponen `Bubble`, bukan pada `BubbleGroup`.

```text
BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent
```

::component-preview
---
name: BubbleGroupDemo
previewClass: h-auto theme-blue
---
::

### Tautan dan Tombol

Pakai `as-child` untuk menggabungkan style dan atribut `BubbleContent` ke tautan atau tombol yang Anda taruh di slot bawaannya.

::component-preview
---
name: BubbleLinksAndButtonsDemo
previewClass: h-auto theme-blue
---
::

```vue showLineNumbers
<script setup lang="ts">
import { Bubble, BubbleContent } from '@/components/ui/bubble'
</script>

<template>
  <Bubble variant="muted">
    <BubbleContent as-child>
      <button type="button">Click here</button>
    </BubbleContent>
  </Bubble>
</template>
```

### Reactions

Pakai `BubbleReactions` untuk menampilkan reaksi pada bubble, atau tombol aksi cepat. Posisinya diatur lewat `side` dan `align` — `side="top"` menempelkannya di tepi atas. Karena reaksi menumpuk di tepi bubble, sisakan jarak vertikal antar baris; contoh di bawah memakai `gap` yang lebih besar untuk alasan itu.

::component-preview
---
name: BubbleReactionsDemo
previewClass: h-auto theme-blue
---
::

### Tampilkan Selengkapnya

Isi bubble yang panjang bisa dipadukan dengan [`Collapsible`](/docs/components/collapsible) agar bisa dibuka dan ditutup. Pakai komponen `CollapsibleTrigger` sebagai pemicunya.

::component-preview
---
name: BubbleCollapsibleDemo
previewClass: h-auto theme-blue
---
::

### Tooltip

Bungkus bubble dengan [`Tooltip`](/docs/components/tooltip) untuk memunculkan metadata saat di-hover, misalnya kapan pesan itu dibaca.

::component-preview
---
name: BubbleTooltipDemo
previewClass: h-auto theme-blue
---
::

### Popover

Padukan bubble dengan [`Popover`](/docs/components/popover) untuk memunculkan keterangan tambahan saat diminta, misalnya pesan error lengkap dari aksi yang gagal.

::component-preview
---
name: BubblePopoverDemo
previewClass: h-auto theme-blue
---
::

## Aksesibilitas

`Bubble` hanya menampilkan badan pesannya. Makna di tingkat percakapan sebaiknya tetap dipegang container di sekelilingnya. Ikuti panduan di bawah ini.

### Memberi Label pada Reaksi

Reaksi ditampilkan sebagai deretan emoji. Pembaca layar membacakan tiap emoji tanpa konteks, dan penghitung seperti `+8` dibaca sebagai "plus delapan". Jadikan deretan itu satu gambar utuh dengan `aria-label` yang jelas supaya dibacakan sekali saja. `role="img"` sekaligus menyembunyikan emoji satu per satu dari teknologi bantu, jadi `aria-hidden` tidak diperlukan.

```vue showLineNumbers
<BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, and 8 more">
  <span>👍</span>
  <span>🔥</span>
  <span>+8</span>
</BubbleReactions>
```

Kalau reaksinya bisa diklik, tampilkan sebagai tombol, dan beri `aria-label` pada tombol yang hanya berupa ikon.

```vue showLineNumbers
<BubbleReactions>
  <Button aria-label="Thumbs up" variant="secondary" size="icon-xs">
    <ThumbsUpIcon />
  </Button>
</BubbleReactions>
```

### Bubble yang Interaktif

Kalau bubble bisa diklik, teruskan elemen `<button>` atau `<a>` sungguhan lewat `BubbleContent` dengan `as-child`, supaya bisa di-focus dan punya role yang benar. `BubbleContent` sudah menyediakan cincin focus yang terlihat untuk elemen interaktif, dan nama aksesibelnya diambil dari teks bubble — tidak perlu label tambahan.

```vue showLineNumbers
<Bubble variant="muted" align="end">
  <BubbleContent as-child>
    <button type="button" @click="onReply">
      I forgot my password
    </button>
  </BubbleContent>
</Bubble>
```

### Makna yang Tidak Bergantung Warna

Varian bubble menandakan peran dan nada lewat warna. Padukan dengan teks, perataan, atau ikon supaya maknanya tidak bergantung pada warna semata. Untuk bubble `destructive`, jelaskan konteks error-nya di dalam teks pesan, bukan mengandalkan warnanya.

## Referensi API

Semua bagian Bubble menghasilkan `<div>` secara bawaan. Pakai `as` untuk memilih elemen lain, atau `as-child` untuk menggabungkan atribut dan style komponen ke satu elemen atau komponen di dalam slot bawaannya.

### Bubble

Pembungkus terluar bubble.

| Prop       | Type                                                                                       | Default     | Description                                                     |
| ---------- | ------------------------------------------------------------------------------------------ | ----------- | --------------------------------------------------------------- |
| `variant`  | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` | The bubble visual treatment.                                    |
| `align`    | `"start" \| "end"`                                                                         | `"start"`   | The inline alignment of the bubble.                             |
| `as`       | `string \| Component`                                                                       | `"div"`     | The element or component to render.                             |
| `as-child` | `boolean`                                                                                    | `false`     | Render the default slot as the root and merge props onto it.    |
| `class`    | `string`                                                                                     | -           | Additional classes to apply to the root element.                |

### BubbleContent

Pembungkus isi bubble.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the content element.          |

### BubbleReactions

Menampilkan reaksi yang menumpuk di tepi bubble.

| Prop       | Type                 | Default    | Description                                                  |
| ---------- | -------------------- | ---------- | ------------------------------------------------------------ |
| `side`     | `"top" \| "bottom"` | `"bottom"` | The side of the bubble to anchor the reactions.              |
| `align`    | `"start" \| "end"`  | `"end"`    | The inline alignment of the reactions.                       |
| `as`       | `string \| Component` | `"div"`    | The element or component to render.                          |
| `as-child` | `boolean`            | `false`    | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -          | Additional classes to apply to the reaction row.             |

### BubbleGroup

Mengelompokkan bubble berurutan dari pengirim yang sama.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the group root.               |

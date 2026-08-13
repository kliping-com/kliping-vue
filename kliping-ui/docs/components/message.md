---
title: Message
description: Menampilkan satu pesan dalam percakapan, lengkap dengan avatar, header, footer, dan perataan yang bisa diatur.
component: true
---

<ComponentPreview name="MessageDemo" previewClass="h-auto theme-blue" />


Komponen `Message` menata satu pesan di dalam percakapan. Ia mengurus avatar, perataan, header, dan footer yang mengelilingi badan pesan.

Untuk aplikasi AI, komponen `Message` bisa Anda pakai menampilkan langkah penalaran, pemanggilan tool, dan balasan asisten.

## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add message
```

**Manual**

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/message) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
</script>

<template>
  <Message>
    <MessageAvatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble>
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
</template>
```


**Catatan:** `Message` yang mengurus tata letak barisnya — avatar, perataan, header, dan footer.
Badan pesan yang terlihat ditampilkan di dalamnya memakai
[`Bubble`](/components/bubble).

## Komposisi

Susunan berikut adalah cara membangun sebuah message:

```text
Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    └── MessageFooter
```

Pakai `MessageGroup` untuk menumpuk pesan berurutan dari pengirim yang sama:

```text
MessageGroup
├── Message
└── Message
```

## Fitur

- Perataan awal dan akhir untuk baris pengirim dan penerima, lewat prop `align`.
- Slot avatar yang menempel di bagian bawah pesan tanpa bertabrakan dengan footer.
- Slot header dan footer untuk nama pengirim, status, dan aksi pesan.
- Footer mengikuti sisi pesan; aksinya tetap sejajar pada baris `align="end"`.
- Pembungkus grup untuk menumpuk pesan berurutan dari pengirim yang sama.
- Pembungkus polimorfik lewat `as` atau `as-child`.
- Style tiap bagian bisa disesuaikan lewat prop `class`.

## Contoh

### Avatar

Pakai `MessageAvatar` untuk menampilkan avatar di samping pesan. Isi `align="end"` pada pesan agar avatarnya berada di sisi akhir.

<ComponentPreview name="MessageAvatarDemo" previewClass="h-auto theme-blue" />


| align   | Description                                         |
| ------- | --------------------------------------------------- |
| `start` | Align the message to the start of the conversation. |
| `end`   | Align the message to the end of the conversation.   |

### Grup

Pakai `MessageGroup` untuk menumpuk pesan berurutan dari pengirim yang sama. Tampilkan `MessageAvatar` kosong pada pesan-pesan sebelumnya supaya sejajar dengan avatar di pesan terakhir.

<ComponentPreview name="MessageGroupDemo" previewClass="h-auto theme-blue" />


### Header dan Footer

Pakai `MessageHeader` untuk nama pengirim, dan `MessageFooter` untuk metadata seperti status terkirim atau sudah dibaca.

<ComponentPreview name="MessageHeaderAndFooterDemo" previewClass="h-auto theme-blue" />


### Aksi

Letakkan aksi tingkat pesan di dalam `MessageFooter`, misalnya tombol salin, coba lagi, atau umpan balik.

<ComponentPreview name="MessageActionsDemo" previewClass="h-auto theme-blue" />


## Aksesibilitas

`Message` hanyalah pembungkus tata letak. Aksesibilitasnya datang dari konten yang Anda letakkan di dalamnya.

### Beri label pada aksi yang hanya berupa ikon

Tombol aksi di `MessageFooter` biasanya hanya berupa ikon, jadi berilah masing-masing sebuah `aria-label`.

```vue showLineNumbers
<MessageFooter>
  <Button variant="ghost" size="icon" aria-label="Copy">
    <CopyIcon />
  </Button>
</MessageFooter>
```

### Pembaruan Status

Untuk pesan yang masih berjalan, pakai [`Marker`](/components/marker) dengan `role="status"` supaya teknologi bantu membacakan pembaruannya begitu muncul.

```vue showLineNumbers
<Message>
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent>Checking the logs...</MarkerContent>
  </Marker>
</Message>
```

## Referensi API

Semua bagian Message menghasilkan `<div>` secara bawaan. Pakai `as` untuk memilih elemen lain, atau `as-child` untuk menggabungkan atribut dan style komponen ke satu elemen atau komponen di dalam slot bawaannya.

### Message

Pembungkus baris pesan.

| Prop       | Type                 | Default   | Description                                                  |
| ---------- | -------------------- | --------- | ------------------------------------------------------------ |
| `align`    | `"start" \| "end"` | `"start"` | The alignment of the message in the conversation.            |
| `as`       | `string \| Component` | `"div"`   | The element or component to render.                          |
| `as-child` | `boolean`            | `false`   | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -         | Additional classes to apply to the row.                      |

### MessageGroup

Mengelompokkan pesan berurutan dari pengirim yang sama.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the group root.               |

### MessageAvatar

Slot avatar yang menempel di bagian bawah pesan. Kalau pesannya punya `MessageFooter`, avatarnya bergeser naik agar tetap sejajar dengan badan pesan, bukan dengan footer.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the avatar wrapper.           |

### MessageContent

Membungkus header, badan pesan, dan footer.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the content wrapper.          |

### MessageHeader

Menampilkan konten di atas pesan, misalnya nama pengirim. Mengikuti sisi pesannya.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the header.                   |

### MessageFooter

Menampilkan konten di bawah pesan, misalnya status atau aksi. Mengikuti sisi pesannya.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the footer.                   |

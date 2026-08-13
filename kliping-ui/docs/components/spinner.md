---
title: Spinner
description: Indikator untuk menunjukkan bahwa sesuatu sedang dimuat.
component: true
---

<ComponentPreview name="SpinnerDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add spinner
```

**Manual**

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

    ```bash
    npm install reka-ui
    ```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/spinner) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Spinner } from '@/components/ui/Spinner'
</script>

<template>
  <Spinner />
</template>
```

## Kustomisasi

Anda bisa mengganti ikon spinner bawaan dengan ikon lain, cukup dengan menyunting komponen `Spinner`.

<ComponentPreview name="SpinnerCustomDemo" />


## Contoh

### Ukuran

Pakai utility class `size-*` untuk mengubah ukuran spinner.

<ComponentPreview name="SpinnerSizeDemo" />


### Warna

Pakai utility class `text-*` untuk mengubah warna spinner.

<ComponentPreview name="SpinnerColorDemo" />


### Button

Sisipkan spinner ke dalam tombol untuk menandakan proses sedang berjalan. Jarak antara spinner dan teks sudah diurus otomatis oleh `<Button />`.

<ComponentPreview name="SpinnerButtonDemo" />


### Badge

Spinner juga bisa diletakkan di dalam badge.

<ComponentPreview name="SpinnerBadgeDemo" />


### Input Group

Input Group bisa memuat spinner di dalam `<InputGroupAddon>`.

<ComponentPreview name="SpinnerInputGroupDemo" />


### Empty

Spinner juga bisa diletakkan di dalam tampilan empty state.

<ComponentPreview name="SpinnerEmptyDemo" />


### Item

Letakkan spinner di dalam `<ItemMedia>` untuk menandakan proses sedang berjalan.

<ComponentPreview name="SpinnerItemDemo" />


## Referensi API

### Spinner

Pakai komponen `Spinner` untuk menampilkan indikator pemuatan.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <Spinner />
</template>
```

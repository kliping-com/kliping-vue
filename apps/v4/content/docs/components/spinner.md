---
title: Spinner
description: Indikator untuk menunjukkan bahwa sesuatu sedang dimuat.
component: true
---

::component-preview
---
name: SpinnerDemo
class: '[&_.preview]:p-6'
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
npx shadcn-vue@latest add spinner
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Pasang dependensi berikut:
    ::

    ```bash
    npm install reka-ui
    ```

    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/spinner) ke project Anda.
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
import { Spinner } from '@/components/ui/Spinner'
</script>

<template>
  <Spinner />
</template>
```

## Kustomisasi

Anda bisa mengganti ikon spinner bawaan dengan ikon lain, cukup dengan menyunting komponen `Spinner`.

::component-preview
---
name: SpinnerCustomDemo
---
::

## Contoh

### Ukuran

Pakai utility class `size-*` untuk mengubah ukuran spinner.

::component-preview
---
name: SpinnerSizeDemo
---
::

### Warna

Pakai utility class `text-*` untuk mengubah warna spinner.

::component-preview
---
name: SpinnerColorDemo
---
::

### Button

Sisipkan spinner ke dalam tombol untuk menandakan proses sedang berjalan. Jarak antara spinner dan teks sudah diurus otomatis oleh `<Button />`.

::component-preview
---
name: SpinnerButtonDemo
---
::

### Badge

Spinner juga bisa diletakkan di dalam badge.

::component-preview
---
name: SpinnerBadgeDemo
---
::

### Input Group

Input Group bisa memuat spinner di dalam `<InputGroupAddon>`.

::component-preview
---
name: SpinnerInputGroupDemo
---
::

### Empty

Spinner juga bisa diletakkan di dalam tampilan empty state.

::component-preview
---
name: SpinnerEmptyDemo
---
::

### Item

Letakkan spinner di dalam `<ItemMedia>` untuk menandakan proses sedang berjalan.

::component-preview
---
name: SpinnerItemDemo
---
::

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

---
title: Kbd
description: Menampilkan tombol keyboard yang ditekan pengguna.
component: true
---

::component-preview
---
name: KbdDemo
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
npx shadcn-vue@latest add kbd
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/kbd) ke project Anda.
    ::

    ::step
    Sesuaikan path import dengan struktur project Anda.
    ::
  :::
::::

:::::

## Penggunaan

```vue
<script setup lang="ts">
import { Kbd } from '@/components/ui/kbd'
</script>

<template>
  <Kbd>Ctrl</Kbd>
</template>
```

## Contoh

### Grup

Pakai komponen `KbdGroup` untuk mengelompokkan beberapa tombol keyboard.

::component-preview
---
name: KbdGroupDemo
---
::

### Button

Letakkan komponen `Kbd` di dalam `Button` untuk menampilkan tombol keyboard di dalam tombol.

::component-preview
---
name: KbdWithButton
---
::

### Tooltip

Letakkan komponen `Kbd` di dalam `Tooltip` untuk menampilkan tooltip yang memuat tombol keyboard.

::component-preview
---
name: KbdWithTooltip
---
::

### Input Group

Letakkan komponen `Kbd` di dalam `InputGroupAddon` untuk menampilkan tombol keyboard di dalam input group.

::component-preview
---
name: KbdWithInputGroup
---
::

## Referensi API

### Kbd

Pakai komponen `Kbd` untuk menampilkan satu tombol keyboard.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` | ``      |

```vue
<Kbd>
Ctrl
</Kbd>
```

### KbdGroup

Pakai komponen `KbdGroup` untuk mengelompokkan beberapa komponen `Kbd`.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` | ``      |

```vue
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```

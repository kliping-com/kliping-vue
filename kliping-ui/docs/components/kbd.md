---
title: Kbd
description: Menampilkan tombol keyboard yang ditekan pengguna.
component: true
---

<ComponentPreview name="KbdDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add kbd
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/kbd) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

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

<ComponentPreview name="KbdGroupDemo" />


### Button

Letakkan komponen `Kbd` di dalam `Button` untuk menampilkan tombol keyboard di dalam tombol.

<ComponentPreview name="KbdWithButton" />


### Tooltip

Letakkan komponen `Kbd` di dalam `Tooltip` untuk menampilkan tooltip yang memuat tombol keyboard.

<ComponentPreview name="KbdWithTooltip" />


### Input Group

Letakkan komponen `Kbd` di dalam `InputGroupAddon` untuk menampilkan tombol keyboard di dalam input group.

<ComponentPreview name="KbdWithInputGroup" />


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

---
title: Input
description: Menampilkan isian form, atau komponen lain yang tampil seperti isian form.
component: true
---

::component-preview
---
name: InputDemo
class: '[&_input]:max-w-xs'
description: Komponen input di dalam form.
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
npx shadcn-vue@latest add input
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input) ke project Anda.
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
import { Input } from '@/components/ui/input'
</script>

<template>
  <Input />
</template>
```

## Contoh

### Bawaan

::component-preview
---
name: InputDemo
class: '[&_input]:max-w-xs'
description: Komponen input bawaan.
---
::

### Berkas

::component-preview
---
name: InputFile
description: Input dengan isian unggah berkas.
---
::

### Nonaktif

::component-preview
---
name: InputDisabled
class: '[&_input]:max-w-xs'
description: Komponen input yang dinonaktifkan.
---
::

### Dengan Label

::component-preview
---
name: InputWithLabel
description: Input yang disertai label.
---
::

### Dengan Tombol

::component-preview
---
name: InputWithButton
description: Input yang disandingkan dengan tombol.
---
::

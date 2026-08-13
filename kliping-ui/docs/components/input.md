---
title: Input
description: Menampilkan isian form, atau komponen lain yang tampil seperti isian form.
component: true
---

<ComponentPreview name="InputDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add input
```

**Manual**

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

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

<ComponentPreview name="InputDemo" />


### Berkas

<ComponentPreview name="InputFile" />


### Nonaktif

<ComponentPreview name="InputDisabled" />


### Dengan Label

<ComponentPreview name="InputWithLabel" />


### Dengan Tombol

<ComponentPreview name="InputWithButton" />

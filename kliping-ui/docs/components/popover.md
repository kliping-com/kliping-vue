---
title: Popover
description: Menampilkan konten kaya di dalam portal, dipicu lewat sebuah tombol.
component: true
links:
  doc: https://reka-ui.com/docs/components/popover
  api: https://reka-ui.com/docs/components/popover#api-reference
---

<ComponentPreview name="PopoverDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add popover
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/popover) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
</script>

<template>
  <Popover>
    <PopoverTrigger>Open</PopoverTrigger>
    <PopoverContent>Place content for the popover here.</PopoverContent>
  </Popover>
</template>
```

---
title: Aspect Ratio
description: Menampilkan konten dengan rasio lebar-tinggi yang Anda tentukan.
component: true
links:
  doc: https://reka-ui.com/docs/components/aspect-ratio
  api: https://reka-ui.com/docs/components/aspect-ratio#api-reference
---

<ComponentPreview name="AspectRatioDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add aspect-ratio
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/aspect-ratio) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <AspectRatio :ratio="16 / 9">
    <img src="..." alt="Image" class="rounded-md object-cover">
  </AspectRatio>
</template>
```

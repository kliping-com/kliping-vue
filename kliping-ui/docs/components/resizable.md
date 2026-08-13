---
title: Resizable
description: Kelompok panel yang bisa diubah ukurannya, mudah diakses, dan mendukung navigasi keyboard.
component: true
links:
  doc: https://reka-ui.com/docs/components/splitter
  api: https://reka-ui.com/docs/components/splitter#api-reference
---

<ComponentPreview name="ResizableDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add resizable
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/resizable) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

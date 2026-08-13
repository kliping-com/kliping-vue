---
title: Tooltip
description: Kotak kecil berisi keterangan sebuah elemen, muncul saat elemen itu di-hover atau menerima fokus keyboard.
component: true
links:
  doc: https://reka-ui.com/docs/components/tooltip
  api: https://reka-ui.com/docs/components/tooltip#api-reference
---

<ComponentPreview name="TooltipDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add tooltip
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/tooltip) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

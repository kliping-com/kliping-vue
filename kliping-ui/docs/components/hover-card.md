---
title: Hover Card
description: Menampilkan pratinjau konten di balik sebuah tautan bagi pengguna yang melihat layar.
component: true
links:
  doc: https://reka-ui.com/docs/components/hover-card
  api: https://reka-ui.com/docs/components/hover-card#api-reference
---

<ComponentPreview name="HoverCardDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add hover-card
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/hover-card) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The Vue Framework – created and maintained by Evan You.
    </HoverCardContent>
  </HoverCard>
</template>
```

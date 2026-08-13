---
title: Scroll Area
description: Menyempurnakan gulir bawaan browser agar tampilannya bisa di-style dan konsisten lintas browser.
component: true
links:
  doc: https://reka-ui.com/docs/components/scroll-area
  api: https://reka-ui.com/docs/components/scroll-area#api-reference
---

<ComponentPreview name="ScrollAreaDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add scroll-area
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/scroll-area) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    Jokester began sneaking into the castle in the middle of the night and leaving
    jokes all over the place: under the king's pillow, in his soup, even in the
    royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
    then one day, the king tripped over one of Jokester's whoopee cushions and
    fell into the moat. He was so embarrassed that he decided to make Jokester the
    official court jester.
  </ScrollArea>
</template>
```

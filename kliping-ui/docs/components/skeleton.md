---
title: Skeleton
description: Menampilkan kerangka sementara selagi konten sesungguhnya masih dimuat.
component: true
---

<ComponentPreview name="SkeletonDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add skeleton
```

**Manual**

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/skeleton) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <Skeleton class="w-[100px] h-[20px] rounded-full" />
</template>
```

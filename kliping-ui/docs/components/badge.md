---
title: Badge
description: Menampilkan badge, atau komponen lain yang tampil seperti badge.
component: true
---

<ComponentPreview name="BadgeDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add badge
```

**Manual**

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/badge) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge variant="default | outline | secondary | destructive">
    Badge
  </Badge>
</template>
```

### Link

Pakai prop `as-child` untuk membuat komponen lain tampil seperti badge. Berikut contoh tautan yang tampil seperti badge.

```vue showLineNumbers
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge as-child>
    <a href="#">Badge</a>
  </Badge>
</template>
```

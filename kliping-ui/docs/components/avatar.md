---
title: Avatar
description: Elemen gambar dengan cadangan tampilan untuk mewakili pengguna.
component: true
links:
  doc: https://reka-ui.com/docs/components/avatar
  api: https://reka-ui.com/docs/components/avatar#api-reference
---

<ComponentPreview name="AvatarDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add avatar
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/avatar) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
```

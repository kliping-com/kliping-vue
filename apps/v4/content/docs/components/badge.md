---
title: Badge
description: Menampilkan badge, atau komponen lain yang tampil seperti badge.
component: true
---

::component-preview
---
name: BadgeDemo
description: Badge bawaan.
---
::

## Instalasi

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add badge
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/badge) ke project Anda.
    ::

    ::step
    Sesuaikan path import dengan struktur project Anda.
    ::
  :::
::::

:::::

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

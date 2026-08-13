---
title: Popover
description: Menampilkan konten kaya di dalam portal, dipicu lewat sebuah tombol.
component: true
links:
  doc: https://reka-ui.com/docs/components/popover
  api: https://reka-ui.com/docs/components/popover#api-reference
---

::component-preview
---
name: PopoverDemo
description: Komponen popover.
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
npx shadcn-vue@latest add popover
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Pasang dependensi berikut:
    ::

    ```bash
    npm install reka-ui
    ```

    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/popover) ke project Anda.
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

---
title: Aspect Ratio
description: Menampilkan konten dengan rasio lebar-tinggi yang Anda tentukan.
component: true
links:
  doc: https://reka-ui.com/docs/components/aspect-ratio
  api: https://reka-ui.com/docs/components/aspect-ratio#api-reference
---

::component-preview
---
name: AspectRatioDemo
description: Komponen yang menampilkan gambar dengan rasio 16:9.
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
npx shadcn-vue@latest add aspect-ratio
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/aspect-ratio) ke project Anda.
    ::

    ::step
    Sesuaikan path import dengan struktur project Anda.
    ::
  :::
::::

:::::

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

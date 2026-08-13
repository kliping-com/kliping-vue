---
title: Slider
description: Isian tempat pengguna memilih nilai dari rentang tertentu.
component: true
links:
  doc: https://reka-ui.com/docs/components/slider
  api: https://reka-ui.com/docs/components/slider#api-reference
---

::component-preview
---
name: SliderDemo
description: Komponen slider.
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
npx shadcn-vue@latest add slider
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/slider) ke project Anda.
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
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider :default-value="[33]" :max="100" :step="1" />
</template>
```

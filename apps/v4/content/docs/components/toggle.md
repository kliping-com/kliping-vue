---
title: Toggle
description: Tombol dua keadaan yang bisa dinyalakan atau dimatikan.
component: true
links:
  doc: https://reka-ui.com/docs/components/toggle
  api: https://reka-ui.com/docs/components/toggle#api-reference
---

::component-preview
---
name: ToggleDemo
description: Komponen toggle.
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
npx shadcn-vue@latest add toggle
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/toggle) ke project Anda.
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
import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <Toggle>Toggle</Toggle>
</template>
```

## Contoh

### Bawaan

::component-preview
---
name: ToggleDemo
---
::

### Outline

::component-preview
---
name: ToggleOutlineDemo
---
::

### Dengan Teks

::component-preview
---
name: ToggleTextDemo
---
::

### Kecil

::component-preview
---
name: ToggleSmallDemo
---
::

### Besar

::component-preview
---
name: ToggleLargeDemo
---
::

### Nonaktif

::component-preview
---
name: ToggleDisabledDemo
---
::

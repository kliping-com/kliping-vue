---
title: Toggle Group
description: Sekumpulan tombol dua keadaan yang bisa dinyalakan atau dimatikan.
component: true
links:
  doc: https://reka-ui.com/docs/components/toggle-group
  api: https://reka-ui.com/docs/components/toggle-group#api-reference
---

::component-preview
---
name: ToggleGroupDemo
description: Komponen toggle group.
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
npx shadcn-vue@latest add toggle-group
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/toggle-group) ke project Anda.
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="multiple">
    <ToggleGroupItem value="a">
      A
    </ToggleGroupItem>
    <ToggleGroupItem value="b">
      B
    </ToggleGroupItem>
    <ToggleGroupItem value="c">
      C
    </ToggleGroupItem>
  </ToggleGroup>
</template>
```

## Contoh

### Bawaan

::component-preview
---
name: ToggleGroupDefaultDemo
---
::

### Outline

::component-preview
---
name: ToggleGroupDemo
---
::

### Single

::component-preview
---
name: ToggleGroupSingleDemo
---
::

### Kecil

::component-preview
---
name: ToggleGroupSmallDemo
---
::

### Besar

::component-preview
---
name: ToggleGroupLargeDemo
---
::

### Nonaktif

::component-preview
---
name: ToggleGroupDisabledDemo
---
::

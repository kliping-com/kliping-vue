---
title: Checkbox
description: Kontrol yang memungkinkan pengguna berpindah antara tercentang dan tidak.
component: true
links:
  doc: https://reka-ui.com/docs/components/checkbox
  api: https://reka-ui.com/docs/components/checkbox#api-reference
---

::component-preview
---
name: CheckboxDemo
description: Sebuah checkbox.
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
npx shadcn-vue@latest add checkbox
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/checkbox) ke project Anda.
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
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Checkbox />
</template>
```

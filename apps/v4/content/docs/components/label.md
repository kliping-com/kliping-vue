---
title: Label
description: Menampilkan label yang mudah diakses dan terhubung ke sebuah kontrol.
component: true
links:
  doc: https://reka-ui.com/docs/components/label
  api: https://reka-ui.com/docs/components/label#api-reference
---

::component-preview
---
name: LabelDemo
description: Sebuah label.
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
npx shadcn-vue@latest add label
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/label) ke project Anda.
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
import { Label } from '@/components/ui/label'
</script>

<template>
  <Label for="email">Your email address</Label>
</template>
```

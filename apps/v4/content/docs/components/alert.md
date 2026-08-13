---
title: Alert
description: Menampilkan pesan sorotan untuk menarik perhatian pengguna.
component: true
---

::component-preview
---
name: AlertDemo
title: An alert with an icon, title and description.
description: Alert dengan ikon, judul, dan keterangan.
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
npx shadcn-vue@latest add alert
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/alert) ke project Anda.
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components and dependencies to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
```

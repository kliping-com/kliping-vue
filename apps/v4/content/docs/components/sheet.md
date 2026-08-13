---
title: Sheet
description: Pengembangan dari komponen Dialog untuk menampilkan konten pelengkap di sisi layar.
component: true
links:
  doc: https://reka-ui.com/docs/components/dialog
  api: https://reka-ui.com/docs/components/dialog#api-reference
---

::component-preview
---
name: SheetDemo
description: Komponen sheet.
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
npx shadcn-vue@latest add sheet
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/sheet) ke project Anda.
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
</script>

<template>
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
```

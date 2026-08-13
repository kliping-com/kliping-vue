---
title: Select
description: Menampilkan daftar pilihan untuk dipilih pengguna, dibuka lewat sebuah tombol.
component: true
links:
  doc: https://reka-ui.com/docs/components/select
  api: https://reka-ui.com/docs/components/select#api-reference
---

::component-preview
---
name: SelectDemo
description: Komponen select.
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
npx shadcn-vue@latest add select
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/select) ke project Anda.
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">
        Apple
      </SelectItem>
      <SelectItem value="banana">
        Banana
      </SelectItem>
      <SelectItem value="blueberry">
        Blueberry
      </SelectItem>
      <SelectItem value="grapes">
        Grapes
      </SelectItem>
      <SelectItem value="pineapple">
        Pineapple
      </SelectItem>
    </SelectContent>
  </Select>
</template>
```

## Contoh

### Scrollable

::component-preview
---
name: SelectScrollable
description: Komponen select yang bisa digulir, berisi pilihan zona waktu.
---
::

### Pilihan Ganda

::component-preview
---
name: SelectMultipleDemo
description: Komponen select yang bisa memilih lebih dari satu.
---
::

---
title: Select
description: Menampilkan daftar pilihan untuk dipilih pengguna, dibuka lewat sebuah tombol.
component: true
links:
  doc: https://reka-ui.com/docs/components/select
  api: https://reka-ui.com/docs/components/select#api-reference
---

<ComponentPreview name="SelectDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add select
```

**Manual**

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

```bash
npm install reka-ui
```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/select) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

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

<ComponentPreview name="SelectScrollable" />


### Pilihan Ganda

<ComponentPreview name="SelectMultipleDemo" />

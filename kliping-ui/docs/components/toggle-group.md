---
title: Toggle Group
description: Sekumpulan tombol dua keadaan yang bisa dinyalakan atau dimatikan.
component: true
links:
  doc: https://reka-ui.com/docs/components/toggle-group
  api: https://reka-ui.com/docs/components/toggle-group#api-reference
---

<ComponentPreview name="ToggleGroupDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add toggle-group
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/toggle-group) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

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

<ComponentPreview name="ToggleGroupDefaultDemo" />


### Outline

<ComponentPreview name="ToggleGroupDemo" />


### Single

<ComponentPreview name="ToggleGroupSingleDemo" />


### Kecil

<ComponentPreview name="ToggleGroupSmallDemo" />


### Besar

<ComponentPreview name="ToggleGroupLargeDemo" />


### Nonaktif

<ComponentPreview name="ToggleGroupDisabledDemo" />

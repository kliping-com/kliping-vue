---
title: Toggle
description: Tombol dua keadaan yang bisa dinyalakan atau dimatikan.
component: true
links:
  doc: https://reka-ui.com/docs/components/toggle
  api: https://reka-ui.com/docs/components/toggle#api-reference
---

<ComponentPreview name="ToggleDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add toggle
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/toggle) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

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

<ComponentPreview name="ToggleDemo" />


### Outline

<ComponentPreview name="ToggleOutlineDemo" />


### Dengan Teks

<ComponentPreview name="ToggleTextDemo" />


### Kecil

<ComponentPreview name="ToggleSmallDemo" />


### Besar

<ComponentPreview name="ToggleLargeDemo" />


### Nonaktif

<ComponentPreview name="ToggleDisabledDemo" />

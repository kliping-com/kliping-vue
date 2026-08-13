---
title: Slider
description: Isian tempat pengguna memilih nilai dari rentang tertentu.
component: true
links:
  doc: https://reka-ui.com/docs/components/slider
  api: https://reka-ui.com/docs/components/slider#api-reference
---

<ComponentPreview name="SliderDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add slider
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/slider) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider :default-value="[33]" :max="100" :step="1" />
</template>
```

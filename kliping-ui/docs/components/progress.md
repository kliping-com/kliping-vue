---
title: Progress
description: Menampilkan indikator kemajuan sebuah proses, biasanya berbentuk bilah progres.
component: true
links:
  doc: https://reka-ui.com/docs/components/progress
  api: https://reka-ui.com/docs/components/progress#api-reference
---

<ComponentPreview name="ProgressDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add progress
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/progress) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
</script>

<template>
  <Progress :model-value="33" />
</template>
```

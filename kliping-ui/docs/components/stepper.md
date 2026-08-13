---
title: Stepper
description: Rangkaian langkah untuk menunjukkan kemajuan dalam proses bertahap.
component: true
links:
  doc: https://reka-ui.com/docs/components/stepper
  api: https://reka-ui.com/docs/components/stepper#api-reference
---

<ComponentPreview name="StepperDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add stepper
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/stepper) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue
<script setup lang="ts">
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
</script>

<template>
  <Stepper>
    <StepperItem :step="1">
      <StepperTrigger>
        <StepperIndicator>1</StepperIndicator>
        <StepperTitle>Step 1</StepperTitle>
        <StepperDescription>This is the first step</StepperDescription>
      </StepperTrigger>
      <StepperSeparator />
    </StepperItem>
    <StepperItem :step="2">
      <StepperTrigger>
        <StepperIndicator>2</StepperIndicator>
        <StepperTitle>Step 2</StepperTitle>
        <StepperDescription>This is the second step</StepperDescription>
      </StepperTrigger>
    </StepperItem>
  </Stepper>
</template>
```

## Contoh

### Mendatar

<ComponentPreview name="StepperHorizental" />


### Tegak

<ComponentPreview name="StepperVertical" />


### Form

<ComponentPreview name="StepperForm" />

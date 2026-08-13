---
title: Number Field
description: Isian angka yang memungkinkan pengguna mengetik nilai atau menaik-turunkannya lewat tombol stepper.
component: true
links:
  doc: https://reka-ui.com/docs/components/number-field
  api: https://reka-ui.com/docs/components/number-field#api-reference
---

<ComponentPreview name="NumberFieldDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add number-field
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/number-field) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

### Nonaktif
<ComponentPreview name="NumberFieldDisabledDemo" />


### Decimal
<ComponentPreview name="NumberFieldDecimalDemo" />


### Percentage
<ComponentPreview name="NumberFieldPercentageDemo" />


### Currency
<ComponentPreview name="NumberFieldCurrencyDemo" />


### Form
<ComponentPreview name="NumberFieldFormDemo" />


## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
</script>

<template>
  <NumberField :default-value="18" :min="0">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>

```

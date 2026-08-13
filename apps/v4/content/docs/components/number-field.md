---
title: Number Field
description: Isian angka yang memungkinkan pengguna mengetik nilai atau menaik-turunkannya lewat tombol stepper.
component: true
links:
  doc: https://reka-ui.com/docs/components/number-field
  api: https://reka-ui.com/docs/components/number-field#api-reference
---

::component-preview
---
name: NumberFieldDemo
description: Number Field bawaan.
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
npx shadcn-vue@latest add number-field
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/number-field) ke project Anda.
    ::

    ::step
    Sesuaikan path import dengan struktur project Anda.
    ::
  :::
::::

:::::

### Nonaktif
::component-preview
---
name: NumberFieldDisabledDemo
description: Disabled Number Field
---
::

### Decimal
::component-preview
---
name: NumberFieldDecimalDemo
description: Number Field with decimal support
---
::

### Percentage
::component-preview
---
name: NumberFieldPercentageDemo
description: Percentage Number Field
---
::

### Currency
::component-preview
---
name: NumberFieldCurrencyDemo
description: Currency Number Field
---
::

### Form
::component-preview
---
name: NumberFieldFormDemo
description: Number Field inside a form
---
::

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

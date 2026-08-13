---
title: Native Select
description: Elemen select bawaan HTML yang di-style agar menyatu dengan design system Anda.
component: true
---

::: tip 
---
icon: true
---
Kalau Anda butuh select yang di-style penuh, lihat komponen [Select](/components/select).
:::

<ComponentPreview name="NativeSelectDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add native-select
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/native-select) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from '@/components/ui/native-select'
</script>

<template>
  <NativeSelect>
    <NativeSelectOption value="">
      Select a fruit
    </NativeSelectOption>
    <NativeSelectOption value="apple">
      Apple
    </NativeSelectOption>
    <NativeSelectOption value="banana">
      Banana
    </NativeSelectOption>
    <NativeSelectOption value="blueberry">
      Blueberry
    </NativeSelectOption>
    <NativeSelectOption value="grapes" disabled>
      Grapes
    </NativeSelectOption>
    <NativeSelectOption value="pineapple">
      Pineapple
    </NativeSelectOption>
  </NativeSelect>
</template>
```

## Contoh

### Dengan Grup

Kelompokkan pilihan memakai `NativeSelectOptGroup` agar lebih tertata.

<ComponentPreview name="NativeSelectGroupsDemo" />


```vue showLineNumbers
<template>
  <NativeSelect>
    <NativeSelectOption value="">
      Select a food
    </NativeSelectOption>
    <NativeSelectOptGroup label="Fruits">
      <NativeSelectOption value="apple">
        Apple
      </NativeSelectOption>
      <NativeSelectOption value="banana">
        Banana
      </NativeSelectOption>
      <NativeSelectOption value="blueberry">
        Blueberry
      </NativeSelectOption>
    </NativeSelectOptGroup>
    <NativeSelectOptGroup label="Vegetables">
      <NativeSelectOption value="carrot">
        Carrot
      </NativeSelectOption>
      <NativeSelectOption value="broccoli">
        Broccoli
      </NativeSelectOption>
      <NativeSelectOption value="spinach">
        Spinach
      </NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
</template>
```

### Keadaan Nonaktif

Nonaktifkan satu pilihan tertentu, atau seluruh komponen select sekaligus.

<ComponentPreview name="NativeSelectDisabledDemo" />


### Keadaan Tidak Valid

Tampilkan kesalahan validasi lewat atribut `aria-invalid` beserta style error-nya.

<ComponentPreview name="NativeSelectInvalidDemo" />


```vue showLineNumbers
<template>
  <NativeSelect aria-invalid="true">
    <NativeSelectOption value="">
      Select a country
    </NativeSelectOption>
    <NativeSelectOption value="us">
      United States
    </NativeSelectOption>
    <NativeSelectOption value="uk">
      United Kingdom
    </NativeSelectOption>
    <NativeSelectOption value="ca">
      Canada
    </NativeSelectOption>
  </NativeSelect>
</template>
```

### Integrasi dengan Form

Bisa dipakai bersama library form seperti VeeValidate untuk komponen yang dikendalikan dari luar.

<ComponentPreview name="NativeSelectFormDemo" />


<!-- ### Input Group Integration

Padukan dengan `InputGroup` untuk susunan input yang lebih rumit.

<ComponentPreview name="NativeSelectInputGroupDemo" />

-->

## Native Select dibanding Select

- Pakai `NativeSelect` kalau Anda butuh perilaku asli browser, performa lebih ringan, atau dropdown yang nyaman di mobile.
- Pakai `Select` kalau Anda butuh style kustom, animasi, atau interaksi yang lebih rumit.

Komponen `NativeSelect` menyediakan fungsi select bawaan HTML dengan tampilan yang selaras dengan design system Anda.

## Aksesibilitas

- Komponen ini mempertahankan seluruh fitur aksesibilitas select bawaan HTML.
- Pembaca layar bisa menelusuri pilihan memakai tombol panah.
- Ikon panahnya ditandai `aria-hidden="true"` supaya tidak dibacakan dua kali.
- Pakai `aria-label` atau `aria-labelledby` kalau butuh konteks tambahan.

```vue showLineNumbers
<template>
  <NativeSelect aria-label="Choose your preferred language">
    <NativeSelectOption value="en">
      English
    </NativeSelectOption>
    <NativeSelectOption value="es">
      Spanish
    </NativeSelectOption>
    <NativeSelectOption value="fr">
      French
    </NativeSelectOption>
  </NativeSelect>
</template>
```

## Referensi API

### NativeSelect

Komponen select utama yang membungkus elemen select bawaan HTML.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

Semua prop lain diteruskan ke elemen `<select>` di baliknya.

```vue
<NativeSelect>
  <NativeSelectOption value="option1">Option 1</NativeSelectOption>
  <NativeSelectOption value="option2">Option 2</NativeSelectOption>
</NativeSelect>
```

### NativeSelectOption

Mewakili satu pilihan di dalam select.

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `value`     | `string`  |         |
| `disabled`  | `boolean` | `false` |
| `class` | `string`  |         |

Semua prop lain diteruskan ke elemen `<option>` di baliknya.

```vue
<template>
  <NativeSelectOption value="apple">
    Apple
  </NativeSelectOption>
  <NativeSelectOption value="banana" disabled>
    Banana
  </NativeSelectOption>
</template>
```

### NativeSelectOptGroup

Mengelompokkan pilihan-pilihan yang berkaitan agar lebih tertata.

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `label`     | `string`  |         |
| `disabled`  | `boolean` | `false` |
| `class` | `string`  |         |

Semua prop lain diteruskan ke elemen `<optgroup>` di baliknya.

```vue
<template>
  <NativeSelectOptGroup label="Fruits">
    <NativeSelectOption value="apple">
      Apple
    </NativeSelectOption>
    <NativeSelectOption value="banana">
      Banana
    </NativeSelectOption>
  </NativeSelectOptGroup>
</template>
```

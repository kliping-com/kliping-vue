---
title: Field
description: Menggabungkan label, kontrol, dan teks bantuan menjadi satu baris form yang mudah diakses.
component: true
---

<ComponentPreview name="FieldDemo" />


## Instalasi

```bash
npx shadcn-vue@latest add field
```

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
</script>

<template>
  <FieldSet>
    <FieldLegend>Profile</FieldLegend>
    <FieldDescription>This appears on invoices and emails.</FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel for="name">
          Full name
        </FieldLabel>
        <Input id="name" autocomplete="off" placeholder="Evil Rabbit" />
        <FieldDescription>This appears on invoices and emails.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="username">
          Username
        </FieldLabel>
        <Input id="username" autocomplete="off" aria-invalid />
        <FieldError>Choose another username.</FieldError>
      </Field>
      <Field orientation="horizontal">
        <Switch id="newsletter" />
        <FieldLabel for="newsletter">
          Subscribe to the newsletter
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
</template>
```

## Anatomi

Keluarga komponen `Field` dirancang untuk menyusun form yang mudah diakses. Susunan satu field pada umumnya seperti ini:

```vue showLineNumbers
<template>
  <Field>
    <FieldLabel for="input-id">
      Label
    </FieldLabel>
    <!-- Input, Select, Switch, etc. -->
    <FieldDescription>Optional helper text.</FieldDescription>
    <FieldError>Validation message.</FieldError>
  </Field>
</template>
```

- `Field` adalah pembungkus inti untuk satu field.
- `FieldContent` adalah kolom flex yang menyatukan label dan keterangan. Tidak perlu dipakai kalau field Anda tanpa keterangan.
- Bungkus field-field yang berkaitan dengan `FieldGroup`, dan pakai `FieldSet` bersama `FieldLegend` untuk pengelompokan yang bermakna.

## Contoh

### Input

<ComponentPreview name="FieldInputDemo" />


### Textarea

<ComponentPreview name="FieldTextareaDemo" />


### Select

<ComponentPreview name="FieldSelectDemo" />


### Slider

<ComponentPreview name="FieldSliderDemo" />


### Fieldset

<ComponentPreview name="FieldFieldsetDemo" />


### Checkbox

<ComponentPreview name="FieldCheckboxDemo" />


### Radio

<ComponentPreview name="FieldRadioDemo" />


### Switch

<ComponentPreview name="FieldSwitchDemo" />


### Kartu Pilihan

Bungkus komponen `Field` di dalam `FieldLabel` untuk membuat kelompok field yang bisa dipilih. Cara ini berlaku untuk komponen `RadioItem`, `Checkbox`, dan `Switch`.

<ComponentPreview name="FieldChoiceCardDemo" />


### Field Group

Tumpuk komponen `Field` memakai `FieldGroup`. Tambahkan `FieldSeparator` untuk memisahkannya.

<ComponentPreview name="FieldGroupDemo" />


## Tata Letak Responsif

Kalau Anda memakai Tailwind CSS v3, Anda perlu memasang [`@tailwindcss/container-queries`](https://github.com/tailwindlabs/tailwindcss-container-queries).

- **Field tegak:** orientasi bawaan menumpuk label, kontrol, dan teks bantuan — cocok untuk tata letak yang mengutamakan mobile.
- **Field mendatar:** isi `orientation="horizontal"` pada `Field` agar label dan kontrolnya bersebelahan. Padukan dengan `FieldContent` supaya keterangannya tetap sejajar.
- **Field responsif:** isi `orientation="responsive"` agar susunan kolomnya menyesuaikan otomatis di dalam induk yang sadar ukuran container. Pakai class `@container/field-group` pada `FieldGroup` untuk berganti orientasi di breakpoint tertentu.

<ComponentPreview name="FieldResponsiveDemo" />


## Validasi dan Pesan Error

- Tambahkan `data-invalid` pada `Field` untuk mengubah seluruh blok menjadi keadaan error.
- Tambahkan `aria-invalid` pada input-nya sendiri demi teknologi bantu.
- Tempatkan `FieldError` tepat setelah kontrolnya, atau di dalam `FieldContent`, supaya pesan error tetap sejajar dengan field-nya.

```vue showLineNumbers /data-invalid/ /aria-invalid/
<template>
  <Field data-invalid>
    <FieldLabel for="email">
      Email
    </FieldLabel>
    <Input id="email" type="email" aria-invalid />
    <FieldError>Enter a valid email address.</FieldError>
  </Field>
</template>
```

## Aksesibilitas

  - `FieldSet` dan `FieldLegend` menjaga kontrol yang berkaitan tetap satu kelompok bagi pengguna keyboard dan teknologi bantu.
  - `Field` menghasilkan `role="group"`, sehingga kontrol di dalamnya mewarisi pelabelan dari `FieldLabel` dan `FieldLegend`.
  - Pakai `FieldSeparator` seperlunya saja, supaya batas antar bagian tetap jelas terbaca pembaca layar.

## Referensi API

### FieldSet

Wadah yang menghasilkan `fieldset` bermakna, lengkap dengan pengaturan jarak bawaan.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <FieldSet>
    <FieldLegend>Delivery</FieldLegend>
    <FieldGroup>
      <!-- Fields -->
    </FieldGroup>
  </FieldSet>
</template>
```

### FieldLegend

Elemen legend untuk sebuah `FieldSet`. Ganti ke varian `label` agar ukurannya selaras dengan label.

| Prop        | Type                  | Default    |
| ----------- | --------------------- | ---------- |
| `variant`   | `"legend" \| "label"` | `"legend"` |
| `class` | `string`              |            |

```vue
<FieldLegend variant="label">
Notification Preferences
</FieldLegend>
```

`FieldLegend` punya dua varian: `legend` dan `label`. Varian `label` memakai ukuran dan perataan seperti label — berguna kalau `FieldSet` Anda bersarang.

### FieldGroup

Pembungkus tata letak yang menumpuk komponen `Field` dan mengaktifkan container query untuk orientasi responsif.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <FieldGroup class="@container/field-group flex flex-col gap-6">
    <Field><!-- Fields --></Field>
    <Field><!-- Fields --></Field>
  </FieldGroup>
</template>
```

### Field

Pembungkus inti untuk satu field. Mengatur orientasi, style keadaan tidak valid, dan jarak antar elemen.

| Prop           | Type                                         | Default      |
| -------------- | -------------------------------------------- | ------------ |
| `orientation`  | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` |
| `class`    | `string`                                     |              |
| `data-invalid` | `boolean`                                    |              |

```vue
<Field orientation="horizontal">
  <FieldLabel for="remember">Remember me</FieldLabel>
  <Switch id="remember" />
</Field>
```

### FieldContent

Kolom flex yang menyatukan kontrol dan keterangannya saat label berada di samping kontrol. Tidak perlu dipakai kalau field Anda tanpa keterangan.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<Field>
  <Checkbox id="notifications" />
  <FieldContent>
    <FieldLabel for="notifications">Notifications</FieldLabel>
    <FieldDescription>Email, SMS, and push options.</FieldDescription>
  </FieldContent>
</Field>
```

### FieldLabel

Label yang style-nya cocok baik untuk input langsung maupun `Field` yang bersarang di dalamnya.

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `class` | `string`  |         |
| `asChild`   | `boolean` | `false` |

```vue
<FieldLabel for="email">
Email
</FieldLabel>
```

### FieldTitle

Menampilkan judul bergaya label di dalam `FieldContent`.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<FieldContent>
  <FieldTitle>Enable Touch ID</FieldTitle>
  <FieldDescription>Unlock your device faster.</FieldDescription>
</FieldContent>
```

### FieldDescription

Slot teks bantuan yang otomatis menyeimbangkan baris panjang pada tata letak mendatar.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<FieldDescription>
We never share your email with anyone.
</FieldDescription>
```

### FieldSeparator

Pembatas visual antar bagian di dalam `FieldGroup`. Bisa diisi konten sebaris kalau perlu.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<FieldSeparator>
Or continue with
</FieldSeparator>
```

### FieldError

Wadah pesan error yang mudah diakses. Bisa diisi langsung, atau menerima array `errors` — misalnya dari `vee-validate`.

| Prop        | Type                                       | Default |
| ----------- | ------------------------------------------ | ------- |
| `errors`    | `Array<{ message?: string } \| undefined>` |         |
| `class` | `string`                                   |         |

```vue
<FieldError :errors="errors.username" />
```

Kalau array `errors` memuat lebih dari satu pesan, komponen ini otomatis menampilkannya sebagai daftar.

`FieldError` juga menerima issue dari validator mana pun yang menerapkan [Standard Schema](https://standardschema.dev/), termasuk Zod, Valibot, dan ArkType. Teruskan array `issues` dari hasil validasi skema untuk menampilkan daftar error yang seragam lintas library.

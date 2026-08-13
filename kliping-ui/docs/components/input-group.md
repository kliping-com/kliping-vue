---
title: Input Group
description: Menyisipkan informasi atau aksi tambahan ke dalam input maupun textarea.
component: true
---

<ComponentPreview name="InputGroupDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add input-group
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input-group) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
</script>

<template>
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <InputGroupButton>Search</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
```

## Contoh

### Icon

<ComponentPreview name="InputGroupWithIcon" />


### Text

Menampilkan keterangan teks tambahan di samping input.

<ComponentPreview name="InputGroupWithText" />


### Button

Menambahkan tombol untuk menjalankan aksi di dalam input group.

<ComponentPreview name="InputGroupWithButton" />


### Tooltip

Menambahkan tooltip untuk memberi konteks atau bantuan tambahan.

<ComponentPreview name="InputGroupWithTooltip" />


### Textarea

Input group juga bisa dipakai bersama textarea. Untuk perataannya, gunakan `block-start` atau `block-end`.

<ComponentPreview name="InputGroupWithTextarea" />


### Spinner

Menampilkan indikator pemuatan selagi input diproses.

<ComponentPreview name="InputGroupWithSpinner" />


### Label

Menambahkan label di dalam input group agar lebih mudah diakses.

<ComponentPreview name="InputGroupWithLabel" />


### Dropdown

Memadukan input group dengan dropdown menu untuk interaksi yang lebih rumit.

<ComponentPreview name="InputGroupWithDropdown" />


### Button Group

Membungkus input group dengan button group untuk membuat awalan dan akhiran.

<ComponentPreview name="InputGroupWithButtonGroup" />


### Input Kustom

Tambahkan atribut `data-slot="input-group-control"` pada input kustom Anda agar perilaku dan state focus-nya ditangani otomatis.

Tidak ada style bawaan yang diterapkan ke input kustom. Style-nya Anda atur sendiri lewat prop `class`.

<ComponentPreview name="InputGroupWithCustomInput" />


```vue showLineNumbers
<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupButton } from '@/components/ui/input-group'
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <InputGroup>
      <textarea
        data-slot="input-group-control"
        class="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
        placeholder="Autoresize textarea..."
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton class="ml-auto" size="sm" variant="default">
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
```

## Referensi API

### InputGroup

Komponen utama yang membungkus input dan addon.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<InputGroup>
  <InputGroupInput />
  <InputGroupAddon />
</InputGroup>
```

### InputGroupAddon

Menampilkan ikon, teks, tombol, atau konten lain di samping input.

::: tip Focus Navigation
Agar navigasi focus berjalan benar, komponen `InputGroupAddon` sebaiknya diletakkan
setelah input. Posisinya diatur lewat prop `align`.
:::

| Prop        | Tipe                                                             | Bawaan           |
| ----------- | ---------------------------------------------------------------- | ---------------- |
| `align`     | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |
| `class` | `string`                                                         |                  |

```vue
<InputGroupAddon align="inline-end">
  <SearchIcon />
</InputGroupAddon>
```

**Untuk `<InputGroupInput />`, pakai perataan `inline-start` atau `inline-end`. Untuk `<InputGroupTextarea />`, pakai `block-start` atau `block-end`.**

Satu `InputGroupAddon` bisa memuat beberapa `InputGroupButton` sekaligus beserta ikon.

```vue
<InputGroupAddon>
  <InputGroupButton>Button</InputGroupButton>
  <InputGroupButton>Button</InputGroupButton>
</InputGroupAddon>
```

### InputGroupButton

Menampilkan tombol di dalam input group.

| Prop        | Tipe                                                                          | Bawaan    |
| ----------- | ----------------------------------------------------------------------------- | --------- |
| `size`      | `"xs" \| "icon-xs" \| "sm" \| "icon-sm"`                                      | `"xs"`    |
| `variant`   | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"ghost"` |
| `class` | `string`                                                                      |           |

```vue
<InputGroupButton>
Button
</InputGroupButton>

<InputGroupButton size="icon-xs" aria-label="Copy">
  <CopyIcon />
</InputGroupButton>
```

### InputGroupInput

Pengganti `<Input />` saat membangun input group. Style input group-nya sudah diterapkan, dan komponen ini memakai `data-slot="input-group-control"` yang seragam untuk menangani state focus.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

Semua prop lain diteruskan ke komponen `<Input />` di baliknya.

```vue
<InputGroup>
  <InputGroupInput placeholder="Enter text..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

### InputGroupTextarea

Pengganti `<Textarea />` saat membangun input group. Style-nya sudah diterapkan, dan komponen ini memakai `data-slot="input-group-control"` yang seragam untuk menangani state focus.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

Semua prop lain diteruskan ke komponen `<Textarea />` di baliknya.

```vue
<InputGroup>
  <InputGroupTextarea placeholder="Enter message..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

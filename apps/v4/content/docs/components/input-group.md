---
title: Input Group
description: Menyisipkan informasi atau aksi tambahan ke dalam input maupun textarea.
component: true
---

::component-preview
---
name: InputGroupDemo
class: '[&_.preview]:p-4'
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
npx shadcn-vue@latest add input-group
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input-group) ke project Anda.
    ::

    ::step
    Sesuaikan path import dengan struktur project Anda.
    ::
  :::
::::

:::::

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

::component-preview
---
name: InputGroupWithIcon
class: '[&_.preview]:p-4'
---
::

### Text

Menampilkan keterangan teks tambahan di samping input.

::component-preview
---
name: InputGroupWithText
class: '[&_.preview]:p-4'
---
::

### Button

Menambahkan tombol untuk menjalankan aksi di dalam input group.

::component-preview
---
name: InputGroupWithButton
class: '[&_.preview]:p-4'
---
::

### Tooltip

Menambahkan tooltip untuk memberi konteks atau bantuan tambahan.

::component-preview
---
name: InputGroupWithTooltip
class: '[&_.preview]:p-4'
---
::

### Textarea

Input group juga bisa dipakai bersama textarea. Untuk perataannya, gunakan `block-start` atau `block-end`.

::component-preview
---
name: InputGroupWithTextarea
class: '[&_.preview]:p-4'
---
::

### Spinner

Menampilkan indikator pemuatan selagi input diproses.

::component-preview
---
name: InputGroupWithSpinner
class: '[&_.preview]:p-4'
---
::

### Label

Menambahkan label di dalam input group agar lebih mudah diakses.

::component-preview
---
name: InputGroupWithLabel
class: '[&_.preview]:p-4'
---
::

### Dropdown

Memadukan input group dengan dropdown menu untuk interaksi yang lebih rumit.

::component-preview
---
name: InputGroupWithDropdown
class: '[&_.preview]:p-4'
---
::

### Button Group

Membungkus input group dengan button group untuk membuat awalan dan akhiran.

::component-preview
---
name: InputGroupWithButtonGroup
class: '[&_.preview]:p-4'
---
::

### Input Kustom

Tambahkan atribut `data-slot="input-group-control"` pada input kustom Anda agar perilaku dan state focus-nya ditangani otomatis.

Tidak ada style bawaan yang diterapkan ke input kustom. Style-nya Anda atur sendiri lewat prop `class`.

::component-preview
---
name: InputGroupWithCustomInput
class: '!mb-4 [&_.preview]:p-4'
---
::

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

::callout{title="Focus Navigation"}
Agar navigasi focus berjalan benar, komponen `InputGroupAddon` sebaiknya diletakkan
setelah input. Posisinya diatur lewat prop `align`.
::

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

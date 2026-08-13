---
title: Button Group
description: Wadah yang menyatukan beberapa tombol terkait dengan tampilan yang seragam.
component: true
---

<ComponentPreview name="ButtonGroupDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add button-group
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/button-group) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue
<script setup lang="ts">
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group'
</script>

<template>
  <ButtonGroup>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
  </ButtonGroup>
</template>
```

## Aksesibilitas

- Komponen `ButtonGroup` memakai atribut `role` bernilai `group`.
- Pakai `Tab` untuk berpindah antar tombol di dalam grup.
- Pakai `aria-label` atau `aria-labelledby` untuk memberi label pada button group.

```vue
<template>
  <ButtonGroup aria-label="Button group">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
  </ButtonGroup>
</template>
```

## ButtonGroup dibanding ToggleGroup

- Pakai `ButtonGroup` kalau tombol-tombol yang Anda kelompokkan menjalankan sebuah aksi.
- Pakai `ToggleGroup` kalau tombol-tombolnya berfungsi menyalakan dan mematikan sebuah keadaan.

## Contoh

### Orientasi

Atur prop `orientation` untuk mengubah susunan button group.

<ComponentPreview name="ButtonGroupOrientationDemo" />


### Ukuran

Ukuran tombol diatur lewat prop `size` pada masing-masing tombol.

<ComponentPreview name="ButtonGroupSizeDemo" />


### Bersarang

Susun `<ButtonGroup>` secara bersarang untuk membuat kelompok tombol yang berjarak.

<ComponentPreview name="ButtonGroupNestedDemo" />


### Separator

Komponen `ButtonGroupSeparator` memisahkan tombol-tombol di dalam satu grup secara visual.

Tombol bervarian `outline` tidak butuh pemisah karena sudah punya garis tepi. Untuk varian lain, pemisah disarankan agar hierarki visualnya lebih jelas.

<ComponentPreview name="ButtonGroupSeparatorDemo" />


### Tombol Terbelah

Buat tombol terbelah dengan menaruh dua tombol yang dipisahkan `ButtonGroupSeparator`.

<ComponentPreview name="ButtonGroupSplitDemo" />


### Input

Bungkus komponen `Input` bersama beberapa tombol.

<ComponentPreview name="ButtonGroupWithInputDemo" />


### Input Group

Bungkus komponen `InputGroup` untuk membuat susunan input yang lebih rumit.

<ComponentPreview name="ButtonGroupInputGroupDemo" />


### Dropdown Menu

Buat tombol terbelah yang dipadukan dengan komponen `DropdownMenu`.

<ComponentPreview name="ButtonGroupWithDropdownMenuDemo" />


### Select

Padukan dengan komponen `Select`.

<ComponentPreview name="ButtonGroupWithSelectDemo" />


### Popover

Padukan dengan komponen `Popover`.

<ComponentPreview name="ButtonGroupWithPopoverDemo" />


## Referensi API

### ButtonGroup

Komponen `ButtonGroup` adalah wadah yang menyatukan tombol-tombol terkait dengan tampilan seragam.

| Prop         | Type                             | Default   |
| ------------ | -------------------------------- | --------- |
| `orientation` | `"horizontal"` \| `"vertical"`    | `"horizontal"` |

```vue
<template>
  <ButtonGroup>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
  </ButtonGroup>
</template>
```

Susun beberapa button group secara bersarang untuk membuat tata letak berjarak yang lebih rumit. Lihat contoh [bersarang](#bersarang) untuk detailnya.

```vue
<template>
  <ButtonGroup>
    <ButtonGroup />
    <ButtonGroup />
  </ButtonGroup>
</template>
```

### ButtonGroupSeparator

Komponen `ButtonGroupSeparator` memisahkan tombol-tombol di dalam satu grup secara visual.

| Prop      | Type   | Default |
| --------- | ------ | ------- |
| `orientation`    | `"horizontal" \| "vertical"` | `vertical`    |

```vue
<template>
  <ButtonGroup>
    <Button>Button 1</Button>
    <ButtonGroupSeparator />
    <Button>Button 2</Button>
  </ButtonGroup>
</template>
```

### ButtonGroupText

Pakai komponen ini untuk menampilkan teks di dalam button group.

| Prop      | Type   | Default |
| --------- | ------ | ------- |
| `as-child`    | boolean | `false`    |

```vue
<template>
  <ButtonGroup>
    <ButtonGroupText>Text</ButtonGroupText>
    <Button>Button</Button>
  </ButtonGroup>
</template>
```

Pakai prop `as-child` untuk menampilkan komponen Anda sendiri sebagai teksnya, misalnya sebuah label.

```vue
<script setup lang="ts">
import { ButtonGroupText } from '@/components/ui/button-group'
import { Label } from '@/components/ui/label'
</script>

<template>
  <ButtonGroup>
    <ButtonGroupText as-child>
      <Label for="name">Text</Label>
    </ButtonGroupText>
    <Input id="name" placeholder="Type something here..." />
  </ButtonGroup>
</template>
```

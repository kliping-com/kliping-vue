---
title: Item
description: Komponen serbaguna untuk menampilkan konten apa pun dalam satu baris.
component: true
---

Komponen `Item` pada dasarnya adalah wadah flex sederhana yang bisa memuat konten apa pun. Pakai untuk menampilkan judul, keterangan, dan aksi. Kelompokkan dengan `ItemGroup` untuk membentuk daftar item.

Hasil serupa sebenarnya bisa dicapai dengan elemen `div` dan beberapa class. Tapi pola ini terlalu sering dipakai, jadi lebih praktis kalau sudah tersedia sebagai komponen siap pakai.

::component-preview
---
name: ItemDemo
class: '[&_.preview]:p-0'
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
npx shadcn-vue@latest add item
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/item) ke project Anda.
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
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
</script>

<template>
  <Item>
    <ItemHeader>Item Header</ItemHeader>
    <ItemMedia />
    <ItemContent>
      <ItemTitle>Item</ItemTitle>
      <ItemDescription>Item</ItemDescription>
    </ItemContent>
    <ItemFooter>Item Footer</ItemFooter>
  </Item>
</template>
```

## Contoh

### Varian

::component-preview
---
name: ItemVariantDemo
---
::

### Ukuran

Komponen `Item` punya beberapa ukuran untuk kebutuhan berbeda. Ukuran `sm` cocok untuk item ringkas, sedangkan `default` untuk item biasa.

::component-preview
---
name: ItemSizeDemo
---
::

### Icon

::component-preview
---
name: ItemIconDemo
---
::

### Avatar

::component-preview
---
name: ItemAvatarDemo
---
::

### Image

::component-preview
---
name: ItemImageDemo
---
::

### Grup

::component-preview
---
name: ItemGroupDemo
---
::

### Header

::component-preview
---
name: ItemHeaderDemo
---
::

### Link

Untuk menampilkan item sebagai tautan, pakai prop `as-child`. State hover dan focus akan diterapkan pada elemen anchor-nya.

::component-preview
---
name: ItemLinkDemo
---
::

### Dropdown

::component-preview
---
name: ItemDropdownDemo
---
::

## Referensi API

### Item

Komponen utama untuk menampilkan konten beserta media, judul, keterangan, dan aksinya.

| Prop       | Tipe                                | Bawaan      |
| ---------- | ----------------------------------- | ----------- |
| `variant`  | `"default" \| "outline" \| "muted"` | `"default"` |
| `size`     | `"default" \| "sm"`                 | `"default"` |
| `as-child` | `boolean`                           | `false`     |

```vue
<template>
  <Item size="" variant="">
    <ItemMedia />
    <ItemContent>
      <ItemTitle>Item</ItemTitle>
      <ItemDescription>Item</ItemDescription>
    </ItemContent>
    <ItemActions />
  </Item>
</template>
```

Pakai prop `as-child` untuk menampilkan komponen Anda sendiri sebagai item, misalnya sebuah tautan. State hover dan focus akan diterapkan pada komponen tersebut.

```vue
<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
</script>

<template>
  <Item as-child>
    <a href="/dashboard">
      <ItemMedia variant="icon">
        <Home />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Dashboard</ItemTitle>
        <ItemDescription>
          Overview of your account and activity.
        </ItemDescription>
      </ItemContent>
    </a>
  </Item>
</template>
```

### ItemGroup

Komponen `ItemGroup` adalah wadah yang menyatukan item-item terkait dengan tampilan seragam.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemGroup>
    <Item />
    <Item />
  </ItemGroup>
</template>
```

### ItemSeparator

Komponen `ItemSeparator` adalah pemisah antar item di dalam sebuah item group.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemGroup>
    <Item />
    <ItemSeparator />
    <Item />
  </ItemGroup>
</template>
```

### ItemMedia

Pakai komponen `ItemMedia` untuk menampilkan media seperti ikon, gambar, atau avatar.

| Prop        | Tipe                             | Bawaan      |
| ----------- | -------------------------------- | ----------- |
| `variant`   | `"default" \| "icon" \| "image"` | `"default"` |
| `class`     | `string`                         |             |

```vue
<template>
  <ItemMedia variant="icon">
    <Icon />
  </ItemMedia>
</template>
```

```vue
<template>
  <ItemMedia variant="image">
    <img src="..." alt="...">
  </ItemMedia>
</template>
```

### ItemContent

Komponen `ItemContent` membungkus judul dan keterangan item.

`ItemContent` boleh dilewati kalau Anda hanya butuh judul saja.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemContent>
    <ItemTitle>Item</ItemTitle>
    <ItemDescription>Item</ItemDescription>
  </ItemContent>
</template>
```

### ItemTitle

Pakai komponen `ItemTitle` untuk menampilkan judul item.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemTitle>Item Title</ItemTitle>
</template>
```

### ItemDescription

Pakai komponen `ItemDescription` untuk menampilkan keterangan item.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemDescription>Item description</ItemDescription>
</template>
```

### ItemActions

Pakai komponen `ItemActions` untuk menampilkan tombol aksi atau elemen interaktif lainnya.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemActions>
    <Button>Action</Button>
    <Button>Action</Button>
  </ItemActions>
</template>
```

### ItemHeader

Pakai komponen `ItemHeader` untuk menampilkan header di dalam item.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemHeader>Item Header</ItemHeader>
</template>
```

### ItemFooter

Pakai komponen `ItemFooter` untuk menampilkan footer di dalam item.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemFooter>Item Footer</ItemFooter>
</template>
```

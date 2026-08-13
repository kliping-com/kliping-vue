---
title: Empty
description: Menampilkan keadaan saat belum ada data yang bisa ditampilkan.
component: true
---

<ComponentPreview name="EmptyDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add empty
```

**Manual**

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/empty) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { FolderOpen } from '@lucide/vue'
import { Button } from '@/registry/default/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/registry/default/ui/empty'
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderOpen />
      </EmptyMedia>
    </EmptyHeader>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
    <EmptyContent>
      <Button>Add data</Button>
    </EmptyContent>
  </Empty>
</template>
```

## Contoh

### Outline

Pakai utility class `border` untuk membuat empty state bergaris tepi.

<ComponentPreview name="EmptyOutlineDemo" />


### Latar

Pakai utility `bg-*` dan `bg-gradient-*` untuk memberi latar pada empty state.

<ComponentPreview name="EmptyBackgroundDemo" />


### Avatar

Pakai komponen `EmptyMedia` untuk menampilkan avatar di dalam empty state.

<ComponentPreview name="EmptyAvatarDemo" />


### Grup Avatar

Pakai komponen `EmptyMedia` untuk menampilkan sekelompok avatar di dalam empty state.

<ComponentPreview name="EmptyAvatarGroupDemo" />


### InputGroup

Anda bisa menyisipkan komponen `InputGroup` ke dalam `EmptyContent`.

<ComponentPreview name="EmptyInputGroupDemo" />


## Referensi API

### Empty

Komponen utama empty state. Membungkus komponen `EmptyHeader` dan `EmptyContent`.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <Empty>
    <EmptyHeader />
    <EmptyContent />
  </Empty>
</template>
```

### EmptyHeader

Komponen `EmptyHeader` membungkus media, judul, dan keterangan empty state.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <EmptyHeader>
    <EmptyMedia />
    <EmptyTitle />
    <EmptyDescription />
  </EmptyHeader>
</template>
```

### EmptyMedia

Pakai komponen `EmptyMedia` untuk menampilkan media empty state, misalnya ikon atau gambar. Komponen lain seperti avatar juga bisa diletakkan di sini.

| Prop        | Tipe                  | Bawaan    |
| ----------- | --------------------- | --------- |
| `variant`   | `"default" \| "icon"` | `default` |
| `class` | `string`              |           |

```vue
<template>
  <EmptyMedia variant="icon">
    <Icon />
  </EmptyMedia>
</template>
```

```vue
<template>
  <EmptyMedia>
    <Avatar>
      <AvatarImage src="..." />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </EmptyMedia>
</template>
```

### EmptyTitle

Pakai komponen `EmptyTitle` untuk menampilkan judul empty state.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <EmptyTitle>No data</EmptyTitle>
</template>
```

### EmptyDescription

Pakai komponen `EmptyDescription` untuk menampilkan keterangan empty state.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <EmptyDescription>You do not have any notifications.</EmptyDescription>
</template>
```

### EmptyContent

Pakai komponen `EmptyContent` untuk menampilkan isi empty state, misalnya tombol, input, atau tautan.

| Prop        | Tipe     | Bawaan  |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <EmptyContent>
    <Button>Add Project</Button>
  </EmptyContent>
</template>
```

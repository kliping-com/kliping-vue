---
title: Button
description: Menampilkan tombol, atau komponen lain yang tampil seperti tombol.
featured: true
component: true
---

::component-preview
---
name: ButtonDemo
description: Sebuah tombol.
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
npx shadcn-vue@latest add button
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
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/button) ke project Anda.
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
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button variant="outline">
    Button
  </Button>
</template>
```

## Bentuk Kursor

Tailwind v4 [berganti](https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor) dari `cursor: pointer` ke `cursor: default` untuk komponen tombol.

Kalau Anda ingin mempertahankan perilaku `cursor: pointer`, tambahkan kode berikut ke file CSS Anda:

Perilaku ini juga bisa diaktifkan saat menyiapkan project lewat `npx shadcn-vue@latest init --pointer`.

```css showLineNumbers title="tailwind.css"
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Contoh

### Ukuran

::component-preview
---
name: ButtonSize
class: mb-4
---
::

### Bawaan

::component-preview
---
name: ButtonDefault
class: mb-4
---
::

### Outline

::component-preview
---
name: ButtonOutline
class: mb-4
---
::

### Secondary

::component-preview
---
name: ButtonSecondary
class: mb-4
---
::

### Ghost

::component-preview
---
name: ButtonGhost
class: mb-4
---
::

### Destructive

::component-preview
---
name: ButtonDestructive
class: mb-4
---
::

### Link

::component-preview
---
name: ButtonLink
class: mb-4
---
::

### Icon

::component-preview
---
name: ButtonIcon
class: mb-4
---
::

```vue showLineNumbers
<template>
  <Button variant="outline" size="icon" aria-label="Submit">
    <CircleFadingArrowUpIcon />
  </Button>
</template>
```

### Dengan Ikon

Jarak antara ikon dan teks menyesuaikan otomatis dengan ukuran tombol. Anda tidak perlu menambahkan margin pada ikonnya.

::component-preview
---
name: ButtonWithIcon
class: mb-4
---
::

### Sudut Membulat

Pakai class `rounded-full` untuk membuat tombol berbentuk bulat penuh.

::component-preview
---
name: ButtonRounded
class: mb-4
---
::

### Spinner

::component-preview
---
name: ButtonLoading
class: mb-4
---
::

### Button Group

::component-preview
---
name: ButtonGroupDemo
class: mb-4
---
::

Untuk membuat kelompok tombol, pakai komponen `ButtonGroup`. Keterangan lengkapnya ada di dokumentasi [Button Group](/docs/components/button-group).

### Link (asChild)

Pakai prop `as-child` untuk membuat komponen lain tampil seperti tombol. Berikut contoh tautan yang tampil seperti tombol.

```vue showLineNumbers
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button as-child>
    <a href="/login">Login</a>
  </Button>
</template>
```

## Referensi API

### Button

Komponen `Button` adalah pembungkus elemen `button` yang menambahkan beragam style dan fungsi.

| Prop      | Tipe                                                                          | Bawaan      |
| --------- | ----------------------------------------------------------------------------- | ----------- |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"` | `"default"` |
| `size`    | `"default" \| "sm" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg"`               | `"default"` |
| `asChild` | `boolean`                                                                     | `false`     |

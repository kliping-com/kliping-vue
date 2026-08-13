---
title: Button
description: Menampilkan tombol, atau komponen lain yang tampil seperti tombol.
featured: true
component: true
---

<ComponentPreview name="ButtonDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add button
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/button) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

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

<ComponentPreview name="ButtonSize" />


### Bawaan

<ComponentPreview name="ButtonDefault" />


### Outline

<ComponentPreview name="ButtonOutline" />


### Secondary

<ComponentPreview name="ButtonSecondary" />


### Ghost

<ComponentPreview name="ButtonGhost" />


### Destructive

<ComponentPreview name="ButtonDestructive" />


### Link

<ComponentPreview name="ButtonLink" />


### Icon

<ComponentPreview name="ButtonIcon" />


```vue showLineNumbers
<template>
  <Button variant="outline" size="icon" aria-label="Submit">
    <CircleFadingArrowUpIcon />
  </Button>
</template>
```

### Dengan Ikon

Jarak antara ikon dan teks menyesuaikan otomatis dengan ukuran tombol. Anda tidak perlu menambahkan margin pada ikonnya.

<ComponentPreview name="ButtonWithIcon" />


### Sudut Membulat

Pakai class `rounded-full` untuk membuat tombol berbentuk bulat penuh.

<ComponentPreview name="ButtonRounded" />


### Spinner

<ComponentPreview name="ButtonLoading" />


### Button Group

<ComponentPreview name="ButtonGroupDemo" />


Untuk membuat kelompok tombol, pakai komponen `ButtonGroup`. Keterangan lengkapnya ada di dokumentasi [Button Group](/components/button-group).

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

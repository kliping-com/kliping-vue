---
title: Nuxt
description: Menambahkan mode gelap ke aplikasi Nuxt Anda.
---

## Mode gelap

<Steps>

### Pasang dependensi

```bash
npm install -D @nuxtjs/color-mode
```

Lalu daftarkan `@nuxtjs/color-mode` di bagian `modules` pada `nuxt.config.ts` Anda:

```ts
export default defineNuxtConfig({
  modules: [
    '...',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  }
})
```

### Tambahkan tombol pengubah mode

Letakkan tombol ini di situs Anda untuk berpindah antara mode terang dan gelap.

Di sini kami memakai [`useColorMode`](https://color-mode.nuxtjs.org/usage/basic) dari [`Nuxt Color Mode`](https://color-mode.nuxtjs.org/).

Opsional, untuk memakai ikon pada tombol tema:
```bash
npm install -D @iconify/vue @iconify-json/radix-icons
```

```vue title="components/ModeToggle.vue"
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const colorMode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Ubah tema</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode.preference = 'light'">
        Terang
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'">
        Gelap
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'system'">
        Sistem
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

</Steps>

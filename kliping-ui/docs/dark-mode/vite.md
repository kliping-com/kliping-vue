---
title: Vite
description: Menambahkan mode gelap ke aplikasi Vite Anda.
---

## Mode gelap

<Steps>

### Pasang dependensi

```bash
npm install @vueuse/core
```

Opsional, untuk memakai ikon pada tombol tema:
```bash
npm install -D @iconify/vue @iconify-json/radix-icons
```

### Tambahkan tombol pengubah mode

Letakkan tombol ini di situs Anda untuk berpindah antara mode terang dan gelap.

Di sini kami memakai [`useColorMode`](https://vueuse.org/core/usecolormode/) dari [`@vueuse/core`](https://vueuse.org/core/).
> Mode warna yang reaktif (gelap / terang / kustom), lengkap dengan penyimpanan otomatis.

```vue title="components/ModeToggle.vue"
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
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
      <DropdownMenuItem @click="mode = 'light'">
        Terang
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Gelap
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        Sistem
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

</Steps>

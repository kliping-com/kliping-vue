---
title: Vitepress
description: Menambahkan mode gelap ke aplikasi Vitepress Anda.
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

Di sini kami memakai [`useToggle`](https://vueuse.org/shared/useToggle/) dari [`@vueuse/core`](https://vueuse.org/core/).
> Sakelar boolean sederhana beserta fungsi pembantunya.

```vue title="components/ModeToggle.vue"
<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { useData } from 'vitepress'
import { Button } from '@/registry/default/ui/button'

const { frontmatter, isDark } = useData()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button variant="outline">
    <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span class="sr-only">Ubah tema</span>
  </Button>
</template>
```

</Steps>

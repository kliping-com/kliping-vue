---
title: Astro
description: Menambahkan mode gelap ke aplikasi Astro Anda.
---

## Mode gelap

<Steps>

### Buat script tema inline

```astro title="src/pages/index.astro"
---
import '../styles/globals.css'
---

<script is:inline>
	const getThemePreference = () => {
		if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
			return localStorage.getItem('theme');
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};
	const isDark = getThemePreference() === 'dark';
	document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

	if (typeof localStorage !== 'undefined') {
		const observer = new MutationObserver(() => {
			const isDark = document.documentElement.classList.contains('dark');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
	}
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
</script>
```

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

### Tampilkan tombolnya

Pasang komponen tombol tadi di halaman Anda.

```astro title="src/pages/index.astro"
---
import '../styles/globals.css'
import ModeToggle from '@/components/ModeToggle.vue';
---

<!-- Inline script -->

<html lang="en">
	<body>
      <h1>Astro</h1>
      <ModeToggle client:load />
	</body>
</html>
```

</Steps>

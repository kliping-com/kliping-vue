---
title: Laravel
description: Memasang dan mengonfigurasi Kliping di project Laravel dengan Inertia.
---

<Steps>

### Buat project

Mulai dengan membuat project Laravel baru berisi Inertia dan Vue lewat installer Laravel:

```bash
laravel new my-app --vue
```

### Tambahkan komponen

Sekarang Anda bisa mulai menambahkan komponen ke project.

```bash
npx shadcn-vue@latest add switch
```

Perintah di atas menambahkan komponen `Switch` ke `resources/js/components/ui/switch`. Setelah itu, import seperti ini:

```vue showLineNumbers {2,7} title="resources/js/pages/index.vue"
<script setup lang="ts">
import { Switch } from '@/Components/ui/switch'
</script>

<template>
  <div>
    <Switch />
  </div>
</template>
```

</Steps>

---
title: Sonner
description: Komponen notifikasi toast untuk Vue dengan pilihan desain yang sudah ditentukan.
component: true
links:
  doc: https://vue-sonner.vercel.app/
---

::component-preview
---
name: SonnerDemo
description: Komponen notifikasi toast Sonner.
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
npx shadcn-vue@latest add sonner
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Pasang dependensi berikut:
    ::

    ```bash
    npm install vue-sonner
    ```

    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/sonner) ke project Anda.
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
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button @click="() => toast('My first toast')">
    Give me a toast
  </Button>
</template>
```

## Instalasi

Komponen `<Toaster />` beserta CSS-nya wajib ada supaya toast bisa tampil. Pasang keduanya di layout paling luar aplikasi Anda.

```vue showLineNumbers
<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div>
    <main>
      <!-- Your app content -->
    </main>
    <Toaster />
  </div>
</template>
```

## Contoh

### Tipe

::component-preview
---
name: SonnerTypesDemo
---
::

### Dengan Dialog

::component-preview
---
name: SonnerWithDialogDemo
---
::

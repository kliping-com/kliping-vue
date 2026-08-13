---
title: Drawer
description: Komponen laci geser yang dirancang untuk perangkat mobile.
component: true
links:
  doc: https://reka-ui.com/docs/components/drawer
  api: https://reka-ui.com/docs/components/drawer#api-reference
---

<ComponentPreview name="DrawerDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add drawer
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/drawer) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
</script>

<template>
  <Drawer>
    <DrawerTrigger>Open</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>
          This action cannot be undone.
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
```

## Contoh

### Konten yang Bisa Digulir

Menjaga tombol aksi tetap terlihat selagi kontennya digulir.

<ComponentPreview name="DrawerScrollableContent" />


### Sisi

Pakai prop `swipe-direction` untuk menentukan ke arah mana drawer digeser saat ditutup. Drawer menempel pada sisi yang jadi arah penutupannya — `up` membuka drawer di sisi atas, `down` di sisi bawah. Pilihannya: `up`, `right`, `down`, dan `left`.

<ComponentPreview name="DrawerSides" />


### Modal Responsif (Dialog & Drawer)

Pakai komponen `Drawer` untuk layar kecil, dan `Dialog` untuk layar yang lebih lebar. Pola ini bisa Anda jadikan komponen pakai-ulang dengan memanfaatkan slot untuk tiap bagian modal.

<ComponentPreview name="DialogResponsive" />

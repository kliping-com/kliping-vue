---
title: Dialog
description: Jendela yang menumpuk di atas jendela utama atau dialog lain, membuat konten di bawahnya tidak bisa disentuh.
component: true
links:
  doc: https://reka-ui.com/docs/components/dialog
  api: https://reka-ui.com/docs/components/dialog#api-reference
---

<ComponentPreview name="DialogDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add dialog
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/dialog) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
```

## Contoh

### Tombol Tutup Kustom

<ComponentPreview name="DialogCloseButton" />


### Dialog dengan Form

Agar nilai isian tidak hilang setelah `Dialog` ditutup.

<ComponentPreview name="DialogForm" />


### Modal Responsif (Dialog & Drawer)

Pakai komponen `Drawer` untuk layar kecil, dan `Dialog` untuk layar yang lebih lebar. Pola ini bisa Anda jadikan komponen pakai-ulang dengan memanfaatkan slot untuk tiap bagian modal.

<ComponentPreview name="DialogResponsive" />


## Catatan

Untuk memakai komponen `Dialog` dari dalam `Context Menu` atau `Dropdown Menu`, Anda harus membungkus komponen `Context Menu` atau
`Dropdown Menu` tersebut di dalam komponen `Dialog`.

```vue showLineNumbers title="components/EampleDialogContext.vue" {2, 29}
<template>
  <Dialog>
    <ContextMenu>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Download</ContextMenuItem>
        <DialogTrigger as-child>
          <ContextMenuItem>
            <span>Delete</span>
          </ContextMenuItem>
        </DialogTrigger>
      </ContextMenuContent>
    </ContextMenu>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

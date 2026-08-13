---
title: Getting Started
description: Learn how to get setup and run your own component registry.
---

Panduan ini menuntun Anda menyiapkan registry komponen Anda sendiri.

Panduan ini mengasumsikan Anda sudah punya project berisi komponen dan ingin menjadikannya sebuah registry.

<!-- If you're starting a new registry project, you can use the [registry template](https://github.com/shadcn-ui/registry-template) as a starting point. We have already configured it for you. -->

## registry.json

Berkas `registry.json` hanya diperlukan kalau Anda memakai CLI `shadcn-vue` untuk membangun registry.

Kalau Anda memakai sistem build lain, langkah ini boleh dilewati — asalkan sistem itu menghasilkan berkas JSON yang sah sesuai [spesifikasi skema registry-item](/docs/registry/registry-item-json).

<Steps>

### Tambahkan berkas registry.json

Buat berkas `registry.json` di root project Anda. Project-nya boleh Nuxt, Vite, atau apa pun yang mendukung Vue.

```json showLineNumbers title="registry.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    // ...
  ]
}
```

Berkas `registry.json` ini harus sesuai [spesifikasi skema registry](/docs/registry/registry-json).

</Steps>

## Menambahkan Item Registry

<Steps>

### Buat komponen Anda

Tambahkan komponen pertama Anda. Berikut contoh komponen `<HelloWorld />` sederhana:

```vue showLineNumbers title="registry/new-york/HelloWorld/HelloWorld.vue"
<script setup lang="ts">
import { Button } from "@/components/ui/button"
</script>

<template>
  <Button>Hello World</Button>
</template>
```

<Callout class="mt-6">

  **Catatan:** contoh ini menaruh komponennya di folder `registry/new-york`.
  Anda boleh menaruhnya di mana pun di dalam project, asalkan path-nya diisi
  dengan benar di `registry.json` dan Anda mengikuti struktur `registry/[NAMA]`.
  directory structure.

</Callout>

```txt
registry
└── new-york
    └── HelloWorld
        └── HelloWorld.vue
```

<Callout class="mt-6 [&_pre]:mb-0">

  **Penting:** kalau komponen Anda ditaruh di folder kustom, pastikan folder itu
  sudah terdaftar di berkas `tailwind.config.ts` Anda.

```ts showLineNumbers
// tailwind.config.ts
export default {
  content: ["./registry/**/*.{js,ts,jsx,tsx,vue}"],
}
```

</Callout>

### Daftarkan komponen Anda ke registry

Untuk mendaftarkan komponen ke registry, tambahkan definisinya ke `registry.json`.

```json showLineNumbers title="registry.json"  {6-17}
{
  "$schema": "https://shadcn-vue.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/HelloWorld/HelloWorld.vue",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

Item registry didefinisikan lewat `name`, `type`, `title`, `description`, dan `files`.

Untuk tiap berkas yang Anda tambahkan, `path` dan `type`-nya wajib diisi. `path` adalah lokasi berkas relatif terhadap root project Anda, sedangkan `type` adalah jenis berkasnya.

Penjelasan lengkap soal skema item registry dan jenis berkasnya ada di [dokumentasi skema registry item](/docs/registry/registry-item-json).

</Steps>

## Membangun Registry Anda

<Steps>

### Pasang CLI shadcn-vue

Catatan: perintah `build` untuk sementara hanya tersedia di CLI versi `shadcn-vue@canary`.

```bash
npm install shadcn-vue@latest
```

### Tambahkan script build

Tambahkan script `registry:build` ke berkas `package.json` Anda.

```json showLineNumbers title="package.json"
{
  "scripts": {
    "registry:build": "shadcn-vue build"
  }
}
```

### Jalankan script build-nya

Jalankan script build-nya untuk menghasilkan berkas JSON registry.

```bash
npm run registry:build
```

<Callout class="mt-6">

**Catatan:** secara bawaan, script build menaruh berkas JSON registry di `public/r`, misalnya `public/r/hello-world.json`.

Folder tujuannya bisa diubah lewat opsi `--output`. Keterangan lengkapnya ada di [perintah build](/docs/cli#build).

</Callout>

</Steps>

## Menyajikan Registry Anda

Kalau registry Anda berjalan di Nuxt, sajikan dengan menjalankan server `nuxt`. Perintahnya bisa berbeda untuk framework lain.

```bash
npm run dev
```

Berkas Anda kini tersaji di `http://localhost:3000/r/[NAMA].json`, misalnya `http://localhost:3000/r/hello-world.json`.

## Menerbitkan Registry Anda

Supaya registry Anda bisa dipakai developer lain, terbitkan dengan men-deploy project-nya ke URL publik.

## Menambahkan Autentikasi

CLI `shadcn-vue` tidak menyediakan cara bawaan untuk menambahkan autentikasi ke registry Anda. Kami menyarankan urusan otorisasi ditangani di server registry Anda sendiri.

Cara sederhana yang umum dipakai adalah menyisipkan parameter kueri `token` untuk mengautentikasi permintaan ke registry Anda, misalnya `http://localhost:3000/r/hello-world.json?token=[TOKEN_RAHASIA_ANDA]`.

Pakai token itu untuk memeriksa permintaan, lalu balas dengan 401 Unauthorized kalau tokennya tidak sah. CLI akan menangani respons 401 tersebut dan menampilkan pesan ke pengguna.

<Callout class="mt-6">
  **Catatan:** pastikan token dienkripsi dan diberi masa berlaku.
</Callout>

## Panduan

Beberapa panduan yang sebaiknya Anda ikuti saat membangun komponen untuk sebuah registry.

- Taruh item registry Anda di folder `registry/[STYLE]/[NAMA]`. Contoh di sini memakai `new-york`, tapi namanya bebas asalkan berada di dalam folder `registry`.
- Properti yang wajib ada pada definisi block: `name`, `description`, `type`, dan `files`.
- Daftarkan semua dependency registry di `registryDependencies`. Dependency registry berupa nama komponen di dalam registry — misalnya `input`, `button`, `card` — atau URL menuju sebuah item registry, misalnya `http://localhost:3000/r/editor.json`.
- Daftarkan semua dependency di `dependencies`. Dependency berupa nama paket npm, misalnya `zod` atau `sonner`. Untuk mengunci versi, pakai format `nama@versi`, misalnya `zod@^3.20.0`.
- **Import harus selalu memakai path `@/registry`.** Contohnya `import { HelloWorld } from "@/registry/new-york/hello-world/hello-world"`.
- Sebaiknya berkas di dalam satu item registry ditaruh dalam folder `components`, `hooks`, atau `lib`.

## Pasang Lewat CLI

Untuk memasang item registry lewat CLI `shadcn-vue`, jalankan perintah `add` diikuti URL item registry-nya.

```bash
npx shadcn-vue@latest add http://localhost:3000/r/hello-world.json
```

## Pasang dari GitHub

Kalau registry Anda berada di repository GitHub yang **publik** dan memuat `registry.json`
di root-nya, Anda tidak perlu mem-build, meng-hosting, atau mengatur apa pun. CLI bisa
read it directly:

```bash
npx shadcn-vue@latest add owner/repo/hello-world
```

CLI mencari branch bawaan repository-nya, membaca `registry.json` dari
root, menemukan item berdasarkan namanya, lalu mengambil tiap `files[].path` dari
commit yang sama. Semua berkas satu item berasal dari satu commit, jadi branch yang bergerak
di tengah pemasangan tidak akan menghasilkan komponen setengah jadi.

### Mengunci ke branch, tag, atau commit

Tambahkan `#ref` untuk memasang dari selain branch bawaan:

```bash
npx shadcn-vue@latest add owner/repo/hello-world#main
npx shadcn-vue@latest add owner/repo/hello-world#v1.2.0
npx shadcn-vue@latest add owner/repo/hello-world#1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
```

Kalau ada nama yang ambigu, branch didahulukan daripada tag. Tag beranotasi akan mengarah ke
commit yang ditunjuknya.

### Melihat apa saja yang diterbitkan sebuah repository

```bash
npx shadcn-vue@latest search owner/repo
```

### Hanya pasang dari repository yang Anda percaya

Menambahkan item registry berarti menjalankan kode pihak ketiga di mesin Anda. Ini berlaku untuk
registry mana pun — yang di-hosting, lokal, maupun GitHub — tapi bentuk GitHub perlu
disorot karena tidak butuh konfigurasi sama sekali, sehingga satu perintah dari sebuah README sudah
cukup untuk memasang dari repository yang belum pernah Anda periksa.

Sebuah item registry bisa mencantumkan `dependencies` npm, yang dipasang CLI lewat
package manager Anda — dan package manager itu menjalankan script instalasi paket tersebut. Ia juga bisa
menulis berkas ke dalam project Anda. Perlakukan `npx shadcn-vue@latest add owner/repo/item`
dengan kehati-hatian yang sama seperti `npm install owner-repo` — periksa dulu registry-nya kalau Anda
do not know who owns it.

CLI memang menolak nilai `path` dan `target` yang absolut atau memakai `..` untuk
keluar dari project, baik pada item yang Anda minta maupun saat berkasnya benar-benar
ditulis. Itu penjaga terhadap kekeliruan dan trik paling mudah dari item berniat jahat — tapi
bukan sebuah sandbox.

### Catatan

- **Nama item boleh memuat garis miring.** `owner/repo/forms/login` memasang item
  yang *bernama* `forms/login` dari `registry.json` di root. Itu bukan path menuju sebuah
  nested `registry.json`.
- **The repository must be public.** `raw.githubusercontent.com` does not serve
  repository privat. Untuk itu, pakai registry ter-hosting dengan [autentikasi](#menambahkan-autentikasi).
- **Git wajib terpasang.** CLI memanggil `git ls-remote` untuk menemukan ref-nya —
  itulah yang membuatnya bisa menemukan branch bawaan alih-alih menebak `main`.
- **`registryDependencies` diselesaikan seperti biasa.** URL lengkap diambil
  apa adanya; nama polos seperti `button` dicari di registry `shadcn-vue`
  bawaan, persis seperti item registry lainnya. Perlu dicatat, sebuah
  dependency bisa menunjuk ke mana saja — jadi mempercayai sebuah repository berarti mempercayai apa yang
  depends on too.

Kalau Anda enggan mengetik nama repository di tiap perintah, daftarkan sebuah
namespace di `components.json` lalu pasang lewat namespace itu. Namespace menunjuk ke
template URL registry ter-hosting — bukan ke repository GitHub — jadi ini
alternatif dari bentuk GitHub di atas, bukan penyingkatnya:

```json title="components.json"
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

```bash
npx shadcn-vue@latest add @acme/hello-world
```

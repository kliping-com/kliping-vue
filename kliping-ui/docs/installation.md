---
title: Instalasi
description: Cara memasang dependensi dan menata struktur aplikasi Anda.
---

## Pilih Framework Anda

Mulai dengan memilih framework yang Anda pakai, lalu ikuti langkahnya untuk memasang
dependensi dan menata struktur aplikasi. Kliping dirancang agar bisa jalan di semua
framework berbasis Vue.

Kalau Anda belum yakin mau pakai apa, **Vite** adalah titik awal paling ringan, sedangkan
**Nuxt** cocok kalau Anda butuh routing dan SSR sejak awal.

<div class="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
  [Vite
      
    
    Vite](/installation/vite)
  [Nuxt
    
    
    Nuxt](/installation/nuxt)
  [Astro
      
    
    Astro](/installation/astro)
  [Laravel](/installation/laravel)
  [Manual](/installation/manual)
</div>

## Ekstensi VSCode

Kalau Anda memakai Visual Studio Code, ada ekstensi
[shadcn-vue](https://marketplace.visualstudio.com/items?itemName=Selemondev.shadcn-vue)
buatan [@selemondev](https://github.com/selemondev) yang mempercepat proses menambahkan
komponen. Karena Kliping memakai CLI yang sama, ekstensi ini juga bekerja di sini.

Fitur yang ditawarkan:

- Menjalankan inisialisasi CLI.
- Memasang komponen tanpa mengetik perintah manual.
- Membuka dokumentasi langsung dari editor.
- Melompat ke halaman dokumentasi komponen tertentu dari dalam IDE.
- Snippet untuk import dan markup komponen secara cepat.

::: tip Catatan soal sumber komponen
Ekstensi dan CLI ini mengambil komponen dari registry shadcn-vue. Untuk saat ini isinya
  sama persis dengan komponen Kliping, karena Kliping di-fork dari shadcn-vue v2.8.2 dan
  belum mengubah komponen primitifnya. Kalau Anda ingin menarik dari registry Kliping
  secara eksplisit, arahkan lewat variabel lingkungan `SHADCN_VUE_URL`:

  ```bash
  SHADCN_VUE_URL=https://kliping.pro npx shadcn-vue@latest add button
  ```
:::

---
title: Direktori Registry
description: Temukan registry komunitas berisi komponen dan block yang kompatibel.
navigation:
  title: Direktori
---

Registry berikut sudah tertanam di dalam CLI, jadi tidak perlu konfigurasi tambahan. Untuk menambahkan komponen, jalankan: `npx shadcn-vue@latest add @<registry>/<komponen>`.

::callout{class="bg-muted font-semibold"}
Registry komunitas dikelola oleh pengembang pihak ketiga. Selalu periksa kodenya saat dipasang, pastikan sesuai standar keamanan dan kualitas Anda.
::

Registry yang Anda cari belum terdaftar? Pelajari cara [menambahkannya di sini](/docs/registry/getting-started).

::registry-directory
::

## Dokumentasi

CLI `shadcn-vue` bisa Anda pakai untuk menjalankan registry kode Anda sendiri. Dengan begitu Anda bisa mendistribusikan komponen, composable, halaman, konfigurasi, aturan, dan berkas lain buatan Anda ke project mana pun.

<div class="mt-6 grid gap-4 sm:grid-cols-2">
  <linked-card href="/docs/registry/getting-started" class="items-start text-sm md:p-6">
    <div class="font-medium">Memulai</div>
    <div class="text-muted-foreground">Menyiapkan dan membangun registry Anda sendiri</div>
  </linked-card>
  <linked-card href="/docs/registry/examples" class="items-start text-sm md:p-6">
    <div class="font-medium">Contoh</div>
    <div class="text-muted-foreground">Contoh item registry beserta konfigurasinya</div>
  </linked-card>
  <linked-card href="/docs/registry/registry-json" class="items-start text-sm md:p-6">
    <div class="font-medium">registry.json</div>
    <div class="text-muted-foreground">Spesifikasi skema untuk registry.json</div>
  </linked-card>
  <linked-card href="/docs/registry/registry-item-json" class="items-start text-sm md:p-6">
    <div class="font-medium">registry-item.json</div>
    <div class="text-muted-foreground">Spesifikasi skema untuk item registry</div>
  </linked-card>
  <linked-card href="/docs/registry/faq" class="items-start text-sm md:p-6">
    <div class="font-medium">Tanya Jawab</div>
    <div class="text-muted-foreground">Pertanyaan yang sering diajukan</div>
  </linked-card>
</div>

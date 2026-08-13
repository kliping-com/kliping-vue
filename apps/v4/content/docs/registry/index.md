---
title: Registry
description: Run your own component registry.
---

<Callout class="mt-0" >

  **Catatan:** fitur ini masih eksperimental. Bantu kami menyempurnakannya dengan
  mencobanya dan mengirim masukan. Kalau ada pertanyaan, silakan [hubungi
  kami](https://github.com/kliping-com/kliping-vue/discussions).

</Callout>

CLI `shadcn-vue` bisa Anda pakai untuk menjalankan registry komponen Anda sendiri. Dengan begitu Anda bisa mendistribusikan komponen, composable, halaman, dan berkas lain buatan Anda ke project Vue mana pun.

Item registry otomatis kompatibel dengan CLI `shadcn-vue`.

## Persyaratan

Anda bebas merancang dan meng-hosting registry Anda sendiri. Syaratnya hanya satu: item registry Anda harus berupa berkas JSON sah yang sesuai [spesifikasi skema registry-item](/docs/registry/registry-item-json).

<!-- If you'd like to see an example of a registry, we have a [template project](https://github.com/shadcn-ui/registry-template) for you to use as a starting point. -->

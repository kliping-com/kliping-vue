---
title: Pengenalan
description: Kliping adalah kumpulan komponen Vue yang rapi, mudah diakses, dan siap Anda gunting-tempel ke project sendiri. Kodenya jadi milik Anda, bukan dependency.
---

**Ini bukan library komponen. Ini cara Anda membangun library komponen Anda sendiri.**

Anda mungkin sudah hafal cara kerja library komponen pada umumnya: pasang paketnya dari
NPM, import komponennya, lalu pakai di aplikasi Anda.

Cara itu aman-aman saja — sampai Anda perlu mengubah satu komponen agar cocok dengan
design system Anda, atau butuh komponen yang ternyata tidak ada di library tersebut.
**Ujung-ujungnya Anda membungkus komponen library dengan komponen sendiri, menulis akal-akalan
untuk menimpa style-nya, atau mencampur komponen dari beberapa library yang API-nya
tidak saling cocok.**

Inilah yang ingin diselesaikan Kliping. Namanya diambil dari cara kerjanya: sama seperti
membuat kliping koran, Anda **gunting komponen yang Anda butuhkan, tempel ke project Anda**,
lalu bebas mencoret-coretnya sesuka hati.

Kliping dibangun di atas beberapa prinsip:

- **Kode Terbuka:** Lapisan paling atas dari kode komponen Anda terbuka untuk diubah.
- **Komposisi:** Setiap komponen memakai antarmuka yang sama dan bisa disusun, jadi perilakunya mudah ditebak.
- **Distribusi:** Skema file datar dan sebuah CLI membuat komponen gampang dibagikan.
- **Default yang Rapi:** Style bawaannya dipilih dengan cermat, jadi tampilannya sudah bagus sejak awal.
- **Siap untuk AI:** Kode yang terbuka mudah dibaca, dipahami, dan diperbaiki oleh LLM.

## Kode Terbuka

Kliping menyerahkan kode komponennya langsung ke tangan Anda. Anda punya kendali penuh untuk
mengubah dan mengembangkannya. Artinya:

- **Transparan Sepenuhnya:** Anda bisa melihat persis bagaimana setiap komponen dibangun.
- **Gampang Dikustomisasi:** Ubah bagian mana pun dari sebuah komponen agar sesuai kebutuhan desain dan fungsi Anda.
- **Ramah AI:** Karena kodenya ada di project Anda, LLM bisa membacanya, memahaminya, bahkan ikut memperbaikinya.

_Di library biasa, kalau Anda mau mengubah perilaku sebuah tombol, Anda harus menimpa style-nya
atau membungkus komponennya. Dengan Kliping, Anda cukup membuka file tombolnya dan mengeditnya._

<accordion collapsible>
  <accordion-item value="faq-1" class="border-none">
    <accordion-trigger>
      Kalau kodenya sudah saya tempel, bagaimana cara menarik pembaruan dari sumbernya?
    </accordion-trigger>
    <accordion-content>
      <p>
        Kliping memakai arsitektur headless component. Inti dari aplikasi Anda tetap
        menerima perbaikan lewat pembaruan dependency, misalnya Reka UI atau input-otp.
      </p>
      <p class="mt-4">
        Lapisan paling atas — yang paling dekat dengan design system Anda — memang sengaja
        tidak terikat pada implementasi library. Bagian itu tetap terbuka untuk Anda ubah.
      </p>
    </accordion-content>
  </accordion-item>
</accordion>

## Komposisi

Setiap komponen di Kliping memakai antarmuka yang sama dan bisa disusun ulang.
**Kalau sebuah komponen belum ada, kami bawa masuk, kami buat bisa dikomposisikan, lalu kami
sesuaikan style-nya agar menyatu dengan sisa design system.**

_Antarmuka yang seragam berarti perilakunya mudah ditebak, baik oleh tim Anda maupun oleh LLM.
Anda tidak perlu menghafal API yang berbeda-beda untuk setiap komponen baru — termasuk untuk
komponen dari pihak ketiga._

## Distribusi

Kliping juga sebuah sistem distribusi kode. Ada skema yang mendefinisikan komponen, dan ada
CLI untuk menyalurkannya.

- **Skema:** Struktur file datar yang mendefinisikan komponen, dependensinya, dan propertinya.
- **CLI:** Alat baris perintah untuk mendistribusikan dan memasang komponen antar-project, lintas framework.

_Skema ini bisa Anda pakai untuk mendistribusikan komponen Anda sendiri ke project lain, atau
untuk meminta AI membuat komponen baru berdasarkan skema yang sudah ada._

## Default yang Rapi

Kliping datang dengan banyak komponen yang style bawaannya sudah dipikirkan matang-matang.
Masing-masing dirancang agar enak dilihat sendirian, sekaligus tetap serasi saat dipakai bersama:

- **Langsung Enak Dipakai:** Tampilan aplikasi Anda sudah bersih dan minimal tanpa usaha tambahan.
- **Desain yang Menyatu:** Komponen-komponennya saling cocok satu sama lain, jadi UI Anda tetap konsisten.
- **Tetap Mudah Diubah:** Kalau ada yang ingin Anda ganti, menimpa dan mengembangkan default-nya gampang.

## Siap untuk AI

Cara Kliping dirancang membuat AI mudah bekerja dengan kode Anda. Kode yang terbuka dan API yang
konsisten memudahkan model AI membaca, memahami, bahkan membuat komponen baru.

_Sebuah model AI bisa mempelajari cara kerja komponen Anda lalu menyarankan perbaikan, atau
membuat komponen baru yang menyatu dengan yang sudah ada._

## Hubungannya dengan shadcn-vue

Kliping adalah fork dari [shadcn-vue](https://github.com/unovue/shadcn-vue) v2.8.2, yang
sendirinya merupakan port Vue dari [shadcn/ui](https://ui.shadcn.com). Kami tidak menutup-nutupi itu —
lisensinya MIT dan atribusinya tercantum jelas.

Yang membedakan Kliping:

- **Dokumentasi Bahasa Indonesia.** Ditulis ulang dari nol, bukan hasil terjemahan mesin,
  supaya penjelasannya benar-benar nyambung buat pembaca Indonesia.
- **Titik fork yang tetap.** Kliping berangkat dari satu commit yang jelas, bukan mengekor
  upstream terus-menerus. Tidak ada breaking change yang datang tanpa Anda minta.
- **Tanpa backend.** Murni UI: tidak ada auth, tidak ada database, tidak ada permukaan serangan.

Daftar kredit selengkapnya ada di [README repo Kliping](https://github.com/kliping-com/kliping-vue#kredit).

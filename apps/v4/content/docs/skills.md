---
title: Skills
description: Membekali asisten AI Anda dengan pemahaman mendalam soal komponen, pola, dan praktik terbaik di Kliping.
---

Skill memberi asisten AI seperti Claude Code konteks yang sadar-project soal komponen di sini. Setelah dipasang, asisten AI Anda tahu cara menemukan, memasang, menyusun, dan menyesuaikan komponen memakai API dan pola yang tepat untuk project Anda.

Contohnya, Anda bisa meminta asisten AI Anda:

- _"Tambahkan form login dengan isian email dan kata sandi."_
- _"Buatkan halaman pengaturan berisi form untuk memperbarui data profil."_
- _"Bangun dashboard dengan sidebar, kartu statistik, dan data table."_
- _"Ganti ke --preset [KODE]"_

Skill ini membaca `components.json` di project Anda lalu memberi tahu asisten soal framework, alias, komponen yang sudah terpasang, library ikon, dan base library Anda — supaya kode yang dihasilkan benar sejak percobaan pertama.

---

## Pemasangan

```bash
npx skills add unovue/shadcn-vue
```

Perintah ini memasang skill shadcn-vue ke project Anda. Setelah terpasang, asisten AI Anda otomatis memuatnya setiap kali bekerja dengan komponen tersebut.

Learn more about skills at [skills.sh](https://skills.sh).

---

## Isinya Apa Saja

Skill ini membekali asisten AI Anda dengan pengetahuan berikut:

### Konteks Project

Di tiap interaksi, skill menjalankan `shadcn-vue info --json` untuk membaca konfigurasi project Anda: framework, versi Tailwind, alias, base library (`reka`), library ikon, komponen yang terpasang, dan path berkas yang sudah diselesaikan.

### Perintah CLI

Referensi lengkap semua perintah CLI: `init`, `add`, `search`, `view`, `docs`, `diff`, `info`, dan `build` — beserta flag, alur smart merge, preset, dan template-nya.

### Tema dan Kustomisasi

Cara kerja CSS variable, warna OKLCH, mode gelap, warna kustom, radius sudut, dan varian komponen — lengkap dengan panduan untuk Tailwind v3 maupun v4.

### Membuat Registry

Cara membangun dan menerbitkan registry komponen sendiri: format `registry.json`, jenis item, objek berkas, dependency, CSS variable, proses build, hosting, dan konfigurasi penggunanya.

### Server MCP

Cara menyiapkan server MCP shadcn-vue beserta tool-nya, yang memungkinkan asisten AI mencari, menelusuri, dan memasang komponen dari registry.

---

## Cara Kerjanya

1. **Deteksi project** — skill aktif begitu menemukan berkas `components.json` di project Anda.
2. **Penyuntikan konteks** — skill menjalankan `shadcn-vue info --json` untuk membaca konfigurasi project Anda, lalu menyisipkan hasilnya ke konteks asisten.
3. **Penegakan pola** — asisten mengikuti aturan komposisi yang berlaku: memakai `FieldGroup` untuk form, `ToggleGroup` untuk kumpulan pilihan, warna bermakna, dan API yang sesuai base-nya.
4. **Penelusuran komponen** — asisten memakai `shadcn-vue docs`, `shadcn-vue search`, atau tool MCP untuk menemukan komponen beserta dokumentasinya sebelum menulis kode.

## Bacaan Lanjutan

- [CLI](/docs/06.cli) — Full CLI command reference
- [Server MCP](/docs/mcp) — menyambungkan server MCP untuk mengakses registry
- [Tema & Kustomisasi](/docs/theming) — CSS variable dan penyesuaian tampilan
- [Registry](/docs/registry) — membangun dan menerbitkan registry sendiri
- [skills.sh](https://skills.sh) — Learn more about AI skills

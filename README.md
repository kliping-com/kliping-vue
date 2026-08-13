# Kliping

**Komponen Vue siap klip, siap pakai.**

Kliping bukan library komponen yang Anda pasang lewat NPM lalu dipakai apa adanya.
Kliping adalah kumpulan komponen yang Anda **gunting dan tempel** langsung ke dalam
project — kodenya jadi milik Anda, bukan dependency yang cuma bisa Anda tunggu update-nya.

Semua dokumentasi ditulis dalam **Bahasa Indonesia**, dari nol, untuk developer Vue Indonesia.

![Kliping](apps/v4/public/opengraph-image.png)

## Kenapa Kliping?

- **Kode terbuka, bukan kotak hitam** — komponen masuk ke folder Anda sebagai file `.vue` biasa.
  Mau ubah radius tombol? Buka filenya, edit. Tidak perlu `!important` atau wrapper.
- **Stabil jangka panjang** — Kliping di-fork dari titik commit yang jelas, bukan mengikuti
  upstream terus-menerus. Tidak ada breaking change yang datang tiba-tiba.
- **Dokumentasi Bahasa Indonesia** — bukan hasil terjemahan mesin, tapi ditulis ulang supaya
  penjelasannya masuk akal buat pembaca Indonesia, termasuk yang baru mulai belajar Vue.
- **Tanpa backend** — murni UI. Tidak ada auth, tidak ada database, tidak ada permukaan serangan.

## Mulai dari mana

Dokumentasi lengkap ada di **[kliping.pro/docs](https://kliping.pro/docs)**.

Kalau Anda baru pertama kali, mulai dari
[Pengenalan](https://kliping.pro/docs) lalu lanjut ke
[Instalasi](https://kliping.pro/docs/installation).

## Menjalankan secara lokal

Repo ini adalah monorepo yang dikelola dengan [pnpm](https://pnpm.io).

```bash
# Pasang dependensi
pnpm install

# Jalankan website + dokumentasi di http://localhost:3000
pnpm dev
```

Perintah lain yang sering dipakai:

```bash
pnpm build             # Build website untuk produksi
pnpm registry:build    # Bangun ulang registry setelah menambah/mengubah komponen
pnpm lint:fix          # Rapikan kode dengan ESLint
pnpm test              # Jalankan semua test
```

## Struktur project

```
kliping-vue/
├── apps/v4/                 Website, dokumentasi, dan sumber komponen
│   ├── content/docs/        Dokumentasi Bahasa Indonesia (.md)
│   ├── registry/            Sumber komponen — ini yang Anda klip
│   └── ...
├── packages/cli/            CLI untuk menambahkan komponen otomatis
├── templates/               Template starter (vite, nuxt, astro, laravel)
└── skills/                  Dokumentasi untuk AI coding tools
```

## Berkontribusi

Silakan baca [panduan kontribusi](/CONTRIBUTING.md) sebelum mengirim pull request.

## Kredit

Kliping berdiri di atas kerja keras orang lain, dan itu tidak kami sembunyikan:

- [shadcn-vue](https://github.com/unovue/shadcn-vue) oleh [unovue](https://github.com/unovue) —
  fondasi yang kami fork (v2.8.2).
- [shadcn/ui](https://ui.shadcn.com) oleh [shadcn](https://shadcn.com) —
  metodologi, desain, dan ide "open code" yang jadi dasar semuanya.
- [Reka UI](https://reka-ui.com) — komponen headless yang menyalakan sebagian besar primitif di sini.

## Lisensi

MIT. Lihat [LICENSE](/LICENSE).

Rantai lisensinya bersih: shadcn/ui (MIT) → shadcn-vue (MIT) → Kliping (MIT).

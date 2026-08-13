# Panduan Kontribusi

Terima kasih sudah tertarik ikut membangun Kliping. Senang Anda ada di sini.

Sebelum mengirim pull request pertama, luangkan waktu sebentar membaca dokumen ini. Kami
juga menyarankan Anda mengecek issue dan pull request yang sedang terbuka, siapa tahu ada
orang lain yang sudah mengerjakan hal serupa.

## Tentang repo ini

Repo ini adalah monorepo yang dikelola dengan [pnpm](https://pnpm.io) dan
[workspaces](https://pnpm.io/workspaces).

```
apps
└── v4
    ├── components
    ├── content
    └── registry
        └── new-york-v4
            ├── example
            └── ui
packages
└── cli
```

| Path | Keterangan |
| --- | --- |
| `apps/v4` | Aplikasi Nuxt untuk website dan dokumentasi. |
| `apps/v4/components` | Komponen Vue untuk website itu sendiri. |
| `apps/v4/content` | Isi dokumentasi dalam format markdown. |
| `apps/v4/registry` | Sumber komponen yang bisa diklip. |
| `packages/cli` | Paket CLI `shadcn-vue`. |

## Menjalankan secara lokal

Clone repo:

```bash
git clone git@github.com:kliping-com/kliping-vue.git
```

Pasang dependensi:

```bash
pnpm install
```

Jalankan website:

```bash
pnpm dev
```

Untuk menjalankan paket CLI:

```bash
pnpm dev:cli
```

Anda juga bisa menyasar satu workspace langsung dengan `pnpm --filter=[WORKSPACE]`.

## Dokumentasi

Dokumentasi tinggal di workspace `v4` dan ditulis dengan [Nuxt Content](https://content.nuxt.com/).
File-filenya ada di `apps/v4/content`. Jalankan `pnpm dev` untuk melihat hasilnya secara lokal.

**Dokumentasi Kliping ditulis dalam Bahasa Indonesia.** Beberapa panduan gaya:

- Gunakan **"Anda"**, bukan "kamu" — nadanya lebih pas untuk dokumentasi.
- Istilah teknis yang tidak punya padanan baku tetap ditulis dalam bahasa Inggris:
  *component*, *props*, *slot*, *emit*, *block*.
- Jelaskan dari dasar. Banyak pembaca kami baru mulai belajar Vue.
- Tulis ulang secara natural, jangan menerjemahkan kata per kata.

Contoh yang kami hindari dan yang kami tuju:

| Hindari | Tulis begini |
| --- | --- |
| "Komponen ini adalah sebuah komponen yang digunakan untuk..." | "Accordion menampilkan konten yang bisa dibuka dan ditutup..." |
| "Install dependencies" | "Pasang dependensi" |
| "This component supports..." | "Komponen ini mendukung..." |

## Komponen

Kami memakai sistem registry untuk mengembangkan komponen. Kode sumbernya ada di
`apps/v4/registry`, dikelompokkan per style.

Saat menambah atau mengubah komponen, pastikan:

1. Perubahan diterapkan ke semua style yang relevan.
2. Dokumentasinya ikut diperbarui.
3. Anda menjalankan `pnpm registry:build` untuk memperbarui registry.

Jangan mengedit isi `apps/v4/__registry__/` dan `apps/v4/public/r/` secara manual — keduanya
dihasilkan otomatis oleh script build.

## Konvensi commit

Sebelum membuat pull request, pastikan commit Anda mengikuti konvensi
`kategori(scope atau modul): pesan`, dengan salah satu kategori berikut:

- `feat` / `feature` — kode atau fitur yang benar-benar baru.
- `fix` — perbaikan bug. Kalau ada issue terkait, sebutkan nomornya.
- `refactor` — perubahan kode yang bukan perbaikan bug maupun fitur baru.
- `docs` — menulis atau memperbarui dokumentasi.
- `build` — perubahan pada proses build atau dependensi.
- `test` — menambah atau mengubah test.
- `ci` — perubahan konfigurasi continuous integration.
- `chore` — perubahan lain yang tidak masuk kategori mana pun di atas.

Contoh: `feat(components): tambah prop baru pada komponen avatar`

Spesifikasi lengkapnya ada di [Conventional Commits](https://www.conventionalcommits.org/).

## Mengusulkan komponen baru

Punya ide komponen baru? Buka diskusi di GitHub. Kami senang membahasnya bersama Anda.

## CLI

Paket `shadcn-vue` di `packages/cli` adalah CLI untuk menambahkan komponen ke project.
Dokumentasi pemakaiannya ada di [halaman CLI](https://kliping.pro/docs/cli).

Untuk saat ini Kliping masih memakai CLI dari upstream, jadi perubahan di sini sebaiknya
dijaga tetap kompatibel. Kalau Anda mengubah sesuatu, akan sangat membantu bila disertai test.

## Testing

Test ditulis dengan [Vitest](https://vitest.dev) dan dijalankan dari root repo:

```bash
pnpm test
```

Pastikan semua test lulus sebelum mengirim pull request. Kalau Anda menambah fitur baru,
sertakan test-nya juga.

## Lisensi

Dengan berkontribusi ke Kliping, Anda setuju kontribusi Anda dilisensikan di bawah
[lisensi MIT](/LICENSE).

# 🗺️ KLIPING — Roadmap

> Versi kurasi, disusun ulang setelah percobaan fork-utuh.
> Diperbarui: Agustus 2026
> Pasangan dari KLIPING-SETUP.md

---

## 🎯 Ringkasan Project

**Kliping** adalah library komponen Vue dengan dokumentasi Bahasa Indonesia.
Filosofinya: **gunting tempel komponen semudah membuat kliping koran** — kodenya jadi
milik Anda, bukan dependency yang cuma bisa ditunggu update-nya.

---

## ✅ Keputusan Final

| Aspek | Keputusan |
|---|---|
| Nama | Kliping |
| Domain | `kliping.pro` |
| Filosofi | Gunting tempel — salin, tempel, kodenya milik Anda |
| Sumber komponen | Diangkut dari `unovue/shadcn-vue` v2.8.2 (`registry/new-york-v4`) |
| Lisensi | MIT, dengan atribusi berantai |
| Stack | Vite + Vue 3 + TypeScript + Tailwind v4 + reka-ui |
| Dokumentasi | VitePress, Bahasa Indonesia |
| Deploy | Statis ke Cloudflare Pages |
| Server/DB | Tidak ada — statis sepenuhnya |
| DX | Gunting-tempel manual di fase awal, CLI menyusul |

### Yang berubah dari rencana sebelumnya

Rencana lama memakai fork utuh `unovue/shadcn-vue`. Itu membawa serta seluruh app
Nuxt-nya, yang bertabrakan dengan dua keputusan di atas: "Vue saja, bukan Nuxt" dan
"tidak ada server/DB".

Bukan salah keputusannya — itu konsekuensi teknis dari cara fork bekerja. `git clone`
mengambil semuanya, tidak bisa sebagian.

Sekarang komponennya diangkut, bukan repo-nya di-fork.

---

## 🏛️ Arsitektur Layer

```
┌─────────────────────────────────────┐
│         TEMPLATE / SHOWCASE          │  ← halaman utuh siap pakai
├─────────────────────────────────────┤
│               BLOCK                  │  ← hero, pricing, navbar...
├─────────────────────────────────────┤
│        KOMPONEN KLIPING              │  ← animated text, glow card...
├─────────────────────────────────────┤
│           PRIMITIF                   │  ← button, input, dialog...
└─────────────────────────────────────┘
```

- **Primitif** — 65 komponen diangkut apa adanya, tidak diubah tanpa alasan kuat
- **Komponen Kliping** — dibangun di atas primitif, terinspirasi Magic UI dan Aceternity
- **Block** — susunan komponen menjadi satu section halaman
- **Template** — gabungan block menjadi halaman utuh

---

## 📦 Modal Awal

Yang sudah tersedia dan tinggal diangkut:

| Isi | Jumlah | Ukuran |
|---|---|---|
| Komponen primitif | 65 | 2,2 MB |
| Block siap pakai | 33 | 864 KB |
| Chart | 23 berkas | — |
| Dokumentasi Bahasa Indonesia | 112 berkas `.md` | — |

**Block yang sudah ada** — jangan dibuat ulang:
`dashboard-01`, `login-01..05`, `otp-01..05`, `products-01`, `sidebar-01..16`,
`sidebar-demo`, `signup-01..05`

**Dokumentasi Bahasa Indonesia sudah selesai 100%.** Tersimpan di fork pada
`apps/v4/content/docs/`. Yang perlu dikerjakan hanya konversi sintaks dari Nuxt Content
ke VitePress — prosanya utuh, tidak perlu diterjemahkan ulang. Rinciannya ada di
KLIPING-SETUP.md.

---

## 🚀 PHASE 0 — Fondasi

> **Tujuan:** Project berdiri, satu komponen render, deploy statis jalan.

- [ ] `npm create vite@latest kliping-ui -- --template vue-ts`
- [ ] Pasang dependensi inti dan Tailwind v4
- [ ] Atur alias `@` di `vite.config.ts` dan `tsconfig.app.json`
- [ ] Buat `src/lib/utils.ts` berisi `cn()`
- [ ] Salin token tema ke `src/assets/main.css`
- [ ] Angkut komponen `button`, pastikan render dan variannya bekerja
- [ ] `LICENSE` dengan atribusi berantai
- [ ] `README.md` Bahasa Indonesia
- [ ] Repo GitHub dibuat, push pertama

**Selesai kalau:** satu tombol muncul di `npm run dev` dengan varian yang benar.

---

## 🧩 PHASE 1 — Angkut Komponen

> **Tujuan:** 65 komponen primitif jalan di codebase baru.
> **Cara:** bertahap, sekelompok kecil, diverifikasi tiap langkah.

Urutan yang disarankan — dari yang paling sedikit ketergantungannya:

| Gelombang | Komponen | Dependensi tambahan |
|---|---|---|
| 1 | button, label, input, textarea, badge, separator, skeleton, kbd, spinner, aspect-ratio | — |
| 2 | card, alert, avatar, progress, toggle, switch, checkbox, radio-group, table | — |
| 3 | dialog, alert-dialog, sheet, drawer, popover, tooltip, hover-card, collapsible, accordion | — |
| 4 | dropdown-menu, context-menu, menubar, navigation-menu, command, combobox, select, tabs | — |
| 5 | field, form, input-group, button-group, item, empty, breadcrumb, pagination | `vee-validate`, `zod` |
| 6 | calendar, range-calendar | `@internationalized/date` |
| 7 | carousel | `embla-carousel-vue` |
| 8 | input-otp, pin-input | `vue-input-otp` |
| 9 | sonner | `vue-sonner` |
| 10 | chart | `@unovis/vue`, `@unovis/ts` |
| 11 | sidebar, resizable, scroll-area, stepper, slider, tags-input, number-field, native-select, toggle-group | — |
| 12 | message, message-scroller, bubble, marker, attachment, questionnaire | — |

**Aturan tiap gelombang:** salin → sesuaikan path impor → render satu contoh → baru lanjut.

**Komponennya disalin, bukan ditulis ulang.** Sudah diperiksa: nol API Nuxt, nol
ketergantungan auto-import. Yang perlu disesuaikan hanya path alias, satu perintah `sed`.
Rinciannya di KLIPING-SETUP.md bagian "Salin-Tempel atau Tulis Ulang?".

### Checklist

- [ ] Gelombang 1–4 selesai (komponen tanpa dependensi tambahan)
- [ ] Gelombang 5–10 selesai (yang butuh paket tambahan)
- [ ] Gelombang 11–12 selesai
- [ ] `npm run build` lolos tanpa error TypeScript

---

## 📚 PHASE 2 — Situs Dokumentasi

> **Tujuan:** dokumentasi Bahasa Indonesia hidup di VitePress.

- [ ] Pasang VitePress, atur `docs/.vitepress/config.ts`
- [ ] Buat komponen pendukung: `<ComponentPreview>`, `<Steps>`
- [ ] Tulis skrip konversi sintaks Nuxt Content → VitePress
- [ ] Angkut 112 berkas `.md` dari fork, jalankan konversinya
- [ ] Angkut berkas demo yang dibutuhkan preview
- [ ] Periksa tautan internal dan anchor tidak putus
- [ ] Deploy statis ke Cloudflare Pages

**Catatan:** jangan menerjemahkan ulang. Prosa Indonesianya sudah selesai dan sudah
melewati penyuntingan. Yang dikerjakan murni konversi format.

### Checklist

- [ ] VitePress jalan lokal
- [ ] Halaman inti tampil benar (Pengenalan, Instalasi, Tema, CLI)
- [ ] 65 halaman komponen tampil dengan preview hidup
- [ ] Build statis lolos, di bawah 5 menit
- [ ] Live di `kliping.pro`

---

## 🧱 PHASE 3 — Block Landing Page

> **Tujuan:** melengkapi kategori block yang belum ada di upstream.
> **Target:** 3 varian per kategori = 30 block baru.

| Kategori | Folder | Target |
|---|---|---|
| Hero | `blocks/hero-01..03/` | 3 |
| Navbar | `blocks/navbar-01..03/` | 3 |
| Feature | `blocks/feature-01..03/` | 3 |
| Pricing | `blocks/pricing-01..03/` | 3 |
| FAQ | `blocks/faq-01..03/` | 3 |
| Testimonial | `blocks/testimonial-01..03/` | 3 |
| Logos | `blocks/logos-01..03/` | 3 |
| CTA | `blocks/cta-01..03/` | 3 |
| Footer | `blocks/footer-01..03/` | 3 |
| Contact | `blocks/contact-01..03/` | 3 |

### Checklist

- [ ] Pelajari `login-01` sebagai acuan struktur block
- [ ] Satu block hero sebagai bukti konsep
- [ ] 30 block selesai
- [ ] Semua responsif di mobile
- [ ] Semua mendukung mode gelap
- [ ] Dokumentasi Bahasa Indonesia tiap block

---

## ✨ PHASE 4 — Komponen Animasi

> **Tujuan:** yang membedakan Kliping dari shadcn-vue biasa.
> **Referensi:** magicui.design (MIT) dan inspira-ui.com (MIT, Vue)
> **Tech:** `@vueuse/motion`

| Komponen | Efek | Referensi |
|---|---|---|
| Animated Text | Shimmer, typewriter, gradient | Magic UI |
| Marquee | Deretan logo bergulir otomatis | Magic UI |
| Number Ticker | Angka naik saat masuk layar | Magic UI |
| Border Beam | Border cahaya berputar | Magic UI |
| Shimmer Button | Tombol berefek shimmer | Magic UI |
| Bento Grid | Tata letak grid bento | Magic UI |
| Glow Card | Card menyala saat hover | Aceternity |
| Spotlight | Sorotan mengikuti kursor | Aceternity |

### Checklist

- [ ] Pasang `@vueuse/motion`
- [ ] Port `AnimatedText`
- [ ] Port `Marquee`
- [ ] 8 komponen selesai
- [ ] Dokumentasi Bahasa Indonesia tiap komponen

---

## 🎨 PHASE 5 — Template

> **Tujuan:** halaman utuh siap pakai dari gabungan block.

| Template | Susunan |
|---|---|
| SaaS Landing | Hero + Feature + Pricing + CTA + Footer |
| Portfolio Developer | Hero + Project + Kontak |
| Startup | Hero + Logos + Feature + Testimonial + Footer |

### Checklist

- [ ] Tiga template selesai
- [ ] Pratinjau hidup di situs dokumentasi

---

## 🚢 PHASE 6 — Soft Launch

- [ ] Domain `kliping.pro` mengarah ke deployment
- [ ] Repo GitHub publik
- [ ] README final
- [ ] Aset visual: favicon, logo, gambar OG
- [ ] Post di X/Twitter, tag komunitas Vue Indonesia
- [ ] Sebar di grup WhatsApp dan Telegram Vue ID
- [ ] Submit ke registry.directory

---

## 📊 Ringkasan Phase

| Phase | Nama | Tujuan |
|---|---|---|
| **0** | Fondasi | Project berdiri, satu komponen render |
| **1** | Angkut Komponen | 65 primitif jalan |
| **2** | Dokumentasi | 112 halaman Bahasa Indonesia live |
| **3** | Block | 30 block landing page |
| **4** | Komponen Animasi | 8 komponen pembeda |
| **5** | Template | 3 halaman utuh |
| **6** | Soft Launch | Publik |

---

## 🎯 Target Pembaca

**Primer:** Mahasiswa Universitas Terbuka — kurikulum Vue
**Sekunder:** Developer Vue Indonesia, junior sampai senior
**Tersier:** Agency dan tim produk yang memakai Vue di Indonesia

Konsekuensinya pada gaya dokumentasi: jelaskan dari dasar, jangan asumsikan pembaca
sudah paham istilah.

---

## ✍️ Gaya Penulisan Dokumentasi

```
✅ Pakai "Anda", bukan "kamu" — nadanya lebih pas untuk dokumentasi
✅ Istilah teknis tanpa padanan baku tetap Inggris: component, props, slot, emit
✅ Jelaskan dari dasar
✅ Tulis ulang secara natural, jangan menerjemahkan kata per kata

❌ "Komponen ini adalah sebuah komponen yang digunakan untuk..."
✅ "Accordion menampilkan konten yang bisa dibuka dan ditutup..."

❌ "Install dependencies"
✅ "Pasang dependensi"
```

Yang **tidak** diterjemahkan: nama komponen, nama prop, nilai varian seperti `outline`
dan `ghost`, isi blok kode, dan keluaran perintah.

---

## 💡 Filosofi

> *"Kliping adalah cara gunting tempel komponen Vue semudah membuat kliping koran —
> Anda yang pegang kodenya, bukan dependency."*

---

## 🔗 Referensi

| Project | URL | Lisensi | Peran |
|---|---|---|---|
| shadcn-vue | github.com/unovue/shadcn-vue | MIT | Sumber komponen (v2.8.2) |
| shadcn/ui | ui.shadcn.com | MIT | Inspirasi metodologi |
| Reka UI | reka-ui.com | MIT | Primitif headless |
| Magic UI | magicui.design | MIT | Referensi komponen animasi |
| Inspira UI | inspira-ui.com | MIT | Port Vue dari Magic UI |

---

## ⚠️ Pelajaran dari Percobaan Sebelumnya

Percobaan fork-utuh gagal deploy berkali-kali di Cloudflare. Penyebabnya tercatat
lengkap di KLIPING-SETUP.md bagian "Jebakan yang Sudah Terbukti Memakan Waktu".
Ringkasnya: generator OG per halaman, crawler prerender tanpa batas, batas heap Node
yang kebesaran, dan kompresi aset saat build.

Keempatnya berasal dari app Nuxt bawaan fork. Dengan Vite dan VitePress statis,
tidak satu pun dari itu ada.

**Satu prinsip yang layak dipegang:** kalau sebuah kerumitan datang dari bagian yang
tidak pernah Anda pilih, mencabutnya lebih murah daripada menjinakkannya.

---

*Dokumen ini diperbarui setiap ada keputusan atau kemajuan baru.*

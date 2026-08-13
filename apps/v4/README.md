# apps/v4 — Website & Registry Kliping

Workspace ini adalah aplikasi [Nuxt 4](https://nuxt.com) yang menjalankan tiga hal sekaligus:

1. **Website** Kliping (halaman utama, blocks, charts, colors, themes).
2. **Dokumentasi** Bahasa Indonesia — sumbernya file `.md` di `content/docs/`.
3. **Registry** — sumber komponen yang bisa diklip, di `registry/`, disajikan sebagai JSON di `public/r/`.

## Menjalankan

Jalankan dari root repo, bukan dari folder ini:

```bash
pnpm install   # sekali di awal
pnpm dev       # http://localhost:3000
```

Kalau Anda memang ingin menjalankan workspace ini langsung:

```bash
pnpm --filter v4 dev
```

## Peta folder

| Folder | Isi |
|---|---|
| `content/docs/` | Dokumentasi Bahasa Indonesia. Ini yang Anda edit kalau mau menulis docs. |
| `registry/new-york-v4/` | Sumber komponen style utama Kliping — `ui/`, `blocks/`, `charts/`. |
| `registry/bases/reka/` | Varian style Reka UI (luma, lyra, maia, mira, nova, rhea, sera, vega). |
| `components/` | Komponen website itu sendiri, bukan komponen library. |
| `components/demo/` | File demo yang dipakai dokumentasi untuk menampilkan preview. |
| `pages/` | Route halaman website. |
| `scripts/` | Script build, termasuk `build-registry.ts`. |
| `public/r/` | **Auto-generated.** Registry JSON hasil build — jangan diedit manual. |
| `__registry__/` | **Auto-generated.** Index komponen untuk CLI — jangan diedit manual. |

## Setelah mengubah komponen

Setiap kali Anda menambah atau mengubah file di `registry/`, registry perlu dibangun ulang
supaya `public/r/` dan `__registry__/` ikut terbarui:

```bash
pnpm registry:build
```

## Build & deploy

```bash
pnpm --filter v4 build      # Build produksi
pnpm --filter v4 preview    # Cek hasil build secara lokal
pnpm --filter v4 typecheck  # Cek tipe TypeScript
```

Deploy menyasar Cloudflare Workers (preset `cloudflare-module`). Konfigurasinya ada di
`nuxt.config.ts` pada bagian `nitro.cloudflare.wrangler`.

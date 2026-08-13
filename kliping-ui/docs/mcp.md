---
title: Server MCP
description: Memakai server MCP untuk menelusuri, mencari, dan memasang komponen dari registry.
---

Server MCP memungkinkan asisten AI berinteraksi dengan item di dalam registry. Anda bisa menelusuri komponen yang tersedia, mencari yang spesifik, dan memasangnya langsung ke project — cukup lewat bahasa sehari-hari.

Contohnya, Anda bisa meminta asisten AI: "Bangun halaman landing memakai komponen dari registry acme" atau "Carikan form login dari registry shadcn".

Registry diatur di berkas `components.json` project Anda.

```json  title="components.json" showLineNumbers
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

---

## Mulai Cepat

Pilih klien MCP yang Anda pakai, lalu ikuti langkah pengaturan server MCP-nya. Kalau Anda ingin mengaturnya sendiri secara manual, lihat bagian [Konfigurasi](#konfigurasi).

**Claude**

**Jalankan perintah berikut** di project Anda:

```bash
npx shadcn-vue@latest mcp init --client claude
```

**Mulai ulang Claude Code**, lalu coba perintah berikut:
- Tunjukkan semua komponen yang tersedia di registry shadcn
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry shadcn

**Catatan:** perintah `/mcp` di Claude Code bisa Anda pakai untuk men-debug server MCP-nya.

**Cursor**

**Jalankan perintah berikut** di project Anda:

```bash
npx shadcn-vue@latest mcp init --client cursor
```

Buka **Cursor Settings** lalu **aktifkan server MCP**-nya. Setelah itu coba perintah berikut:
- Tunjukkan semua komponen yang tersedia di registry shadcn
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry shadcn

**Vscode**

**Jalankan perintah berikut** di project Anda:

```bash
npx shadcn-vue@latest mcp init --client vscode
```

Buka `.vscode/mcp.json` lalu klik **Start** di samping server-nya. Setelah itu coba perintah berikut lewat GitHub Copilot:
- Tunjukkan semua komponen yang tersedia di registry shadcn
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry shadcn

**Codex**

::: tip 
**Catatan:** CLI `shadcn-vue` tidak bisa memperbarui `~/.codex/config.toml` secara otomatis. Untuk Codex, konfigurasinya perlu Anda tambahkan sendiri.

**Jalankan perintah berikut** di project Anda:

```bash
npx shadcn-vue@latest mcp init --client codex
```

**Lalu tambahkan konfigurasi berikut** ke `~/.codex/config.toml`:

```json title=".mcp.json" showLineNumbers
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn-vue@latest", "mcp"]
```

**Mulai ulang Codex**, lalu coba perintah berikut:
- Tunjukkan semua komponen yang tersedia di registry shadcn
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry shadcn
:::

**Opencode**

Pastikan opencode sudah terpasang. 

To install check [Opencode Documentation](https://opencode.ai/)

**Jalankan perintah berikut** di project Anda:
```bash
npx shadcn-vue@latest mcp init --client opencode
```
**Mulai ulang opencode**, lalu coba perintah berikut:
- Tunjukkan semua komponen yang tersedia di registry shadcn
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry shadcn

**Catatan:** tekan `Ctrl+x s` untuk melihat status server MCP-nya.

---

## Apa Itu MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) adalah protokol terbuka yang memungkinkan asisten AI terhubung secara aman ke sumber data dan tool di luar dirinya. Lewat server MCP ini, asisten AI Anda mendapat akses langsung untuk:

- **Menelusuri komponen** — melihat semua komponen, block, dan template yang tersedia di registry mana pun yang sudah diatur.
- **Search Across Registries** - Find specific components by name or functionality across multiple sources
- **Memasang lewat bahasa sehari-hari** — menambahkan komponen cukup dengan kalimat biasa, misalnya "tambahkan form login".
- **Mendukung banyak registry** — mengakses registry publik, pustaka internal perusahaan, maupun sumber pihak ketiga.

---

## Cara Kerjanya

Server MCP berperan sebagai jembatan antara asisten AI Anda, registry komponen, dan CLI-nya.

1. **Sambungan ke registry** — MCP terhubung ke registry yang sudah diatur: bawaan, registry privat, maupun sumber pihak ketiga.
2. **Bahasa sehari-hari** — Anda cukup menjelaskan apa yang dibutuhkan dengan kalimat biasa.
3. **Pemrosesan AI** — asisten menerjemahkan permintaan Anda menjadi perintah registry.
4. **Pengantaran komponen** — berkasnya diambil lalu dipasang ke project Anda.

---

## Registry yang Didukung

Server MCP ini langsung bisa dipakai dengan registry mana pun yang kompatibel.

- **Registry bawaan** — berisi seluruh komponen shadcn/ui.
- **Registry pihak ketiga** — registry mana pun yang mengikuti spesifikasi registry shadcn.
- **Private Registries** - Your company's internal component libraries
- **Registry ber-namespace** — beberapa registry sekaligus, diatur lewat sintaks `@namespace`.

---

## Konfigurasi

Klien MCP mana pun bisa Anda pakai untuk berinteraksi dengan server ini. Berikut langkahnya untuk yang paling populer.

### Claude Code

Untuk memakai server MCP ini di Claude Code, tambahkan konfigurasi berikut ke berkas `.mcp.json` project Anda:

```json title=".mcp.json" showLineNumbers
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn-vue@latest", "mcp"]
    }
  }
}
```

Setelah konfigurasinya ditambahkan, mulai ulang Claude Code lalu jalankan `/mcp` untuk melihat server-nya di daftar. Kalau statusnya `Connected`, berarti sudah siap.

Detail selengkapnya ada di [dokumentasi MCP Claude Code](https://docs.anthropic.com/en/docs/claude-code/mcp).

### Cursor

Untuk mengatur MCP di Cursor, tambahkan server-nya ke berkas konfigurasi `.cursor/mcp.json` project Anda:

```json title=".cursor/mcp.json" showLineNumbers
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn-vue@latest", "mcp"]
    }
  }
}
```

Setelah konfigurasinya ditambahkan, aktifkan server MCP-nya lewat Cursor Settings.

Begitu aktif, akan muncul titik hijau di samping nama server-nya pada daftar server MCP, beserta daftar tool yang tersedia.

Detail selengkapnya ada di [dokumentasi MCP Cursor](https://docs.cursor.com/en/context/mcp#using-mcp-json).

### VS Code

Untuk mengatur MCP di VS Code bersama GitHub Copilot, tambahkan server-nya ke berkas konfigurasi `.vscode/mcp.json` project Anda:

```json title=".vscode/mcp.json" showLineNumbers
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn-vue@latest", "mcp"]
    }
  }
}
```

Setelah konfigurasinya ditambahkan, buka `.vscode/mcp.json` lalu klik **Start** di samping nama server-nya.

Detail selengkapnya ada di [dokumentasi MCP VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

### Codex

::: tip 
**Catatan:** CLI `shadcn-vue` tidak bisa memperbarui `~/.codex/config.toml` secara otomatis. Konfigurasinya perlu Anda tambahkan sendiri.
:::

Untuk mengatur MCP di Codex, tambahkan server-nya ke `~/.codex/config.toml`:

```toml title="~/.codex/config.toml" showLineNumbers
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn-vue@latest", "mcp"]
```

Setelah konfigurasinya ditambahkan, mulai ulang Codex supaya server MCP-nya termuat.

### Opencode

Untuk mengatur MCP di opencode, tambahkan server-nya ke `opencode.json`:

```json title="opencode.json" showLineNumbers
{
    "$schema": "https://opencode.ai/config.json",
    "mcp": {
        "shadcnVue": {
            "type": "local",
            "enabled": true,
            "command": ["npx", "shadcn-vue@latest", "mcp"]
        }
    }
}
```
Detail selengkapnya ada di [dokumentasi Opencode](https://opencode.ai/docs/mcp-servers/).

---

## Mengatur Registry

Server MCP mendukung banyak registry sekaligus lewat konfigurasi `components.json` di project Anda. Dengan begitu Anda bisa mengambil komponen dari berbagai sumber, termasuk registry privat dan penyedia pihak ketiga.

Daftarkan registry tambahan di `components.json` Anda:

```json title="components.json" showLineNumbers
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

::: tip 
**Catatan:** untuk mengakses registry standar, tidak perlu konfigurasi apa pun.
:::

---

## Autentikasi

Untuk registry privat yang butuh autentikasi, isi variabel lingkungannya di `.env.local`:

```bash title=".env.local"
REGISTRY_TOKEN=your_token_here
API_KEY=your_api_key_here
```

Keterangan lengkap soal autentikasi registry ada di dokumentasi Autentikasi.

---

## Contoh Perintah

Setelah server MCP-nya diatur, Anda bisa berinteraksi dengan registry memakai bahasa sehari-hari. Coba salah satu perintah berikut:

### Menelusuri & Mencari

- Tunjukkan semua komponen yang tersedia di registry shadcn
- Carikan form login dari registry shadcn

### Memasang Item

- Tambahkan komponen button ke project saya
- Create a login form using shadcn components
- Pasang aturan Cursor dari registry acme

### Bekerja dengan Namespace

- Show me components from acme registry
- Install @internal/auth-form
- Bangunkan halaman landing memakai section hero, features, dan testimonials dari registry acme

---

## Mengatasi Masalah

### MCP Tidak Merespons

Kalau server MCP tidak merespons perintah Anda:

1. **Periksa konfigurasi** — pastikan server MCP sudah diatur dengan benar dan aktif di klien MCP Anda.
2. **Mulai ulang klien MCP** — setiap kali konfigurasinya berubah, mulai ulang kliennya.
3. **Pastikan sudah terpasang** — cek bahwa `shadcn-vue` benar-benar terpasang di project Anda.
4. **Periksa jaringan** — pastikan registry yang diatur memang bisa Anda akses.

### Masalah Akses Registry

If components aren't loading from registries:

1. **Periksa components.json** — pastikan URL registry-nya sudah benar.
2. **Uji autentikasi** — pastikan variabel lingkungan untuk registry privat sudah terisi.
3. **Cek registry-nya** — pastikan registry itu memang online dan bisa dijangkau.
4. **Periksa namespace** — pastikan sintaksnya benar (`@namespace/komponen`).

### Pemasangan Gagal

Kalau komponen gagal dipasang:

1. **Periksa penyiapan project** — pastikan berkas `components.json` Anda sah.
2. **Cek path-nya** — pastikan folder tujuannya memang ada.
3. **Periksa izin akses** — pastikan folder komponennya bisa ditulisi.
4. **Tinjau dependency** — pastikan semua dependency yang dibutuhkan sudah terpasang.

### Tool atau Prompt Tidak Muncul

Kalau muncul pesan `No tools or prompts`, coba langkah berikut:

1. **Bersihkan cache npx** — jalankan `npx clear-npx-cache`.
2. **Aktifkan ulang server MCP** — coba nonaktifkan lalu aktifkan lagi di klien MCP Anda.
3. **Periksa log** — di Cursor, log-nya bisa dilihat lewat View → Output, lalu pilih `MCP: project-*` di dropdown-nya.

---

## Bacaan Lanjutan

- [Dokumentasi Registry](/registry/) — panduan lengkap soal registry
- Namespaces - Configure multiple registry sources
- Autentikasi — mengamankan registry privat Anda
- [MCP Specification](https://modelcontextprotocol.io) - Learn about Model Context Protocol

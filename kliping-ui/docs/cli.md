---
title: CLI
description: Memakai CLI untuk menambahkan komponen ke project Anda.
---

Selain gunting-tempel manual, komponen bisa ditambahkan lewat CLI. Kliping memakai CLI
`shadcn-vue` yang sama dengan upstream — belum ada CLI terpisah bernama Kliping, jadi
perintah di bawah ini memang menyebut `shadcn-vue`.

::: tip Dari mana komponennya diambil
Secara bawaan CLI menarik komponen dari registry shadcn-vue. Untuk sekarang isinya identik
  dengan komponen Kliping, karena Kliping di-fork dari shadcn-vue v2.8.2 dan belum mengubah
  komponen primitifnya. Kalau Anda ingin menarik dari registry Kliping secara eksplisit,
  awali perintahnya dengan `SHADCN_VUE_URL=https://kliping.pro`.
:::

## init

Pakai perintah `init` untuk menyiapkan konfigurasi dan dependensi project baru.

Perintah `init` memasang dependensi, menambahkan util `cn`, dan mengatur CSS variable untuk project Anda.

```bash
npx shadcn-vue@latest init
```

**Opsi**

```bash
Usage: shadcn-vue init [options] [components...]

initialize your project and install dependencies

Arguments:
  components                     names, url or local path to component

Options:
  -p, --preset <preset>          use a preset configuration or URL. (reka-vega, reka-nova, reka-maia, reka-lyra, reka-mira, reka-luma, reka-sera)
  -t, --template <template>      the template to use. (nuxt, vite, astro, laravel)
  --base <base>                  the component library base to use. (reka)
  --style <style>                the visual style to use. (vega, nova, maia, lyra, mira, luma, sera)
  --icon-library <icon-library>  the icon library to use. (lucide, tabler, hugeicons, phosphor, remixicon)
  --font <font>                  the font to use. (inter, figtree, jetbrains-mono, geist, geist-mono)
  -b, --base-color <base-color>  the base color to use. (neutral, gray, zinc, stone, slate)
  -n, --name <name>              the name for the new project.
  -d, --defaults                 use default configuration. (default: false)
  -y, --yes                      skip confirmation prompt. (default: true)
  -f, --force                    force overwrite of existing configuration. (default: false)
  -c, --cwd <cwd>                the working directory. defaults to the current directory.
  -s, --silent                   mute output. (default: false)
  --src-dir                      use the src directory when creating a new project. (default: false)
  --no-src-dir                   do not use the src directory when creating a new project.
  --reinstall                    re-install existing UI components.
  --no-reinstall                 do not re-install existing UI components.
  --rtl                          enable RTL support.
  --no-rtl                       disable RTL support.
  --pointer                      enable pointer cursor for buttons.
  --no-pointer                   disable pointer cursor for buttons.
  --css-variables                use css variables for theming. (default: true)
  --no-css-variables             do not use css variables for theming.
  --no-base-style                do not install the base shadcn style.
  -h, --help                     display help for command
```

Perintah `create` adalah alias dari `init`:

```bash
npx shadcn-vue@latest create
```

---

## add

Pakai perintah `add` untuk menambahkan komponen beserta dependensinya ke project Anda.

```bash
npx shadcn-vue@latest add [component]
```

Nama komponen bisa ditulis dalam beberapa bentuk:

| Bentuk | Merujuk ke |
| --- | --- |
| `button` | item di registry `shadcn-vue` bawaan |
| `@acme/button` | item di registry yang didaftarkan pada `registries` di `components.json` |
| `https://acme.com/r/button.json` | item registry yang diambil langsung dari URL tersebut |
| `./button.json` | item registry yang ada di disk lokal |
| `owner/repo/button` | item di `registry.json` pada root sebuah repository GitHub publik |
| `owner/repo/button#v1.0.0` | sama seperti di atas, tapi dikunci ke branch, tag, atau commit tertentu |

Lihat [Pasang dari GitHub](/registry/getting-started#pasang-dari-github) untuk
penjelasan bentuk GitHub.

**Opsi**

```bash
Usage: shadcn-vue add [options] [components...]

add a component to your project

Arguments:
  components           names, url or local path to component

Options:
  -y, --yes            skip confirmation prompt. (default: false)
  -o, --overwrite      overwrite existing files. (default: false)
  -c, --cwd <cwd>      the working directory. defaults to the current directory.
  -a, --all            add all available components (default: false)
  -p, --path <path>    the path to add the component to.
  -s, --silent         mute output. (default: false)
  -h, --help           display help for command
```

---

## apply

Pakai perintah `apply` untuk menerapkan sebuah preset ke project yang sudah ada.

```bash
npx shadcn-vue@latest apply --preset nova
```

**Opsi**

```bash
Usage: shadcn-vue apply [options] [preset]

apply a preset to an existing project

Arguments:
  preset             the preset to apply

Options:
  --preset <preset>  preset configuration to apply
  -y, --yes          skip confirmation prompt. (default: false)
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -s, --silent       mute output. (default: false)
  -h, --help         display help for command
```

---

## view

Pakai perintah `view` untuk melihat isi item registry sebelum benar-benar memasangnya.

```bash
npx shadcn-vue@latest view [item]
```

Beberapa item bisa dilihat sekaligus:

```bash
npx shadcn-vue@latest view button card dialog
```

Atau melihat item dari registry ber-namespace:

```bash
npx shadcn-vue@latest view @acme/auth @v0/dashboard
```

**Opsi**

```bash
Usage: shadcn-vue view [options] <items...>

view items from the registry

Arguments:
  items            the item names or URLs to view

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -h, --help       display help for command
```

---

## search

Pakai perintah `search` untuk mencari item di dalam registry.

```bash
npx shadcn-vue@latest search [registry]
```

Pencarian bisa disertai kata kunci:

```bash
npx shadcn-vue@latest search @shadcn-vue -q "button"
```

Atau mencari di beberapa registry sekaligus:

```bash
npx shadcn-vue@latest search @shadcn-vue @v0 @acme
```

Perintah `list` adalah alias dari `search`:

```bash
npx shadcn-vue@latest list @acme
```

**Opsi**

```bash
Usage: shadcn-vue search|list [options] <registries...>

search items from registries

Arguments:
  registries             the registry names or urls to search items from. Names
                         must be prefixed with @.

Options:
  -c, --cwd <cwd>        the working directory. defaults to the current directory.
  -q, --query <query>    query string
  -l, --limit <number>   maximum number of items to display per registry (default: "100")
  -o, --offset <number>  number of items to skip (default: "0")
  -h, --help             display help for command
```

---

## build

Pakai perintah `build` untuk menghasilkan file JSON registry.

```bash
npx shadcn-vue@latest build
```

Perintah ini membaca file `registry.json` lalu menghasilkan file-file JSON registry di folder `public/r`.

**Opsi**

```bash
Usage: shadcn-vue build [options] [registry]

build components for a shadcn-vue registry

Arguments:
  registry             path to registry.json file (default: "./registry.json")

Options:
  -o, --output <path>  destination directory for json files (default: "./public/r")
  -c, --cwd <cwd>      the working directory. defaults to the current directory.
  -h, --help           display help for command
```

Untuk mengubah folder tujuan, pakai opsi `--output`.

```bash
npx shadcn-vue@latest build --output ./public/registry
```

---

## docs

Pakai perintah `docs` untuk mengambil dokumentasi dan referensi API sebuah komponen.

```bash
npx shadcn-vue@latest docs [component]
```

**Opsi**

```bash
Usage: shadcn-vue docs [options] <components...>

get docs, api references and usage examples for components

Arguments:
  components         component names

Options:
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -b, --base <base>  the base to use (reka). defaults to project base.
  --json             output as JSON. (default: false)
  -h, --help         display help for command
```

---

## info

Pakai perintah `info` untuk melihat informasi tentang project Anda.

```bash
npx shadcn-vue@latest info
```

**Opsi**

```bash
Usage: shadcn-vue info [options]

get information about your project

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  --json            output as JSON. (default: false)
  -h, --help        display help for command
```

---

## migrate

Pakai perintah `migrate` untuk menjalankan migrasi pada project Anda.

```bash
npx shadcn-vue@latest migrate [migration]
```

**Migrasi yang tersedia**

| Migrasi | Keterangan                                                   |
| ------- | ------------------------------------------------------------ |
| `icons` | Memindahkan komponen UI Anda ke library ikon yang berbeda.   |
| `rtl`   | Menyesuaikan komponen Anda agar mendukung RTL (kanan ke kiri). |

**Opsi**

```bash
Usage: shadcn-vue migrate [options] [migration] [path]

run a migration.

Arguments:
  migration        the migration to run.
  path             optional path or glob pattern to migrate.

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -l, --list       list all migrations. (default: false)
  -y, --yes        skip confirmation prompt. (default: false)
  -h, --help       display help for command
```

---

### migrate rtl

Migrasi `rtl` mengubah komponen Anda agar mendukung bahasa yang ditulis dari kanan ke kiri.

```bash
npx shadcn-vue@latest migrate rtl
```

Yang dilakukan migrasi ini:

1. Memperbarui `components.json` menjadi `rtl: true`.
2. Mengubah properti CSS fisik menjadi padanan logisnya (misalnya `ml-4` → `ms-4`, `text-left` → `text-start`).
3. Menambahkan varian `rtl:` di tempat yang membutuhkannya (misalnya `space-x-4` → `space-x-4 rtl:space-x-reverse`).

**Migrasi file tertentu**

Anda bisa memigrasikan file tertentu, atau memakai pola glob:

```bash
# Migrasikan satu file tertentu
npx shadcn-vue@latest migrate rtl src/components/ui/button/Button.vue

# Migrasikan semua file yang cocok dengan pola glob
npx shadcn-vue@latest migrate rtl "src/components/ui/**"
```

Kalau path tidak diisi, migrasi akan mengubah seluruh file di folder `ui` Anda (sesuai `components.json`).

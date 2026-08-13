---
title: registry-item.json
description: Specification for registry items.
---

Skema `registry-item.json` dipakai untuk mendefinisikan item registry buatan Anda.

```json showLineNumbers title="registry-item.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "hello-world",
  "type": "registry:block",
  "title": "Hello World",
  "description": "A simple hello world component.",
  "files": [
    {
      "path": "registry/new-york/HelloWorld/HelloWorld.vue",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/HelloWorld/useHelloWorld.ts",
      "type": "registry:hook"
    }
  ]
}
```

## Definisi

JSON Schema untuk `registry-item.json` bisa Anda lihat [di sini](https://kliping.pro/schema/registry-item.json).

### $schema

Properti `$schema` menentukan skema untuk berkas `registry-item.json`.

```json showLineNumbers title="registry-item.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json"
}
```

### name

Properti `name` menentukan nama item registry Anda.

```json showLineNumbers title="registry-item.json"
{
  "name": "hello-world"
}
```

### title

Judul item registry Anda dalam bahasa yang mudah dibaca. Buat singkat tapi jelas.

```json showLineNumbers title="registry-item.json"
{
  "title": "Hello World"
}
```

### description

Keterangan item registry Anda. Boleh lebih panjang dan rinci dibanding `title`.

```json showLineNumbers title="registry-item.json"
{
  "description": "A simple hello world component."
}
```

### type

Properti `type` menentukan jenis item registry Anda.

```json showLineNumbers title="registry-item.json"
{
  "type": "registry:block"
}
```

Jenis yang didukung:

| Type                 | Description                                      |
| -------------------- | ------------------------------------------------ |
| `registry:block`     | Use for complex components with multiple files.  |
| `registry:component` | Use for simple components.                       |
| `registry:lib`       | Use for lib and utils.                           |
| `registry:hook`      | Use for composables (hooks).                                   |
| `registry:ui`        | Use for UI components and single-file primitives |
| `registry:page`      | Use for page or file-based routes.               |
| `registry:file`      | Use for miscellaneous files.                     |

### author

Properti `author` menentukan pembuat item registry-nya.

Nilainya boleh khusus untuk item itu, atau sama dengan pembuat registry-nya.

```json showLineNumbers title="registry-item.json"
{
  "author": "John Doe <john@doe.com>"
}
```

### dependencies

Properti `dependencies` menentukan dependency item registry Anda. Isinya paket `npm`.

Pakai `@versi` untuk mengunci versi item registry Anda.

```json showLineNumbers title="registry-item.json"
{
  "dependencies": [
    "reka-ui",
    "zod",
    "@lucide/vue",
    "name@1.0.2"
  ]
}
```

### registryDependencies

Dipakai untuk dependency registry. Isinya boleh berupa nama atau URL.

- Untuk item registry bawaan seperti `button`, `input`, atau `select`, cukup tulis namanya, misalnya `['button', 'input', 'select']`.
- Untuk item registry kustom, tulis URL-nya, misalnya `['https://example.com/r/hello-world.json']`.

```json showLineNumbers title="registry-item.json"
{
  "registryDependencies": [
    "button",
    "input",
    "select",
    "https://example.com/r/editor.json"
  ]
}
```

Catatan: CLI otomatis menyelesaikan dependency registry jarak jauh.

### files

Properti `files` menentukan berkas-berkas item registry Anda. Tiap berkas punya properti `path`, `type`, dan `target` (opsional).

**Properti `target` wajib diisi untuk jenis `registry:page` dan `registry:file`.**

```json showLineNumbers title="registry-item.json"
{
  "files": [
    {
      "path": "registry/new-york/HelloWorld/page.vue",
      "type": "registry:page",
      "target": "pages/hello/index.vue"
    },
    {
      "path": "registry/new-york/HelloWorld/HelloWorld.vue",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/HelloWorld/useHelloWorld.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/new-york/HelloWorld/.env",
      "type": "registry:file",
      "target": "~/.env"
    }
  ]
}
```

#### path

Properti `path` menentukan lokasi berkas di dalam registry Anda. Path ini dipakai script build untuk membaca, mengubah, dan menyusun payload JSON registry-nya.

#### type

Properti `type` menentukan jenis berkasnya. Keterangan lengkapnya ada di bagian [type](#type).

#### target

Properti `target` menunjukkan di mana berkas itu ditempatkan dalam sebuah project. Sifatnya opsional, dan hanya wajib untuk jenis `registry:page` dan `registry:file`.

Secara bawaan, CLI membaca berkas `components.json` project untuk menentukan path tujuannya. Untuk berkas tertentu seperti route atau konfigurasi, path tujuannya bisa Anda tentukan sendiri.

Pakai `~` untuk merujuk root project, misalnya `~/foo.config.js`.

### tailwind

**SUDAH TIDAK DIPAKAI:** untuk project Tailwind v4, gunakan `cssVars.theme`.

Properti `tailwind` dipakai untuk konfigurasi Tailwind seperti `theme`, `plugins`, dan `content`.

Properti `tailwind.config` bisa Anda pakai untuk menambahkan warna, animasi, dan plugin ke item registry Anda.

```json showLineNumbers title="registry-item.json"
{
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
          "colors": {
            "brand": "hsl(var(--brand))"
          },
          "keyframes": {
            "wiggle": {
              "0%, 100%": { "transform": "rotate(-3deg)" },
              "50%": { "transform": "rotate(3deg)" }
            }
          },
          "animation": {
            "wiggle": "wiggle 1s ease-in-out infinite"
          }
        }
      }
    }
  }
}
```

### cssVars

Dipakai untuk mendefinisikan CSS variable bagi item registry Anda.

```json showLineNumbers title="registry-item.json"
{
  "cssVars": {
    "light": {
      "brand": "20 14.3% 4.1%",
      "radius": "0.5rem"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

### css

Pakai `css` untuk menambahkan aturan baru ke berkas CSS project, misalnya `@layer base`, `@layer components`, `@utility`, atau `@keyframes`.

```json showLineNumbers title="registry-item.json"
{
  "css": {
    "@layer base": {
      "body": {
        "font-size": "var(--text-base)",
        "line-height": "1.5"
      }
    },
    "@layer components": {
      "button": {
        "background-color": "var(--color-primary)",
        "color": "var(--color-white)"
      }
    },
    "@utility text-magic": {
      "font-size": "var(--text-base)",
      "line-height": "1.5"
    },
    "@keyframes wiggle": {
      "0%, 100%": {
        "transform": "rotate(-3deg)"
      },
      "50%": {
        "transform": "rotate(3deg)"
      }
    }
  }
}
```

### docs

Pakai `docs` untuk menampilkan dokumentasi atau pesan khusus saat item registry Anda dipasang lewat CLI.

```json showLineNumbers title="registry-item.json"
{
  "docs": "Remember to add the FOO_BAR environment variable to your .env file."
}
```

### categories

Pakai `categories` untuk mengelompokkan item registry Anda.

```json showLineNumbers title="registry-item.json"
{
  "categories": ["sidebar", "dashboard"]
}
```

### meta

Pakai `meta` untuk menambahkan metadata tambahan pada item registry Anda. Pasangan key/value apa pun boleh Anda tambahkan.

```json showLineNumbers title="registry-item.json"
{
  "meta": { "foo": "bar" }
}
```

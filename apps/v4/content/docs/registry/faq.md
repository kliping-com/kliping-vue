---
title: FAQ
description: Frequently asked questions about running a registry.
---

## Pertanyaan yang Sering Diajukan

### Seperti apa bentuk komponen yang rumit?

Berikut contoh komponen rumit yang sekaligus memasang satu halaman, dua komponen, satu composable, satu utilitas format tanggal, dan satu berkas konfigurasi.

```json showLineNumbers
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    {
      "path": "registry/new-york/HelloWorld/page.vue",
      "type": "registry:page",
      "target": "pages/hello/index.vue"
    },
    {
      "path": "registry/new-york/HelloWorld/components/HelloWorld.vue",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/HelloWorld/components/FormattedMessage.vue",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/HelloWorld/composables/useHello.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/new-york/HelloWorld/lib/formatDate.ts",
      "type": "registry:utils"
    },
    {
      "path": "registry/new-york/HelloWorld/hello.config.ts",
      "type": "registry:file",
      "target": "~/hello.config.ts"
    }
  ]
}
```

### Bagaimana cara menambahkan warna Tailwind baru?

Untuk menambahkan warna baru, daftarkan di `cssVars` dan `tailwind.config.theme.extend.colors`.

```json showLineNumbers  {10-19} {24-29}
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "light": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    },
    "dark": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    }
  },
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
          "colors": {
            "brand": {
              "DEFAULT": "hsl(var(--brand-background))",
              "accent": "hsl(var(--brand-accent))"
            }
          }
        }
      }
    }
  }
}
```

CLI akan memperbarui berkas CSS project beserta `tailwind.config.js`. Setelah itu warna barunya bisa dipakai sebagai utility class: `bg-brand` dan `text-brand-accent`.

### Bagaimana cara menambahkan animasi Tailwind?

Untuk menambahkan animasi baru, daftarkan di `tailwind.config.theme.extend.animation` dan `tailwind.config.theme.extend.keyframes`.

```json showLineNumbers  {14-22}
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
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

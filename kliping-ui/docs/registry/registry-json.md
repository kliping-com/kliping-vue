---
title: registry.json
description: Schema for running your own component registry.
---

Skema `registry.json` dipakai untuk mendefinisikan registry komponen buatan Anda.

```json showLineNumbers title="registry.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry.json",
  "name": "shadcn",
  "homepage": "https://shadcn-vue.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/HelloWorld/HelloWorld.vue",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

## Definisi

JSON Schema untuk `registry.json` bisa Anda lihat [di sini](https://kliping.pro/schema/registry.json).

### $schema

Properti `$schema` menentukan skema untuk berkas `registry.json`.

```json showLineNumbers title="registry.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry.json"
}
```

### name

Properti `name` menentukan nama registry Anda. Nilainya dipakai untuk atribut data dan metadata lainnya.

```json showLineNumbers title="registry.json"
{
  "name": "acme"
}
```

### homepage

Halaman utama registry Anda. Nilainya dipakai untuk atribut data dan metadata lainnya.

```json showLineNumbers title="registry.json"
{
  "homepage": "https://acme.com"
}
```

### items

Daftar `items` di registry Anda. Tiap item harus mengikuti [spesifikasi skema registry-item](https://kliping.pro/schema/registry-item.json).

```json showLineNumbers title="registry.json"
{
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/HelloWorld/HelloWorld.vue",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

Keterangan lengkapnya ada di [dokumentasi skema registry-item](/registry/registry-item-json).

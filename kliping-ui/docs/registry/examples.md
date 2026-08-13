---
title: Examples
description: "Examples of registry items: styles, components, css vars, etc."
---

## registry:style

### Style kustom yang memperluas shadcn-vue

Item registry berikut adalah style kustom yang memperluas shadcn-vue. Saat `npx shadcn-vue init` dijalankan, ia akan:

- Memasang `@iconify/vue` sebagai dependency.
- Menambahkan block `Login01` dan komponen `calendar` ke project.
- Menambahkan `editor` dari registry jarak jauh.
- Mengisi variabel `font-sans` dengan `Inter, sans-serif`.
- Memasang warna `brand` untuk mode terang dan gelap.

```json showLineNumbers title="example-style.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "example-style",
  "type": "registry:style",
  "dependencies": ["@iconify/vue"],
  "registryDependencies": [
    "Login01",
    "calendar",
    "https://example.com/r/editor.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

### Style kustom dari nol

Item registry berikut adalah style kustom yang tidak memperluas shadcn-vue — perhatikan field `extends: none`.

Ia bisa dipakai membangun style baru dari nol: komponen sendiri, CSS variable sendiri, dependency sendiri, dan seterusnya.

Saat `npx shadcn-vue add` dijalankan, ia akan:

- Memasang `tailwind-merge` dan `clsx` sebagai dependency.
- Menambahkan item registry `utils` dari registry shadcn-vue.
- Menambahkan komponen `button`, `input`, `label`, dan `select` dari registry jarak jauh.
- Install new css vars: `main`, `bg`, `border`, `text`, `ring`.

```json showLineNumbers title="example-style.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "extends": "none",
  "name": "new-style",
  "type": "registry:style",
  "dependencies": ["tailwind-merge", "clsx"],
  "registryDependencies": [
    "utils",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json",
    "https://example.com/r/select.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "main": "#88aaee",
      "bg": "#dfe5f2",
      "border": "#000",
      "text": "#000",
      "ring": "#000"
    },
    "dark": {
      "main": "#88aaee",
      "bg": "#272933",
      "border": "#000",
      "text": "#e6e6e6",
      "ring": "#fff"
    }
  }
}
```

## registry:theme

### Tema kustom

```json showLineNumbers title="example-theme.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "light": {
      "background": "oklch(1 0 0)",
      "foreground": "oklch(0.141 0.005 285.823)",
      "primary": "oklch(0.546 0.245 262.881)",
      "primary-foreground": "oklch(0.97 0.014 254.604)",
      "ring": "oklch(0.746 0.16 232.661)",
      "sidebar-primary": "oklch(0.546 0.245 262.881)",
      "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
      "sidebar-ring": "oklch(0.746 0.16 232.661)"
    },
    "dark": {
      "background": "oklch(1 0 0)",
      "foreground": "oklch(0.141 0.005 285.823)",
      "primary": "oklch(0.707 0.165 254.624)",
      "primary-foreground": "oklch(0.97 0.014 254.604)",
      "ring": "oklch(0.707 0.165 254.624)",
      "sidebar-primary": "oklch(0.707 0.165 254.624)",
      "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
      "sidebar-ring": "oklch(0.707 0.165 254.624)"
    }
  }
}
```

### Warna kustom

Style berikut melakukan inisialisasi dengan nilai bawaan shadcn-vue, lalu menambahkan warna `brand` kustom.

```json showLineNumbers title="example-style.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-style",
  "type": "registry:style",
  "cssVars": {
    "light": {
      "brand": "oklch(0.99 0.00 0)"
    },
    "dark": {
      "brand": "oklch(0.14 0.00 286)"
    }
  }
}
```

## registry:block

### Block kustom

Contoh ini memasang block `Login01` dari registry shadcn-vue.

```json showLineNumbers title="Login01.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "Login01",
  "type": "registry:block",
  "description": "A simple login form.",
  "registryDependencies": ["button", "card", "input", "label"],
  "files": [
    {
      "path": "blocks/Login01/page.vue",
      "content": "import { LoginForm } ...",
      "type": "registry:page",
      "target": "pages/login/index.vue"
    },
    {
      "path": "blocks/login-01/components/LoginForm.vue",
      "content": "...",
      "type": "registry:component"
    }
  ]
}
```

### Memasang block sambil mengganti primitifnya

Anda bisa memasang block dari registry shadcn-vue lalu mengganti komponen primitifnya dengan buatan Anda sendiri.

Saat `npx shadcn-vue add` dijalankan, ia akan:

- Menambahkan block `Login01` dari registry shadcn-vue.
- Mengganti primitif `button`, `input`, dan `label` dengan versi dari registry jarak jauh.

```json showLineNumbers title="example-style.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-login",
  "type": "registry:block",
  "registryDependencies": [
    "Login01",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json"
  ]
}
```

## CSS Variables

### Variabel Tema Kustom

Tambahkan variabel tema kustom ke objek `theme`.

```json showLineNumbers title="example-theme.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "theme": {
      "font-heading": "Inter, sans-serif",
      "shadow-card": "0 0 0 1px rgba(0, 0, 0, 0.1)"
    }
  }
}
```

### Menimpa CSS variable Tailwind

```json showLineNumbers title="example-theme.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "theme": {
      "spacing": "0.2rem",
      "breakpoint-sm": "640px",
      "breakpoint-md": "768px",
      "breakpoint-lg": "1024px",
      "breakpoint-xl": "1280px",
      "breakpoint-2xl": "1536px"
    }
  }
}
```

## Menambahkan CSS Kustom

### Style dasar

```json showLineNumbers title="example-base.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-style",
  "type": "registry:style",
  "css": {
    "@layer base": {
      "h1": {
        "font-size": "var(--text-2xl)"
      },
      "h2": {
        "font-size": "var(--text-xl)"
      }
    }
  }
}
```

### Components

```json showLineNumbers title="example-card.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-card",
  "type": "registry:component",
  "css": {
    "@layer components": {
      "card": {
        "background-color": "var(--color-white)",
        "border-radius": "var(--rounded-lg)",
        "padding": "var(--spacing-6)",
        "box-shadow": "var(--shadow-xl)"
      }
    }
  }
}
```

## Menambahkan Utility Kustom

### Utility sederhana

```json showLineNumbers title="example-component.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility content-auto": {
      "content-visibility": "auto"
    }
  }
}
```

### Utility yang lebih rumit

```json showLineNumbers title="example-utility.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility scrollbar-hidden": {
      "scrollbar-hidden": {
        "&::-webkit-scrollbar": {
          "display": "none"
        }
      }
    }
  }
}
```

### Utility fungsional

```json showLineNumbers title="example-functional.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility tab-*": {
      "tab-size": "var(--tab-size-*)"
    }
  }
}
```

## Menambahkan Animasi Kustom

Catatan: untuk memakai animasi, Anda perlu mendefinisikan `@keyframes` di CSS sekaligus `theme` di dalam cssVars.

```json showLineNumbers title="example-component.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "cssVars": {
    "theme": {
      "--animate-wiggle": "wiggle 1s ease-in-out infinite"
    }
  },
  "css": {
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

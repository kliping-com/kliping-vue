---
title: Astro
description: Memasang dan mengonfigurasi Kliping di project Astro.
---

<Steps>

### Buat project

Mulai dengan membuat project Astro baru:

```bash
npx create-astro@latest astro-app  --template with-tailwindcss --install --add vue --git
```

### Sunting file tsconfig.json

Tambahkan kode berikut ke `tsconfig.json` supaya path bisa diselesaikan dengan benar:

```json showLineNumbers title="tsconfig.json" {4-9}
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

### Jalankan CLI

Jalankan perintah `init` untuk menyiapkan project Anda:

```bash
npx shadcn-vue@latest init
```

### Tambahkan komponen

Sekarang Anda bisa mulai menambahkan komponen ke project.

```bash
npx shadcn-vue@latest add button
```

Perintah di atas menambahkan komponen `Button` ke project Anda. Setelah itu, import seperti ini:

```astro showLineNumbers {2,10} title="src/pages/index.astro"
---
import { Button } from "@/components/ui/button"
---

<html lang="en">
	<head>
		<title>Astro</title>
	</head>
	<body>
		<Button>Hello World</Button>
	</body>
</html>
```

</Steps>

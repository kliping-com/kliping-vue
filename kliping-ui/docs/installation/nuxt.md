---
title: Nuxt
description: Memasang dan mengonfigurasi Kliping di project Nuxt.
---

<Steps>

### Buat project

Mulai dengan membuat project Nuxt baru:

```bash
npm create nuxt@latest
```

::: tip 
Kalau Anda menemui error `ERROR: Cannot read properties of undefined (reading 'sys') (x4)`, pasang TypeScript sebagai dependency seperti disarankan pada [issue ini](https://github.com/nuxt/nuxt/issues/20936).

```bash
npm install -D typescript
```
:::

### Pasang Tailwind CSS

Ada dua cara memasang Tailwind CSS di Nuxt. Pilih salah satu.

**Vite**

    ```bash
    npm install tailwindcss @tailwindcss/vite -D
    ```

  Ganti seluruh isi `app/assets/css/tailwind.css` dengan baris berikut:

    ```css title="app/assets/css/tailwind.css"
    @import "tailwindcss";
    ```

  Perbarui `nuxt.config.ts` seperti ini:

    ```ts
    import tailwindcss from '@tailwindcss/vite'

    export default defineNuxtConfig({
      // ...
      css: ['~/assets/css/tailwind.css'],
      vite: {
        plugins: [
          tailwindcss(),
        ],
      },
    })
    ```

**Nuxt Module**

     ```bash
    npm install tailwindcss @nuxtjs/tailwindcss@7.0.0-beta.1 -D
    ```

  Ganti seluruh isi `app/assets/css/tailwind.css` dengan baris berikut:

    ```css title="app/assets/css/tailwind.css"
    @import "tailwindcss";
    ```

    ```ts
    export default defineNuxtConfig({
      // ...
      modules: ['@nuxtjs/tailwindcss'],
    })
    ```

### Pasang module `Nuxt`

Kalau langkah ini dilewati, console Anda akan dipenuhi peringatan akibat fitur auto-import milik Nuxt.

**Module**

Pasang paket berikut.

    ```bash
  npx nuxi@latest module add shadcn-nuxt
    ```

**Manual**

Pasang `@types/node` terlebih dahulu.

  ```bash
  npm install -D @types/node
  ```

Lalu tambahkan kode berikut ke `modules/shadcn.ts`.

  ```ts
  import { readdirSync } from 'node:fs'
  import { join } from 'node:path'
  import {
    addComponentExports,
    addComponentsDir,
    createResolver,
    defineNuxtModule,
  } from 'nuxt/kit'

  export interface ShadcnVueOptions {
    /**
     * Prefix for all the imported component
     * @default "Ui"
     */
    prefix: string

    /**
     * Directory that the component lives in.
     * @default "@/components/ui"
     */
    componentDir: string
  }

  export default defineNuxtModule<ShadcnVueOptions>({
    defaults: {
      prefix: 'Ui',
      componentDir: '@/components/ui',
    },
    meta: {
      name: 'ShadcnVue',
      configKey: 'shadcn',
      version: '0.0.1',
      compatibility: {
        nuxt: '>=3.17.0',
      },
    },
    async setup({ componentDir, prefix }, nuxt) {
      const COMPONENT_DIR_PATH = componentDir!
      const ROOT_DIR_PATH = nuxt.options.rootDir
      const { resolve, resolvePath } = createResolver(ROOT_DIR_PATH)

      const componentsPath = await resolvePath(COMPONENT_DIR_PATH)

      addComponentsDir({
        path: componentsPath,
        extensions: [],
        ignore: ['**/*'],
      }, {
        prepend: true,
      })

      try {
        await Promise.all(readdirSync(componentsPath).map(async (dir) => {
          try {
            const filePath = await resolvePath(join(COMPONENT_DIR_PATH, dir, 'index'), { extensions: ['.ts', '.js'] })

            addComponentExports({
              prefix,
              filePath: resolve(filePath),
              priority: 1,
            })
          }
          catch (err) {
            if (err instanceof Error)
              console.warn('Module error: ', err.message)
          }
        }))
      }
      catch (err) {
        if (err instanceof Error)
          console.warn(err.message)
      }
    },
  })
  ```

### Atur `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  // ...
  modules: ['shadcn-nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  }
})
```

### Tambahkan plugin ssrWidth (opsional)

Sebagian komponen perlu nilai `ssrWidth` yang diatur lewat VueUse, agar tidak terjadi error
hydration di perangkat mobile.

Tambahkan plugin berikut ke aplikasi Nuxt Anda di `app/plugins/ssr-width.ts`.

Penjelasan lebih lanjut ada di [`useSSRWidth`](https://vueuse.org/core/useSSRWidth/).

```ts
import { provideSSRWidth } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})
```

### Jalankan Nuxt Prepare

Kalau ini project baru, jalankan perintah berikut supaya Nuxt menghasilkan folder `.nuxt` yang dibutuhkan:

```bash
npx nuxi prepare
```

### Jalankan CLI

Jalankan perintah `init` untuk menyiapkan project Anda:

```bash
npx shadcn-vue@latest init
```

Anda akan ditanya beberapa hal untuk mengisi `components.json`.

```txt
Which color would you like to use as base color? › Neutral
```

### Tambahkan komponen

Sekarang Anda bisa mulai menambahkan komponen ke project.

```bash
npx shadcn-vue@latest add button
```

Perintah di atas menambahkan komponen `Button` ke project Anda. Fitur auto-import Nuxt yang akan mengurus import-nya, jadi Anda bisa langsung memakainya:

```vue {3} showLineNumbers title="pages/index.vue"
<template>
  <div>
    <Button>Klik saya</Button>
  </div>
</template>
```

</Steps>

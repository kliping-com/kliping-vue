---
title: Kontribusi
description: Cara ikut membangun Kliping.
---

## Pengantar

Terima kasih sudah tertarik ikut membangun Kliping. Halaman ini merangkum hal-hal teknis
yang perlu Anda tahu sebelum mengirim pull request pertama.

Panduan lengkap soal struktur repo, cara menjalankan project, konvensi commit, dan gaya
penulisan dokumentasi ada di [CONTRIBUTING.md](https://github.com/kliping-com/kliping-vue/blob/dev/CONTRIBUTING.md).

## Single File Component

Di `shadcn/ui` — versi React-nya — beberapa komponen digabung dalam satu file. Vue hanya
mendukung satu komponen per file, itulah yang disebut Single File Component (SFC).

Karena itu, setiap bagian komponen dibuat sebagai file terpisah, lalu semuanya diekspor
lewat satu file `index.ts`. Lihat kode sumber `Accordion` di `apps/v4/registry/new-york-v4/ui/accordion`
sebagai contoh.

## Membungkus komponen Reka UI

[Reka UI](https://www.reka-ui.com) menyediakan banyak komponen UI tingkat rendah yang jadi
bahan dasar komponen di sini. Sering kali Anda perlu membungkusnya.

### Props & Events

Semua komponen Reka UI mengekspos tipe prop dan emit-nya. Props dan event yang datang dari
luar perlu diteruskan ke komponen Reka UI.

Untuk itu ada helper [`useForwardPropsEmits`](https://www.reka-ui.com/docs/utilities/use-forward-props-emits.html),
yang menggabungkan props dan events lalu mengembalikannya sebagai satu objek computed yang
siap di-bind ke komponen anak.

Contohnya pada komponen root `Accordion`:

```vue
<script setup lang="ts">
import {
  AccordionRoot,
  type AccordionRootEmits,
  type AccordionRootProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <slot />
  </AccordionRoot>
</template>
```

Tipe `AccordionRootEmits` dan `AccordionRootProps` di-import dari Reka UI, digabung lewat
`useForwardPropsEmits`, lalu di-bind memakai `v-bind`.

### CSS Class

Ada kalanya kita ingin menerima `class` sebagai prop, lalu menggabungkannya dengan class
Tailwind bawaan komponen memakai utility `cn`.

Dalam kasus ini `v-bind` tidak bisa dipakai langsung, karena akan menyebabkan
[class ter-bind dua kali](https://github.com/unovue/shadcn-vue/pull/241).

Perhatikan `DrawerDescription.vue`:

```vue
<script lang="ts" setup>
import type { DrawerDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DrawerDescription } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DrawerDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DrawerDescription
    data-slot="drawer-description"
    v-bind="delegatedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DrawerDescription>
</template>
```

`delegatedProps` dibuat untuk membuang `class` dari props, baru sisanya di-bind ke komponen
Reka UI. Sementara `class`-nya sendiri dideklarasikan bertipe `HTMLAttributes['class']` dan
digabung memakai `cn`.

Pola ini hanya perlu dipakai kalau memang ada `cn`. Kalau tidak ada class Tailwind bawaan
yang perlu digabung, pola ini tidak diperlukan — seperti pada `SelectValue.vue`:

```vue
<script setup lang="ts">
import { SelectValue, type SelectValueProps } from 'reka-ui'

const props = defineProps<SelectValueProps>()
</script>

<template>
  <SelectValue v-bind="props">
    <slot />
  </SelectValue>
</template>
```

### Props bertipe boolean

Saat membungkus komponen, kadang Anda perlu mengabaikan
[Props Boolean Casting](https://vuejs.org/guide/components/props.html#boolean-casting) milik Vue.

Ada dua cara: memberi nilai default `undefined` untuk semua field boolean, atau memakai
composable [`useForwardProps`](https://www.reka-ui.com/docs/utilities/use-forward-props.html).

Perhatikan `AccordionItem.vue`:

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    :class="cn('border-b', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
```

Karena tipe `AccordionItemProps` punya setidaknya satu properti boolean, `useForwardProps`
perlu dipakai pada seluruh objek props.

Perlu dicatat, `useForwardPropsEmits` memakai `useForwardProps` di baliknya.

### Komponen sebagai root

Kalau komponen root Anda adalah sebuah Component primitif dari Vue, lebih mudah memakai
[`Primitive`](https://www.reka-ui.com/docs/utilities/primitive.html).

Perhatikan `Button.vue`:

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
```

Props Anda perlu meng-extend `PrimitiveProps` agar komponen `Primitive` didukung. Umumnya
Anda juga perlu memberi nilai default untuk properti
[`as`](https://www.reka-ui.com/docs/utilities/primitive.html#changing-as-value).

## Hubungan dengan upstream

Kliping di-fork dari [shadcn-vue](https://github.com/unovue/shadcn-vue) v2.8.2 pada commit
`3f048df`, dan **tidak** mengekor perubahan upstream secara otomatis. Titik fork yang tetap
inilah yang menjaga janji stabilitas Kliping.

Kalau ada perbaikan penting di upstream yang menurut Anda layak dibawa masuk, buka diskusi
di GitHub terlebih dahulu supaya dampaknya bisa ditimbang bersama.

## Debugging

Beberapa alat yang membantu saat mengembangkan Kliping maupun project Anda sendiri:

### Pasang Vue DevTools

Ekstensi [Vue DevTools](https://devtools.vuejs.org/) memudahkan Anda memeriksa props,
atribut, dan event sebuah komponen langsung dari browser.

### Aktifkan Custom Formatter

Vue membungkus nilai yang disimpan dalam `ref`. Akibatnya, saat di-log ke console, hasilnya
berupa objek bersarang yang harus dibuka manual untuk melihat isinya.

Aktifkan Custom Formatter di browser Anda supaya proses itu otomatis:

- [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/custom_formatters/index.html)
- Chrome, Edge, Brave, dan browser berbasis Chromium [lainnya](https://www.google.com/search?q=how+to+enable+custom++formatter+chrome)

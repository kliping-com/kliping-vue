---
title: Form
description: Membangun form memakai VeeValidate dan Zod.
primitive: https://vee-validate.logaretm.com/v4/guide/overview/
component: true
---

::: tip We are not actively developing this component anymore.
Komponen Form adalah lapisan abstraksi di atas library `vee-validate`. Ke depannya, kami menyarankan Anda memakai komponen [`<Field />`](/components/field) untuk membangun form. Keterangan lengkapnya ada di dokumentasi [Form](/forms).
:::

Form itu rumit. Ia salah satu hal yang paling sering Anda bangun di aplikasi web, sekaligus salah satu yang paling ruwet.

Form HTML yang dirancang dengan baik punya ciri-ciri berikut:

- Terstruktur rapi dan bermakna secara semantik.
- Mudah dipakai dan dinavigasi, termasuk lewat keyboard.
- Mudah diakses lewat atribut ARIA dan label yang benar.
- Mendukung validasi di sisi klien maupun server.
- Tampilannya rapi dan selaras dengan sisa aplikasi.

Di panduan ini kita akan membangun form memakai [`vee-validate`](https://vee-validate.logaretm.com/v4/) dan [`zod`](https://zod.dev). Komponen `<FormField>` akan kita pakai untuk menyusun form yang mudah diakses dari komponen Reka UI.

## Fitur

Komponen `<Form />` adalah pembungkus library `vee-validate`. Ia menyediakan beberapa hal:

- Komponen yang bisa dikomposisikan untuk membangun form.
- Komponen `<FormField />` untuk membangun field yang nilainya dikendalikan.
- Validasi form memakai `zod`.
- Menerapkan atribut `aria` yang tepat pada tiap field sesuai keadaannya, sekaligus mengurus ID yang unik.
- Dirancang agar bekerja dengan semua komponen Reka UI.
- Bebas memilih library skema. Kami memakai `zod`, tapi Anda bisa memakai library validasi lain yang didukung, seperti [`yup`](https://github.com/jquense/yup) atau [`valibot`](https://valibot.dev/).
- **Markup dan style-nya sepenuhnya di tangan Anda.**

[`vee-validate`](https://vee-validate.logaretm.com/v4/) menyediakan dua gaya penulisan untuk menambahkan validasi ke form Anda.
- Composition API
- Higher-order component (HOC)

## Anatomi

```vue
<template>
  <Form>
    <FormField>
      <FormItem>
        <FormLabel />
        <FormControl>
        <!-- any Form Input component or native input elements -->
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
  </Form>
</template>
```

## Contoh

**Component**

#### Komponen `Input`

```vue showLineNumbers
<template>
  <FormField v-slot="{ componentField }">
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" v-bind="componentField" />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
```

**Native**

#### Elemen `input` bawaan

```vue showLineNumbers
<template>
  <FormField v-slot="{ field }">
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <input placeholder="shadcn" v-bind="field">
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
```

## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add form
```

**Manual**

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

```bash
npm install reka-ui vee-validate @vee-validate/zod zod
```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/form) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
</script>

<template>
  <FormField v-slot="{ componentField }" name="username">
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" v-bind="componentField" />
      </FormControl>
      <FormDescription>
        This is your public display name.
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
```

### Buat skema form

  Tentukan bentuk form Anda memakai skema Zod. Penjelasan lengkap soal Zod ada di [dokumentasi Zod](https://zod.dev).

  Pakai `@vee-validate/zod` untuk menyambungkan validasi skema Zod dengan `vee-validate`.

  `toTypedSchema` sekaligus membuat nilai form dan nilai yang dikirim bertipe otomatis, mencakup tipe masukan maupun keluaran skema tersebut.

  ```vue showLineNumbers {2-3,5-7}
  <script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import * as z from 'zod'

  const formSchema = toTypedSchema(z.object({
    username: z.string().min(2).max(50),
  }))
  </script>
  ```

### Definisikan form

  Buat form memakai composable `useForm` dari `vee-validate`, atau memakai komponen `<Form />`.

**Composition**

```vue showLineNumbers {2,19-21}
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit">
    ...
  </form>
</template>
```

**Component**

```vue showLineNumbers {5,24-26}
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

function onSubmit(values) {
  console.log('Form submitted!', values)
}
</script>

<template>
  <Form :validation-schema="formSchema" @submit="onSubmit">
    ...
  </Form>
</template>
```

### Susun form Anda

  Melanjutkan langkah sebelumnya, Anda bisa memakai komponen `<Form />` atau composable `useForm`.
  `useForm` lebih disarankan karena nilainya otomatis bertipe.

  ```vue showLineNumbers {2}
  <script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
  import * as z from 'zod'

  import { Button } from '@/components/ui/button'
  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
  import { Input } from '@/components/ui/input'

  const formSchema = toTypedSchema(z.object({
    username: z.string().min(2).max(50),
  }))

  const form = useForm({
    validationSchema: formSchema,
  })

  const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
  })
  </script>

  <template>
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">
        Submit
      </Button>
    </form>
  </template>
  ```

### Selesai

  Selesai. Sekarang Anda punya form yang mudah diakses, aman secara tipe, dan tervalidasi di sisi klien.

<ComponentPreview name="InputForm" />

<!-- ## Extras

Contoh ini menunjukkan cara menambahkan animasi ke form Anda memakai [Formkit AutoAnimate](https://auto-animate.formkit.com/).

**Catatan:** Anda perlu memasang `@formkit/auto-animate` untuk memakai fitur ini:

```bash
npm install @formkit/auto-animate
```

<ComponentPreview name="InputFormAutoAnimate" />

-->

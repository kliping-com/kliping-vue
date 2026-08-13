---
title: Formisch
description: Build forms in Vue using Formisch and Valibot.
links:
  doc: https://formisch.dev
---

Panduan ini membahas cara membangun form memakai [Formisch](https://formisch.dev) — library form untuk Vue yang ringan, mengutamakan skema, dan sepenuhnya aman secara tipe. Kita akan menyusun form dengan komponen `Field`, memvalidasinya lewat skema Valibot, menangani error, dan menjaga aksesibilitasnya.

## Demo

Kita akan membangun form berikut. Isinya satu input teks sederhana dan satu textarea. Saat dikirim, datanya divalidasi dan pesan error-nya ditampilkan kalau ada.

::: tip 
---
icon: true
---
**Catatan:** khusus untuk demo ini, validasi bawaan browser sengaja dimatikan supaya terlihat bagaimana validasi skema dan pesan error bekerja di Formisch. Di kode produksi Anda, sebaiknya validasi bawaan browser tetap dipakai.
:::

<ComponentPreview name="FormischDemo" />


## Pendekatan

Form ini memanfaatkan Formisch untuk penanganan form yang headless dan mengutamakan skema. Kita menyusunnya memakai komponen `Field`, yang memberi Anda **kebebasan penuh atas markup dan style-nya**.

- Memakai composable `useForm` dari Formisch untuk mengelola state form.
- Komponen `Form` yang membungkus elemen `form` bawaan sekaligus menangani pengirimannya.
- Komponen `Field` beserta slot prop untuk input terkendali.
- Validasi skema memakai [Valibot](https://valibot.dev).
- Path field yang aman secara tipe, disimpulkan langsung dari skemanya.

## Method Form

Formisch menyediakan operasi form sebagai **fungsi tingkat atas**, bukan method pada objek form. Import hanya yang Anda butuhkan:

```ts
import { getInput, insert, reset, submit } from '@formisch/vue'
```

Semua method memakai bentuk yang sama: **parameter pertama selalu form store**, dan **parameter kedua, kalau ada, selalu objek konfigurasi**.

```ts
// Read a field value
const email = getInput(form, { path: ['email'] })

// Reset the form with new initial values
reset(form, { initialInput: { email: '', password: '' } })

// Move an item in a field array
move(form, { path: ['items'], from: 0, to: 3 })
```

Rancangan ini membuat API-nya tetap luwes dan seragam di semua method. Bentuk `(form, config)` yang sama akan Anda temui sepanjang panduan ini — untuk membaca state (`getInput`, `getErrors`), menulis state (`setInput`, `setErrors`), mengendalikan form (`submit`, `validate`, `focus`), maupun mengolah array (`insert`, `remove`, `move`, `swap`, `replace`). Detailnya ada di [referensi lengkap method-nya](https://formisch.dev/vue/guides/form-methods).

## Anatomi

Berikut contoh dasar form yang memakai komponen `Field` dari Formisch, dipadukan komponen `Field` Kliping.

```vue showLineNumbers {3-21}
<template>
  <Form :of="form" @submit="handleSubmit">
    <FieldGroup>
      <FormischField :of="form" :path="['title']" v-slot="field">
        <Field :data-invalid="field.errors !== null">
          <FieldLabel for="form-title">Bug Title</FieldLabel>
          <Input
            v-model="field.input"
            v-bind="field.props"
            id="form-title"
            :aria-invalid="field.errors !== null"
            placeholder="Login button not working on mobile"
            autocomplete="off"
          />
          <FieldDescription>
            Provide a concise title for your bug report.
          </FieldDescription>
          <FieldError
            v-if="field.errors"
            :errors="field.errors.map((message) => ({ message }))"
          />
        </Field>
      </FormischField>
    </FieldGroup>
  </Form>
</template>
```

::: tip 
---
icon: true
---
**Catatan:** Formisch punya komponen `Field` sendiri. Supaya tidak bentrok dengan `Field` milik Kliping, contoh di bawah meng-import milik Formisch sebagai `FormischField`, sementara `Field` Kliping tetap memakai namanya sendiri. Di kode Anda sendiri, sisi mana pun boleh diberi alias — yang penting konsisten.
:::

## Form

### Buat skema form

Mulai dengan mendefinisikan bentuk form kita memakai skema Valibot. Formisch menyimpulkan seluruh tipe masukan dan keluarannya langsung dari skema itu.

```vue showLineNumbers
<script setup lang="ts">
import * as v from 'valibot'

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(5, 'Bug title must be at least 5 characters.'),
    v.maxLength(32, 'Bug title must be at most 32 characters.'),
  ),
  description: v.pipe(
    v.string(),
    v.minLength(20, 'Description must be at least 20 characters.'),
    v.maxLength(100, 'Description must be at most 100 characters.'),
  ),
})
</script>
```

### Siapkan form-nya

Berikutnya, kita pakai composable `useForm` dari Formisch untuk membuat instance form-nya. Skemanya diteruskan langsung ke `useForm` — tidak ada langkah resolver.

```vue showLineNumbers
<script setup lang="ts">
import { Field as FormischField, Form, useForm } from '@formisch/vue'
import type { SubmitHandler } from '@formisch/vue'
import * as v from 'valibot'

const FormSchema = v.object({
  // ...
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    title: '',
    description: '',
  },
})

const handleSubmit: SubmitHandler<typeof FormSchema> = (output) => {
  // Do something with the validated form values.
  console.log(output)
}
</script>

<template>
  <Form :of="form" @submit="handleSubmit">
    <!-- ... -->
  </Form>
</template>
```

Komponen `Form` membungkus elemen `form` bawaan. Ia memanggil `event.preventDefault()`, menjalankan validasi, dan baru memanggil handler pengiriman kalau datanya valid. Nilai `output` yang Anda terima sudah bertipe penuh sesuai skemanya.

### Susun form-nya

Sekarang form-nya bisa kita susun memakai komponen `FormischField` dari Formisch, dipadukan komponen `Field`.


### Selesai

Selesai. Sekarang Anda punya form yang mudah diakses dan tervalidasi di sisi klien.

Saat form dikirim, fungsi `handleSubmit` dipanggil dengan data yang sudah tervalidasi. Kalau datanya tidak valid, Formisch mengisi `field.errors` pada tiap field bermasalah dan tampilannya menampilkan pesan itu.

## Validasi

### Validasi di Sisi Klien

Formisch memvalidasi data form Anda memakai skema Valibot yang Anda teruskan ke `useForm`. Tidak ada resolver — skemanya jadi satu-satunya acuan, baik untuk validasi saat berjalan maupun untuk tipe statis.

```vue showLineNumbers
<script setup lang="ts">
import { useForm } from '@formisch/vue'
import * as v from 'valibot'

const FormSchema = v.object({
  title: v.string(),
  description: v.optional(v.string()),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    title: '',
    description: '',
  },
})
</script>
```

### Mode Validasi

Formisch memisahkan validasi **pertama** dari validasi **berikutnya**. Keduanya Anda atur lewat opsi `validate` dan `revalidate` pada `useForm`.

```vue showLineNumbers {5-6}
<script setup lang="ts">
const form = useForm({
  schema: FormSchema,
  validate: 'blur',
  revalidate: 'input',
})
</script>
```

| Opsi         | Nilai       | Keterangan                                                      |
| ------------ | ----------- | --------------------------------------------------------------- |
| `validate`   | `'submit'`  | Validate on form submission (default).                          |
| `validate`   | `'blur'`    | Validasi saat sebuah field kehilangan focus.                    |
| `validate`   | `'input'`   | Validate on every input change.                                 |
| `validate`   | `'initial'` | Validate immediately on form creation.                          |
| `revalidate` | `'input'`   | Validasi ulang tiap kali isian berubah, setelah validasi pertama (bawaan). |
| `revalidate` | `'blur'`    | Validasi ulang saat kehilangan focus, setelah validasi pertama. |
| `revalidate` | `'submit'`  | Revalidate only on form submission.                             |

## Menampilkan Pesan Error

Tampilkan pesan error di samping field memakai `FieldError`. Formisch mengembalikan error sebagai array string, jadi ubah dulu bentuknya sesuai yang diharapkan `FieldError`. Untuk urusan style dan aksesibilitas:

- Tambahkan prop `:data-invalid` pada komponen `Field`.
- Tambahkan prop `:aria-invalid` pada kontrol form-nya, seperti `Input`, `SelectTrigger`, `Checkbox`, dan sebagainya.

```vue showLineNumbers {3,7,13-16}
<template>
  <FormischField :of="form" :path="['email']" v-slot="field">
    <Field :data-invalid="field.errors !== null">
      <FieldLabel for="form-email">Email</FieldLabel>
      <Input
        v-model="field.input"
        v-bind="field.props"
        id="form-email"
        type="email"
        :aria-invalid="field.errors !== null"
      />
      <FieldError
        v-if="field.errors"
        :errors="field.errors.map((message) => ({ message }))"
      />
    </Field>
  </FormischField>
</template>
```

## Menangani Berbagai Jenis Field

Formisch menyediakan dua cara mengikat field ke sebuah elemen:

- **Elemen HTML bawaan** (seperti `Input` dan `Textarea`) — pakai `v-model="field.input"` lalu sebarkan `field.props` lewat `v-bind`. Formisch yang akan menyambungkan `name`, `ref`, serta event focus dan blur-nya.
- **Input dari library komponen** (seperti `Select`, `Checkbox`, `RadioGroup`, dan `Switch` yang berbasis reka-ui) — ikat `field.input` langsung lewat `v-model`, atau lewat `:model-value` dan `@update:model-value`.

### Input

- Untuk field input, pakai `v-model="field.input"` dan `v-bind="field.props"`.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `Input` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="FormischInput" />


```vue showLineNumbers {5-10}
<template>
  <FormischField :of="form" :path="['username']" v-slot="field">
    <Field :data-invalid="field.errors !== null">
      <FieldLabel for="form-username">Username</FieldLabel>
      <Input
        v-model="field.input"
        v-bind="field.props"
        id="form-username"
        :aria-invalid="field.errors !== null"
      />
      <FieldError
        v-if="field.errors"
        :errors="field.errors.map((message) => ({ message }))"
      />
    </Field>
  </FormischField>
</template>
```

### Textarea

- Untuk field textarea, pakai `v-model="field.input"` dan `v-bind="field.props"`.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `Textarea` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="FormischTextarea" />


```vue showLineNumbers {5-12}
<template>
  <FormischField :of="form" :path="['about']" v-slot="field">
    <Field :data-invalid="field.errors !== null">
      <FieldLabel for="form-about">More about you</FieldLabel>
      <Textarea
        v-model="field.input"
        v-bind="field.props"
        id="form-about"
        :aria-invalid="field.errors !== null"
        placeholder="I'm a software engineer..."
        class="min-h-[120px]"
      />
      <FieldDescription>
        Tell us more about yourself. This will be used to help us personalize
        your experience.
      </FieldDescription>
      <FieldError
        v-if="field.errors"
        :errors="field.errors.map((message) => ({ message }))"
      />
    </Field>
  </FormischField>
</template>
```

### Select

- Untuk komponen select, ikat `field.input` lewat `v-model` pada komponen `Select`.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `SelectTrigger` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="FormischSelect" />


```vue showLineNumbers {14}
<template>
  <FormischField :of="form" :path="['language']" v-slot="field">
    <Field orientation="responsive" :data-invalid="field.errors !== null">
      <FieldContent>
        <FieldLabel for="form-language">Spoken Language</FieldLabel>
        <FieldDescription>
          For best results, select the language you speak.
        </FieldDescription>
        <FieldError
          v-if="field.errors"
          :errors="field.errors.map((message) => ({ message }))"
        />
      </FieldContent>
      <Select v-model="field.input">
        <SelectTrigger
          id="form-language"
          :aria-invalid="field.errors !== null"
          class="min-w-[120px]"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="auto">Auto</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  </FormischField>
</template>
```

### Checkbox

- Untuk checkbox berbentuk array, baca `field.input` lalu tulis kembali array yang sudah diperbarui lewat `@update:model-value`.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `Checkbox` dan `:data-invalid` pada komponen `Field`.
- Jangan lupa menambahkan `data-slot="checkbox-group"` pada komponen `FieldGroup` supaya style dan jaraknya tepat.

<ComponentPreview name="FormischCheckbox" />


```vue showLineNumbers {15-22}
<template>
  <FormischField :of="form" :path="['tasks']" v-slot="field">
    <FieldSet>
      <FieldLegend variant="label">Tasks</FieldLegend>
      <FieldDescription>
        Get notified when tasks you've created have updates.
      </FieldDescription>
      <FieldGroup data-slot="checkbox-group">
        <Field
          v-for="task in tasks"
          :key="task.id"
          orientation="horizontal"
          :data-invalid="field.errors !== null"
        >
          <Checkbox
            :id="`form-checkbox-${task.id}`"
            :aria-invalid="field.errors !== null"
            :model-value="field.input?.includes(task.id) ?? false"
            @update:model-value="
              (checked) =>
                (field.input = checked
                  ? [...(field.input ?? []), task.id]
                  : (field.input ?? []).filter((value) => value !== task.id))
            "
          />
          <FieldLabel :for="`form-checkbox-${task.id}`" class="font-normal">
            {{ task.label }}
          </FieldLabel>
        </Field>
      </FieldGroup>
      <FieldError
        v-if="field.errors"
        :errors="field.errors.map((message) => ({ message }))"
      />
    </FieldSet>
  </FormischField>
</template>
```

### Radio Group

- Untuk radio group, ikat `field.input` lewat `v-model` pada komponen `RadioGroup`.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `RadioGroupItem` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="FormischRadioGroup" />


```vue showLineNumbers {8}
<template>
  <FormischField :of="form" :path="['plan']" v-slot="field">
    <FieldSet>
      <FieldLegend>Plan</FieldLegend>
      <FieldDescription>
        You can upgrade or downgrade your plan at any time.
      </FieldDescription>
      <RadioGroup v-model="field.input">
        <FieldLabel
          v-for="plan in plans"
          :key="plan.id"
          :for="`form-radiogroup-${plan.id}`"
        >
          <Field orientation="horizontal" :data-invalid="field.errors !== null">
            <FieldContent>
              <FieldTitle>{{ plan.title }}</FieldTitle>
              <FieldDescription>{{ plan.description }}</FieldDescription>
            </FieldContent>
            <RadioGroupItem
              :value="plan.id"
              :id="`form-radiogroup-${plan.id}`"
              :aria-invalid="field.errors !== null"
            />
          </Field>
        </FieldLabel>
      </RadioGroup>
      <FieldError
        v-if="field.errors"
        :errors="field.errors.map((message) => ({ message }))"
      />
    </FieldSet>
  </FormischField>
</template>
```

### Switch

- Untuk switch, ikat `field.input` lewat `v-model` pada komponen `Switch`.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `Switch` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="FormischSwitch" />


```vue showLineNumbers {15-19}
<template>
  <FormischField :of="form" :path="['twoFactor']" v-slot="field">
    <Field orientation="horizontal" :data-invalid="field.errors !== null">
      <FieldContent>
        <FieldLabel for="form-twoFactor">
          Multi-factor authentication
        </FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication to secure your account.
        </FieldDescription>
        <FieldError
          v-if="field.errors"
          :errors="field.errors.map((message) => ({ message }))"
        />
      </FieldContent>
      <Switch
        id="form-twoFactor"
        v-model="field.input"
        :aria-invalid="field.errors !== null"
      />
    </Field>
  </FormischField>
</template>
```

### Form yang Lebih Rumit

Berikut contoh form yang lebih rumit, dengan banyak field dan validasi.

<ComponentPreview name="FormischComplex" />


## Mengosongkan Form

Formisch menyediakan fungsi `reset` di tingkat atas. Teruskan form store-nya untuk mengembalikan isian ke nilai awal.

```vue showLineNumbers
<template>
  <Button type="button" variant="outline" @click="reset(form)">
    Reset
  </Button>
</template>
```

Anda juga bisa mengembalikannya ke nilai awal yang baru, atau me-reset tanpa menghapus isian pengguna saat ini:

```ts showLineNumbers
// Reset to a fresh set of initial values
reset(form, { initialInput: { title: '', description: '' } })

// Sync the baseline to new server data, but keep the user's edits
reset(form, { initialInput: serverData, keepInput: true })
```

## Field Berbentuk Array

Formisch menyediakan komponen `FieldArray` beserta sekumpulan fungsi bantu untuk mengelola field array yang dinamis. Pakai itu setiap kali Anda perlu menambah, menghapus, atau mengurutkan ulang item.

<ComponentPreview name="FormischArray" />


### Memakai FieldArray

`FieldArray` memakai pola slot yang sama dengan `Field`. Array `items`-nya memuat key yang stabil untuk tiap item — pakai key itu sebagai key `v-for` Anda.

```vue showLineNumbers {2,8-14}
<script setup lang="ts">
import { Field as FormischField, FieldArray, insert, remove } from '@formisch/vue'
</script>

<template>
  <FieldArray :of="form" :path="['emails']" v-slot="fieldArray">
    <FieldGroup class="gap-4">
      <FormischField
        v-for="(item, index) in fieldArray.items"
        :key="item"
        :of="form"
        :path="['emails', index, 'address']"
        v-slot="field"
      >
        <!-- ... -->
      </FormischField>
    </FieldGroup>
  </FieldArray>
</template>
```

### Struktur Field Array

Bungkus field array Anda dalam `FieldSet` beserta `FieldLegend` dan `FieldDescription`.

```vue showLineNumbers
<template>
  <FieldSet class="gap-4">
    <FieldLegend variant="label">Email Addresses</FieldLegend>
    <FieldDescription>
      Add up to 5 email addresses where we can contact you.
    </FieldDescription>
    <FieldGroup class="gap-4">
      <!-- Array items go here -->
    </FieldGroup>
  </FieldSet>
</template>
```

### Menambah Item

Pakai fungsi `insert` untuk menambahkan item baru ke array. Secara bawaan item baru ditaruh di akhir. Anda juga bisa memberikan indeks `at` untuk menyisipkannya di posisi tertentu.

```vue showLineNumbers
<template>
  <Button
    type="button"
    variant="outline"
    size="sm"
    @click="insert(form, { path: ['emails'], initialInput: { address: '' } })"
    :disabled="fieldArray.items.length >= 5"
  >
    Add Email Address
  </Button>
</template>
```

### Menghapus Item

Pakai fungsi `remove` beserta indeks `at` untuk menghapus item dari array.

```vue showLineNumbers
<template>
  <InputGroupAddon v-if="fieldArray.items.length > 1" align="inline-end">
    <InputGroupButton
      type="button"
      variant="ghost"
      size="icon-xs"
      @click="remove(form, { path: ['emails'], at: index })"
      :aria-label="`Remove email ${index + 1}`"
    >
      <XIcon />
    </InputGroupButton>
  </InputGroupAddon>
</template>
```

Formisch juga menyediakan `move`, `swap`, dan `replace` untuk mengurutkan ulang dan mengganti item. Semuanya memakai bentuk `(form, config)` yang sama.

### Validasi Array

Pakai validator `array` dan pipeline milik Valibot untuk membatasi field array.

```vue showLineNumbers
<script setup lang="ts">
const FormSchema = v.object({
  emails: v.pipe(
    v.array(
      v.object({
        address: v.pipe(
          v.string(),
          v.nonEmpty('Enter an email address.'),
          v.email('Enter a valid email address.'),
        ),
      }),
    ),
    v.minLength(1, 'Add at least one email address.'),
    v.maxLength(5, 'You can add up to 5 email addresses.'),
  ),
})
</script>
```

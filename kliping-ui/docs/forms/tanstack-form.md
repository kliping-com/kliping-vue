---
title: TanStack Form
description: Build forms in Vue using TanStack Form and Zod.
links:
  doc: https://tanstack.com/form
---

Panduan ini membahas cara membangun form memakai TanStack Form. Anda akan belajar menyusun form dengan komponen `<Field />`, menerapkan validasi skema lewat Zod, menangani error, dan menjaga aksesibilitasnya.

## Demo

Kita mulai dengan membangun form berikut. Isinya satu input teks sederhana dan satu textarea. Saat dikirim, datanya divalidasi dan pesan error-nya ditampilkan kalau ada.

::: tip 
---
icon: true
---
**Catatan:** khusus untuk demo ini, validasi bawaan browser sengaja dimatikan supaya terlihat bagaimana validasi skema dan pesan error bekerja di TanStack Form. Di kode produksi Anda, sebaiknya validasi bawaan browser tetap dipakai.
:::

<ComponentPreview name="TanStackFormDemo" />


## Pendekatan

Form ini memanfaatkan TanStack Form untuk penanganan form yang bertenaga dan headless. Kita menyusunnya memakai komponen `<Field />`, yang memberi Anda **kebebasan penuh atas markup dan style-nya**.

- Memakai composable `useForm` dari TanStack Form untuk mengelola state form.
- Komponen `form.Field` dengan pola render prop untuk input terkendali.
- Komponen `<Field />` untuk menyusun form yang mudah diakses.
- Client-side validation using Zod.
- Real-time validation feedback.

## Anatomi

Berikut contoh dasar form yang memakai TanStack Form bersama komponen `<Field />`.

```vue showLineNumbers {10-26}
<template>
  <form
    @submit.prevent="form.handleSubmit"
  >
    <FieldGroup>
      <form.Field
        name="title"
        #default="{ field }"
      >
        <Field :data-invalid="isInvalid(field)">
          <FieldLabel :for="field.name">Bug Title</FieldLabel>
          <Input
            :id="field.name"
            :name="field.name"
            :model-value="field.state.value"
            @blur="field.handleBlur"
            @input="field.handleChange($event.target.value)"
            :aria-invalid="isInvalid(field)"
            placeholder="Login button not working on mobile"
            autocomplete="off"
          />
          <FieldDescription>
            Provide a concise title for your bug report.
          </FieldDescription>
          <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
        </Field>
      </form.Field>
    </FieldGroup>
    <Button type="submit">Submit</Button>
  </form>
</template>
```

## Form

### Buat skema form

Mulai dengan mendefinisikan bentuk form kita memakai skema Zod.

**Catatan:** contoh ini memakai `zod v3` untuk validasi skema. TanStack Form menyatu mulus dengan Zod maupun library validasi Standard Schema lainnya lewat API validators-nya.

```vue showLineNumbers
<script setup lang="ts">
import { z } from 'zod'

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Bug title must be at least 5 characters.')
    .max(32, 'Bug title must be at most 32 characters.'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(100, 'Description must be at most 100 characters.'),
})
</script>
```

### Siapkan form-nya

Pakai composable `useForm` dari TanStack Form untuk membuat instance form Anda beserta validasi Zod.

```vue showLineNumbers
<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const formSchema = z.object({
  // ...
})

const form = useForm({
  defaultValues: {
    title: '',
    description: '',
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    toast.success('Form submitted successfully')
  },
})

function isInvalid(field) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}
</script>

<template>
  <form @submit.prevent="form.handleSubmit">
    <!-- ... -->
  </form>
</template>
```

Di sini kita memakai `onSubmit` untuk memvalidasi data form. TanStack Form juga mendukung mode validasi lain — keterangannya ada di dokumentasi resminya.

### Susun form-nya

Sekarang form-nya bisa kita susun memakai komponen `form.Field` dari TanStack Form, dipadukan komponen `Field`.


### Selesai

Selesai. Sekarang Anda punya form yang mudah diakses dan tervalidasi di sisi klien.

Saat form dikirim, fungsi `onSubmit` dipanggil dengan data yang sudah tervalidasi. Kalau datanya tidak valid, TanStack Form menampilkan pesan error di samping tiap field.

## Validasi

### Validasi di Sisi Klien

TanStack Form memvalidasi data form Anda memakai skema Zod. Validasinya berjalan seketika saat pengguna mengetik.

```vue showLineNumbers
<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'

const formSchema = z.object({
  // ...
})

const form = useForm({
  defaultValues: {
    title: '',
    description: '',
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    console.log(value)
  },
})
</script>
```

### Mode Validasi

TanStack Form mendukung beberapa strategi validasi lewat opsi `validators`:

| Mode       | Description                           |
| ---------- | ------------------------------------- |
| `onChange` | Validation triggers on every change. |
| `onBlur`   | Validation triggers on blur.         |
| `onSubmit` | Validation triggers on submit.       |

```vue showLineNumbers {7-11}
<script setup lang="ts">
const form = useForm({
  defaultValues: {
    title: '',
    description: '',
  },
  validators: {
    onSubmit: formSchema,
    onChange: formSchema,
    onBlur: formSchema,
  },
})
</script>
```

## Menampilkan Pesan Error

Tampilkan pesan error di samping field memakai `FieldError`. Untuk urusan style dan aksesibilitas:
- Tambahkan prop `:data-invalid` pada komponen `Field`.
- Tambahkan prop `:aria-invalid` pada kontrol form-nya, seperti `Input`, `SelectTrigger`, `Checkbox`, dan sebagainya.

```vue showLineNumbers
<script setup lang="ts">
function isInvalid(field) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}
</script>

<template>
  <form.Field
    name="email"
    #default="{ field }"
  >
    <Field :data-invalid="isInvalid(field)">
      <FieldLabel :for="field.name">Email</FieldLabel>
      <Input
        :id="field.name"
        :name="field.name"
        :model-value="field.state.value"
        @blur="field.handleBlur"
        @input="field.handleChange($event.target.value)"
        type="email"
        :aria-invalid="isInvalid(field)"
      />
      <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
    </Field>
  </form.Field>
</template>
```

## Menangani Berbagai Jenis Field

### Input

Untuk field input, pakai `field.state.value` dan `field.handleChange` pada komponen `Input`.
Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `Input` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="TanStackFormInput" />


```vue showLineNumbers {6, 11-14, 22}
<template>
  <form.Field
    name="username"
    #default="{ field }"
  >
    <Field :data-invalid="isInvalid(field)">
      <FieldLabel :for="`form-tanstack-input-username`">Username</FieldLabel>
      <Input
        id="form-tanstack-input-username"
        :name="field.name"
        :model-value="field.state.value"
        @blur="field.handleBlur"
        @input="field.handleChange($event.target.value)"
        :aria-invalid="isInvalid(field)"
        placeholder="shadcn"
        autocomplete="username"
      />
      <FieldDescription>
        This is your public display name. Must be between 3 and 10 characters.
        Must only contain letters, numbers, and underscores.
      </FieldDescription>
      <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
    </Field>
  </form.Field>
</template>
```

### Textarea

Untuk field textarea, pakai `field.state.value` dan `field.handleChange` pada komponen `Textarea`.
Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `Textarea` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="TanStackFormTextarea" />


```vue showLineNumbers {6,13-16,24}
<template>
  <form.Field
    name="about"
    #default="{ field }"
  >
    <Field :data-invalid="isInvalid(field)">
      <FieldLabel :for="`form-tanstack-textarea-about`">
        More about you
      </FieldLabel>
      <Textarea
        id="form-tanstack-textarea-about"
        :name="field.name"
        :model-value="field.state.value"
        @blur="field.handleBlur"
        @input="field.handleChange($event.target.value)"
        :aria-invalid="isInvalid(field)"
        placeholder="I'm a software engineer..."
        class="min-h-[120px]"
      />
      <FieldDescription>
        Tell us more about yourself. This will be used to help us
        personalize your experience.
      </FieldDescription>
      <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
    </Field>
  </form.Field>
</template>
```

### Select

Untuk komponen select, pakai `field.state.value` dan `field.handleChange` pada komponen `Select`.
Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `SelectTrigger` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="TanStackFormSelect" />


```vue showLineNumbers {6, 14, 18-19, 23}
<template>
  <form.Field
    name="language"
    #default="{ field }"
  >
    <Field orientation="responsive" :data-invalid="isInvalid(field)">
      <FieldContent>
        <FieldLabel :for="`form-tanstack-select-language`">
          Spoken Language
        </FieldLabel>
        <FieldDescription>
          For best results, select the language you speak.
        </FieldDescription>
        <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
      </FieldContent>
      <Select
        :name="field.name"
        :model-value="field.state.value"
        @update:model-value="field.handleChange"
      >
        <SelectTrigger
          id="form-tanstack-select-language"
          :aria-invalid="isInvalid(field)"
          class="min-w-[120px]"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="auto">Auto</SelectItem>
          <SelectSeparator />
          <SelectItem
            v-for="language in spokenLanguages"
            :key="language.value"
            :value="language.value"
          >
            {{ language.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </Field>
  </form.Field>
</template>
```

### Checkbox

Untuk checkbox, pakai `field.state.value` dan `field.handleChange` pada komponen `Checkbox`.
Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `Checkbox` dan `:data-invalid` pada komponen `Field`.
Untuk checkbox berbentuk array, pakai `mode="array"` pada komponen `form.Field` beserta fungsi bantu array milik TanStack Form.
Jangan lupa menambahkan `data-slot="checkbox-group"` pada komponen `FieldGroup` supaya style dan jaraknya tepat.

<ComponentPreview name="TanStackFormCheckbox" />


```vue showLineNumbers {12, 17, 22-33, 43}
<template>
  <form.Field
    name="tasks"
    mode="array"
    #default="{ field }"
  >
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
          :data-invalid="isInvalid(field)"
        >
          <Checkbox
            :id="`form-tanstack-checkbox-${task.id}`"
            :name="field.name"
            :aria-invalid="isInvalid(field)"
            :model-value="field.state.value.includes(task.id)"
            @update:model-value="(checked | 'indeterminate') => {
              if (checked) {
                field.pushValue(task.id)
              } else {
                const index = field.state.value.indexOf(task.id)
                if (index > -1) {
                  field.removeValue(index)
                }
              }
            }"
          />
          <FieldLabel
            :for="`form-tanstack-checkbox-${task.id}`"
            class="font-normal"
          >
            {{ task.label }}
          </FieldLabel>
        </Field>
      </FieldGroup>
      <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
    </FieldSet>
  </form.Field>
</template>
```

### Radio Group

Untuk radio group, pakai `field.state.value` dan `field.handleChange` pada komponen `RadioGroup`.
Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `RadioGroupItem` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="TanStackFormRadioGroup" />


```vue showLineNumbers {13-14, 23, 32, 37}
<template>
  <form.Field
    name="plan"
    #default="{ field }"
  >
    <FieldSet>
      <FieldLegend>Plan</FieldLegend>
      <FieldDescription>
        You can upgrade or downgrade your plan at any time.
      </FieldDescription>
      <RadioGroup
        :name="field.name"
        :model-value="field.state.value"
        @update:model-value="field.handleChange"
      >
        <FieldLabel
          v-for="plan in plans"
          :key="plan.id"
          :for="`form-tanstack-radiogroup-${plan.id}`"
        >
          <Field
            orientation="horizontal"
            :data-invalid="isInvalid(field)"
          >
            <FieldContent>
              <FieldTitle>{{ plan.title }}</FieldTitle>
              <FieldDescription>{{ plan.description }}</FieldDescription>
            </FieldContent>
            <RadioGroupItem
              :value="plan.id"
              :id="`form-tanstack-radiogroup-${plan.id}`"
              :aria-invalid="isInvalid(field)"
            />
          </Field>
        </FieldLabel>
      </RadioGroup>
      <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
    </FieldSet>
  </form.Field>
</template>
```

### Switch

Untuk switch, pakai `field.state.value` dan `field.handleChange` pada komponen `Switch`.
Untuk menampilkan error, tambahkan prop `:aria-invalid` pada komponen `Switch` dan `:data-invalid` pada komponen `Field`.

<ComponentPreview name="TanStackFormSwitch" />


```vue showLineNumbers {6, 14, 19-21}
<template>
  <form.Field
    name="twoFactor"
    #default="{ field }"
  >
    <Field orientation="horizontal" :data-invalid="isInvalid(field)">
      <FieldContent>
        <FieldLabel :for="field.name">
          Multi-factor authentication
        </FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication to secure your account.
        </FieldDescription>
        <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
      </FieldContent>
      <Switch
        :id="field.name"
        :name="field.name"
        :model-value="field.state.value"
        @update:model-value="field.handleChange"
        :aria-invalid="isInvalid(field)"
      />
    </Field>
  </form.Field>
</template>
```

### Form yang Lebih Rumit

Berikut contoh form yang lebih rumit, dengan banyak field dan validasi.

<ComponentPreview name="TanStackFormComplex" />


## Mengosongkan Form

Pakai `form.reset()` untuk mengembalikan form ke nilai bawaannya.

```vue showLineNumbers
<template>
  <Button type="button" variant="outline" @click="form.reset()">
    Reset
  </Button>
</template>
```

## Field Berbentuk Array

TanStack Form menyediakan pengelolaan field array yang lengkap lewat `mode="array"`. Dengan itu Anda bisa menambah, menghapus, dan memperbarui item array secara dinamis, tetap dengan validasi penuh.

<ComponentPreview name="TanStackFormArray" />


Contoh ini menunjukkan pengelolaan beberapa alamat email memakai field array. Pengguna bisa menambahkan sampai 5 alamat, menghapusnya satu per satu, dan tiap alamat divalidasi sendiri-sendiri.

### Memakai FieldArray

Pakai `mode="array"` pada field induknya untuk mengaktifkan pengelolaan field array.

```vue showLineNumbers {4, 13-15}
<template>
  <form.Field
    name="emails"
    mode="array"
    #default="{ field }"
  >
    <FieldSet>
      <FieldLegend variant="label">Email Addresses</FieldLegend>
      <FieldDescription>
        Add up to 5 email addresses where we can contact you.
      </FieldDescription>
      <FieldGroup>
        <template v-for="(_, index) in field.state.value">
          <!-- Nested field for each array item -->
        </template>
      </FieldGroup>
    </FieldSet>
  </form.Field>
</template>
```

### Field Bersarang

Akses tiap item array memakai notasi kurung siku: `namaField[indeks].namaProperti`. Contoh ini memakai `InputGroup` supaya tombol hapusnya sejajar dengan input.

```vue showLineNumbers
<template>
  <form.Field
    :name="`emails[${index}].address`"
    #default="{ subField }"
  >
    <Field orientation="horizontal" :data-invalid="isSubFieldInvalid(subField)">
      <FieldContent>
        <InputGroup>
          <InputGroupInput
            :id="`form-tanstack-array-email-${index}`"
            :name="subField.name"
            :model-value="subField.state.value"
            @blur="subField.handleBlur"
            @input="subField.handleChange($event.target.value)"
            :aria-invalid="isSubFieldInvalid(subField)"
            placeholder="name@example.com"
            type="email"
          />
          <InputGroupAddon v-if="field.state.value.length > 1" align="inline-end">
            <InputGroupButton
              type="button"
              variant="ghost"
              size="icon-xs"
              @click="field.removeValue(index)"
              :aria-label="`Remove email ${index + 1}`"
            >
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldError v-if="isSubFieldInvalid(subField)" :errors="subField.state.meta.errors" />
      </FieldContent>
    </Field>
  </form.Field>
</template>
```


### Menambah Item

Pakai `field.pushValue(item)` untuk menambahkan item ke field array. Tombolnya bisa Anda nonaktifkan saat array sudah mencapai batas maksimum.

```vue showLineNumbers
<template>
  <Button
    type="button"
    variant="outline"
    size="sm"
    @click="field.pushValue({ address: '' })"
    :disabled="field.state.value.length >= 5"
  >
    Add Email Address
  </Button>
</template>
```

### Menghapus Item

Pakai `field.removeValue(indeks)` untuk menghapus item dari field array. Tombol hapusnya bisa Anda tampilkan hanya saat itemnya lebih dari satu.

```vue showLineNumbers
<template>
  <InputGroupButton
    v-if="field.state.value.length > 1"
    @click="field.removeValue(index)"
    :aria-label="`Remove email ${index + 1}`"
  >
    <XIcon />
  </InputGroupButton>
</template>
```

### Validasi Array

Validate array fields using Zod's array methods.

```vue showLineNumbers
<script setup lang="ts">
const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email('Enter a valid email address.'),
      })
    )
    .min(1, 'Add at least one email address.')
    .max(5, 'You can add up to 5 email addresses.'),
})
</script>
```

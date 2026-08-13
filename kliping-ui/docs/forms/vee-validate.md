---
title: VeeValidate
description: Build forms in Vue using VeeValidate and Zod.
links:
  doc: https://vee-validate.logaretm.com/v4
---

Di panduan ini kita akan membangun form memakai VeeValidate. Yang dibahas: menyusun form dengan komponen `<Field />`, menambahkan validasi skema lewat Zod, menangani error, aksesibilitas, dan lainnya.

## Demo

Kita akan membangun form berikut. Isinya satu input teks sederhana dan satu textarea. Saat dikirim, datanya divalidasi dan pesan error-nya ditampilkan kalau ada.

::: tip 
---
icon: true
---
**Catatan:** khusus untuk demo ini, validasi bawaan browser sengaja dimatikan supaya terlihat bagaimana validasi skema dan pesan error bekerja di VeeValidate. Di kode produksi Anda, sebaiknya validasi bawaan browser tetap dipakai.
:::

<ComponentPreview name="VeeValidateDemo" />


## Pendekatan

Form ini memanfaatkan VeeValidate agar penanganannya ringan dan luwes. Kita menyusunnya memakai komponen `<Field />`, yang memberi Anda **kebebasan penuh atas markup dan style-nya**.

- Memakai composable `useForm` dari VeeValidate untuk mengelola state form.
- Komponen `<Field />` dari VeeValidate beserta scoped slot untuk input terkendali yang tervalidasi.
- Komponen `<Field />` dari Kliping untuk menyusun form yang mudah diakses.
- Validasi di sisi klien memakai Zod lewat `toTypedSchema`.

## Anatomi

Berikut contoh dasar form yang memakai komponen `<Field />` VeeValidate dengan scoped slot, dipadukan komponen `<Field />` Kliping.

Pakai `componentField` kalau kontrolnya berupa komponen Vue ber-`v-model`, misalnya `<Input />` milik Kliping. Pakai `field` kalau kontrolnya elemen HTML biasa. `field` mengikat `value`, yang justru diabaikan komponen ber-`v-model` — akibatnya `initialValues` tidak pernah tampil.

<br />

**Component**

#### `Input` Component

  ```vue showLineNumbers {2,9}
  <template>
    <VeeField v-slot="{ componentField, errors }" name="title">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="title">
          Bug Title
        </FieldLabel>
        <Input
          id="title"
          v-bind="componentField"
          placeholder="Login button not working on mobile"
          autocomplete="off"
          :aria-invalid="!!errors.length"
        />
        <FieldDescription>
          Provide a concise title for your bug report.
        </FieldDescription>
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
  </template>
  ```

**Native**

#### native `input` element

  ```vue showLineNumbers {2,9}
  <template>
    <VeeField v-slot="{ field, errors }" name="title">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="title">
          Bug Title
        </FieldLabel>
        <input
          id="title"
          v-bind="field"
          placeholder="Login button not working on mobile"
          autocomplete="off"
          :aria-invalid="!!errors.length"
        >
        <FieldDescription>
          Provide a concise title for your bug report.
        </FieldDescription>
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
  </template>
  ```

## Form

### Buat skema form

Mulai dengan mendefinisikan bentuk form kita memakai skema Zod

::: tip 
---
icon: true
---
**Catatan:** contoh ini memakai `zod v3` untuk validasi skema, tapi Anda bisa menggantinya dengan library validasi Standard Schema lain yang didukung VeeValidate.
:::

```vue showLineNumbers title="Form.vue"
<script setup lang="ts">
import * as z from 'zod'

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

Berikutnya, kita pakai composable `useForm` dari VeeValidate untuk membuat instance form-nya, sekaligus memasang skema Zod sebagai validatornya.

```vue showLineNumbers title="Form.vue" {17-23}
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import * as z from 'zod'

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

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    title: '',
    description: '',
  },
})

const onSubmit = handleSubmit((values) => {
  // Do something with the form values.
  console.log(values)
})
</script>

<template>
  <form @submit="onSubmit">
    <!-- Build the form here -->
  </form>
</template>
```

### Susun form-nya

Sekarang form-nya bisa kita susun memakai komponen `<Field />` VeeValidate dengan scoped slot, dipadukan komponen `<Field />` Kliping.

<!-- This should use mdc component source -->


### Selesai

Selesai. Sekarang Anda punya form yang mudah diakses dan tervalidasi di sisi klien.

Saat form dikirim, fungsi `onSubmit` dipanggil dengan data yang sudah tervalidasi. Kalau datanya tidak valid, VeeValidate menampilkan pesan error di samping tiap field.

## Validasi

### Validasi di Sisi Klien

VeeValidate memvalidasi data form Anda memakai skema Zod. Definisikan skemanya, lalu teruskan ke opsi `validationSchema` pada composable `useForm`.

```vue showLineNumbers title="ExampleForm.vue" {6-9,12}
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import * as z from 'zod'

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    title: '',
    description: '',
  },
})
</script>
```

### Mode Validasi

VeeValidate mendukung beberapa strategi validasi lewat prop komponen `Field`.

```vue showLineNumbers title="Form.vue" {4}
<VeeField
  v-slot="{ componentField, errors }"
  name="title"
  :validate-on-input="true"
>
  <!-- field content -->
</VeeField>
```

| Prop                    | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `validateOnInput`       | Validation triggers on input event.                     |
| `validateOnChange`      | Validation triggers on change event.                    |
| `validateOnBlur`        | Validation triggers on blur event.                      |
| `validateOnMount`       | Validasi dijalankan saat komponen ter-mount.            |

## Menampilkan Pesan Error

Tampilkan pesan error di samping field memakai `<FieldError />`. Untuk urusan style dan aksesibilitas:

- Tambahkan prop `:data-invalid` pada komponen `<Field />` Kliping.
- Tambahkan prop `:aria-invalid` pada kontrol form-nya, seperti `<Input />`, `<SelectTrigger />`, `<Checkbox />`, dan sebagainya.

```vue showLineNumbers title="Form.vue" {2,9,11}
<template>
  <VeeField v-slot="{ componentField, errors }" name="email">
    <Field :data-invalid="!!errors.length">
      <FieldLabel for="email">
        Email
      </FieldLabel>
      <Input
        id="email"
        v-bind="componentField"
        type="email"
        :aria-invalid="!!errors.length"
      />
      <FieldError v-if="errors.length" :errors="errors" />
    </Field>
  </VeeField>
</template>
```

## Menangani Berbagai Jenis Field

### Input

- Untuk field input, pakai `v-bind="componentField"` supaya objek field VeeValidate terikat ke input-nya.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada `<Input />` dan `:data-invalid` pada `<Field />` Kliping.

<ComponentPreview name="VeeValidateInputDemo" />


Untuk input teks sederhana, pakai komponen `Field` VeeValidate beserta scoped slot-nya.

```vue showLineNumbers title="Form.vue" {3,9,11}
<template>
  <VeeField v-slot="{ componentField, errors }" name="name">
    <Field :data-invalid="!!errors.length">
      <FieldLabel for="name">
        Name
      </FieldLabel>
      <Input
        id="name"
        v-bind="componentField"
        placeholder="Enter your name"
        :aria-invalid="!!errors.length"
      />
      <FieldError v-if="errors.length" :errors="errors" />
    </Field>
  </VeeField>
</template>
```

### Textarea

- Untuk field textarea, pakai `v-bind="componentField"` supaya objek field VeeValidate terikat ke textarea-nya.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada `<Textarea />` dan `:data-invalid` pada `<Field />` Kliping.

<ComponentPreview name="VeeValidateTextareaDemo" />


Untuk field textarea, pakai komponen `Field` VeeValidate beserta scoped slot-nya.

```vue showLineNumbers title="Form.vue" {3,9,12}
<template>
  <VeeField v-slot="{ componentField, errors }" name="about">
    <Field :data-invalid="!!errors.length">
      <FieldLabel for="about">
        More about you
      </FieldLabel>
      <Textarea
        id="about"
        v-bind="componentField"
        placeholder="I'm a software engineer..."
        class="min-h-[120px]"
        :aria-invalid="!!errors.length"
      />
      <FieldDescription>
        Tell us more about yourself. This will be used to help us personalize your experience.
      </FieldDescription>
      <FieldError v-if="errors.length" :errors="errors" />
    </Field>
  </VeeField>
</template>
```

### Select

- Untuk komponen select, pakai `v-bind="componentField"` pada `<Select />`. Sekali pasang, ia mengikat `modelValue`, `update:modelValue`, dan `name`.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada `<SelectTrigger />` dan `:data-invalid` pada `<Field />` Kliping.

<ComponentPreview name="VeeValidateSelectDemo" />


```vue showLineNumbers title="Form.vue" {2,11,15}
<template>
  <VeeField v-slot="{ componentField, errors }" name="language">
    <Field orientation="responsive" :data-invalid="!!errors.length">
      <FieldContent>
        <FieldLabel for="language">
          Spoken Language
        </FieldLabel>
        <FieldDescription>For best results, select the language you speak.</FieldDescription>
        <FieldError v-if="errors.length" :errors="errors" />
      </FieldContent>
      <Select v-bind="componentField">
        <SelectTrigger
          id="language"
          class="min-w-[120px]"
          :aria-invalid="!!errors.length"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="auto">
            Auto
          </SelectItem>
          <SelectItem value="en">
            English
          </SelectItem>
        </SelectContent>
      </Select>
    </Field>
  </VeeField>
</template>
```

### Checkbox

- Untuk satu checkbox boolean, pakai `v-bind="componentField"` dan isi `type="checkbox"` pada `<Field />` VeeValidate.
- Untuk checkbox berbentuk array, satu field memegang seluruh array-nya, jadi ikat slot prop `value` dan `handleChange` secara manual.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada `<Checkbox />` dan `:data-invalid` pada `<Field />` Kliping.
- Jangan lupa menambahkan `data-slot="checkbox-group"` pada komponen `<FieldGroup />` supaya style dan jaraknya tepat.

<ComponentPreview name="VeeValidateCheckboxDemo" />


```vue showLineNumbers title="Form.vue" {2,12}
<template>
  <VeeField v-slot="{ componentField, errors }" name="responses" type="checkbox">
    <FieldSet :data-invalid="!!errors.length">
      <FieldLegend variant="label">
        Responses
      </FieldLegend>
      <FieldDescription>Get notified for requests that take time.</FieldDescription>
      <FieldGroup data-slot="checkbox-group">
        <Field orientation="horizontal">
          <Checkbox
            id="responses"
            v-bind="componentField"
            :aria-invalid="!!errors.length"
          />
          <FieldLabel for="responses" class="font-normal">
            Push notifications
          </FieldLabel>
        </Field>
      </FieldGroup>
      <FieldError v-if="errors.length" :errors="errors" />
    </FieldSet>
  </VeeField>
</template>
```

Untuk field array, baca pilihan saat ini dari `value`, lalu tulis pilihan berikutnya lewat `handleChange`.

```vue showLineNumbers title="Form.vue" {2,17,19-23}
<template>
  <VeeField v-slot="{ value, handleChange, errors }" name="tasks">
    <FieldSet :data-invalid="!!errors.length">
      <FieldLegend variant="label">
        Tasks
      </FieldLegend>
      <FieldDescription>Get notified when tasks you've created have updates.</FieldDescription>
      <FieldGroup data-slot="checkbox-group">
        <Field
          v-for="task in tasks"
          :key="task.id"
          orientation="horizontal"
          :data-invalid="!!errors.length"
        >
          <Checkbox
            :id="`task-${task.id}`"
            :model-value="value?.includes(task.id)"
            :aria-invalid="!!errors.length"
            @update:model-value="(checked: boolean | 'indeterminate') => {
              handleChange(checked
                ? [...(value || []), task.id]
                : (value || []).filter((id: string) => id !== task.id))
            }"
          />
          <FieldLabel :for="`task-${task.id}`" class="font-normal">
            {{ task.label }}
          </FieldLabel>
        </Field>
      </FieldGroup>
      <FieldError v-if="errors.length" :errors="errors" />
    </FieldSet>
  </VeeField>
</template>
```

### Radio Group

- Untuk radio group, pakai `v-bind="componentField"` pada `<RadioGroup />`. Tiap `<RadioGroupItem />` cukup diberi `value`-nya sendiri.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada `<RadioGroup />` dan `:data-invalid` pada `<Field />` Kliping.

<ComponentPreview name="VeeValidateRadioGroupDemo" />


```vue showLineNumbers title="Form.vue" {2,8-11}
<template>
  <VeeField v-slot="{ componentField, errors }" name="plan">
    <FieldSet :data-invalid="!!errors.length">
      <FieldLegend>Plan</FieldLegend>
      <FieldDescription>
        You can upgrade or downgrade your plan at any time.
      </FieldDescription>
      <RadioGroup
        v-bind="componentField"
        :aria-invalid="!!errors.length"
      >
        <FieldLabel v-for="planOption in plans" :key="planOption.id" :for="`plan-${planOption.id}`">
          <Field orientation="horizontal" :data-invalid="!!errors.length">
            <FieldContent>
              <FieldTitle>{{ planOption.title }}</FieldTitle>
              <FieldDescription>{{ planOption.description }}</FieldDescription>
            </FieldContent>
            <RadioGroupItem
              :id="`plan-${planOption.id}`"
              :value="planOption.id"
            />
          </Field>
        </FieldLabel>
      </RadioGroup>
      <FieldError v-if="errors.length" :errors="errors" />
    </FieldSet>
  </VeeField>
</template>
```

### Switch

- Untuk switch, pakai `v-bind="componentField"` dan isi `type="checkbox"` pada `<Field />` VeeValidate supaya nilainya diperlakukan sebagai boolean.
- Untuk menampilkan error, tambahkan prop `:aria-invalid` pada `<Switch />` dan `:data-invalid` pada `<Field />` Kliping.

<ComponentPreview name="VeeValidateSwitchDemo" />


```vue showLineNumbers title="Form.vue" {2,15}
<template>
  <VeeField v-slot="{ componentField, errors }" name="twoFactor" type="checkbox">
    <Field orientation="horizontal" :data-invalid="!!errors.length">
      <FieldContent>
        <FieldLabel for="two-factor">
          Multi-factor authentication
        </FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication to secure your account.
        </FieldDescription>
        <FieldError v-if="errors.length" :errors="errors" />
      </FieldContent>
      <Switch
        id="two-factor"
        v-bind="componentField"
        :aria-invalid="!!errors.length"
      />
    </Field>
  </VeeField>
</template>
```

### Form yang Lebih Rumit

Berikut contoh form yang lebih rumit, dengan banyak field dan validasi.

<ComponentPreview name="VeeValidateComplexDemo" />


## Mengosongkan Form

Pakai fungsi `resetForm` yang dikembalikan `useForm` untuk mengembalikan form ke nilai awalnya.

```vue showLineNumbers
<script setup lang="ts">
const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  // ...
})
</script>

<template>
  <Button type="button" variant="outline" @click="resetForm">
    Reset
  </Button>
</template>
```

## Field Berbentuk Array

VeeValidate menyediakan komponen `FieldArray` untuk mengelola field array yang dinamis. Berguna kalau Anda perlu menambah atau menghapus field secara dinamis.

<ComponentPreview name="VeeValidateArrayDemo" />


### Memakai FieldArray

Pakai komponen `FieldArray` untuk mengelola field array. Ia menyediakan `fields`, `push`, dan `remove` lewat slot prop-nya.

```vue showLineNumbers title="Form.vue" {6-8}
<script setup lang="ts">
import { FieldArray as VeeFieldArray } from 'vee-validate'
</script>

<template>
  <VeeFieldArray v-slot="{ fields, push, remove }" name="emails">
  <!-- Array items go here -->
  </VeeFieldArray>
</template>
```

### Struktur Field Array

Bungkus field array Anda dalam `<FieldSet />` beserta `<FieldLegend />` dan `<FieldDescription />`.

```vue showLineNumbers title="Form.vue"
<template>
  <FieldSet class="gap-4">
    <FieldLegend variant="label">
      Email Addresses
    </FieldLegend>
    <FieldDescription>
      Add up to 5 email addresses where we can contact you.
    </FieldDescription>
    <FieldGroup class="gap-4">
      <!-- Array items go here -->
    </FieldGroup>
  </FieldSet>
</template>
```

### Pola Field untuk Item Array

Iterasi array `fields` lalu buat satu field untuk tiap item. **Pastikan Anda memakai `field.key` sebagai key-nya.**

```vue showLineNumbers title="Form.vue"
<template>
  <VeeFieldArray v-slot="{ fields, push, remove }" name="emails">
    <VeeField
      v-for="(field, index) in fields"
      :key="field.key"
      v-slot="{ componentField: controllerField, errors }"
      :name="`emails[${index}].address`"
    >
      <Field orientation="horizontal" :data-invalid="!!errors.length">
        <FieldContent class="flex-1">
          <InputGroup>
            <InputGroupInput
              :id="`email-${index}`"
              v-bind="controllerField"
              type="email"
              placeholder="name@example.com"
              autocomplete="email"
              :aria-invalid="!!errors.length"
            />
            <!-- Remove button -->
          </InputGroup>
          <FieldError v-if="errors.length" :errors="errors" />
        </FieldContent>
      </Field>
    </VeeField>
  </VeeFieldArray>
</template>
```

### Menambah Item

Pakai method `push` untuk menambahkan item baru ke array.

```vue showLineNumbers title="Form.vue"
<template>
  <Button
    type="button"
    variant="outline"
    size="sm"
    :disabled="fields.length >= 5"
    @click="push({ address: '' })"
  >
    Add Email Address
  </Button>
</template>
```

### Menghapus Item

Pakai method `remove` untuk menghapus item dari array. Tampilkan tombol hapusnya secara bersyarat.

```vue showLineNumbers title="Form.vue"
<template>
  <InputGroupAddon v-if="fields.length > 1" align="inline-end">
    <InputGroupButton
      type="button"
      variant="ghost"
      size="icon-xs"
      :aria-label="`Remove email ${index + 1}`"
      @click="remove(index)"
    >
      <XIcon />
    </InputGroupButton>
  </InputGroupAddon>
</template>
```

### Validasi Array

Pakai method `array` milik Zod untuk memvalidasi field array.

```ts showLineNumbers title="Form.vue"
const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email('Enter a valid email address.'),
      }),
    )
    .min(1, 'Add at least one email address.')
    .max(5, 'You can add up to 5 email addresses.'),
})
```

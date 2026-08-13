---
title: Input OTP
description: Komponen kode sekali pakai yang mudah diakses, lengkap dengan dukungan salin-tempel.
component: true
links:
  doc: https://vue-input-otp.vercel.app/
---

::component-preview
---
name: InputOTPDemo
description: Komponen input OTP.
---
::

## Instalasi

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add input-otp
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Pasang dependensi berikut:
    ::

    ```bash
    npm install vue-input-otp
    ```

    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input-otp) ke project Anda.
    ::

    ::step
    Sesuaikan path import dengan struktur project Anda.
    ::
  :::
::::

:::::

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
</script>

<template>
  <InputOTP v-model="value" :maxlength="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

## Contoh

### Pola

Pakai prop `pattern` untuk menentukan pola kustom pada input OTP.

::component-preview
---
name: InputOTPPatternDemo
description: Komponen input OTP dengan pola kustom.
---
::

```vue showLineNumbers {2,9}
<script setup lang="ts">
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'vue-input-otp'
// ...
</script>

<template>
  <InputOTP
    maxlength="6"
    :pattern="REGEXP_ONLY_DIGITS_AND_CHARS"
  >
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <!-- ... -->
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Separator
Pakai komponen `<InputOTPSeparator />` untuk menyisipkan pemisah di antara kelompok input.

::component-preview
---
name: InputOTPSeparatorDemo
description: Komponen input OTP dengan pemisah.
---
::

```vue showLineNumbers {5,17}
<script setup lang="ts">
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
// ...
</script>

<template>
  <InputOTP maxlength="4">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Dikendalikan dari Luar
Pakai direktif `v-model` untuk mengendalikan nilai input dari luar.

::component-preview
---
name: InputOTPControlledDemo
description: Komponen input OTP yang nilainya dikendalikan dari luar.
---
::

### Form

Komponen InputOTP bisa dipakai di dalam form, misalnya bersama VeeValidate.

::component-preview
---
name: InputOTPFormDemo
description: Komponen input OTP yang dipakai di dalam form.
---
::

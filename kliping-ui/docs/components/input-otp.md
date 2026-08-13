---
title: Input OTP
description: Komponen kode sekali pakai yang mudah diakses, lengkap dengan dukungan salin-tempel.
component: true
links:
  doc: https://vue-input-otp.vercel.app/
---

<ComponentPreview name="InputOTPDemo" />


## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add input-otp
```

**Manual**

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

    ```bash
    npm install vue-input-otp
    ```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input-otp) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

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

<ComponentPreview name="InputOTPPatternDemo" />


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

<ComponentPreview name="InputOTPSeparatorDemo" />


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

<ComponentPreview name="InputOTPControlledDemo" />


### Form

Komponen InputOTP bisa dipakai di dalam form, misalnya bersama VeeValidate.

<ComponentPreview name="InputOTPFormDemo" />

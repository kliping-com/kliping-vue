---
title: Calendar
description: Komponen isian tanggal yang memungkinkan pengguna memasukkan dan menyunting tanggal.
component: true
links:
  doc: https://reka-ui.com/docs/components/calendar
  api: https://reka-ui.com/docs/components/calendar#api-reference
---

<ComponentPreview name="CalendarDemo" />


## Tentang

Komponen `<Calendar />` dibangun di atas [Calendar milik Reka UI](https://www.reka-ui.com/docs/components/calendar), yang memakai paket [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) untuk mengurus tanggal.

Kalau yang Anda butuhkan kalender rentang tanggal, lihat komponen [Range Calendar](./range-calendar.md).

## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add calendar
```

**Manual**

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

```bash
npm install reka-ui
```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/calendar) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar'
</script>

<template>
  <Calendar />
</template>
```

## Sistem Penanggalan (Persia / Hijriah / Jalali, misalnya)

[@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) mendukung 13 sistem penanggalan.
Di sini kami memakai kalender Persia sebagai contoh, untuk menunjukkan cara memakai sistem penanggalan pada `<Calendar />` maupun komponen kalender lainnya.

Sistem penanggalan bawaannya adalah `gregory`.<br/>
Untuk memakai sistem penanggalan lain, berikan nilai bersistem tersebut lewat prop **`defaultPlaceholder`** atau **`placeholder`**.

Sebaiknya prop `placeholder` atau `defaultPlaceholder` tetap Anda isi, meski Anda tidak memakai sistem penanggalan lain.

```vue
<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, PersianCalendar, toCalendar, today } from '@internationalized/date'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'

const date = ref(today(getLocalTimeZone())) as Ref<DateValue> // no need to add calendar identifier to modelValue when using placeholder

const placeholder = ref(toCalendar(today(getLocalTimeZone()), new PersianCalendar())) as Ref<DateValue>
// or
const defaultPlaceholder = toCalendar(today(getLocalTimeZone()))
</script>

<template>
  <Calendar
    v-model="date"
    v-model:placeholder="placeholder"
    locale="fa-IR"
  />
  <!-- or -->
  <Calendar
    v-model="date"
    :default-placeholder="placeholder"
    locale="fa-IR"
  />
</template>
```

Kalau keduanya dikosongkan, tanggal yang dikeluarkan akan memakai kalender `gregorian`, karena sistem itu yang paling umum dipakai.

Nilai yang dikeluarkan komponen Calendar berbeda-beda tergantung pengenal sistem penanggalan yang Anda tentukan. <br />

Anda juga bisa mengubah locale lewat prop `locale` agar tampilannya sesuai dengan sistem penanggalan yang dipakai.

::: details Lihat kode lengkap

```vue showLineNumbers
<script setup lang="ts">
import {
  CalendarDate,
  fromDate,
  getLocalTimeZone,
  parseDate,
  PersianCalendar,
  toCalendar,
  today
} from '@internationalized/date'
import { ref } from 'vue'

const date = ref(toCalendar(new CalendarDate(2025, 1, 1), new PersianCalendar()))
// or
const date = ref(toCalendar(parseDate('2022-02-03'), new PersianCalendar()))
// or
const date = ref(toCalendar(today(getLocalTimeZone()), new PersianCalendar()))
// or
const date = ref(new CalendarDate(new PersianCalendar(), 1404, 1, 1))
// or
const date = ref(toCalendar(fromDate(new Date(), getLocalTimeZone()), new PersianCalendar()))

const placeholder = ref(toCalendar(today(getLocalTimeZone()), new PersianCalendar()))
</script>

<template>
  <Calendar
    v-model="date"
    v-model:placeholder="placeholder"
    locale="fa-IR"
    dir="rtl"
  />
</template>
```

:::

<ComponentPreview name="CalendarPersianDemo" />


## Contoh

### Sistem Penanggalan

Meng-import `createCalendar` akan menyertakan seluruh kalender yang tersedia ke dalam bundle Anda. Kalau Anda ingin membatasi kalender yang didukung demi memperkecil ukuran bundle, buatlah implementasi sendiri yang hanya meng-import kelas yang Anda butuhkan. Dengan begitu bundler bisa membuang implementasi kalender yang tidak terpakai.

Lihat [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/), terutama bagian [**Calendar Identifiers**](https://react-spectrum.adobe.com/internationalized/date/Calendar.html#calendar-identifiers).

```ts
import { GregorianCalendar, JapaneseCalendar } from '@internationalized/date'

function createCalendar(identifier) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar()
    case 'japanese':
      return new JapaneseCalendar()
    default:
      throw new Error(`Unsupported calendar ${identifier}`)
  }
}
```

<ComponentPreview name="CalendarSystems" />


### Pemilih Bulan dan Tahun

Pastikan Anda mengisi prop `placeholder` atau `defaultPlaceholder` saat memakai fitur ini.

<ComponentPreview name="CalendarYearAndMonthSelector" />


### Pemilih Tanggal Lahir

<ComponentPreview name="CalendarDateBirth" />


### Pemilih Tanggal dan Waktu

<ComponentPreview name="CalendarDateAndTimePicker" />


### Pemilih Berbahasa Alami

Komponen ini memakai library `chrono-node` untuk membaca tanggal yang ditulis dalam bahasa sehari-hari.

<ComponentPreview name="CalendarNaturalLanguagePicker" />


### Heading dan Ukuran Sel Kustom

<ComponentPreview name="CalendarCustomCellSize" />

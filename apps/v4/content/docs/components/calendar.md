---
title: Calendar
description: Komponen isian tanggal yang memungkinkan pengguna memasukkan dan menyunting tanggal.
component: true
links:
  doc: https://reka-ui.com/docs/components/calendar
  api: https://reka-ui.com/docs/components/calendar#api-reference
---

::component-preview
---
name: CalendarDemo
description: Komponen kalender.
---
::

## Tentang

Komponen `<Calendar />` dibangun di atas [Calendar milik Reka UI](https://www.reka-ui.com/docs/components/calendar), yang memakai paket [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) untuk mengurus tanggal.

Kalau yang Anda butuhkan kalender rentang tanggal, lihat komponen [Range Calendar](./range-calendar.md).

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
npx shadcn-vue@latest add calendar
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Pasang dependensi berikut:
    ::

    ```bash
    npm install reka-ui
    ```

    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/calendar) ke project Anda.
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

::code-collapsible-wrapper

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

::

::component-preview
---
name: CalendarPersianDemo
description: Kalender Persia.
---
::

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

::component-preview
---
name: CalendarSystems
title: Calendar systems
description: Kalender dengan beberapa sistem penanggalan.
class: '**:[.preview]:h-[560px] mt-8'
---
::

### Pemilih Bulan dan Tahun

Pastikan Anda mengisi prop `placeholder` atau `defaultPlaceholder` saat memakai fitur ini.

::component-preview
---
name: CalendarYearAndMonthSelector
title: Month and Year Selector
description: Kalender dengan dropdown bulan dan tahun.
---
::

### Pemilih Tanggal Lahir

::component-preview
---
name: CalendarDateBirth
title: Date of Birth Picker
description: Kalender dengan pemilih tanggal lahir.
---
::

### Pemilih Tanggal dan Waktu

::component-preview
---
name: CalendarDateAndTimePicker
title: Date and Time Picker
description: Kalender dengan pemilih tanggal dan waktu.
---
::

### Pemilih Berbahasa Alami

Komponen ini memakai library `chrono-node` untuk membaca tanggal yang ditulis dalam bahasa sehari-hari.

::component-preview
---
name: CalendarNaturalLanguagePicker
title: Natural Language Picker
description: Kalender dengan pemilih berbahasa alami.
---
::

### Heading dan Ukuran Sel Kustom

::component-preview
---
name: CalendarCustomCellSize
title: Custom Heading and Cell Size
description: Kalender dengan ukuran sel kustom yang responsif.
class: '**:[.preview]:h-[560px]'
---
::

---
title: Range Calendar
description: Tampilan kalender yang dirancang khusus untuk memilih rentang tanggal.
component: true
links:
  doc: https://reka-ui.com/docs/components/range-calendar
  api: https://reka-ui.com/docs/components/range-calendar#api-reference
---

<ComponentPreview name="CalendarRangeDemo" />


## Tentang

Komponen `<RangeCalendar />` dibangun di atas [Range Calendar milik Reka UI](https://www.reka-ui.com/docs/components/date-range-picker.html), yang memakai paket [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) untuk mengurus tanggal.

Kalau yang Anda butuhkan kalender biasa, lihat komponen [Calendar](./calendar.md).

## Instalasi

**CLI**

```bash
npx shadcn-vue@latest add range-calendar
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/range-calendar) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

## Penggunaan
```vue
<script setup lang="ts">
import { RangeCalendar } from "@/components/ui/range-calendar";
</script>

<template>
  <RangeCalendar />
</template>
```

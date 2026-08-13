---
title: Date Picker
description: Komponen pemilih tanggal, lengkap dengan rentang tanggal dan pilihan siap pakai.
component: true
links:
  doc: https://reka-ui.com/docs/components/date-picker
  api: https://reka-ui.com/docs/components/date-picker#api-reference
---

<ComponentPreview name="DatePickerDemo" />


## Instalasi

Date Picker dibangun dari perpaduan komponen `<Popover />` dan `<Calendar />`.

Ikuti langkah pemasangan komponen [Popover](/components/popover) dan [Calendar](/components/calendar) terlebih dahulu.

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const date = ref<Date>()
const defaultPlaceholder = today(getLocalTimeZone())
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !date && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ date ? date.toDateString() : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-model="date"
        :initial-focus="true"
        :default-placeholder="defaultPlaceholder"
        layout="month-and-year"
      />
    </PopoverContent>
  </Popover>
</template>
```

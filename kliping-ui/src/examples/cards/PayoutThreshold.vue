<script setup lang="ts">
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const CURRENCIES = [
  { label: 'USD — Dolar Amerika Serikat', value: 'usd' },
  { label: 'EUR — Euro', value: 'eur' },
  { label: 'GBP — Pound Inggris', value: 'gbp' },
  { label: 'JPY — Yen Jepang', value: 'jpy' },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Ambang Pencairan</CardTitle>
      <CardDescription>
        Tentukan saldo minimum yang harus tercapai sebelum pencairan dijalankan.
      </CardDescription>
      <CardAction>
        <Button
          variant="ghost"
          size="icon-sm"
          class="bg-muted"
          aria-label="Tutup ambang pencairan"
        >
          <HugeiconsIcon :icon="Cancel01Icon" :stroke-width="2" />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="preferred-currency">
            Mata Uang Pilihan
          </FieldLabel>
          <Select default-value="usd">
            <SelectTrigger id="preferred-currency" class="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="item in CURRENCIES"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <div class="flex items-baseline justify-between">
            <FieldLabel id="min-payout-label">
              Jumlah Pencairan Minimum
            </FieldLabel>
            <span class="text-2xl font-semibold tabular-nums">
              $2500.00
            </span>
          </div>
          <Progress
            :model-value="25"
            aria-labelledby="min-payout-label"
            aria-valuetext="$2,500 of $10,000"
          />
          <div class="flex items-center justify-between">
            <FieldDescription>$50 (MIN)</FieldDescription>
            <FieldDescription>$10,000 (MAX)</FieldDescription>
          </div>
        </Field>
        <Field>
          <FieldLabel for="payout-notes">
            Catatan
          </FieldLabel>
          <Textarea
            id="payout-notes"
            placeholder="Tambahkan catatan untuk pengaturan pencairan ini..."
            class="min-h-[100px]"
          />
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Simpan Ambang
      </Button>
    </CardFooter>
  </Card>
</template>

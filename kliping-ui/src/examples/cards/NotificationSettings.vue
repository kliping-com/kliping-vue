<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'

const NOTIFICATIONS = [
  {
    id: 'transactions',
    label: 'Peringatan transaksi',
    description: 'Setoran, penarikan, dan transfer.',
    defaultChecked: true,
  },
  {
    id: 'security',
    label: 'Peringatan keamanan',
    description: 'Percobaan masuk dan perubahan akun.',
    defaultChecked: true,
  },
  {
    id: 'goals',
    label: 'Capaian target',
    description: 'Pemberitahuan di 25%, 50%, 75%, dan 100%.',
    defaultChecked: false,
  },
  {
    id: 'market',
    label: 'Kabar pasar',
    description: 'Ringkasan portofolio harian dan peringatan harga.',
    defaultChecked: false,
  },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Notifikasi</CardTitle>
      <CardDescription>
        Pilih pemberitahuan email dan push yang ingin Anda terima.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field v-for="n in NOTIFICATIONS" :key="n.id" orientation="horizontal">
          <Checkbox
            :id="`notify-${n.id}`"
            :default-value="n.defaultChecked"
          />
          <FieldContent>
            <FieldLabel :for="`notify-${n.id}`">
              {{ n.label }}
            </FieldLabel>
            <FieldDescription>{{ n.description }}</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Simpan Preferensi
      </Button>
    </CardFooter>
  </Card>
</template>

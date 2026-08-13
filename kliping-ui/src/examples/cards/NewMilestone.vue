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
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Pasang target baru</CardTitle>
      <CardDescription>
        Tentukan target finansial Anda, lalu kami bantu mengatur ritme menabungnya.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="goal-name">
            Nama Target
          </FieldLabel>
          <Input
            id="goal-name"
            placeholder="mis. Mobil Baru, DP Rumah"
          />
        </Field>
        <div class="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel for="target-amount">
              Jumlah Target
            </FieldLabel>
            <Input id="target-amount" default-value="$15,000" />
          </Field>
          <Field>
            <FieldLabel for="target-date">
              Tanggal Target
            </FieldLabel>
            <Input id="target-date" default-value="Dec 2025" />
          </Field>
        </div>
      </FieldGroup>
    </CardContent>
    <CardFooter class="flex-col gap-2">
      <Button class="w-full">
        Buat Target
      </Button>
      <Button variant="outline" class="w-full">
        Batal
      </Button>
    </CardFooter>
  </Card>
</template>

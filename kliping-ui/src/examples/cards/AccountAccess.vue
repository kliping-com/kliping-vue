<script setup lang="ts">
import {
  AlertCircleIcon,
  ArrowRight01Icon,
  SquareLock02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

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
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Akses Akun</CardTitle>
      <CardDescription>
        Perbarui kredensial Anda atau masuk ulang.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="email-address">
            Alamat Email
          </FieldLabel>
          <Input
            id="email-address"
            type="email"
            placeholder="artist@studio.inc"
          />
        </Field>
        <Field>
          <div class="flex items-center justify-between">
            <FieldLabel for="current-password">
              Kata Sandi Sekarang
            </FieldLabel>
            <a
              href="#"
              class="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
            >
              Lupa?
            </a>
          </div>
          <Input
            id="current-password"
            type="password"
            placeholder="••••••••••••••••••••••••"
          />
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter class="flex-col gap-4">
      <Button class="w-full">
        <HugeiconsIcon :icon="SquareLock02Icon" :stroke-width="2" />
        Perbarui Keamanan
      </Button>
      <Item variant="muted" as-child>
        <a href="#">
          <ItemMedia variant="icon">
            <HugeiconsIcon
              :icon="AlertCircleIcon"
              class="text-destructive"
              :stroke-width="2"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Zona Berbahaya</ItemTitle>
            <ItemDescription class="line-clamp-1">
              Arsipkan akun dan hapus katalog
            </ItemDescription>
          </ItemContent>
          <HugeiconsIcon
            :icon="ArrowRight01Icon"
            class="size-4"
            :stroke-width="2"
          />
        </a>
      </Item>
    </CardFooter>
  </Card>
</template>

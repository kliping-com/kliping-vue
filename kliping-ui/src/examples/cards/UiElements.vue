<script setup lang="ts">
import {
  ArrowRight02Icon,
  ArrowUp01Icon,
  Search01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Field, FieldGroup } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <Card class="w-full">
    <CardContent class="flex flex-col gap-6">
      <div class="flex gap-2">
        <Button>
          Button
          <HugeiconsIcon
            :icon="ArrowRight02Icon"
            :stroke-width="2"
            data-icon="inline-end"
          />
        </Button>
        <Button variant="secondary">
          Secondary
        </Button>
        <Button variant="outline">
          Outline
        </Button>
      </div>
      <FieldGroup>
        <Field>
          <InputGroup>
            <InputGroupInput placeholder="Nama" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>
                <HugeiconsIcon :icon="Search01Icon" :stroke-width="2" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field class="flex-1">
          <Textarea placeholder="Pesan" class="resize-none" />
        </Field>
      </FieldGroup>
      <div class="flex items-center gap-2">
        <div class="flex gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">
            Secondary
          </Badge>
          <Badge variant="outline" class="hidden 4xl:flex">
            Outline
          </Badge>
        </div>
        <RadioGroup
          default-value="apple"
          class="ml-auto flex w-fit gap-3"
          aria-label="Pilihan buah"
        >
          <RadioGroupItem value="apple" aria-label="Apple" />
          <RadioGroupItem value="banana" aria-label="Banana" />
        </RadioGroup>
        <div class="flex gap-3">
          <Checkbox :default-value="true" aria-label="Aktifkan peringatan email" />
          <Checkbox
            class="hidden 4xl:flex"
            aria-label="Aktifkan peringatan push"
          />
        </div>
        <Switch
          :default-value="true"
          class="flex 4xl:hidden"
          aria-label="Aktifkan notifikasi ringkas"
        />
      </div>
      <div class="flex items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="outline">
              <span class="hidden md:flex style-sera:md:hidden">
                Dialog Peringatan
              </span>
              <span class="flex md:hidden style-sera:md:flex">Dialog</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm" class="theme-neutral">
            <AlertDialogHeader>
              <AlertDialogTitle>Izinkan aksesori terhubung?</AlertDialogTitle>
              <AlertDialogDescription>
                Izinkan aksesori USB ini terhubung ke perangkat dan data Anda?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Jangan izinkan</AlertDialogCancel>
              <AlertDialogAction>Izinkan</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <ButtonGroup class="ml-auto">
          <Button variant="outline">
            <span class="style-sera:hidden">Grup Tombol</span>
            <span class="hidden style-sera:block">Grup</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="outline"
                size="icon"
                aria-label="Buka aksi cepat"
              >
                <HugeiconsIcon :icon="ArrowUp01Icon" :stroke-width="2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" class="w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Aksi Cepat</DropdownMenuLabel>
                <DropdownMenuItem>Bisukan Percakapan</DropdownMenuItem>
                <DropdownMenuItem>Tandai Sudah Dibaca</DropdownMenuItem>
                <DropdownMenuItem>Blokir Pengguna</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  Hapus Percakapan
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
        <Switch
          :default-value="true"
          class="hidden 4xl:flex"
          aria-label="Aktifkan setelan lanjutan"
        />
      </div>
    </CardContent>
  </Card>
</template>

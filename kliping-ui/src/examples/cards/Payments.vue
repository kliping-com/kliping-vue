<script setup lang="ts">
import {
  ArrowRight01Icon,
  Calendar03Icon,
  MoreHorizontalCircle01Icon,
  RefreshIcon,
  Settings01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
</script>

<template>
  <Card>
    <CardHeader class="flex flex-col gap-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Beranda
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Opsi akun"
                >
                  <HugeiconsIcon
                    :icon="MoreHorizontalCircle01Icon"
                    :stroke-width="2"
                  />
                  <span class="sr-only">Opsi akun</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profil</DropdownMenuItem>
                  <DropdownMenuItem>Rekening Koran</DropdownMenuItem>
                  <DropdownMenuItem>Dokumen</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pembayaran</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </CardHeader>
    <CardContent>
      <ItemGroup>
        <div role="listitem" class="w-full">
          <Item variant="muted" as-child>
            <a href="#">
              <ItemMedia variant="icon">
                <HugeiconsIcon :icon="Settings01Icon" :stroke-width="2" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Ubah batas transfer</ItemTitle>
                <ItemDescription>
                  Atur berapa banyak yang bisa Anda kirim dari saldo.
                </ItemDescription>
              </ItemContent>
              <HugeiconsIcon
                :icon="ArrowRight01Icon"
                class="size-4 shrink-0 text-muted-foreground"
                :stroke-width="2"
              />
            </a>
          </Item>
        </div>
        <div role="listitem" class="w-full">
          <Item variant="muted" as-child>
            <a href="#">
              <ItemMedia variant="icon">
                <HugeiconsIcon :icon="Calendar03Icon" :stroke-width="2" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Transfer terjadwal</ItemTitle>
                <ItemDescription>
                  Siapkan transfer untuk dikirim di tanggal berikutnya.
                </ItemDescription>
              </ItemContent>
              <HugeiconsIcon
                :icon="ArrowRight01Icon"
                class="size-4 shrink-0 text-muted-foreground"
                :stroke-width="2"
              />
            </a>
          </Item>
        </div>
        <div role="listitem" class="w-full">
          <Item variant="muted" as-child>
            <a href="#">
              <ItemMedia variant="icon">
                <HugeiconsIcon :icon="RefreshIcon" :stroke-width="2" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Pembayaran kartu berulang</ItemTitle>
                <ItemDescription>
                  Kelola transaksi kartu yang berulang.
                </ItemDescription>
              </ItemContent>
              <HugeiconsIcon
                :icon="ArrowRight01Icon"
                class="size-4 shrink-0 text-muted-foreground"
                :stroke-width="2"
              />
            </a>
          </Item>
        </div>
      </ItemGroup>
    </CardContent>
  </Card>
</template>

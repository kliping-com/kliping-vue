<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Item, ItemContent } from '@/components/ui/item'
import { Separator } from '@/components/ui/separator'

const netRoyalties = 1248.75
const processingFee = 37.46
const totalClaimable = netRoyalties - processingFee

function formatCurrency(amount: number) {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardDescription>Saldo Bisa Dicairkan</CardDescription>
      <CardTitle class="text-4xl tabular-nums">
        ${{ formatCurrency(totalClaimable) }}
      </CardTitle>
      <Badge variant="outline">
        <span class="size-2 rounded-full bg-yellow-500" />
        Menunggu Penyiapan
      </Badge>
    </CardHeader>
    <CardContent class="flex flex-1 flex-col justify-end">
      <Item variant="muted" class="flex-col items-stretch">
        <ItemContent class="gap-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Royalti Bersih
            </span>
            <span class="text-sm font-medium tabular-nums">
              ${{ formatCurrency(netRoyalties) }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Biaya Proses
            </span>
            <span class="text-sm font-medium tabular-nums">
              -${{ formatCurrency(processingFee) }}
            </span>
          </div>
          <Separator />
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Total Siap Dicairkan
            </span>
            <span class="text-sm font-semibold tabular-nums">
              ${{ formatCurrency(totalClaimable) }} USD
            </span>
          </div>
        </ItemContent>
      </Item>
    </CardContent>
    <CardFooter>
      <CardDescription>
        Setelah rekening bank terhubung, saldo di atas $10,00 otomatis masuk pencairan bulanan setiap tanggal 15.
      </CardDescription>
    </CardFooter>
  </Card>
</template>

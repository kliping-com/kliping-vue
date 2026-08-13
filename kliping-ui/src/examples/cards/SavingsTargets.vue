<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
} from '@/components/ui/item'
import { Progress } from '@/components/ui/progress'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Target Tabungan</CardTitle>
      <CardDescription>
        Target yang sedang berjalan sepanjang 2024 di seluruh portofolio Anda. Pantau seberapa dekat tiap targetnya.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ItemGroup class="gap-3">
        <Item
          role="listitem"
          variant="muted"
          class="flex-col items-stretch"
        >
          <ItemContent class="gap-3">
            <ItemDescription class="cn-font-heading text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Dana Pensiun
            </ItemDescription>
            <span class="text-3xl font-semibold tabular-nums">
              $420,000
            </span>
            <Progress :model-value="65" aria-label="Kemajuan tabungan pensiun" />
          </ItemContent>
          <ItemFooter>
            <span class="text-sm text-muted-foreground">
              65% tercapai
            </span>
            <span class="text-sm font-medium tabular-nums">$273,000</span>
          </ItemFooter>
        </Item>
        <Item
          role="listitem"
          variant="muted"
          class="flex-col items-stretch"
        >
          <ItemContent class="gap-3">
            <ItemDescription class="cn-font-heading text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Properti
            </ItemDescription>
            <span class="text-3xl font-semibold tabular-nums">
              $85,000
            </span>
            <Progress :model-value="32" aria-label="Kemajuan tabungan properti" />
          </ItemContent>
          <ItemFooter>
            <span class="text-sm text-muted-foreground">
              32% tercapai
            </span>
            <span class="text-sm font-medium tabular-nums">$27,200</span>
          </ItemFooter>
        </Item>
      </ItemGroup>
    </CardContent>
    <CardFooter>
      <CardDescription class="text-center">
        Target tahun ini belum tercapai.
      </CardDescription>
    </CardFooter>
  </Card>
</template>

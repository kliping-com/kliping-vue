<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const areaPath = 'M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z'
const strokePath = 'M0 52L18 40L36 46L54 70L72 50L100 49'
</script>

<template>
  <Card class="mx-auto w-full max-w-sm data-[size=sm]:pb-0" size="sm">
    <CardHeader>
      <CardTitle>Analitik</CardTitle>
      <CardDescription>
        418,2 rb Pengunjung <Badge>+10%</Badge>
      </CardDescription>
      <CardAction>
        <Button variant="outline" size="sm">
          Lihat Analitik
        </Button>
      </CardAction>
    </CardHeader>
    <svg
      viewBox="0 0 100 86"
      preserveAspectRatio="none"
      class="aspect-[1/0.35] w-full text-chart-1"
      role="img"
      aria-label="Tren pengunjung"
    >
      <path :d="areaPath" fill="currentColor" opacity="0.28" />
      <path
        :d="strokePath"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </Card>
</template>

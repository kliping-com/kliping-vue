<script setup lang="ts">
import { Add01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
</script>

<template>
  <Card>
    <CardContent>
      <Empty class="p-4">
        <EmptyMedia variant="icon">
          <HugeiconsIcon :icon="Add01Icon" :stroke-width="2" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Distribusikan Lagu</EmptyTitle>
          <EmptyDescription>
            Unggah master pertama Anda supaya lagunya mulai sampai ke pendengar di Spotify, Apple Music, dan lainnya.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Buat Rilis</Button>
        </EmptyContent>
      </Empty>
    </CardContent>
  </Card>
</template>

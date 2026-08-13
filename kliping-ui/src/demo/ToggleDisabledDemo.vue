<script setup lang="ts">
import { Underline } from '@lucide/vue'
import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <Toggle aria-label="Toggle underline" disabled>
    <Underline class="h-4 w-4" />
  </Toggle>
</template>

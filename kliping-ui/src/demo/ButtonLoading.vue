<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
</script>

<template>
  <Button size="sm" variant="outline" disabled>
    <Spinner class="animate-spin" />
    Submit
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
</script>

<template>
  <Button disabled>
    <Spinner />
    Processing Payment
  </Button>
</template>

<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'
</script>

<template>
  <ButtonGroup>
    <Input placeholder="Search..." />
    <Button variant="outline" aria-label="Search">
      <SearchIcon />
    </Button>
  </ButtonGroup>
</template>

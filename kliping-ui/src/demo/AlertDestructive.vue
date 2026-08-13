<script setup lang="ts">
import { AlertCircleIcon } from '@lucide/vue'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
</script>

<template>
  <Alert variant="destructive">
    <AlertCircleIcon />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>

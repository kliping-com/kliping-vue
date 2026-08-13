<script lang="ts">
export const description = "A sidebar in a dialog."
export const iframeHeight = "800px"
</script>

<script setup lang="ts">
import SettingsDialog from "@/blocks/sidebar-13/components/SettingsDialog.vue"
</script>

<template>
  <div class="flex h-svh items-center justify-center">
    <SettingsDialog />
  </div>
</template>

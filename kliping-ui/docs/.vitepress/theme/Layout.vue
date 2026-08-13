<script setup lang="ts">
import { ConfigProvider, TooltipProvider } from 'reka-ui'
import DefaultTheme from 'vitepress/theme'

// Tooltip, dan beberapa komponen lain yang ikut memakainya, mengandalkan
// provider yang dipasang sekali di akar aplikasi. Di aplikasi Nuxt asalnya
// provider ini ada di app.vue; di sini tempatnya adalah layout tema, supaya
// setiap pratinjau di halaman mana pun sudah berada di dalamnya.
const { Layout } = DefaultTheme
</script>

<template>
  <ConfigProvider>
    <TooltipProvider>
      <Layout />
    </TooltipProvider>
  </ConfigProvider>
</template>

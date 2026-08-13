<script setup lang="ts">
import type { Component } from 'vue'
import { ConfigProvider, TooltipProvider } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<{ name: string }>()

// Halaman block dirender tanpa kerangka VitePress (frontmatter `layout: false`),
// jadi block-nya mendapat seluruh viewport — sama seperti waktu dipakai sebagai
// halaman sungguhan. Halaman inilah yang dibingkai kartu di galeri.
const blok = Object.fromEntries(
  Object.entries(import.meta.glob('@/blocks/*/page.vue', { eager: true })).map(
    ([jalur, m]) => [jalur.split('/').slice(-2)[0], (m as any).default as Component],
  ),
)

const komponen = computed(() => blok[props.name])
</script>

<template>
  <!-- Halaman ini melewati layout tema, jadi provider yang biasanya dipasang di
       sana tidak ikut. Dipasang di sini supaya block yang memakai tooltip —
       sidebar yang terlipat, misalnya — tetap punya konteksnya. -->
  <ConfigProvider>
    <TooltipProvider>
      <component :is="komponen" v-if="komponen" />
      <p v-else class="p-8 text-sm">
        Block <code>{{ name }}</code> tidak ditemukan.
      </p>
    </TooltipProvider>
  </ConfigProvider>
</template>

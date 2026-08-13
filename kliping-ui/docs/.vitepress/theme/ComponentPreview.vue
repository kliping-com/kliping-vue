<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  class?: string
  previewClass?: string
  align?: 'start' | 'center' | 'end'
}>()

/**
 * Markdown merujuk contoh lewat namanya saja, jadi pemetaan nama ke komponen
 * disusun dari isi folder, bukan dari daftar impor yang harus ditulis manual.
 *
 * Diambil eager supaya isinya ikut ter-render saat build: kalau dimuat malas,
 * halaman statisnya keluar kosong dan contohnya baru muncul setelah JavaScript
 * jalan di peramban.
 */
function petakan(modul: Record<string, any>, nama: (jalur: string) => string) {
  return Object.fromEntries(
    Object.entries(modul).map(([jalur, m]) => [nama(jalur), m.default as Component]),
  )
}

const contoh: Record<string, Component> = {
  ...petakan(
    import.meta.glob('@/demo/*.vue', { eager: true }),
    j => j.split('/').pop()!.replace(/\.vue$/, ''),
  ),
  ...petakan(
    import.meta.glob('@/charts/*.vue', { eager: true }),
    j => j.split('/').pop()!.replace(/\.vue$/, ''),
  ),
  // Blok adalah satu folder berisi halaman utuh; namanya diambil dari foldernya.
  ...petakan(
    import.meta.glob('@/blocks/*/page.vue', { eager: true }),
    j => j.split('/').slice(-2)[0],
  ),
}

const komponen = computed(() => contoh[props.name])

const perataan = computed(() => ({
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
}[props.align ?? 'center']))
</script>

<template>
  <div class="kliping-preview my-6 overflow-hidden rounded-lg border">
    <div
      class="flex min-h-[350px] w-full justify-center p-8"
      :class="[perataan, previewClass]"
    >
      <component :is="komponen" v-if="komponen" />
      <p v-else class="text-muted-foreground self-center text-sm">
        Demo <code>{{ name }}</code> belum tersedia.
      </p>
    </div>
  </div>
</template>

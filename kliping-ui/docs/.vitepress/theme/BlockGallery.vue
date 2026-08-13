<script setup lang="ts">
import { withBase } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ names: string[] }>()

/**
 * Tiap block dibingkai iframe ke halaman block-nya sendiri, bukan dirender
 * langsung di sini.
 *
 * Block adalah tata letak selebar halaman — sidebar, grid dasbor, form yang
 * memusat. Dirender di dalam kolom dokumentasi yang sempit, semuanya patah dan
 * yang terlihat bukan lagi block-nya. Iframe memberi tiap block lebar desktop
 * yang diasumsikannya, lalu hasilnya diperkecil ke ukuran kartu.
 */
const LEBAR = 1440
const TINGGI = 900

const wadah = ref<HTMLElement>()
const skala = ref(0.25)
let pengamat: ResizeObserver | undefined

function ukur() {
  const lebar = wadah.value?.querySelector('.kliping-blok-bingkai')?.clientWidth
  if (lebar)
    skala.value = lebar / LEBAR
}

onMounted(() => {
  ukur()
  pengamat = new ResizeObserver(ukur)
  if (wadah.value)
    pengamat.observe(wadah.value)
})

onBeforeUnmount(() => pengamat?.disconnect())
</script>

<template>
  <div ref="wadah" class="kliping-blok-galeri">
    <a v-for="name in props.names" :key="name" :href="withBase(`/blocks/${name}`)" class="kliping-blok-kartu">
      <div class="kliping-blok-bingkai">
        <iframe
          :src="withBase(`/blocks/${name}`)"
          :title="name"
          loading="lazy"
          :width="LEBAR"
          :height="TINGGI"
          :style="{ transform: `scale(${skala})` }"
        />
      </div>
      <span class="kliping-blok-nama">{{ name }}</span>
    </a>
  </div>
</template>

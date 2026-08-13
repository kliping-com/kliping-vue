<template>
  <!-- Padanan blok ::steps milik Nuxt Content. Tiap langkah dibungkus
       div.kliping-step, dan nomornya digambar CSS lewat counter — jadi isi tiap
       langkah tetap markdown biasa, termasuk blok kode di dalamnya. -->
  <div class="kliping-steps">
    <slot />
  </div>
</template>

<style>
.kliping-steps {
  counter-reset: langkah;
  margin: 1.5rem 0 1.5rem 0.5rem;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 1.75rem;
}

.kliping-steps > .kliping-step {
  counter-increment: langkah;
  position: relative;
  padding-bottom: 0.5rem;
}

.kliping-steps > .kliping-step::before {
  content: counter(langkah);
  position: absolute;
  top: 0;
  left: -2.65rem;
  display: flex;
  height: 1.75rem;
  width: 1.75rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9999px;
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
}

.kliping-steps > .kliping-step > :first-child {
  margin-top: 0;
}
</style>

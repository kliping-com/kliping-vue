<script setup lang="ts">
import { siteConfig } from '~/lib/config'

// A single static share image rather than one rendered per page. Generating
// them per route is what hung the Cloudflare prerender, and the payoff was
// small: the card that shows up in a chat app only needs to look like Kliping.
useSeoMeta({
  title: siteConfig.name,
  titleTemplate: `%s - ${siteConfig.name}`,
  description: siteConfig.description,
  ogType: 'website',
  ogSiteName: siteConfig.name,
  ogImage: siteConfig.ogImage,
  twitterCard: 'summary_large_image',
  twitterImage: siteConfig.ogImage,
})
</script>

<template>
  <div
    data-slot="layout"
    class="group/layout relative z-10 flex min-h-svh flex-col bg-background has-data-[slot=designer]:h-svh has-data-[slot=designer]:overflow-hidden"
  >
    <SiteHeader />
    <main class="flex min-h-0 flex-1 flex-col">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

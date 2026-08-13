<script setup lang="ts">
import { ArrowRightIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import MessageScrollerDemo from '@/demo/MessageScrollerDemo.vue'
import AccountAccess from '@/examples/cards/AccountAccess.vue'
import AnalyticsCard from '@/examples/cards/AnalyticsCard.vue'
import ClaimableBalance from '@/examples/cards/ClaimableBalance.vue'
import ContributionHistory from '@/examples/cards/ContributionHistory.vue'
import DividendIncome from '@/examples/cards/DividendIncome.vue'
import EmptyDistributeTrack from '@/examples/cards/EmptyDistributeTrack.vue'
import NewMilestone from '@/examples/cards/NewMilestone.vue'
import NotificationSettings from '@/examples/cards/NotificationSettings.vue'
import Payments from '@/examples/cards/Payments.vue'
import PayoutThreshold from '@/examples/cards/PayoutThreshold.vue'
import PowerUsage from '@/examples/cards/PowerUsage.vue'
import QrConnect from '@/examples/cards/QrConnect.vue'
import SavingsTargets from '@/examples/cards/SavingsTargets.vue'
import SidebarNav from '@/examples/cards/SidebarNav.vue'
import UiElements from '@/examples/cards/UiElements.vue'

// Susunannya mengikuti halaman muka repo asal: kolom bertambah seiring lebar
// layar, dan tiap kolom baru berisi kartu yang boleh hilang di layar sempit.
// Yang ditampilkan bukan gambar, melainkan komponen yang sungguh berjalan.
</script>

<template>
  <div class="kliping-beranda">
    <section class="flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
      <Badge as-child variant="secondary" class="bg-muted">
        <a :href="withBase('/changelog')">
          <span class="flex size-2 rounded-full bg-green-500" title="Baru" />
          Baru: Typeset, Questionnaire, dan lainnya <ArrowRightIcon />
        </a>
      </Badge>

      <h1 class="text-foreground max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance xl:text-5xl xl:tracking-tighter">
        Fondasi untuk Design System Anda
      </h1>

      <p class="text-foreground max-w-4xl text-base text-balance sm:text-lg">
        Kumpulan komponen Vue yang rapi, siap Anda klip, ubah, dan kembangkan.
        Mulai dari sini, lalu jadikan milik Anda sendiri. Open source, open code.
      </p>

      <div class="flex w-full items-center justify-center gap-2 pt-2">
        <Button as-child size="sm" class="h-[31px] rounded-lg">
          <a :href="withBase('/introduction')">
            Mulai Pakai <ArrowRightIcon />
          </a>
        </Button>
        <Button as-child size="sm" variant="outline" class="h-[31px] rounded-lg">
          <a :href="withBase('/blocks')">Lihat Blocks</a>
        </Button>
      </div>
    </section>

    <div
      data-slot="demo"
      class="theme-neutral bg-muted dark:bg-background relative flex w-full max-w-none flex-col gap-(--gap) overflow-hidden p-12 pb-0! [--gap:--spacing(8)] lg:p-6 lg:[--gap:--spacing(6)] 3xl:[--gap:--spacing(8)] min-[1900px]:p-12 min-[1900px]:[--gap:--spacing(10)]!"
    >
      <div
        class="relative z-10 mx-auto grid gap-(--gap) md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-[1600px] 2xl:max-w-[1900px] min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! **:data-[slot=card]:w-full"
      >
        <div class="flex flex-col items-start gap-(--gap)">
          <UiElements />
          <SidebarNav />
          <SavingsTargets />
        </div>
        <div class="hidden flex-col gap-(--gap) lg:flex">
          <ContributionHistory />
          <ClaimableBalance />
          <DividendIncome />
        </div>
        <div class="hidden flex-col gap-(--gap) min-[1400px]:flex">
          <NewMilestone />
          <PayoutThreshold />
          <AccountAccess />
        </div>
        <div class="hidden flex-col gap-(--gap) md:flex">
          <QrConnect />
          <div class="**:[.text-center.text-xs]:hidden">
            <MessageScrollerDemo />
          </div>
          <Payments />
        </div>
        <div class="hidden flex-col gap-(--gap) min-[1900px]:flex">
          <EmptyDistributeTrack />
          <AnalyticsCard />
          <NotificationSettings />
          <PowerUsage />
        </div>
      </div>

      <!-- Kartu paling bawah dibiarkan terpotong dan dipudarkan, supaya terbaca
           sebagai petak yang masih berlanjut, bukan daftar yang habis. -->
      <div class="from-background via-muted absolute inset-x-0 top-0 z-1 h-120 bg-linear-to-b to-transparent dark:hidden" />
      <div class="from-background via-muted/80 dark:via-background/80 absolute inset-x-0 bottom-0 z-20 h-48 bg-linear-to-t to-transparent lg:h-80 xl:h-64" />
    </div>
  </div>
</template>

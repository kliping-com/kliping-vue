<script setup lang="ts">
import {
  ActivityIcon,
  Analytics01Icon,
  AnalyticsUpIcon,
  ArrowDataTransferHorizontalIcon,
  BankIcon,
  BookOpen02Icon,
  Calendar03Icon,
  ChartBarLineIcon,
  CreditCardIcon,
  File02Icon,
  Globe02Icon,
  HelpCircleIcon,
  Message01Icon,
  Notification03Icon,
  PaintBoardIcon,
  PieChartIcon,
  ShieldIcon,
  Target02Icon,
  UserIcon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import { Card } from '@/components/ui/card'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const sections = [
  {
    label: 'Ikhtisar',
    className: 'xl:col-start-1 xl:row-start-2',
    items: [
      { icon: Analytics01Icon, label: 'Analitik', isActive: true },
      { icon: ArrowDataTransferHorizontalIcon, label: 'Transaksi' },
      { icon: AnalyticsUpIcon, label: 'Investasi' },
      { icon: BankIcon, label: 'Rekening' },
      { icon: PieChartIcon, label: 'Pengeluaran' },
    ],
  },
  {
    label: 'Perencanaan',
    className: 'xl:col-start-1 xl:row-start-1',
    items: [
      { icon: File02Icon, label: 'Dokumen' },
      { icon: Wallet01Icon, label: 'Anggaran' },
      { icon: ChartBarLineIcon, label: 'Laporan' },
      { icon: Target02Icon, label: 'Target' },
      { icon: Calendar03Icon, label: 'Kalender' },
    ],
  },
  {
    label: 'Bantuan',
    className: 'flex xl:col-start-2 xl:row-start-1',
    items: [
      { icon: HelpCircleIcon, label: 'Pusat Bantuan' },
      { icon: BookOpen02Icon, label: 'Dokumentasi' },
      { icon: Message01Icon, label: 'Hubungi Kami' },
      { icon: ActivityIcon, label: 'Status' },
      { icon: Globe02Icon, label: 'Komunitas' },
    ],
  },
  {
    label: 'Akun',
    className: 'flex xl:col-start-2 xl:row-start-2',
    items: [
      { icon: UserIcon, label: 'Profil' },
      { icon: CreditCardIcon, label: 'Tagihan', isActive: true },
      { icon: Notification03Icon, label: 'Notifikasi' },
      { icon: ShieldIcon, label: 'Keamanan' },
      { icon: PaintBoardIcon, label: 'Tampilan' },
    ],
  },
]
</script>

<template>
  <div class="grid w-full grid-cols-2 gap-4 xl:gap-6">
    <Card
      v-for="section in sections"
      :key="section.label"
      :class="cn('w-full overflow-hidden rounded-3xl py-0', section.className)"
    >
      <SidebarProvider class="min-h-0">
        <Sidebar collapsible="none" class="w-full bg-transparent">
          <SidebarContent class="gap-0 overflow-hidden">
            <SidebarGroup>
              <SidebarGroupLabel>{{ section.label }}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu class="gap-1">
                  <SidebarMenuItem v-for="item in section.items" :key="item.label">
                    <SidebarMenuButton :is-active="item.isActive">
                      <HugeiconsIcon :icon="item.icon" :stroke-width="2" />
                      {{ item.label }}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </Card>
  </div>
</template>

---
title: Sidebar
description: Komponen sidebar yang bisa dikomposisikan, diberi tema, dan disesuaikan.
component: true
---

<!-- TODO: add all component preview -->

::component-preview
---
title: Sidebar
name: sidebar-07
description: Komponen sidebar yang bisa dikomposisikan, diberi tema, dan disesuaikan.
class: 'w-full'
type: block
---
::

Sidebar termasuk komponen yang paling rumit dibangun. Ia jadi pusat hampir
setiap aplikasi, dan biasanya memuat banyak bagian yang saling bergerak.

Membangun sidebar itu melelahkan. Karena itu upstream membangunnya 30 kali lebih,
dalam berbagai konfigurasi, lalu menyaring bagian intinya menjadi `Sidebar*.vue`.

Hasilnya adalah fondasi yang kokoh untuk Anda kembangkan. Bisa dikomposisikan,
diberi tema, dan disesuaikan.

[Jelajahi koleksi block-nya](/blocks).

## Instalasi

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add sidebar
```

::

::::tabs-content{value="manual"}

  :::steps
    ::step
    Pasang komponen ini
    ::

    ```bash
    npx shadcn-vue@latest add sidebar
    ```

    ::step
    Tambahkan warna-warna berikut ke file CSS Anda
    ::

    Perintah di atas semestinya sudah memasang warnanya untuk Anda. Kalau belum, salin dan tempel isi berikut ke file CSS Anda.

    ```css
    @layer base {
      :root {
        --sidebar-background: 0 0% 98%;
        --sidebar-foreground: 240 5.3% 26.1%;
        --sidebar-primary: 240 5.9% 10%;
        --sidebar-primary-foreground: 0 0% 98%;
        --sidebar-accent: 240 4.8% 95.9%;
        --sidebar-accent-foreground: 240 5.9% 10%;
        --sidebar-border: 220 13% 91%;
        --sidebar-ring: 217.2 91.2% 59.8%;
     }

      .dark {
        --sidebar-background: 240 5.9% 10%;
        --sidebar-foreground: 240 4.8% 95.9%;
        --sidebar-primary: 224.3 76.3% 48%;
        --sidebar-primary-foreground: 0 0% 100%;
        --sidebar-accent: 240 3.7% 15.9%;
        --sidebar-accent-foreground: 240 4.8% 95.9%;
        --sidebar-border: 240 3.7% 15.9%;
        --sidebar-ring: 217.2 91.2% 59.8%;
      }
    }
    ```
  :::

::::

:::::

## Struktur

Komponen `Sidebar` tersusun dari bagian-bagian berikut:

- `SidebarProvider` — mengurus state buka-tutup.
- `Sidebar` — wadah sidebar-nya.
- `SidebarHeader` dan `SidebarFooter` — menempel di bagian atas dan bawah sidebar.
- `SidebarContent` — isi yang bisa digulir.
- `SidebarGroup` — bagian di dalam `SidebarContent`.
- `SidebarTrigger` — pemicu untuk membuka dan menutup sidebar.

<img
  src="/images/sidebar-structure.png"
  width="716"
  height="420"
  alt="Struktur Sidebar"
  class="border dark:hidden rounded-lg overflow-hidden mt-6 w-full"
/>
<img
  src="/images/sidebar-structure-dark.png"
  width="716"
  height="420"
  alt="Struktur Sidebar"
  class="border hidden dark:block rounded-lg overflow-hidden mt-6 w-full"
/>

## Penggunaan

```vue showLineNumbers
<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">Acme Inc</span>
                <span class="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton as-child>
                  <a href="#">
                    <Home />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
```

## Sidebar Pertama Anda

Mari mulai dari sidebar paling sederhana: sidebar yang bisa dilipat dan berisi menu.

:::steps

  ::step
  Tambahkan `SidebarProvider` dan `SidebarTrigger` di bagian terluar aplikasi Anda
  ::

  ```vue showLineNumbers
  <script setup lang="ts">
  import AppSidebar from '@/components/AppSidebar.vue'
  import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
  </script>

  <template>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <slot />
      </main>
    </SidebarProvider>
  </template>
  ```

  ::step
  Buat komponen sidebar baru di `@/components/AppSidebar.vue`
  ::

  ```vue showLineNumbers
  <script setup lang="ts">
  import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
  </script>

  <template>
    <Sidebar>
      <SidebarContent />
    </Sidebar>
  </template>
  ```

  ::step
  Sekarang tambahkan `SidebarMenu` ke dalam sidebar
  ::

  Komponen `SidebarMenu` akan kita letakkan di dalam `SidebarGroup`.

  ```vue showLineNumbers
  <script setup lang="ts">
  import { Calendar, Home, Inbox, Search, Settings } from '@lucide/vue'
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from '@/components/ui/sidebar'

  // Menu items.
  const items = [
    {
      title: 'Home',
      url: '#',
      icon: Home,
    },
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
    },
    {
      title: 'Calendar',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
  ]
  </script>

  <template>
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton as-child>
                  <a :href="item.url">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </template>
  ```

  ::step
  Sidebar pertama Anda sudah jadi.
  ::

  Hasilnya kurang lebih seperti ini:

<figure class="flex flex-col gap-4">

  ::component-preview
  ---
  title: Sidebar
  name: sidebar-demo
  description: Sidebar pertama Anda.
  class: 'w-full'
  type: block
  ---
  ::

  <figcaption class="text-center text-sm text-gray-500">
    Sidebar pertama Anda
  </figcaption>
</figure>

:::

## Komponennya

Komponen di berkas `Sidebar*.vue` dirancang agar bisa dikomposisikan — Anda menyusun sidebar dengan merangkai komponen yang tersedia. Semuanya juga menyatu baik dengan komponen lain seperti `DropdownMenu`, `Collapsible`, `Dialog`, dan sebagainya.

**Kalau Anda perlu mengubah kode di berkas `Sidebar*.vue`, silakan saja. Kodenya milik Anda. Pakai komponen yang tersedia sebagai titik awal untuk membangun versi Anda sendiri.**

## SidebarProvider

Komponen `SidebarProvider` menyediakan konteks sidebar untuk semua komponen di dalamnya.

### Props

Komponen `SidebarProvider` menerima prop berikut:

### Lebar

Pakai prop `defaultOpen`, `open`, dan `onOpenChange` untuk mengendalikan keadaan buka-tutup sidebar.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <SidebarProvider :open="open" @update:open="open = $event">
    <!-- ... -->
  </SidebarProvider>
</template>
```

### Pintasan Keyboard

Komponen `SidebarProvider` mendukung pintasan keyboard untuk membuka dan menutup sidebar. Pintasan bawaannya `cmd+b` atau `ctrl+b`.

```vue showLineNumbers
<SidebarProvider>
  <!-- ... -->
</SidebarProvider>
```

### State yang Tersimpan

Untuk menyimpan keadaan sidebar, pakai prop `storageKey` pada komponen `SidebarProvider`.

```vue showLineNumbers
<SidebarProvider storage-key="sidebar">
  <!-- ... -->
</SidebarProvider>
```

```vue showLineNumbers
<SidebarProvider
  :default-open="false"
  storage-key="sidebar"
  class="flex min-h-screen"
>
  <!-- ... -->
</SidebarProvider>
```

## Sidebar

Komponen sidebar utamanya.

```vue showLineNumbers
<Sidebar>
  <SidebarHeader />
  <SidebarContent />
  <SidebarFooter />
</Sidebar>
```

### Props

Komponen `Sidebar` menerima prop berikut:

### side

Pakai prop `side` untuk menentukan di sisi mana sidebar berada.

```vue showLineNumbers
<Sidebar side="left">
  <!-- ... -->
</Sidebar>
```

### variant

Pakai prop `variant` untuk menentukan varian sidebar.

```vue showLineNumbers
<!-- Default variant -->
<Sidebar variant="sidebar">
  <!-- ... -->
</Sidebar>
```

```vue showLineNumbers
<!-- Floating variant -->
<Sidebar variant="floating">
  <!-- ... -->
</Sidebar>
```

```vue showLineNumbers
<!-- Inset variant -->
<Sidebar variant="inset">
  <!-- ... -->
</Sidebar>
```

### collapsible

Pakai prop `collapsible` supaya sidebar bisa dilipat.

```vue showLineNumbers
<Sidebar collapsible="icon">
  <!-- ... -->
</Sidebar>
```

```vue showLineNumbers
<Sidebar collapsible="offcanvas">
  <!-- ... -->
</Sidebar>
```

## useSidebar

Composable `useSidebar` dipakai untuk mengendalikan sidebar.

```vue showLineNumbers
<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar'

const {
  state,
  open,
  setOpen,
  openMobile,
  setOpenMobile,
  isMobile,
  toggleSidebar,
} = useSidebar()
</script>
```

## SidebarHeader

Menampilkan bagian header sidebar.

```vue showLineNumbers
<Sidebar>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd class="size-4" />
          </div>
          <div class="flex flex-col gap-0.5 leading-none">
            <span class="font-semibold">Documentation</span>
            <span class="">v1.0.0</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</Sidebar>
```

## SidebarFooter

Menampilkan bagian footer sidebar.

```vue showLineNumbers
<Sidebar>
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuButton>
              <User2 /> Username
              <ChevronUp class="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            class="w-(--reka-popper-anchor-width)"
          >
            <DropdownMenuItem>
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>
```

## SidebarContent

Area isi sidebar yang bisa digulir.

```vue showLineNumbers
<Sidebar>
  <SidebarContent>
    <SidebarGroup />
    <SidebarGroup />
  </SidebarContent>
</Sidebar>
```

## SidebarGroup

Mengelompokkan item menu di dalam sidebar.

```vue showLineNumbers
<SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>Application</SidebarGroupLabel>
    <SidebarGroupContent>
      <!-- SidebarMenu -->
    </SidebarGroupContent>
  </SidebarGroup>
</SidebarContent>
```

## SidebarGroup yang Bisa Dilipat

Untuk membuat `SidebarGroup` bisa dilipat, bungkus dengan komponen `Collapsible`.

```vue showLineNumbers
<SidebarGroup as-child>
  <Collapsible default-open class="group/collapsible">
    <SidebarGroupLabel as-child>
      <CollapsibleTrigger class="group/label w-full text-left text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&[data-state=open]>svg]:rotate-90">
        Help
        <ChevronRight class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
      </CollapsibleTrigger>
    </SidebarGroupLabel>
    <CollapsibleContent>
      <SidebarGroupContent>
        <SidebarMenu>
          <!-- Menu items -->
        </SidebarMenu>
      </SidebarGroupContent>
    </CollapsibleContent>
  </Collapsible>
</SidebarGroup>
```

## SidebarGroupAction

Komponen `SidebarGroupAction` menampilkan tombol aksi di header sebuah grup sidebar.

```vue showLineNumbers
<SidebarGroup>
  <SidebarGroupLabel>
    Projects
    <SidebarGroupAction>
      <Plus /> <span class="sr-only">Add Project</span>
    </SidebarGroupAction>
  </SidebarGroupLabel>
  <SidebarGroupContent></SidebarGroupContent>
</SidebarGroup>
```

## SidebarMenu

Komponen `SidebarMenu` menampilkan menu di dalam sidebar.

```vue showLineNumbers
<SidebarGroupContent>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton as-child>
        <a href="#">
          <Home />
          <span>Home</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton as-child>
        <a href="#">
          <Inbox />
          <span>Inbox</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroupContent>
```

## SidebarMenuButton

Komponen `SidebarMenuButton` menampilkan tombol menu di dalam sidebar.

### Tautan atau Anchor

Pakai prop `as-child` untuk menampilkan `SidebarMenuButton` sebagai tautan atau elemen anchor.

```vue showLineNumbers
<SidebarMenuButton as-child>
  <a href="#">
    <Home />
    <span>Home</span>
  </a>
</SidebarMenuButton>
```

### Ikon dan Label

Komponen `SidebarMenuButton` bisa memuat ikon sekaligus label.

```vue showLineNumbers
<SidebarMenuButton>
  <Home />
  <span>Home</span>
</SidebarMenuButton>
```

### isActive

Pakai prop `isActive` untuk menandai tombol menu yang sedang aktif.

```vue showLineNumbers
<SidebarMenuButton :is-active="true">
  <Home />
  <span>Home</span>
</SidebarMenuButton>
```

## SidebarMenuAction

Komponen `SidebarMenuAction` menampilkan aksi menu di dalam sidebar.

```vue showLineNumbers
<SidebarMenuItem>
  <SidebarMenuButton>
    <Home />
    <span>Home</span>
  </SidebarMenuButton>
  <SidebarMenuAction>
    <MoreHorizontal />
  </SidebarMenuAction>
</SidebarMenuItem>
```

### DropdownMenu

Komponen `SidebarMenuAction` bisa dipadukan dengan `DropdownMenu`.

```vue showLineNumbers
<SidebarMenuItem>
  <SidebarMenuButton>
    <Home />
    <span>Home</span>
  </SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <SidebarMenuAction>
        <MoreHorizontal />
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
      <DropdownMenuItem>
        <span>Edit Project</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Delete Project</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</SidebarMenuItem>
```

## SidebarMenuSub

Komponen `SidebarMenuSub` menampilkan submenu di dalam sidebar.

```vue showLineNumbers
<SidebarMenuItem>
  <SidebarMenuButton>
    <Home />
    <span>Home</span>
  </SidebarMenuButton>
  <SidebarMenuSub>
    <SidebarMenuItem>
      <SidebarMenuButton>
        <span>History</span>
      </SidebarMenuButton>
    </SidebarMenuItem>

    <SidebarMenuItem>
      <SidebarMenuButton>
        <span>Starred</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenuSub>
</SidebarMenuItem>
```

## SidebarMenu yang Bisa Dilipat

Untuk membuat `SidebarMenu` bisa dilipat, bungkus dengan komponen `Collapsible`.

```vue showLineNumbers
<SidebarMenuItem>
  <Collapsible default-open class="group/collapsible">
    <CollapsibleTrigger as-child>
      <SidebarMenuButton>
        <Home />
        <span>Home</span>
        <ChevronRight class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
      </SidebarMenuButton>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenuSub>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <span>History</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <span>Starred</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenuSub>
    </CollapsibleContent>
  </Collapsible>
</SidebarMenuItem>
```

## SidebarMenuBadge

Komponen `SidebarMenuBadge` menampilkan badge di dalam menu sidebar.

```vue showLineNumbers
<SidebarMenuButton>
  <Home />
  <span>Home</span>
  <SidebarMenuBadge>24</SidebarMenuBadge>
</SidebarMenuButton>
```

## SidebarMenuSkeleton

Komponen `SidebarMenuSkeleton` bisa Anda pakai untuk menampilkan kerangka pemuatan di dalam menu sidebar.

```vue showLineNumbers
<SidebarMenu>
  <SidebarMenuItem v-for="item in Array.from({ length: 5 })" :key="item">
    <SidebarMenuSkeleton />
  </SidebarMenuItem>
</SidebarMenu>
```

## SidebarSeparator

Komponen `SidebarSeparator` menampilkan pemisah di dalam sidebar.

```vue showLineNumbers
<SidebarContent>
  <SidebarGroup />
  <SidebarSeparator />
  <SidebarGroup />
</SidebarContent>
```

## SidebarTrigger

Komponen `SidebarTrigger` menampilkan tombol pemicu untuk sidebar.

```vue showLineNumbers
<SidebarTrigger />
```

## Pemicu Buatan Sendiri

Anda bisa membuat pemicu sendiri memakai composable `useSidebar`.

```vue showLineNumbers
<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar'

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button @click="toggleSidebar">
    Toggle Sidebar
  </Button>
</template>
```

## SidebarRail

Komponen `SidebarRail` menampilkan bilah tipis di sisi sidebar. Biasanya dipakai untuk membuka sidebar saat di-hover dalam keadaan terlipat.

```vue showLineNumbers
<Sidebar collapsible="icon">
  <SidebarHeader />
  <SidebarContent />
  <SidebarFooter />
  <SidebarRail />
</Sidebar>
```

## Sidebar yang Dikendalikan dari Luar

Pakai prop `open` dan `onOpenChange` untuk mengendalikan sidebar dari luar.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <SidebarProvider :open="open" @update:open="open = $event">
    <Sidebar />
  </SidebarProvider>
</template>
```

## Tema

Tema sidebar bisa Anda atur lewat CSS variable.

```css
@layer base {
  :root {
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}
```

## Pemberian Style

Beberapa tips untuk men-style sidebar:

- Pakai atribut `data-sidebar` dan `data-state` untuk men-style sidebar.
- Sidebar otomatis mengatur CSS variable `--sidebar-width`. Nilai itu bisa Anda pakai untuk menyesuaikan tata letak konten utama.
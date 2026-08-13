---
title: Data Table
description: Tabel dan datagrid bertenaga, dibangun memakai TanStack Table.
component: true
---

::component-preview
---
name: DataTableDemo
description: Data table dengan pengurutan, penyaringan, dan navigasi halaman.
align: start
previewClass: items-start h-auto px-4 md:px-8
---
::

## Pengantar

Setiap data table atau datagrid yang pernah dibuat selalu punya kebutuhan berbeda: perilakunya lain, aturan pengurutan dan penyaringannya khas, dan sumber datanya pun beragam.

Menyatukan semua variasi itu ke dalam satu komponen justru tidak masuk akal. Kalau dipaksakan, keluwesan yang ditawarkan [headless UI](https://tanstack.com/table/latest/docs/introduction#what-is-headless-ui) malah hilang.

Jadi alih-alih menyediakan komponen data table jadi, halaman ini berisi panduan membangun data table Anda sendiri.

Kita mulai dari komponen `<Table />` yang sederhana, lalu membangun data table yang rumit dari nol.

::callout{class="mt-4"}

**Tips:** kalau tabel yang sama Anda pakai di beberapa tempat, pisahkan saja menjadi komponen yang bisa dipakai ulang.

::

## Daftar Isi

Panduan ini menunjukkan cara memakai [TanStack Table](https://tanstack.com/table) bersama komponen `<Table />` untuk membangun data table Anda sendiri. Yang akan kita bahas:

- [Menyiapkan fitur tabel](#menyiapkan-fitur-tabel)
- [Tabel dasar](#tabel-dasar)
- [Aksi per baris](#aksi-per-baris)
- [Navigasi halaman](#navigasi-halaman)
- [Pengurutan](#pengurutan)
- [Penyaringan](#penyaringan)
- [Visibilitas kolom](#visibilitas-kolom)
- [Pemilihan baris](#pemilihan-baris)
- [Baris yang bisa dibuka](#baris-yang-bisa-dibuka)
- [Komponen pakai-ulang](#komponen-pakai-ulang)


## Instalasi

1. Tambahkan komponen `<Table />` ke project Anda:

```bash
npx shadcn-vue@latest add table
```

2. Pasang dependensi `@tanstack/vue-table`. Panduan ini memakai **TanStack Table v9**:

```bash
npm install @tanstack/vue-table
```



## Persiapan

Kita akan membangun tabel yang menampilkan pembayaran terbaru. Bentuk datanya seperti ini:

```ts showLineNumbers
interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  // ...
]
```

## Struktur Berkas

Mulai dengan membuat susunan berkas berikut:

```ansi
 components
    └── payments
          ├── columns.ts
          ├── features.ts
          ├── data-table.vue
          ├── data-table-dropdown.vue
└── app.vue
```

Contoh di sini memakai Nuxt, tapi caranya berlaku untuk framework Vue mana pun.

- `columns.ts` — berisi definisi kolom.
- `features.ts` — berisi objek `features` bersama yang memberi tahu TanStack Table perilaku mana saja yang diaktifkan.
- `data-table.vue` — berisi komponen `<DataTable />`.
- `data-table-dropdown.vue` — berisi komponen `<DropdownAction />`.
- `app.vue` — tempat kita mengambil data dan menampilkan tabelnya.

## Menyiapkan Fitur Tabel

TanStack Table v9 berbasis fitur: perilaku yang Anda inginkan — pengurutan, penyaringan, navigasi halaman, dan seterusnya — dinyatakan lewat `tableFeatures()`. Apa pun yang tidak Anda daftarkan akan dibuang dari bundle. Termasuk fungsi filter dan sort bawaannya: daftarkan yang dipakai kolom Anda di bawah `filterFns` dan `sortFns`. Filter email di sini memakai `includesString`, sedangkan kolom teks diurutkan dengan `alphanumeric` / `text`.

Objek `features` kita definisikan sekali di `features.ts`, lalu dipakai bersama oleh definisi kolom dan komponen `<DataTable />`.

```ts showLineNumbers
// components/payments/features.ts
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from '@tanstack/vue-table'

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  expandedRowModel: createExpandedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

// Pass this as the first generic argument to `ColumnDef`, `Column`, `Table`,
// and `Row` so each type knows which feature APIs are available.
export type DataTableFeatures = typeof features
```

::callout{class="mt-4"}

**Catatan:** row model inti selalu disertakan, jadi Anda tidak perlu mendaftarkannya sendiri. Row model untuk fitur opsional dibuat lewat `create*RowModel()` dan didaftarkan pada objek features — opsi `get*RowModel` sudah tidak ada lagi.

::

## Tabel Dasar

Mari mulai dengan membangun tabel sederhana.

<Steps>

### Definisi Kolom

Pertama, definisikan kolom-kolomnya di berkas `columns.ts` memakai column helper yang bertipe sesuai objek features kita.

```ts showLineNumbers
// components/payments/columns.ts
import { createColumnHelper } from '@tanstack/vue-table'
import type { DataTableFeatures } from './features'

// This type defines the shape of our data.
// You can use a Zod schema here if you want.
export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

export const columns = columnHelper.columns([
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
  }),
])
```

::callout{class="mt-4"}

**Catatan:** kolom adalah tempat Anda menentukan inti tampilan tabel
Anda. Di sanalah ditentukan data apa yang ditampilkan, serta bagaimana data itu
diformat, diurutkan, dan disaring.

::

### Komponen `<DataTable />`

Berikutnya, kita buat komponen `<DataTable />` untuk menampilkan tabelnya.

`useTable` harus dipanggil saat setup komponen supaya bisa menyatu dengan sistem reaktivitas Vue. Setelah itu tabelnya mengurus state-nya sendiri: pembacaan seperti `table.getRowModel()` di template bersifat reaktif, jadi markup Anda otomatis ikut diperbarui — tanpa perlu ref atau handler perubahan. `data` dan `columns` kita teruskan lewat getter supaya tabel selalu membaca nilai prop terkini.

```vue
<script setup lang="ts" generic="TData">
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, useTable } from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { features, type DataTableFeatures } from './features'

const props = defineProps<{
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}>()

const table = useTable({
  features,
  get data() { return props.data },
  get columns() { return props.columns },
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :header="header" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() && 'selected'"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :cell="cell" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
```

`<FlexRender />` menerima instance `header` atau `cell` yang Anda berikan, lalu menampilkan apa pun yang disediakan definisi kolomnya — teks biasa, render function, atau sebuah komponen.

::callout

**Tips:** kalau `<DataTable />` Anda pakai di beberapa tempat, komponen inilah yang sebaiknya dijadikan pakai-ulang dengan memindahkannya ke `components/ui/data-table.vue`.

`<DataTable :columns="columns" :data="data" />`

::

::callout{class="mt-4"}

**State terkendali:** karena v9 memegang state tabel secara internal, hampir sepanjang panduan ini Anda tidak perlu menulis ref atau handler `on*Change`. Kalau ada bagian di luar tabel yang perlu memegang sepotong state — misalnya menyelaraskan filter dengan URL, atau navigasi halaman dari server — state terkendali tetap tersedia. Kita akan mengelola bagian pemilihan baris dari luar di bagian [Pemilihan baris](#pemilihan-baris). Detailnya ada di [panduan migrasi](https://tanstack.com/table/latest/docs/framework/vue/guide/migrating).

::

### Tampilkan tabelnya

Terakhir, kita tampilkan tabelnya di komponen halaman utama.

```vue
<script setup lang="ts">
import type { Payment } from './components/payments/columns'
import { onMounted, ref } from 'vue'
import { columns } from './components/payments/columns'
import DataTable from './components/payments/data-table.vue'

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
```

</Steps>

## Memformat Isi Sel

Mari format sel jumlah agar menampilkan nilai mata uang, sekaligus meratakannya ke kanan.

<Steps>

### Perbarui definisi kolom

Perbarui definisi `header` dan `cell` untuk kolom jumlah seperti berikut:

```ts
// components/payments/columns.ts
import { h } from 'vue'

export const columns = columnHelper.columns([
  // ...
  columnHelper.accessor('amount', {
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }),
])
```
Cara yang sama bisa Anda pakai untuk memformat sel dan header lainnya.
</Steps>

## Aksi per Baris

Mari tambahkan aksi di tiap baris tabel. Untuk ini kita pakai komponen `<Dropdown />`.

<Steps>

### Tambahkan kode berikut ke komponen `DataTableDropDown.vue` Anda

```vue
<script setup lang="ts">
import { MoreHorizontal } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

defineProps<{
  payment: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Perbarui definisi kolom

Perbarui definisi kolom untuk menambahkan kolom `actions` baru. Sel `actions` mengembalikan komponen `<Dropdown />`. Karena kolom ini tidak membaca field data mana pun, kita definisikan lewat `columnHelper.display`.

```ts
// components/payments/columns.ts
import DropdownAction from '@/components/DataTableDropDown.vue'

export const columns = columnHelper.columns([
  // ...
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
      }))
    },
  }),
])
```

Data barisnya bisa Anda akses lewat `row.original` di dalam fungsi `cell`. Pakai itu untuk menangani aksi per baris — misalnya memakai `id` untuk memanggil DELETE ke API Anda.

</Steps>

## Navigasi Halaman

Berikutnya, kita tambahkan navigasi halaman ke tabel.

<Steps>

### Navigasi halaman sudah aktif

Karena objek features kita sudah mendaftarkan `rowPaginationFeature` dan `createPaginatedRowModel()`, tabelnya otomatis membagi baris menjadi halaman berisi 10 baris — tidak ada yang perlu ditambahkan ke `useTable`. Keterangan soal mengubah jumlah baris per halaman dan navigasi halaman manual ada di [dokumentasi pagination](https://tanstack.com/table/latest/docs/framework/vue/guide/pagination).

### Tambahkan tombol navigasinya

Tombol navigasi halaman bisa kita tambahkan memakai komponen `<Button />` bersama method `table.previousPage()` dan `table.nextPage()`.

```vue
<script setup lang="ts" generic="TData">
import { Button } from '@/components/ui/button'

// ...the rest of the script stays the same
</script>

<template>
  <div>
    <div class="border rounded-md">
      <Table>
        { // .... }
      </Table>
    </div>
    <div class="flex items-center justify-end py-4 space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>
```

Lihat bagian [Komponen pakai-ulang](#komponen-pakai-ulang) untuk komponen navigasi halaman yang lebih lengkap.

### Mengubah jumlah baris per halaman

Untuk mengubah jumlah baris per halaman, panggil `table.setPageSize()`. Untuk membaca state navigasi saat ini — misalnya untuk indikator halaman — baca `table.atoms.pagination.get()`.

```vue
<script setup lang="ts">
import { computed } from 'vue'

// Reactive read — updates whenever the user changes pages.
const pagination = computed(() => table.atoms.pagination.get())
</script>

<template>
  <Button variant="outline" size="sm" @click="table.setPageSize(20)">
    Show 20 rows
  </Button>

  <div class="text-sm text-muted-foreground">
    Page {{ pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
  </div>
</template>
```

::callout{class="mt-4"}

**Catatan:** pembacaan atom seperti `table.atoms.pagination.get()` bersifat reaktif di dalam lingkup pelacakan Vue — yaitu ekspresi template atau `computed`. Memanggil `.get()` langsung di tingkat teratas `<script setup>` hanya menghasilkan potret sesaat, jadi bungkus pembacaan di sisi script dengan `computed()`.

::

</Steps>

## Pengurutan

Mari buat kolom email bisa diurutkan.

`rowSortingFeature` beserta row model terurutnya sudah terdaftar di objek features kita — begitu pula fungsi sort `alphanumeric` dan `text` yang dipakai kolom teks lewat pengaturan bawaan `auto` — jadi tidak ada yang perlu diubah di `<DataTable />`. Kita tinggal menambahkan tampilannya.

<Steps>

### Buat sel header bisa diurutkan

Kita perbarui sel header `email` untuk menambahkan kendali pengurutan.

```ts showLineNumbers {2-3,8-13}
// components/payments/columns.ts
import { ArrowUpDown } from '@lucide/vue'
import { Button } from '@/components/ui/button'

export const columns = columnHelper.columns([
  // ...
  columnHelper.accessor('email', {
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  }),
])
```

Tabel akan terurut otomatis, naik maupun turun, saat pengguna mengklik sel header itu. State pengurutannya dipegang tabel sendiri — tidak perlu Anda sambungkan.

</Steps>

## Penyaringan

Mari tambahkan kolom pencarian untuk menyaring email di tabel kita.

`columnFilteringFeature`, row model tersaring, dan fungsi filter `includesString` sudah terdaftar di objek features kita, jadi yang tersisa hanya menampilkan input-nya.

<Steps>

### Tambahkan kolom pencarian

```vue
<script setup lang="ts" generic="TData">
import { Input } from '@/components/ui/input'

// ...the rest of the script stays the same
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter emails..."
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
    </div>
    <div class="border rounded-md">
      <Table>{ ... }</Table>
    </div>
  </div>
</template>
```

Penyaringan kini aktif untuk kolom `email`. Kolom lain juga bisa diberi filter — hanya perlu diingat, rujukan filter berupa teks hanya bisa menemukan fungsi yang sudah Anda daftarkan. Jadi kalau kolom lain butuh filter bawaan yang berbeda, tambahkan dulu ke `filterFns` di `features.ts`. Keterangan lengkapnya ada di [dokumentasi filtering](https://tanstack.com/table/latest/docs/framework/vue/guide/column-filtering).

</Steps>

## Visibilitas Kolom

Mengatur visibilitas kolom cukup mudah lewat API visibility milik `@tanstack/vue-table`. `columnVisibilityFeature` sudah terdaftar di objek features kita, jadi kita tinggal menambahkan dropdown-nya.

<Steps>

### Tambahkan dropdown pengatur kolom

```vue
<script setup lang="ts" generic="TData">
import { ChevronDown } from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// ...the rest of the script stays the same
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter emails..."
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDown class="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="(value) => {
              column.toggleVisibility(!!value)
            }"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="border rounded-md">
      <Table>{ ... }</Table>
    </div>
  </div>
</template>
```

Ini menambahkan menu dropdown untuk menyembunyikan dan memunculkan kolom.

</Steps>

## Pemilihan Baris

Berikutnya kita tambahkan pemilihan baris. `rowSelectionFeature` sudah terdaftar di objek features kita, jadi tabelnya sudah melacak pilihan pengguna — kita tinggal menampilkan checkbox-nya.

<Steps>

### Perbarui definisi kolom

```ts showLineNumbers {2,5-19}
// components/payments/columns.ts
import { Checkbox } from '@/components/ui/checkbox'

export const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  }),
  // ...
])
```

Ini menambahkan checkbox di tiap baris, plus satu checkbox di header untuk memilih semua baris sekaligus.

::callout{class="mt-4"}

**Catatan:** di v9, `table.getIsSomePageRowsSelected()` mengembalikan `true` selama ada minimal satu baris terpilih di halaman itu — termasuk saat semuanya terpilih. Checkbox header tetap bekerja karena `table.getIsAllPageRowsSelected() || ...` sudah menghasilkan `true` lebih dulu saat semua terpilih, sebelum cabang `'indeterminate'` sempat dievaluasi.

::

### Mengelola state pemilihan dari luar

Secara bawaan tabel melacak pilihan secara internal. Untuk menunjukkan bagaimana sepotong state bisa hidup di luar tabel — berguna kalau halaman Anda perlu membaca atau mengendalikan pilihan itu — kita akan memegang bagian ini saja lewat `ref` Vue, sementara sisanya tetap internal. Sediakan nilainya lewat getter `state`, lalu tangani pembaruannya di callback yang sesuai:

```ts showLineNumbers {2-3,5-7,13-18}
// components/payments/data-table.vue
import type { RowSelectionState } from '@tanstack/vue-table'
import { ref } from 'vue'

// Keep row selection outside the table so the rest of the app can read or update it.
const rowSelection = ref<RowSelectionState>({})

const table = useTable({
  features,
  get data() { return props.data },
  get columns() { return props.columns },
  state: {
    get rowSelection() { return rowSelection.value },
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
})
```

`rowSelection.value` kini bisa dibaca maupun ditulis dari mana saja di dalam komponen, dan tabelnya tetap ikut menyesuaikan.

### Tampilkan jumlah baris terpilih

Jumlah baris yang terpilih bisa Anda tampilkan lewat API `table.getFilteredSelectedRowModel()`.

```vue showLineNumbers {8-11}
<template>
  <div>
    <div class="border rounded-md">
        <Table />
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <PaginationButtons />
      </div>
    </div>
  </div>
</template>
```

</Steps>

## Baris yang Bisa Dibuka

Mari buat barisnya bisa dibuka. `rowExpandingFeature` beserta row model-nya sudah terdaftar di objek features kita, jadi tabelnya sudah melacak baris mana yang terbuka — kita tinggal menambahkan tampilannya.

<Steps>

### Perbarui `<DataTable>`

Perbarui `<TableBody>` supaya menampilkan baris tambahan setiap kali sebuah baris dibuka:

```vue showLineNumbers {3,9-13}
<TableBody>
  <template v-if="table.getRowModel().rows?.length">
    <template v-for="row in table.getRowModel().rows" :key="row.id">
      <TableRow :data-state="row.getIsSelected() && 'selected'">
        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :cell="cell" />
        </TableCell>
      </TableRow>
      <TableRow v-if="row.getIsExpanded()">
        <TableCell :colspan="row.getAllCells().length">
          {{ JSON.stringify(row.original) }}
        </TableCell>
      </TableRow>
    </template>
  </template>
  <template v-else>
    <TableRow>
      <TableCell :colspan="columns.length" class="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  </template>
</TableBody>
```

### Tambahkan aksi buka-baris ke komponen `DataTableDropDown.vue`

```vue showLineNumbers {12-14,34-36}
<script setup lang="ts">
import { MoreHorizontal } from '@lucide/vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  payment: {
    id: string
  }
}>()

defineEmits<{
  (e: 'expand'): void
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuItem @click="$emit('expand')">
        Expand
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Buat barisnya bisa dibuka

Sekarang kita perbarui sel aksinya untuk menambahkan kendali buka-baris.

```ts showLineNumbers {12}
// components/payments/columns.ts
export const columns = columnHelper.columns([
  // ...
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
        onExpand: () => row.toggleExpanded(),
      }))
    },
  }),
])
```

</Steps>

## Komponen Pakai-Ulang

Berikut beberapa komponen yang bisa Anda pakai untuk membangun data table. Semuanya diambil dari demo [Tasks](/examples/tasks).

### Header kolom

Membuat header kolom mana pun bisa diurutkan dan disembunyikan.

```vue showLineNumbers
<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { type Task } from '../data/schema'
import type { DataTableFeatures } from '../features'
import ArrowDownIcon from '~icons/radix-icons/arrow-down'
import ArrowUpIcon from '~icons/radix-icons/arrow-up'
import CaretSortIcon from '~icons/radix-icons/caret-sort'
import EyeNoneIcon from '~icons/radix-icons/eye-none'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps {
  column: Column<DataTableFeatures, Task>
  title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ title }}</span>
          <ArrowDownIcon v-if="column.getIsSorted() === 'desc'" class="w-4 h-4 ml-2" />
          <ArrowUpIcon v-else-if=" column.getIsSorted() === 'asc'" class="w-4 h-4 ml-2" />
          <CaretSortIcon v-else class="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeNoneIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>

```

```ts showLineNumbers
export const columns = columnHelper.columns([
  columnHelper.accessor('email', {
    header: ({ column }) => (
      h(DataTableColumnHeader, {
        column,
        title: 'Email',
      })
    ),
  }),
])
```

### Navigasi Halaman

Menambahkan kendali navigasi halaman ke tabel Anda, lengkap dengan jumlah baris per halaman dan hitungan baris terpilih.

```vue showLineNumbers
<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type Task } from '../data/schema'
import type { DataTableFeatures } from '../features'
import ChevronLeftIcon from '~icons/radix-icons/chevron-left'
import ChevronRightIcon from '~icons/radix-icons/chevron-right'
import DoubleArrowLeftIcon from '~icons/radix-icons/double-arrow-left'
import DoubleArrowRightIcon from '~icons/radix-icons/double-arrow-right'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps {
  table: Table<DataTableFeatures, Task>
}
const props = defineProps<DataTablePaginationProps>()

// Reactive atom read — a bare `.get()` in script setup is a one-time snapshot.
const pagination = computed(() => props.table.atoms.pagination.get())
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <Select
          :model-value="`${pagination.pageSize}`"
          @update:model-value="table.setPageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <DoubleArrowRightIcon class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

```

```vue
<DataTablePagination :table="table" />
```

### Pengatur kolom

Komponen untuk menyembunyikan dan memunculkan kolom.

```vue showLineNumbers
<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type Task } from '../data/schema'
import type { DataTableFeatures } from '../features'
import MixerHorizontalIcon from '~icons/radix-icons/mixer-horizontal'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<DataTableFeatures, Task>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="hidden h-8 ml-auto lg:flex"
      >
        <MixerHorizontalIcon class="w-4 h-4 mr-2" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :modelValue="column.getIsVisible()"
        @update:modelValue="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```
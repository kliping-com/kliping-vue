---
title: Combobox
description: Isian dengan pelengkapan otomatis dan command palette berisi daftar saran.
component: true
links:
  doc: https://reka-ui.com/docs/components/combobox
  api: https://reka-ui.com/docs/components/combobox#api-reference
---

::component-preview
---
name: ComboboxDemo
description: Combobox berisi daftar framework.
---
::

Combobox bisa dibangun lewat dua cara:

- Memakai komponen `Combobox`, yang dibangun di atas [Combobox milik Reka UI](https://reka-ui.com/docs/components/combobox).
- Memadukan komponen `Popover` dan `Command` menjadi sebuah listbox.

## Instalasi

### Combobox

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
npx shadcn-vue@latest add combobox
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Pasang dependensi berikut:
    ::

    ```bash
    npm install reka-ui @vueuse/core
    ```

    ::step
    Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-com/kliping-vue/tree/dev/apps/v4/registry/new-york-v4/ui/combobox) ke project Anda.
    ::

    ::step
    Sesuaikan path import dengan struktur project Anda.
    ::
  :::
::::

:::::


### Popover dan Command

Varian listbox dibangun dari perpaduan komponen `Popover` dan `Command`.

Ikuti langkah pemasangan komponen [Popover](/docs/components/popover#instalasi) dan [Command](/docs/components/command#instalasi) terlebih dahulu.

## Penggunaan

### Combobox

```vue showLineNumbers
<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const selectedFramework = ref<(typeof frameworks)[number]>()
</script>

<template>
  <Combobox v-model="selectedFramework" by="label">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="w-[200px] justify-between">
          {{ selectedFramework?.label ?? 'Select framework...' }}
          <ChevronsUpDownIcon class="opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxInput placeholder="Search framework..." />
      <ComboboxEmpty>No framework found.</ComboboxEmpty>
      <ComboboxGroup>
        <ComboboxItem
          v-for="framework in frameworks"
          :key="framework.value"
          :value="framework"
        >
          {{ framework.label }}
          <ComboboxItemIndicator>
            <CheckIcon />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
```

### Popover dan Command

```vue showLineNumbers
<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from '@lucide/vue'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref('')
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{
          value
            ? frameworks.find(framework => framework.value === value)?.label
            : 'Select framework...'
        }}
        <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Search framework..." />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework.value"
              @select="() => {
                value = value === framework.value ? '' : framework.value
                open = false
              }"
            >
              <CheckIcon
                :class="cn(
                  'mr-2 h-4 w-4',
                  value === framework.value ? 'opacity-100' : 'opacity-0',
                )"
              />
              {{ framework.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
```

## Contoh

### User

Combobox dengan tampilan item kustom dan satu item aksi.

::component-preview
---
name: ComboboxUserDemo
description: Combobox berisi daftar pengguna.
---
::

### Zona Waktu

Combobox dengan item berkelompok dan area yang bisa digulir.

::component-preview
---
name: ComboboxTimezoneDemo
description: Combobox berisi daftar zona waktu.
---
::

### Pilihan Ganda

Combobox yang bisa memilih lebih dari satu.

::component-preview
---
name: ComboboxMultipleDemo
description: Combobox yang bisa memilih lebih dari satu.
---
::

### Dengan Listbox

Combobox yang dibangun dari komponen `Popover` dan `Command`.

::component-preview
---
name: ComboboxWithListboxDemo
description: Combobox yang dibangun dari komponen Popover dan Command.
---
::

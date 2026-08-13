<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/registry/new-york-v4/ui/dialog'

const STORAGE_KEY = 'kliping-welcome-dismissed'

const hasSeenWelcome = useLocalStorage(STORAGE_KEY, false)
const open = ref(false)

// Show dialog on mount if user hasn't seen it
onMounted(() => {
  if (!hasSeenWelcome.value) {
    // Small delay to let the page render first
    setTimeout(() => {
      open.value = true
    }, 500)
  }
})

function handleDismiss() {
  hasSeenWelcome.value = true
  open.value = false
}

function handleOpenChange(value: boolean) {
  if (!value) {
    handleDismiss()
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle class="text-xl">
          Selamat datang di Kliping
        </DialogTitle>
        <DialogDescription class="text-base">
          Rancang tema Anda sendiri, lalu mulai project baru dari sana.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 py-2">
        <div class="flex gap-3">
          <div class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
            1
          </div>
          <div>
            <h4 class="font-medium">
              Atur tema Anda
            </h4>
            <p class="text-muted-foreground text-sm">
              Pakai pemilih di sebelah kanan untuk menentukan style, warna, font, dan lainnya.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <div class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
            2
          </div>
          <div>
            <h4 class="font-medium">
              Lihat pratinjau komponen
            </h4>
            <p class="text-muted-foreground text-sm">
              Telusuri komponen dan block di sidebar kiri untuk melihat tampilannya dengan tema Anda.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <div class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
            3
          </div>
          <div>
            <h4 class="font-medium">
              Buat project Anda
            </h4>
            <p class="text-muted-foreground text-sm">
              Klik "Buat Project" untuk mendapatkan perintah CLI sesuai konfigurasi Anda.
            </p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button @click="handleDismiss">
          Mulai
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

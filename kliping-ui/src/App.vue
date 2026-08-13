<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-8 p-8">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-semibold tracking-tight">
        Kliping
      </h1>
      <p class="text-muted-foreground">
        Komponen Vue siap klip, siap pakai.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <Button>Bawaan</Button>
      <Button variant="secondary">Sekunder</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Hapus</Button>
      <Badge>Badge</Badge>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Masuk ke akun Anda</CardTitle>
        <CardDescription>Masukkan email untuk melanjutkan.</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@contoh.com" />
        </div>
        <Button class="w-full">Lanjut</Button>
      </CardContent>
    </Card>
  </main>
</template>

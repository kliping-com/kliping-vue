<script setup lang="ts">
import type { BubbleVariants } from '@/components/ui/bubble'
import type { DemoMessage, MessageAnimationId } from '@/lib/message-scroller-demo'
import { computed } from 'vue'
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import { Message, MessageContent } from '@/components/ui/message'
import { MessageScrollerItem } from '@/components/ui/message-scroller'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  message: DemoMessage
  scrollAnchor?: boolean
  userVariant?: BubbleVariants['variant']
  assistantVariant?: BubbleVariants['variant']
  animationPreset?: MessageAnimationId
  class?: string
}>(), {
  userVariant: 'muted',
  assistantVariant: 'ghost',
  animationPreset: 'slide-up',
})

const isUser = computed(() => props.message.role === 'user')

// User turns start the turn (anchor by default) and animate in; assistant
// replies stream in place without an entrance animation.
const anchor = computed(() => props.scrollAnchor ?? isUser.value)

const paragraphs = computed(() =>
  props.message.text
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean))
</script>

<template>
  <MessageScrollerItem
    :message-id="message.id"
    :scroll-anchor="anchor"
    :class="cn(isUser ? `ms-anim-${animationPreset}` : '', props.class)"
  >
    <Message :align="isUser ? 'end' : 'start'">
      <MessageContent>
        <Bubble :variant="isUser ? userVariant : assistantVariant">
          <BubbleContent class="space-y-2">
            <p
              v-for="(paragraph, index) in paragraphs"
              :key="index"
              class="whitespace-pre-wrap"
            >
              {{ paragraph }}
            </p>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </MessageScrollerItem>
</template>

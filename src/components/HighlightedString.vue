<script setup lang="ts">
import type { HighlightedStringPart } from '@/types/HighlightedStringPart'

withDefaults(
  defineProps<{
    parts: HighlightedStringPart[]
    highlightColor?: string
  }>(),
  {
    highlightColor: '#ffff00'
  }
)
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <span :style="{ backgroundColor: part.highlighted ? highlightColor : undefined }">{{ part.text }}</span>
  </template>
</template>

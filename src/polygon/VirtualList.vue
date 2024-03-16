<script setup lang="ts" generic="TRow">
import { computed } from 'vue'
import { useViewportHeight } from './useViewportHeight'
import { useScrollTop } from './useScrollTop'
import { inclusiveRange } from './inclusiveRange'
import { useDebounced } from '@/hooks/useDebounced'

const props = defineProps<{
  rows: TRow[]
  rowHeightPx: number
}>()

const totalHeight = computed(() => props.rowHeightPx * props.rows.length)

const viewportHeight = useViewportHeight()

const { scrollTop: rawScrollTop, onScroll } = useScrollTop()
const scrollTop = useDebounced(rawScrollTop, 1000)

const overscanRows = 5

const maxRowsInViewport = computed(() => Math.ceil(viewportHeight.value / props.rowHeightPx))
const renderedRows = computed(() => maxRowsInViewport.value + 2 * overscanRows)

const topmostSeenRow = computed(() => Math.floor(scrollTop.value / props.rowHeightPx))

const firstRow = computed(() => Math.max(0, topmostSeenRow.value - overscanRows))

const lastRow = computed(() =>
  Math.min(props.rows.length - 1, firstRow.value + (renderedRows.value - 1) + overscanRows)
)

const renderedIndices = computed(() => inclusiveRange(firstRow.value, lastRow.value))
</script>

<template>
  <div
    style="width: 100%; height: 100%; overflow-y: scroll; overscroll-behavior: none"
    @scroll="onScroll"
  >
    <div
      :style="{
        height: `${totalHeight}px`,
        backgroundColor: 'lightblue'
      }"
    >
      <div
        v-for="(displayedIndex, originalIndex) in renderedIndices"
        :key="displayedIndex"
        :style="{
          height: `${props.rowHeightPx}px`,
          position: 'relative',
          top: `${(displayedIndex - originalIndex) * props.rowHeightPx}px`
        }"
      >
        <slot :row="rows[displayedIndex]"></slot>
      </div>
    </div>
  </div>
</template>

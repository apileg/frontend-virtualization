<script setup lang="ts" generic="TRow">
import { computed } from 'vue'
import { useScrollTop } from './useScrollTop'
import { inclusiveRange } from './inclusiveRange'

const props = defineProps<{
  rows: TRow[]

  rowHeightPx: number
  rowGapPx: number

  maxDisplayedRows: number
  overscanRows: number
}>()

const pxPerRow = computed(() => props.rowHeightPx + props.rowGapPx)

const { scrollTop, onScroll } = useScrollTop()
const topmostSeenRowIndex = computed(() => Math.floor(scrollTop.value / pxPerRow.value))

const firstRowIndex = computed(() => Math.max(0, topmostSeenRowIndex.value - props.overscanRows))

const lastRowIndex = computed(() =>
  Math.min(
    props.rows.length - 1,
    topmostSeenRowIndex.value + (props.maxDisplayedRows + props.overscanRows - 1)
  )
)

const displayedIndices = computed(() => inclusiveRange(firstRowIndex.value, lastRowIndex.value))
</script>

<template>
  <div
    :style="{
      width: '100%',

      height: 'auto',
      maxHeight: `${maxDisplayedRows * pxPerRow - rowGapPx}px`,

      overflowY: 'scroll'
    }"
    @scroll="onScroll"
  >
    <div
      :style="{
        height: `${rows.length * pxPerRow - rowGapPx}px`,
        paddingTop: `${firstRowIndex * pxPerRow}px`
      }"
    >
      <div
        v-for="displayedIndex in displayedIndices"
        :key="displayedIndex"
        :style="{
          height: `${rowHeightPx}px`,
          marginBottom: displayedIndex === lastRowIndex ? '0' : `${props.rowGapPx}px`
        }"
      >
        <slot :row="rows[displayedIndex]"></slot>
      </div>
    </div>
  </div>
</template>

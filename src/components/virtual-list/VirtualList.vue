<script setup lang="ts" generic="TRow">
import { computed } from 'vue'
import { useScrollTop } from './useScrollTop'
import { inclusiveRange } from './inclusiveRange'

const props = defineProps<{
  rows: TRow[]
  maxDisplayedRows: number
  rowHeightPx: number
  overscanRows: number
}>()

const { scrollTop, onScroll } = useScrollTop()

const displayedRows = computed(() => Math.min(props.rows.length, props.maxDisplayedRows))
const renderedRows = computed(() => displayedRows.value + 2 * props.overscanRows)

const topmostSeenRow = computed(() => Math.floor(scrollTop.value / props.rowHeightPx))

const firstRow = computed(() => Math.max(0, topmostSeenRow.value - props.overscanRows))

const lastRow = computed(() =>
  Math.min(props.rows.length - 1, firstRow.value + (renderedRows.value - 1))
)

const renderedIndices = computed(() => inclusiveRange(firstRow.value, lastRow.value))
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: `${displayedRows * rowHeightPx}px`,
      overflowY: 'scroll',
      overscrollBehavior: 'none'
    }"
    @scroll="onScroll"
  >
    <div
      :style="{
        height: `${rows.length * rowHeightPx}px`,
        marginTop: `${topmostSeenRow * rowHeightPx}px`
      }"
    >
      <div
        v-for="displayedIndex in renderedIndices"
        :key="displayedIndex"
        :style="{
          height: `${props.rowHeightPx}px`
        }"
      >
        <slot :row="rows[displayedIndex]"></slot>
      </div>
    </div>
  </div>
</template>

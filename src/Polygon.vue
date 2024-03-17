<script setup lang="ts">
import { ref } from 'vue'
import VirtualList from './components/virtual-list/VirtualList.vue'

const items = Array(1000)
  .fill(0)
  .map((_, i) => i)
</script>
<template>
  <VirtualList
    :rows="items"
    :rowHeightPx="50"
    :maxDisplayedRows="3"
    :overscanRows="2"
    :rowGapPx="50"
  >
    <template v-slot="{ row }">
      <div
        style="
          height: 100%;
          width: 100%;
          font-family: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2em;
        "
      >
        {{ row }}
      </div>
    </template>
  </VirtualList>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VirtualList from './VirtualList.vue'

const items = ref(
  Array(1_000_000)
    .fill(0)
    .map((_v, i) => i + 1)
)

function onClick() {
  items.value.push(items.value.length)
}
</script>
<template>
  <div style="height: 100%">
    <div style="height: 10%">{{ items.length }}</div>

    <div style="height: 80%">
      <VirtualList :rows="items" :rowHeightPx="100">
        <template v-slot="{ row }">
          <div
            :style="{
              width: '100%',
              height: '100%',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '2em'
            }"
          >
            {{ row }}
          </div>
        </template>
      </VirtualList>
    </div>

    <div style="height: 10%">
      <button @click="onClick">Add element</button>
    </div>
  </div>
</template>

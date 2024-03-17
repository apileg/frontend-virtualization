<script setup lang="ts">
import type { HighlightedProduct } from '@/types/HighlightedProduct'
import ProductCard from './ProductCard.vue'
import Spinner from './Spinner.vue'
import VirtualList from './virtual-list/VirtualList.vue'

defineProps<{
  highlightedProducts: HighlightedProduct[]
  isLoading: boolean
}>()
</script>

<template>
  <Transition name="fade">
    <div class="mt-10 modal-menu card-border-radius absolute-position w-100">
      <div v-if="isLoading" class="d-flex-center">
        <Spinner />
      </div>

      <div v-else-if="highlightedProducts.length === 0">No products :(</div>

      <VirtualList
        v-else
        :rows="highlightedProducts"
        :rowHeightPx="89"
        :maxDisplayedRows="5"
        :rowGapPx="0"
        :overscanRows="2"
      >
        <template v-slot="{ row }">
          <div class="w-100 row">
            <ProductCard :highlightedProduct="row" />
          </div>
        </template>
      </VirtualList>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-menu {
  background-color: white;
  padding: 15px;

  scrollbar-color: #b0d9da transparent;
  scrollbar-width: 15px;
}
</style>

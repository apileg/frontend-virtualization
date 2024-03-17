<script setup lang="ts">
import type { HighlightedProduct } from '@/types/HighlightedProduct'
import ProductCard from './ProductCard.vue'

defineProps<{
  highlightedProducts: HighlightedProduct[]
  isLoading: boolean
}>()
</script>

<template>
  <Transition name="fade">
    <div class="mt-10 modal-menu scroll-smooth card-border-radius absolute-position w-100">
      <div v-if="highlightedProducts === null || isLoading" class="d-flex-center">
        <img src="/src/assets/icons/spinner.svg" />
      </div>

      <div v-else-if="highlightedProducts.length === 0">No products :(</div>

      <div v-else class="w-100 d-flex flex-col card-container">
        <div v-for="product in highlightedProducts" :key="product.id" class="w-100 row">
          <ProductCard :highlighted-product="product" />
        </div>
      </div>
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
  overflow-y: scroll;

  height: auto;
  max-height: 330px;

  background-color: white;
  padding: 15px;

  scrollbar-color: #b0d9da #b0d9da;
  scrollbar-width: thin;
}

.card-container {
  gap: 15px;
}

.row {
  height: 89px;
}
</style>
@/types/Product

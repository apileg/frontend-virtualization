<script setup lang="ts">
import type { Product } from '@/types/Product'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
  isLoading: boolean
}>()
</script>

<template>
  <Transition name="fade">
    <div class="mt-10 modal-menu scroll-smooth card-border-radius absolute-position w-100">
      <div v-if="products === null || isLoading" class="d-flex-center">
        <img src="/src/assets/icons/spinner.svg" />
      </div>

      <div v-else-if="products.length === 0">No products :(</div>

      <div v-else class="w-100 d-flex flex-col card-container">
        <div v-for="product in products" :key="product.id" class="w-100 row">
          <ProductCard :product="product" />
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

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import type { Product } from '@/types/product'
import { getProducts } from '@/business-logic/getProducts'

const products = ref<Product[] | null>(null)

onMounted(async () => {
  products.value = await getProducts('')
})
</script>

<template>
  <Transition name="fade">
    <div
      class="mt-10 modal-menu scroll-smooth card-border-radius absolute-position w-100 d-flex flex-col"
    >
      <div v-for="product in products" :key="product.id" class="w-100 row">
        <ProductCard :product="product" />
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
  gap: 15px;

  overflow-y: scroll;

  height: 320px;

  background-color: white;
  padding: 15px;
}

.row {
  height: 150px;
}
</style>
./ProductCard.vue

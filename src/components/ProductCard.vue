<script setup lang="ts">
import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="card w-100 d-flex">
    <img :src="product.thumbnail" :alt="product.title" class="card-image object-cover" />

    <div class="card-content d-flex flex-col w-100">
      <h4 class="font-weight-bold text-truncate">{{ product.title }}</h4>
      <p class="text-charcoal text-truncate">
        {{ product.description }}
      </p>

      <div class="badges">
        <p class="discount font-weight-bold text-negative">
          Discount {{ product.discountPercentage }} %
        </p>

        <p class="brand font-weight-bold text-aqua-blue">{{ product.brand }}</p>

        <div class="price-and-rating">
          <p class="price font-weight-bold text-aqua-blue">{{ product.price }}</p>
          <p class="rating font-weight-bold text-aqua-blue">{{ product.rating }}</p>
        </div>

        <p class="category font-weight-bold text-aqua-blue">{{ product.category }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  gap: 15px;
}

.card-content {
  min-width: 0;
  flex-grow: 0.8;

  gap: 8px;
}

.card-image {
  width: 150px;
  flex-shrink: 0;

  max-height: 7rem;
}

.badges {
  display: grid;

  column-gap: 2rem;
  row-gap: 1rem;

  grid-template-columns: min-content 1fr 0.5fr;
  grid-template-rows: 1fr 1fr;
}

.badges > * {
  white-space: nowrap;
}

.discount {
  grid-row: 1;
  grid-column: 1;
}

.brand {
  grid-row: 1;
  grid-column: 2;
}

.price-and-rating {
  grid-row: 2;
  grid-column: 1;

  display: flex;
  justify-content: space-between;
}

.category {
  grid-row: 2;
  grid-column: 2;
}
</style>

<script setup lang="ts">
import type { Product } from '@/types/Product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="card w-100 d-flex">
    <img :src="product.thumbnail" :alt="product.title" class="card-image object-cover" />

    <div class="card-content d-flex flex-col w-100">
      <!-- <h4>
        <HighlightedString :value="product.title" />
      </h4> -->

      <h4 class="font-weight-bold text-truncate">{{ product.title }}</h4>
      <p class="text-charcoal text-truncate">
        {{ product.description }}
      </p>

      <div class="badges">
        <p class="discount font-weight-bold text-negative">
          Discount {{ product.discountPercentage }} %
        </p>

        <p class="brand font-weight-bold text-aqua-blue text-truncate">{{ product.brand }}</p>

        <div class="price-and-rating">
          <h4 class="price font-weight-bold text-aqua-blue">$ {{ product.price }}</h4>
          <div class="d-flex-center items-center">
            <img src="/src/assets/icons/star.svg" class="star-icon" />
            <h4 class="rating font-weight-bold text-aqua-blue">{{ product.rating }}</h4>
          </div>
        </div>

        <div class="category d-flex-center items-center bg-phthalo-green card-border-radius">
          <p class="text-spanish-green">
            {{ product.category }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  gap: 15px;
}

.star-icon {
  height: 15px;
  margin-right: 4px;
}

.card-content {
  min-width: 0;
  flex-grow: 1;

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

  grid-template-columns: 1fr 1fr 0.5fr;
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
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}

.category {
  grid-row: 2;
  grid-column: 2;

  width: fit-content;
  padding: 2px 8px;
}
</style>
@/types/Product

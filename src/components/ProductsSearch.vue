<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import InputComponent from './InputComponent.vue'
import ModalMenu from './ModalMenu.vue'
import type { HighlightedProduct } from '@/types/HighlightedProduct'
import { getProducts } from '@/business-logic/getProducts'
import { useDebounced } from '@/hooks/useDebounced'

onMounted(async () => {
  isProductsLoading.value = true
  highlightedProduct.value = await getProducts('')
  isProductsLoading.value = false
})

const highlightedProduct = ref<HighlightedProduct[]>([])
const isProductsLoading = ref(true)

const inputValue = ref('')
const debouncedInput = useDebounced(inputValue, 1000)
const isMenuShown = ref(false)

watch(
  () => debouncedInput.value,

  async (textToFind) => {
    isProductsLoading.value = true
    highlightedProduct.value = await getProducts(textToFind)
    isProductsLoading.value = false
  }
)

function onFocus() {
  isMenuShown.value = true
}

function onBlur() {
  // isMenuShown.value = false
}
</script>

<template>
  <div class="product-search">
    <InputComponent v-model:input-value="inputValue" @on-focus="onFocus" @on-blur="onBlur">
      <ModalMenu
        v-show="isMenuShown"
        :highlighted-products="highlightedProduct"
        :is-loading="isProductsLoading"
      />
    </InputComponent>
  </div>
</template>

<style scoped>
.product-search {
  width: 500px;
}
</style>

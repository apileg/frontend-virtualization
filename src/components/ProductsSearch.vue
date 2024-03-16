<script setup lang="ts">
import InputComponent from './InputComponent.vue'
import { ref } from 'vue'
import ModalMenu from './ModalMenu.vue'

const inputValue = ref('')
const isMenuShown = ref(false)

function onFocus() {
  isMenuShown.value = true
}

function onBlur() {
  isMenuShown.value = false
}
</script>

<template>
  <div class="product-search">
    <InputComponent v-model:input-value="inputValue" @on-focus="onFocus" @on-blur="onBlur">
      <ModalMenu v-show="isMenuShown" />
    </InputComponent>
  </div>
</template>

<style scoped>
.product-search {
  width: 500px;
}
</style>

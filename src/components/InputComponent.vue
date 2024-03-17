<script setup lang="ts">
defineProps<{
  inputValue: string
}>()

const emit = defineEmits<{
  (e: 'update:inputValue', newValue: string): void
  (e: 'onFocus'): void
  (e: 'onBlur'): void
}>()

function updateInputValue(event: Event) {
  const currentTarget = event.currentTarget as HTMLInputElement

  if (currentTarget) {
    emit('update:inputValue', currentTarget.value.trim())
  }
}

function emitFocus() {
  emit('onFocus')
}

function emitBlur() {
  emit('onBlur')
}
</script>
<template>
  <div class="relative-position">
    <input
      :model-value="inputValue"
      type="search"
      placeholder="Find product"
      class="input-styles card-border-radius w-100"
      @input="updateInputValue"
      @focus="emitFocus"
      @blur="emitBlur"
    />

    <slot></slot>
  </div>
</template>

<style scoped>
.input-styles {
  height: 65px;
  padding: 1rem;

  font-size: 2rem;
}

.input-styles::-webkit-search-cancel-button {
  cursor: pointer;
  -webkit-appearance: none;
  height: 1em;
  width: 1em;
  border-radius: 50em;
  background: url('/src/assets/icons/times-circle.svg')
    no-repeat 50% 50%;
  background-size: contain;
  opacity: 0;
  pointer-events: none;
}

.input-styles:focus::-webkit-search-cancel-button {
  opacity: 0.3;
  pointer-events: all;
}

.input-styles.dark::-webkit-search-cancel-button {
  filter: invert(1);
}
</style>

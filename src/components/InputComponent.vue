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
      placeholder="Type text"
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
</style>

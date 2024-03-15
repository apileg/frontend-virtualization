<script setup lang="ts"></script>

<template>
  <Transition name="fade">
    <div class="mt-10 modal-menu card-border-radius absolute-position">123</div>
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
  height: 325px;
  width: 100%;
  background-color: white;
  padding: 15px;
}
</style>

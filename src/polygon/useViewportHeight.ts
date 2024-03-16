import { ref, type Ref, onUnmounted } from 'vue'

export function useViewportHeight(): Ref<number> {
  const height = ref<number>(window.innerHeight)

  const resizeListener = () => {
    height.value = window.innerHeight
  }

  window.addEventListener('resize', resizeListener)

  onUnmounted(() => {
    window.removeEventListener('resize', resizeListener)
  })

  return height
}

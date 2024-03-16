import { ref, type Ref, type UnwrapRef, watch } from 'vue'

/**
 * const input = ref(...)
 * const debouncedInput = useDebounced(input, 1000)
 */
export function useDebounced<T>(value: Ref<T>, ms: number): Ref<UnwrapRef<T>> {
  const debounced = ref(value.value)

  watch(
    () => value.value,

    (newValue, oldValue, onCleanup) => {
      if (newValue === oldValue) {
        return
      }

      const timeoutId = setTimeout(() => {
        //@ts-expect-error
        debounced.value = newValue
      }, ms)

      onCleanup(() => clearTimeout(timeoutId))
    }
  )

  return debounced
}

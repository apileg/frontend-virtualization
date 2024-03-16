import { ref, type Ref } from 'vue'

export interface UseScrollTopResolt {
  scrollTop: Ref<number>
  onScroll: (event: UIEvent) => void
}

export function useScrollTop() {
  const scrollTop = ref(0)

  function onScroll(event: UIEvent) {
    const container = assertCurrentTargetIsHtmlElement(event)
    scrollTop.value = container.scrollTop
  }

  function assertCurrentTargetIsHtmlElement(event: UIEvent): HTMLElement {
    const currentTarget = event.currentTarget

    if (currentTarget === null) {
      throw new Error('scrollEvent.currentTarget was null')
    }

    if (!(currentTarget instanceof HTMLElement)) {
      throw new Error(
        `scrollEvent.currentTarget had type ${currentTarget.constructor.name}\n` +
          'Expected HTMLElement'
      )
    }

    return currentTarget
  }

  return { scrollTop, onScroll }
}

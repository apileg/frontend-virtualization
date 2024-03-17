import { type DirectiveBinding } from 'vue'

export interface ClickOutsideDirective {
  beforeMount: (el: ClickOutsideElement, binding: DirectiveBinding<() => void>) => void
  unmounted: (el: ClickOutsideElement) => void
}

// 'unique' - disallows use of `let`. Guarantees that kClickOutsideListener
// will be a constant, unique value that can be used in types as property name
const kClickOutsideListener: unique symbol = Symbol('clickOutsideListener')

type ClickOutsideListener = (event: MouseEvent) => void

interface ClickOutsideElement extends HTMLElement {
  [kClickOutsideListener]: ClickOutsideListener
}

export const clickOutside: ClickOutsideDirective = {
  beforeMount(element, binding) {
    const clickOutsideEvent = (event: MouseEvent) => {
      if (event.target === null) {
        return
      }

      if (!(event.target instanceof Node)) {
        return
      }

      // This is click inside, do nothing
      if (element.contains(event.target)) {
        return
      }

      // This is click outside, do callback
      binding.value()
    }

    element[kClickOutsideListener] = clickOutsideEvent
    document.addEventListener('click', clickOutsideEvent)
  },

  unmounted(element) {
    const clickOutsideListener = element[kClickOutsideListener]
    document.removeEventListener('click', clickOutsideListener)
  }
}

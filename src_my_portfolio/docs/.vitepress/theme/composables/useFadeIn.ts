import { onMounted, onUnmounted } from 'vue'

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: '0px 0px -40px 0px',
  threshold: 0.06,
}

let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, OBSERVER_OPTIONS)
  }
  return sharedObserver
}

export function observeFadeIn(root: ParentNode = document) {
  const observer = getObserver()
  root.querySelectorAll('.fade-in:not(.visible)').forEach((el) => {
    observer.observe(el)
  })
}

export function observeElement(el: Element) {
  getObserver().observe(el)
}

export function useFadeIn() {
  onMounted(() => {
    observeFadeIn()
  })

  onUnmounted(() => {
    // Observer stays alive for SPA re-renders
  })

  return { observeFadeIn, observeElement }
}

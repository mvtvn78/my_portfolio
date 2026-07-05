<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { assetUrl } from '../composables/useAssetUrl'

const props = defineProps<{
  src: string
  alt: string
  class?: string
  style?: Record<string, string | number>
}>()

const imageSrc = ref<string | null>(null)
const isLoading = ref(true)
const isError = ref(false)
const imgRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!props.src) return
  const resolvedSrc = assetUrl(props.src)

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        const img = new Image()
        img.src = resolvedSrc
        img.onload = () => {
          imageSrc.value = resolvedSrc
          isLoading.value = false
          observer?.unobserve(entry.target)
        }
        img.onerror = () => {
          isError.value = true
          isLoading.value = false
          observer?.unobserve(entry.target)
        }
      }
    },
    {
      rootMargin: '50px',
      threshold: 0.01,
    },
  )

  if (imgRef.value) {
    observer.observe(imgRef.value)
  }
})

onUnmounted(() => {
  if (imgRef.value && observer) {
    observer.unobserve(imgRef.value)
  }
  observer?.disconnect()
})

const containerClass = computed(() =>
  `relative bg-gray-200 overflow-hidden ${props.class || ''}`,
)
</script>

<template>
  <div
    ref="imgRef"
    :class="containerClass"
    :style="style"
  >
    <div v-if="isLoading" class="absolute inset-0 bg-gray-300 animate-pulse" />
    <div
      v-if="isError"
      class="absolute inset-0 bg-gray-400 flex items-center justify-center text-gray-600"
    >
      <span>Failed to load</span>
    </div>
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :alt="alt"
      class="w-full h-full object-cover"
    />
  </div>
</template>

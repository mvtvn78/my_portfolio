<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { author } from '../composables/useAuthor'
import { useI18n } from '../composables/useI18n'
import { assetUrl } from '../composables/useAssetUrl'

const { t } = useI18n()
const videoRef = ref<HTMLVideoElement | null>(null)

function onAvatarError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = author.avatarFallback
}

onMounted(async () => {
  const video = videoRef.value
  if (!video) return

  video.muted = true
  video.defaultMuted = true

  try {
    await video.play()
  } catch {
    // Autoplay blocked — gradient fallback remains visible
  }
})
</script>

<template>
  <section id="hero">
    <video
      v-if="author.coverVideo"
      ref="videoRef"
      class="hero-video"
      :src="assetUrl(author.coverVideo)"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
    />

    <div class="hero-overlay" aria-hidden="true" />

    <div class="hero-avatar-wrap fade-in">
      <img
        :src="assetUrl(author.avatarURL)"
        :alt="author.authorName"
        @error="onAvatarError"
      />
    </div>

    <h1 class="hero-name fade-in" style="transition-delay:0.1s">
      {{ author.authorName }}
    </h1>

    <p class="hero-sub fade-in" style="transition-delay:0.2s">
      {{ t('hero.subtitle') }}
    </p>

    <a href="#hire" class="hero-hire-btn fade-in" style="transition-delay:0.42s">
      {{ t('hero.hireNow') }}
    </a>

    <div class="hero-scroll">{{ t('hero.scroll') }}</div>
  </section>
</template>

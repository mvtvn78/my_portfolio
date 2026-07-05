<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { author } from '../composables/useAuthor'

const { t, language, changeLanguage } = useI18n()
const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav id="main-nav" class="mvt-nav" :class="{ scrolled: isScrolled }">
    <a href="#hero" class="mvt-nav-logo">{{ author.shortName }}</a>

    <ul class="mvt-nav-links">
      <li><a href="#about">{{ t('nav.about') }}</a></li>
      <li><a href="#services">{{ t('nav.services') }}</a></li>
      <li><a href="#projects">{{ t('nav.projects') }}</a></li>
      <li><a href="#hire">{{ t('nav.contact') }}</a></li>
    </ul>

    <div class="mvt-nav-right">
      <div class="mvt-lang-toggle">
        <button
          type="button"
          class="mvt-lang-btn"
          :class="{ active: language === 'vi' }"
          @click="changeLanguage('vi')"
        >
          VI
        </button>
        <button
          type="button"
          class="mvt-lang-btn"
          :class="{ active: language === 'en' }"
          @click="changeLanguage('en')"
        >
          EN
        </button>
      </div>
      <a href="#hire" class="mvt-nav-cta">{{ t('nav.hireMe') }}</a>
    </div>
  </nav>
</template>

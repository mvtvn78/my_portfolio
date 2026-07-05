<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import { author } from '../composables/useAuthor'

const { t } = useI18n()
</script>

<template>
  <footer class="mvt-footer">
    <div class="section-inner mvt-footer-inner">
      <div class="footer-logo">{{ t('footer.logo') }}</div>
      <div class="footer-links">
        <a :href="author.githubLink" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#projects">{{ t('footer.projects') }}</a>
        <a href="#hire">{{ t('footer.contact') }}</a>
      </div>
      <div class="footer-copy">{{ t('footer.copy') }}</div>
    </div>
  </footer>
</template>

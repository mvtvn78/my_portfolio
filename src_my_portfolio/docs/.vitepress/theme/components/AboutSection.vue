<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t, language, skills } = useI18n()

const decoUrls = {
  tl: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  tr: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  bl: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  br: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
}
</script>

<template>
  <section id="about">
    <img class="about-deco about-deco-tl" :src="decoUrls.tl" alt="" />
    <img class="about-deco about-deco-tr" :src="decoUrls.tr" alt="" />
    <img class="about-deco about-deco-bl" :src="decoUrls.bl" alt="" />
    <img class="about-deco about-deco-br" :src="decoUrls.br" alt="" />

    <div class="about-inner" :data-lang="language">
      <p class="about-eyebrow fade-in">{{ t('about.eyebrow') }}</p>
      <h2 class="about-h2 fade-in" style="transition-delay:0.1s">{{ t('about.title') }}</h2>
      <p class="about-text fade-in" style="transition-delay:0.2s" v-html="t('about.p1')" />
      <p class="about-text fade-in" style="transition-delay:0.28s" v-html="t('about.p2')" />

      <div class="about-skills fade-in" style="transition-delay:0.35s">
        <span v-for="skill in skills" :key="skill" class="about-skill-tag">
          {{ skill }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

interface ServiceItem {
  cat: string
  name: string
  items: string[]
  desc: string
}

const { t, tArray, language } = useI18n()
const services = tArray<ServiceItem>('services.items')
</script>

<template>
  <section id="services">
    <div class="section-inner" :data-lang="language">
      <p class="section-label fade-in">{{ t('services.label') }}</p>
      <h2 class="section-h2 fade-in" style="transition-delay:0.1s">{{ t('services.title') }}</h2>

      <div class="services-grid">
        <div
          v-for="(service, idx) in services"
          :key="`${language}-${service.cat}`"
          class="service-card fade-in visible"
          :style="{ transitionDelay: `${idx * 0.07}s` }"
        >
          <div class="service-cat">{{ service.cat }}</div>
          <div class="service-name">{{ service.name }}</div>
          <ul class="service-items">
            <li v-for="item in service.items" :key="item">{{ item }}</li>
          </ul>
          <div class="service-desc">{{ service.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

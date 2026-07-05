<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import { author } from '../composables/useAuthor'
import WorkflowSteps from './WorkflowSteps.vue'

const { t, language } = useI18n()

const channels = [
  {
    icon: '⌨️',
    href: author.githubLink,
    labelKey: 'hire.channels.github.label',
    subKey: 'hire.channels.github.sub',
    external: true,
  },
  {
    icon: '✉️',
    href: `mailto:${author.emailContact}`,
    labelKey: 'hire.channels.email.label',
    subKey: 'hire.channels.email.sub',
    external: false,
  },
  {
    icon: '💬',
    href: author.facebookLink,
    labelKey: 'hire.channels.facebook.label',
    subKey: 'hire.channels.facebook.sub',
    external: true,
  },
  {
    icon: '💼',
    href: author.linkedinLink,
    labelKey: 'hire.channels.linkedin.label',
    subKey: 'hire.channels.linkedin.sub',
    external: true,
  },
]
</script>

<template>
  <section id="hire">
    <div class="section-inner" :data-lang="language">
      <p class="hire-eyebrow fade-in">{{ t('hire.eyebrow') }}</p>
      <h2 class="hire-h2 fade-in" style="transition-delay:0.1s">{{ t('hire.title') }}</h2>

      <WorkflowSteps class="fade-in" style="transition-delay:0.18s" />

      <div class="hire-availability fade-in" style="transition-delay:0.26s">
        <span class="dot" />
        {{ t('hire.availability') }}
      </div>

      <div class="contact-channels fade-in" style="transition-delay:0.32s">
        <a
          v-for="ch in channels"
          :key="ch.labelKey"
          :href="ch.href"
          class="contact-channel"
          :target="ch.external ? '_blank' : undefined"
          :rel="ch.external ? 'noopener noreferrer' : undefined"
        >
          <div class="ch-icon">{{ ch.icon }}</div>
          <div class="ch-label">{{ t(ch.labelKey) }}</div>
          <div class="ch-sub">{{ t(ch.subKey) }}</div>
        </a>
      </div>
    </div>
  </section>
</template>

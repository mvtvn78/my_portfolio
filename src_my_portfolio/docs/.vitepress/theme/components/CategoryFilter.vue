<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

defineProps<{
  categories: Array<{ id: string; name: string; enName: string }>
  activeCategory: string
}>()

const emit = defineEmits<{
  categoryChange: [id: string]
}>()

const { t } = useI18n()

function getCategoryLabel(categoryId: string): string {
  const labelMap: Record<string, string> = {
    all: t('nav.all'),
    games: t('nav.games'),
    iot: t('nav.iot'),
    ai: t('nav.ai'),
    websites: t('nav.websites'),
    desktop: t('nav.desktop'),
    mobile: t('nav.mobile'),
    others: t('nav.others'),
  }
  return labelMap[categoryId] || categoryId
}
</script>

<template>
  <div class="projects-filter fade-in" style="transition-delay:0.18s">
    <button
      v-for="category in categories"
      :key="category.id"
      type="button"
      class="filter-btn"
      :class="{ active: activeCategory === category.id }"
      @click="emit('categoryChange', category.id)"
    >
      {{ getCategoryLabel(category.id) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  Grid3X3,
  Brain,
  Gamepad2,
  Wifi,
  Globe,
  Monitor,
  Smartphone,
  Package,
} from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n'

defineProps<{
  categories: Array<{ id: string; name: string; enName: string }>
  activeCategory: string
}>()

const emit = defineEmits<{
  categoryChange: [id: string]
}>()

const { t } = useI18n()

const iconMap: Record<string, typeof Grid3X3> = {
  all: Grid3X3,
  ai: Brain,
  games: Gamepad2,
  iot: Wifi,
  websites: Globe,
  desktop: Monitor,
  mobile: Smartphone,
  others: Package,
}

function getCategoryLabel(categoryId: string): string {
  const labelMap: Record<string, string> = {
    all: t('nav.all') || 'All',
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
  <div class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex gap-3 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          class="px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 flex-shrink-0"
          :class="activeCategory === category.id
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          @click="emit('categoryChange', category.id)"
        >
          <component :is="iconMap[category.id]" class="w-4 h-4" />
          {{ getCategoryLabel(category.id) }}
        </button>
      </div>
    </div>
  </div>
</template>

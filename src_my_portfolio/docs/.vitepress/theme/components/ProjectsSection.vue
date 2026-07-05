<script setup lang="ts">
import CategoryFilter from './CategoryFilter.vue'
import ProjectGrid from './ProjectGrid.vue'
import { useI18n } from '../composables/useI18n'
import type { ProjectFrontmatter } from '../composables/useProjects'

defineProps<{
  categories: Array<{ id: string; name: string; enName: string }>
  activeCategory: string
  projects: ProjectFrontmatter[]
  isLoading: boolean
}>()

const emit = defineEmits<{
  categoryChange: [id: string]
  projectClick: [project: ProjectFrontmatter]
}>()

const { t } = useI18n()
</script>

<template>
  <section id="projects">
    <div class="section-inner">
      <p class="section-label fade-in">{{ t('projects.label') }}</p>
      <h2 class="section-h2 projects-h2 fade-in" style="transition-delay:0.1s">
        {{ t('projects.title') }}
      </h2>

      <CategoryFilter
        :categories="categories"
        :active-category="activeCategory"
        @category-change="emit('categoryChange', $event)"
      />

      <div v-if="isLoading" class="projects-empty">Loading...</div>
      <ProjectGrid
        v-else
        :projects="projects"
        @project-click="emit('projectClick', $event)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import LazyImage from './LazyImage.vue'
import { useI18n } from '../composables/useI18n'
import { getCategoryName } from '../composables/useProjects'
import { observeFadeIn } from '../composables/useFadeIn'
import type { ProjectFrontmatter } from '../composables/useProjects'

const ITEMS_PER_PAGE = 9

const props = defineProps<{
  projects: ProjectFrontmatter[]
}>()

const emit = defineEmits<{
  projectClick: [project: ProjectFrontmatter]
}>()

const { t, language } = useI18n()
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.projects.length / ITEMS_PER_PAGE)),
)

const currentProjects = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return props.projects.slice(start, start + ITEMS_PER_PAGE)
})

function getDisplayTitle(project: ProjectFrontmatter): string {
  const lang = language.value as 'vi' | 'en'
  const languageData = project[lang] || project.vi || project.en
  return languageData?.title || ''
}

function getCategoryBadge(categoryId: string): string {
  const labelMap: Record<string, string> = {
    ai: t('nav.ai'),
    games: t('nav.games'),
    iot: t('nav.iot'),
    websites: t('nav.websites'),
    desktop: t('nav.desktop'),
    mobile: t('nav.mobile'),
    others: t('nav.others'),
  }
  return labelMap[categoryId] || getCategoryName(categoryId)
}

function getGithubLabel(project: ProjectFrontmatter): string {
  return project.linkGithub || 'Private'
}

function goToPage(page: number) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

watch(() => props.projects, async () => {
  currentPage.value = 1
  await nextTick()
  observeFadeIn()
}, { flush: 'post' })
</script>

<template>
  <div v-if="projects.length === 0" class="projects-empty">
    {{ t('noData') }}
  </div>

  <template v-else>
    <div class="projects-grid">
      <div
        v-for="(project, idx) in currentProjects"
        :key="project.url || idx"
        class="project-card fade-in visible"
        tabindex="0"
        @click="emit('projectClick', project)"
        @keydown.enter="emit('projectClick', project)"
      >
        <div class="project-tooltip" aria-hidden="true">
          <div class="project-tooltip-title">{{ getDisplayTitle(project) }}</div>
          <div class="project-tooltip-link">{{ getGithubLabel(project) }}</div>
          <div v-if="project.finishedDay" class="project-tooltip-date">
            {{ project.finishedDay }}
          </div>
        </div>

        <LazyImage
          v-if="project.image"
          :src="project.image"
          :alt="getDisplayTitle(project)"
          class="project-thumb"
        />
        <div v-else class="project-thumb-placeholder" />

        <div class="project-info">
          <div class="project-header">
            <div class="project-name">{{ getDisplayTitle(project) }}</div>
            <span class="project-badge">{{ getCategoryBadge(project.category) }}</span>
          </div>
          <div v-if="project.language" class="project-stack">{{ project.language }}</div>
          <div class="project-footer">
            <div class="project-link">{{ getGithubLabel(project) }}</div>
            <div v-if="project.finishedDay" class="project-date">{{ project.finishedDay }}</div>
          </div>
        </div>
      </div>
    </div>

    <nav v-if="totalPages > 1" class="projects-pagination" aria-label="Projects pagination">
      <button
        type="button"
        class="projects-page-btn"
        :disabled="currentPage === 1"
        :title="t('pagination.previous')"
        @click="goToPage(currentPage - 1)"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>

      <div class="projects-page-numbers">
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="projects-page-num"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        type="button"
        class="projects-page-btn"
        :disabled="currentPage === totalPages"
        :title="t('pagination.next')"
        @click="goToPage(currentPage + 1)"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </nav>
  </template>
</template>

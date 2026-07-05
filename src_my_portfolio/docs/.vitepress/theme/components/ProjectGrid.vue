<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import LazyImage from './LazyImage.vue'
import { useI18n } from '../composables/useI18n'
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

const totalPages = computed(() => Math.ceil(props.projects.length / ITEMS_PER_PAGE))
const startIdx = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE)
const endIdx = computed(() => startIdx.value + ITEMS_PER_PAGE)
const currentProjects = computed(() =>
  props.projects.slice(startIdx.value, endIdx.value),
)

function getDisplayTitle(project: ProjectFrontmatter): string {
  const lang = language.value as 'vi' | 'en'
  const languageData = project[lang] || project.vi || project.en
  return languageData?.title || ''
}
</script>

<template>
  <div v-if="projects.length === 0" class="w-full py-12 text-center">
    <p class="text-gray-500 text-lg">{{ t('noData') }}</p>
  </div>

  <div v-else class="w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div
        v-for="(project, idx) in currentProjects"
        :key="project.url || idx"
        class="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        @click="emit('projectClick', project)"
      >
        <div class="relative h-48 overflow-hidden bg-gray-200">
          <LazyImage
            :src="project.image"
            :alt="getDisplayTitle(project)"
            class="w-full h-full"
            :style="{ aspectRatio: '16 / 9', objectFit: 'cover' }"
          />
        </div>

        <div class="p-4">
          <div class="flex gap-3 mb-3">
            <img
              :src="project.avatar"
              alt="avatar"
              class="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div class="flex-1">
              <h3 class="font-bold text-sm line-clamp-2">
                {{ getDisplayTitle(project) }}
              </h3>
            </div>
          </div>

          <div class="space-y-1 text-xs text-gray-600">
            <p v-if="project.language" class="font-semibold text-gray-700">
              {{ project.language }}
            </p>
            <p v-if="project.linkGithub" class="text-gray-600 line-clamp-1">
              {{ project.linkGithub }}
            </p>
            <p v-if="project.finishedDay" class="text-right font-semibold text-gray-700">
              {{ project.finishedDay }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-8">
      <button
        type="button"
        class="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        :disabled="currentPage === 1"
        :title="t('pagination.previous')"
        @click="currentPage = Math.max(currentPage - 1, 1)"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>

      <div class="flex items-center gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="w-10 h-10 rounded-lg font-medium transition-colors"
          :class="currentPage === page
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>

      <button
        type="button"
        class="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        :disabled="currentPage === totalPages"
        :title="t('pagination.next')"
        @click="currentPage = Math.min(currentPage + 1, totalPages)"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

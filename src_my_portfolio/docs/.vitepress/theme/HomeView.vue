<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import ProjectGrid from './components/ProjectGrid.vue'
import Modal from './components/Modal.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import { useI18n } from './composables/useI18n'
import {
  getCategories,
  getProjectByUrl,
  loadProjectsByCategory,
  type ProjectFrontmatter,
} from './composables/useProjects'

const { t } = useI18n()

const isMuted = ref(true)
const selectedCategory = ref('all')
const selectedProject = ref<ProjectFrontmatter | null>(null)
const projects = ref<ProjectFrontmatter[]>([])
const isLoading = ref(false)
const categories = getCategories()

function handleHashChange() {
  const hash = window.location.hash.slice(1)

  if (!hash) {
    selectedProject.value = null
    return
  }

  const project = getProjectByUrl(hash)
  selectedProject.value = project || null
}

onMounted(() => {
  handleHashChange()
  window.addEventListener('hashchange', handleHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

watch(selectedCategory, () => {
  isLoading.value = true
  try {
    projects.value = loadProjectsByCategory(selectedCategory.value)
  } catch (error) {
    console.error('Error loading projects:', error)
    projects.value = []
  }
  isLoading.value = false
}, { immediate: true })

function handleProjectClick(project: ProjectFrontmatter) {
  selectedProject.value = project
  if (project.url) {
    const scrollPos = window.scrollY
    window.location.hash = project.url
    setTimeout(() => {
      window.scrollTo(0, scrollPos)
    }, 0)
  }
}

function handleCloseModal() {
  selectedProject.value = null
  const scrollPos = window.scrollY
  window.location.hash = ''
  setTimeout(() => {
    window.scrollTo(0, scrollPos)
  }, 0)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <HeroSection
      :is-muted="isMuted"
      @toggle-mute="isMuted = !isMuted"
    />

    <CategoryFilter
      :categories="categories"
      :active-category="selectedCategory"
      @category-change="selectedCategory = $event"
    />

    <div class="pt-0">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h2 class="text-3xl font-bold mb-8 text-gray-800">
          {{ t('nav.myProducts') }}
        </h2>

        <div v-if="isLoading" class="text-center py-12">
          <p class="text-gray-500">Loading...</p>
        </div>
        <ProjectGrid
          v-else
          :projects="projects"
          @project-click="handleProjectClick"
        />
      </div>
    </div>

    <Modal
      :is-open="selectedProject !== null"
      :project="selectedProject"
      @close="handleCloseModal"
    />
  </div>
</template>

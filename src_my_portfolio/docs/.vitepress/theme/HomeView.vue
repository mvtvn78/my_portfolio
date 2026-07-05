<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import HireSection from './components/HireSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import Modal from './components/Modal.vue'
import { useFadeIn } from './composables/useFadeIn'
import {
  getCategories,
  getProjectByUrl,
  loadProjectsByCategory,
  type ProjectFrontmatter,
} from './composables/useProjects'

useFadeIn()

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
  <div>
    <NavBar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection
      :categories="categories"
      :active-category="selectedCategory"
      :projects="projects"
      :is-loading="isLoading"
      @category-change="selectedCategory = $event"
      @project-click="handleProjectClick"
    />
    <HireSection />
    <SiteFooter />

    <Modal
      :is-open="selectedProject !== null"
      :project="selectedProject"
      @close="handleCloseModal"
    />
  </div>
</template>

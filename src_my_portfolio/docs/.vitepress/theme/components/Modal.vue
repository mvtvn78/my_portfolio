<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n'
import { assetUrl } from '../composables/useAssetUrl'
import { getCategoryName } from '../composables/useProjects'
import type { ProjectFrontmatter } from '../composables/useProjects'

const props = defineProps<{
  isOpen: boolean
  project: ProjectFrontmatter | null
}>()

const emit = defineEmits<{
  close: []
}>()

const { t, language } = useI18n()

const languageData = computed(() => {
  if (!props.project) return null
  const lang = language.value as 'vi' | 'en'
  return props.project[lang] || props.project.vi || props.project.en
})

const title = computed(() => languageData.value?.title || '')
const about = computed(() => languageData.value?.about || '')
const features = computed(() => languageData.value?.features || [])
const role = computed(() => languageData.value?.role || [])
</script>

<template>
  <Teleport to="body">
    <template v-if="isOpen && project">
      <div class="mvt-modal-overlay" @click="emit('close')" />

      <div class="mvt-modal">
        <div class="mvt-modal-inner">
          <div class="mvt-modal-header">
            <div class="mvt-modal-title-row">
              <h2 class="mvt-modal-title">{{ title }}</h2>
              <span class="mvt-modal-tag">{{ getCategoryName(project.category) }}</span>
            </div>
            <button type="button" class="mvt-modal-close" title="Close" @click="emit('close')">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="mvt-modal-body">
            <div class="mvt-modal-content">
              <div class="mvt-modal-media">
                <video
                  v-if="project.videoURL"
                  :src="assetUrl(project.videoURL)"
                  controls
                  autoplay
                  class="mvt-modal-video"
                />
                <img
                  v-else-if="project.image"
                  :src="assetUrl(project.image)"
                  :alt="title"
                  class="mvt-modal-image"
                />
              </div>

              <div class="mvt-modal-details">
                <div>
                  <h4 class="mvt-modal-section-title">{{ t('modal.about') }}</h4>
                  <p class="mvt-modal-text">{{ about }}</p>
                </div>

                <div v-if="role.length > 0">
                  <h4 class="mvt-modal-section-title">{{ t('modal.role') }}</h4>
                  <ul class="mvt-modal-list">
                    <li v-for="(roleItem, idx) in role" :key="idx">{{ roleItem }}</li>
                  </ul>
                </div>

                <div v-if="features.length > 0">
                  <h4 class="mvt-modal-section-title">{{ t('modal.features') }}</h4>
                  <ul class="mvt-modal-list mvt-modal-list--scroll">
                    <li v-for="(feature, idx) in features" :key="idx">{{ feature }}</li>
                  </ul>
                </div>

                <div v-if="project.tech?.length > 0">
                  <h4 class="mvt-modal-section-title">{{ t('modal.technologies') }}</h4>
                  <div class="mvt-modal-tech-tags">
                    <span
                      v-for="(tech, idx) in project.tech"
                      :key="idx"
                      class="about-skill-tag !text-[#4a6070]"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mvt-modal-footer">
              <p v-if="project.finishedDay" class="mvt-modal-meta">
                {{ t('modal.finished') }}: {{ project.finishedDay }}
              </p>
              <p v-if="project.linkGithub" class="mvt-modal-meta mvt-modal-meta--mono">
                {{ project.linkGithub }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X, Package, User, CheckCircle, Wrench, Calendar, ExternalLink } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n'
import { assetUrl } from '../composables/useAssetUrl'
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
  <template v-if="isOpen && project">
    <div
      class="fixed inset-0 bg-black/50 z-40 transition-opacity"
      @click="emit('close')"
    />

    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
      <div class="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="sticky top-0 p-4 flex justify-between items-center bg-white border-b flex-shrink-0">
          <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
          <button
            type="button"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            title="Close"
            @click="emit('close')"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="p-6 overflow-y-auto flex-1">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="lg:col-span-2">
              <video
                :src="project.videoURL ? assetUrl(project.videoURL) : undefined"
                controls
                autoplay
                class="w-full rounded-lg bg-black"
              />
            </div>

            <div class="lg:col-span-1">
              <h3 class="text-lg font-bold mb-4">{{ t('modal.description') }}</h3>

              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Package class="w-4 h-4" /> {{ t('modal.about') }}
                  </h4>
                  <p class="text-sm text-gray-700">{{ about }}</p>
                </div>

                <div v-if="role && role.length > 0">
                  <h4 class="font-semibold text-sm mb-2 flex items-center gap-2">
                    <User class="w-4 h-4" /> {{ t('modal.role') }}
                  </h4>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li v-for="(roleItem, idx) in role" :key="idx">• {{ roleItem }}</li>
                  </ul>
                </div>

                <div v-if="features && features.length > 0">
                  <h4 class="font-semibold text-sm mb-2 flex items-center gap-2">
                    <CheckCircle class="w-4 h-4" /> {{ t('modal.features') }}
                  </h4>
                  <ul class="text-sm text-gray-700 space-y-1 max-h-48 overflow-y-auto">
                    <li v-for="(feature, idx) in features" :key="idx">• {{ feature }}</li>
                  </ul>
                </div>

                <div v-if="project.tech && project.tech.length > 0">
                  <h4 class="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Wrench class="w-4 h-4" /> {{ t('modal.technologies') }}
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(tech, idx) in project.tech"
                      :key="idx"
                      class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t pt-6">
            <h2 class="text-2xl font-bold mb-3">{{ title }}</h2>
            <div class="space-y-2 text-gray-600">
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4" />
                <span>{{ t('modal.finished') }}: {{ project.finishedDay }}</span>
              </div>
              <div v-if="project.linkGithub" class="flex items-center gap-2">
                <ExternalLink class="w-4 h-4" />
                <span>{{ project.linkGithub }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

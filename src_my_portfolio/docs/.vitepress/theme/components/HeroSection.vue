<script setup lang="ts">
import { ExternalLink, Mail, Volume2, VolumeX } from 'lucide-vue-next'
import { author } from '../composables/useAuthor'
import { useI18n } from '../composables/useI18n'
import { assetUrl } from '../composables/useAssetUrl'

defineProps<{
  isMuted: boolean
}>()

const emit = defineEmits<{
  toggleMute: []
}>()

const { t, language, changeLanguage } = useI18n()

function openGithub() {
  window.open(author.githubLink, '_blank', 'noopener')
}

function openEmail() {
  window.open(
    'https://mail.google.com/mail/?view=cm&fs=1&to=' + author.emailContact,
    '_blank',
    'noopener',
  )
}
</script>

<template>
  <div class="relative w-full h-[450px] bg-white overflow-hidden">
    <video
      :muted="isMuted"
      autoplay
      loop
      class="absolute inset-0 w-full h-full object-cover"
    >
      <source :src="assetUrl(author.coverVideo)" type="video/webm" />
    </video>

    <div class="absolute inset-0 bg-black/20" />

    <div class="absolute top-4 right-4 z-10 flex gap-2">
      <div class="flex items-center gap-1 bg-white/80 rounded-full p-1 backdrop-blur-sm">
        <button
          type="button"
          class="px-3 py-2 rounded-full font-medium transition-colors"
          :class="language === 'en' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'"
          @click="changeLanguage('en')"
        >
          EN
        </button>
        <button
          type="button"
          class="px-3 py-2 rounded-full font-medium transition-colors"
          :class="language === 'vi' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'"
          @click="changeLanguage('vi')"
        >
          VI
        </button>
      </div>
    </div>

    <div class="absolute bottom-4 right-4 z-10 flex gap-2">
      <button
        type="button"
        class="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        :title="isMuted ? t('hero.soundOn') : t('hero.soundOff')"
        @click="emit('toggleMute')"
      >
        <VolumeX v-if="isMuted" class="w-5 h-5" />
        <Volume2 v-else class="w-5 h-5" />
      </button>

      <button
        type="button"
        class="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        :title="t('hero.myGithub')"
        @click="openGithub"
      >
        <ExternalLink class="w-5 h-5" />
      </button>

      <button
        type="button"
        class="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        :title="t('hero.myEmail')"
        @click="openEmail"
      >
        <Mail class="w-5 h-5" />
      </button>
    </div>

    <div class="absolute inset-0 flex flex-col items-center justify-end pb-16">
      <div class="relative">
        <img
          :src="assetUrl(author.avatarURL)"
          alt="avatar"
          class="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
        />
      </div>
      <div class="text-center mt-4">
        <h1 class="text-3xl font-bold text-white drop-shadow-lg">
          {{ author.authorName }}
        </h1>
      </div>
    </div>
  </div>
</template>

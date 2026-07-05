import { ref, computed } from 'vue'

type Lang = 'en' | 'vi'

const STORAGE_KEY = 'portfolio-lang'

function detectLanguage(): Lang {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'vi') return stored
    const nav = navigator.language || ''
    if (nav.toLowerCase().startsWith('vi')) return 'vi'
  }
  return 'en'
}

const currentLang = ref<Lang>(detectLanguage())

const resources = {
  en: {
    nav: {
      myProducts: 'My Products',
      all: 'All',
      games: 'Games',
      iot: 'IoT',
      ai: 'AI',
      websites: 'Websites',
      desktop: 'Desktop App',
      mobile: 'Mobile App',
      others: 'Others',
    },
    hero: {
      soundOn: 'Turn on sound',
      soundOff: 'Turn off sound',
      myGithub: 'My GitHub',
      myEmail: 'My Email',
    },
    modal: {
      description: 'Project Details',
      about: 'About',
      features: 'Features',
      technologies: 'Technologies',
      role: 'My Role',
      finished: 'Finished',
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
    },
    noData: 'No projects found',
  },
  vi: {
    nav: {
      myProducts: 'Sản phẩm của tôi',
      all: 'Tất cả',
      games: 'Trò chơi',
      iot: 'IoT',
      ai: 'AI',
      websites: 'Websites',
      desktop: 'Ứng dụng Desktop',
      mobile: 'Ứng dụng Mobile',
      others: 'Khác',
    },
    hero: {
      soundOn: 'Bật âm thanh',
      soundOff: 'Tắt âm thanh',
      myGithub: 'GitHub của tôi',
      myEmail: 'Email của tôi',
    },
    modal: {
      description: 'Mô tả chi tiết',
      about: 'Ứng dụng làm gì',
      features: 'Tính năng xây dựng',
      technologies: 'Công nghệ sử dụng',
      role: 'Vai trò trong dự án',
      finished: 'Hoàn thành',
    },
    pagination: {
      previous: 'Trước',
      next: 'Tiếp',
    },
    noData: 'Không tìm thấy dự án',
  },
} as const

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return path
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : path
}

export function useI18n() {
  const language = computed(() => currentLang.value)

  function t(path: string): string {
    const dict = resources[currentLang.value] as Record<string, unknown>
    return getNestedValue(dict, path)
  }

  function changeLanguage(lang: Lang) {
    currentLang.value = lang
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }

  return {
    language,
    t,
    changeLanguage,
  }
}

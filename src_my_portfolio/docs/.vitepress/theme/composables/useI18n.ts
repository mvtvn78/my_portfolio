import { ref, computed, type ComputedRef } from 'vue'

type Lang = 'en' | 'vi'

const STORAGE_KEY = 'portfolio-lang'

function detectLanguage(): Lang {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'vi') return stored
    const nav = navigator.language || ''
    if (nav.toLowerCase().startsWith('vi')) return 'vi'
  }
  return 'vi'
}

const currentLang = ref<Lang>(detectLanguage())
/** Bumps on every language switch so `t()` subscribers re-render reliably. */
const localeEpoch = ref(0)

const resources = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      hireMe: 'Hire Me',
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
      subtitle: 'Solo Dev · HCMC, Vietnam',
      hireNow: 'Hire Me Now',
      scroll: '↓ scroll',
    },
    about: {
      eyebrow: 'Independent Developer',
      title: 'About Me',
      p1: 'I am <strong>Mai Văn Tiền (MVT)</strong>, an independent developer in HCMC, specializing in building technology products from idea to full deployment. I have worked on projects of varying scale and domain — including games, web platforms, mobile apps, and AI-integrated systems — giving me a holistic perspective on product development.',
      p2: 'I work across technologies such as <strong>Godot 4, Java NIO, NestJS, Next.js, Python, FastAPI</strong>, and <strong>Machine Learning</strong>, allowing me to handle the full development process from system architecture, backend, and frontend to AI and game engine. My goal is to build stable, scalable products that deliver real value to users.',
    },
    services: {
      label: 'What I can do for you',
      title: 'Services',
      items: [
        {
          cat: 'Category 01', name: 'Games',
          items: ['MMORPG & Online Multiplayer', 'Turn-based RPG', '3D Game', '2D Game', 'Others'],
          desc: 'Godot 4, Unity, custom engine + server backend. From prototype to full launch.',
        },
        {
          cat: 'Category 02', name: 'Websites',
          items: ['Portfolio & Landing Page', 'CMS Systems', 'Corporate Website', 'E-commerce', 'Others'],
          desc: 'React, Spring Boot, NestJS, Next.js. Beautiful UI, solid backend.',
        },
        {
          cat: 'Category 03', name: 'Mobile App',
          items: ['Android', 'iPhone (iOS)', 'Cross-platform'],
          desc: 'Flutter, React Native. One codebase for both platforms, fast deployment.',
        },
        {
          cat: 'Category 04', name: 'AI Solutions',
          items: ['AI Model Training', 'RAG / Chatbot', 'Computer Vision', 'Others'],
          desc: 'Python, TensorFlow, PyTorch, LangChain. Production-ready AI integrated into your product.',
        },
        {
          cat: 'Category 05', name: 'Desktop App',
          items: ['Windows Application', 'C# / .NET', 'Java Desktop'],
          desc: 'WinForms, WPF, Swing. High-performance desktop apps for business.',
        },
        {
          cat: 'Category 06', name: 'IoT & Others',
          items: ['Smart Device Integration', 'Embedded Systems', 'Dashboard & Monitoring'],
          desc: 'Java Spring Boot, NodeJS. Connect smart devices to central management systems.',
        },
      ],
    },
    projects: {
      label: 'My Portfolio',
      title: 'My Products',
    },
    hire: {
      eyebrow: 'Ready for new projects',
      title: 'Hire Me',
      availability: 'Available for freelance projects',
      workflowLabel: 'Workflow',
      stepPrefix: 'Step',
      steps: [
        {
          title: 'Describe Idea',
          desc: 'Reach out and share your project requirements through any channel below.',
        },
        {
          title: 'Consult & Quote',
          desc: 'Free consultation and a detailed quote within 24 hours.',
        },
        {
          title: 'Scope & Timeline',
          desc: 'Confirm scope, deadline, and flexible payment milestones together.',
        },
        {
          title: 'Build & Deliver',
          desc: 'Development, acceptance testing, and full source code handover.',
        },
      ],
      channels: {
        github: { label: 'GitHub', sub: 'mvtvn78' },
        email: { label: 'Email', sub: 'Direct message' },
        facebook: { label: 'Facebook', sub: 'Quick chat · Zalo' },
        linkedin: { label: 'LinkedIn', sub: 'Professional connect' },
      },
    },
    footer: {
      logo: 'Mai Văn Tiền · MVT',
      projects: 'Projects',
      contact: 'Contact',
      copy: '© 2026 · Solo Dev · HCMC, Vietnam',
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
    noData: 'No projects in this category yet.',
  },
  vi: {
    nav: {
      about: 'Về tôi',
      services: 'Dịch vụ',
      projects: 'Dự án',
      contact: 'Liên hệ',
      hireMe: 'Thuê tôi',
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
      subtitle: 'Solo Dev · HCMC, Vietnam',
      hireNow: 'Thuê tôi ngay',
      scroll: '↓ scroll',
    },
    about: {
      eyebrow: 'Lập trình viên độc lập',
      title: 'Về tôi',
      p1: 'Tôi là <strong>Mai Văn Tiền (MVT)</strong>, lập trình viên độc lập tại TP.HCM, chuyên xây dựng các sản phẩm công nghệ từ ý tưởng đến triển khai hoàn chỉnh. Tôi đã trải nghiệm nhiều dự án với quy mô và lĩnh vực khác nhau, bao gồm game, nền tảng web, ứng dụng di động và các hệ thống tích hợp AI, giúp tôi có góc nhìn tổng thể về quá trình phát triển sản phẩm.',
      p2: 'Tôi làm việc trên nhiều nền tảng công nghệ như <strong>Godot 4, Java , NestJS, Next.js, Python</strong> và <strong>Machine Learning</strong>, cho phép đảm nhiệm toàn bộ quy trình phát triển từ kiến trúc hệ thống, backend, frontend đến AI và game engine. Mục tiêu của tôi là xây dựng những sản phẩm ổn định, dễ mở rộng và mang lại giá trị thực tế cho người sử dụng.',
    },
    services: {
      label: 'Tôi có thể làm gì cho bạn',
      title: 'Dịch vụ',
      items: [
        {
          cat: 'Category 01', name: 'Games',
          items: ['MMORPG & Online Multiplayer', 'Turn-based RPG', '3D Game', '2D Game', 'Others'],
          desc: 'Godot 4, Unity, custom engine + server backend. Từ prototype đến launch đầy đủ.',
        },
        {
          cat: 'Category 02', name: 'Websites',
          items: ['Portfolio & Landing Page', 'Hệ thống quản lý (CMS)', 'Trang chủ doanh nghiệp', 'E-commerce', 'Others'],
          desc: 'React, Spring Boot, NestJS, Next.js. Giao diện đẹp, backend vững chắc.',
        },
        {
          cat: 'Category 03', name: 'Mobile App',
          items: ['Android', 'iPhone (iOS)', 'Cross-platform'],
          desc: 'Flutter, React Native. Một codebase cho cả hai nền tảng, deploy nhanh chóng.',
        },
        {
          cat: 'Category 04', name: 'AI Solutions',
          items: ['Huấn luyện mô hình AI', 'RAG / Chatbot', 'Computer Vision', 'Others'],
          desc: 'Python, TensorFlow, PyTorch, LangChain. AI thực chiến tích hợp vào sản phẩm của bạn.',
        },
        {
          cat: 'Category 05', name: 'Desktop App',
          items: ['Windows Application', 'C# / .NET', 'Java Desktop'],
          desc: 'WinForms, WPF, Swing. Ứng dụng desktop hiệu năng cao cho doanh nghiệp.',
        },
        {
          cat: 'Category 06', name: 'IoT & Others',
          items: ['Smart Device Integration', 'Embedded Systems', 'Dashboard & Monitoring'],
          desc: 'Java Spring Boot, NodeJS. Kết nối thiết bị thông minh với hệ thống quản lý trung tâm.',
        },
      ],
    },
    projects: {
      label: 'Portfolio của tôi',
      title: 'My Products',
    },
    hire: {
      eyebrow: 'Sẵn sàng nhận dự án mới',
      title: 'Thuê tôi',
      availability: 'Đang nhận dự án freelance',
      workflowLabel: 'Quy trình làm việc',
      stepPrefix: 'Bước',
      steps: [
        {
          title: 'Mô tả ý tưởng',
          desc: 'Liên hệ và mô tả yêu cầu dự án qua bất kỳ kênh nào bên dưới.',
        },
        {
          title: 'Tư vấn & báo giá',
          desc: 'Tư vấn miễn phí và báo giá chi tiết trong vòng 24 giờ.',
        },
        {
          title: 'Thống nhất scope',
          desc: 'Xác nhận phạm vi công việc, deadline và milestone thanh toán.',
        },
        {
          title: 'Build & bàn giao',
          desc: 'Phát triển, nghiệm thu và bàn giao đầy đủ source code.',
        },
      ],
      channels: {
        github: { label: 'GitHub', sub: 'mvtvn78' },
        email: { label: 'Email', sub: 'Nhắn tin trực tiếp' },
        facebook: { label: 'Facebook', sub: 'Chat nhanh · Zalo' },
        linkedin: { label: 'LinkedIn', sub: 'Kết nối chuyên nghiệp' },
      },
    },
    footer: {
      logo: 'Mai Văn Tiền · MVT',
      projects: 'Projects',
      contact: 'Contact',
      copy: '©mvtvn78 2026',
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
    noData: 'Chưa có dự án trong danh mục này.',
  },
} as const

const skills = [
  'Website Development', 'Game Development', 'AI Development', 'Desktop Development', 'Mobile Development', 'Hardware Development', 'IoT Development',
]

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

export function useI18n() {
  const language = computed(() => currentLang.value)

  function t(path: string): string {
    void localeEpoch.value
    const val = getNestedValue(resources[currentLang.value] as Record<string, unknown>, path)
    return typeof val === 'string' ? val : path
  }

  function tHtml(path: string): string {
    return t(path)
  }

  function tArray<T>(path: string): ComputedRef<T[]> {
    return computed(() => {
      void localeEpoch.value
      const val = getNestedValue(resources[currentLang.value] as Record<string, unknown>, path)
      return Array.isArray(val) ? (val as T[]) : []
    })
  }

  function changeLanguage(lang: Lang) {
    if (currentLang.value === lang) return
    currentLang.value = lang
    localeEpoch.value += 1
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }

  return {
    language,
    skills,
    t,
    tHtml,
    tArray,
    changeLanguage,
  }
}

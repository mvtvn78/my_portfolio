# Migration: React (CRA) → VitePress

Portfolio đã được migrate từ **React 18 + Create React App + Tailwind + react-i18next** sang **VitePress + Vue 3 + Tailwind**, giữ nguyên giao diện và chuyển dữ liệu project sang Markdown frontmatter.

## Chạy dự án

```bash
npm install
npm run dev
npm run build
npm run preview
```

Site deploy lên GitHub Pages với `base: /my_portfolio/` (giữ nguyên URL cũ).

```bash
npm run deploy   # build + gh-pages → docs/.vitepress/dist
```

## Cấu trúc mới

```
docs/
  .vitepress/
    config.mts
    theme/
      Layout.vue          # Full-page layout, bỏ doc chrome mặc định
      HomeView.vue        # Tương đương App.jsx
      components/         # HeroSection, CategoryFilter, ProjectGrid, Modal, LazyImage
      composables/        # useI18n, useProjects, useAuthor, useAssetUrl
      style.css           # Tailwind + custom classes từ index.css gốc
  projects.data.ts        # createContentLoader('projects/**/*.md')
  projects/               # 16 file .md (frontmatter = dữ liệu project)
  public/
    data/                 # Ảnh/video local (cần copy thủ công)
    author/                 # Avatar + cover video tác giả
  index.md
  package.json            # "type": "module" — cần cho VitePress ESM
```

Code React gốc đã được gỡ sau khi migrate xong. Toàn bộ logic UI nằm trong `docs/.vitepress/theme/`.

## Quyết định kỹ thuật

### Custom theme toàn phần

VitePress được dùng như **SPA một trang**, không phải trang tài liệu:

- `Layout.vue` render trực tiếp `<HomeView />`, bỏ sidebar/nav/footer mặc định.
- CSS override ẩn padding doc layout (`.VPDoc`, `.vp-doc`).

### Dữ liệu: Markdown + `createContentLoader`

- Mỗi project → `docs/projects/<category>/<slug>.md` với frontmatter YAML.
- `docs/projects.data.ts` nạp tất cả file lúc build → JSON cho Vue components.
- Field `category` mới (trước đây suy ra từ vị trí import trong `projectLoader.js`).
- Giữ tên field `videoURL` (không đổi sang `video`).

### i18n

- **Không** dùng `vue-i18n` hay VitePress locales routing.
- Composable `useI18n.ts`: `currentLang` reactive (`en` | `vi`), hàm `t('nav.myProducts')`, `changeLanguage()`.
- Detect ngôn ngữ: `localStorage` key `portfolio-lang` → `navigator.language` → fallback `en`.
- Dictionary UI (nav, hero, modal, pagination) copy từ `src/i18n/index.js`; **bỏ** block `projects{...}` vì nội dung project lấy từ frontmatter `vi`/`en`.

### Thư viện

| React | Vue / VitePress |
|-------|-----------------|
| `lucide-react` | `lucide-vue-next` |
| `react-i18next` | `useI18n.ts` (custom) |
| `require('../../../data/...')` | `/data/...` trong `public/` + `withBase()` |

### Tailwind CSS

- Entry: `docs/.vitepress/theme/style.css` (import trong `theme/index.ts`)
- Config: `tailwind.config.js` ở root, scan `docs/**` + `docs/.vitepress/**`
- **PostCSS phải khai báo trực tiếp** trong `docs/.vitepress/config.mts`:

```ts
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

vite: {
  css: {
    postcss: {
      plugins: [tailwindcss({ config: '.../tailwind.config.js' }), autoprefixer()],
    },
  },
}
```

Chỉ trỏ `postcss: '../../postcss.config.js'` **không hoạt động** — file CSS build còn nguyên `@tailwind base` thô, toàn bộ utility class (`bg-gray-50`, `grid`, …) không apply.

- `appearance: false` — tắt dark mode VitePress (bản React không có).

### Component không port

- **`NavBar.jsx`**: không được render trong `App.jsx` gốc → **không port**.

### ESM

- Thêm `docs/package.json` với `"type": "module"` để `createContentLoader` / VitePress chạy cùng CRA (CommonJS) ở root.
- Import data: `import { data } from '../../../projects.data.js'`.

## Assets cần bổ sung thủ công

Thư mục `src/data/` **không có** trong repo hiện tại. Copy từ source gốc vào:

### `docs/public/author/`

| File | Dùng cho |
|------|----------|
| `356073835_976104480273406_2903911994535812316_n.jpg` | Avatar hero |
| `5636516356524.webm` | Video nền hero |

### `docs/public/data/`

| File | Project |
|------|---------|
| `pneum.png` | AI pneumonia detection |
| `dfake.png` | AI deepfake |
| `puzzle_game.png`, `demo_puzzle.mkv` | Game sắp xếp |
| `gameCplus.png`, `gameSDL.mkv` | Game SDL |
| `final_iot.jpg` | IoT smart socket |
| `admin_mt5.png`, `mt5_admin_demo.mp4` | Admin Mt5 |
| `demoBEmt5.png`, `backendfirst.mkv` | Backend Mt5 |
| `mvtfilm.png` | MvtFilm |
| `webshop.png`, `webgameshop.mp4` | Game Store |
| `mt5_user.png`, `mt5_user_demo.mp4` | User Mt5 |
| `MotoA1.png`, `motovideo.mp4` | Moto A1 |
| `student_manage.png`, `student_1.mkv` | QL Sinh viên WinForm |
| `student_manager.png`, `qlsv_sql.mkv` | QLSV SQL Server |
| `dohoamaytinh.png` | ĐHMT Xuân Hạ Thu Đông |
| `ungdung_lo.png` | Dating app + Hidden World |

Ảnh/video **URL ngoài** (Dropbox, Wikimedia, gstatic…) giữ nguyên trong frontmatter, không cần file local.

## Thêm project mới

1. Tạo `docs/projects/<category>/<slug>.md` theo schema frontmatter (xem `mvt-shop-reactjs.md` làm mẫu).
2. Copy asset vào `docs/public/data/` nếu có file local.
3. Không cần sửa code — `createContentLoader` tự pick up file mới khi build.

## Khác biệt hành vi (không tránh được / cố ý)

| Hành vi | React gốc | VitePress |
|---------|-----------|-----------|
| Language storage key | `i18nextLng` (i18next) | `portfolio-lang` |
| i18n detect | `i18next-browser-languagedetector` | `localStorage` + `navigator.language` |
| Framework | React 18 | Vue 3 |
| Build output | `build/` | `docs/.vitepress/dist/` |
| Project data | `require()` từng `index.jsx` | Markdown frontmatter + content loader |
| Ảnh local chưa có file | Webpack bundle lỗi nếu thiếu | LazyImage hiện skeleton / "Failed to load" |

Hành vi **giữ nguyên**: hash modal (`#<url>`), scroll position khi mở/đóng modal, filter category, pagination 9/trang, sort `finishedDay` giảm dần, toggle EN/VI, mute hero video.

## Checklist QA

- [ ] So sánh visual React (`npm start`) vs VitePress (`npm run docs:dev`) trên mobile/tablet/desktop
- [ ] Hero video autoplay + mute toggle
- [ ] EN/VI cập nhật toàn bộ UI
- [ ] Filter category + pagination
- [ ] Click card → modal + hash; reload với hash → mở đúng modal
- [ ] Đóng modal xóa hash, không nhảy scroll
- [ ] 16 project đủ dữ liệu
- [ ] `npm run docs:build` thành công
- [ ] Copy assets vào `public/` và verify ảnh/video hiển thị

## Projects đã migrate (16)

| Category | Files |
|----------|-------|
| ai | pneumonia-detection, deep-fake-detection |
| games | game-sap-xep, tim-hieu-co-ban |
| iot | smart-socket |
| websites | admin-mt5, backend-mt5, mvt-film, mvt-shop-reactjs, user-mt5 |
| desktop | moto-a1-win, ql-sv-winform, ql-sinh-vien-win, xuan-ha-thu-dong |
| mobile | dating-app |
| others | hidden-world |

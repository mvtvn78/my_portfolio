# My Portfolio (VitePress)

Portfolio cá nhân — **VitePress + Vue 3 + Tailwind CSS**. Dữ liệu project nằm trong Markdown frontmatter (`docs/projects/`).

## Chạy dự án

```bash
npm install
npm run dev       # http://localhost:5173/My_Portfolio/
npm run build
npm run preview
npm run deploy    # GitHub Pages → docs/.vitepress/dist
```

## Cấu trúc

```
docs/
  .vitepress/          # config, theme Vue, composables
  projects/            # 16 project (.md + frontmatter)
  projects.data.ts     # content loader
  public/
    data/              # ảnh/video project (copy từ src/data gốc)
    author/            # avatar + video hero
  index.md
tailwind.config.js
```

## Thêm project mới

Tạo `docs/projects/<category>/<slug>.md` theo schema frontmatter (xem `docs/projects/websites/mvt-shop-reactjs.md`). Build lại — không cần sửa code.

## Assets

Copy file local vào `docs/public/data/` và `docs/public/author/`. Danh sách file cần thiết: xem [README-migration.md](./README-migration.md).

## Lịch sử migrate

Chi tiết chuyển từ React (CRA) sang VitePress: [README-migration.md](./README-migration.md).

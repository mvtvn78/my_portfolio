/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/**/*.{vue,md,ts,js}',
    './docs/.vitepress/**/*.{vue,ts,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        error: '#f5222d',
      },
    },
  },
  plugins: [],
}

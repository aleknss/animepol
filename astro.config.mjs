import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.animepol.xyz',
  prefetch: true,
  redirects: {
    '/anime/1778368762731': '/anime/gundam-00/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})

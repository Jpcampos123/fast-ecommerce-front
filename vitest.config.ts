import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '~': resolve(__dirname, './'),
      '#imports': resolve(__dirname, './test/mocks/nuxt-imports.ts'),
      '#app': resolve(__dirname, './test/mocks/nuxt-imports.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'utils/**/*.ts',
        'stores/**/*.ts',
        'composables/**/*.ts',
        'components/**/*.vue',
      ],
      exclude: [
        'node_modules/**',
        '.nuxt/**',
        'dist/**',
        '**/*.spec.ts',
        'i18n/**',
        'plugins/**',
      ],
      all: true,
      thresholds: {
        lines: 80,
      },
    },
  },
})

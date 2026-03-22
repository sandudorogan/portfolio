import { fileURLToPath } from 'node:url'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

const plausibleTrackerMock = fileURLToPath(new URL('./test/mocks/plausible-tracker.ts', import.meta.url))

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/unit/**/*.test.ts'],
          environment: 'node',
          setupFiles: [fileURLToPath(new URL('./test/setup/unit.ts', import.meta.url))],
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.test.ts'],
          environment: 'nuxt',
          setupFiles: [fileURLToPath(new URL('./test/setup/nuxt.ts', import.meta.url))],
        },
        resolve: {
          alias: {
            '@plausible-analytics/tracker': plausibleTrackerMock,
          },
        },
      }),
      {
        test: {
          name: 'e2e',
          include: ['test/e2e/**/*.test.ts'],
          environment: 'node',
        },
      },
    ],
  },
})

import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    setupFiles: [
      new URL('./test/setup/unit.ts', import.meta.url).pathname,
      new URL('./test/setup/nuxt.ts', import.meta.url).pathname,
    ],
  },
})

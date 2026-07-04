# Comprehensive Test Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a broad automated test suite for the portfolio app and make CI run the tests on every push.

**Architecture:** Use Vitest with three layers: fast Node unit tests for pure logic, Nuxt runtime tests for composables and interactive components, and lightweight end-to-end smoke tests for page rendering and public API routes. Extract small pure helpers only where needed to make existing server behavior testable without over-mocking application internals, and keep HTTP error creation inside the Nitro handlers.

**Tech Stack:** Bun, Vitest, `@nuxt/test-utils`, `@vue/test-utils`, happy-dom, Nuxt 4, GitHub Actions

---

### Task 1: Bootstrap the test harness

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `test/setup/unit.ts`
- Create: `test/setup/nuxt.ts`

- [ ] **Step 1: Write the failing test harness expectation**

Create `test/setup/unit.ts` and `test/setup/nuxt.ts` with shared setup only. Also create one minimal test file under `test/unit/` and one under `test/nuxt/` that intentionally assert the wrong value so the first run proves both projects are discovered by Vitest.

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest --run`
Expected: FAIL because there is no Vitest config, no scripts, and no test files are wired into runnable projects yet.

- [ ] **Step 3: Write minimal implementation**

Add test scripts to `package.json`:
- `test`
- `test:unit`
- `test:nuxt`
- `test:e2e`
- `test:coverage`

Add `vitest.config.ts` using `defineConfig` from `vitest/config` and `defineVitestProject` from `@nuxt/test-utils/config`, with projects:
- `unit` -> `test/unit/**/*.test.ts` in `node`
- `nuxt` -> `test/nuxt/**/*.test.ts` in `nuxt`
- `e2e` -> `test/e2e/**/*.test.ts` in `node`

Install any missing test dependencies with Bun:
- verify the existing `@nuxt/test-utils` version remains compatible with Nuxt 4
- `vitest`
- `@vue/test-utils`
- `happy-dom`
- `@vitest/coverage-v8`

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test`
Expected: PASS with zero or placeholder tests recognized cleanly.

- [ ] **Step 5: Commit**

Commit message:
`test: add vitest test harness`

### Task 2: Cover shared pure logic and contact payload behavior

**Files:**
- Modify: `server/api/contact.post.ts`
- Create: `server/utils/contact.ts`
- Test: `test/unit/app/utils/utils.test.ts`
- Test: `test/unit/server/contact.test.ts`

- [ ] **Step 1: Write the failing tests**

Create tests that cover:
- `cn()` merging Tailwind classes predictably
- contact payload validation rejects invalid name, email, subject, and message values
- HTML stripping and length limiting for accepted payloads
- email payload generation uses fallback subject when subject is blank

- [ ] **Step 2: Run tests to verify they fail**

Run:
- `bunx vitest --run --project unit test/unit/app/utils/utils.test.ts`
- `bunx vitest --run --project unit test/unit/server/contact.test.ts`

Expected: FAIL because the contact helper module does not exist yet and current behavior is not directly testable.

- [ ] **Step 3: Write minimal implementation**

Extract the pure contact logic from `server/api/contact.post.ts` into `server/utils/contact.ts`, keeping the endpoint behavior unchanged:
- input validation
- sanitization
- default subject handling
- email text/html payload formatting

Make the extracted helpers throw plain `Error` values or return validated data. Keep `createError(...)` mapping inside `server/api/contact.post.ts` so the helper remains a true Node unit target, and keep `readValidatedBody(...)` integration compatible by translating helper failures in the handler boundary.

Keep the handler responsible only for reading config, reading the body, calling `Resend`, and mapping provider errors to an HTTP error.

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun run test:unit`
Expected: PASS for the new unit suite.

- [ ] **Step 5: Commit**

Commit message:
`test: cover shared utilities and contact logic`

### Task 3: Cover interactive Nuxt components and SEO metadata

**Files:**
- Test: `test/nuxt/composables/usePageSeo.test.ts`
- Test: `test/nuxt/components/RevealContactValue.test.ts`
- Test: `test/nuxt/components/Header.test.ts`
- Test: `test/nuxt/components/ContactCta.test.ts`

- [ ] **Step 1: Write the failing tests**

Create runtime tests that cover:
- `usePageSeo()` sets canonical and social metadata from route and site URL
- `AppRevealContactValue` reveals fetched contact info, blocks duplicate requests while loading, and shows retry UI on errors
- `AppHeader` marks the active route and switches locale using the computed target path
- `AppContactCta` falls back to localized `/contact` when `to` is omitted and respects an explicit `to` override

- [ ] **Step 2: Run tests to verify they fail**

Run:
- `bunx vitest --run --project nuxt test/nuxt/composables/usePageSeo.test.ts`
- `bunx vitest --run --project nuxt test/nuxt/components/RevealContactValue.test.ts`
- `bunx vitest --run --project nuxt test/nuxt/components/Header.test.ts`
- `bunx vitest --run --project nuxt test/nuxt/components/ContactCta.test.ts`

Expected: FAIL until the tests, mocks, and any missing test setup are correct.

- [ ] **Step 3: Write minimal implementation**

Prefer test-only stubs and Nuxt runtime mocks. Only adjust production code if a behavior is currently impossible to test without hidden coupling. Keep UI behavior unchanged.

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun run test:nuxt`
Expected: PASS for all Nuxt runtime tests.

- [ ] **Step 5: Commit**

Commit message:
`test: add nuxt runtime coverage`

### Task 4: Add end-to-end smoke coverage for routes and public APIs

**Files:**
- Test: `test/e2e/routes.test.ts`
- Test: `test/e2e/reveal-api.test.ts`

- [ ] **Step 1: Write the failing tests**

Create e2e smoke tests that cover:
- `/`, `/about`, and `/contact` render successfully and include page-specific title/description output
- `/ro`, `/ro/about`, and `/ro/contact` render successfully and include stable Romanian copy from `i18n/locales/ro.json`
- `/api/reveal/email` and `/api/reveal/phone` return no-store headers and correctly formatted links when runtime config is present
- reveal endpoints fail fast when runtime config is missing

- [ ] **Step 2: Run tests to verify they fail**

Run:
- `bunx vitest --run --project e2e test/e2e/routes.test.ts`
- `bunx vitest --run --project e2e test/e2e/reveal-api.test.ts`

Expected: FAIL until the test server setup and runtime env values are configured.

- [ ] **Step 3: Write minimal implementation**

Use `@nuxt/test-utils/e2e` setup and request helpers with `browser: false`. Configure test-only environment values without changing production runtime defaults, including both `contactEmail` and `contactPhone`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun run test:e2e`
Expected: PASS for route and endpoint smoke coverage.

- [ ] **Step 5: Commit**

Commit message:
`test: add e2e smoke coverage`

### Task 5: Run tests in CI on every push

**Files:**
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Write the failing expectation**

Define the intended CI behavior:
- test job runs on every push, not only pushes to `main`
- test job runs before build
- build still runs on push and pull request

- [ ] **Step 2: Verify current workflow is insufficient**

Read `.github/workflows/ci.yml`
Expected: current workflow does not run on pushes to non-`main` branches and does not run a dedicated test command.

- [ ] **Step 3: Write minimal implementation**

Update GitHub Actions to:
- trigger on all pushes and PRs
- add a dedicated `test` job that installs dependencies and runs `bun run test`
- keep the existing build job, preferably depending on the test job
- leave the rest of the workflow behavior unchanged unless the existing file already contains additional jobs

- [ ] **Step 4: Run local verification**

Run:
- `bun run test`
- `bun run build`

Expected: PASS locally so CI has the same commands.

- [ ] **Step 5: Commit**

Commit message:
`ci: run tests on every push`

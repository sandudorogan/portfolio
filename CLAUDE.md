# CLAUDE.md

Project navigation for AI assistants working in this repository.

Prefer linking to existing sources below instead of duplicating setup details, dependency lists, or config snippets.

## Canonical Sources

- Project setup, deployment, and operational docs: `README.md`
- Scripts and dependency declarations: `package.json`
- Locked dependency graph: `bun.lock`
- Nuxt runtime/build configuration: `nuxt.config.ts`
- Tailwind v4 config, theme tokens, and plugin registration: `app/assets/css/main.css`
- Inspira plugin bridge used by Tailwind `@plugin`: `app/assets/css/inspira-ui.plugin.js`

## UI and Design Components

- Design component source catalog: <https://inspira-ui.com/docs/en/components>
- Local UI components: `app/components/ui/`
- Main integration example: `app/pages/index.vue`

When adding or updating visual components, use the Inspira catalog as the design reference and adapt implementation to existing local component patterns in `app/components/ui/`.

## Relevant App Structure

- App entry: `app/app.vue`
- Default layout: `app/layouts/default.vue`
- Route pages: `app/pages/`
- Feature sections/components: `app/components/app/`
- Shared composables/types: `app/composables/`
- Shared utilities: `app/utils/`

# Personal Portfolio

Retro OS portfolio at [dorogans.com](https://dorogans.com) — every section is a draggable Mac OS 8 window on a dithered desktop. Built with Nuxt 4, bilingual English/Romanian.

## Stack

- [Nuxt 4](https://nuxt.com/) with [Nuxt UI](https://ui.nuxt.com/) and Tailwind CSS v4
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/) — English at `/`, Romanian at `/ro`, copy in `i18n/locales/`
- [nuxt-og-image](https://nuxtseo.com/og-image) + [@nuxtjs/sitemap](https://nuxtseo.com/sitemap) for SEO
- [Vitest](https://vitest.dev/) with unit, Nuxt runtime, and e2e projects

## Prerequisites

- [Bun](https://bun.sh/) (v1.3 or newer)

## Setup

```bash
bun install
```

Contact details are never shipped in the bundle — the reveal-on-click endpoints read them from server env vars:

```bash
NUXT_CONTACT_EMAIL=you@example.com
NUXT_CONTACT_PHONE=+40700000000
```

## Development

```bash
bun run dev        # dev server on http://localhost:3000
bun run test       # full test suite (unit + nuxt + e2e)
bun run build      # production build
bun run preview    # preview the production build
```

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger automatic deployments; CI runs the test suite on every push.

## Project Structure

- `app/pages/index.vue` — the home desktop (about, services, work, experience, contact)
- `app/pages/ai.vue` — the AI page (how I build with agents, what I shipped, side projects)
- `app/components/app/` — desktop shell (`Desktop.vue`), window chrome (`Window.vue`), contact reveal
- `app/assets/css/os.css` — shared Retro OS styles (unscoped, `os-` prefixed)
- `app/components/ui/` — Inspira UI component catalog
- `i18n/locales/` — EN/RO translations
- `server/api/reveal/` — anti-scraping contact endpoints
- `test/` — unit, Nuxt runtime, and e2e suites

## License

This project is licensed under a custom license. See the LICENSE file for details.

## Author

Sandu Dorogan

# Personal Portfolio

A modern, interactive portfolio website built with Nuxt 3, Vue.js, and Tailwind CSS.

## Overview

This project is a personal portfolio website that showcases interactive elements and modern web development practices. It features:

- Nuxt 3 framework for Vue.js
- Tailwind CSS for styling
- Interactive UI components
- Responsive design

## Technologies Used

- [Nuxt 3](https://nuxt.com/) - The Vue.js framework
- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Nuxt UI](https://ui.nuxt.com/) - UI components for Nuxt
- [VueUse](https://vueuse.org/) - Collection of Vue composition utilities

## Prerequisites

- [Bun](https://bun.sh/) (v1.3 or newer)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

1. Install dependencies:

```bash
bun install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Building for Production

Build the project for production:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## Project Structure

- `app.vue` - Main application component
- `assets/` - Static assets like CSS
- `components/` - Vue components
- `pages/` - Application pages and routes
- `public/` - Public static files
- `nuxt.config.ts` - Nuxt configuration

## Production Deployment with Docker

The project includes a Docker Compose setup with nginx reverse proxy and Let's Encrypt SSL.

### Prerequisites

- Docker and Docker Compose installed
- Domain DNS (A/AAAA records) pointing to your server for `dorogans.com` and `www.dorogans.com`
- Ports 80 and 443 open and reachable from the internet

### First-time Setup

1. Clone the repository on your server:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

1. Set your email for Let's Encrypt certificate expiry notifications (recommended):

```bash
export LETSENCRYPT_EMAIL=you@example.com
```

1. Run the certificate initialization script:

```bash
./scripts/init-letsencrypt.sh
```

This script will:

- Create a temporary self-signed certificate so nginx can start
- Request real certificates from Let's Encrypt for both domains
- Reload nginx with the new certificates

1. Start all services:

```bash
docker compose up -d
```

### Testing with Staging Certificates

To test without hitting Let's Encrypt rate limits, use the staging server:

```bash
export LETSENCRYPT_STAGING=1
./scripts/init-letsencrypt.sh
```

### Certificate Renewal

Certificates are automatically renewed by the certbot container every 12 hours (if within 30 days of expiry).

To manually renew and reload:

```bash
docker compose run --rm certbot renew
docker compose exec nginx nginx -s reload
```

### Enabling HSTS

After verifying SSL works correctly, enable HSTS by editing `nginx/conf.d/portfolio.conf` and uncommenting:

```nginx
add_header Strict-Transport-Security "max-age=63072000" always;
```

Then reload nginx:

```bash
docker compose exec nginx nginx -s reload
```

## License

This project is licensed under a custom license. See the LICENSE file for details.

## Author

Sandu Dorogan

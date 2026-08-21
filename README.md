# DOOMSCRLL Audience Webapp

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Framework](https://img.shields.io/badge/SvelteKit-2.0-FF3E00.svg)](https://kit.svelte.dev/)
[![Svelte](https://img.shields.io/badge/Svelte-v5-FF3E00.svg)](https://svelte.dev/)
[![Styling](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4.svg)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Cloudflare-Workers-F38020.svg)](https://workers.cloudflare.com/)

This repository powers the public audience discovery webapp for the **DOOMSCRLL** ecosystem, hosted live at [https://app.doomscrll.com](https://app.doomscrll.com).

---

## 🌐 DOOMSCRLL Open Source Ecosystem

- **Audience Webapp** (`doomscrll-webapp-audience`) — _You are here_
- **Backend API** (`doomscrll-backend`) — Fastify 5 REST API & PostgreSQL schema
- **Landing Website** (`doomscrll-landing-website`) — Astro public portal
- **Creator Webapp** (`doomscrll-webapp-doomlit`) — SvelteKit 2 slot reservation & creator dashboard
- **Audience Mobile App** (`doomscrll_app_audience`) — Cross-platform Flutter MVVM mobile app

---

## 1. Tech Stack & Features

- **SvelteKit 2 & Svelte 5**: Reactive frontend discovery platform leveraging Svelte 5 Runes for fine-grained reactivity.
- **Tailwind CSS v4**: Utility-first design system via `@tailwindcss/vite`.
- **Cloudflare Workers Deployment**: Adapter `@sveltejs/adapter-cloudflare` for low-latency global edge delivery.
- **Discovery Feed**: Real-time 24-hour showcase feed featuring today's active DOOMLITs.
- **Deep JSONB Search & Filters**: Client-side and server-side filtering by categories, multi-select tags, and platforms (`primaryPlatform` and `secondaryPlatforms`).
- **Ticket Card Layout**: Distinct visual design identity with customized ticket mask aesthetics and interactive modals.
- **Storybook Component Library**: Isolated component playground configured via `@storybook/sveltekit`.

---

## 2. Quick Start & Development

### Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Commands

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment Variables**:

   ```bash
   cp .env.example .env
   ```

   Set `API_BASE_URL` to your local or staging backend endpoint.

3. **Start Development Server**:

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser.

4. **Run Type Checks & Svelte Diagnostics**:

   ```bash
   npm run check
   ```

5. **Build for Production**:

   ```bash
   npm run build
   ```

6. **Deploy to Cloudflare Workers**:

   ```bash
   npm run deploy
   ```

7. **Launch Storybook**:
   ```bash
   npm run storybook
   ```

---

## 📄 License & Trademark Notice

- **Code License**: Source code is licensed under the [Apache License, Version 2.0](LICENSE).
- **Trademark Policy**: The **DOOMSCRLL** name, logos, brand identity, and custom design assets are reserved trademarks. See [TRADEMARK.md](TRADEMARK.md) for usage policy and rebranding guidelines for forks.

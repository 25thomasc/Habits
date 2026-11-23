# Habits

A clean, modern, mobile-first habit tracker. Installable as a Progressive Web App,
works offline, and stores all data privately on your device (IndexedDB) — no account,
no server.

## Features

- **Daily check-off + streaks** — tap to complete today's habits; current & best streak per habit.
- **Stats & progress** — 7/30-day completion rate, best streak, a 30-day trend chart, and a 12-week consistency heatmap.
- **Customization** — per-habit emoji icon and color, with a live preview.
- **Offline + installable** — PWA with a service worker; add to home screen for a native feel.
- **Theming** — light & dark mode (follows your system).

## Tech

React 18 + TypeScript, Vite, IndexedDB (via `idb`).

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (default http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The output is in `dist/`. Deploy that folder to any static host; the service worker
and manifest are included, so it installs as an app and works offline.

## Install as an app

- **Phone:** open the site, use the browser menu → "Add to Home Screen" / "Install app".
- **Desktop (Chrome/Edge):** click the install icon in the address bar.

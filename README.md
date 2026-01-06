# DocAuto

DocAuto is an AI document automation workspace for organizing, analyzing, and sharing documents inside the office flow. The UI is built with React plus shadcn-ui components on top of Tailwind, and the backend relies on the PDF.js worker already included in public.

## Project info
- **Local preview**: `http://localhost:8080` (see `vite.config.ts` for the dev server port).
- **Tech stack**: Vite, React, TypeScript, shadcn-ui, Tailwind CSS, and the PDF.js renderer.
- **Samples**: `product-intro-sample.md` and the accompanying PDF describe the product story, page structure, and example data.

## Getting started
1. Install dependencies with `npm install`.
2. Run `npm run dev` to start the Vite dev server on port 8080.
3. Open `http://localhost:8080` to explore the DocAuto dashboard and navigation.

## Build & QA
- `npm run build` compiles the app into `dist` for production.
- `npm run preview` serves the built output locally for verification.
- `npm run lint` runs ESLint against the source files and configs.

## Editing pointers
- `src/main.tsx` bootstraps the app and wraps it with the React Query client, router, and document store provider.
- `src/components/layout` holds the header, sidebar, and scaffold for the workspace shell; the sidebar already shows the DocAuto badge.
- `src/pages` contains the feature screens (Dashboard, Projects, Upload, Vector Search, and more).
- `design-tokens.json` controls the color, spacing, and typography tokens that feed the Tailwind theme.
- `vite.config.ts` runs `lovable-tagger` only in development mode so you can work locally without extra tooling when building for production.

## Deployment checklist
1. `npm run build`
2. Publish the contents of `dist` to your hosting environment (static host, CDN, etc.).
3. Serve the built files with a web server; the entry point is `dist/index.html`.

If you need to change metadata (title, description, social tags), edit `index.html` and swap in your own brand assets. The app shell will automatically adopt those values once you redeploy.

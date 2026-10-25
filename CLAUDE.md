@AGENTS.md

# ByDaisy Wedding Planner — Developer Quick Reference

## Commands
- Run dev server: `bun run dev` (or `npm run dev`)
- Run typecheck: `npx tsc --noEmit`
- Run production build: `npm run build`
- Run linter: `npm run lint`

## Architecture & Code Conventions
- Framework: Next.js 16.4.3 (App Router with Turbopack), React 19, Tailwind CSS v4.
- Creative Dev: Lenis smooth scroll provider (`components/providers/smooth-scroll.tsx`), GSAP ScrollTrigger, Framer Motion.
- Data Layer: Single source of truth at `data/wedding-prices.json`.
- Assets: PDF E-Catalogs located at `public/assets/`.
- Styling: Custom HSL theme tokens in `app/globals.css`.
- Links & Contact: Always use Hotline 1 (`+62 822-7709-4277`), Hotline 2 (`+62 821-6222-1468`), and Instagram `@bydaisyplanner`.
- Address: Jl. Batee Suasa, Lambhuk, Banda Aceh.

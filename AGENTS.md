<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## ByDaisy Luxury Matrimonial Platform — Agent Guidelines

### 1. Studio Information & Official Contacts
- **Brand**: ByDaisy Planner
- **Address**: Jl. Batee Suasa, Lambhuk, Banda Aceh, Aceh
- **Hotline 1 (Primary)**: `+62 822-7709-4277` (`https://wa.me/6282277094277`)
- **Hotline 2 (Secondary)**: `+62 821-6222-1468` (`https://wa.me/6282162221468`)
- **Instagram**: `@bydaisyplanner` (`https://instagram.com/bydaisyplanner`)
- **Email Concierge**: `concierge@bydaisy.com`

### 2. Official PDF E-Catalog Assets (`public/assets/`)
When referencing or creating links to downloadable catalogs, always use the following canonical paths:
- `ByDaisy-Company-Profile.pdf` (`/assets/ByDaisy-Company-Profile.pdf`) — 35 MB
- `ALL-IN-PACKAGE-DAISYPLANNER.pdf` (`/assets/ALL-IN-PACKAGE-DAISYPLANNER.pdf`) — 21 MB
- `SRIBUDAYA-2026.pdf` (`/assets/SRIBUDAYA-2026.pdf`) — 25 MB
- `VANDYS-EVENT-PACKAGE.pdf` (`/assets/VANDYS-EVENT-PACKAGE.pdf`) — 4 MB

### 3. Package & Pricing Standards (`data/wedding-prices.json`)
The single source of truth for all pricing data is `data/wedding-prices.json`.
- **All-In Signature ByDaisy**:
  - Basic Intimate (300 Pax): Rp 92.500.000
  - Platinum Intimate (300 Pax): Rp 110.000.000
  - Gold Intimate (500 Pax): Rp 115.000.000
  - Gold Grand (1.000 Pax): Rp 155.000.000
- **Sribudaya Resort 2026** (Include Venue Sribudaya & Free Stay):
  - Outdoor Intimate (300 Pax): Rp 95.000.000
  - Platinum Intimate (500 Pax): Rp 125.000.000
  - Silver (1.000 Pax): Rp 155.000.000
  - Platinum Best Deal (1.000 Pax): Rp 175.000.000
  - Gold (1.500 Pax): Rp 200.000.000
  - Royal (2.000 Pax): Rp 235.000.000
- **Vandys Garden 2026** (Include Venue, Photobooth by @bp.projectbooth, Bouquet by @hs_floralstudio):
  - All-In (500 Pax): Rp 85.000.000
- **Wedding Planner & WO Only**:
  - Wedding Organizer: Rp 15.000.000
  - Wedding Planner Standard: Rp 20.000.000
  - Wedding Planner Platinum: Rp 25.000.000
- **Dekorasi Pelaminan Saja**:
  - Pelaminan 10m: Rp 40.000.000
  - Pelaminan 15m (Custom 4m): Rp 60.000.000
  - Pelaminan 15-18m (Custom 6m + Fresh Flowers): Rp 70.000.000
  - Pelaminan Royal 16-19m (Full Custom + Tiffani Table Set): Rp 100.000.000

### 4. Copywriting & Aesthetic Rules
- **No Em Dashes**: Do not use em dashes in user-facing copy. Use commas, periods, or standard hyphens instead.
- **Palette**: Use curated HSL tokens (`#1A1A1A` Earthy Charcoal, `#2E4A3B` Forest Green, `#6B4F3B` Warm Brown, `#8B7A6B` Warm Taupe, `#B7ACA0` Taupe, `#FBF9F5` Canvas, `#F4F0E8` Sand).
- **Typography**: Font 'The Seasons' (Display Serif WOFF2 di `public/assets/fonts/`) dan Google Fonts `Plus Jakarta Sans` (sans-serif body).
- **Navigation**: Always keep the 5 primary editorial categories on the desktop navbar (`About`, `Services & Pricing`, `Portfolio`, `Journal & Tradisi`, `Contact`).

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

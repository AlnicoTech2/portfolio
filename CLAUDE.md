# Portfolio — Claude Code Context

## What This Is
Freelance portfolio site for Aditya Ravindranath. Single-page site to attract freelance clients.
Live at: https://adityaravindranath.vercel.app

## Identity
- **Contact email**: adityaravindranath12@gmail.com
- **WhatsApp**: +919945622485
- **LinkedIn**: https://linkedin.com/in/adityar-analytics
- **GitHub**: https://github.com/AlnicoTech2
- **Vercel team**: aditya-rs-projects-65247c1b
- **Vercel project ID**: prj_XSvKwue2tHyoiKAHXLMUNP3hNF5a
- **Repo**: https://github.com/AlnicoTech2/portfolio (private)

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (PostCSS plugin approach — NOT the v3 config file pattern)
- Fonts: Inter (display/headlines), JetBrains Mono (labels/stats), Outfit (body) via next/font/google
- framer-motion for animations
- Deployed on Vercel — manual deploy with alias

## Commands
```bash
npm run dev      # Dev server (localhost:3000)
npx vercel --prod   # Deploy to Vercel
npx vercel alias set <deployment-url> adityaravindranath.vercel.app   # Point alias to latest deploy
```

## Structure
```
app/
  layout.tsx     # Root layout — metadata, fonts (Inter + JetBrains Mono + Outfit), globals.css
  page.tsx       # Entire site (single page, "use client")
  globals.css    # Global styles + Tailwind directive + CSS variables
  favicon.ico
public/          # Static assets
```

## Design System (UIX Labs-inspired)
- **Aesthetic**: Premium dark tech — pure black bg, mint/teal accent, bold geometric headlines, mono terminal labels
- **Color palette**:
  - `--black: #000000`
  - `--white: #ffffff`
  - `--accent: #3fffb1` (mint/teal — CTAs, accents)
  - `--yellow: #d6ff3b` (logo X mark, star highlights)
  - `--text-dim: #6b6b6b`, `--text-mid: #aaaaaa`
  - `--border: rgba(255,255,255,0.08)`
  - `--grid-line: rgba(255,255,255,0.035)` (vertical grid overlay)
- **Typography**:
  - Inter (display, weights 700-900) — bold headlines, negative letter-spacing
  - JetBrains Mono — small labels, stats, terminal-style `>` prefixes
  - Outfit — body paragraphs
- **Layout elements**:
  - Fixed vertical grid lines overlay (`<GridLines />`)
  - Rotating hero label with `AnimatePresence` (5 taglines)
  - CSS 3D cube composition in hero (`<Hero3D />`) — no three.js
  - Client-name marquee
  - Teal-bordered stat pills (outlined mono)
  - CTA section with `<StarField />` + `<RobotMascot />`
  - Mint CTA button (`.mint-btn`), ghost button (`.ghost-btn`)

## Key Rules
- This is a **single-page site**. Everything is in `app/page.tsx`. Do not split into components unless explicitly asked.
- Tailwind v4 syntax — `@import "tailwindcss"` in globals.css, NOT `@tailwind base/components/utilities`.
- No external UI libraries.
- No backend, no API routes, no database.
- Keep bundle minimal — no three.js / Spline / heavy 3D libs. All 3D is CSS/SVG/framer-motion.
- Dark theme only.
- **IMPORTANT**: After every deploy, re-point the alias: `npx vercel alias set <url> adityaravindranath.vercel.app`

## Content Sections (in page.tsx)
1. **Nav** — fixed, logo "AR ×" left, links (Work, Expertise, Pricing, About), Start a project mint CTA right
2. **Hero** — rotating mono label, massive 2-line headline "The Solo / Engineering Studio", Start a project CTA, 3D cube + glow orb composition right
3. **Client marquee** — infinite scroll of 12 clients (Alnico, Gumbo, Raaz, BeautyAI, GoodLooksAI, TarotAI, Astravoro, Matcho, Baatein, Lumii, Polimart, Gyanify)
4. **Stats pills** — Bootstrapped · 22+ Apps · 10+ Clients · 4-wk Delivery · 100% Ownership
5. **Case studies** — 3 detailed cases (Raaz, GoodLooksAI, Astravoro) with Problem/Architecture/Outcome + preview card with colored glow
6. **More apps** — 15 additional apps with Play Store links
7. **Expertise** — 6 categories in 3-col grid: Mobile, Web, Backend, AI Apps, Payments, Infra
8. **Testimonials** — 2 quotes: Rajan Bhagat (Alnico), Swatantra (Gumbo)
9. **Services** — 3 pricing cards: Product Launch ($10-25k+), Fractional Lead ($4-8k/mo), Deep Work Sprint ($3-7k)
10. **LET'S BUILD TOGETHER CTA** — massive headline (accent colored), copy email button, WhatsApp button, robot mascot, star field background
11. **Footer** — logo + name + social links (LinkedIn, GitHub, WhatsApp)

## Clients Featured
- **Alnico Tech** (Rajan Bhagat, Founder) — 10+ apps: Raaz, Matcho, Baatein, Bharat Poster suite, Islamic Quotes, Indian Poster, BeautyAI, GoodLooksAI, Tarot AI
- **Gumbo Tech** (Swatantra, Founder) — 7 apps: Polimart, Suvichar, Gyanify, Panchayat Poster, Suno Stories, English Guru, Business Banner

## Services Goal
Target: ₹3–5L/month total income (₹1L from job + freelance). Portfolio is live — next steps are LinkedIn overhaul + outreach.

## Deployment
Manual deploy (Vercel auto-deploy not wired to this repo):
```bash
npx vercel --prod
npx vercel alias set <deployment-url> adityaravindranath.vercel.app
```

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
- Fonts: Syne (display/headlines) + Outfit (body) via next/font/google
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
  layout.tsx     # Root layout — metadata, fonts (Syne + Outfit), globals.css
  page.tsx       # Entire site (single page, "use client")
  globals.css    # Global styles + Tailwind directives + CSS variables
  favicon.ico
public/          # Static assets
```

## Design
- **Aesthetic**: Editorial brutalist — warm gold accent, sharp geometry, generous whitespace
- **Color palette**: BG #060608, text #eae6e1 (warm off-white), accent #c9a96e (warm gold), dim #7a756f
- **Typography**: Syne (headlines — geometric, futuristic), Outfit (body — clean geometric sans)
- **Layout**: Sharp corners, grid lines as dividers, no rounded corners
- **Grain overlay**: Animated SVG noise texture for premium feel

## Key Rules
- This is a **single-page site**. Everything is in `app/page.tsx`. Do not split into components unless explicitly asked.
- Tailwind v4 syntax — uses `@import "tailwindcss"` in globals.css, NOT `@tailwind base/components/utilities`.
- No external UI libraries.
- No backend, no API routes, no database.
- Keep bundle minimal — no heavy dependencies.
- Dark theme only.
- **IMPORTANT**: After every deploy, re-point the alias: `npx vercel alias set <url> adityaravindranath.vercel.app`

## Content Sections (in page.tsx)
1. **Nav** — fixed, name left, links + Hire CTA right, mobile: just Hire button
2. **Hero** — massive Syne headline "I build apps. You ship faster.", availability badge, CTAs
3. **Stats bar** — 4-col: 19+ Apps shipped, 2 Clients served, 100% End-to-end, 0 Compromises
4. **Showcase grid** — 3x3 image grid from GoodLooksAI CloudFront CDN (backend-swappable)
5. **Tech marquee** — scrolling ticker of 20 technologies
6. **Process** — 4 steps: Discovery, Architecture, Build, Ship
7. **Featured work** — 3 detailed projects: Raaz, Lumii, Astravoro (editorial row layout)
8. **More apps** — 16 additional apps in compact grid (Alnico + Gumbo Tech), Play Store links
9. **Testimonials** — 2 full-width quotes: Rajan Bhagat (Alnico), Swatantra (Gumbo Tech)
10. **Services** — 3 pricing tiers with sharp-cornered cards:
    - MVP Build: ₹1.5L–₹4L, 2–4 weeks (Most popular)
    - Monthly Retainer: ₹25K–₹60K/mo
    - Feature Sprint: ₹30K–₹80K, 3–7 days
11. **Contact** — big headline + email copy button + WhatsApp
12. **Footer** — name + social links

## Image Grid (Showcase)
- Uses GoodLooksAI CloudFront: `https://d3k1yij1rdqtzo.cloudfront.net/templates/{templateId}.jpg`
- 9 images across 4 categories: Temple & God, Good Morning, Good Afternoon, Daily Vibe
- **To swap images**: change S3 file at `goodlooksai-images/templates/{templateId}.jpg` — no portfolio code change needed (backend change)
- Can also use BeautyAI CDN for beauty portraits: `https://dlxhzcf153by3.cloudfront.net/paywall/{0-8}.jpg`

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

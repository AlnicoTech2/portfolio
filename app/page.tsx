"use client";

import { useState } from "react";

const PROJECTS = [
  {
    number: "01",
    name: "Raaz",
    category: "Mobile App",
    headline: "A dating app built to scale — PostGIS discovery, real-time chat, subscription paywalls.",
    description:
      "Production-grade dating platform: location-based discovery via PostGIS, WhatsApp-style messaging with edit/delete/reply, gender-tiered subscription paywalls, Razorpay auto-pay with trial periods, FCM push notifications, full security audit before Play Store submission.",
    outcome: "Live on Play Store",
    tech: ["Flutter", "Riverpod", "Supabase", "PostGIS", "RevenueCat", "Razorpay", "FCM"],
    link: "",
  },
  {
    number: "02",
    name: "Lumii",
    category: "AI · Mobile",
    headline: "AI photo enhancement — CodeFormer face restoration at consumer scale.",
    description:
      "End-to-end AI photo app: image pick, compress, submit to Fal.ai, async job processing, before/after slider. Enhancement history, RevenueCat subscription paywall, Firebase Auth with Google Sign-In, Crashlytics, Supabase backend with auto-expiring storage.",
    outcome: "Production-ready",
    tech: ["Flutter", "Riverpod", "Fal.ai", "Supabase", "Firebase", "RevenueCat"],
    link: "",
  },
  {
    number: "03",
    name: "Astravoro",
    category: "Web · E-Commerce",
    headline: "Full e-commerce storefront — product catalogue to Razorpay checkout.",
    description:
      "Complete smart home e-commerce platform: dynamic product catalogue, category filtering, cart state, dual-gateway checkout (Razorpay + Stripe), order management in Supabase, comprehensive analytics schema. Deployed and live.",
    outcome: "Live on Vercel",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "Razorpay", "Stripe"],
    link: "https://astravoro.com",
  },
];

const MORE_APPS = [
  { name: "Matcho", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.macho.app" },
  { name: "Baatein", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.baatein" },
  { name: "Beauty AI", client: "Alnico", link: "" },
  { name: "Goodlooks AI", client: "Alnico", link: "" },
  { name: "Tarot AI", client: "Alnico", link: "https://play.google.com/store/apps/details?id=ai.onlineastrology.tarot" },
  { name: "Bharat Poster", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.alnico.sangathanposter" },
  { name: "Sangathan", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.alnico.sangathan.app" },
  { name: "Islamic Quotes", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.alnico.islamicquotes" },
  { name: "Indian Poster", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.indianposters.app" },
  { name: "Polimart", client: "Gumbo Tech", link: "https://play.google.com/store/apps/details?id=com.banner.polimart" },
  { name: "Suvichar", client: "Gumbo Tech", link: "https://play.google.com/store/apps/details?id=com.suvichar.photo" },
  { name: "Gyanify", client: "Gumbo Tech", link: "https://play.google.com/store/apps/details?id=com.gumbo.learning" },
  { name: "Panchayat Poster", client: "Gumbo Tech", link: "https://play.google.com/store/apps/details?id=com.panchayat.poster" },
  { name: "Suno Stories", client: "Gumbo Tech", link: "https://play.google.com/store/apps/details?id=com.sunostories.app" },
  { name: "English Guru", client: "Gumbo Tech", link: "https://play.google.com/store/apps/details?id=com.gumbo.english" },
  { name: "Business Banner", client: "Gumbo Tech", link: "https://play.google.com/store/apps/details?id=com.business.banner" },
];

const TECH = [
  "Flutter", "React Native", "Next.js", "Node.js", "TypeScript",
  "Supabase", "PostgreSQL", "PostGIS", "Firebase", "AWS",
  "Razorpay", "Stripe", "RevenueCat", "Fal.ai", "Vertex AI",
  "FCM", "DynamoDB", "S3", "CloudFront", "Cognito",
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("adityaravindranath12@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection { background: var(--accent); color: #000; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--text-muted); }

        section[id] { scroll-margin-top: 72px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        .anim-1 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-2 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-3 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .anim-4 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .anim-5 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both; }

        /* Grain overlay */
        .grain::before {
          content: '';
          position: fixed;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          animation: grain 8s steps(10) infinite;
          opacity: 0.4;
        }

        /* Nav */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(6,6,8,0.8); border-bottom: 1px solid var(--border); }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .nav-name { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; text-decoration: none; }
        .nav-links { display: flex; align-items: center; gap: 36px; }
        .nav-link { font-size: 13px; color: var(--text-dim); text-decoration: none; transition: color 0.2s; letter-spacing: 0.01em; }
        .nav-link:hover { color: var(--text); }
        .nav-cta { font-size: 12px; font-weight: 600; color: #060608; background: var(--accent); padding: 8px 20px; text-decoration: none; letter-spacing: 0.02em; text-transform: uppercase; transition: opacity 0.2s; }
        .nav-cta:hover { opacity: 0.85; }
        .nav-mobile-cta { display: none; }

        /* Hero */
        .hero { max-width: 1200px; margin: 0 auto; padding: 180px 48px 100px; }
        .hero-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 48px; display: flex; align-items: center; gap: 12px; }
        .hero-dot { width: 6px; height: 6px; background: var(--accent); animation: breathe 2.5s ease-in-out infinite; }
        .hero h1 { font-family: var(--font-display); font-size: clamp(56px, 8vw, 112px); font-weight: 800; line-height: 0.92; letter-spacing: -0.04em; color: var(--text); margin-bottom: 40px; max-width: 900px; }
        .hero h1 em { font-style: italic; color: var(--accent); }
        .hero-sub { font-size: 18px; color: var(--text-dim); line-height: 1.7; max-width: 480px; margin-bottom: 56px; }
        .hero-ctas { display: flex; gap: 16px; align-items: center; }
        .btn-primary { background: var(--text); color: var(--bg); font-family: var(--font-body); font-size: 13px; font-weight: 600; padding: 14px 32px; border: none; text-decoration: none; letter-spacing: 0.01em; cursor: pointer; transition: opacity 0.2s; display: inline-block; }
        .btn-primary:hover { opacity: 0.85; }
        .btn-ghost { color: var(--text-dim); font-size: 13px; text-decoration: none; padding: 14px 0; border-bottom: 1px solid var(--border-strong); transition: color 0.2s, border-color 0.2s; display: inline-block; }
        .btn-ghost:hover { color: var(--text); border-color: var(--text); }

        /* Stats bar */
        .stats-bar { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        .stats-inner { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .stat { padding: 32px 0; border-right: 1px solid var(--border); text-align: center; }
        .stat:last-child { border-right: none; }
        .stat-num { font-family: var(--font-display); font-size: 42px; font-weight: 800; letter-spacing: -0.04em; color: var(--text); line-height: 1; }
        .stat-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-top: 8px; }

        /* Showcase grid */
        .showcase { max-width: 1200px; margin: 0 auto; padding: 80px 48px; }
        .showcase-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 32px; text-align: center; }
        .showcase-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; overflow: hidden; }
        .showcase-cell { position: relative; aspect-ratio: 3/4; overflow: hidden; }
        .showcase-cell img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%) brightness(0.85); transition: filter 0.4s, transform 0.4s; }
        .showcase-cell:hover img { filter: grayscale(0%) brightness(1); transform: scale(1.04); }
        .showcase-cell .showcase-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(6,6,8,0.85) 0%, transparent 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; opacity: 0; transition: opacity 0.3s; }
        .showcase-cell:hover .showcase-overlay { opacity: 1; }
        .showcase-overlay-tag { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; }
        .showcase-overlay-name { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text); }

        @media (max-width: 768px) {
          .showcase { padding: 56px 24px; }
          .showcase-cell .showcase-overlay { opacity: 1; }
        }

        /* Tech marquee */
        .marquee-wrap { border-bottom: 1px solid var(--border); padding: 20px 0; overflow: hidden; }
        .marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-item { padding: 0 28px; font-size: 11px; color: var(--text-muted); letter-spacing: 0.14em; text-transform: uppercase; white-space: nowrap; display: flex; align-items: center; gap: 28px; }
        .marquee-dot { width: 3px; height: 3px; background: var(--text-muted); opacity: 0.4; }

        /* Section shared */
        .section { max-width: 1200px; margin: 0 auto; padding: 120px 48px; }
        .section-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
        .section-title { font-family: var(--font-display); font-size: clamp(36px, 5vw, 52px); font-weight: 800; letter-spacing: -0.035em; color: var(--text); margin-bottom: 24px; }
        .section-desc { font-size: 15px; color: var(--text-dim); line-height: 1.7; max-width: 440px; margin-bottom: 64px; }
        .divider { border: none; border-top: 1px solid var(--border); margin: 0; }

        /* Process */
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); }
        .process-step { background: var(--bg); padding: 40px 32px; }
        .process-num { font-family: var(--font-display); font-size: 48px; font-weight: 800; color: var(--accent-dim); letter-spacing: -0.04em; line-height: 1; margin-bottom: 24px; }
        .process-name { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; margin-bottom: 12px; }
        .process-desc { font-size: 13px; color: var(--text-dim); line-height: 1.75; }

        /* Projects */
        .project { border-bottom: 1px solid var(--border); padding: 64px 0; display: grid; grid-template-columns: 80px 1fr; gap: 48px; align-items: start; transition: background 0.3s; }
        .project:first-child { border-top: 1px solid var(--border); }
        .project:hover { background: var(--surface); }
        .project-num { font-family: var(--font-display); font-size: 64px; font-weight: 800; color: rgba(201,169,110,0.12); letter-spacing: -0.04em; line-height: 1; }
        .project-category { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
        .project-name { font-family: var(--font-display); font-size: 32px; font-weight: 800; letter-spacing: -0.03em; color: var(--text); margin-bottom: 12px; }
        .project-headline { font-size: 16px; color: var(--text-dim); line-height: 1.6; margin-bottom: 20px; max-width: 640px; }
        .project-detail { font-size: 14px; color: var(--text-muted); line-height: 1.8; max-width: 640px; margin-bottom: 24px; }
        .tech-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .tech-tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); border: 1px solid var(--border); padding: 4px 10px; }
        .project-link { font-size: 12px; font-weight: 600; color: var(--accent); text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase; transition: opacity 0.2s; }
        .project-link:hover { opacity: 0.7; }
        .project-outcome { display: inline-block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); border: 1px solid var(--border-strong); padding: 4px 12px; margin-bottom: 16px; }

        /* More apps */
        .apps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); margin-top: 48px; }
        .app-cell { background: var(--bg); padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s; }
        .app-cell:hover { background: var(--surface); }
        .app-name { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .app-client { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
        .app-link { font-size: 10px; color: var(--accent); text-decoration: none; opacity: 0; transition: opacity 0.2s; }
        .app-cell:hover .app-link { opacity: 1; }

        /* Testimonials */
        .testimonial { border-bottom: 1px solid var(--border); padding: 80px 0; }
        .testimonial:first-child { border-top: 1px solid var(--border); }
        .testimonial-quote { font-family: var(--font-display); font-size: clamp(22px, 3vw, 32px); font-weight: 700; color: var(--text); line-height: 1.5; letter-spacing: -0.02em; margin-bottom: 36px; max-width: 800px; }
        .testimonial-author { font-size: 14px; font-weight: 600; color: var(--text); }
        .testimonial-role { font-size: 13px; color: var(--text-dim); margin-top: 2px; }
        .testimonial-stars { color: var(--accent); font-size: 14px; letter-spacing: 2px; margin-bottom: 28px; }

        /* Services */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); }
        .service { background: var(--bg); padding: 48px 36px; display: flex; flex-direction: column; position: relative; transition: background 0.3s; }
        .service:hover { background: var(--surface); }
        .service-popular { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent); }
        .service-badge { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 24px; }
        .service-duration { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 20px; }
        .service-name { font-family: var(--font-display); font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: var(--text); margin-bottom: 8px; }
        .service-price { font-family: var(--font-display); font-size: 32px; font-weight: 800; letter-spacing: -0.03em; color: var(--text); margin-bottom: 24px; }
        .service-desc { font-size: 13px; color: var(--text-dim); line-height: 1.75; margin-bottom: 32px; }
        .service-items { list-style: none; display: flex; flex-direction: column; gap: 14px; flex: 1; }
        .service-item { font-size: 13px; color: var(--text-dim); display: flex; gap: 12px; align-items: flex-start; }
        .service-check { color: var(--accent); font-size: 10px; margin-top: 3px; flex-shrink: 0; }
        .service-cta { margin-top: 36px; display: block; text-align: center; padding: 14px 0; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none; transition: opacity 0.2s; cursor: pointer; }
        .service-cta-primary { background: var(--accent); color: #060608; }
        .service-cta-secondary { background: transparent; border: 1px solid var(--border-strong); color: var(--text-dim); }
        .service-cta:hover { opacity: 0.8; }

        /* Contact */
        .contact { max-width: 1200px; margin: 0 auto; padding: 140px 48px; text-align: center; }
        .contact h2 { font-family: var(--font-display); font-size: clamp(48px, 7vw, 84px); font-weight: 800; letter-spacing: -0.04em; color: var(--text); line-height: 0.95; margin-bottom: 28px; }
        .contact h2 em { font-style: italic; color: var(--accent); }
        .contact-sub { font-size: 16px; color: var(--text-dim); max-width: 400px; margin: 0 auto 52px; line-height: 1.7; }
        .contact-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

        /* Footer */
        .footer { border-top: 1px solid var(--border); padding: 28px 48px; }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .footer-left { font-size: 12px; color: var(--text-muted); }
        .footer-links { display: flex; gap: 28px; }
        .footer-link { font-size: 12px; color: var(--text-dim); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: var(--text); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr; }
          .process-grid { grid-template-columns: 1fr 1fr; }
          .apps-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .nav-inner { padding: 0 24px; }
          .nav-links { display: none; }
          .nav-mobile-cta { display: block; }

          .hero { padding: 120px 24px 72px; }
          .hero-ctas { flex-direction: column; align-items: stretch; }
          .hero-ctas .btn-ghost { text-align: center; }
          .hero-whatsapp { display: none; }

          .stats-inner { grid-template-columns: 1fr 1fr; }
          .stat { border-bottom: 1px solid var(--border); }

          .section { padding: 80px 24px; }

          .process-grid { grid-template-columns: 1fr; }

          .project { grid-template-columns: 1fr; gap: 0; padding: 48px 0; }
          .project-num { font-size: 40px; margin-bottom: 16px; }

          .apps-grid { grid-template-columns: 1fr 1fr; }
          .app-link { opacity: 1; }

          .testimonial { padding: 56px 0; }
          .testimonial-quote { font-size: 20px; }

          .services-grid { grid-template-columns: 1fr; }

          .contact { padding: 80px 24px; }
          .contact-btns { flex-direction: column; align-items: stretch; }

          .footer { padding: 24px; }
          .stats-bar { padding: 0 24px; }
        }
      `}</style>

      <div className="grain">
        {/* ── NAV ── */}
        <nav className="nav">
          <div className="nav-inner">
            <a href="#" className="nav-name">Aditya R.</a>
            <div className="nav-links">
              <a href="#work" className="nav-link">Work</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="https://linkedin.com/in/adityar-analytics" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
              <a href="https://github.com/AlnicoTech2" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
              <a href="#contact" className="nav-cta">Hire me</a>
            </div>
            <a href="#contact" className="nav-cta nav-mobile-cta">Hire me</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="anim-1 hero-label">
            <span className="hero-dot" />
            Available for projects — Bangalore, India
          </div>

          <h1 className="anim-2">
            I build apps.<br />
            <em>You ship faster.</em>
          </h1>

          <p className="anim-3 hero-sub">
            Full-stack mobile and web development, end-to-end.
            AI-accelerated delivery. No hand-holding. Working software, shipped in weeks.
          </p>

          <div className="anim-4 hero-ctas">
            <a href="#work" className="btn-primary">View my work</a>
            <a href="#contact" className="btn-ghost">Start a project</a>
            <a href="https://wa.me/919945622485" target="_blank" rel="noopener noreferrer" className="btn-ghost hero-whatsapp">WhatsApp</a>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="anim-5 stats-bar">
          <div className="stats-inner">
            {[
              { num: "19+", label: "Apps shipped" },
              { num: "2", label: "Clients served" },
              { num: "100%", label: "End-to-end" },
              { num: "0", label: "Compromises" },
            ].map(s => (
              <div key={s.label} className="stat">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SHOWCASE GRID ── */}
        <div className="showcase">
          <div className="showcase-label">What I build looks like this</div>
          <div className="showcase-grid">
            {[
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/kedarnath_devotee.jpg", tag: "Temple & God", name: "Kedarnath" },
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/morning_prayer.jpg", tag: "Good Morning", name: "Morning Prayer" },
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/bike_lifestyle.jpg", tag: "Daily Vibe", name: "Bike Lifestyle" },
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/shiva_meditation.jpg", tag: "Temple & God", name: "Shiva Meditation" },
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/terrace_garden.jpg", tag: "Good Morning", name: "Terrace Garden" },
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/afternoon_relax.jpg", tag: "Good Afternoon", name: "Afternoon Relax" },
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/krishna_devotional.jpg", tag: "Temple & God", name: "Krishna Devotional" },
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/train_window.jpg", tag: "Daily Vibe", name: "Train Window" },
              { src: "https://d3k1yij1rdqtzo.cloudfront.net/templates/metro_ride.jpg", tag: "Daily Vibe", name: "Metro Ride" },
            ].map((item, i) => (
              <div key={i} className="showcase-cell">
                <img src={item.src} alt={item.name} loading={i < 3 ? "eager" : "lazy"} />
                <div className="showcase-overlay">
                  <span className="showcase-overlay-tag">{item.tag}</span>
                  <span className="showcase-overlay-name">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TECH MARQUEE ── */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...TECH, ...TECH].map((t, i) => (
              <span key={i} className="marquee-item">
                {t}
                <span className="marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ── PROCESS ── */}
        <div className="section">
          <div className="section-label">How it works</div>
          <div className="section-title">From idea to live.</div>
          <div className="section-desc">
            A structured process. You stay in control. Nothing slows down.
          </div>
          <div className="process-grid">
            {[
              { n: "01", name: "Discovery", desc: "We align on scope, stack, timeline, and success metrics. No ambiguity before a line of code is written." },
              { n: "02", name: "Architecture", desc: "I design the full system — database schema, API contracts, auth flow, infra. You review before we build." },
              { n: "03", name: "Build", desc: "AI-accelerated development with daily async updates. You see real progress, not status reports." },
              { n: "04", name: "Ship", desc: "Deploy, app store submission, domain setup, monitoring. Live product with zero handover friction." },
            ].map(p => (
              <div key={p.n} className="process-step">
                <div className="process-num">{p.n}</div>
                <div className="process-name">{p.name}</div>
                <div className="process-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* ── WORK ── */}
        <section id="work" className="section">
          <div className="section-label">Selected work</div>
          <div className="section-title">Things I&apos;ve built.</div>
          <div className="section-desc">
            Every project is production-grade. No MVPs abandoned at 80%.
          </div>

          {PROJECTS.map(p => (
            <div key={p.name} className="project">
              <div className="project-num">{p.number}</div>
              <div>
                <div className="project-category">{p.category}</div>
                <div className="project-outcome">{p.outcome}</div>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-headline">{p.headline}</p>
                <p className="project-detail">{p.description}</p>
                <div className="tech-row">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">View live &#8599;</a>}
              </div>
            </div>
          ))}

          {/* More apps */}
          <div style={{ marginTop: 80 }}>
            <div className="section-label">More apps shipped</div>
            <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 8 }}>
              16 additional production apps across two clients.
            </p>
            <div className="apps-grid">
              {MORE_APPS.map(app => (
                <div key={app.name} className="app-cell">
                  <div>
                    <div className="app-name">{app.name}</div>
                    <div className="app-client">{app.client}</div>
                  </div>
                  {app.link ? (
                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="app-link">Play Store &#8599;</a>
                  ) : (
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Soon</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ── TESTIMONIALS ── */}
        <section className="section">
          <div className="section-label">Client feedback</div>
          <div className="section-title">What founders say.</div>

          {[
            {
              quote: "Aditya has built and shipped 10+ production apps for us — dating, AI, astrology, poster tools — all with subscription paywalls, Play Store live. He owns the full stack and just delivers. No chasing, no excuses.",
              name: "Rajan Bhagat",
              role: "Founder, Alnico Tech",
            },
            {
              quote: "We needed subscription-based Flutter apps on the Play Store, done properly. Aditya handled everything — architecture, payments, store submission. Clean code, fast delivery. We keep coming back.",
              name: "Swatantra",
              role: "Founder, Gumbo Tech",
            },
          ].map(t => (
            <div key={t.name} className="testimonial">
              <div className="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <blockquote className="testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="testimonial-author">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          ))}
        </section>

        <hr className="divider" />

        {/* ── SERVICES ── */}
        <section id="services" className="section" style={{ paddingBottom: 0 }}>
          <div className="section-label">Services</div>
          <div className="section-title">How we work together.</div>
          <div className="section-desc">
            For founders who need someone to own the whole build — not just a single layer.
          </div>

          <div className="services-grid">
            {[
              {
                name: "MVP Build",
                price: "₹1.5L – ₹4L",
                duration: "2–4 weeks",
                desc: "Zero to live. I own every layer — frontend, backend, payments, deployment. You get a real product, not a prototype.",
                items: ["Mobile app (Flutter / React Native)", "Web app or landing site", "Backend + database architecture", "Payment & subscription flows", "Play Store / App Store submission"],
                popular: true,
              },
              {
                name: "Monthly Retainer",
                price: "₹25K – ₹60K/mo",
                duration: "Ongoing",
                desc: "Your technical co-founder. I ship features, kill bugs, and keep your product moving — every month.",
                items: ["Dedicated development time", "New features on demand", "Bug fixes & performance", "Architecture decisions", "Priority async communication"],
                popular: false,
              },
              {
                name: "Feature Sprint",
                price: "₹30K – ₹80K",
                duration: "3–7 days",
                desc: "One focused feature, done properly. AI integration, payment flows, auth — integrated cleanly into your codebase.",
                items: ["AI & ML feature integration", "Payment / subscription flows", "Push notification systems", "Maps & real-time features", "Auth & user management"],
                popular: false,
              },
            ].map(s => (
              <div key={s.name} className="service">
                {s.popular && <div className="service-popular" />}
                {s.popular && <div className="service-badge">Most popular</div>}
                <div className="service-duration">{s.duration}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-price">{s.price}</div>
                <p className="service-desc">{s.desc}</p>
                <ul className="service-items">
                  {s.items.map(item => (
                    <li key={item} className="service-item">
                      <span className="service-check">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`service-cta ${s.popular ? "service-cta-primary" : "service-cta-secondary"}`}>
                  Start a project &#8594;
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="contact">
          <div className="section-label" style={{ justifyContent: "center" }}>Get in touch</div>
          <h2>
            Have an idea?<br />
            <em>Let&apos;s build it.</em>
          </h2>
          <p className="contact-sub">
            Currently available. Tell me what you&apos;re building and I&apos;ll tell you how I can help.
          </p>
          <div className="contact-btns">
            <button onClick={copyEmail} className="btn-primary" style={{
              background: copied ? "var(--accent)" : "var(--text)",
              transition: "background 0.25s",
              fontFamily: "var(--font-body)",
            }}>
              {copied ? "Copied to clipboard" : "adityaravindranath12@gmail.com"}
            </button>
            <a href="https://wa.me/919945622485" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              WhatsApp
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <span className="footer-left">Aditya R. — Full-Stack Developer — Bangalore, India</span>
            <div className="footer-links">
              <a href="https://linkedin.com/in/adityar-analytics" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
              <a href="https://github.com/AlnicoTech2" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
              <a href="https://wa.me/919945622485" target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

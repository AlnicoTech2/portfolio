"use client";

import { useState, useEffect, useRef, useCallback, type MouseEvent as RE } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const CASES = [
  {
    name: "Raaz",
    problem: "A founder needed a dating app on the Play Store in weeks — location matching, real-time chat, subscription payments. Agencies quoted 6 months and $60k.",
    architecture: "PostGIS geospatial discovery with progressive-radius matching. Supabase Realtime for full chat with typing indicators and read receipts. HMAC-verified Razorpay webhooks with replay protection.",
    outcome: "Shipped to Play Store in under 4 weeks. 32 database tables, 6 edge functions, 55+ backend-controlled config keys — zero app rebuilds needed for pricing or feature changes.",
    tech: ["Flutter", "Supabase", "PostGIS", "Razorpay"],
  },
  {
    name: "GoodLooksAI",
    problem: "An AI portrait product was chaining multiple models but latency was killing the user experience. Downloading images between stages was the bottleneck.",
    architecture: "Built a Hot-Chain pipeline — chaining fal.ai media URLs directly between AI stages (InstantID face swap then LoRA styling) without any intermediate downloads. Migrated generation to Gemini 3 Pro.",
    outcome: "Play Store live. Admin panel (92K lines of TypeScript) shipped in a single day. Image delivery via CloudFront CDN at global edge.",
    tech: ["React Native", "Fal.ai", "Gemini 3", "DynamoDB"],
  },
  {
    name: "Astravoro",
    problem: "A smart home brand needed a complete e-commerce store for both US and Indian buyers — with a two-week hard deadline and zero existing infrastructure.",
    architecture: "Next.js 16 with server-rendered product pages, Zustand cart, dual payment gateway (Stripe for USD, Razorpay for INR), Supabase backend with full order management.",
    outcome: "Live at astravoro.com. 20 products across 5 categories. Dual-market checkout. Shipped in 14 days from first commit to production.",
    tech: ["Next.js", "Supabase", "Stripe", "Razorpay"],
    link: "https://astravoro.com",
  },
];

const MORE_APPS = [
  { name: "BeautyAI", cat: "AI", client: "Alnico", link: "" },
  { name: "TarotAI", cat: "AI", client: "Alnico", link: "https://play.google.com/store/apps/details?id=ai.onlineastrology.tarot" },
  { name: "Matcho", cat: "Dating", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.macho.app" },
  { name: "Baatein", cat: "Social", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.baatein" },
  { name: "Bharat Poster", cat: "Creative", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.alnico.sangathanposter" },
  { name: "Sangathan", cat: "Creative", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.alnico.sangathan.app" },
  { name: "Islamic Quotes", cat: "Creative", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.alnico.islamicquotes" },
  { name: "Indian Poster", cat: "Creative", client: "Alnico", link: "https://play.google.com/store/apps/details?id=com.indianposters.app" },
  { name: "Polimart", cat: "Creative", client: "Gumbo", link: "https://play.google.com/store/apps/details?id=com.banner.polimart" },
  { name: "Suvichar", cat: "Creative", client: "Gumbo", link: "https://play.google.com/store/apps/details?id=com.suvichar.photo" },
  { name: "Gyanify", cat: "Education", client: "Gumbo", link: "https://play.google.com/store/apps/details?id=com.gumbo.learning" },
  { name: "Panchayat Poster", cat: "Creative", client: "Gumbo", link: "https://play.google.com/store/apps/details?id=com.panchayat.poster" },
  { name: "Suno Stories", cat: "Kids", client: "Gumbo", link: "https://play.google.com/store/apps/details?id=com.sunostories.app" },
  { name: "English Guru", cat: "Education", client: "Gumbo", link: "https://play.google.com/store/apps/details?id=com.gumbo.english" },
  { name: "Business Banner", cat: "Creative", client: "Gumbo", link: "https://play.google.com/store/apps/details?id=com.business.banner" },
];

const MARQUEE = ["Flutter", "React Native", "Next.js", "TypeScript", "Supabase", "PostgreSQL", "PostGIS", "Firebase", "AWS", "Razorpay", "Stripe", "RevenueCat", "Fal.ai", "Vertex AI", "DynamoDB", "CloudFront", "Cognito", "FCM"];

/* ═══ HOOKS ═══ */

function useCounter(end: number, dur = 1800) {
  const [v, setV] = useState(0);
  const [go, setGo] = useState(false);
  const start = useCallback(() => setGo(true), []);
  useEffect(() => {
    if (!go) return;
    let c = 0; const s = 50;
    const iv = setInterval(() => { c += end / s; if (c >= end) { setV(end); clearInterval(iv); } else setV(Math.floor(c)); }, dur / s);
    return () => clearInterval(iv);
  }, [go, end, dur]);
  return { v, start };
}

/* ═══ ANIM ═══ */

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease } }) };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

/* ═══ COMPONENTS ═══ */

function MagneticButton({ children, href, style: s, className, onClick }: { children: React.ReactNode; href?: string; style?: React.CSSProperties; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  function handleMove(e: RE<HTMLAnchorElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.15);
    y.set((e.clientY - r.top - r.height / 2) * 0.15);
  }
  function handleLeave() { x.set(0); y.set(0); }
  return <motion.a ref={ref} href={href} onClick={onClick} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ x: sx, y: sy, ...s }} className={className}>{children}</motion.a>;
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span style={{ display: "inline" }}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
          <motion.span style={{ display: "inline-block" }}
            initial={{ y: "110%" }} animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.04, ease }}>{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

function BentoCard({ children, style: s, className, span2 }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; span2?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  function handleMove(e: RE<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  }

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className={className} style={{
        position: "relative", overflow: "hidden", borderRadius: 20,
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        transition: "border-color 0.3s",
        ...(hovered ? { borderColor: "rgba(255,255,255,0.12)" } : {}),
        ...s,
      }}>
      <motion.div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 60%)`
        ),
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ═══ SHORTHAND ═══ */

const D = "var(--font-display)";
const B = "var(--font-body)";

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function Home() {
  const [copied, setCopied] = useState(false);
  const statsRef = useRef(null);
  const statsVis = useInView(statsRef, { once: true, amount: 0.3 });
  const c1 = useCounter(22);
  useEffect(() => { if (statsVis) c1.start(); }, [statsVis, c1]);
  const { scrollYProgress } = useScroll();
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  function copyEmail() {
    navigator.clipboard.writeText("adityaravindranath12@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <>
      <style>{`
        ::selection{background:#fff;color:#000}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-track{background:#000}
        ::-webkit-scrollbar-thumb{background:#333}
        section[id]{scroll-margin-top:64px}

        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .aurora{position:absolute;pointer-events:none;width:140%;height:600px;left:-20%;
          background:radial-gradient(ellipse at 25% 50%,rgba(99,70,255,0.12) 0%,transparent 50%),
                     radial-gradient(ellipse at 75% 30%,rgba(0,190,255,0.08) 0%,transparent 50%),
                     radial-gradient(ellipse at 50% 70%,rgba(255,80,150,0.06) 0%,transparent 50%);
          filter:blur(60px);background-size:200% 200%;animation:aurora-shift 20s ease infinite}

        .marquee-track{display:flex;width:max-content;animation:marquee 45s linear infinite}
        .marquee-track:hover{animation-play-state:paused}

        .glass{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transition:background .3s,border-color .3s}
        .glass:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.15)}

        .pill{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 32px;border-radius:100px;font-family:var(--font-body);font-size:13px;font-weight:600;letter-spacing:0.02em;text-decoration:none;cursor:pointer;transition:all .25s;border:none}
        .pill-white{background:#fff;color:#000}
        .pill-white:hover{background:#e0e0e0;transform:scale(1.02)}
        .pill-ghost{background:transparent;border:1px solid rgba(255,255,255,0.15);color:#aaa}
        .pill-ghost:hover{border-color:#fff;color:#fff;transform:scale(1.02)}

        .case-block{border-bottom:1px solid rgba(255,255,255,0.08);padding:64px 0;position:relative;transition:background .4s}
        .case-block:hover{background:rgba(255,255,255,0.01)}

        .compare-row{display:grid;grid-template-columns:1fr 1fr;gap:0}
        .compare-col{padding:40px 36px}

        .app-line{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.08);transition:padding-left .25s}
        .app-line:hover{padding-left:12px}

        .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .svc-card{padding:48px 36px;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(12px);display:flex;flex-direction:column;position:relative;border-radius:20px;transition:border-color .3s,background .3s}
        .svc-card:hover{border-color:rgba(255,255,255,0.15);background:rgba(255,255,255,0.04)}

        .faq-item{border-bottom:1px solid rgba(255,255,255,0.08);padding:32px 0}

        @media(max-width:900px){
          .svc-grid{grid-template-columns:1fr!important}
          .compare-row{grid-template-columns:1fr!important}
          .compare-col:first-child{border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.08)!important}
          .bento-grid{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important}
          .bento-grid>*{grid-column:span 1!important;grid-row:span 1!important}
          .bento-hero{grid-column:span 2!important}
        }
        @media(max-width:768px){
          .nav-links{display:none!important}
          .nav-hire{display:flex!important}
          .nav-inner{padding:0 20px!important}
          .hero-pad{padding:120px 20px 60px!important;min-height:auto!important}
          .hero-ctas{flex-direction:column!important}
          .hero-ctas a{width:100%!important;text-align:center!important;justify-content:center!important}
          .hero-sub{font-size:15px!important;max-width:100%!important}
          .bento-grid{grid-template-columns:1fr!important}
          .bento-hero{grid-column:span 1!important;padding:32px 24px!important}
          .bento-hero-num{font-size:48px!important}
          .bento-step{padding:24px 20px!important}
          .mini-stats{grid-template-columns:1fr!important}
          .mini-stat{padding:20px!important}
          .sec-pad{padding:64px 20px!important}
          .sec-header{flex-direction:column!important;gap:12px!important}
          .sec-header h2{font-size:32px!important}
          .sec-header p{text-align:left!important;max-width:100%!important}
          .compare-row{grid-template-columns:1fr!important}
          .compare-col{padding:28px 0!important}
          .compare-col:first-child{border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.08)!important}
          .case-block{padding:40px 0!important}
          .case-inner{grid-template-columns:1fr!important}
          .case-left,.case-right{padding:0!important}
          .case-mockup{display:none!important}
          .svc-grid{grid-template-columns:1fr!important;gap:12px!important}
          .svc-card{padding:32px 24px!important}
          .quote-grid{grid-template-columns:1fr!important}
          .quote-card{padding:32px 24px!important}
          .contact-pad{padding:64px 20px!important}
          .contact-head{font-size:clamp(32px,8vw,48px)!important}
          .contact-btns{flex-direction:column!important}
          .contact-btns a,.contact-btns button{width:100%!important;text-align:center!important;justify-content:center!important}
          .footer-inner{flex-direction:column!important;gap:12px!important;text-align:center!important}
          .app-line{flex-wrap:wrap!important;gap:4px!important}
          .faq-item{padding:24px 0!important}
        }
      `}</style>

      <main style={{ position: "relative" }}>

        {/* ═══ NAV ═══ */}
        <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
          <div className="nav-inner" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="#" style={{ fontFamily: D, fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", textDecoration: "none" }}>
              ADITYA R<span style={{ color: "#555" }}>.</span>
            </a>
            <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {["Work", "Services", "Contact"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: B, fontSize: 13, color: "#666", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#666")}>{l}</a>
              ))}
              <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.1)" }} />
              {[{ l: "Li", h: "https://linkedin.com/in/adityar-analytics" }, { l: "Gh", h: "https://github.com/AlnicoTech2" }].map(s => (
                <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" style={{ fontFamily: B, fontSize: 12, color: "#444", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#aaa")} onMouseLeave={e => (e.currentTarget.style.color = "#444")}>{s.l}</a>
              ))}
              <a href="#contact" className="pill pill-white" style={{ padding: "8px 20px", fontSize: 12 }}>Start a project</a>
            </div>
            <a href="#contact" className="nav-hire pill pill-white" style={{ padding: "8px 20px", fontSize: 12, display: "none" }}>Start a project</a>
          </div>
        </motion.nav>

        {/* ═══ 1. ANTI-RESUME HERO ═══ */}
        <section className="hero-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "200px 40px 140px", position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div className="aurora" style={{ top: -200, y: auroraY }} />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "6px 16px 6px 12px", marginBottom: 56, alignSelf: "flex-start" }}>
            <motion.span animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 12px rgba(0,255,136,0.5)", display: "inline-block" }} />
            <span style={{ fontFamily: B, fontSize: 12, color: "#aaa" }}>Accepting new projects</span>
          </motion.div>

          <h1 style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(44px, 7.5vw, 100px)", letterSpacing: "-0.05em", lineHeight: 0.95, color: "#fff", marginBottom: 16, maxWidth: 900 }}>
            <WordReveal text="You don't need a dev team." />
          </h1>
          <h1 style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(44px, 7.5vw, 100px)", letterSpacing: "-0.05em", lineHeight: 0.95, color: "#555", marginBottom: 48 }}>
            <WordReveal text="You need a technical partner." delay={0.3} />
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
            className="hero-sub" style={{ fontFamily: B, fontSize: 17, color: "#666", lineHeight: 1.85, maxWidth: 540, marginBottom: 48 }}>
            I architect, build, and scale production-grade mobile and web apps for funded founders. From raw idea to revenue in 4 weeks. No agencies. No hand-holding. Just shipped software.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}
            className="hero-ctas" style={{ display: "flex", gap: 14 }}>
            <MagneticButton href="#work" className="pill pill-white" style={{ padding: "16px 36px" }}>See the proof</MagneticButton>
            <MagneticButton href="#contact" className="pill pill-ghost" style={{ padding: "16px 36px" }}>Start a project</MagneticButton>
          </motion.div>
        </section>

        {/* ═══ 2. PROOF METRICS ═══ */}
        <div ref={statsRef} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="bento-grid" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "180px 180px", gap: 16, padding: "16px 40px" }}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={statsVis ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6 }}
              style={{ gridColumn: "span 2", gridRow: "span 2" }} className="bento-hero">
              <BentoCard style={{ padding: 48, height: "100%" }}>
                <div className="aurora" style={{ top: -100, opacity: 0.6 }} />
                <p style={{ fontFamily: B, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", position: "relative" }}>Proof of execution</p>
                <div style={{ position: "relative" }}>
                  <p className="bento-hero-num" style={{ fontFamily: D, fontSize: 72, fontWeight: 800, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1 }}>{c1.v}+</p>
                  <p style={{ fontFamily: B, fontSize: 15, color: "#666", marginTop: 8 }}>Production apps shipped to market</p>
                </div>
              </BentoCard>
            </motion.div>
            {[
              { n: "4", u: "weeks", l: "Idea to live product" },
              { n: "0", u: "", l: "Projects abandoned" },
              { n: "100", u: "%", l: "End-to-end ownership" },
              { n: "24/7", u: "", l: "Async communication" },
            ].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={statsVis ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="bento-step">
                <BentoCard style={{ padding: "28px 24px", height: "100%" }}>
                  <p style={{ fontFamily: D, fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>{s.n}<span style={{ color: "#555" }}>{s.u}</span></p>
                  <p style={{ fontFamily: B, fontSize: 12, color: "#555", lineHeight: 1.5 }}>{s.l}</p>
                </BentoCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ 3. MANIFESTO — ME VS AGENCIES ═══ */}
        <section className="sec-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 40px" }}>
          <SH label="Why me" title={"The agency model is broken."} sub="You're paying for project managers, bloated teams, and 6-month timelines. I'm the alternative." />
          <div className="compare-row" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <motion.div className="compare-col" style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <motion.p variants={staggerItem} style={{ fontFamily: B, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#444", marginBottom: 28 }}>Traditional agency</motion.p>
              {["6 month timeline", "$40\u2013$80k minimum", "You talk to a project manager", "Bloated team, diluted ownership", "Endless scope creep and change orders"].map(item => (
                <motion.div key={item} variants={staggerItem} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <span style={{ color: "#333", fontSize: 14, flexShrink: 0, marginTop: 1 }}>&times;</span>
                  <span style={{ fontFamily: B, fontSize: 14, color: "#555", lineHeight: 1.6 }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="compare-col"
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <motion.p variants={staggerItem} style={{ fontFamily: B, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: 28 }}>Working with me</motion.p>
              {["4 weeks to live product", "Clear, predictable pricing", "You speak directly to the engineer", "One person, total ownership", "Scope locked before code starts"].map(item => (
                <motion.div key={item} variants={staggerItem} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <span style={{ color: "#fff", fontSize: 12, flexShrink: 0, marginTop: 2 }}>&#10003;</span>
                  <span style={{ fontFamily: B, fontSize: 14, color: "#aaa", lineHeight: 1.6 }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ MARQUEE ═══ */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "14px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} style={{ padding: "0 36px", fontSize: 11, color: "#333", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: B, display: "flex", alignItems: "center", gap: 36, whiteSpace: "nowrap" }}>
                {t}<span style={{ width: 3, height: 3, borderRadius: "50%", background: "#333", display: "inline-block" }} />
              </span>
            ))}
          </div>
        </div>

        {/* ═══ 4. BUSINESS CASES ═══ */}
        <section id="work" className="sec-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 40px" }}>
          <SH label="Business cases" title={"The proof is in the shipped product."} sub="Not screenshots. Not mockups. Businesses generating real revenue." />

          {CASES.map((cs, ci) => (
            <motion.div key={cs.name} className="case-block" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: ci * 0.08, duration: 0.6 }}>
              <div className="case-inner" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 48 }}>
                <div className="case-left">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <h3 style={{ fontFamily: B, fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em", color: "#fff" }}>{cs.name}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {cs.tech.map(t => (
                        <span key={t} style={{ fontSize: 10, color: "#555", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "3px 10px", fontFamily: B }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontFamily: B, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#444", marginBottom: 8 }}>The problem</p>
                    <p style={{ fontFamily: B, fontSize: 15, color: "#aaa", lineHeight: 1.75 }}>{cs.problem}</p>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontFamily: B, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#444", marginBottom: 8 }}>The architecture</p>
                    <p style={{ fontFamily: B, fontSize: 15, color: "#888", lineHeight: 1.75 }}>{cs.architecture}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: B, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#444", marginBottom: 8 }}>The outcome</p>
                    <p style={{ fontFamily: B, fontSize: 15, color: "#fff", lineHeight: 1.75, fontWeight: 500 }}>{cs.outcome}</p>
                  </div>
                  {cs.link && <a href={cs.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 16, fontFamily: B, fontSize: 12, color: "#aaa", textDecoration: "none" }}>Visit &rarr;</a>}
                </div>
                {/* Device mockup */}
                <div className="case-mockup" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{
                    width: "100%", maxWidth: 220, aspectRatio: "9/19.5",
                    borderRadius: 28, border: "1px solid rgba(255,255,255,0.1)",
                    background: `linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
                    position: "relative", overflow: "hidden",
                    boxShadow: "0 0 60px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}>
                    {/* Notch */}
                    <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 80, height: 22, borderRadius: 100, background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.06)" }} />
                    {/* Screen content placeholder */}
                    <div style={{ position: "absolute", inset: 4, borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8, paddingTop: 40 }}>
                      <div style={{ width: "60%", height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }} />
                      <div style={{ width: "80%", height: 6, borderRadius: 3, background: "rgba(255,255,255,0.04)" }} />
                      <div style={{ width: "40%", height: 6, borderRadius: 3, background: "rgba(255,255,255,0.03)" }} />
                      <div style={{ width: "70%", height: 40, borderRadius: 8, background: "rgba(255,255,255,0.03)", marginTop: 12 }} />
                      <div style={{ width: "70%", height: 40, borderRadius: 8, background: "rgba(255,255,255,0.02)" }} />
                    </div>
                    {/* Ambient glow */}
                    <div style={{
                      position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)",
                      width: 160, height: 120, borderRadius: "50%",
                      background: ci === 0 ? "rgba(99,70,255,0.08)" : ci === 1 ? "rgba(0,190,255,0.08)" : "rgba(0,255,136,0.06)",
                      filter: "blur(40px)",
                    }} />
                    {/* App name on screen */}
                    <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center" }}>
                      <p style={{ fontFamily: D, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.15)", letterSpacing: "-0.02em" }}>{cs.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Long tail */}
          <div style={{ marginTop: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontFamily: B, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#444" }}>+ {MORE_APPS.length} more shipped products</span>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {MORE_APPS.map(app => (
                <div key={app.name} className="app-line">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontFamily: D, fontSize: 14, fontWeight: 700, color: "#fff" }}>{app.name}</span>
                    <span style={{ fontFamily: B, fontSize: 11, color: "#444" }}>{app.cat}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {app.link ? <a href={app.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: B, fontSize: 11, color: "#aaa", textDecoration: "none" }}>Play Store &rarr;</a> : <span style={{ fontFamily: B, fontSize: 11, color: "#333" }}>Soon</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. CAPABILITIES (NOT BUZZWORDS) ═══ */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="sec-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 40px" }}>
            <SH label="Capabilities" title={"What I bring to your product."} />
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="bento-grid">
              {[
                { title: "Speed & Cross-Platform", desc: "Ship on iOS, Android, and web from a single codebase.", items: ["Flutter", "React Native", "Next.js 16", "TypeScript"] },
                { title: "Scale & Infrastructure", desc: "Databases, APIs, and cloud that handle growth.", items: ["PostgreSQL", "Supabase", "AWS", "DynamoDB", "CloudFront"] },
                { title: "Revenue & Growth", desc: "Payments, subscriptions, and monetization loops.", items: ["Razorpay", "Stripe", "RevenueCat"] },
                { title: "The AI Edge", desc: "Production AI pipelines, not toy demos.", items: ["Fal.ai", "Vertex AI", "Gemini 3", "LangChain"] },
              ].map((cat) => (
                <motion.div key={cat.title} variants={staggerItem}>
                <BentoCard style={{ padding: "32px 24px" }}>
                  <p style={{ fontFamily: B, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>{cat.title}</p>
                  <p style={{ fontFamily: B, fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 16 }}>{cat.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {cat.items.map(item => <span key={item} style={{ fontFamily: B, fontSize: 14, color: "#666" }}>{item}</span>)}
                  </div>
                </BentoCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 6. TESTIMONIALS ═══ */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="sec-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 40px" }}>
            <SH label="Clients" title={"Founders who shipped with me."} />
            <div className="quote-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { q: "Aditya has built and shipped 10+ production apps for us \u2014 dating, AI, astrology, poster tools \u2014 all with subscription paywalls, Play Store live. He owns the full stack and just delivers. No chasing, no excuses.", n: "Rajan Bhagat", t: "Founder, Alnico Tech" },
                { q: "We needed subscription-based Flutter apps on the Play Store, done properly. Aditya handled everything \u2014 architecture, payments, store submission. Clean code, fast delivery. We keep coming back.", n: "Swatantra", t: "Founder, Gumbo Tech" },
              ].map((t, i) => (
                <motion.div key={t.n} className="glass quote-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ borderRadius: 20, padding: "48px 40px" }}>
                  <p style={{ fontFamily: B, fontSize: 16, color: "#ddd", lineHeight: 1.75, marginBottom: 32 }}>&ldquo;{t.q}&rdquo;</p>
                  <p style={{ fontFamily: B, fontSize: 14, fontWeight: 600, color: "#fff" }}>{t.n}</p>
                  <p style={{ fontFamily: B, fontSize: 12, color: "#555", marginTop: 2 }}>{t.t}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7. SERVICES (THE INVESTMENT) ═══ */}
        <section id="services" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="sec-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 40px" }}>
            <SH label="The investment" title={"Clear pricing. No surprises."} sub="For less than the cost of one US-based engineer for one month, you get a live, revenue-generating product." />
            <div className="svc-grid">
              {[
                { name: "Product Launch", sub: "The entire product \u2014 shipped.", price: "$10k \u2013 $25k+", dur: "Zero to one", desc: "From raw idea to live product in weeks. I own the architecture, frontend, backend, AI integration, and deployment. You get a revenue-ready business.", items: ["Full-stack mobile & web build", "Scalable database architecture", "Payment & subscription loops", "App Store & Play Store deployment"], hl: true },
                { name: "Fractional Lead", sub: "Your technical partner on call.", price: "$4k \u2013 $8k/mo", dur: "Ongoing", desc: "Dedicated bandwidth every month. I scale your product, ship new features, and eliminate technical debt so you can focus on growth.", items: ["Dedicated engineering hours", "Priority feature shipping", "Architecture & scaling calls", "Async communication & strategy"], hl: false },
                { name: "Deep Work Sprint", sub: "Complex problems, solved fast.", price: "$3k \u2013 $7k", dur: "High velocity", desc: "1 to 2 weeks of intense focus to integrate a major feature, rescue a struggling codebase, or build an AI pipeline. No loose ends.", items: ["AI model integration (Fal.ai, Vertex)", "Complex payment routing", "Performance optimization", "Real-time infrastructure"], hl: false },
              ].map((s, i) => (
                <motion.div key={s.name} className="svc-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  {s.hl && <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, transparent, rgba(99,70,255,0.5), rgba(0,190,255,0.3), transparent)" }} />}
                  {s.hl && <span style={{ position: "absolute", top: 16, right: 20, fontFamily: B, fontSize: 10, fontWeight: 600, color: "#aaa" }}>Popular</span>}
                  <span style={{ fontFamily: B, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#444", marginBottom: 20, display: "block" }}>{s.dur}</span>
                  <h3 style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 2 }}>{s.name}</h3>
                  <p style={{ fontFamily: B, fontSize: 13, color: "#888", marginBottom: 16 }}>{s.sub}</p>
                  <p style={{ fontFamily: D, fontSize: 30, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", marginBottom: 16 }}>{s.price}</p>
                  <p style={{ fontFamily: B, fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 28 }}>{s.desc}</p>
                  <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                    {s.items.map(item => (
                      <li key={item} style={{ display: "flex", gap: 10, listStyle: "none", fontSize: 13, color: "#666", fontFamily: B }}>
                        <span style={{ color: "#444", marginTop: 1 }}>+</span>{item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`pill ${s.hl ? "pill-white" : "pill-ghost"}`} style={{ marginTop: 32, width: "100%" }}>Start a project &rarr;</a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 8. EXCLUSIVITY FAQ ═══ */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="sec-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 40px" }}>
            <SH label="FAQ" title={"Before you reach out."} />
            {[
              { q: "Do you work for equity?", a: "No. I work for cash. My equity goes into the speed and execution quality I deliver to your company. You get a shipped product, not a co-founder who needs managing." },
              { q: "Can I hire you for a small bug fix or a quick feature?", a: "I only take Deep Work Sprints ($3k+) or full end-to-end builds. I don't debug $200 problems. If you need that, hire someone on Upwork." },
              { q: "Why should I pay you $10k+ when I can get a team overseas for $3k?", a: "Because that $3k team will cost you 6 months of runway, a failed launch, and a codebase you'll need to throw away. I guarantee execution. You pay once, you ship once, it works." },
              { q: "What's your availability?", a: "I take on 1\u20132 clients at a time. If I'm booked, I'll tell you upfront and give you a realistic start date. No bait-and-switch." },
            ].map((faq, i) => (
              <motion.div key={faq.q} className="faq-item" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}>
                <p style={{ fontFamily: D, fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 12 }}>{faq.q}</p>
                <p style={{ fontFamily: B, fontSize: 14, color: "#666", lineHeight: 1.75, maxWidth: 700 }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ 9. CONTACT ═══ */}
        <section id="contact" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="aurora" style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.3 }} />
          <div className="contact-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "180px 40px", textAlign: "center", position: "relative" }}>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="contact-head" style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(36px, 7vw, 72px)", letterSpacing: "-0.05em", lineHeight: 0.95, color: "#fff", marginBottom: 24 }}>
              Let&apos;s build something<br /><span style={{ color: "#555" }}>massive.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
              style={{ fontFamily: B, fontSize: 16, color: "#555", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 40px" }}>
              Tell me what you&apos;re building. I&apos;ll tell you how fast I can ship it.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
              className="contact-btns" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={copyEmail} className="pill pill-white" style={{ background: copied ? "#00ff88" : "#fff", color: "#000", transition: "background .25s" }}>
                {copied ? "Copied" : "adityaravindranath12@gmail.com"}
              </button>
              <a href="https://wa.me/919945622485" target="_blank" rel="noopener noreferrer" className="pill pill-ghost">WhatsApp</a>
            </motion.div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "24px 40px" }}>
          <div className="footer-inner" style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: B, fontSize: 12, color: "#333" }}>Aditya R &middot; Bangalore</span>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {[{ l: "LinkedIn", h: "https://linkedin.com/in/adityar-analytics" }, { l: "GitHub", h: "https://github.com/AlnicoTech2" }, { l: "WhatsApp", h: "https://wa.me/919945622485" }].map(lk => (
                <a key={lk.l} href={lk.h} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12, color: "#333", textDecoration: "none", fontFamily: B, transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#aaa")} onMouseLeave={e => (e.currentTarget.style.color = "#333")}>{lk.l}</a>
              ))}
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

/* ═══ HELPERS ═══ */

function SH({ label: l, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="sec-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#444", display: "block", marginBottom: 14 }}>{l}</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 44, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>{title}</h2>
      </motion.div>
      {sub && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
        style={{ fontFamily: "var(--font-body)", color: "#555", lineHeight: 1.7, maxWidth: 340, textAlign: "right", fontSize: 14 }}>{sub}</motion.p>}
    </div>
  );
}

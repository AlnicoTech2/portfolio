"use client";

import { useState, useEffect, useRef, useCallback, Suspense, type MouseEvent as RE } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const ROTATING_LABELS = [
  "Full-stack engineer",
  "Fractional CTO",
  "Indie builder",
  "MVP architect",
  "AI product engineer",
];

const STATS = [
  "Bootstrapped",
  "22+ Apps",
  "10+ Clients",
  "4-wk Delivery",
  "100% Ownership",
];

const CLIENT_LOGOS = [
  "Alnico Tech",
  "Gumbo Tech",
  "Raaz",
  "BeautyAI",
  "GoodLooksAI",
  "TarotAI",
  "Astravoro",
  "Matcho",
  "Baatein",
  "Lumii",
  "Polimart",
  "Gyanify",
];

const CASES = [
  {
    name: "Raaz",
    tag: "Dating App",
    problem: "Founder needed a dating app on Play Store in weeks — location matching, real-time chat, subscriptions. Agencies quoted 6 months and $60k.",
    architecture: "PostGIS geospatial discovery with progressive-radius matching. Supabase Realtime for chat with typing + read receipts. HMAC-verified Razorpay webhooks.",
    outcome: "Shipped to Play Store in under 4 weeks. 32 DB tables, 6 edge functions, 55+ backend-controlled config keys.",
    tech: ["Flutter", "Supabase", "PostGIS", "Razorpay"],
    accent: "#b045ff",
  },
  {
    name: "GoodLooksAI",
    tag: "AI Portraits",
    problem: "AI portrait product was chaining multiple models but latency was killing UX. Downloading images between stages was the bottleneck.",
    architecture: "Built a Hot-Chain pipeline — chaining fal.ai media URLs directly between AI stages (InstantID face swap → LoRA styling) without intermediate downloads. Migrated to Gemini 3 Pro.",
    outcome: "Play Store live. Admin panel (92K lines of TypeScript) shipped in a single day. CloudFront CDN at global edge.",
    tech: ["React Native", "Fal.ai", "Gemini 3", "DynamoDB"],
    accent: "#3a90ff",
  },
  {
    name: "Astravoro",
    tag: "E-commerce",
    problem: "Smart home brand needed a complete e-commerce store for US and Indian buyers — two-week hard deadline, zero existing infrastructure.",
    architecture: "Next.js 16 with server-rendered product pages, Zustand cart, dual payment gateway (Stripe USD, Razorpay INR), Supabase backend with full order management.",
    outcome: "Live at astravoro.com. 20 products across 5 categories. Dual-market checkout. Shipped in 14 days.",
    tech: ["Next.js", "Supabase", "Stripe", "Razorpay"],
    link: "https://astravoro.com",
    accent: "#3fffb1",
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

const EXPERTISE = [
  { title: "Mobile", items: ["Flutter", "React Native", "Expo", "Native modules"] },
  { title: "Web", items: ["Next.js 16", "TypeScript", "Tailwind", "Zustand"] },
  { title: "Backend", items: ["Node / Express", "Supabase", "AWS EC2 / Lambda", "PostgreSQL / PostGIS"] },
  { title: "AI Apps", items: ["Fal.ai", "Gemini 3 Pro", "Vertex AI", "OpenAI / Claude"] },
  { title: "Payments", items: ["Razorpay", "Stripe", "RevenueCat", "App Store / Play Store IAP"] },
  { title: "Infra", items: ["DynamoDB", "CloudFront", "Cognito", "S3 / Firebase"] },
];

const SERVICES = [
  {
    name: "Product Launch",
    sub: "Zero to shipped.",
    price: "$10k–$25k+",
    dur: "4–8 weeks",
    desc: "From raw idea to live product. I own architecture, frontend, backend, AI, deployment. You get a revenue-ready business.",
    items: ["Full-stack mobile & web build", "Scalable database architecture", "Payment & subscription loops", "App Store / Play Store deployment"],
    hl: true,
  },
  {
    name: "Fractional Lead",
    sub: "Your technical partner on call.",
    price: "$4k–$8k/mo",
    dur: "Ongoing",
    desc: "Dedicated bandwidth every month. I scale your product, ship features, and eliminate technical debt.",
    items: ["Dedicated engineering hours", "Priority feature shipping", "Architecture & scaling calls", "Async communication & strategy"],
    hl: false,
  },
  {
    name: "Deep Work Sprint",
    sub: "Complex problems, solved fast.",
    price: "$3k–$7k",
    dur: "1–2 weeks",
    desc: "Intense focus to integrate a major feature, rescue a struggling codebase, or build an AI pipeline. No loose ends.",
    items: ["AI model integration", "Complex payment routing", "Performance optimization", "Real-time infrastructure"],
    hl: false,
  },
];

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

function useRotator(items: string[], ms = 2600) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setI(p => (p + 1) % items.length), ms);
    return () => clearInterval(iv);
  }, [items.length, ms]);
  return items[i];
}

/* ═══ ANIM ═══ */

const ease = [0.16, 1, 0.3, 1] as const;

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
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em" }}>
          <motion.span style={{ display: "inline-block" }}
            initial={{ y: "110%" }} animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.05, ease }}>{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

function GridLines() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
      backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent calc(10% - 1px), var(--grid-line) calc(10% - 1px), var(--grid-line) 10%)`,
      maskImage: "linear-gradient(180deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(180deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
    }} />
  );
}

function StatPill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "8px 16px",
      border: "1px solid var(--accent-ghost)", borderRadius: 6,
      fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent-dim)",
      letterSpacing: "0.02em", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

/* ═══════════════════════════════════════════════
   REAL 3D HERO SCENE (three.js + R3F)
   ═══════════════════════════════════════════════ */

const CUBE_CONFIG = [
  { pos: [-2.4, 1.8, 0.2] as [number, number, number], size: [2.0, 0.7, 1.2] as [number, number, number] },
  { pos: [1.4, 2.2, -0.4] as [number, number, number], size: [1.3, 0.8, 1.1] as [number, number, number] },
  { pos: [-1.6, 0.2, 0.6] as [number, number, number], size: [1.8, 1.2, 1.0] as [number, number, number] },
  { pos: [1.0, 0.0, 0.4] as [number, number, number], size: [1.6, 1.4, 1.2] as [number, number, number] },
  { pos: [2.6, -1.4, -0.2] as [number, number, number], size: [1.4, 1.0, 1.3] as [number, number, number] },
  { pos: [-2.2, -1.8, 0.4] as [number, number, number], size: [1.6, 0.9, 1.1] as [number, number, number] },
  { pos: [0.2, -2.4, 0.0] as [number, number, number], size: [1.8, 1.0, 1.2] as [number, number, number] },
  { pos: [0.8, -1.0, 1.6] as [number, number, number], size: [0.9, 1.2, 0.9] as [number, number, number] },
];

function MetallicCubes() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {CUBE_CONFIG.map((c, i) => (
        <Float key={i} speed={1 + (i % 3) * 0.4} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh position={c.pos} castShadow receiveShadow>
            <boxGeometry args={c.size} />
            <meshPhysicalMaterial
              color="#1a1a22"
              metalness={1}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.05}
              envMapIntensity={1.4}
              reflectivity={0.95}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function GlowOrb({ variant = 0 }: { variant?: number }) {
  const orbColorSets = [
    ["#3a90ff", "#b045ff"],
    ["#3fffb1", "#d6ff3b"],
    ["#ff4db8", "#b045ff"],
    ["#00d4ff", "#3fffb1"],
    ["#b045ff", "#ff4db8"],
  ];
  const colors = orbColorSets[variant % orbColorSets.length];
  const groupRef = useRef<THREE.Group>(null);
  const yellowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
    if (yellowRef.current) {
      yellowRef.current.rotation.x = state.clock.elapsedTime * 0.8;
      yellowRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
  });

  return (
    <group position={[0.4, 0.2, 0.5]}>
      {/* Central orb */}
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.45, 48, 48]} />
          <meshBasicMaterial color={colors[0]} transparent opacity={0.95} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial color={colors[1]} transparent opacity={0.25} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.0, 24, 24]} />
          <meshBasicMaterial color={colors[0]} transparent opacity={0.08} />
        </mesh>
      </group>
      {/* Point light emanating from orb */}
      <pointLight color={colors[0]} intensity={6} distance={8} decay={2} />
      {/* Yellow accent cube */}
      <mesh ref={yellowRef} position={[-0.7, 0.8, 0.5]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshBasicMaterial color="#d6ff3b" />
      </mesh>
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight position={[6, 8, 4]} intensity={1.4} color="#ffffff" castShadow />
      <directionalLight position={[-5, -2, -6]} intensity={0.6} color="#8899ff" />
      <directionalLight position={[0, -5, 5]} intensity={0.3} color="#ff88cc" />
      <pointLight position={[4, 3, 4]} color="#ffffff" intensity={1} />
    </>
  );
}

function Hero3D({ variant = 0 }: { variant?: number }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Backdrop glow */}
      <div style={{
        position: "absolute", inset: "10%",
        background: "radial-gradient(circle at 55% 50%, rgba(58,144,255,0.18) 0%, rgba(176,69,255,0.08) 40%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <MetallicCubes />
          <GlowOrb variant={variant} />
        </Suspense>
        <SceneLighting />
        <fog attach="fog" args={["#000000", 8, 18]} />
      </Canvas>
    </div>
  );
}

function StarField() {
  const [stars, setStars] = useState<{ x: number; y: number; s: number; d: number }[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 0.5,
      d: Math.random() * 4,
    }));
    setStars(arr);
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((st, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 3 + st.d, repeat: Infinity, delay: st.d, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: `${st.x}%`, top: `${st.y}%`,
            width: st.s, height: st.s,
            background: i % 8 === 0 ? "var(--yellow)" : "#fff",
            borderRadius: "50%",
            boxShadow: i % 8 === 0 ? "0 0 8px var(--yellow)" : "0 0 4px #fff",
          }}
        />
      ))}
    </div>
  );
}

function RobotMascot() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", width: 260, height: 340 }}
    >
      {/* Base cube */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 120, height: 90,
        background: "linear-gradient(160deg, rgba(255,255,255,0.25), rgba(40,40,45,0.8))",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 6,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 10px 40px rgba(0,0,0,0.8)",
      }} />
      {/* Body */}
      <div style={{
        position: "absolute", bottom: 70, left: "50%", transform: "translateX(-50%)",
        width: 80, height: 70,
        background: "linear-gradient(160deg, rgba(180,180,190,0.6), rgba(60,60,70,0.9))",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "50% 50% 45% 45% / 30% 30% 50% 50%",
        boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)",
      }} />
      {/* Head */}
      <motion.div
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", bottom: 135, left: "50%", transform: "translateX(-50%)",
          width: 180, height: 110,
          background: "linear-gradient(160deg, rgba(70,90,100,0.95), rgba(20,30,40,1))",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 14,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 20px 40px rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
        }}
      >
        {/* Eyes */}
        {[0, 1].map(i => (
          <div key={i} style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #fff 0%, #88aaff 30%, #112240 70%, #000 100%)",
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.8)",
          }} />
        ))}
      </motion.div>
      {/* Arms */}
      {[{ side: "left", x: -6 }, { side: "right", x: 4 }].map((a, i) => (
        <motion.div
          key={a.side}
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", bottom: 90,
            [a.side]: a.x,
            width: 18, height: 40,
            transformOrigin: "top center",
          } as React.CSSProperties}
        >
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, rgba(150,150,160,0.6), rgba(40,40,50,0.9))",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 6,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
          }} />
          <div style={{
            width: 12, height: 12, borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, var(--yellow) 0%, #aa8800 100%)",
            boxShadow: "0 0 10px var(--yellow)",
            marginTop: -4, marginLeft: 3,
          }} />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ═══ SHORTHAND ═══ */

const D = "var(--font-display)";
const M = "var(--font-mono)";
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

  const rotatingLabel = useRotator(ROTATING_LABELS);
  const rotatingIndex = ROTATING_LABELS.indexOf(rotatingLabel);

  function copyEmail() {
    navigator.clipboard.writeText("adityaravindranath12@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <>
      <style>{`
        ::selection{background:var(--accent);color:#000}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-track{background:#000}
        ::-webkit-scrollbar-thumb{background:var(--accent-ghost)}
        section[id]{scroll-margin-top:64px}

        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes marquee-slow{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse-x{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}

        .marquee-track{display:flex;width:max-content;animation:marquee 40s linear infinite}
        .marquee-track-slow{display:flex;width:max-content;animation:marquee-slow 60s linear infinite}
        .marquee-track:hover,.marquee-track-slow:hover{animation-play-state:paused}

        .mint-btn{
          display:inline-flex;align-items:center;justify-content:center;gap:12px;
          padding:16px 32px;border-radius:4px;
          font-family:var(--font-display);font-size:15px;font-weight:600;
          background:var(--accent);color:#000;text-decoration:none;
          border:1px solid var(--accent);cursor:pointer;
          transition:all .25s;white-space:nowrap
        }
        .mint-btn:hover{background:#2fdf9c;transform:translateY(-1px);box-shadow:0 10px 30px rgba(63,255,177,0.25)}

        .ghost-btn{
          display:inline-flex;align-items:center;justify-content:center;gap:12px;
          padding:16px 32px;border-radius:4px;
          font-family:var(--font-display);font-size:15px;font-weight:600;
          background:rgba(255,255,255,0.04);color:#fff;text-decoration:none;
          border:1px solid var(--border-bright);cursor:pointer;
          transition:all .25s;white-space:nowrap
        }
        .ghost-btn:hover{background:rgba(255,255,255,0.08);border-color:#fff;transform:translateY(-1px)}

        .logo-x{animation:pulse-x 2s ease-in-out infinite}

        .case-block{border-bottom:1px solid var(--border);padding:72px 0;position:relative;transition:background .4s}
        .case-block:hover{background:rgba(63,255,177,0.015)}

        .app-line{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid var(--border);transition:padding-left .25s,background .25s}
        .app-line:hover{padding-left:12px;background:rgba(255,255,255,0.015)}

        .expertise-card{padding:36px 28px;border:1px solid var(--border);background:rgba(255,255,255,0.02);border-radius:6px;transition:border-color .3s,background .3s}
        .expertise-card:hover{border-color:var(--accent-ghost);background:rgba(63,255,177,0.03)}

        .svc-card{padding:40px 32px;border:1px solid var(--border);background:rgba(255,255,255,0.02);border-radius:6px;display:flex;flex-direction:column;position:relative;transition:border-color .3s,background .3s}
        .svc-card:hover{border-color:var(--accent-ghost);background:rgba(63,255,177,0.02)}
        .svc-card.hl{border-color:var(--accent-ghost);background:rgba(63,255,177,0.03)}

        .quote-card{padding:40px 32px;border:1px solid var(--border);background:rgba(255,255,255,0.02);border-radius:6px}
        .quote-card:hover{border-color:var(--border-bright)}

        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important;min-height:auto!important}
          .hero-3d{height:360px!important;margin-top:20px!important}
          .case-inner{grid-template-columns:1fr!important}
          .expertise-grid{grid-template-columns:repeat(2,1fr)!important}
          .svc-grid{grid-template-columns:1fr!important}
          .quote-grid{grid-template-columns:1fr!important}
          .cta-grid{grid-template-columns:1fr!important}
          .cta-robot{display:none!important}
        }
        @media(max-width:768px){
          .nav-links{display:none!important}
          .nav-hire{display:flex!important}
          .nav-inner{padding:0 20px!important}
          .hero-pad{padding:120px 20px 60px!important}
          .hero-headline{font-size:48px!important;line-height:1.05!important}
          .hero-3d{height:300px!important}
          .stats-pills{gap:8px!important}
          .stats-pills>span{padding:6px 12px!important;font-size:11px!important}
          .sec-pad{padding:72px 20px!important}
          .sec-title{font-size:36px!important}
          .expertise-grid{grid-template-columns:1fr!important}
          .case-block{padding:40px 0!important}
          .case-head{flex-wrap:wrap!important}
          .cta-title{font-size:48px!important}
          .cta-pad{padding:100px 20px!important}
          .cta-btns{flex-direction:column!important;width:100%!important}
          .cta-btns a{width:100%!important}
          .footer-inner{flex-direction:column!important;gap:16px!important;text-align:center!important;align-items:center!important}
        }
      `}</style>

      <GridLines />

      <main style={{ position: "relative", zIndex: 2 }}>

        {/* ═══ NAV ═══ */}
        <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, borderBottom: "1px solid var(--border)", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
          <div className="nav-inner" style={{ maxWidth: 1760, margin: "0 auto", padding: "0 clamp(24px, 3vw, 72px)", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <span style={{ fontFamily: D, fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.05em" }}>
                AR
              </span>
              <span className="logo-x" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 28, height: 28, background: "var(--yellow)",
                fontFamily: D, fontSize: 16, fontWeight: 900, color: "#000",
                borderRadius: 3, boxShadow: "0 0 16px rgba(214,255,59,0.45)",
              }}>×</span>
            </a>
            <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {[
                { l: "Work", h: "#work" },
                { l: "Expertise", h: "#expertise" },
                { l: "Pricing", h: "#services" },
                { l: "About", h: "#about" },
              ].map(l => (
                <a key={l.l} href={l.h} style={{ fontFamily: B, fontSize: 14, color: "#aaa", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}>{l.l}</a>
              ))}
              <a href="#contact" className="mint-btn" style={{ padding: "10px 20px", fontSize: 13 }}>
                Start a project
                <span style={{ fontSize: 14 }}>→</span>
              </a>
            </div>
            <a href="#contact" className="nav-hire mint-btn" style={{ padding: "10px 20px", fontSize: 13, display: "none" }}>
              Start a project <span>→</span>
            </a>
          </div>
        </motion.nav>

        {/* ═══ 1. HERO ═══ */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div className="hero-pad" style={{ maxWidth: 1760, margin: "0 auto", padding: "140px clamp(24px, 3vw, 72px) 64px", width: "100%" }}>
            <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 60, alignItems: "center", minHeight: "calc(100vh - 260px)" }}>
              <div>
                <div style={{ height: 28, marginBottom: 36, overflow: "hidden" }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingLabel}
                      initial={{ y: 28, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -28, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      style={{
                        fontFamily: M, fontSize: 15, color: "var(--accent)",
                        letterSpacing: "0.02em", display: "inline-block",
                      }}
                    >
                      <span style={{ opacity: 0.5, marginRight: 6 }}>&gt;</span>{rotatingLabel}
                      <span style={{ opacity: 0.6, marginLeft: 2 }}>_</span>
                    </motion.span>
                  </AnimatePresence>
                </div>

                <h1 className="hero-headline" style={{
                  fontFamily: D, fontWeight: 800, fontSize: "clamp(64px, 11vw, 196px)",
                  letterSpacing: "-0.05em", lineHeight: 0.92, color: "#fff",
                  marginBottom: 56, maxWidth: "100%",
                }}>
                  <WordReveal text="The Solo" />
                  <br />
                  <WordReveal text="Engineering Studio" delay={0.15} />
                </h1>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                  style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <MagneticButton href="#contact" className="mint-btn">
                    Start a project <span style={{ fontSize: 16 }}>→</span>
                  </MagneticButton>
                </motion.div>
              </div>

              <motion.div
                className="hero-3d"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
                style={{ height: "min(640px, 60vh)", position: "relative", width: "100%" }}
              >
                <Hero3D variant={rotatingIndex} />
              </motion.div>
            </div>
          </div>

          {/* Client logos marquee */}
          <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "26px 0", overflow: "hidden" }}>
            <div className="marquee-track">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
                <span key={i} style={{
                  fontFamily: D, fontSize: 24, fontWeight: 700, color: "#fff",
                  padding: "0 48px", letterSpacing: "-0.02em", whiteSpace: "nowrap",
                  opacity: 0.75,
                }}>{name}</span>
              ))}
            </div>
          </div>

          {/* Stats pills */}
          <div style={{ padding: "40px clamp(24px, 3vw, 72px) 72px" }}>
            <div className="stats-pills" style={{ maxWidth: 1760, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap" }}>
              {STATS.map(s => <StatPill key={s}>{s}</StatPill>)}
            </div>
          </div>
        </section>

        {/* ═══ 2. AMBITIOUS FOUNDERS (CASE STUDIES) ═══ */}
        <section id="work" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="sec-pad" ref={statsRef} style={{ maxWidth: 1760, margin: "0 auto", padding: "120px clamp(24px, 3vw, 72px)" }}>
            <div style={{ marginBottom: 72 }}>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                style={{ fontFamily: M, fontSize: 13, color: "var(--accent)", letterSpacing: "0.02em", marginBottom: 20 }}>
                <span style={{ opacity: 0.5, marginRight: 6 }}>&gt;</span>Case studies
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="sec-title" style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(42px, 6vw, 88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, marginBottom: 16, maxWidth: 900 }}>
                I work with ambitious founders
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                style={{ fontFamily: B, fontSize: 17, color: "var(--text-mid)", lineHeight: 1.6, maxWidth: 640 }}>
                {c1.v}+ production apps shipped. Real businesses, real revenue. Here&apos;s what shipping looks like when one engineer owns the full stack.
              </motion.p>
            </div>

            {CASES.map((cs, ci) => (
              <motion.div key={cs.name} className="case-block" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: ci * 0.08, duration: 0.6 }}>
                <div className="case-inner" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 56 }}>
                  <div>
                    <div className="case-head" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                      <h3 style={{ fontFamily: D, fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>{cs.name}</h3>
                      <span style={{
                        fontFamily: M, fontSize: 11, color: "var(--accent)", letterSpacing: "0.05em",
                        padding: "4px 10px", border: "1px solid var(--accent-ghost)", borderRadius: 4,
                      }}>{cs.tag}</span>
                    </div>
                    <div style={{ display: "grid", gap: 20 }}>
                      {[
                        { l: "Problem", v: cs.problem, c: "var(--text-mid)" },
                        { l: "Architecture", v: cs.architecture, c: "#888" },
                        { l: "Outcome", v: cs.outcome, c: "#fff" },
                      ].map(block => (
                        <div key={block.l}>
                          <p style={{ fontFamily: M, fontSize: 11, color: "var(--accent-dim)", letterSpacing: "0.05em", marginBottom: 8 }}>
                            <span style={{ opacity: 0.5, marginRight: 4 }}>&gt;</span>{block.l}
                          </p>
                          <p style={{ fontFamily: B, fontSize: 15, color: block.c, lineHeight: 1.7 }}>{block.v}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
                      {cs.tech.map(t => (
                        <span key={t} style={{
                          fontFamily: M, fontSize: 11, color: "var(--text-mid)",
                          border: "1px solid var(--border)", borderRadius: 4, padding: "4px 10px",
                        }}>{t}</span>
                      ))}
                    </div>
                    {cs.link && (
                      <a href={cs.link} target="_blank" rel="noopener noreferrer" style={{
                        display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24,
                        fontFamily: D, fontSize: 14, fontWeight: 600, color: "var(--accent)",
                        textDecoration: "none",
                      }}>Visit live site <span>→</span></a>
                    )}
                  </div>

                  {/* Preview card */}
                  <div style={{
                    position: "relative", minHeight: 340,
                    border: "1px solid var(--border)", borderRadius: 8,
                    background: `radial-gradient(ellipse at 30% 20%, ${cs.accent}22 0%, transparent 60%), #0a0a0a`,
                    overflow: "hidden",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    padding: 24,
                  }}>
                    <div style={{
                      position: "absolute", top: 16, left: 16, right: 16, height: 2,
                      background: `linear-gradient(90deg, ${cs.accent}, transparent)`,
                    }} />
                    <div style={{
                      position: "absolute", top: 32, left: 16,
                      fontFamily: M, fontSize: 10, color: `${cs.accent}`, letterSpacing: "0.08em",
                    }}>
                      CASE {String(ci + 1).padStart(2, "0")}
                    </div>
                    <div style={{
                      position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      pointerEvents: "none",
                    }}>
                      <div style={{
                        width: 180, height: 180,
                        background: `radial-gradient(circle at 30% 30%, ${cs.accent}66 0%, transparent 70%)`,
                        filter: "blur(30px)",
                      }} />
                    </div>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        fontFamily: D, fontSize: 28, fontWeight: 800, color: "#fff",
                        letterSpacing: "-0.03em", lineHeight: 0.95, marginBottom: 4,
                      }}>{cs.name}</div>
                      <div style={{ fontFamily: M, fontSize: 11, color: "var(--text-mid)", letterSpacing: "0.05em" }}>
                        {cs.tech.slice(0, 2).join(" · ")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Long tail */}
            <div style={{ marginTop: 64 }}>
              <p style={{ fontFamily: M, fontSize: 11, color: "var(--accent-dim)", letterSpacing: "0.05em", marginBottom: 20 }}>
                <span style={{ opacity: 0.5, marginRight: 4 }}>&gt;</span>{MORE_APPS.length} more shipped products
              </p>
              <div style={{ borderTop: "1px solid var(--border)" }}>
                {MORE_APPS.map(app => (
                  <div key={app.name} className="app-line">
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: "#fff" }}>{app.name}</span>
                      <span style={{ fontFamily: M, fontSize: 11, color: "var(--text-dim)" }}>{app.cat}</span>
                      <span style={{ fontFamily: M, fontSize: 11, color: "var(--accent-dim)" }}>· {app.client}</span>
                    </div>
                    <div>
                      {app.link ? (
                        <a href={app.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: M, fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>
                          Play Store <span style={{ opacity: 0.7 }}>→</span>
                        </a>
                      ) : (
                        <span style={{ fontFamily: M, fontSize: 11, color: "var(--text-dim)" }}>Soon</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3. EXPERTISE ═══ */}
        <section id="expertise" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="sec-pad" style={{ maxWidth: 1760, margin: "0 auto", padding: "120px clamp(24px, 3vw, 72px)" }}>
            <div style={{ marginBottom: 72 }}>
              <p style={{ fontFamily: M, fontSize: 13, color: "var(--accent)", letterSpacing: "0.02em", marginBottom: 20 }}>
                <span style={{ opacity: 0.5, marginRight: 6 }}>&gt;</span>Expertise
              </p>
              <h2 className="sec-title" style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(42px, 6vw, 88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, maxWidth: 900 }}>
                Full stack. Every stack.
              </h2>
            </div>
            <div className="expertise-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {EXPERTISE.map((cat, i) => (
                <motion.div key={cat.title} className="expertise-card"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}>
                  <p style={{ fontFamily: M, fontSize: 11, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 16 }}>
                    0{i + 1}
                  </p>
                  <h3 style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 16 }}>{cat.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {cat.items.map(item => (
                      <span key={item} style={{ fontFamily: B, fontSize: 14, color: "var(--text-mid)" }}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. TESTIMONIALS ═══ */}
        <section style={{ borderTop: "1px solid var(--border)" }}>
          <div className="sec-pad" style={{ maxWidth: 1760, margin: "0 auto", padding: "120px clamp(24px, 3vw, 72px)" }}>
            <div style={{ marginBottom: 72 }}>
              <p style={{ fontFamily: M, fontSize: 13, color: "var(--accent)", letterSpacing: "0.02em", marginBottom: 20 }}>
                <span style={{ opacity: 0.5, marginRight: 6 }}>&gt;</span>Testimonials
              </p>
              <h2 className="sec-title" style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(42px, 6vw, 88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>
                Hear what founders say.
              </h2>
            </div>
            <div className="quote-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { q: "Aditya has built and shipped 10+ production apps for us — dating, AI, astrology, poster tools — all with subscription paywalls, Play Store live. He owns the full stack and just delivers.", n: "Rajan Bhagat", t: "Founder, Alnico Tech" },
                { q: "We needed subscription-based Flutter apps on the Play Store, done properly. Aditya handled everything — architecture, payments, store submission. Clean code, fast delivery.", n: "Swatantra", t: "Founder, Gumbo Tech" },
              ].map((t, i) => (
                <motion.div key={t.n} className="quote-card"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <p style={{ fontFamily: B, fontSize: 17, color: "#ddd", lineHeight: 1.7, marginBottom: 32 }}>&ldquo;{t.q}&rdquo;</p>
                  <p style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: "#fff" }}>{t.n}</p>
                  <p style={{ fontFamily: M, fontSize: 12, color: "var(--accent-dim)", marginTop: 4 }}>{t.t}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. SERVICES ═══ */}
        <section id="services" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="sec-pad" style={{ maxWidth: 1760, margin: "0 auto", padding: "120px clamp(24px, 3vw, 72px)" }}>
            <div style={{ marginBottom: 72 }}>
              <p style={{ fontFamily: M, fontSize: 13, color: "var(--accent)", letterSpacing: "0.02em", marginBottom: 20 }}>
                <span style={{ opacity: 0.5, marginRight: 6 }}>&gt;</span>Pricing
              </p>
              <h2 className="sec-title" style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(42px, 6vw, 88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, marginBottom: 16 }}>
                Clear pricing. Zero surprises.
              </h2>
              <p style={{ fontFamily: B, fontSize: 17, color: "var(--text-mid)", lineHeight: 1.6, maxWidth: 640 }}>
                For less than one US engineer-month, you get a live, revenue-generating product.
              </p>
            </div>
            <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {SERVICES.map((s, i) => (
                <motion.div key={s.name} className={`svc-card ${s.hl ? "hl" : ""}`}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                  {s.hl && (
                    <span style={{
                      position: "absolute", top: 20, right: 20,
                      fontFamily: M, fontSize: 10, color: "var(--accent)",
                      letterSpacing: "0.08em", padding: "4px 8px",
                      border: "1px solid var(--accent-ghost)", borderRadius: 3,
                    }}>POPULAR</span>
                  )}
                  <span style={{ fontFamily: M, fontSize: 11, letterSpacing: "0.08em", color: "var(--accent-dim)", marginBottom: 20, display: "block" }}>
                    {s.dur}
                  </span>
                  <h3 style={{ fontFamily: D, fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>{s.name}</h3>
                  <p style={{ fontFamily: B, fontSize: 14, color: "var(--text-mid)", marginBottom: 20 }}>{s.sub}</p>
                  <p style={{ fontFamily: D, fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20 }}>{s.price}</p>
                  <p style={{ fontFamily: B, fontSize: 14, color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 28 }}>{s.desc}</p>
                  <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                    {s.items.map(item => (
                      <li key={item} style={{ display: "flex", gap: 10, listStyle: "none", fontSize: 14, color: "#ccc", fontFamily: B }}>
                        <span style={{ color: "var(--accent)", marginTop: 1 }}>+</span>{item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={s.hl ? "mint-btn" : "ghost-btn"} style={{ width: "100%", padding: "14px 28px", fontSize: 14 }}>
                    Start a project <span style={{ fontSize: 14 }}>→</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. LET'S BUILD TOGETHER ═══ */}
        <section id="contact" style={{ position: "relative", borderTop: "1px solid var(--border)", overflow: "hidden", minHeight: 520 }}>
          <StarField />
          <div className="cta-pad" style={{ maxWidth: 1760, margin: "0 auto", padding: "160px clamp(24px, 3vw, 72px)", position: "relative", zIndex: 2 }}>
            <div className="cta-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                  className="cta-title" style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.05em", lineHeight: 0.95, color: "#fff", marginBottom: 32 }}>
                  LET&apos;S<br />
                  <span style={{ color: "var(--accent)" }}>BUILD TOGETHER</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                  style={{ fontFamily: B, fontSize: 17, color: "#ccc", lineHeight: 1.6, maxWidth: 520, marginBottom: 40 }}>
                  Whether you need an MVP shipped in 4 weeks, a fractional engineer on call, or a deep-work sprint — I&apos;ve got you covered.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                  className="cta-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
                  <button onClick={copyEmail} className="mint-btn" style={{ border: "1px solid var(--accent)" }}>
                    {copied ? "Copied" : "Copy email"} <span style={{ fontSize: 16 }}>→</span>
                  </button>
                  <a href="https://wa.me/919945622485" target="_blank" rel="noopener noreferrer" className="ghost-btn">
                    WhatsApp <span style={{ fontSize: 16 }}>→</span>
                  </a>
                </motion.div>
                <p style={{ fontFamily: M, fontSize: 13, color: "var(--text-mid)" }}>
                  <span style={{ color: "var(--accent)", opacity: 0.5, marginRight: 6 }}>&gt;</span>
                  adityaravindranath12@gmail.com
                </p>
              </div>
              <div className="cta-robot" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <RobotMascot />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer id="about" style={{ borderTop: "1px solid var(--border)", padding: "40px clamp(24px, 3vw, 72px)" }}>
          <div className="footer-inner" style={{ maxWidth: 1760, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: D, fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.05em" }}>AR</span>
                <span className="logo-x" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 20, height: 20, background: "var(--yellow)",
                  fontFamily: D, fontSize: 12, fontWeight: 900, color: "#000", borderRadius: 2,
                }}>×</span>
              </div>
              <span style={{ fontFamily: M, fontSize: 12, color: "var(--text-dim)" }}>
                Aditya R · Bangalore, India
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {[
                { l: "LinkedIn", h: "https://linkedin.com/in/adityar-analytics" },
                { l: "GitHub", h: "https://github.com/AlnicoTech2" },
                { l: "WhatsApp", h: "https://wa.me/919945622485" },
              ].map(lk => (
                <a key={lk.l} href={lk.h} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: M, fontSize: 12, color: "var(--text-mid)", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--text-mid)")}>{lk.l}</a>
              ))}
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

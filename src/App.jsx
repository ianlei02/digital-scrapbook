import React, { useEffect, useRef, useState, useCallback } from "react";

/*
  =========================================================================
  PRECIOUS — "Heaven's Brightest Angel"
  A single-file, single-component React + Tailwind landing page.

  Structure of this file (search these markers to navigate):
    [FONTS]              Google Font injection
    [HOOKS]               useReveal (scroll fade/slide-in) + misc effects
    [DATA]                 Static copy/content arrays
    [SECTION: NAV]
    [SECTION: HERO]
    [SECTION: ABOUT]
    [SECTION: QUALITIES]
    [SECTION: GALLERY]
    [SECTION: TESTIMONIALS]
    [SECTION: REGISTRY]
    [SECTION: INVESTIGATION]
    [SECTION: SCANNER]
    [SECTION: FINAL REVEAL]
    [SECTION: EVIDENCE]
    [SECTION: ANNOUNCEMENT]
    [SECTION: APPEAL]
    [SECTION: FOOTER]
    [EASTER EGGS]           halo click, "M" keypress, tab-title swap
  =========================================================================
*/

/* ----------------------------[ FONTS ]---------------------------------- */
function useGoogleFonts() {
  useEffect(() => {
    const id = "precious-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Cinzel:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ----------------------------[ HOOKS ]----------------------------------- */
// Fades + slides an element in once it scrolls into view.
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, visible] = useReveal(0.15);
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------[ DATA ]------------------------------------ */
const QUALITIES = [
  { icon: "🤍", title: "Compassion", body: "Always willing to help." },
  { icon: "✨", title: "Positivity", body: "Brings light wherever she goes." },
  { icon: "🪽", title: "Grace", body: "Elegant in every way." },
  { icon: "🌸", title: "Kindness", body: "Treats everyone with respect." },
  { icon: "☀️", title: "Hope", body: "Makes everyone's day brighter." },
];

const GALLERY = [
  { title: "Morning Light" },
  { title: "Guardian Wings" },
  { title: "Heaven's Smile" },
  { title: "Peaceful Soul" },
  { title: "Divine Grace" },
  { title: "Light Among Us" },
];

const TESTIMONIALS = [
  "She's literally an angel.",
  "The nicest person I've ever met.",
  "A blessing to everyone around her.",
  "I've never seen anyone so kind.",
];

const REGISTRY_STATS = [
  { label: "Halo Integrity", value: 100, suspicious: false },
  { label: "Wing Purity", value: 99, suspicious: false },
  { label: "Celestial Aura", value: 98, suspicious: false },
  { label: "Unknown Energy Signature", value: null, tag: "Detected", suspicious: true },
];

const REPORTS = [
  { id: "01", body: "Subject continues behaving like an angel.", note: "No concerns." },
  { id: "07", body: "Witness reported hearing strange noises around midnight.", note: "Cause unknown." },
  { id: "13", body: "Subject denies all allegations.", note: "Statement accepted... for now." },
  { id: "24", body: 'Multiple witnesses insist the subject is "too innocent."', note: "Further investigation recommended." },
];

const EVIDENCE = [
  "Claims to be an angel.",
  "Suspiciously nice.",
  "Never available after midnight.",
  "Wings verified... wrong species.",
  "Continues denying everything.",
  "Investigation concludes excessive innocence is suspicious.",
];

const SCAN_LINES = [
  "Comparing Heavenly Database...",
  "Searching Celestial Archives...",
  "Cross-referencing Philippine Mythological Records...",
  "Searching...",
];

/* ----------------------------[ ILLUSTRATIONS ]--------------------------- */
// Simple, original, non-representational angelic silhouette (no real person).
function AngelIllustration({ dark = false }) {
  return (
    <svg viewBox="0 0 400 480" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={dark ? "#e11d48" : "#f5d78e"} stopOpacity="0.9" />
          <stop offset="100%" stopColor={dark ? "#e11d48" : "#f5d78e"} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={dark ? "#3f0d14" : "#ffffff"} />
          <stop offset="100%" stopColor={dark ? "#170307" : "#dce8f7"} />
        </linearGradient>
        <linearGradient id="gownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={dark ? "#5a0f18" : "#ffffff"} />
          <stop offset="100%" stopColor={dark ? "#20040a" : "#eaf2fb"} />
        </linearGradient>
      </defs>

      {/* halo glow */}
      <ellipse cx="200" cy="90" rx="140" ry="140" fill="url(#haloGlow)" />
      {/* halo ring */}
      <ellipse
        cx="200"
        cy="80"
        rx="52"
        ry="14"
        fill="none"
        stroke={dark ? "#e11d48" : "#c8973f"}
        strokeWidth="4"
      />

      {/* wings */}
      <path
        d="M200 220 C 90 180, 20 260, 40 380 C 100 340, 150 300, 200 260 Z"
        fill="url(#wingGrad)"
        opacity="0.95"
      />
      <path
        d="M200 220 C 310 180, 380 260, 360 380 C 300 340, 250 300, 200 260 Z"
        fill="url(#wingGrad)"
        opacity="0.95"
      />

      {/* gown / body */}
      <path
        d="M200 140 C 160 140, 150 190, 155 230 C 130 300, 130 380, 140 460 L 260 460 C 270 380, 270 300, 245 230 C 250 190, 240 140, 200 140 Z"
        fill="url(#gownGrad)"
      />

      {/* head */}
      <circle cx="200" cy="118" r="34" fill={dark ? "#3a0a10" : "#fbeee0"} />

      {/* simple hair suggestion */}
      <path
        d="M168 108 C 168 80, 232 80, 232 108 C 232 90, 168 90, 168 108 Z"
        fill={dark ? "#170307" : "#caa66b"}
        opacity="0.7"
      />
    </svg>
  );
}

function CloudSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
      <ellipse cx="60" cy="60" rx="55" ry="30" fill="currentColor" />
      <ellipse cx="110" cy="45" rx="45" ry="35" fill="currentColor" />
      <ellipse cx="150" cy="65" rx="40" ry="25" fill="currentColor" />
    </svg>
  );
}

function FeatherSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 40 120" className={className} aria-hidden="true">
      <path
        d="M20 0 C 30 20, 30 40, 20 60 C 10 40, 10 20, 20 0 Z"
        fill="currentColor"
      />
      <path
        d="M20 60 C 26 75, 26 95, 20 120 C 14 95, 14 75, 20 60 Z"
        fill="currentColor"
      />
      <line x1="20" y1="0" x2="20" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/* ==========================================================================
   MAIN APP
   ========================================================================== */
export default function App() {
  useGoogleFonts();

  const [haloBat, setHaloBat] = useState(false);
  const [haloClicks, setHaloClicks] = useState(0);
  const [mAlert, setMAlert] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);
  const [scanActive, setScanActive] = useState(false);
  const [appealOpen, setAppealOpen] = useState(false);

  const scannerRef = useRef(null);
  const finalRevealRef = useRef(null);
  const originalTitle = useRef(
    typeof document !== "undefined" ? document.title : ""
  );

  /* ---------- [EASTER EGG] "M" key listener ---------- */
  useEffect(() => {
    function onKey(e) {
      if (e.key === "m" || e.key === "M") {
        setMAlert(true);
        setTimeout(() => setMAlert(false), 2200);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- Tab title ---------- */
  useEffect(() => {
    document.title = "Precious | Heaven's Brightest Angel";
    return () => {
      document.title = originalTitle.current || "Precious";
    };
  }, []);

  useEffect(() => {
    if (revealed) {
      document.title = "⚠️ Manananggal Confirmed";
    } else {
      document.title = "Precious | Heaven's Brightest Angel";
    }
  }, [revealed]);

  /* ---------- Scanner: cycles search text once in view ---------- */
  useEffect(() => {
    const el = scannerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScanActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!scanActive) return;
    const interval = setInterval(() => {
      setScanIndex((i) => (i + 1) % SCAN_LINES.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [scanActive]);

  /* ---------- Final reveal trigger ---------- */
  useEffect(() => {
    const el = finalRevealRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---------- [EASTER EGG] halo clicks ---------- */
  const handleHaloClick = useCallback(() => {
    setHaloClicks((c) => c + 1);
    setHaloBat(true);
    setTimeout(() => setHaloBat(false), 600);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-[2000ms] ${
        revealed
          ? "bg-gradient-to-b from-[#1a0509] via-[#2b070d] to-[#0c0305] text-rose-50"
          : "bg-gradient-to-b from-[#fbfaf7] via-[#eef4fb] to-[#f7f3ea] text-slate-700"
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Local styles: keyframes only, no component library, no CSS modules */}
      <style>{`
        @keyframes floatSlow { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-18px);} }
        @keyframes floatSlower { 0%,100% { transform: translateY(0px) translateX(0px);} 50% { transform: translateY(-26px) translateX(10px);} }
        @keyframes driftAcross { 0% { transform: translateX(-10%);} 100% { transform: translateX(110%);} }
        @keyframes fallFeather { 0% { transform: translateY(-10%) rotate(0deg); opacity:0.9;} 100% { transform: translateY(120vh) rotate(180deg); opacity:0;} }
        @keyframes pulseGlow { 0%,100% { opacity:0.5;} 50% { opacity:1;} }
        @keyframes shimmer { 0% { background-position: -200% 0;} 100% { background-position: 200% 0;} }
        .font-display { font-family: 'Cinzel', serif; }
        .font-serif-elegant { font-family: 'Cormorant Garamond', serif; }
        .reduce-motion { animation: none !important; transition: none !important; }
      `}</style>

      {/* ---------- Ambient background: floating clouds / feathers ---------- */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {!revealed && (
          <>
            <CloudSVG className="absolute top-[8%] left-[-5%] w-72 text-white/70" style={{ animation: "driftAcross 60s linear infinite" }} />
            <CloudSVG className="absolute top-[22%] left-[-10%] w-56 text-white/50" style={{ animation: "driftAcross 90s linear infinite", animationDelay: "10s" }} />
            <CloudSVG className="absolute top-[45%] left-[-8%] w-64 text-white/40" style={{ animation: "driftAcross 75s linear infinite", animationDelay: "5s" }} />
            <FeatherSVG className="absolute top-0 left-[15%] w-4 text-white/80" style={{ animation: "fallFeather 14s linear infinite", animationDelay: "0s" }} />
            <FeatherSVG className="absolute top-0 left-[45%] w-3 text-amber-100/80" style={{ animation: "fallFeather 18s linear infinite", animationDelay: "4s" }} />
            <FeatherSVG className="absolute top-0 left-[70%] w-4 text-white/70" style={{ animation: "fallFeather 16s linear infinite", animationDelay: "8s" }} />
            <FeatherSVG className="absolute top-0 left-[85%] w-3 text-white/60" style={{ animation: "fallFeather 20s linear infinite", animationDelay: "2s" }} />
          </>
        )}
        {revealed && (
          <>
            <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-rose-900/30 blur-3xl" style={{ animation: "pulseGlow 6s ease-in-out infinite" }} />
            <div className="absolute bottom-[15%] right-[10%] w-80 h-80 rounded-full bg-red-950/40 blur-3xl" style={{ animation: "pulseGlow 8s ease-in-out infinite" }} />
          </>
        )}
      </div>

      {/* ---------- [EASTER EGG] M key banner ---------- */}
      {mAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-rose-950 text-rose-50 px-5 py-3 rounded-full shadow-2xl border border-rose-700/60 text-sm font-medium tracking-wide animate-[pulseGlow_1s_ease-in-out_infinite]">
          ⚠️ Mythological Entity Detected.
        </div>
      )}

      {/* ================= [SECTION: NAV] ================= */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <span className={`font-display tracking-[0.2em] text-sm ${revealed ? "text-rose-200" : "text-slate-600"}`}>
          PRECIOUS
        </span>
        <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase">
          <button onClick={() => scrollTo("about")} className="opacity-70 hover:opacity-100 transition">About</button>
          <button onClick={() => scrollTo("registry")} className="opacity-70 hover:opacity-100 transition">Registry</button>
          <button onClick={() => scrollTo("scanner")} className="opacity-70 hover:opacity-100 transition">Verification</button>
        </div>
      </nav>

      {/* ================= [SECTION: HERO] ================= */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-16 pt-8 pb-24 md:pt-16 md:pb-32 max-w-7xl mx-auto">
        <Reveal className="flex-1 flex flex-col items-center md:items-start text-center md:text-left" delay={0}>
          <div
            onClick={handleHaloClick}
            className="mb-6 cursor-pointer select-none"
            title="✨"
          >
            <div
              className={`w-16 h-6 mx-auto md:mx-0 border-4 rounded-full transition-all duration-500 ${
                haloBat
                  ? "border-transparent bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%)] scale-x-150 skew-x-12"
                  : "border-amber-300/80"
              }`}
              style={
                haloBat
                  ? {
                      clipPath:
                        "polygon(0% 50%, 20% 0%, 40% 50%, 50% 20%, 60% 50%, 80% 0%, 100% 50%, 80% 100%, 60% 60%, 50% 100%, 40% 60%, 20% 100%)",
                      backgroundColor: "#3f0d14",
                    }
                  : { boxShadow: "0 0 22px 4px rgba(245,215,142,0.55)" }
              }
            />
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide mb-4">
            PRECIOUS
          </h1>
          <p className="font-serif-elegant text-2xl md:text-3xl italic mb-6 opacity-80">
            Heaven's Brightest Angel
          </p>
          <p className="max-w-md text-sm md:text-base opacity-60 mb-10 tracking-wide">
            "Grace. Kindness. Elegance. Absolutely nothing suspicious."
          </p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <button
              onClick={() => scrollTo("about")}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-200 to-amber-100 text-slate-800 text-sm tracking-widest uppercase font-medium shadow-lg hover:shadow-amber-200/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              Meet Precious
            </button>
            <button
              onClick={() => scrollTo("registry")}
              className="px-7 py-3 rounded-full border border-current/30 text-sm tracking-widest uppercase font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              Angel Profile
            </button>
          </div>
        </Reveal>

        <Reveal className="flex-1 max-w-sm" delay={200}>
          <div
            className="relative rounded-[2rem] p-6 backdrop-blur-xl bg-white/40 border border-white/60 shadow-2xl"
            style={{ animation: "floatSlow 7s ease-in-out infinite" }}
          >
            <AngelIllustration />
          </div>
        </Reveal>
      </section>

      {/* ================= [SECTION: ABOUT] ================= */}
      <section id="about" className="relative z-10 px-6 md:px-16 py-20 max-w-5xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-14 tracking-wide">
            About Precious
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            ["Name", "Precious"],
            ["Occupation", "Guardian Angel"],
            ["Species", "Human"],
            ["Personality", "Gentle, kind, caring"],
          ].map(([label, val], i) => (
            <Reveal key={label} delay={i * 100}>
              <div className="h-full rounded-2xl p-6 backdrop-blur-xl bg-white/50 border border-white/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-2">{label}</p>
                <p className="font-serif-elegant text-lg md:text-xl">{val}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300} className="mt-5">
          <div className="rounded-2xl p-6 backdrop-blur-xl bg-white/50 border border-white/60 shadow-md">
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-3">Personality Traits</p>
            <div className="flex flex-wrap gap-2">
              {["Gentle", "Kind", "Caring", "Patient", "Friendly", "Always brings positivity"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/70 text-xs tracking-wide border border-white/80">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= [SECTION: QUALITIES] ================= */}
      <section className="relative z-10 px-6 md:px-16 py-20 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-14 tracking-wide">
            Heavenly Qualities
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {QUALITIES.map((q, i) => (
            <Reveal key={q.title} delay={i * 100}>
              <div className="h-full rounded-2xl p-8 text-center backdrop-blur-xl bg-white/50 border border-white/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">{q.icon}</div>
                <h3 className="font-display text-lg mb-2">{q.title}</h3>
                <p className="text-sm opacity-60">{q.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= [SECTION: GALLERY] ================= */}
      <section className="relative z-10 px-6 md:px-16 py-20 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-14 tracking-wide">
            Gallery
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] backdrop-blur-xl bg-white/40 border border-white/60 shadow-md">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <div className="w-2/3 h-2/3 opacity-80">
                    <AngelIllustration />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 text-white text-sm font-serif-elegant italic drop-shadow">
                  {g.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= [SECTION: TESTIMONIALS] ================= */}
      <section className="relative z-10 px-6 md:px-16 py-20 max-w-5xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-14 tracking-wide">
            Testimonials
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="h-full rounded-2xl p-7 backdrop-blur-xl bg-white/50 border border-white/60 shadow-md">
                <p className="text-amber-500 mb-3 tracking-widest">★★★★★</p>
                <p className="font-serif-elegant text-lg italic opacity-80">"{t}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= [SECTION: REGISTRY] ================= */}
      <section id="registry" className="relative z-10 px-6 md:px-16 py-20 max-w-4xl mx-auto">
        <Reveal>
          <div className="rounded-3xl p-8 md:p-10 backdrop-blur-xl bg-white/50 border border-white/60 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
              <h2 className="font-display text-2xl md:text-3xl tracking-wide">
                Official Heavenly Registry
              </h2>
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300/60">
                Verified Angel
              </span>
            </div>
            <p className="text-xs opacity-50 mb-8 italic">
              Verification currently undergoing routine celestial audit.
            </p>

            <div className="space-y-6">
              {REGISTRY_STATS.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className={s.suspicious ? "text-rose-600 font-medium" : "opacity-70"}>
                      {s.label}
                    </span>
                    <span className={s.suspicious ? "text-rose-600 font-medium" : "opacity-70"}>
                      {s.suspicious ? s.tag : `${s.value}%`}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200/60 overflow-hidden">
                    {s.suspicious ? (
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600"
                        style={{ width: "35%", animation: "pulseGlow 2s ease-in-out infinite" }}
                      />
                    ) : (
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-400"
                        style={{ width: `${s.value}%` }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= [SECTION: INVESTIGATION] ================= */}
      <section className="relative z-10 px-6 md:px-16 py-20 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-4 tracking-wide">
            Investigation Records
          </h2>
          <p className="text-center text-xs uppercase tracking-widest opacity-40 mb-14">
            Filed by the Office of Celestial Oversight
          </p>
        </Reveal>
        <div className="space-y-5">
          {REPORTS.map((r, i) => (
            <Reveal key={r.id} delay={i * 100}>
              <div className="rounded-2xl p-6 backdrop-blur-xl bg-white/50 border border-white/60 shadow-md flex gap-5">
                <div className="font-display text-sm opacity-40 shrink-0 pt-0.5">
                  Report #{r.id}
                </div>
                <div>
                  <p className="text-sm md:text-base mb-1">{r.body}</p>
                  <p className="text-xs italic opacity-50">{r.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= [SECTION: SCANNER] ================= */}
      <section
        id="scanner"
        ref={scannerRef}
        className="relative z-10 px-6 md:px-16 py-24 max-w-3xl mx-auto"
      >
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12 tracking-wide">
            Celestial Verification Scanner
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-2xl p-8 bg-slate-900 border border-slate-700 shadow-2xl font-mono text-emerald-300 text-sm">
            <p className="mb-3 opacity-70">
              &gt; Scanning{scanActive ? "..." : ""}
            </p>
            <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden mb-5">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                style={{
                  width: scanActive ? "100%" : "0%",
                  transition: "width 4.4s linear",
                }}
              />
            </div>
            <p className="opacity-80 h-5">
              {scanActive ? SCAN_LINES[scanIndex] : "Awaiting subject..."}
            </p>
            <p className="mt-4 text-[11px] opacity-40 italic">
              Cross-checking Philippine Mythological Database...
            </p>
          </div>
        </Reveal>
      </section>

      {/* ================= [SECTION: FINAL REVEAL] ================= */}
      <section
        ref={finalRevealRef}
        className="relative z-10 px-6 md:px-16 py-28 max-w-3xl mx-auto"
      >
        <div
          className={`rounded-3xl p-8 md:p-12 border shadow-2xl transition-all duration-[1500ms] ${
            revealed
              ? "bg-black/40 border-rose-700/50 opacity-100 scale-100"
              : "bg-white/40 border-white/50 opacity-40 scale-95"
          }`}
        >
          <p className="text-center font-mono text-xs tracking-[0.3em] mb-6 opacity-70">
            ======================== <br />
            IDENTITY VERIFIED <br />
            ========================
          </p>
          <div className="grid sm:grid-cols-2 gap-5 text-sm">
            {[
              ["Subject Name", "PRECIOUS"],
              ["Actual Species", "MANANANGGAL"],
              ["Alias", '"Heaven\'s Brightest Angel"'],
              ["Occupation", "Professional Angel Impersonator"],
              ["Current Status", "Still convincing everyone she's innocent."],
              ["Last Confirmed Activity", "Flying around after midnight."],
            ].map(([label, val]) => (
              <div key={label} className={revealed ? "border-b border-rose-800/40 pb-3" : "border-b border-slate-300/40 pb-3"}>
                <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">{label}</p>
                <p className="font-serif-elegant text-lg">{val}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4">
            <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Threat Level</p>
            <p className="font-serif-elegant text-lg">
              Mostly Harmless{" "}
              <span className="italic text-sm opacity-70">
                (unless you're outside at 2:00 AM)
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ================= [SECTION: EVIDENCE] ================= */}
      <section className="relative z-10 px-6 md:px-16 py-20 max-w-3xl mx-auto">
        <Reveal>
          <h2 className={`font-display text-3xl md:text-4xl text-center mb-12 tracking-wide ${revealed ? "text-rose-200" : ""}`}>
            Evidence Collected
          </h2>
        </Reveal>
        <div className="space-y-3">
          {EVIDENCE.map((e, i) => (
            <Reveal key={e} delay={i * 80}>
              <div
                className={`rounded-xl px-5 py-4 border flex gap-3 items-start ${
                  revealed
                    ? "bg-rose-950/40 border-rose-800/50"
                    : "bg-white/50 border-white/60"
                }`}
              >
                <span className={revealed ? "text-rose-400" : "text-emerald-500"}>✓</span>
                <span className="text-sm md:text-base opacity-90">{e}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= [SECTION: ANNOUNCEMENT] ================= */}
      <section className="relative z-10 px-6 md:px-16 py-20 max-w-3xl mx-auto">
        <Reveal>
          <div
            className={`rounded-2xl p-8 border-2 shadow-xl ${
              revealed
                ? "bg-rose-950/50 border-rose-600/60"
                : "bg-amber-50 border-amber-400/60"
            }`}
          >
            <p className="text-center font-display text-sm md:text-base tracking-widest mb-6">
              ⚠️ DEPARTMENT OF MYTHOLOGICAL AFFAIRS ⚠️
            </p>
            <p className="text-sm md:text-base opacity-90 mb-4 leading-relaxed">
              Following an extensive investigation, we have concluded that Precious has
              successfully disguised herself as an angel.
            </p>
            <p className="text-sm opacity-70 mb-1">Please remain calm.</p>
            <p className="text-sm opacity-70 mb-4">Do not panic.</p>
            <p className="text-sm opacity-90 mb-2">
              If the subject says: <span className="italic">"I'm just an angel."</span>
            </p>
            <p className="text-sm opacity-70 mb-6">
              Authorities recommend politely pretending to believe her.
            </p>
            <p className="text-xs uppercase tracking-widest opacity-50">
              Case Status: <span className="font-medium">Closed.</span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ================= [SECTION: APPEAL] ================= */}
      <section className="relative z-10 px-6 md:px-16 py-16 max-w-3xl mx-auto text-center">
        <Reveal>
          <button
            onClick={() => setAppealOpen(true)}
            className={`px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${
              revealed
                ? "bg-gradient-to-r from-rose-700 to-rose-900 text-rose-50"
                : "bg-gradient-to-r from-amber-200 to-amber-100 text-slate-800"
            }`}
          >
            Appeal Investigation Results
          </button>
        </Reveal>
      </section>

      {appealOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
          onClick={() => setAppealOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-sm w-full rounded-2xl p-8 bg-[#1a0509] border border-rose-700/50 shadow-2xl text-center text-rose-50"
          >
            <h3 className="font-display text-xl mb-4 tracking-wide">Appeal Denied.</h3>
            <p className="text-sm opacity-80 mb-6">
              TANGA KA BA MANANANGGAL KA NA NGA ITATANGGI MO PA
            </p>
            <button
              onClick={() => setAppealOpen(false)}
              className="px-6 py-2 rounded-full border border-rose-500/50 text-xs uppercase tracking-widest hover:bg-rose-900/40 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= [SECTION: FOOTER] ================= */}
      <footer
        className={`relative z-10 px-6 md:px-16 py-12 text-center text-xs tracking-widest ${
          revealed ? "text-rose-300/60" : "text-slate-500/70"
        }`}
      >
        <p>© 2026 Department of Mythological Affairs</p>
        <p>Official Angel Verification Program</p>
        <p className="mt-1">
          Case Closed. <span className="italic opacity-70">(Subject still denies everything.)</span>
        </p>
      </footer>
    </div>
  );
}
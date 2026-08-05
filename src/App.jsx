import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Camera,
  Download,
  RefreshCw,
  Sparkles,
  Heart,
  Image as ImageIcon,
  Loader,
  ChevronRight,
  Check,
  X,
  Aperture,
} from "lucide-react";

/**
 * ------------------------------------------------------------------
 *  Life•Four Booth — a single-file photo booth experience
 * ------------------------------------------------------------------
 *  Flow: landing -> theme -> camera (4x countdown+capture) -> generating -> strip
 *  Everything (state, camera handling, canvas compositing, UI) lives
 *  in this one component per the project constraints.
 * ------------------------------------------------------------------
 */

// ---------------------------------------------------------------------------
// Theme definitions — each theme drives both the on-screen UI accent and the
// final composited strip (background, border color, text color, stickers).
// ---------------------------------------------------------------------------
const THEMES = [
  {
    id: "pinkCafe",
    name: "Pink Café",
    tagline: "warm blush & latte foam",
    gradient: "from-rose-200 via-pink-100 to-fuchsia-100",
    accent: "#fb7185",
    accentSoft: "#ffe4e9",
    stripBg: "#fff6f8",
    stripBg2: "#ffeef2",
    textColor: "#7a2e43",
    decorations: ["♡", "✧", "☕"],
    swatch: ["#fda4af", "#fbcfe8", "#fb7185"],
  },
  {
    id: "sakura",
    name: "Sakura",
    tagline: "cherry blossoms in bloom",
    gradient: "from-pink-100 via-rose-50 to-pink-200",
    accent: "#f472b6",
    accentSoft: "#fce7f3",
    stripBg: "#fff0f6",
    stripBg2: "#ffe4ef",
    textColor: "#831843",
    decorations: ["🌸", "✧", "♡"],
    swatch: ["#f9a8d4", "#fce7f3", "#f472b6"],
  },
  {
    id: "retroFilm",
    name: "Retro Film",
    tagline: "sun-warmed 35mm nostalgia",
    gradient: "from-amber-100 via-orange-50 to-yellow-100",
    accent: "#d97706",
    accentSoft: "#fef3c7",
    stripBg: "#fdf4e3",
    stripBg2: "#fbe8c8",
    textColor: "#78350f",
    decorations: ["✦", "★", "●"],
    swatch: ["#fbbf24", "#fde68a", "#b45309"],
  },
  {
    id: "cloudySky",
    name: "Cloudy Sky",
    tagline: "soft blue afternoons",
    gradient: "from-sky-100 via-blue-50 to-indigo-100",
    accent: "#60a5fa",
    accentSoft: "#e0f2fe",
    stripBg: "#f0f7ff",
    stripBg2: "#e3efff",
    textColor: "#1e3a5f",
    decorations: ["☁", "✧", "☀"],
    swatch: ["#93c5fd", "#bfdbfe", "#3b82f6"],
  },
  {
    id: "minimalBlack",
    name: "Minimal Black",
    tagline: "clean, quiet, timeless",
    gradient: "from-gray-200 via-gray-100 to-gray-300",
    accent: "#111827",
    accentSoft: "#f3f4f6",
    stripBg: "#fafafa",
    stripBg2: "#efefef",
    textColor: "#111827",
    decorations: ["•", "—", "◦"],
    swatch: ["#111827", "#6b7280", "#e5e7eb"],
  },
];

const ENCOURAGEMENTS = [
  "Smile!",
  "Looking good!",
  "One more!",
  "You're doing great!",
  "Perfect!",
  "Keep smiling!",
  "Awesome!",
  "Model mode activated!",
  "So cute!",
  "Nailed it!",
];

const TOTAL_PHOTOS = 4;
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function App() {
  // -------------------------------------------------------------------
  // Core flow state
  // -------------------------------------------------------------------
  const [step, setStep] = useState("landing"); // landing | theme | camera | generating | strip
  const [themeId, setThemeId] = useState("pinkCafe");
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  // -------------------------------------------------------------------
  // Camera / capture state
  // -------------------------------------------------------------------
  const [cameraError, setCameraError] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [photos, setPhotos] = useState([]); // array of dataURLs, up to 4
  const [photoIndex, setPhotoIndex] = useState(0);
  const [countdown, setCountdown] = useState(null); // 3,2,1 or null
  const [flash, setFlash] = useState(false);
  const [shutterPulse, setShutterPulse] = useState(false);
  const [message, setMessage] = useState("Get ready!");
  const [isDownloading, setIsDownloading] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const captureCanvasRef = useRef(null); // hidden canvas used to grab a video frame
  const sequenceRunningRef = useRef(false);

  // -------------------------------------------------------------------
  // Camera lifecycle
  // -------------------------------------------------------------------
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraReady(true);
      return true;
    } catch (err) {
      setCameraError(
        "We couldn't access your camera. Please allow camera permissions and try again."
      );
      setCameraReady(false);
      return false;
    }
  }, []);

  useEffect(() => {
    // Clean up the camera stream whenever the component unmounts entirely.
    return () => stopCamera();
  }, [stopCamera]);

  // -------------------------------------------------------------------
  // Grab a single frame from the live video, cropped to a 4:3 photo.
  // -------------------------------------------------------------------
  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas) return;

    const targetRatio = 4 / 3;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;

    let sx, sy, sw, sh;
    const currentRatio = vw / vh;
    if (currentRatio > targetRatio) {
      // video is wider than 4:3 -> crop the sides
      sh = vh;
      sw = vh * targetRatio;
      sx = (vw - sw) / 2;
      sy = 0;
    } else {
      // video is taller than 4:3 -> crop top/bottom
      sw = vw;
      sh = vw / targetRatio;
      sx = 0;
      sy = (vh - sh) / 2;
    }

    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    // mirror horizontally so the captured photo matches the mirrored preview
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPhotos((prev) => [...prev, dataUrl]);
  }, []);

  // -------------------------------------------------------------------
  // The 4-photo capture sequence: countdown -> flash -> capture -> pause
  // -------------------------------------------------------------------
  useEffect(() => {
    if (step !== "camera" || !cameraReady) return;
    if (sequenceRunningRef.current) return;
    sequenceRunningRef.current = true;
    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < TOTAL_PHOTOS; i++) {
        if (cancelled) break;
        setPhotoIndex(i);
        setMessage(pick(ENCOURAGEMENTS));
        await sleep(400);

        for (let c = 3; c >= 1; c--) {
          if (cancelled) break;
          setCountdown(c);
          await sleep(1000);
        }
        if (cancelled) break;

        setCountdown(null);
        setShutterPulse(true);
        setFlash(true);
        capturePhoto();
        await sleep(180);
        setFlash(false);
        await sleep(120);
        setShutterPulse(false);
        await sleep(500);
      }
      if (!cancelled) {
        setStep("generating");
      }
      sequenceRunningRef.current = false;
    };

    run();
    return () => {
      cancelled = true;
      sequenceRunningRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, cameraReady]);

  // Generating screen: brief pause, then reveal the strip.
  useEffect(() => {
    if (step !== "generating") return;
    const t = setTimeout(() => setStep("strip"), 1100);
    return () => clearTimeout(t);
  }, [step]);

  // -------------------------------------------------------------------
  // Navigation handlers
  // -------------------------------------------------------------------
  const goToTheme = () => setStep("theme");

  const beginBooth = async () => {
    setPhotos([]);
    setPhotoIndex(0);
    const ok = await startCamera();
    if (ok) setStep("camera");
  };

  const retake = () => {
    setPhotos([]);
    setPhotoIndex(0);
    setCountdown(null);
    if (!streamRef.current) {
      startCamera().then((ok) => ok && setStep("camera"));
    } else {
      setStep("camera");
    }
  };

  const startOver = () => {
    stopCamera();
    setPhotos([]);
    setPhotoIndex(0);
    setCountdown(null);
    setStep("landing");
  };

  // -------------------------------------------------------------------
  // Build & download the final composited strip as a PNG using canvas.
  // -------------------------------------------------------------------
  const downloadStrip = async () => {
    if (photos.length < TOTAL_PHOTOS) return;
    setIsDownloading(true);
    await sleep(50); // let the UI paint the loading state first

    const scale = 2; // render at 2x for crisp downloads
    const width = 360 * scale;
    const padding = 24 * scale;
    const photoW = width - padding * 2;
    const photoH = photoW * 0.75; // 4:3
    const gap = 16 * scale;
    const footerH = 92 * scale;
    const perfR = 3 * scale;
    const height = padding + TOTAL_PHOTOS * photoH + (TOTAL_PHOTOS - 1) * gap + padding + footerH;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, theme.stripBg);
    bgGrad.addColorStop(1, theme.stripBg2);
    roundRect(ctx, 0, 0, width, height, 20 * scale);
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // outer border
    ctx.lineWidth = 2 * scale;
    ctx.strokeStyle = theme.accent;
    roundRect(ctx, 1 * scale, 1 * scale, width - 2 * scale, height - 2 * scale, 20 * scale);
    ctx.stroke();

    // perforation dots along top & bottom edges (mimics real strip stock)
    ctx.fillStyle = "#ffffff";
    const dotGap = 14 * scale;
    for (let x = padding; x < width - padding; x += dotGap) {
      ctx.beginPath();
      ctx.arc(x, 10 * scale, perfR, 0, Math.PI * 2);
      ctx.fill();
    }

    // photos, loaded sequentially
    for (let i = 0; i < TOTAL_PHOTOS; i++) {
      const img = await loadImage(photos[i]);
      const y = padding + i * (photoH + gap);
      ctx.save();
      roundRect(ctx, padding, y, photoW, photoH, 10 * scale);
      ctx.clip();
      ctx.drawImage(img, padding, y, photoW, photoH);
      ctx.restore();

      ctx.lineWidth = 1.5 * scale;
      ctx.strokeStyle = theme.accentSoft;
      roundRect(ctx, padding, y, photoW, photoH, 10 * scale);
      ctx.stroke();

      // tiny corner sticker decoration
      ctx.fillStyle = theme.accent;
      ctx.font = `${14 * scale}px system-ui, sans-serif`;
      ctx.fillText(theme.decorations[i % theme.decorations.length], padding + photoW - 20 * scale, y + 20 * scale);
    }

    // footer: theme name, date, made-with-love
    const footerTop = padding + TOTAL_PHOTOS * photoH + (TOTAL_PHOTOS - 1) * gap + 14 * scale;
    ctx.fillStyle = theme.textColor;
    ctx.textAlign = "center";
    ctx.font = `600 ${13 * scale}px system-ui, sans-serif`;
    const dateStr = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    ctx.fillText(`${theme.name} · ${dateStr}`, width / 2, footerTop + 6 * scale);

    ctx.font = `${11 * scale}px system-ui, sans-serif`;
    ctx.fillStyle = theme.accent;
    ctx.fillText("Made with ❤ at the Photo Booth", width / 2, footerTop + 26 * scale);

    // scattered theme decorations along the very bottom
    ctx.font = `${12 * scale}px system-ui, sans-serif`;
    const deco = theme.decorations;
    const bottomY = height - 14 * scale;
    for (let i = 0; i < 5; i++) {
      const x = padding + (i * (photoW - 10 * scale)) / 4;
      ctx.fillStyle = theme.accent;
      ctx.fillText(deco[i % deco.length], x, bottomY);
    }

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `photobooth-${theme.id}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsDownloading(false);
  };

  // ===================================================================
  // RENDER
  // ===================================================================
  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${theme.gradient} relative overflow-hidden transition-colors duration-700 flex items-center justify-center p-4`}
    >
      <FloatingBlobs accent={theme.accent} />

      {/* hidden canvas used purely to grab video frames */}
      <canvas ref={captureCanvasRef} className="hidden" />

      {step === "landing" && <Landing onStart={goToTheme} />}

      {step === "theme" && (
        <ThemePicker
          themes={THEMES}
          selected={themeId}
          onSelect={setThemeId}
          onConfirm={beginBooth}
          error={cameraError}
        />
      )}

      {step === "camera" && (
        <CameraScreen
          theme={theme}
          videoRef={videoRef}
          photoIndex={photoIndex}
          countdown={countdown}
          flash={flash}
          shutterPulse={shutterPulse}
          message={message}
          photos={photos}
        />
      )}

      {step === "generating" && <Generating theme={theme} />}

      {step === "strip" && (
        <StripResult
          theme={theme}
          photos={photos}
          onDownload={downloadStrip}
          onRetake={retake}
          onStartOver={startOver}
          isDownloading={isDownloading}
        />
      )}
    </div>
  );
}

// =====================================================================
// Screen: Landing
// =====================================================================
function Landing({ onStart }) {
  return (
    <div className="relative z-10 max-w-md w-full text-center animate-[fadeIn_0.6s_ease-out]">
      <div className="mx-auto mb-6 w-28 h-28 rounded-full bg-white/70 backdrop-blur-sm shadow-xl flex items-center justify-center animate-[scaleIn_0.5s_ease-out]">
        <div className="relative">
          <Camera className="w-14 h-14 text-rose-500" strokeWidth={1.6} />
          <Sparkles className="w-5 h-5 text-fuchsia-400 absolute -top-2 -right-3 animate-pulse" />
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-rose-900 mb-2 drop-shadow-sm">
        Life • Four Booth
      </h1>
      <p className="text-rose-700/80 text-sm sm:text-base mb-10">
        Snap four candid frames and take home a keepsake strip — mall photo
        booth magic, right from your browser.
      </p>

      <button
        onClick={onStart}
        className="group inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-rose-300/50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
      >
        Start Photo Booth
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
      </button>

      <p className="mt-4 text-xs text-rose-700/60">
        We'll ask for camera access on the next step.
      </p>
    </div>
  );
}

// =====================================================================
// Screen: Theme picker
// =====================================================================
function ThemePicker({ themes, selected, onSelect, onConfirm, error }) {
  return (
    <div className="relative z-10 max-w-lg w-full animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
          Pick your strip style
        </h2>
        <p className="text-sm text-gray-500">You can always retake with a new mood</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {themes.map((t) => {
          const active = t.id === selected;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`relative rounded-2xl p-3 bg-white/80 backdrop-blur-sm border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 text-left ${
                active ? "shadow-lg -translate-y-1" : "shadow-sm"
              }`}
              style={{ borderColor: active ? t.accent : "transparent" }}
            >
              {active && (
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white shadow"
                  style={{ backgroundColor: t.accent }}
                >
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
              <div className="flex gap-1.5 mb-2">
                {t.swatch.map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-800">{t.name}</p>
              <p className="text-[11px] text-gray-500">{t.tagline}</p>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-center">
          {error}
        </div>
      )}

      <div className="text-center">
        <button
          onClick={onConfirm}
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black active:scale-95 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5"
        >
          <Camera className="w-4 h-4" />
          Start Photo Booth
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// Screen: Camera + countdown + capture
// =====================================================================
function CameraScreen({ theme, videoRef, photoIndex, countdown, flash, shutterPulse, message, photos }) {
  const progressPct = Math.min(photos.length, TOTAL_PHOTOS) / TOTAL_PHOTOS;
  // ring progress for the countdown circle (3 -> 0%, 1 -> ~66%)
  const ringPct = countdown ? (3 - countdown) / 3 : 0;
  const circumference = 2 * Math.PI * 44;

  return (
    <div className="relative z-10 max-w-md w-full animate-[fadeIn_0.5s_ease-out]">
      {/* flash overlay */}
      <div
        className={`fixed inset-0 bg-white pointer-events-none z-50 transition-opacity duration-150 ${
          flash ? "opacity-90" : "opacity-0"
        }`}
      />

      <div className="text-center mb-4">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-white/80 backdrop-blur-sm shadow-sm"
          style={{ color: theme.textColor }}
        >
          Photo {Math.min(photoIndex + 1, TOTAL_PHOTOS)} of {TOTAL_PHOTOS}
        </span>
        <div className="mt-2 w-full max-w-xs mx-auto h-1.5 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct * 100}%`, backgroundColor: theme.accent }}
          />
        </div>
      </div>

      <div
        className={`relative rounded-[28px] overflow-hidden bg-black shadow-2xl transition-transform duration-150 ${
          shutterPulse ? "scale-[0.98]" : "scale-100"
        }`}
        style={{ boxShadow: `0 25px 50px -12px ${theme.accent}55` }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full aspect-[4/3] object-cover -scale-x-100"
        />

        {/* countdown overlay */}
        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="44" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="4" />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - ringPct)}
                  className="transition-all duration-[1000ms] ease-linear"
                />
              </svg>
              <div
                key={countdown}
                className="absolute inset-0 flex items-center justify-center text-white text-5xl font-extrabold animate-[scaleIn_0.35s_ease-out]"
              >
                {countdown}
              </div>
            </div>
          </div>
        )}

        {/* encouraging message */}
        {!countdown && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <span
              key={message}
              className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold shadow animate-[fadeIn_0.3s_ease-out]"
              style={{ color: theme.textColor }}
            >
              {message}
            </span>
          </div>
        )}

        {/* shutter icon pulse in the corner for tactile feedback */}
        <div
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center transition-transform duration-150 ${
            shutterPulse ? "scale-125" : "scale-100"
          }`}
        >
          <Aperture className="w-4.5 h-4.5" style={{ color: theme.accent }} />
        </div>
      </div>

      {/* thumbnail strip of captured photos so far */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: TOTAL_PHOTOS }).map((_, i) => (
          <div
            key={i}
            className="w-14 h-11 rounded-lg overflow-hidden bg-white/60 border-2 flex items-center justify-center"
            style={{ borderColor: photos[i] ? theme.accent : "rgba(255,255,255,0.5)" }}
          >
            {photos[i] ? (
              <img src={photos[i]} alt={`shot ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-4 h-4 text-white/70" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// Screen: Generating
// =====================================================================
function Generating({ theme }) {
  return (
    <div className="relative z-10 text-center animate-[fadeIn_0.4s_ease-out]">
      <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm shadow-xl flex items-center justify-center">
        <Loader className="w-9 h-9 animate-spin" style={{ color: theme.accent }} />
      </div>
      <p className="text-lg font-semibold" style={{ color: theme.textColor }}>
        Generating your photo strip...
      </p>
      <p className="text-sm text-gray-500 mt-1">Adding a little sparkle ✧</p>
    </div>
  );
}

// =====================================================================
// Screen: Final strip result
// =====================================================================
function StripResult({ theme, photos, onDownload, onRetake, onStartOver, isDownloading }) {
  const dateStr = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative z-10 flex flex-col items-center gap-6 animate-[fadeIn_0.5s_ease-out] max-w-sm w-full">
      {/* the strip itself */}
      <div
        className="w-full max-w-[280px] rounded-2xl shadow-2xl p-4 pt-5 relative animate-[scaleIn_0.5s_ease-out]"
        style={{
          background: `linear-gradient(to bottom, ${theme.stripBg}, ${theme.stripBg2})`,
          border: `2px solid ${theme.accent}`,
        }}
      >
        {/* perforation dots */}
        <div className="absolute -top-1.5 left-0 right-0 flex justify-around px-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-white shadow" />
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          {photos.map((src, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden aspect-[4/3] shadow-sm"
              style={{ border: `1.5px solid ${theme.accentSoft}` }}
            >
              <img src={src} alt={`capture ${i + 1}`} className="w-full h-full object-cover" />
              <span
                className="absolute bottom-1 right-1.5 text-xs"
                style={{ color: theme.accent }}
              >
                {theme.decorations[i % theme.decorations.length]}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-3">
          <p className="text-xs font-semibold" style={{ color: theme.textColor }}>
            {theme.name} · {dateStr}
          </p>
          <p className="text-[10px] mt-0.5 flex items-center justify-center gap-1" style={{ color: theme.accent }}>
            Made with <Heart className="w-2.5 h-2.5 fill-current" /> at the Photo Booth
          </p>
        </div>
      </div>

      {/* controls */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[280px]">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="flex-1 inline-flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-full shadow-lg active:scale-95 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70"
          style={{ backgroundColor: theme.accent }}
        >
          {isDownloading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isDownloading ? "Saving..." : "Download Strip"}
        </button>
        <button
          onClick={onRetake}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-700 font-semibold px-5 py-3 rounded-full shadow active:scale-95 transition-all duration-200 hover:-translate-y-0.5"
        >
          <RefreshCw className="w-4 h-4" />
          Retake
        </button>
      </div>

      <button
        onClick={onStartOver}
        className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2 flex items-center gap-1"
      >
        <X className="w-3 h-3" />
        Start over with a new theme
      </button>
    </div>
  );
}

// =====================================================================
// Decorative floating blobs used across every screen for ambience
// =====================================================================
function FloatingBlobs({ accent }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 animate-[float1_8s_ease-in-out_infinite]"
        style={{ backgroundColor: accent, top: "-5%", left: "-8%" }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 animate-[float2_10s_ease-in-out_infinite]"
        style={{ backgroundColor: accent, bottom: "-10%", right: "-10%" }}
      />
      <div
        className="absolute w-56 h-56 rounded-full blur-3xl opacity-20 animate-[float1_12s_ease-in-out_infinite]"
        style={{ backgroundColor: "#ffffff", top: "40%", right: "10%" }}
      />
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.08); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 20px) scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// =====================================================================
// Canvas helper utilities
// =====================================================================
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
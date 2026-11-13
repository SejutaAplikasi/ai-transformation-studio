// app/generator/page.tsx - v4.0 FULL PREMIUM GATE
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  conditionsByNiche,
  recommendedSettings,
  recommendedObjects,
  viralHooks,
  isHookCompatible,
  materialOptions,
  detectProfile,
} from "@/lib/catalog";
import Modal from "@/components/Modal";
import {
  GeneratorInput,
  Storyboard,
  Niche,
  Duration,
  AspectRatio,
  InitialCondition,
  VisualStyle,
  ViralHook,
} from "@/types/prompt";
import {
  Copy,
  Check,
  Loader2,
  ArrowLeft,
  Sparkles,
  Smartphone,
  Monitor,
  Square,
  Lightbulb,
  Flame,
  Zap,
  Crown,
  Key,
  X,
  Home,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const PRODUCT_LINK = "https://lynk.id/sejutaaplikasi/p9kkozzjd8ew";

const niches: { value: Niche; label: string }[] = [
  { value: "restoration", label: "Restoration" },
  { value: "treasure", label: "Treasure Hunt" },
  { value: "construction", label: "Construction" },
  { value: "mini-world", label: "Mini World" },
  { value: "luxury", label: "Luxury Makeover" },
  { value: "evolution", label: "Creature Evolution" },
];

const durations: Duration[] = [10, 20, 30, 60];

const visualStyles: VisualStyle[] = [
  "Photorealistic",
  "Cinematic Realism",
  "3D Animation",
  "Pixar Style",
  "Disney Style",
  "Studio Ghibli",
  "Anime",
  "Manga",
  "Comic Book",
  "2D Animation",
  "Watercolor",
  "Oil Painting",
  "Stop Motion",
  "Claymation",
  "Lego Style",
  "Miniature Tilt-Shift",
  "Isometric 3D",
  "Pixel Art",
  "Retro 80s VHS",
  "Vintage Film 1970s",
  "Black & White Noir",
  "Cyberpunk Neon",
  "Steampunk",
  "Dark Fantasy",
  "Sci-Fi Futuristic",
  "Dreamlike Surreal",
  "Hyperrealistic Macro",
  "Documentary Style",
  "ASMR Visual",
  "Satisfying Cleaning",
  "Luxury Commercial",
];

const environments = [
  "Old Warehouse",
  "Abandoned Garage",
  "Attic",
  "Basement",
  "Beach",
  "Forest",
  "Junkyard",
  "Studio",
  "Ancient Ruins",
  "Open Field",
  "Desk Setup",
  "Luxury Workshop",
  "Mystical Forest",
];

const cameras = [
  "Macro Close-Up",
  "Drone",
  "Handheld",
  "Tracking Shot",
  "Cinema Lens",
];

const lightings = ["Golden Hour", "Studio", "Workshop", "Dramatic", "Natural"];

const aspectRatios: { value: AspectRatio; label: string; icon: typeof Smartphone }[] = [
  { value: "9:16", label: "9:16", icon: Smartphone },
  { value: "16:9", label: "16:9", icon: Monitor },
  { value: "1:1", label: "1:1", icon: Square },
];

export default function GeneratorPage() {
  // ===== PREMIUM STATE =====
  const [isPremium, setIsPremium] = useState(false);
  const [statusReady, setStatusReady] = useState(false);

  // ===== LOCK SCREEN STATE =====
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [premiumCodeInput, setPremiumCodeInput] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);

  // ===== FORM STATE =====
  const [autoProfile, setAutoProfile] = useState(true);
  const [input, setInput] = useState<GeneratorInput>({
    projectName: "",
    objectName: "",
    objectType: "Toy",
    material: "metal",
    condition: "Berkarat & Lapuk",
    environment: "Old Warehouse",
    niche: "restoration",
    duration: 30,
    aspectRatio: "9:16",
    style: "Satisfying Cleaning",
    camera: "Macro Close-Up",
    lighting: "Studio",
    detailLevel: "Extreme Detail",
    viralHook: "none",
  });

  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // ===== INIT: CEK STATUS PREMIUM + AUTO-REDEEM DARI URL =====
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        const s = await res.json();
        if (cancelled) return;
        setIsPremium(!!s.premium);
      } catch {
        /* biarkan default false */
      } finally {
        if (!cancelled) setStatusReady(true);
      }

      // Auto-aktivasi dari URL ?code= lalu bersihkan dari address bar
      const params = new URLSearchParams(window.location.search);
      const codeFromUrl = params.get("code");
      if (codeFromUrl) {
        window.history.replaceState(null, "", window.location.pathname);
        try {
          const res = await fetch("/api/redeem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: codeFromUrl }),
          });
          const r = await res.json();
          if (!cancelled && r.success) setIsPremium(true);
        } catch {
          /* abaikan */
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const currentConditions = useMemo(
    () => conditionsByNiche[input.niche] || [],
    [input.niche]
  );
  const currentRecommendation = recommendedSettings[input.niche];
  const currentViralHook = useMemo(
    () => viralHooks?.find((h) => h.value === input.viralHook),
    [input.viralHook]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "material") setAutoProfile(false);
    setInput((prev) => {
      const updated = { ...prev, [name]: value } as GeneratorInput;
      if (name === "niche") {
        const rec = recommendedSettings[value as Niche];
        if (rec) {
          updated.condition = rec.condition;
          updated.environment = rec.environment;
          updated.style = rec.style;
          updated.camera = rec.camera;
          updated.lighting = rec.lighting;
          updated.detailLevel = rec.detailLevel;
          updated.duration = rec.duration;
          updated.aspectRatio = rec.aspectRatio;
          if (
            updated.viralHook &&
            !isHookCompatible(updated.viralHook, value as Niche)
          )
            updated.viralHook = "none";
        }
      }
      if (name === "objectName" && autoProfile) {
        const detected = detectProfile(value);
        if (detected) {
          updated.material = detected.material;
          updated.objectType = detected.objectType;
        }
      }
      return updated;
    });
  };

  const handleObjectSelect = (obj: string) => {
    const detected = detectProfile(obj);
    setAutoProfile(true);
    setInput((prev) => ({
      ...prev,
      objectName: obj,
      material: detected?.material || prev.material,
      objectType: detected?.objectType || prev.objectType,
    }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.objectName || isLoading) return;
    setIsLoading(true);
    setErrorMsg("");
    try {
      const inputWithProjectName = {
        ...input,
        projectName: input.projectName.trim()
          ? input.projectName
          : `${input.objectName} - ${input.niche}${
              input.viralHook !== "none" ? ` [${input.viralHook}]` : ""
            }`,
      };
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputWithProjectName }),
      });
      const data = await res.json().catch(() => ({}));

      // Jika server tolak karena bukan premium (defense-in-depth)
      if (res.status === 401) {
        setIsPremium(false);
        setStatusReady(true);
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || "Gagal membuat prompt, coba lagi.");
        return;
      }

      setStoryboard(data.storyboard);
      setIsPremium(!!data.premium);
    } catch {
      setErrorMsg("Koneksi bermasalah, coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setErrorMsg("Gagal menyalin otomatis. Blok teks lalu salin manual.");
    }
  };

  const handleVerifyCode = async () => {
    if (!premiumCodeInput.trim()) return;
    setCodeLoading(true);
    setCodeMessage("");
    setCodeSuccess(false);
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: premiumCodeInput }),
      });
      const result = await res.json().catch(() => ({
        success: false,
        message: "Terjadi kesalahan",
      }));
      setCodeMessage(result.message || "");
      setCodeSuccess(!!result.success);
      if (result.success) {
        setIsPremium(true);
        setTimeout(() => {
          setShowCodeModal(false);
          setPremiumCodeInput("");
          setCodeMessage("");
          setCodeSuccess(false);
        }, 1500);
      }
    } catch {
      setCodeMessage("Koneksi bermasalah, coba lagi.");
      setCodeSuccess(false);
    } finally {
      setCodeLoading(false);
    }
  };

  // ===== LOCK SCREEN (tampil saat belum premium) =====
  if (statusReady && !isPremium) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header kecil */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <Home size={18} />
              <span className="text-sm">Beranda</span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck size={14} className="text-orange-400" />
              Premium Access
            </div>
          </div>

          {/* Card utama */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-orange-500/30 rounded-3xl p-8 text-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
                <Crown className="text-white" size={40} />
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">
                Akses Premium Diperlukan
              </h1>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                AI Transformation Studio adalah tool berbayar.
                <br />
                Masukkan kode yang Anda terima dari Lynk.id untuk mulai
                membuat storyboard viral.
              </p>

              {/* Input kode langsung (tanpa modal) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerifyCode();
                }}
                className="space-y-3"
              >
                <label htmlFor="premium-code" className="sr-only">
                  Kode premium
                </label>
                <input
                  id="premium-code"
                  type="text"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  value={premiumCodeInput}
                  onChange={(e) =>
                    setPremiumCodeInput(e.target.value.toUpperCase())
                  }
                  placeholder="ATS-XXXX-XXXX-XXXX"
                  className="w-full bg-slate-800 border border-yellow-500/30 rounded-xl px-4 py-3.5 text-center text-lg font-mono font-bold text-white focus:outline-none focus:border-yellow-500 tracking-widest placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  disabled={!premiumCodeInput.trim() || codeLoading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:bg-slate-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {codeLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Memverifikasi...
                    </>
                  ) : (
                    <>
                      <Key size={18} />
                      Aktifkan Kode
                    </>
                  )}
                </button>
              </form>

              {/* Pesan hasil verifikasi */}
              <div aria-live="polite" className="min-h-[20px] mt-3">
                {codeMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm font-medium ${
                      codeSuccess
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {codeMessage}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-xs text-slate-500">atau</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              {/* Tombol beli */}
              <a
                href={PRODUCT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Crown size={18} className="text-orange-400" />
                Beli Premium (Rp 49.000)
                <ArrowRight size={16} />
              </a>

              {/* Info tambahan */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-800/50 rounded-lg p-2.5">
                  <ShieldCheck
                    size={14}
                    className="text-green-400 mx-auto mb-1"
                  />
                  <div className="text-slate-300 font-medium">Lifetime</div>
                  <div className="text-slate-500 text-[10px]">
                    Sekali bayar
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2.5">
                  <Zap size={14} className="text-yellow-400 mx-auto mb-1" />
                  <div className="text-slate-300 font-medium">Unlimited</div>
                  <div className="text-slate-500 text-[10px]">Tanpa batas</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2.5">
                  <Flame size={14} className="text-orange-400 mx-auto mb-1" />
                  <div className="text-slate-300 font-medium">All Features</div>
                  <div className="text-slate-500 text-[10px]">60s + Hooks</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-600 mt-6">
            Sudah punya kode tapi error? Hubungi support via WhatsApp di
            halaman Lynk.id.
          </p>
        </div>
      </div>
    );
  }

  // ===== GENERATOR NORMAL (hanya untuk user premium) =====
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Transformation Studio
          </h1>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <Crown size={12} /> PREMIUM
            </div>
            <button
              type="button"
              onClick={() => setShowCodeModal(true)}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 transition"
            >
              <Key size={12} /> Ganti Kode
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORM */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Sparkles className="text-blue-400" size={20} />
            Konfigurasi Project
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Aspect Ratio */}
            <div>
              <span
                id="ratio-label"
                className="block text-sm text-slate-400 mb-2"
              >
                Format Layar (Ratio)
              </span>
              <div
                className="grid grid-cols-3 gap-2"
                role="group"
                aria-labelledby="ratio-label"
              >
                {aspectRatios.map((ratio) => {
                  const Icon = ratio.icon;
                  const isActive = input.aspectRatio === ratio.value;
                  return (
                    <button
                      key={ratio.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        setInput({ ...input, aspectRatio: ratio.value })
                      }
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition ${
                        isActive
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium">{ratio.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Name */}
            <div>
              <label
                htmlFor="field-projectName"
                className="block text-sm text-slate-400 mb-1"
              >
                Nama Project (Optional)
              </label>
              <input
                id="field-projectName"
                name="projectName"
                value={input.projectName}
                onChange={handleChange}
                placeholder="Contoh: Restorasi Porsche 911"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Object Name */}
            <div>
              <label
                htmlFor="field-objectName"
                className="block text-sm text-slate-400 mb-1"
              >
                Nama Mainan / Objek *
              </label>
              <input
                id="field-objectName"
                name="objectName"
                value={input.objectName}
                onChange={handleChange}
                placeholder={`Contoh: ${recommendedObjects[input.niche][0]}`}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-slate-500 self-center mr-1">
                  Saran:
                </span>
                {recommendedObjects[input.niche].map((obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => handleObjectSelect(obj)}
                    className={`text-xs border px-3 py-1.5 rounded-full transition flex items-center gap-1 ${
                      input.objectName === obj
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-slate-800 hover:bg-blue-900/40 border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-300"
                    }`}
                  >
                    <Sparkles
                      size={12}
                      className={
                        input.objectName === obj ? "text-white" : "text-blue-400"
                      }
                    />
                    {obj}
                  </button>
                ))}
              </div>
            </div>

            {/* Viral Hook */}
            {viralHooks && viralHooks.length > 0 && (
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl p-4">
                <label
                  htmlFor="field-viralHook"
                  className="block text-sm font-bold text-orange-300 mb-2 flex items-center gap-2"
                >
                  <Flame size={16} className="text-orange-400" />
                  Viral Hook (Pola Viral YouTube)
                  <Zap size={14} className="text-yellow-400" />
                </label>
                <select
                  id="field-viralHook"
                  name="viralHook"
                  value={input.viralHook}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-orange-500/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-white font-medium"
                >
                  {viralHooks.map((hook) => (
                    <option
                      key={hook.value}
                      value={hook.value}
                      disabled={!isHookCompatible(hook.value, input.niche)}
                    >
                      {hook.icon} {hook.label} - {hook.description}
                      {!isHookCompatible(hook.value, input.niche)
                        ? " (tidak cocok untuk niche ini)"
                        : ""}
                    </option>
                  ))}
                </select>
                {currentViralHook && currentViralHook.value !== "none" && (
                  <div className="mt-3 bg-slate-900/50 rounded-lg p-3 border border-orange-500/20">
                    <p className="text-xs text-orange-200">
                      <span className="font-bold">
                        {currentViralHook.icon} {currentViralHook.label}:
                      </span>{" "}
                      {currentViralHook.description}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Best for:{" "}
                      {currentViralHook.bestFor?.join(", ") || "All niches"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Material */}
            <div>
              <label
                htmlFor="field-material"
                className="block text-sm text-slate-400 mb-1"
              >
                Material Objek *
              </label>
              <select
                id="field-material"
                name="material"
                value={input.material}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {materialOptions.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1">
                {autoProfile
                  ? "Otomatis mengikuti nama objek. Ubah manual jika kurang pas."
                  : "Dipilih manual."}
              </p>
            </div>

            {/* Niche & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="field-niche"
                  className="block text-sm text-slate-400 mb-1"
                >
                  Niche
                </label>
                <select
                  id="field-niche"
                  name="niche"
                  value={input.niche}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  {niches.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="field-duration"
                  className="block text-sm text-slate-400 mb-1"
                >
                  Durasi
                </label>
                <select
                  id="field-duration"
                  name="duration"
                  value={input.duration}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      duration: Number(e.target.value) as Duration,
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  {durations.map((d) => (
                    <option key={d} value={d}>
                      {d} Detik ({d / 10} Klip)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label
                htmlFor="field-condition"
                className="block text-sm text-slate-400 mb-1"
              >
                Kondisi Awal
              </label>
              <select
                id="field-condition"
                name="condition"
                value={input.condition}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {currentConditions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Style */}
            <div>
              <label
                htmlFor="field-style"
                className="block text-sm text-slate-400 mb-1"
              >
                Gaya Visual / Style
              </label>
              <select
                id="field-style"
                name="style"
                value={input.style}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {visualStyles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Environment & Camera */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="field-environment"
                  className="block text-sm text-slate-400 mb-1"
                >
                  Lingkungan
                </label>
                <select
                  id="field-environment"
                  name="environment"
                  value={input.environment}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  {environments.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="field-camera"
                  className="block text-sm text-slate-400 mb-1"
                >
                  Gaya Kamera
                </label>
                <select
                  id="field-camera"
                  name="camera"
                  value={input.camera}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  {cameras.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lighting */}
            <div>
              <label
                htmlFor="field-lighting"
                className="block text-sm text-slate-400 mb-1"
              >
                Pencahayaan
              </label>
              <select
                id="field-lighting"
                name="lighting"
                value={input.lighting}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {lightings.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Rekomendasi */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-yellow-400" size={20} />
                <h3 className="font-semibold text-white">
                  Rekomendasi Setting Optimal
                </h3>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Untuk niche{" "}
                <span className="text-blue-400 font-semibold">
                  {input.niche}
                </span>
                :
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-800/50 rounded px-2 py-1">
                  <span className="text-slate-500">Durasi:</span>{" "}
                  <span className="text-white">
                    {currentRecommendation.duration}s
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1">
                  <span className="text-slate-500">Ratio:</span>{" "}
                  <span className="text-white">
                    {currentRecommendation.aspectRatio}
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1">
                  <span className="text-slate-500">Style:</span>{" "}
                  <span className="text-white">
                    {currentRecommendation.style}
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1">
                  <span className="text-slate-500">Camera:</span>{" "}
                  <span className="text-white">
                    {currentRecommendation.camera}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const rec = currentRecommendation;
                  setInput((prev) => ({
                    ...prev,
                    duration: rec.duration,
                    aspectRatio: rec.aspectRatio,
                    condition: rec.condition,
                    environment: rec.environment,
                    style: rec.style,
                    camera: rec.camera,
                    lighting: rec.lighting,
                    detailLevel: rec.detailLevel,
                  }));
                }}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition"
              >
                Terapkan Rekomendasi
              </button>
            </div>

            {/* Tombol Generate */}
            <button
              type="submit"
              disabled={isLoading || !input.objectName}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 mt-6 shadow-lg shadow-orange-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Membuat prompt...
                </>
              ) : (
                <>
                  <Flame size={20} />
                  GENERATE VIRAL HOOK
                </>
              )}
            </button>

            {errorMsg && (
              <div
                role="alert"
                className="mt-3 p-3 rounded-lg text-sm bg-red-500/20 text-red-400 border border-red-500/30"
              >
                {errorMsg}
              </div>
            )}
          </form>
        </section>

        {/* HASIL */}
        <section className="space-y-4">
          {!storyboard && !isLoading && (
            <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 min-h-[400px] flex flex-col items-center justify-center">
              <Flame
                size={48}
                className="mb-4 opacity-50 text-orange-500"
              />
              <p className="text-lg">Hasil storyboard viral akan muncul di sini</p>
              <p className="text-sm mt-2">
                Pilih Viral Hook + isi form + Generate
              </p>
            </div>
          )}

          {isLoading && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
              <Loader2
                className="animate-spin text-orange-500 mb-4"
                size={48}
              />
              <p className="text-lg text-slate-300">Menyusun klip 10 detik...</p>
            </div>
          )}

          {storyboard && !isLoading && (
            <>
              <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  {currentViralHook?.icon}{" "}
                  {storyboard.projectName || input.objectName}
                </h3>
                <div className="flex gap-4 text-sm text-slate-400 flex-wrap">
                  <span>
                    Durasi:{" "}
                    <span className="text-white">
                      {storyboard.totalDuration}s
                    </span>
                  </span>
                  <span>
                    Klip:{" "}
                    <span className="text-white">
                      {storyboard.scenes.length}
                    </span>
                  </span>
                  <span>
                    Ratio:{" "}
                    <span className="text-white">
                      {storyboard.aspectRatio}
                    </span>
                  </span>
                  {currentViralHook && (
                    <span>
                      Hook:{" "}
                      <span className="text-orange-400">
                        {currentViralHook.label}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {storyboard.notes && storyboard.notes.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-sm text-amber-200 space-y-1">
                  {storyboard.notes.map((n, i) => (
                    <p key={i}>• {n}</p>
                  ))}
                </div>
              )}

              {storyboard.scenes.map((scene) => (
                <div
                  key={scene.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative"
                >
                  <div className="flex justify-between items-start mb-3 pr-12">
                    <div>
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                        Klip {scene.id}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">
                        {scene.title}
                      </h4>
                    </div>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                      {scene.duration}s
                    </span>
                  </div>
                  {scene.method && (
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`px-2 py-1 rounded font-bold ${
                          scene.method === "extend"
                            ? "bg-green-500/20 text-green-300"
                            : scene.method === "chain"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {scene.method === "extend"
                          ? "EXTEND"
                          : scene.method === "chain"
                          ? "FRAME CHAIN"
                          : "KLIP BARU"}
                      </span>
                      <span className="text-slate-400">{scene.tip}</span>
                    </div>
                  )}
                  <p className="text-slate-300 leading-relaxed mb-4 font-mono text-sm bg-slate-950/50 p-3 rounded-lg border border-slate-800 whitespace-pre-wrap">
                    {scene.description}
                  </p>
                  <button
                    type="button"
                    aria-label={`Salin prompt klip ${scene.id}`}
                    onClick={() => handleCopy(scene.description, scene.id)}
                    className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
                  >
                    {copiedId === scene.id ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                  {(scene.startFrame || scene.endFrame) && (
                    <details className="mt-3 text-xs text-slate-400">
                      <summary className="cursor-pointer hover:text-slate-200">
                        Prompt keyframe (opsional, untuk frame awal/akhir)
                      </summary>
                      <div className="mt-2 space-y-2">
                        {scene.startFrame && (
                          <p>
                            <span className="font-bold text-slate-300">
                              Frame awal:
                            </span>{" "}
                            {scene.startFrame}
                          </p>
                        )}
                        {scene.endFrame && (
                          <p>
                            <span className="font-bold text-slate-300">
                              Frame akhir:
                            </span>{" "}
                            {scene.endFrame}
                          </p>
                        )}
                      </div>
                    </details>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const allText = storyboard.scenes
                    .map(
                      (s) =>
                        `CLIP ${s.id} [${s.method ?? "start"}]: ${s.title}\n${s.description}`
                    )
                    .join("\n\n");
                  handleCopy(allText, 999);
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                {copiedId === 999 ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <Copy size={18} />
                )}
                {copiedId === 999
                  ? "Semua Klip Disalin!"
                  : "Salin Semua Klip"}
              </button>
            </>
          )}
        </section>
      </main>

      {/* MODAL GANTI KODE (untuk user premium yang mau input kode baru) */}
      <Modal
        open={showCodeModal}
        onClose={() => {
          setShowCodeModal(false);
          setCodeMessage("");
          setCodeSuccess(false);
        }}
        title="Input kode premium baru"
        borderClass="border-yellow-500/30"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key className="text-white" size={32} />
        </div>
        <p className="text-slate-400 mb-6 text-sm">
          Masukkan kode dari file TXT yang Anda terima setelah membeli di
          Lynk.id.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (premiumCodeInput.trim()) handleVerifyCode();
          }}
        >
          <label htmlFor="premium-code-modal" className="sr-only">
            Kode premium
          </label>
          <input
            id="premium-code-modal"
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            value={premiumCodeInput}
            onChange={(e) =>
              setPremiumCodeInput(e.target.value.toUpperCase())
            }
            placeholder="ATS-XXXX-XXXX-XXXX"
            className="w-full bg-slate-800 border border-yellow-500/30 rounded-lg px-4 py-3 text-center text-lg font-mono font-bold text-white focus:outline-none focus:border-yellow-500 mb-4 tracking-widest"
          />
          <button
            type="submit"
            disabled={!premiumCodeInput.trim() || codeLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:bg-slate-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {codeLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Memverifikasi...
              </>
            ) : (
              <>
                <Crown size={20} />
                Verifikasi Kode
              </>
            )}
          </button>
        </form>
        <div aria-live="polite">
          {codeMessage && (
            <div
              role="status"
              className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                codeSuccess
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {codeMessage}
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-2">Belum punya kode?</p>
          <a
            href={PRODUCT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-orange-400 hover:text-orange-300 underline"
          >
            Beli Premium di Lynk.id →
          </a>
        </div>
      </Modal>
    </div>
  );
}

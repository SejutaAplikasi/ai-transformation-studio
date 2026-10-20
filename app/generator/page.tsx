// app/generator/page.tsx - v2.7 server-side premium & generate
"use client";

import { useState, useMemo, useEffect } from "react";
import { conditionsByNiche, recommendedSettings, recommendedObjects, viralHooks } from "@/lib/catalog";
import { GeneratorInput, Storyboard, Niche, Duration, AspectRatio, InitialCondition, VisualStyle, ViralHook } from "@/types/prompt";
import { Copy, Check, Loader2, ArrowLeft, Sparkles, Smartphone, Monitor, Square, Lightbulb, Flame, Zap, Lock, Crown, Key, X } from "lucide-react";
import Link from "next/link";

const PRODUCT_LINK = "https://lynk.id/sejutaaplikasi/p9kkozzjd8ew"; // LINK ASLI KAMU

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
  'Photorealistic', 'Cinematic Realism', '3D Animation', 'Pixar Style', 'Disney Style',
  'Studio Ghibli', 'Anime', 'Manga', 'Comic Book', '2D Animation', 'Watercolor',
  'Oil Painting', 'Stop Motion', 'Claymation', 'Lego Style', 'Miniature Tilt-Shift',
  'Isometric 3D', 'Pixel Art', 'Retro 80s VHS', 'Vintage Film 1970s', 'Black & White Noir',
  'Cyberpunk Neon', 'Steampunk', 'Dark Fantasy', 'Sci-Fi Futuristic', 'Dreamlike Surreal',
  'Hyperrealistic Macro', 'Documentary Style', 'ASMR Visual', 'Satisfying Cleaning', 'Luxury Commercial'
];

const environments = ["Old Warehouse", "Abandoned Garage", "Attic", "Basement", "Beach", "Forest", "Junkyard", "Studio", "Ancient Ruins", "Open Field", "Desk Setup", "Luxury Workshop", "Mystical Forest"];
const cameras = ["Macro Close-Up", "Drone", "Handheld", "Tracking Shot", "Cinema Lens"];
const lightings = ["Golden Hour", "Studio", "Workshop", "Dramatic", "Natural"];

const materials = [
  "Metal", "Plastic & Metal (Die-Cast)", "Fabric & Rubber (Sneaker)",
  "Leather & Metal (Jam Tangan)", "Glass & Metal (Kamera Analog)",
  "Gold & Gemstone", "Wood & Fabric", "Plastic (Toys)",
  "Leather (Luxury Bag)", "Crystal & Metal"
];

const aspectRatios: { value: AspectRatio; label: string; icon: typeof Smartphone }[] = [
  { value: "9:16", label: "9:16", icon: Smartphone },
  { value: "16:9", label: "16:9", icon: Monitor },
  { value: "1:1", label: "1:1", icon: Square },
];

const autoMapping: { keywords: string[]; material: string; objectType: string }[] = [
  { keywords: ["porsche", "mobil", "mainan berkarat", "console", "game retro", "lego", "roket", "menara eiffel", "benteng"], material: "Plastic & Metal (Die-Cast)", objectType: "Toy" },
  { keywords: ["sneaker", "sepatu", "vintage 90an"], material: "Fabric & Rubber (Sneaker)", objectType: "Sneaker" },
  { keywords: ["jam tangan", "mekanik antik", "mewah diamond"], material: "Leather & Metal (Jam Tangan)", objectType: "Watch" },
  { keywords: ["kamera analog", "kamera tua"], material: "Glass & Metal (Kamera Analog)", objectType: "Camera" },
  { keywords: ["tas kulit", "branded premium", "botol parfum", "perhiasan", "kalung berlian", "cincin permata"], material: "Leather (Luxury Bag)", objectType: "Jewelry" },
  { keywords: ["peti harta", "pedang naga", "peta rahasia", "topeng emas", "firaun"], material: "Gold & Gemstone", objectType: "Figure" },
  { keywords: ["kafe mini", "taman bonsai", "kamar tidur boneka", "bengkel mekanik kecil", "toko roti mini", "rumah pohon", "jembatan gantung"], material: "Wood & Fabric", objectType: "Miniature" },
  { keywords: ["naga kecil", "robot masa depan", "kupu-kupu kristal", "pohon raksasa", "monster laut"], material: "Crystal & Metal", objectType: "Figure" },
];

function detectMaterialAndType(objectName: string): { material: string; objectType: string } | null {
  const lower = objectName.toLowerCase();
  for (const map of autoMapping) {
    if (map.keywords.some(k => lower.includes(k))) {
      return { material: map.material, objectType: map.objectType };
    }
  }
  return null;
}

export default function GeneratorPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [remainingFree, setRemainingFree] = useState(3);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [premiumCodeInput, setPremiumCodeInput] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);

  const [input, setInput] = useState<GeneratorInput>({
    projectName: "",
    objectName: "",
    objectType: "Toy",
    material: "Metal",
    condition: "Berkarat & Lapuk",
    environment: "Old Warehouse",
    niche: "restoration",
    duration: 30,
    aspectRatio: "9:16",
    style: "Satisfying Cleaning",
    camera: "Macro Close-Up",
    lighting: "Studio",
    detailLevel: "Extreme Detail",
    viralHook: 'none',
  });

  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        const s = await res.json();
        if (cancelled) return;
        setIsPremium(!!s.premium);
        if (typeof s.remaining === "number") setRemainingFree(s.remaining);
      } catch {
        /* biarkan nilai default */
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

  const currentConditions = useMemo(() => conditionsByNiche[input.niche] || [], [input.niche]);
  const currentRecommendation = recommendedSettings[input.niche];
  const currentViralHook = useMemo(() => viralHooks?.find(h => h.value === input.viralHook), [input.viralHook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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
        } else {
          const newConditions = conditionsByNiche[value as Niche] || [];
          updated.condition = newConditions[0] as InitialCondition;
        }
      }
      if (name === "objectName") {
        const detected = detectMaterialAndType(value);
        if (detected) {
          updated.material = detected.material;
          updated.objectType = detected.objectType;
        }
      }
      return updated;
    });
  };

  const handleObjectSelect = (obj: string) => {
    const detected = detectMaterialAndType(obj);
    setInput(prev => ({
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
        projectName: input.projectName.trim() ? input.projectName : `${input.objectName} - ${input.niche}${input.viralHook !== 'none' ? ` [${input.viralHook}]` : ''}`,
      };
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputWithProjectName }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 402) {
        if (data.code === "quota") setRemainingFree(0);
        setShowPaywall(true);
        return;
      }
      if (!res.ok) {
        setErrorMsg(data.error || "Gagal membuat prompt, coba lagi.");
        return;
      }

      setStoryboard(data.storyboard);
      setIsPremium(!!data.premium);
      if (typeof data.remaining === "number") {
        setRemainingFree(data.remaining);
        if (data.remaining === 0) setTimeout(() => setShowPaywall(true), 1500);
      }
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
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: premiumCodeInput }),
      });
      const result = await res.json().catch(() => ({ success: false, message: "Terjadi kesalahan" }));
      setCodeMessage(result.message || "");
      setCodeSuccess(!!result.success);
      if (result.success) {
        setIsPremium(true);
        setTimeout(() => {
          setShowCodeModal(false);
          setPremiumCodeInput("");
          setCodeMessage("");
          setCodeSuccess(false);
        }, 2000);
      }
    } catch {
      setCodeMessage("Koneksi bermasalah, coba lagi.");
      setCodeSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Transformation Studio v2.6
          </h1>
          <div className="flex items-center gap-2">
            {isPremium ? (
              <div className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <Crown size={12} /> PREMIUM
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1 bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-700">
                <Zap size={12} className="text-orange-400" />
                Sisa: {remainingFree}/3
              </div>
            )}
            <button
              onClick={() => setShowCodeModal(true)}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                isPremium
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
              }`}
            >
              {isPremium ? <><Crown size={12} /> Premium</> : <><Key size={12} /> Upgrade</>}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Sparkles className="text-blue-400" size={20} />
            Konfigurasi Project
          </h2>

          {!isPremium && (
            <div className="sm:hidden mb-4 bg-slate-800/50 border border-orange-500/30 rounded-lg p-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">Kuota Hari Ini:</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i <= remainingFree ? 'bg-orange-400' : 'bg-slate-700'}`} />
                ))}
              </div>
              <span className="text-xs font-bold text-orange-400">{remainingFree}/3</span>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Format Layar (Ratio)</label>
              <div className="grid grid-cols-3 gap-2">
                {aspectRatios.map((ratio) => {
                  const Icon = ratio.icon;
                  const isActive = input.aspectRatio === ratio.value;
                  return (
                    <button key={ratio.value} type="button" onClick={() => setInput({ ...input, aspectRatio: ratio.value })} className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition ${isActive ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"}`}>
                      <Icon size={20} />
                      <span className="text-sm font-medium">{ratio.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Nama Project (Optional)</label>
              <input name="projectName" value={input.projectName} onChange={handleChange} placeholder="Contoh: Restorasi Porsche 911" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition" />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Nama Mainan / Objek *</label>
              <input name="objectName" value={input.objectName} onChange={handleChange} placeholder={`Contoh: ${recommendedObjects[input.niche][0]}`} required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition" />
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-slate-500 self-center mr-1">Saran:</span>
                {recommendedObjects[input.niche].map((obj) => (
                  <button key={obj} type="button" onClick={() => handleObjectSelect(obj)} className={`text-xs border px-3 py-1.5 rounded-full transition flex items-center gap-1 ${input.objectName === obj ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-800 hover:bg-blue-900/40 border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-300"}`}>
                    <Sparkles size={12} className={input.objectName === obj ? "text-white" : "text-blue-400"} />
                    {obj}
                  </button>
                ))}
              </div>
            </div>

            {viralHooks && viralHooks.length > 0 && (
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl p-4">
                <label className="block text-sm font-bold text-orange-300 mb-2 flex items-center gap-2">
                  <Flame size={16} className="text-orange-400" />
                  Viral Hook (Pola Viral YouTube)
                  <Zap size={14} className="text-yellow-400" />
                </label>
                <select name="viralHook" value={input.viralHook} onChange={handleChange} className="w-full bg-slate-800 border border-orange-500/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-white font-medium">
                  {viralHooks.map((hook) => (
                    <option key={hook.value} value={hook.value}>
                      {hook.icon} {hook.label} - {hook.description}
                    </option>
                  ))}
                </select>
                {currentViralHook && currentViralHook.value !== 'none' && (
                  <div className="mt-3 bg-slate-900/50 rounded-lg p-3 border border-orange-500/20">
                    <p className="text-xs text-orange-200"><span className="font-bold">{currentViralHook.icon} {currentViralHook.label}:</span> {currentViralHook.description}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Best for: {currentViralHook.bestFor?.join(', ') || 'All niches'}</p>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Material Objek * (Auto)</label>
                <select name="material" value={input.material} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                  {materials.map((m) => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Tipe Objek (Auto)</label>
                <select name="objectType" value={input.objectType} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                  <option value="Toy">Toy / Mainan</option>
                  <option value="Sneaker">Sneaker / Sepatu</option>
                  <option value="Watch">Watch / Jam</option>
                  <option value="Camera">Camera / Elektronik</option>
                  <option value="Figure">Action Figure</option>
                  <option value="Vehicle">Vehicle / Kendaraan</option>
                  <option value="Jewelry">Jewelry / Perhiasan</option>
                  <option value="Miniature">Miniature / Diorama</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Niche</label>
                <select name="niche" value={input.niche} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                  {niches.map((n) => (<option key={n.value} value={n.value}>{n.label}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Durasi</label>
                <select name="duration" value={input.duration} onChange={(e) => setInput({ ...input, duration: Number(e.target.value) as Duration })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                  {durations.map((d) => (<option key={d} value={d}>{d} Detik ({d / 10} Scene)</option>))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Kondisi Awal</label>
              <select name="condition" value={input.condition} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                {currentConditions.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Gaya Visual / Style</label>
              <select name="style" value={input.style} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                {visualStyles.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Lingkungan</label>
                <select name="environment" value={input.environment} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                  {environments.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Gaya Kamera</label>
                <select name="camera" value={input.camera} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                  {cameras.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Pencahayaan</label>
              <select name="lighting" value={input.lighting} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                {lightings.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-yellow-400" size={20} />
                <h3 className="font-semibold text-white">Rekomendasi Setting Optimal</h3>
              </div>
              <p className="text-sm text-slate-400 mb-3">Untuk niche <span className="text-blue-400 font-semibold">{input.niche}</span>:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-800/50 rounded px-2 py-1"><span className="text-slate-500">Durasi:</span> <span className="text-white">{currentRecommendation.duration}s</span></div>
                <div className="bg-slate-800/50 rounded px-2 py-1"><span className="text-slate-500">Ratio:</span> <span className="text-white">{currentRecommendation.aspectRatio}</span></div>
                <div className="bg-slate-800/50 rounded px-2 py-1"><span className="text-slate-500">Style:</span> <span className="text-white">{currentRecommendation.style}</span></div>
                <div className="bg-slate-800/50 rounded px-2 py-1"><span className="text-slate-500">Camera:</span> <span className="text-white">{currentRecommendation.camera}</span></div>
              </div>
              <button type="button" onClick={() => { const rec = currentRecommendation; setInput(prev => ({ ...prev, duration: rec.duration, aspectRatio: rec.aspectRatio, condition: rec.condition, environment: rec.environment, style: rec.style, camera: rec.camera, lighting: rec.lighting, detailLevel: rec.detailLevel })); }} className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition">Terapkan Rekomendasi</button>
            </div>

            <button type="submit" disabled={isLoading || !input.objectName} className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 mt-6 shadow-lg shadow-orange-500/20">
              {isLoading ? (<><Loader2 className="animate-spin" size={20} />Membuat prompt...</>) : (
                <>
                  <Flame size={20} />
                  GENERATE VIRAL HOOK
                  {!isPremium && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-2">{remainingFree} left</span>}
                </>
              )}
            </button>
            {errorMsg && (
              <div role="alert" className="mt-3 p-3 rounded-lg text-sm bg-red-500/20 text-red-400 border border-red-500/30">{errorMsg}</div>
            )}
          </form>
        </section>

        <section className="space-y-4">
          {!storyboard && !isLoading && (
            <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 min-h-[400px] flex flex-col items-center justify-center">
              <Flame size={48} className="mb-4 opacity-50 text-orange-500" />
              <p className="text-lg">Hasil storyboard viral akan muncul di sini</p>
              <p className="text-sm mt-2">Pilih Viral Hook + isi form + Generate</p>
              {!isPremium && (
                <div className="mt-4 text-xs text-slate-500">
                  Kuota gratis hari ini: <span className="text-orange-400 font-bold">{remainingFree}/3</span>
                </div>
              )}
            </div>
          )}

          {isLoading && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-orange-500 mb-4" size={48} />
              <p className="text-lg text-slate-300">Applying Viral Hook...</p>
            </div>
          )}

          {storyboard && !isLoading && (
            <>
              <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  {currentViralHook?.icon} {storyboard.projectName || input.objectName}
                </h3>
                <div className="flex gap-4 text-sm text-slate-400 flex-wrap">
                  <span>Durasi: <span className="text-white">{storyboard.totalDuration}s</span></span>
                  <span>Scene: <span className="text-white">{storyboard.scenes.length}</span></span>
                  <span>Ratio: <span className="text-white">{storyboard.aspectRatio}</span></span>
                  {currentViralHook && <span>Hook: <span className="text-orange-400">{currentViralHook.label}</span></span>}
                </div>
              </div>

              {storyboard.scenes.map((scene) => (
                <div key={scene.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Scene {scene.id}</span>
                      <h4 className="text-lg font-bold text-white mt-1">{scene.title}</h4>
                    </div>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{scene.duration}s</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4 font-mono text-sm bg-slate-950/50 p-3 rounded-lg border border-slate-800 whitespace-pre-wrap">{scene.description}</p>
                  <button onClick={() => handleCopy(scene.description, scene.id)} className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white">
                    {copiedId === scene.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              ))}

              <button onClick={() => { const allText = storyboard.scenes.map(s => `SCENE ${s.id}: ${s.title}\n${s.description}`).join('\n\n'); handleCopy(allText, 999); }} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
                {copiedId === 999 ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                {copiedId === 999 ? "All Scenes Copied!" : "Copy All Scenes"}
              </button>
            </>
          )}
        </section>
      </main>

      {showPaywall && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-8 max-w-md w-full text-center relative">
            <button onClick={() => setShowPaywall(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Kuota Gratis Habis!</h3>
            <p className="text-slate-400 mb-6">
              Anda telah menggunakan <span className="text-orange-400 font-bold">3x generate gratis</span> hari ini. 
              Upgrade ke Premium untuk akses <span className="text-orange-400 font-bold">UNLIMITED</span>.
            </p>
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-left space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-400" /> Unlimited Generate Seumur Hidup</div>
              <div className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-400" /> Akses 31+ Gaya Visual Eksklusif</div>
              <div className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-400" /> Prioritas Update Fitur Terbaru</div>
              <div className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-400" /> Support via WhatsApp</div>
            </div>
            <a href={PRODUCT_LINK} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 mb-3">
              <Crown size={20} />
              Beli Premium (Rp 49.000)
            </a>
            <button onClick={() => { setShowPaywall(false); setShowCodeModal(true); }} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
              <Key size={16} />
              Sudah Punya Kode? Input di Sini
            </button>
            <button onClick={() => setShowPaywall(false)} className="mt-3 text-slate-500 hover:text-white text-sm underline">
              Nanti saja
            </button>
          </div>
        </div>
      )}

      {showCodeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-yellow-500/30 rounded-2xl p-8 max-w-md w-full text-center relative">
            <button onClick={() => { setShowCodeModal(false); setCodeMessage(""); setCodeSuccess(false); }} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Input Kode Premium</h3>
            <p className="text-slate-400 mb-6 text-sm">Masukkan kode dari file TXT yang kamu download di Lynk.id</p>
            <input
              type="text"
              value={premiumCodeInput}
              onChange={(e) => setPremiumCodeInput(e.target.value.toUpperCase())}
              placeholder="ATS-XXXX-XXXX-XXXX"
              className="w-full bg-slate-800 border border-yellow-500/30 rounded-lg px-4 py-3 text-center text-lg font-mono font-bold text-white focus:outline-none focus:border-yellow-500 mb-4 tracking-widest"
            />
            <button onClick={handleVerifyCode} disabled={!premiumCodeInput.trim()} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 mb-3">
              <Crown size={20} />
              Verifikasi Kode
            </button>
            {codeMessage && (
              <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${codeSuccess ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                {codeMessage}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500 mb-2">Belum punya kode?</p>
              <a href={PRODUCT_LINK} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:text-orange-300 underline">
                Beli Premium di Lynk.id →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

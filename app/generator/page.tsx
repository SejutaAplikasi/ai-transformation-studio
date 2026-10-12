// app/generator/page.tsx
"use client";

import { useState, useMemo } from "react";
import { generateStoryboard, conditionsByNiche, recommendedSettings, recommendedObjects } from "@/lib/prompt-builder";
import { GeneratorInput, Storyboard, Niche, Duration, AspectRatio, InitialCondition, VisualStyle } from "@/types/prompt";
import { Copy, Check, Loader2, ArrowLeft, Sparkles, Smartphone, Monitor, Square, Lightbulb } from "lucide-react";
import Link from "next/link";

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

const aspectRatios: { value: AspectRatio; label: string; icon: typeof Smartphone }[] = [
  { value: "9:16", label: "9:16", icon: Smartphone },
  { value: "16:9", label: "16:9", icon: Monitor },
  { value: "1:1", label: "1:1", icon: Square },
];

export default function GeneratorPage() {
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
    style: "Photorealistic",
    camera: "Macro Close-Up",
    lighting: "Golden Hour",
    detailLevel: "Extreme Detail",
  });

  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const currentConditions = useMemo(() => conditionsByNiche[input.niche] || [], [input.niche]);
  const currentRecommendation = recommendedSettings[input.niche];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput((prev) => {
      const updated = { ...prev, [name]: value };
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
      return updated;
    });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.objectName) return;

    setIsLoading(true);
    setTimeout(() => {
      const result = generateStoryboard(input);
      setStoryboard(result);
      setIsLoading(false);
    }, 600);
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Transformation Studio
          </h1>
          <div className="w-20"></div>
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
              <label className="block text-sm text-slate-400 mb-2">Format Layar (Ratio)</label>
              <div className="grid grid-cols-3 gap-2">
                {aspectRatios.map((ratio) => {
                  const Icon = ratio.icon;
                  const isActive = input.aspectRatio === ratio.value;
                  return (
                    <button
                      key={ratio.value}
                      type="button"
                      onClick={() => setInput({ ...input, aspectRatio: ratio.value })}
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

            {/* Object Name */}
                        {/* Object Name dengan Rekomendasi */}
            <div>
              <label className="block text-sm text-slate-400 mb-1">Nama Mainan / Objek *</label>
              <input
                name="objectName"
                value={input.objectName}
                onChange={handleChange}
                placeholder={`Contoh: ${recommendedObjects[input.niche][0]}`}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              />
              
              {/* Quick-Pick Chips (Rekomendasi 1-Klik) */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-slate-500 self-center mr-1">Saran:</span>
                {recommendedObjects[input.niche].map((obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => setInput(prev => ({ ...prev, objectName: obj }))}
                    className="text-xs bg-slate-800 hover:bg-blue-900/40 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-300 px-3 py-1.5 rounded-full transition flex items-center gap-1"
                  >
                    <Sparkles size={12} className="text-blue-400" />
                    {obj}
                  </button>
                ))}
              </div>
            </div>

            {/* Niche & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Niche</label>
                <select
                  name="niche"
                  value={input.niche}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  {niches.map((n) => (
                    <option key={n.value} value={n.value}>{n.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Durasi</label>
                <select
                  name="duration"
                  value={input.duration}
                  onChange={(e) => setInput({ ...input, duration: Number(e.target.value) as Duration })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  {durations.map((d) => (
                    <option key={d} value={d}>{d} Detik ({d / 10} Scene)</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm text-slate-400 mb-1">Kondisi Awal</label>
              <select
                name="condition"
                value={input.condition}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {currentConditions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Visual Style - BARU & LENGKAP */}
            <div>
              <label className="block text-sm text-slate-400 mb-1">Gaya Visual / Style</label>
              <select
                name="style"
                value={input.style}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {visualStyles.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Environment & Camera */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Lingkungan</label>
                <select
                  name="environment"
                  value={input.environment}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  {environments.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Gaya Kamera</label>
                <select
                  name="camera"
                  value={input.camera}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  {cameras.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Lighting */}
            <div>
              <label className="block text-sm text-slate-400 mb-1">Pencahayaan</label>
              <select
                name="lighting"
                value={input.lighting}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {lightings.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* RECOMMENDED SETTINGS BOX */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-yellow-400" size={20} />
                <h3 className="font-semibold text-white">Rekomendasi Setting Optimal</h3>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Untuk niche <span className="text-blue-400 font-semibold">{input.niche}</span>, setting terbaik adalah:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-800/50 rounded px-2 py-1">
                  <span className="text-slate-500">Durasi:</span> <span className="text-white">{currentRecommendation.duration}s</span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1">
                  <span className="text-slate-500">Ratio:</span> <span className="text-white">{currentRecommendation.aspectRatio}</span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1">
                  <span className="text-slate-500">Style:</span> <span className="text-white">{currentRecommendation.style}</span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1">
                  <span className="text-slate-500">Camera:</span> <span className="text-white">{currentRecommendation.camera}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const rec = currentRecommendation;
                  setInput(prev => ({
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
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 mt-6 shadow-lg shadow-blue-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Building Story Arc...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  CUSTOM AI BEST MATCH
                </>
              )}
            </button>
          </form>
        </section>

        {/* HASIL */}
        <section className="space-y-4">
          {!storyboard && !isLoading && (
            <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 min-h-[400px] flex flex-col items-center justify-center">
              <Sparkles size={48} className="mb-4 opacity-50" />
              <p className="text-lg">Hasil storyboard akan muncul di sini</p>
              <p className="text-sm mt-2">Isi form di kiri dan klik Generate</p>
            </div>
          )}

          {isLoading && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
              <p className="text-lg text-slate-300">Optimizing For Google Flow...</p>
            </div>
          )}

          {storyboard && !isLoading && (
            <>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{storyboard.projectName || input.objectName}</h3>
                <div className="flex gap-4 text-sm text-slate-400 flex-wrap">
                  <span>Durasi: <span className="text-white">{storyboard.totalDuration}s</span></span>
                  <span>Scene: <span className="text-white">{storyboard.scenes.length}</span></span>
                  <span>Ratio: <span className="text-white">{storyboard.aspectRatio}</span></span>
                </div>
              </div>

              {storyboard.scenes.map((scene) => (
                <div key={scene.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Scene {scene.id}</span>
                      <h4 className="text-lg font-bold text-white mt-1">{scene.title}</h4>
                    </div>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{scene.duration}s</span>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-4 font-mono text-sm bg-slate-950/50 p-3 rounded-lg border border-slate-800 whitespace-pre-wrap">
                    {scene.description}
                  </p>

                  <button
                    onClick={() => handleCopy(scene.description, scene.id)}
                    className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
                  >
                    {copiedId === scene.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              ))}

              <button
                onClick={() => {
                  const allText = storyboard.scenes.map(s => `SCENE ${s.id}: ${s.title}\n${s.description}`).join('\n\n');
                  handleCopy(allText, 999);
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                {copiedId === 999 ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                {copiedId === 999 ? "All Scenes Copied!" : "Copy All Scenes"}
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
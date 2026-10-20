// lib/validate.ts
// SERVER-ONLY: validasi & pembersihan input sebelum masuk template prompt.
import 'server-only';
import type { GeneratorInput, Niche, Duration, AspectRatio, ViralHook, VisualStyle } from '@/types/prompt';

const NICHES: Niche[] = ['restoration', 'treasure', 'construction', 'mini-world', 'luxury', 'evolution'];
const DURATIONS: Duration[] = [10, 20, 30, 60];
const RATIOS: AspectRatio[] = ['9:16', '16:9', '1:1'];
const HOOKS: ViralHook[] = [
  'none', 'magnetic-mud', 'laser-cleaning', 'exploded-float',
  'chrome-dip', 'pressure-wash', 'cut-in-half', 'asmr-tapping', 'time-reverse',
];

// Buang karakter yang bisa merusak template: { } (placeholder), $ (pola replace), backtick, < >
function clean(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(/[{}$`<>\[\]\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export function parseInput(raw: any): { ok: true; input: GeneratorInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Input tidak valid' };

  const niche = raw.niche as Niche;
  const duration = Number(raw.duration) as Duration;
  const aspectRatio = raw.aspectRatio as AspectRatio;
  const viralHook = (raw.viralHook ?? 'none') as ViralHook;

  if (!NICHES.includes(niche)) return { ok: false, error: 'Niche tidak valid' };
  if (!DURATIONS.includes(duration)) return { ok: false, error: 'Durasi tidak valid' };
  if (!RATIOS.includes(aspectRatio)) return { ok: false, error: 'Aspect ratio tidak valid' };
  if (!HOOKS.includes(viralHook)) return { ok: false, error: 'Viral hook tidak valid' };

  const objectName = clean(raw.objectName, 80);
  if (!objectName) return { ok: false, error: 'Nama objek wajib diisi' };

  const input: GeneratorInput = {
    projectName: clean(raw.projectName, 120) || objectName,
    objectName,
    objectType: clean(raw.objectType, 60),
    material: clean(raw.material, 80),
    condition: clean(raw.condition, 120),
    environment: clean(raw.environment, 60),
    niche,
    duration,
    aspectRatio,
    style: clean(raw.style, 60) as VisualStyle,
    camera: clean(raw.camera, 60),
    lighting: clean(raw.lighting, 60),
    detailLevel: clean(raw.detailLevel, 60),
    viralHook,
  };
  return { ok: true, input };
}

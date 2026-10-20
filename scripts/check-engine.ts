// scripts/check-engine.ts
// Jalankan: npx tsx --conditions=react-server scripts/check-engine.ts
// Memeriksa semua kombinasi niche x durasi x hook.
import { generateStoryboard, ENV_EN } from '../lib/prompt-engine';
import { conditionsByNiche, recommendedSettings, recommendedObjects, viralHooks, isHookCompatible } from '../lib/catalog';
import type { GeneratorInput, Niche, Duration } from '../types/prompt';

const niches = Object.keys(recommendedSettings) as Niche[];
const durations: Duration[] = [10, 20, 30, 60];
let failures = 0, combos = 0, minW = 999, maxW = 0;
const env0 = (i: GeneratorInput) => ENV_EN[i.environment] ?? i.environment;
const fail = (msg: string) => { failures++; console.log('FAIL', msg); };

for (const niche of niches) {
  const rec = recommendedSettings[niche];
  for (const duration of durations) {
    for (const h of viralHooks) {
      combos++;
      const input: GeneratorInput = {
        projectName: 't', objectName: recommendedObjects[niche][0], objectType: 'Toy', material: 'Plastic & Metal (Die-Cast)',
        condition: conditionsByNiche[niche][0], environment: rec.environment, niche, duration, aspectRatio: rec.aspectRatio,
        style: rec.style, camera: rec.camera, lighting: rec.lighting, detailLevel: rec.detailLevel, viralHook: h.value,
      };
      const sb = generateStoryboard(input);
      const tag = `${niche}/${duration}s/${h.value}`;
      const ref = generateStoryboard({ ...input, duration: 60 });

      if (sb.scenes.length !== duration / 10) fail(`${tag} jumlah scene`);
      if (sb.scenes[0].method !== 'start') fail(`${tag} scene 1 bukan start`);
      sb.scenes.forEach((s, i) => {
        const text = s.description + s.startFrame + s.endFrame + s.title;
        if (/[{}]/.test(text)) fail(`${tag} scene ${i + 1} placeholder tersisa`);
        const w = s.description.split(/\s+/).length;
        minW = Math.min(minW, w); maxW = Math.max(maxW, w);
        if (w < 35 || w > 190) fail(`${tag} scene ${i + 1} panjang ${w} kata`);
        if (i === 0 && s.description.split(env0(input)).length > 2) fail(`${tag} lokasi tertulis dua kali`);
        if (i > 0 && s.startFrame !== sb.scenes[i - 1].endFrame) fail(`${tag} scene ${i + 1} startFrame != endFrame sebelumnya`);
      });
      // Semua durasi harus berakhir di reveal yang sama dengan versi 60 detik
      if (sb.scenes.at(-1)!.endFrame !== ref.scenes.at(-1)!.endFrame) fail(`${tag} tidak berakhir di reveal`);
      // Rangkaian extend maksimal 4 klip (1 start/chain + 3 extend)
      let run = 1;
      sb.scenes.forEach((s) => { run = s.method === 'extend' ? run + 1 : 1; if (run > 4) fail(`${tag} rangkaian extend > 4 klip`); });
      // Hook tidak cocok -> harus ada catatan
      if (!isHookCompatible(h.value, niche) && !sb.notes?.some((n) => n.includes('tidak cocok'))) fail(`${tag} hook tidak cocok tanpa catatan`);
    }
  }
}
console.log(`${combos} kombinasi diperiksa, ${failures} gagal. Panjang prompt: ${minW}-${maxW} kata.`);
process.exit(failures ? 1 : 0);

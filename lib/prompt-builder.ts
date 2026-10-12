// lib/prompt-builder.ts

import { GeneratorInput, Storyboard, Scene, Niche, AspectRatio, InitialCondition, RecommendedSettings } from '@/types/prompt';

// Kondisi awal per niche
export const conditionsByNiche: Record<Niche, InitialCondition[]> = {
  restoration: [
    'Penuh Noda', 'Berkarat & Lapuk', 'Cat Mengelupas', 'Menguning Karena Usia',
    'Penuh Goresan', 'Berjamur & Lembap', 'Lengket & Berminyak', 'Retak & Rusak',
    'Terlupakan di Gudang', 'Rusak Akibat Cat Semprot', 'Terbengkalai Bertahun-tahun', 'Super Kotor',
  ],
  treasure: [
    'Terkubur Dalam Tanah', 'Tersembunyi di Gua Gelap', 'Terendam di Dasar Laut',
    'Terbungkus Rantai Kuno', 'Terjebak di Dalam Peti', 'Terpendam di Pasir Gurun',
    'Terkunci di Ruang Rahasia', 'Terlindungi Monster Penjaga', 'Tersebar di Beberapa Lokasi',
    'Disamarkan Sebagai Batu Biasa',
  ],
  construction: [
    'Lahan Kosong Berumput', 'Tanah Berbatu Keras', 'Lahan Berawa', 'Lereng Bukit Curam',
    'Lahan Pasir Gersang', 'Bekas Area Tambang', 'Hutan yang Ditebangi', 'Lahan Rawa Kering',
  ],
  'mini-world': [
    'Meja Kerja Berantakan', 'Rak Buku Berdebu', 'Dapur Miniatur', 'Taman Belakang Rumah',
    'Kotak Pasir Anak', 'Lemari Tua Berdebu', 'Jendela Berembun', 'Atas Meja Belajar',
  ],
  luxury: [
    'Bahan Mentah Berantakan', 'Logam Belum Ditempa', 'Berlian Kasar', 'Kulit Mentah',
    'Kayu Gelondongan', 'Kain Belum Dijahit', 'Emas Batangan', 'Kristal Belum Diasah',
  ],
  evolution: [
    'Telur Misterius', 'Larva Kecil', 'Bentuk Amorf', 'Makhluk Mini',
    'Organisme Primordial', 'Cangkang Retak', 'Spora Terbang', 'Sel Tunggal',
  ],
};

// RECOMMENDED SETTINGS per niche
export const recommendedSettings: Record<Niche, RecommendedSettings> = {
  restoration: {
    duration: 30,
    aspectRatio: '9:16',
    condition: 'Berkarat & Lapuk',
    environment: 'Old Warehouse',
    style: 'Satisfying Cleaning',
    camera: 'Macro Close-Up',
    lighting: 'Studio',
    detailLevel: 'Extreme Detail',
  },
  treasure: {
    duration: 30,
    aspectRatio: '9:16',
    condition: 'Terkubur Dalam Tanah',
    environment: 'Ancient Ruins',
    style: 'Cinematic Realism',
    camera: 'Handheld',
    lighting: 'Dramatic',
    detailLevel: 'High Detail',
  },
  construction: {
    duration: 60,
    aspectRatio: '16:9',
    condition: 'Lahan Kosong Berumput',
    environment: 'Open Field',
    style: 'Documentary Style',
    camera: 'Drone',
    lighting: 'Golden Hour',
    detailLevel: 'High Detail',
  },
  'mini-world': {
    duration: 30,
    aspectRatio: '9:16',
    condition: 'Meja Kerja Berantakan',
    environment: 'Desk Setup',
    style: 'Miniature Tilt-Shift',
    camera: 'Macro Close-Up',
    lighting: 'Natural',
    detailLevel: 'Extreme Detail',
  },
  luxury: {
    duration: 30,
    aspectRatio: '16:9',
    condition: 'Bahan Mentah Berantakan',
    environment: 'Luxury Workshop',
    style: 'Luxury Commercial',
    camera: 'Cinema Lens',
    lighting: 'Studio',
    detailLevel: 'Extreme Detail',
  },
  evolution: {
    duration: 30,
    aspectRatio: '9:16',
    condition: 'Telur Misterius',
    environment: 'Mystical Forest',
    style: 'Dark Fantasy',
    camera: 'Tracking Shot',
    lighting: 'Dramatic',
    detailLevel: 'High Detail',
  },
};

// Rekomendasi objek per niche
export const recommendedObjects: Record<Niche, string[]> = {
  restoration: [
    "Mobil Porsche Mainan Berkarat",
    "Sepatu Sneaker Vintage 90an",
    "Jam Tangan Mekanik Antik",
    "Kamera Analog Tua",
    "Console Game Retro Debu"
  ],
  treasure: [
    "Peti Harta Karun Mini",
    "Pedang Naga Kuno",
    "Cincin Permata Tersembunyi",
    "Peta Rahasia Kuno",
    "Topeng Emas Firaun"
  ],
  construction: [
    "Rumah Pohon Miniatur",
    "Jembatan Gantung Kayu",
    "Benteng Kastil Lego",
    "Roket Luar Angkasa Mainan",
    "Menara Eiffel Mini"
  ],
  "mini-world": [
    "Kafe Mini di Atas Meja",
    "Taman Bonsai Miniatur",
    "Kamar Tidur Boneka Detail",
    "Bengkel Mekanik Kecil",
    "Toko Roti Mini Satisfying"
  ],
  luxury: [
    "Jam Tangan Mewah Diamond",
    "Mobil Sport Klasik Merah",
    "Tas Kulit Branded Premium",
    "Botol Parfum Mewah",
    "Perhiasan Kalung Berlian"
  ],
  evolution: [
    "Naga Kecil Menetas",
    "Robot Masa Depan",
    "Kupu-kupu Kristal Ajaib",
    "Pohon Raksasa Tumbuh",
    "Monster Laut Purba"
  ],
};

// Story Arc per niche
const storyArcs: Record<Niche, string[]> = {
  restoration: ['DISCOVERY', 'CLEANING', 'REPAIR', 'POLISHING', 'DETAILING', 'FINAL REVEAL'],
  treasure: ['THE SEARCH', 'CLUE FOUND', 'EXCAVATION', 'BREAKING THROUGH', 'TREASURE SPOTTED', 'TREASURE REVEAL'],
  construction: ['LAND SURVEY', 'FOUNDATION', 'STRUCTURE BUILD', 'ROOFING', 'INTERIOR', 'GRAND OPENING'],
  'mini-world': ['LANDSCAPE SETUP', 'TINY FOUNDATION', 'WALLS BUILD', 'ROOF ADD', 'DETAILING', 'MINIATURE MASTERPIECE'],
  luxury: ['RAW MATERIALS', 'CUTTING', 'SHAPING', 'ASSEMBLY', 'POLISHING', 'LUXURY SHOWCASE'],
  evolution: ['PRIMITIVE STATE', 'EARLY FORM', 'MID EVOLUTION', 'ADVANCED FORM', 'NEAR FINAL', 'FINAL EVOLUTION'],
};

// Template deskripsi per niche (DIPERBAIKI untuk konsistensi)
const sceneTemplates: Record<Niche, string[]> = {
  restoration: [
    '{condition} {object} ({material}) discovered in {environment}. {camera} shot, {lighting}, {detail}. Style: {style}. VISUAL ANCHOR: {object} has distinctive {material} texture with visible rust patterns.',
    'CONTINUITY: Same {object} from previous scene. Close-up cleaning process. Removing dirt and grime. ASMR visuals, {style}, {detail}. The {material} surface gradually reveals its original color.',
    'CONTINUITY: Same {object} now partially clean. Repairing damaged parts. Precision tools, sparks flying. {camera}, {lighting}. The {material} texture becomes smoother.',
    'CONTINUITY: Same {object} in better condition. Polishing surface. Smooth glossy finish emerging. {style} visuals, {detail}. The {material} reflects light beautifully.',
    'CONTINUITY: Same {object} almost perfect. Final detailing. Perfect reflections, pristine condition. {camera}, {lighting}. Every {material} detail is visible.',
    'CONTINUITY: Same {object} fully restored. Luxury showcase. Slow cinematic orbit. {lighting}, {detail}. The {material} shines like new.',
  ],
  treasure: [
    'Wide shot of {environment}. Searching for hidden {object} in {condition} state. {camera}, {lighting}. VISUAL ANCHOR: {object} is made of {material} with unique markings.',
    'CONTINUITY: Same {environment}. Ancient clue discovered related to {object}. Map unfolding, mystery deepening. {camera}, {detail}. The {material} markings match the clue.',
    'CONTINUITY: Digging process begins at same location. Dirt flying, {style} visuals. Excavation tools in action. Getting closer to {object}.',
    'CONTINUITY: Breaking through final layer at same spot. Tension builds. {camera}, dramatic {lighting}. Glimpse of {material} {object} appears.',
    'CONTINUITY: Same location. Glimpse of {material} {object} spotted. Glow emerging. {detail}. The unique markings are visible.',
    'CONTINUITY: Same {object} fully revealed from same location. Epic cinematic reveal. {lighting}, {detail}. The {material} markings glow.',
  ],
  construction: [
    '{condition}. Surveying and planning in {environment}. Drone shot, {lighting}. VISUAL ANCHOR: Building will have distinctive {material} features.',
    'CONTINUITY: Same {environment}. Foundation being laid for the structure. Concrete pouring, steel bars. {camera}, {detail}. {material} elements prepared.',
    'CONTINUITY: Same location. Structure rising from same foundation. Walls being built. Time-lapse style, {style}. {material} features taking shape.',
    'CONTINUITY: Same building. Roof installation on same structure. Crane lifting materials. {camera}, {lighting}. {material} roof added.',
    'CONTINUITY: Same building. Interior work on same structure. Painting, flooring, details. {camera}, {detail}. {material} interior elements.',
    'CONTINUITY: Same completed building. Grand opening. {environment} transformed. Cinematic, {lighting}. {material} features fully visible.',
  ],
  'mini-world': [
    'Macro setup of tiny landscape in {environment}. Starting from {condition}. {camera}, {lighting}, {detail}. VISUAL ANCHOR: Miniature made of {material} with tiny details.',
    'CONTINUITY: Same {environment}. Tiny foundation being laid for miniature. Miniature tools, {style} visuals. {material} base created.',
    'CONTINUITY: Same miniature. Walls being built on same foundation. {camera}, {detail}. {material} walls rising.',
    'CONTINUITY: Same miniature structure. Roof being added. {lighting}, {style}. {material} roof placed.',
    'CONTINUITY: Same miniature. Tiny detailing work on same structure. Paint, textures. {camera}, {detail}. {material} details added.',
    'CONTINUITY: Same completed miniature. Masterpiece finished. Macro cinematic shot. {lighting}. All {material} details visible.',
  ],
  luxury: [
    '{condition} {material} displayed. {environment} setting. {camera}, {lighting}. VISUAL ANCHOR: Final {object} will showcase premium {material} quality.',
    'CONTINUITY: Same {material} from previous scene. Precision cutting. Sparks, craftsmanship. {style}, {detail}. {material} being shaped for {object}.',
    'CONTINUITY: Same {material} pieces. Shaping and forming the {object}. Artisan hands at work. {camera}. {material} taking {object} form.',
    'CONTINUITY: Same {object} in progress. Assembly process. Parts coming together. {style}, {lighting}. {material} pieces joining.',
    'CONTINUITY: Same {object} almost complete. Final polishing. Mirror-like finish emerging. {camera}, {detail}. {material} surface perfect.',
    'CONTINUITY: Same {object} fully completed. Luxury showcase. Dramatic {lighting}, {detail}. Premium {material} quality evident.',
  ],
  evolution: [
    '{condition} of {object} in {environment}. {camera}, {lighting}. VISUAL ANCHOR: {object} has distinctive {material} texture and unique color pattern.',
    'CONTINUITY: Same {object} from previous scene. Early transformation begins. Subtle changes. {style}, {detail}. {material} texture evolving, color pattern shifting.',
    'CONTINUITY: Same {object} mid-transformation. Noticeable growth. {camera}, {lighting}. {material} texture more complex, color pattern more vibrant.',
    'CONTINUITY: Same {object} advanced form. Complex details emerging. {style}, {detail}. {material} texture refined, color pattern stabilized.',
    'CONTINUITY: Same {object} near-final state. Almost complete transformation. {camera}. {material} texture perfected, color pattern complete.',
    'CONTINUITY: Same {object} final evolution revealed. Majestic form. Cinematic {lighting}, {detail}. {material} texture and color pattern fully evolved.',
  ],
};

// ENHANCED MASTER LOCK dengan instruksi temporal consistency
const MASTER_LOCK = `[TEMPORAL CONSISTENCY LOCK: This is scene {sceneNumber} of {totalScenes} in a continuous video sequence. You MUST maintain:
1. EXACT SAME object appearance (shape, size, color, texture) as described in VISUAL ANCHOR
2. CONSISTENT lighting style and color palette throughout all scenes
3. SMOOTH TRANSITION from previous scene (reference CONTINUITY tag)
4. SAME camera movement style and framing approach
5. DO NOT introduce new objects or change the core subject
6. Maintain the same {style} visual style across all scenes
7. Keep {aspectRatio} aspect ratio consistent]`;

const VIDEO_INSTRUCTION = `[CREATE VIDEO: Generate a smooth, continuous 10-second video clip with natural motion. No static images. Show gradual transformation/progression from the start of this scene.]`;

export function generateStoryboard(input: GeneratorInput): Storyboard {
  const numScenes = input.duration / 10;
  const arc = storyArcs[input.niche].slice(0, numScenes);
  const templates = sceneTemplates[input.niche].slice(0, numScenes);
  const aspectRatio = input.aspectRatio || '9:16';

  const scenes: Scene[] = arc.map((arcTitle, index) => {
    let description = templates[index]
      .replace('{condition}', input.condition || 'Aged')
      .replace('{object}', input.objectName || 'Object')
      .replace('{material}', input.material || 'Metal')
      .replace('{environment}', input.environment || 'Studio')
      .replace('{camera}', input.camera || 'Cinematic')
      .replace('{lighting}', input.lighting || 'Natural')
      .replace('{detail}', input.detailLevel || 'High Detail')
      .replace('{style}', input.style || 'Photorealistic')
      .replace('{aspectRatio}', aspectRatio);

    // Tambahkan Enhanced Master Lock dengan scene number
    const enhancedMasterLock = MASTER_LOCK
      .replace('{sceneNumber}', (index + 1).toString())
      .replace('{totalScenes}', numScenes.toString())
      .replace('{style}', input.style || 'Photorealistic')
      .replace('{aspectRatio}', aspectRatio);

    description = `${description}\n\n${enhancedMasterLock}\n${VIDEO_INSTRUCTION}\nAspect Ratio: ${aspectRatio}`;

    return {
      id: index + 1,
      title: arcTitle,
      description: description.trim(),
      duration: 10,
    };
  });

  return {
    projectName: input.projectName || 'Untitled Project',
    totalDuration: input.duration,
    aspectRatio: aspectRatio as AspectRatio,
    scenes,
  };
}
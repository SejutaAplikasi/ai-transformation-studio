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

// RECOMMENDED SETTINGS per niche (Setting Optimal)
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

// Tambahkan ini di lib/prompt-builder.ts (sekitar baris 40, setelah recommendedSettings)

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

// Template deskripsi per niche
const sceneTemplates: Record<Niche, string[]> = {
  restoration: [
    '{condition} {object} ({material}) discovered in {environment}. {camera} shot, {lighting}, {detail}. Style: {style}.',
    'Close-up cleaning process on {object}. Removing dirt and grime. ASMR visuals, {style}, {detail}.',
    'Repairing damaged parts of {object}. Precision tools, sparks flying. {camera}, {lighting}.',
    'Polishing surface of {object}. Smooth glossy finish emerging. {style} visuals, {detail}.',
    'Final detailing on {object}. Perfect reflections, pristine condition. {camera}, {lighting}.',
    'Fully restored {object} in luxury showcase. Slow cinematic orbit. {lighting}, {detail}.',
  ],
  treasure: [
    'Wide shot of {environment}. Searching for hidden {object} in {condition} state. {camera}, {lighting}.',
    'Ancient clue discovered. Map unfolding, mystery deepening. {camera}, {detail}.',
    'Digging process begins. Dirt flying, {style} visuals. Excavation tools in action.',
    'Breaking through final layer. Tension builds. {camera}, dramatic {lighting}.',
    'Glimpse of {material} {object} spotted. Glow emerging. {detail}.',
    'Glowing {object} fully revealed. Epic cinematic reveal. {lighting}, {detail}.',
  ],
  construction: [
    '{condition}. Surveying and planning in {environment}. Drone shot, {lighting}.',
    'Foundation being laid. Concrete pouring, steel bars. {camera}, {detail}.',
    'Structure rising. Walls being built. Time-lapse style, {style}.',
    'Roof installation. Crane lifting materials. {camera}, {lighting}.',
    'Interior work. Painting, flooring, details. {camera}, {detail}.',
    'Grand opening of completed building. {environment} transformed. Cinematic, {lighting}.',
  ],
  'mini-world': [
    'Macro setup of tiny landscape in {environment}. Starting from {condition}. {camera}, {lighting}, {detail}.',
    'Tiny foundation being laid. Miniature tools, {style} visuals.',
    'Walls being built at micro scale. {camera}, {detail}.',
    'Roof being added to miniature structure. {lighting}, {style}.',
    'Tiny detailing work. Paint, textures. {camera}, {detail}.',
    'Completed miniature masterpiece. Macro cinematic shot. {lighting}.',
  ],
  luxury: [
    '{condition} {material} displayed. {environment} setting. {camera}, {lighting}.',
    'Precision cutting of materials. Sparks, craftsmanship. {style}, {detail}.',
    'Shaping and forming the {object}. Artisan hands at work. {camera}.',
    'Assembly process. Parts coming together. {style}, {lighting}.',
    'Final polishing. Mirror-like finish emerging. {camera}, {detail}.',
    'Luxury showcase of completed {object}. Dramatic {lighting}, {detail}.',
  ],
  evolution: [
    '{condition} of {object} in {environment}. {camera}, {lighting}.',
    'Early transformation begins. Subtle changes. {style}, {detail}.',
    'Mid-evolution stage. Noticeable growth. {camera}, {lighting}.',
    'Advanced form emerging. Complex details. {style}, {detail}.',
    'Near-final state. Almost complete transformation. {camera}.',
    'Final evolution revealed. Majestic {object}. Cinematic {lighting}, {detail}.',
  ],
};

// MASTER LOCK & VIDEO INSTRUCTION (ditambahkan ke setiap prompt)
const MASTER_LOCK = '[Master Lock: Maintain consistent character design, color palette, lighting style, and camera movement throughout all scenes. Do not change the core subject appearance.]';
const VIDEO_INSTRUCTION = '[Create Video: Generate a smooth, continuous video clip with natural motion. No static images.]';

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

    // Tambahkan Master Lock dan Video Instruction
    description = `${description}\n\n${MASTER_LOCK}\n${VIDEO_INSTRUCTION}\nAspect Ratio: ${aspectRatio}`;

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
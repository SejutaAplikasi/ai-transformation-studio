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

// DESKRIPSI ENVIRONMENT DETAIL per niche (DIULANG DI SETIAP SCENE)
const environmentDescriptions: Record<string, string> = {
  'Old Warehouse': 'abandoned old warehouse with dusty wooden floors, broken windows with blue daylight streaming through, rusty metal shelves, cobwebs, and scattered debris. Blue-tinted natural lighting.',
  'Abandoned Garage': 'abandoned garage with concrete floor, oil stains, old tools hanging on walls, dim fluorescent lighting flickering, dusty car parts scattered around.',
  'Attic': 'dusty attic with wooden beams, old trunks, cobwebs, single window with soft daylight, vintage items covered in dust sheets.',
  'Basement': 'dark basement with concrete walls, exposed pipes, single bare bulb, damp floor, old boxes stacked in corners.',
  'Beach': 'sandy beach with gentle waves, driftwood, seashells, golden sunlight, ocean horizon in background.',
  'Forest': 'dense forest with tall trees, moss-covered ground, dappled sunlight through canopy, ferns and mushrooms.',
  'Junkyard': 'rusty junkyard with piles of scrap metal, old tires, broken machinery, overgrown weeds, industrial atmosphere.',
  'Studio': 'professional photography studio with seamless backdrop, softbox lighting, clean minimal environment.',
  'Ancient Ruins': 'ancient stone ruins with moss-covered pillars, crumbling walls, overgrown vines, mystical atmosphere with golden hour lighting.',
  'Open Field': 'vast open field with green grass, distant mountains, clear sky, natural sunlight.',
  'Desk Setup': 'organized desk setup with wooden surface, task lamp, books, small plants, cozy workspace atmosphere.',
  'Luxury Workshop': 'luxury artisan workshop with marble countertops, brass tools, warm lighting, premium materials displayed elegantly.',
  'Mystical Forest': 'mystical dark forest with ancient twisted trees, bioluminescent mushrooms, purple-blue mist, ethereal moonlight filtering through canopy, magical atmosphere.',
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

// Template deskripsi per niche - SETIAP SCENE MENDISKRIPSIKAN ENVIRONMENT YANG SAMA
const sceneTemplates: Record<Niche, string[]> = {
  restoration: [
    'SCENE 1 - DISCOVERY: {condition} {object} ({material}) lying in {ENV_DESC}. {camera} shot, {lighting}, {detail}. Style: {style}. OBJECT LOCK: {object} has distinctive {material} texture with visible rust patterns and scratches.',
    'SCENE 2 - CLEANING: Same {object} in same {ENV_DESC}. Close-up cleaning process. Removing dirt and grime. ASMR visuals, {style}, {detail}. The {material} surface gradually reveals original color. OBJECT LOCK: Same {object} with same rust patterns, same size, same shape.',
    'SCENE 3 - REPAIR: Same {object} in same {ENV_DESC}, now partially clean. Repairing damaged parts. Precision tools, sparks flying. {camera}, {lighting}. OBJECT LOCK: Same {object}, same {material} texture becoming smoother.',
    'SCENE 4 - POLISHING: Same {object} in same {ENV_DESC}, in better condition. Polishing surface. Smooth glossy finish emerging. {style} visuals, {detail}. OBJECT LOCK: Same {object}, same shape, {material} reflects light.',
    'SCENE 5 - DETAILING: Same {object} in same {ENV_DESC}, almost perfect. Final detailing. Perfect reflections, pristine condition. {camera}, {lighting}. OBJECT LOCK: Same {object}, every {material} detail visible.',
    'SCENE 6 - FINAL REVEAL: Same {object} in same {ENV_DESC}, fully restored. Luxury showcase. Slow cinematic orbit. {lighting}, {detail}. OBJECT LOCK: Same {object}, {material} shines like new, identical to previous scenes.',
  ],
  treasure: [
    'SCENE 1 - SEARCH: Wide shot of {ENV_DESC}. Searching for hidden {object} in {condition} state. {camera}, {lighting}. OBJECT LOCK: {object} is made of {material} with unique ancient markings.',
    'SCENE 2 - CLUE: Same {ENV_DESC}. Ancient clue discovered related to {object}. Map unfolding, mystery deepening. {camera}, {detail}. OBJECT LOCK: Same location, same lighting, same atmosphere.',
    'SCENE 3 - EXCAVATION: Digging process begins in same {ENV_DESC}. Dirt flying, {style} visuals. Excavation tools in action. Getting closer to {object}. OBJECT LOCK: Same environment, same time of day.',
    'SCENE 4 - BREAKTHROUGH: Breaking through final layer in same {ENV_DESC}. Tension builds. {camera}, dramatic {lighting}. Glimpse of {material} {object} appears. OBJECT LOCK: Same location, same atmosphere.',
    'SCENE 5 - SPOTTED: Same {ENV_DESC}. Glimpse of {material} {object} spotted. Glow emerging. {detail}. OBJECT LOCK: Same environment, same lighting conditions.',
    'SCENE 6 - REVEAL: Same {ENV_DESC}. {object} fully revealed from same location. Epic cinematic reveal. {lighting}, {detail}. OBJECT LOCK: Same environment, {material} markings glow, identical setting.',
  ],
  construction: [
    'SCENE 1 - SURVEY: {condition}. Surveying and planning in {ENV_DESC}. Drone shot, {lighting}. OBJECT LOCK: Building will have distinctive {material} features.',
    'SCENE 2 - FOUNDATION: Same {ENV_DESC}. Foundation being laid for the structure. Concrete pouring, steel bars. {camera}, {detail}. OBJECT LOCK: Same location, same time, same weather.',
    'SCENE 3 - STRUCTURE: Same {ENV_DESC}. Structure rising from same foundation. Walls being built. Time-lapse style, {style}. OBJECT LOCK: Same environment, same lighting.',
    'SCENE 4 - ROOFING: Same {ENV_DESC}. Roof installation on same structure. Crane lifting materials. {camera}, {lighting}. OBJECT LOCK: Same location, same atmosphere.',
    'SCENE 5 - INTERIOR: Same {ENV_DESC}. Interior work on same structure. Painting, flooring, details. {camera}, {detail}. OBJECT LOCK: Same building, same environment.',
    'SCENE 6 - OPENING: Same {ENV_DESC}. Grand opening of completed building. Cinematic, {lighting}. OBJECT LOCK: Same location transformed, same environment.',
  ],
  'mini-world': [
    'SCENE 1 - SETUP: Macro setup of tiny landscape in {ENV_DESC}. Starting from {condition}. {camera}, {lighting}, {detail}. OBJECT LOCK: Miniature made of {material} with tiny details.',
    'SCENE 2 - FOUNDATION: Same {ENV_DESC}. Tiny foundation being laid for miniature. Miniature tools, {style} visuals. OBJECT LOCK: Same desk/environment, same lighting.',
    'SCENE 3 - WALLS: Same {ENV_DESC}. Walls being built on same foundation. {camera}, {detail}. OBJECT LOCK: Same miniature location, same atmosphere.',
    'SCENE 4 - ROOF: Same {ENV_DESC}. Roof being added to miniature. {lighting}, {style}. OBJECT LOCK: Same environment, same scale, same lighting.',
    'SCENE 5 - DETAILING: Same {ENV_DESC}. Tiny detailing work on same miniature. Paint, textures. {camera}, {detail}. OBJECT LOCK: Same location, same conditions.',
    'SCENE 6 - MASTERPIECE: Same {ENV_DESC}. Completed miniature. Macro cinematic shot. {lighting}. OBJECT LOCK: Same environment, all {material} details visible.',
  ],
  luxury: [
    'SCENE 1 - MATERIALS: {condition} {material} displayed in {ENV_DESC}. {camera}, {lighting}. OBJECT LOCK: Final {object} will showcase premium {material} quality.',
    'SCENE 2 - CUTTING: Same {ENV_DESC}. Precision cutting of same {material}. Sparks, craftsmanship. {style}, {detail}. OBJECT LOCK: Same workshop, same lighting.',
    'SCENE 3 - SHAPING: Same {ENV_DESC}. Shaping and forming the {object} from same {material}. Artisan hands at work. {camera}. OBJECT LOCK: Same environment, same conditions.',
    'SCENE 4 - ASSEMBLY: Same {ENV_DESC}. Assembly process. Same {material} parts coming together. {style}, {lighting}. OBJECT LOCK: Same workshop, same atmosphere.',
    'SCENE 5 - POLISHING: Same {ENV_DESC}. Final polishing of same {object}. Mirror-like finish emerging. {camera}, {detail}. OBJECT LOCK: Same environment, same lighting.',
    'SCENE 6 - SHOWCASE: Same {ENV_DESC}. Same {object} fully completed. Luxury showcase. Dramatic {lighting}, {detail}. OBJECT LOCK: Same workshop, premium {material} quality evident.',
  ],
  evolution: [
    'SCENE 1 - PRIMITIVE: {condition} of {object} resting in {ENV_DESC}. {camera}, {lighting}. OBJECT LOCK: {object} has distinctive {material} texture and unique color pattern.',
    'SCENE 2 - EARLY FORM: Same {object} in same {ENV_DESC}. Early transformation begins. Subtle changes. {style}, {detail}. OBJECT LOCK: Same forest/location, same lighting, same {material} texture evolving, same color pattern shifting.',
    'SCENE 3 - MID EVOLUTION: Same {object} in same {ENV_DESC}. Mid-transformation. Noticeable growth. {camera}, {lighting}. OBJECT LOCK: Same environment, same time of day, same atmosphere, {material} texture more complex.',
    'SCENE 4 - ADVANCED: Same {object} in same {ENV_DESC}. Advanced form emerging. Complex details. {style}, {detail}. OBJECT LOCK: Same location, same lighting, same {material} base, color pattern stabilized.',
    'SCENE 5 - NEAR FINAL: Same {object} in same {ENV_DESC}. Near-final state. Almost complete transformation. {camera}. OBJECT LOCK: Same environment, same conditions, {material} texture perfected.',
    'SCENE 6 - FINAL: Same {object} in same {ENV_DESC}. Final evolution revealed. Majestic form. Cinematic {lighting}, {detail}. OBJECT LOCK: Same location throughout, {material} texture and color pattern fully evolved, identical environment.',
  ],
};

// ENHANCED MASTER LOCK - FOKUS PADA KONSISTENSI ENVIRONMENT
const MASTER_LOCK = `[CRITICAL CONSISTENCY LOCK - Scene {sceneNumber} of {totalScenes}:
⚠️ DO NOT CHANGE THE BACKGROUND/ENVIRONMENT - It must remain EXACTLY as described in ENV_DESC
⚠️ DO NOT CHANGE TIME OF DAY - Keep same lighting conditions (day/night/golden hour) throughout all scenes
⚠️ DO NOT CHANGE WEATHER/ATMOSPHERE - Same mood and atmosphere in every scene
⚠️ KEEP OBJECT IDENTICAL - Same shape, size, color, texture as OBJECT LOCK describes
⚠️ SAME CAMERA STYLE - Consistent framing and movement approach
⚠️ SAME COLOR PALETTE - Do not shift colors between scenes
⚠️ SAME VISUAL STYLE - Maintain {style} throughout
⚠️ Aspect Ratio: {aspectRatio} - Must be consistent]`;

const VIDEO_INSTRUCTION = `[CREATE VIDEO: Generate a smooth, continuous 10-second video clip. Show gradual transformation/progression. The background must remain STABLE and CONSISTENT - no sudden environment changes. Natural motion only, no static images.]`;

export function generateStoryboard(input: GeneratorInput): Storyboard {
  const numScenes = input.duration / 10;
  const arc = storyArcs[input.niche].slice(0, numScenes);
  const templates = sceneTemplates[input.niche].slice(0, numScenes);
  const aspectRatio = input.aspectRatio || '9:16';
  
  // Ambil deskripsi environment yang detail (atau fallback ke nama environment)
  const envDesc = environmentDescriptions[input.environment] || input.environment;

  const scenes: Scene[] = arc.map((arcTitle, index) => {
    let description = templates[index]
      .replace('{condition}', input.condition || 'Aged')
      .replace('{object}', input.objectName || 'Object')
      .replace('{material}', input.material || 'Metal')
      .replace('{ENV_DESC}', envDesc) // GANTI DENGAN DESKRIPSI DETAIL
      .replace('{environment}', input.environment)
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

    description = `${description}\n\n${enhancedMasterLock}\n${VIDEO_INSTRUCTION}`;

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
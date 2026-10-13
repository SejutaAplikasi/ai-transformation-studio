// lib/prompt-builder.ts - VERSI 2 - FULL PATCH ANTI BOCOR 6 NICHE
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

export const recommendedObjects: Record<Niche, string[]> = {
  restoration: ["Mobil Porsche Mainan Berkarat", "Sepatu Sneaker Vintage 90an", "Jam Tangan Mekanik Antik", "Kamera Analog Tua", "Console Game Retro Debu"],
  treasure: ["Peti Harta Karun Mini", "Pedang Naga Kuno", "Cincin Permata Tersembunyi", "Peta Rahasia Kuno", "Topeng Emas Firaun"],
  construction: ["Rumah Pohon Miniatur", "Jembatan Gantung Kayu", "Benteng Kastil Lego", "Roket Luar Angkasa Mainan", "Menara Eiffel Mini"],
  "mini-world": ["Kafe Mini di Atas Meja", "Taman Bonsai Miniatur", "Kamar Tidur Boneka Detail", "Bengkel Mekanik Kecil", "Toko Roti Mini Satisfying"],
  luxury: ["Jam Tangan Mewah Diamond", "Mobil Sport Klasik Merah", "Tas Kulit Branded Premium", "Botol Parfum Mewah", "Perhiasan Kalung Berlian"],
  evolution: ["Naga Kecil Menetas", "Robot Masa Depan", "Kupu-kupu Kristal Ajaib", "Pohon Raksasa Tumbuh", "Monster Laut Purba"],
};

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

const storyArcs: Record<Niche, string[]> = {
  restoration: ['DISCOVERY', 'CLEANING', 'REPAIR', 'POLISHING', 'DETAILING', 'FINAL REVEAL'],
  treasure: ['THE SEARCH', 'CLUE FOUND', 'EXCAVATION', 'BREAKING THROUGH', 'TREASURE SPOTTED', 'TREASURE REVEAL'],
  construction: ['LAND SURVEY', 'FOUNDATION', 'STRUCTURE BUILD', 'ROOFING', 'INTERIOR', 'GRAND OPENING'],
  'mini-world': ['LANDSCAPE SETUP', 'TINY FOUNDATION', 'WALLS BUILD', 'ROOF ADD', 'DETAILING', 'MINIATURE MASTERPIECE'],
  luxury: ['RAW MATERIALS', 'CUTTING', 'SHAPING', 'ASSEMBLY', 'POLISHING', 'LUXURY SHOWCASE'],
  evolution: ['PRIMITIVE STATE', 'EARLY FORM', 'MID EVOLUTION', 'ADVANCED FORM', 'NEAR FINAL', 'FINAL EVOLUTION'],
};

const sceneTemplates: Record<Niche, string[]> = {
  restoration: [
    'SCENE 1 - DISCOVERY: {condition} {object} ({material}) lying untouched in {ENV_DESC}. {camera} shot, {lighting}, {detail}. Style: {style}. OBJECT LOCK: {object} has distinctive {material} texture with visible rust patterns and scratches, completely dirty, no cleaning yet.',
    'SCENE 2 - CLEANING: Same {object} in same {ENV_DESC}. Initial dry cleaning only, removing loose dust with soft brush, no soap yet. ASMR visuals, {style}, {detail}. OBJECT LOCK: Same {object} with same rust patterns, same size, same shape.',
    'SCENE 3 - REPAIR: Same {object} in same {ENV_DESC}, now dust-free but still rusty. Repairing damaged parts with precision tools. {camera}, {lighting}. OBJECT LOCK: Same {object}, same {material} texture becoming smoother.',
    'SCENE 4 - POLISHING: Same {object} in same {ENV_DESC}, in better condition. Polishing surface with soapy water and polishing compound. Smooth glossy finish emerging. {style} visuals, {detail}. OBJECT LOCK: Same {object}, same shape, {material} reflects light.',
    'SCENE 5 - DETAILING: Same {object} in same {ENV_DESC}, almost perfect. Final detailing with microfiber cloth. Perfect reflections, pristine condition. {camera}, {lighting}. OBJECT LOCK: Same {object}, every {material} detail visible.',
    'SCENE 6 - FINAL REVEAL: Same {object} in same {ENV_DESC}, fully restored. Luxury showcase, slow cinematic orbit. {lighting}, {detail}. OBJECT LOCK: Same {object}, {material} shines like new, identical to previous scenes.',
  ],
  treasure: [
    'SCENE 1 - SEARCH: Wide shot of {ENV_DESC} with {condition} condition, no treasure visible yet, only empty ground and searching atmosphere. {camera}, {lighting}. OBJECT LOCK: Hidden {object} will be made of {material} with unique ancient markings, but NOT visible in this scene.',
    'SCENE 2 - CLUE: Same {ENV_DESC}. Ancient clue discovered related to {object}, map or symbol on stone wall. {camera}, {detail}. OBJECT LOCK: Same location, same lighting, same atmosphere, treasure still hidden.',
    'SCENE 3 - EXCAVATION: Digging process begins in same {ENV_DESC}. Dirt flying, {style} visuals, excavation tools in action, hole getting deeper. OBJECT LOCK: Same environment, same time of day.',
    'SCENE 4 - BREAKTHROUGH: Breaking through final layer in same {ENV_DESC}. Tension builds. {camera}, dramatic {lighting}. Tiny glimpse of {material} {object} appears under dirt. OBJECT LOCK: Same location, same atmosphere.',
    'SCENE 5 - SPOTTED: Same {ENV_DESC}. {material} {object} spotted with magical glow emerging from dirt. {detail}. OBJECT LOCK: Same environment, same lighting conditions.',
    'SCENE 6 - REVEAL: Same {ENV_DESC}. {object} fully revealed and lifted from same location. Epic cinematic reveal. {lighting}, {detail}. OBJECT LOCK: Same environment, {material} markings glow, identical setting.',
  ],
  construction: [
    'SCENE 1 - SURVEY: {condition} empty land in {ENV_DESC}, no building yet, only surveying stakes and empty grass. Drone shot, {lighting}. OBJECT LOCK: Future building will have distinctive {material} features but not visible yet.',
    'SCENE 2 - FOUNDATION: Same {ENV_DESC}. Foundation being laid, concrete pouring, steel bars, trench only. {camera}, {detail}. OBJECT LOCK: Same location, same time, same weather, only foundation.',
    'SCENE 3 - STRUCTURE: Same {ENV_DESC}. Structure rising from same foundation, walls being built, time-lapse style, {style}. OBJECT LOCK: Same environment, same lighting, walls only no roof yet.',
    'SCENE 4 - ROOFING: Same {ENV_DESC}. Roof installation on same structure, crane lifting materials. {camera}, {lighting}. OBJECT LOCK: Same location, same atmosphere, roofing only.',
    'SCENE 5 - INTERIOR: Same {ENV_DESC}. Interior work on same structure, painting, flooring, details. {camera}, {detail}. OBJECT LOCK: Same building, same environment, interior only.',
    'SCENE 6 - OPENING: Same {ENV_DESC}. Grand opening of completed building, lights on. Cinematic, {lighting}. OBJECT LOCK: Same location transformed, same environment.',
  ],
  'mini-world': [
    'SCENE 1 - SETUP: Macro setup of empty tiny landscape in {ENV_DESC}, starting from {condition}, no building yet, only messy base. {camera}, {lighting}, {detail}. OBJECT LOCK: Future miniature made of {material} with tiny details, not built yet.',
    'SCENE 2 - FOUNDATION: Same {ENV_DESC}. Tiny foundation being laid for miniature, miniature tools, {style} visuals. OBJECT LOCK: Same desk/environment, same lighting, foundation only.',
    'SCENE 3 - WALLS: Same {ENV_DESC}. Walls being built on same foundation. {camera}, {detail}. OBJECT LOCK: Same miniature location, same atmosphere, walls only.',
    'SCENE 4 - ROOF: Same {ENV_DESC}. Roof being added to miniature. {lighting}, {style}. OBJECT LOCK: Same environment, same scale, same lighting, roof only.',
    'SCENE 5 - DETAILING: Same {ENV_DESC}. Tiny detailing work on same miniature, paint, textures, tiny furniture. {camera}, {detail}. OBJECT LOCK: Same location, same conditions, detailing only.',
    'SCENE 6 - MASTERPIECE: Same {ENV_DESC}. Completed miniature, macro cinematic shot, warm glow. {lighting}. OBJECT LOCK: Same environment, all {material} details visible, finished.',
  ],
  luxury: [
    'SCENE 1 - MATERIALS: {condition} {material} raw display in {ENV_DESC}, scattered unprocessed, no cutting yet. {camera}, {lighting}. OBJECT LOCK: Final {object} will showcase premium {material} quality, raw state only now.',
    'SCENE 2 - CUTTING: Same {ENV_DESC}. Precision cutting of same {material}, sparks, craftsmanship. {style}, {detail}. OBJECT LOCK: Same workshop, same lighting, cutting only.',
    'SCENE 3 - SHAPING: Same {ENV_DESC}. Shaping and forming the {object} from same {material}, artisan hands at work. {camera}. OBJECT LOCK: Same environment, same conditions, shaping only.',
    'SCENE 4 - ASSEMBLY: Same {ENV_DESC}. Assembly process, same {material} parts coming together. {style}, {lighting}. OBJECT LOCK: Same workshop, same atmosphere, assembly only.',
    'SCENE 5 - POLISHING: Same {ENV_DESC}. Final polishing of same {object}, mirror-like finish emerging. {camera}, {detail}. OBJECT LOCK: Same environment, same lighting, polishing only.',
    'SCENE 6 - SHOWCASE: Same {ENV_DESC}. Same {object} fully completed, luxury showcase on pedestal. Dramatic {lighting}, {detail}. OBJECT LOCK: Same workshop, premium {material} quality evident, finished.',
  ],
  evolution: [
    'SCENE 1 - PRIMITIVE: {condition} of {object} resting completely still in {ENV_DESC}, no movement, egg/cell static. {camera}, {lighting}. OBJECT LOCK: {object} has distinctive {material} texture and unique color pattern, primitive state only, no growth.',
    'SCENE 2 - EARLY FORM: Same {object} in same {ENV_DESC}. Early transformation begins, subtle cracks and tiny movement, no large growth yet. {style}, {detail}. OBJECT LOCK: Same forest/location, same lighting, same {material} texture evolving slightly.',
    'SCENE 3 - MID EVOLUTION: Same {object} in same {ENV_DESC}. Mid-transformation, noticeable growth, limbs forming. {camera}, {lighting}. OBJECT LOCK: Same environment, same time of day, same atmosphere, {material} texture more complex.',
    'SCENE 4 - ADVANCED: Same {object} in same {ENV_DESC}. Advanced form emerging, complex details, bigger size. {style}, {detail}. OBJECT LOCK: Same location, same lighting, same {material} base, color pattern stabilized.',
    'SCENE 5 - NEAR FINAL: Same {object} in same {ENV_DESC}. Near-final state, almost complete transformation, majestic but not final. {camera}. OBJECT LOCK: Same environment, same conditions, {material} texture perfected.',
    'SCENE 6 - FINAL: Same {object} in same {ENV_DESC}. Final evolution revealed, majestic final form, cinematic {lighting}, {detail}. OBJECT LOCK: Same location throughout, {material} texture and color pattern fully evolved, identical environment.',
  ],
};

// --- PATCH V2: FORBIDDEN LIST PER NICHE PER SCENE ---
const forbiddenByNiche: Record<Niche, string[]> = {
  restoration: [
    "SCENE 1 FORBIDDEN: NO cleaning, NO soap, NO water, NO foam, NO brush contact, NO hands touching object, NO wiping, NO scrubbing, NO polishing, NO clean surface",
    "SCENE 2 FORBIDDEN: NO soap, NO water, NO wet cleaning, NO repair tools, NO polishing machine, NO fully clean result, only dry dusting",
    "SCENE 3 FORBIDDEN: NO soap, NO final polish, NO glossy finish yet, only repair and sanding",
    "SCENE 4 FORBIDDEN: NO final detailing, NO pristine mirror finish yet, only polishing stage",
    "SCENE 5 FORBIDDEN: NO dirt left, NO construction, only fine detailing",
    "SCENE 6 FORBIDDEN: NO dirt, NO rust, NO damage, fully restored only, showcase only",
  ],
  treasure: [
    "SCENE 1 FORBIDDEN: NO treasure visible, NO chest, NO gold, NO jewel, NO clue visible, only empty environment searching",
    "SCENE 2 FORBIDDEN: NO excavation, NO digging, NO treasure visible, only clue/map discovery",
    "SCENE 3 FORBIDDEN: NO breakthrough, NO glimpse of treasure, only digging dirt",
    "SCENE 4 FORBIDDEN: NO full reveal, NO open chest, only small glimpse under dirt",
    "SCENE 5 FORBIDDEN: NO fully lifted treasure, only spotted glow in ground",
    "SCENE 6 FORBIDDEN: NO empty hole only, treasure must be fully revealed",
  ],
  construction: [
    "SCENE 1 FORBIDDEN: NO foundation, NO concrete, NO walls, NO roof, NO structure, empty land only",
    "SCENE 2 FORBIDDEN: NO walls, NO roof, NO interior, NO finished building, foundation only",
    "SCENE 3 FORBIDDEN: NO roof, NO interior, NO finished building, structure/walls only",
    "SCENE 4 FORBIDDEN: NO interior work, NO finished building, roofing only",
    "SCENE 5 FORBIDDEN: NO exterior construction, NO grand opening, interior work only",
    "SCENE 6 FORBIDDEN: NO construction materials, NO unfinished state, finished building only",
  ],
  'mini-world': [
    "SCENE 1 FORBIDDEN: NO building, NO walls, NO roof, empty base only",
    "SCENE 2 FORBIDDEN: NO walls, NO roof, foundation only",
    "SCENE 3 FORBIDDEN: NO roof, NO detailing, walls only",
    "SCENE 4 FORBIDDEN: NO interior detailing, NO furniture, roof only",
    "SCENE 5 FORBIDDEN: NO empty state, detailing only, no major construction",
    "SCENE 6 FORBIDDEN: NO unfinished state, finished miniature only",
  ],
  luxury: [
    "SCENE 1 FORBIDDEN: NO cutting, NO shaping, NO assembly, NO polishing, raw materials only",
    "SCENE 2 FORBIDDEN: NO shaping, NO assembly, NO polishing, cutting only",
    "SCENE 3 FORBIDDEN: NO assembly, NO polishing, shaping only",
    "SCENE 4 FORBIDDEN: NO polishing, NO showcase, assembly only",
    "SCENE 5 FORBIDDEN: NO raw materials, NO cutting, polishing only",
    "SCENE 6 FORBIDDEN: NO raw state, NO tools in action, luxury showcase only",
  ],
  evolution: [
    "SCENE 1 FORBIDDEN: NO movement, NO hatching, NO cracking, NO growth, NO limbs, static egg/primitive only, completely still",
    "SCENE 2 FORBIDDEN: NO large growth, NO advanced form, NO final form, only subtle early cracks and tiny movement",
    "SCENE 3 FORBIDDEN: NO final form, NO advanced wings/details fully formed, mid evolution only",
    "SCENE 4 FORBIDDEN: NO final evolution, NO baby to adult instant jump, advanced form only",
    "SCENE 5 FORBIDDEN: NO primitive state, NO egg, near final only",
    "SCENE 6 FORBIDDEN: NO egg, NO primitive, final majestic form only",
  ],
};

const videoInstructionsByNiche: Record<Niche, string[]> = {
  restoration: [
    "[VIDEO LOCK SCENE 1: NO transformation, NO cleaning action, NO human hands, NO soap, NO water, NO brush contact. Object is completely untouched and static, super dirty. Only subtle camera movement - slow push-in macro. Background STABLE.]",
    "[VIDEO LOCK SCENE 2: Dry dusting only with soft brush, no water/soap. Loose dust particles flying, ASMR. Background STABLE.]",
    "[VIDEO LOCK SCENE 3: Repair phase, sanding, fixing broken parts, sparks if metal. Background STABLE.]",
    "[VIDEO LOCK SCENE 4: Wet cleaning with soap, scrubbing, foam, polishing compound, glossy emergence. Background STABLE.]",
    "[VIDEO LOCK SCENE 5: Final detailing with microfiber, perfect reflections, pristine. Background STABLE.]",
    "[VIDEO LOCK SCENE 6: Slow cinematic orbit showcase, luxury lighting, no more cleaning. Background STABLE.]",
  ],
  treasure: [
    "[VIDEO LOCK SCENE 1: Empty environment only, no treasure. Slow search camera pan, atmospheric, no object visible. Background STABLE.]",
    "[VIDEO LOCK SCENE 2: Discovery of clue, map unfolding, symbol glowing, no digging. Background STABLE.]",
    "[VIDEO LOCK SCENE 3: Digging and excavation, dirt flying, shovel action, hole getting deeper, no treasure yet. Background STABLE.]",
    "[VIDEO LOCK SCENE 4: Breaking final layer, tension, small glimpse of gold/material under dirt. Background STABLE.]",
    "[VIDEO LOCK SCENE 5: Treasure spotted with glow, half buried, magical light. Background STABLE.]",
    "[VIDEO LOCK SCENE 6: Full epic reveal, treasure lifted, cinematic. Background STABLE.]",
  ],
  construction: [
    "[VIDEO LOCK SCENE 1: Empty land survey only, drone slow push, no building. Background STABLE.]",
    "[VIDEO LOCK SCENE 2: Foundation pouring, concrete, steel, trench. Time-lapse foundation. Background STABLE.]",
    "[VIDEO LOCK SCENE 3: Walls rising, bricks/wood stacking, structure build. Background STABLE.]",
    "[VIDEO LOCK SCENE 4: Roof installation, crane lifting. Background STABLE.]",
    "[VIDEO LOCK SCENE 5: Interior work, painting, flooring. Background STABLE.]",
    "[VIDEO LOCK SCENE 6: Grand opening, lights on, finished building showcase. Background STABLE.]",
  ],
  'mini-world': [
    "[VIDEO LOCK SCENE 1: Empty base only, messy desk, no building. Macro setup. Background STABLE.]",
    "[VIDEO LOCK SCENE 2: Tiny foundation laid, miniature tools. Background STABLE.]",
    "[VIDEO LOCK SCENE 3: Walls built, tiny bricks. Background STABLE.]",
    "[VIDEO LOCK SCENE 4: Roof added, tiny tiles. Background STABLE.]",
    "[VIDEO LOCK SCENE 5: Detailing, tiny furniture, paint. Background STABLE.]",
    "[VIDEO LOCK SCENE 6: Finished miniature showcase, macro cinematic. Background STABLE.]",
  ],
  luxury: [
    "[VIDEO LOCK SCENE 1: Raw materials static display, no tools action. Studio lighting. Background STABLE.]",
    "[VIDEO LOCK SCENE 2: Precision cutting, sparks, craftsmanship. Background STABLE.]",
    "[VIDEO LOCK SCENE 3: Shaping and forming, artisan hands. Background STABLE.]",
    "[VIDEO LOCK SCENE 4: Assembly, parts coming together. Background STABLE.]",
    "[VIDEO LOCK SCENE 5: Polishing to mirror finish. Background STABLE.]",
    "[VIDEO LOCK SCENE 6: Luxury showcase on pedestal, dramatic lighting. Background STABLE.]",
  ],
  evolution: [
    "[VIDEO LOCK SCENE 1: Primitive state completely static, no movement, egg still, subtle breathing only, no hatching. Background STABLE.]",
    "[VIDEO LOCK SCENE 2: Early subtle changes, small cracks, tiny wiggle, early transformation begins. Background STABLE.]",
    "[VIDEO LOCK SCENE 3: Mid evolution growth, limbs forming, noticeable growth. Background STABLE.]",
    "[VIDEO LOCK SCENE 4: Advanced form emerging, bigger, complex details. Background STABLE.]",
    "[VIDEO LOCK SCENE 5: Near final state, almost complete, majestic. Background STABLE.]",
    "[VIDEO LOCK SCENE 6: Final evolution majestic reveal, cinematic. Background STABLE.]",
  ],
};

const MASTER_LOCK_TEMPLATE = `[CRITICAL CONSISTENCY LOCK - Scene {sceneNumber} of {totalScenes}:
⚠ BACKGROUND LOCKED: {ENV_DESC} - EXACTLY same environment, no change, no replacement, no new props
⚠ TIME & LIGHTING LOCKED: {lighting} - Keep same time of day
⚠ OBJECT LOCK: {object} ({material}) - Same shape, size, color, texture, identical rust/pattern as previous scenes
⚠ CAMERA: {camera} - Consistent style
⚠ STYLE: {style} - Consistent
⚠ ASPECT RATIO: {aspectRatio} - Must be consistent
⚠ {forbidden}]`;

export function generateStoryboard(input: GeneratorInput): Storyboard {
  const numScenes = input.duration / 10;
  const arc = storyArcs[input.niche].slice(0, numScenes);
  const templates = sceneTemplates[input.niche].slice(0, numScenes);
  const videoInstructions = videoInstructionsByNiche[input.niche].slice(0, numScenes);
  const forbiddenList = forbiddenByNiche[input.niche].slice(0, numScenes);
  const aspectRatio = input.aspectRatio || '9:16';
  const envDesc = environmentDescriptions[input.environment] || input.environment;

  const scenes: Scene[] = arc.map((arcTitle, index) => {
    const sceneNumber = index + 1;
    let description = templates[index]
      .replaceAll('{condition}', input.condition || 'Aged')
      .replaceAll('{object}', input.objectName || 'Object')
      .replaceAll('{material}', input.material || 'Metal')
      .replaceAll('{ENV_DESC}', envDesc)
      .replaceAll('{environment}', input.environment)
      .replaceAll('{camera}', input.camera || 'Cinematic')
      .replaceAll('{lighting}', input.lighting || 'Natural')
      .replaceAll('{detail}', input.detailLevel || 'High Detail')
      .replaceAll('{style}', input.style || 'Photorealistic')
      .replaceAll('{aspectRatio}', aspectRatio);

    const masterLock = MASTER_LOCK_TEMPLATE
      .replace('{sceneNumber}', sceneNumber.toString())
      .replace('{totalScenes}', numScenes.toString())
      .replaceAll('{ENV_DESC}', envDesc)
      .replaceAll('{object}', input.objectName || 'Object')
      .replaceAll('{material}', input.material || 'Metal')
      .replaceAll('{style}', input.style || 'Photorealistic')
      .replaceAll('{camera}', input.camera || 'Cinematic')
      .replaceAll('{lighting}', input.lighting || 'Natural')
      .replaceAll('{aspectRatio}', aspectRatio)
      .replace('{forbidden}', forbiddenList[index]);

    const finalPrompt = `${description}\n\n${masterLock}\n${videoInstructions[index]}`;

    return {
      id: sceneNumber,
      title: arcTitle,
      description: finalPrompt.trim(),
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

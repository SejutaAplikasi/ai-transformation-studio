// lib/catalog.ts
// Data UI yang AMAN dikirim ke browser (tanpa template prompt).
// Template prompt ada di lib/prompt-engine.ts (server-only).
import type { Niche, InitialCondition, RecommendedSettings, ViralHook, ViralHookMeta, Duration } from '@/types/prompt';

export const conditionsByNiche: Record<Niche, InitialCondition[]> = {
  restoration: [
    'Penuh Noda', 'Berkarat & Lapuk', 'Cat Mengelupas', 'Menguning Karena Usia',
    'Penuh Goresan', 'Berjamur & Lembap', 'Lengket & Berminyak', 'Retak & Rusak',
    'Terlupakan di Gudang', 'Rusak Akibat Cat Semprot', 'Terbengkalai Bertahun-tahun', 'Super Kotor',
    'Terkubur Lumpur Magnetik', 'Terperangkap Slime Hitam', 'Beku Dalam Es Kotor', // v2.4 new
  ],
  treasure: [
    'Terkubur Dalam Tanah', 'Tersembunyi di Gua Gelap', 'Terendam di Dasar Laut',
    'Terbungkus Rantai Kuno', 'Terjebak di Dalam Peti', 'Terpendam di Pasir Gurun',
    'Terkunci di Ruang Rahasia', 'Terlindungi Monster Penjaga', 'Tersebar di Beberapa Lokasi',
    'Disamarkan Sebagai Batu Biasa', 'Terkubur Lumpur Magnetik', 'Beku Dalam Es Kristal',
  ],
  construction: ['Lahan Kosong Berumput', 'Tanah Berbatu Keras', 'Lahan Berawa', 'Lereng Bukit Curam', 'Lahan Pasir Gersang', 'Bekas Area Tambang', 'Hutan yang Ditebangi', 'Lahan Rawa Kering'],
  'mini-world': ['Meja Kerja Berantakan', 'Rak Buku Berdebu', 'Dapur Miniatur', 'Taman Belakang Rumah', 'Kotak Pasir Anak', 'Lemari Tua Berdebu', 'Jendela Berembun', 'Atas Meja Belajar'],
  luxury: ['Bahan Mentah Berantakan', 'Logam Belum Ditempa', 'Berlian Kasar', 'Kulit Mentah', 'Kayu Gelondongan', 'Kain Belum Dijahit', 'Emas Batangan', 'Kristal Belum Diasah'],
  evolution: ['Telur Misterius', 'Larva Kecil', 'Bentuk Amorf', 'Makhluk Mini', 'Organisme Primordial', 'Cangkang Retak', 'Spora Terbang', 'Sel Tunggal'],
};

export const recommendedSettings: Record<Niche, RecommendedSettings> = {
  restoration: { duration: 60, aspectRatio: '9:16', condition: 'Berkarat & Lapuk', environment: 'Old Warehouse', style: 'Satisfying Cleaning', camera: 'Macro Close-Up', lighting: 'Studio', detailLevel: 'Extreme Detail' },
  treasure: { duration: 30, aspectRatio: '9:16', condition: 'Terkubur Dalam Tanah', environment: 'Ancient Ruins', style: 'Cinematic Realism', camera: 'Handheld', lighting: 'Dramatic', detailLevel: 'High Detail' },
  construction: { duration: 60, aspectRatio: '16:9', condition: 'Lahan Kosong Berumput', environment: 'Open Field', style: 'Documentary Style', camera: 'Drone', lighting: 'Golden Hour', detailLevel: 'High Detail' },
  'mini-world': { duration: 30, aspectRatio: '9:16', condition: 'Meja Kerja Berantakan', environment: 'Desk Setup', style: 'Miniature Tilt-Shift', camera: 'Macro Close-Up', lighting: 'Natural', detailLevel: 'Extreme Detail' },
  luxury: { duration: 30, aspectRatio: '16:9', condition: 'Bahan Mentah Berantakan', environment: 'Luxury Workshop', style: 'Luxury Commercial', camera: 'Cinema Lens', lighting: 'Studio', detailLevel: 'Extreme Detail' },
  evolution: { duration: 30, aspectRatio: '9:16', condition: 'Telur Misterius', environment: 'Mystical Forest', style: 'Dark Fantasy', camera: 'Tracking Shot', lighting: 'Dramatic', detailLevel: 'High Detail' },
};

export const recommendedObjects: Record<Niche, string[]> = {
  restoration: ["Mobil Porsche Mainan Berkarat", "Sepatu Sneaker Vintage 90an", "Jam Tangan Mekanik Antik", "Kamera Analog Tua", "Console Game Retro Debu"],
  treasure: ["Peti Harta Karun Mini", "Pedang Naga Kuno", "Cincin Permata Tersembunyi", "Peta Rahasia Kuno", "Topeng Emas Firaun"],
  construction: ["Rumah Pohon Miniatur", "Jembatan Gantung Kayu", "Benteng Kastil Lego", "Roket Luar Angkasa Mainan", "Menara Eiffel Mini"],
  "mini-world": ["Kafe Mini di Atas Meja", "Taman Bonsai Miniatur", "Kamar Tidur Boneka Detail", "Bengkel Mekanik Kecil", "Toko Roti Mini Satisfying"],
  luxury: ["Jam Tangan Mewah Diamond", "Mobil Sport Klasik Merah", "Tas Kulit Branded Premium", "Botol Parfum Mewah", "Perhiasan Kalung Berlian"],
  evolution: ["Naga Kecil Menetas", "Robot Masa Depan", "Kupu-kupu Kristal Ajaib", "Pohon Raksasa Tumbuh", "Monster Laut Purba"],
};


// v2.4 VIRAL HOOK DEFINITIONS
export const viralHooks: ViralHookMeta[] = [
  { value: 'none', label: 'Standard (No Hook)', description: 'Flow normal tanpa viral hook', icon: '⚪', bestFor: [] },
  { value: 'magnetic-mud', label: 'Magnetic Mud Burial', description: 'Terkubur lumpur magnetik / slime - tarik satisfying', icon: '🖤', bestFor: ['restoration', 'treasure'] },
  { value: 'laser-cleaning', label: 'Laser Cleaning Beam', description: 'Laser hapus karat 1x sapu', icon: '🔴', bestFor: ['restoration', 'luxury'] },
  { value: 'exploded-float', label: 'Exploded Floating Parts', description: 'Part melayang di udara - teardown aesthetic', icon: '💥', bestFor: ['restoration', 'construction', 'mini-world'] },
  { value: 'chrome-dip', label: 'Chrome Dip Reveal', description: 'Celup cairan chrome / cat - hitam jadi kinclong', icon: '🪞', bestFor: ['restoration', 'luxury'] },
  { value: 'pressure-wash', label: 'Pressure Washer 3000 PSI', description: 'Semprotan super kuat - satisfying deep clean', icon: '💦', bestFor: ['restoration', 'construction'] },
  { value: 'cut-in-half', label: "Cut In Half - What's Inside?", description: 'Belah jadi 2 pakai gerinda - lihat dalamnya', icon: '🪚', bestFor: ['restoration', 'luxury', 'mini-world'] },
  { value: 'asmr-tapping', label: 'ASMR Tapping & Scratching', description: 'Ketok-ketok & garuk karat', icon: '👆', bestFor: ['restoration', 'treasure'] },
  { value: 'time-reverse', label: 'Time Reverse Effect', description: 'Video kebalik - hancur jadi utuh', icon: '⏪', bestFor: ['restoration', 'construction', 'evolution'] },
];

// Hook 'none' cocok di semua niche; hook lain hanya di niche yang tercantum pada bestFor.
export function isHookCompatible(hook: ViralHook, niche: Niche): boolean {
  if (hook === 'none') return true;
  const meta = viralHooks.find((h) => h.value === hook);
  return !!meta && meta.bestFor.includes(niche);
}

// ---------------------------------------------------------------------------
// Material & profil objek (v3)
// value = frasa Inggris yang masuk ke prompt, label = tampilan di UI.
// ---------------------------------------------------------------------------
export interface MaterialOption { value: string; label: string }

export const materialOptions: MaterialOption[] = [
  { value: 'metal', label: 'Logam' },
  { value: 'die-cast metal and plastic', label: 'Die-Cast (Logam & Plastik)' },
  { value: 'plastic', label: 'Plastik (Mainan)' },
  { value: 'fabric and rubber', label: 'Kain & Karet (Sepatu)' },
  { value: 'stainless steel and leather', label: 'Baja & Kulit (Jam Tangan)' },
  { value: 'stainless steel and diamonds', label: 'Baja & Berlian' },
  { value: 'glass and metal', label: 'Kaca & Logam (Kamera)' },
  { value: 'glass', label: 'Kaca (Botol Parfum)' },
  { value: 'gold and gemstone', label: 'Emas & Permata' },
  { value: 'diamond and white gold', label: 'Berlian & Emas Putih' },
  { value: 'wood and gold', label: 'Kayu & Emas' },
  { value: 'wood and fabric', label: 'Kayu & Kain' },
  { value: 'wood and rope', label: 'Kayu & Tali' },
  { value: 'wood and moss', label: 'Kayu & Lumut' },
  { value: 'leather', label: 'Kulit' },
  { value: 'ancient bronze', label: 'Perunggu Kuno' },
  { value: 'aged parchment', label: 'Perkamen Kuno' },
  { value: 'crystal and metal', label: 'Kristal & Logam' },
  { value: 'metal and glowing circuits', label: 'Logam & Sirkuit' },
  { value: 'scaly skin', label: 'Kulit Bersisik (Makhluk)' },
];

export interface ObjectProfile { material: string; objectType: string }

// Objek yang direkomendasikan: pemetaan eksplisit (tidak ditebak dari kata kunci)
export const objectProfiles: Record<string, ObjectProfile> = {
  'Mobil Porsche Mainan Berkarat': { material: 'die-cast metal and plastic', objectType: 'Toy' },
  'Sepatu Sneaker Vintage 90an': { material: 'fabric and rubber', objectType: 'Sneaker' },
  'Jam Tangan Mekanik Antik': { material: 'stainless steel and leather', objectType: 'Watch' },
  'Kamera Analog Tua': { material: 'glass and metal', objectType: 'Camera' },
  'Console Game Retro Debu': { material: 'plastic', objectType: 'Toy' },
  'Peti Harta Karun Mini': { material: 'wood and gold', objectType: 'Artifact' },
  'Pedang Naga Kuno': { material: 'ancient bronze', objectType: 'Artifact' },
  'Cincin Permata Tersembunyi': { material: 'gold and gemstone', objectType: 'Jewelry' },
  'Peta Rahasia Kuno': { material: 'aged parchment', objectType: 'Artifact' },
  'Topeng Emas Firaun': { material: 'gold and gemstone', objectType: 'Artifact' },
  'Rumah Pohon Miniatur': { material: 'wood and fabric', objectType: 'Miniature' },
  'Jembatan Gantung Kayu': { material: 'wood and rope', objectType: 'Miniature' },
  'Benteng Kastil Lego': { material: 'plastic', objectType: 'Toy' },
  'Roket Luar Angkasa Mainan': { material: 'plastic', objectType: 'Toy' },
  'Menara Eiffel Mini': { material: 'metal', objectType: 'Miniature' },
  'Kafe Mini di Atas Meja': { material: 'wood and fabric', objectType: 'Miniature' },
  'Taman Bonsai Miniatur': { material: 'wood and moss', objectType: 'Miniature' },
  'Kamar Tidur Boneka Detail': { material: 'wood and fabric', objectType: 'Miniature' },
  'Bengkel Mekanik Kecil': { material: 'metal', objectType: 'Miniature' },
  'Toko Roti Mini Satisfying': { material: 'wood and fabric', objectType: 'Miniature' },
  'Jam Tangan Mewah Diamond': { material: 'stainless steel and diamonds', objectType: 'Watch' },
  'Mobil Sport Klasik Merah': { material: 'metal', objectType: 'Vehicle' },
  'Tas Kulit Branded Premium': { material: 'leather', objectType: 'Bag' },
  'Botol Parfum Mewah': { material: 'glass', objectType: 'Bottle' },
  'Perhiasan Kalung Berlian': { material: 'diamond and white gold', objectType: 'Jewelry' },
  'Naga Kecil Menetas': { material: 'scaly skin', objectType: 'Creature' },
  'Robot Masa Depan': { material: 'metal and glowing circuits', objectType: 'Machine' },
  'Kupu-kupu Kristal Ajaib': { material: 'crystal and metal', objectType: 'Creature' },
  'Pohon Raksasa Tumbuh': { material: 'wood and moss', objectType: 'Plant' },
  'Monster Laut Purba': { material: 'scaly skin', objectType: 'Creature' },
};

// Tebakan untuk nama objek buatan sendiri. Urutan = dari yang paling spesifik.
const keywordRules: { pattern: RegExp; profile: ObjectProfile }[] = [
  { pattern: /(mobil|car|motor|truk|truck).*(mainan|toy|diecast|die-cast)|(mainan|toy|diecast|die-cast).*(mobil|car|motor|truk|truck)/i, profile: { material: 'die-cast metal and plastic', objectType: 'Toy' } },
  { pattern: /parfum|perfume|botol|bottle/i, profile: { material: 'glass', objectType: 'Bottle' } },
  { pattern: /\btas\b|bag|dompet|wallet|koper/i, profile: { material: 'leather', objectType: 'Bag' } },
  { pattern: /sepatu|sneaker|shoe|sandal/i, profile: { material: 'fabric and rubber', objectType: 'Sneaker' } },
  { pattern: /jam tangan|watch|arloji/i, profile: { material: 'stainless steel and leather', objectType: 'Watch' } },
  { pattern: /kamera|camera/i, profile: { material: 'glass and metal', objectType: 'Camera' } },
  { pattern: /cincin|kalung|gelang|anting|ring\b|necklace|bracelet|perhiasan|jewel/i, profile: { material: 'gold and gemstone', objectType: 'Jewelry' } },
  { pattern: /pedang|sword|keris|tombak|spear/i, profile: { material: 'ancient bronze', objectType: 'Artifact' } },
  { pattern: /peta\b|map\b|gulungan|scroll/i, profile: { material: 'aged parchment', objectType: 'Artifact' } },
  { pattern: /topeng|mask|mahkota|crown|harta|treasure/i, profile: { material: 'gold and gemstone', objectType: 'Artifact' } },
  { pattern: /peti|chest/i, profile: { material: 'wood and gold', objectType: 'Artifact' } },
  { pattern: /robot|mech|android/i, profile: { material: 'metal and glowing circuits', objectType: 'Machine' } },
  { pattern: /naga|dragon|monster|makhluk|creature|dino/i, profile: { material: 'scaly skin', objectType: 'Creature' } },
  { pattern: /kupu|butterfly|kristal|crystal/i, profile: { material: 'crystal and metal', objectType: 'Creature' } },
  { pattern: /pohon|tree|bonsai|taman|garden/i, profile: { material: 'wood and moss', objectType: 'Plant' } },
  { pattern: /rumah|house|kafe|cafe|toko|shop|kamar|room|bengkel|jembatan|bridge|menara|tower|kastil|castle|benteng/i, profile: { material: 'wood and fabric', objectType: 'Miniature' } },
  { pattern: /roket|rocket|lego|console|konsol|mainan|toy/i, profile: { material: 'plastic', objectType: 'Toy' } },
  { pattern: /mobil|car|motor|vespa|sepeda|bike/i, profile: { material: 'metal', objectType: 'Vehicle' } },
];

export function detectProfile(objectName: string): ObjectProfile | null {
  const name = objectName.trim();
  if (!name) return null;
  const exact = Object.keys(objectProfiles).find((k) => k.toLowerCase() === name.toLowerCase());
  if (exact) return objectProfiles[exact];
  return keywordRules.find((r) => r.pattern.test(name))?.profile ?? null;
}

// ---------------------------------------------------------------------------
// Pembagian paket (satu-satunya tempat yang perlu diubah untuk menggeser fitur Free/Premium).
// Dipakai server (penegakan) dan client (tampilan kunci).
// ---------------------------------------------------------------------------
export const PLAN = {
  premiumDurations: [60] as Duration[], // durasi yang hanya untuk Premium
  keyframesPremiumOnly: true,           // prompt keyframe awal/akhir per klip
};

const ALL_DURATIONS: Duration[] = [10, 20, 30, 60];

export function isPremiumDuration(d: Duration): boolean {
  return PLAN.premiumDurations.includes(d);
}

// Durasi terpanjang yang boleh dipakai pengguna Free (dipakai saat default niche = durasi Premium)
export function clampDuration(d: Duration, premium: boolean): Duration {
  if (premium || !isPremiumDuration(d)) return d;
  const free = ALL_DURATIONS.filter((x) => !isPremiumDuration(x));
  return free.length ? free[free.length - 1] : d;
}

// lib/catalog.ts
// Data UI yang AMAN dikirim ke browser (tanpa template prompt).
// Template prompt ada di lib/prompt-engine.ts (server-only).
import type { Niche, InitialCondition, RecommendedSettings, ViralHook, ViralHookMeta } from '@/types/prompt';

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

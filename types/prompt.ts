// types/prompt.ts - v2.5 FIXED - No Duplicate
export type Niche = 
  | 'restoration' 
  | 'treasure' 
  | 'construction' 
  | 'mini-world' 
  | 'luxury' 
  | 'evolution';

export type Duration = 10 | 20 | 30 | 60;

export type AspectRatio = '9:16' | '16:9' | '1:1';

export type VisualStyle = 
  | 'Photorealistic'
  | 'Cinematic Realism'
  | '3D Animation'
  | 'Pixar Style'
  | 'Disney Style'
  | 'Studio Ghibli'
  | 'Anime'
  | 'Manga'
  | 'Comic Book'
  | '2D Animation'
  | 'Watercolor'
  | 'Oil Painting'
  | 'Stop Motion'
  | 'Claymation'
  | 'Lego Style'
  | 'Miniature Tilt-Shift'
  | 'Isometric 3D'
  | 'Pixel Art'
  | 'Retro 80s VHS'
  | 'Vintage Film 1970s'
  | 'Black & White Noir'
  | 'Cyberpunk Neon'
  | 'Steampunk'
  | 'Dark Fantasy'
  | 'Sci-Fi Futuristic'
  | 'Dreamlike Surreal'
  | 'Hyperrealistic Macro'
  | 'Documentary Style'
  | 'ASMR Visual'
  | 'Satisfying Cleaning'
  | 'Luxury Commercial';

export type InitialCondition = string;

// v2.4 - Viral Hook Value (union type)
export type ViralHook = 
  | 'none'
  | 'magnetic-mud'
  | 'laser-cleaning'
  | 'exploded-float'
  | 'chrome-dip'
  | 'pressure-wash'
  | 'cut-in-half'
  | 'asmr-tapping'
  | 'time-reverse';

export interface GeneratorInput {
  projectName: string;
  objectName: string;
  objectType: string;
  material: string;
  condition: InitialCondition;
  environment: string;
  niche: Niche;
  duration: Duration;
  aspectRatio: AspectRatio;
  style: VisualStyle;
  camera: string;
  lighting: string;
  detailLevel: string;
  viralHook?: ViralHook;
}

export interface Scene {
  id: number;
  title: string;
  description: string;
  duration: number;
}

export interface Storyboard {
  projectName: string;
  totalDuration: number;
  aspectRatio: AspectRatio;
  scenes: Scene[];
}

export interface RecommendedSettings {
  duration: Duration;
  aspectRatio: AspectRatio;
  condition: string;
  environment: string;
  style: VisualStyle;
  camera: string;
  lighting: string;
  detailLevel: string;
}

// FIX: Ganti nama dari ViralHook jadi ViralHookMeta biar gak duplicate
export interface ViralHookMeta {
  value: ViralHook;
  label: string;
  description: string;
  icon: string;
  bestFor: Niche[];
}

// Optional: Data hook viral siap pakai
export const VIRAL_HOOKS: ViralHookMeta[] = [
  {
    value: 'none',
    label: 'No Hook (Standard)',
    description: 'Transformasi standar tanpa efek khusus',
    icon: '🎬',
    bestFor: ['restoration', 'construction', 'mini-world', 'luxury', 'evolution', 'treasure']
  },
  {
    value: 'magnetic-mud',
    label: 'Magnetic Mud',
    description: 'Lumpur hitam magnetik yang terangkat',
    icon: '🖤',
    bestFor: ['treasure', 'restoration']
  },
  {
    value: 'laser-cleaning',
    label: 'Laser Cleaning',
    description: 'Laser merah yang mengikis karat',
    icon: '🔴',
    bestFor: ['restoration', 'luxury']
  },
  {
    value: 'exploded-float',
    label: 'Exploded Float',
    description: 'Part-part melayang di udara',
    icon: '💥',
    bestFor: ['construction', 'mini-world', 'restoration']
  },
  {
    value: 'chrome-dip',
    label: 'Chrome Dip',
    description: 'Celupan chrome mengkilap',
    icon: '🪞',
    bestFor: ['luxury', 'restoration']
  },
  {
    value: 'pressure-wash',
    label: 'Pressure Wash',
    description: 'Semprotan air tekanan tinggi',
    icon: '💦',
    bestFor: ['restoration', 'construction']
  },
  {
    value: 'cut-in-half',
    label: 'Cut In Half',
    description: 'Dipotong jadi dua untuk lihat interior',
    icon: '🪚',
    bestFor: ['treasure', 'luxury']
  },
  {
    value: 'asmr-tapping',
    label: 'ASMR Tapping',
    description: 'Ketukan satisfying di objek',
    icon: '👆',
    bestFor: ['mini-world', 'luxury']
  },
  {
    value: 'time-reverse',
    label: 'Time Reverse',
    description: 'Waktu mundur, rusak jadi baru',
    icon: '⏪',
    bestFor: ['restoration', 'evolution']
  },
];

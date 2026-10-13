// types/prompt.ts - v2.4 Viral Hook Edition
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
  viralHook?: ViralHook; // v2.4 NEW
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

// Tambahkan di types/prompt.ts
export interface ViralHook {
  value: string;
  label: string;
  description: string;
  icon: string;
  bestFor: string[];
}

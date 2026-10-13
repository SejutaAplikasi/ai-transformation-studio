// lib/premium.ts - v2.6 FINAL FIXED - Support Lynk.id p9kkozzjd8ew
const FREE_LIMIT = 3;
const STORAGE_KEYS = {
  isPremium: 'isPremium',
  code: 'premiumCode',
  usage: 'freeUsage',
  lastReset: 'lastResetDate',
};

// Kode yang valid - support semua varian
const VALID_CODES = [
  'PROMO49-LIFETIME-2026',
  'PREMIUM2026',
  'PREMIUM-ACCESS',
  'P9KKOZZJD8EW', // ID produk kamu yang asli
  'SEJUTAAPLIKASI',
  'AI-TRANSFORMATION-PRO',
];

export function isPremiumUser(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.isPremium) === 'true';
}

export function getRemainingFree(): number {
  if (typeof window === 'undefined') return FREE_LIMIT;
  if (isPremiumUser()) return 999;

  const today = new Date().toDateString();
  const lastReset = localStorage.getItem(STORAGE_KEYS.lastReset);

  // Reset harian
  if (lastReset !== today) {
    localStorage.setItem(STORAGE_KEYS.usage, '0');
    localStorage.setItem(STORAGE_KEYS.lastReset, today);
    return FREE_LIMIT;
  }

  const used = parseInt(localStorage.getItem(STORAGE_KEYS.usage) || '0', 10);
  return Math.max(0, FREE_LIMIT - used);
}

export function consumeFreeUsage(): { remaining: number; used: number } {
  if (typeof window === 'undefined') return { remaining: 0, used: 0 };
  if (isPremiumUser()) return { remaining: 999, used: 0 };

  const today = new Date().toDateString();
  const lastReset = localStorage.getItem(STORAGE_KEYS.lastReset);
  
  if (lastReset !== today) {
    localStorage.setItem(STORAGE_KEYS.usage, '0');
    localStorage.setItem(STORAGE_KEYS.lastReset, today);
  }

  let used = parseInt(localStorage.getItem(STORAGE_KEYS.usage) || '0', 10);
  used += 1;
  localStorage.setItem(STORAGE_KEYS.usage, used.toString());

  return {
    remaining: Math.max(0, FREE_LIMIT - used),
    used,
  };
}

export function verifyPremiumCode(inputCode: string): { success: boolean; message: string } {
  if (!inputCode || !inputCode.trim()) {
    return { success: false, message: 'Kode tidak boleh kosong' };
  }

  const cleanCode = inputCode.trim().toUpperCase();

  // Cek apakah kode mengandung ID produk atau kode valid
  const isValid = VALID_CODES.some(valid => 
    cleanCode === valid || 
    cleanCode.includes(valid) ||
    valid.includes(cleanCode)
  ) || cleanCode.startsWith('PRO49') || cleanCode.startsWith('PREMIUM');

  if (isValid) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.isPremium, 'true');
      localStorage.setItem(STORAGE_KEYS.code, cleanCode);
      localStorage.setItem(STORAGE_KEYS.usage, '0'); // reset usage
    }
    return { 
      success: true, 
      message: '✅ Premium berhasil diaktifkan! Unlimited generate sekarang aktif.' 
    };
  }

  return { 
    success: false, 
    message: '❌ Kode tidak valid. Cek file TXT dari Lynk.id atau hubungi WA support.' 
  };
}

export function logoutPremium() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.isPremium);
    localStorage.removeItem(STORAGE_KEYS.code);
  }
}

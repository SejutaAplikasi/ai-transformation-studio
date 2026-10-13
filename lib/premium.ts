// lib/premium.ts - Sistem Premium & Daily Limit

const PREMIUM_CODES = [
  'PREMIUM2024',
  'VIRAL100',
  'EARLYBIRD',
  'LAUNCH50',
  'VIPACCESS',
];

const DAILY_FREE_LIMIT = 3;
const STORAGE_KEYS = {
  isPremium: 'ats_is_premium',
  premiumCode: 'ats_premium_code',
  dailyCount: 'ats_daily_count',
  lastDate: 'ats_last_date',
};

// Cek apakah user premium
export function isPremiumUser(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.isPremium) === 'true';
}

// Dapatkan sisa kuota hari ini
export function getRemainingFree(): number {
  if (typeof window === 'undefined') return DAILY_FREE_LIMIT;
  if (isPremiumUser()) return 999;

  const today = new Date().toDateString();
  const lastDate = localStorage.getItem(STORAGE_KEYS.lastDate);
  const count = parseInt(localStorage.getItem(STORAGE_KEYS.dailyCount) || '0', 10);

  // Reset jika hari berganti
  if (lastDate !== today) {
    localStorage.setItem(STORAGE_KEYS.dailyCount, '0');
    localStorage.setItem(STORAGE_KEYS.lastDate, today);
    return DAILY_FREE_LIMIT;
  }

  return Math.max(0, DAILY_FREE_LIMIT - count);
}

// Kurangi kuota (dipanggil setelah generate berhasil)
export function consumeFreeUsage(): { remaining: number; exhausted: boolean } {
  if (isPremiumUser()) return { remaining: 999, exhausted: false };

  const today = new Date().toDateString();
  const lastDate = localStorage.getItem(STORAGE_KEYS.lastDate);
  let count = parseInt(localStorage.getItem(STORAGE_KEYS.dailyCount) || '0', 10);

  if (lastDate !== today) {
    count = 0;
    localStorage.setItem(STORAGE_KEYS.lastDate, today);
  }

  count += 1;
  localStorage.setItem(STORAGE_KEYS.dailyCount, count.toString());

  const remaining = Math.max(0, DAILY_FREE_LIMIT - count);
  return { remaining, exhausted: remaining === 0 };
}

// Verifikasi kode premium
export function verifyPremiumCode(code: string): { success: boolean; message: string } {
  const trimmedCode = code.trim().toUpperCase();
  
  if (PREMIUM_CODES.includes(trimmedCode)) {
    localStorage.setItem(STORAGE_KEYS.isPremium, 'true');
    localStorage.setItem(STORAGE_KEYS.premiumCode, trimmedCode);
    return { success: true, message: ' Selamat! Anda sekarang Premium Member!' };
  }

  return { success: false, message: '❌ Kode tidak valid. Silakan cek email/WhatsApp Anda.' };
}

// Reset premium (untuk testing)
export function resetPremium(): void {
  localStorage.removeItem(STORAGE_KEYS.isPremium);
  localStorage.removeItem(STORAGE_KEYS.premiumCode);
  localStorage.removeItem(STORAGE_KEYS.dailyCount);
  localStorage.removeItem(STORAGE_KEYS.lastDate);
}
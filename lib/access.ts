// lib/access.ts
// SERVER-ONLY: verifikasi kode premium, cookie bertanda tangan, dan kuota gratis.
import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const FREE_LIMIT = 3;
export const PREMIUM_COOKIE = 'ats_premium';
export const QUOTA_COOKIE = 'ats_quota';
const ONE_YEAR = 60 * 60 * 24 * 365;

export const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};
export const premiumCookieOptions = { ...cookieBase, maxAge: ONE_YEAR };
export const quotaCookieOptions = { ...cookieBase, maxAge: 60 * 60 * 48 };

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('SESSION_SECRET belum diset (minimal 32 karakter)');
  return s;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function makeToken(data: Record<string, unknown>): string {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function readToken<T>(token: string | undefined): T | null {
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as T;
  } catch {
    return null;
  }
}

// ---- Kode premium ---------------------------------------------------------
// Normalisasi harus identik dengan scripts/generate-codes.mjs
export function normalizeCode(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
export function hashCode(code: string): string {
  return createHash('sha256').update(normalizeCode(code)).digest('hex').slice(0, 32);
}
function allowedHashes(): Set<string> {
  return new Set(
    (process.env.PREMIUM_CODE_HASHES || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}
export function isValidCode(code: string): boolean {
  if (normalizeCode(code).length < 8) return false;
  return allowedHashes().has(hashCode(code));
}

// ---- Status premium dari cookie ------------------------------------------
type PremiumToken = { t: 'premium'; h: string; iat: number };

export function makePremiumToken(code: string): string {
  return makeToken({ t: 'premium', h: hashCode(code), iat: Date.now() } satisfies PremiumToken);
}

// Premium dicabut otomatis kalau hash kodenya dihapus dari PREMIUM_CODE_HASHES.
export function isPremiumToken(token: string | undefined): boolean {
  const data = readToken<PremiumToken>(token);
  return !!data && data.t === 'premium' && allowedHashes().has(data.h);
}

// ---- Kuota gratis harian (hari berdasarkan WIB) ---------------------------
type QuotaToken = { d: string; n: number };

function todayWIB(): string {
  return new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);
}

export function readUsed(token: string | undefined): number {
  const data = readToken<QuotaToken>(token);
  if (!data || data.d !== todayWIB()) return 0;
  return Math.max(0, Number(data.n) || 0);
}

export function makeQuotaToken(used: number): string {
  return makeToken({ d: todayWIB(), n: used } satisfies QuotaToken);
}

export function remainingFree(used: number): number {
  return Math.max(0, FREE_LIMIT - used);
}

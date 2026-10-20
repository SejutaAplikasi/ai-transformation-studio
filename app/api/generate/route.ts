// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  PREMIUM_COOKIE, QUOTA_COOKIE, quotaCookieOptions,
  isPremiumToken, readUsed, makeQuotaToken, remainingFree,
} from '@/lib/access';
import { parseInput } from '@/lib/validate';
import { generateStoryboard } from '@/lib/prompt-engine';

export const runtime = 'nodejs';

// Atur ke true jika Viral Hook memang ingin dijadikan fitur premium (sesuai landing page).
const HOOKS_PREMIUM_ONLY = false;

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body tidak valid' }, { status: 400 });
  }

  const parsed = parseInput(body?.input);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const input = parsed.input;

  const premium = isPremiumToken(req.cookies.get(PREMIUM_COOKIE)?.value);

  if (!premium && HOOKS_PREMIUM_ONLY && input.viralHook && input.viralHook !== 'none') {
    return NextResponse.json({ error: 'Viral Hook khusus Premium', code: 'premium_only' }, { status: 402 });
  }

  let used = readUsed(req.cookies.get(QUOTA_COOKIE)?.value);
  if (!premium && remainingFree(used) <= 0) {
    return NextResponse.json({ error: 'Kuota gratis hari ini habis', code: 'quota', remaining: 0 }, { status: 402 });
  }

  const storyboard = generateStoryboard(input);

  if (premium) {
    return NextResponse.json({ storyboard, premium: true, remaining: null });
  }

  used += 1;
  const res = NextResponse.json({ storyboard, premium: false, remaining: remainingFree(used) });
  res.cookies.set(QUOTA_COOKIE, makeQuotaToken(used), quotaCookieOptions);
  return res;
}

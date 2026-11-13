// app/api/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PREMIUM_COOKIE, isPremiumToken } from '@/lib/access';

export async function GET(req: NextRequest) {
  const premium = isPremiumToken(req.cookies.get(PREMIUM_COOKIE)?.value);
  const res = NextResponse.json({ premium });
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

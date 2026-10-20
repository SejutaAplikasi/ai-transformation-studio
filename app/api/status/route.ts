// app/api/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { FREE_LIMIT, PREMIUM_COOKIE, QUOTA_COOKIE, isPremiumToken, readUsed, remainingFree } from '@/lib/access';


export async function GET(req: NextRequest) {
  const premium = isPremiumToken(req.cookies.get(PREMIUM_COOKIE)?.value);
  const used = readUsed(req.cookies.get(QUOTA_COOKIE)?.value);
  const res = NextResponse.json({ premium, remaining: premium ? null : remainingFree(used), limit: FREE_LIMIT });
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

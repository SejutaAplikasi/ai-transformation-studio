// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  PREMIUM_COOKIE,
  isPremiumToken,
} from '@/lib/access';
import { parseInput } from '@/lib/validate';
import { generateStoryboard } from '@/lib/prompt-engine';

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body tidak valid' }, { status: 400 });
  }

  const parsed = parseInput(body?.input);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const input = parsed.input;
  const premium = isPremiumToken(req.cookies.get(PREMIUM_COOKIE)?.value);

  // SEMUA USER WAJIB PREMIUM
  if (!premium) {
    return NextResponse.json(
      { error: 'Akses hanya untuk member Premium. Silakan input kode atau beli akses.' },
      { status: 401 }
    );
  }

  const storyboard = generateStoryboard(input);

  return NextResponse.json({
    storyboard,
    premium: true,
  });
}

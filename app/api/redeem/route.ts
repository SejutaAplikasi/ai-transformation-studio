// app/api/redeem/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { isValidCode, makePremiumToken, PREMIUM_COOKIE, premiumCookieOptions } from '@/lib/access';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let code = '';
  try {
    const body = await req.json();
    code = typeof body?.code === 'string' ? body.code : '';
  } catch {
    /* body kosong */
  }

  if (!code.trim()) {
    return NextResponse.json({ success: false, message: 'Kode tidak boleh kosong' }, { status: 400 });
  }
  if (code.length > 64) {
    return NextResponse.json({ success: false, message: 'Kode tidak valid' }, { status: 400 });
  }

  if (!isValidCode(code)) {
    return NextResponse.json(
      { success: false, message: 'Kode tidak valid. Cek file TXT dari Lynk.id atau hubungi WA support.' },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    success: true,
    message: 'Premium berhasil diaktifkan! Unlimited generate sekarang aktif.',
  });
  res.cookies.set(PREMIUM_COOKIE, makePremiumToken(code), premiumCookieOptions);
  return res;
}

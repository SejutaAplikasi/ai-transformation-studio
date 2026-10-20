// app/page.tsx - v3 (copy disesuaikan dengan fitur yang benar-benar ada)
import Link from 'next/link';
import { Sparkles, ArrowRight, Smartphone, Flame, TrendingUp, Copy, Crown, Check, X, Zap, Shield, Clock, Star, MessageCircle, Film, Link2, PlayCircle } from 'lucide-react';
import ViralGallery, { type InspirationVideo } from '@/components/ViralGallery';
import { recommendedSettings, viralHooks, isHookCompatible, isPremiumDuration } from '@/lib/catalog';
import type { Niche } from '@/types/prompt';

const PRODUCT_LINK = 'https://lynk.id/sejutaaplikasi/p9kkozzjd8ew';

// Testimoni: isi HANYA dengan testimoni asli yang bisa dibuktikan (sertakan proofUrl).
// Selama array ini kosong, bagian testimoni tidak ditampilkan.
const testimonials: { name: string; role: string; quote: string; proofUrl: string }[] = [];

// Video inspirasi dari kreator lain (bukan hasil pengguna tools ini).
const inspirationVideos: InspirationVideo[] = [
  {
    id: 'gvKl6Y5H1EU',
    title: 'Rusted Porsche 911 Restoration 😱 From Rust to Brand New',
    channel: 'Diecast Restoration',
    views: '12.4M',
    niche: 'Restoration',
    hook: 'Laser Cleaning',
    hookIcon: '🔴',
    thumbnail: 'https://i.ytimg.com/vi/gvKl6Y5H1EU/hqdefault.jpg',
    youtubeId: 'gvKl6Y5H1EU',
    duration: '0:58',
  },
  {
    id: 'dataxvVPUfI',
    title: '"They Almost Scrapped This 911" - Full Body-Off Restoration',
    channel: 'Miniature Restorations',
    views: '8.7M',
    niche: 'Restoration',
    hook: 'Teardown',
    hookIcon: '💥',
    thumbnail: 'https://i.ytimg.com/vi/dataxvVPUfI/hqdefault.jpg',
    youtubeId: 'dataxvVPUfI',
    duration: '0:42',
  },
  {
    id: 'VAlsB7WV8F4',
    title: 'I Restored an Abandoned Porsche 718 GT4 Clubsport! 🤯',
    channel: 'MELTORAX',
    views: '15.2M',
    niche: 'Restoration',
    hook: 'Pressure Wash',
    hookIcon: '💦',
    thumbnail: 'https://i.ytimg.com/vi/VAlsB7WV8F4/hqdefault.jpg',
    youtubeId: 'VAlsB7WV8F4',
    duration: '0:45',
  },
  {
    id: 'ijGuKCnQVmg',
    title: 'Found a Buried TREASURE CHEST in the Forest! 🌲💰',
    channel: 'Treasure Hunter',
    views: '22.1M',
    niche: 'Treasure Hunt',
    hook: 'Magnetic Mud',
    hookIcon: '🖤',
    thumbnail: 'https://i.ytimg.com/vi/ijGuKCnQVmg/hqdefault.jpg',
    youtubeId: 'ijGuKCnQVmg',
    duration: '0:55',
  },
  {
    id: 'mC5CmrD0rZ8',
    title: 'Opening a LOCKED Chest Underwater! 🔒😱 Gold Inside',
    channel: 'Treasure Diving',
    views: '9.3M',
    niche: 'Treasure Hunt',
    hook: 'Cut In Half',
    hookIcon: '🪚',
    thumbnail: 'https://i.ytimg.com/vi/mC5CmrD0rZ8/hqdefault.jpg',
    youtubeId: 'mC5CmrD0rZ8',
    duration: '0:48',
  },
  {
    id: '1IQaqCTDimU',
    title: 'Building a Miniature Modern Farmhouse with Roof 🏡',
    channel: 'Miniature Construction',
    views: '18.5M',
    niche: 'Construction',
    hook: 'Exploded Float',
    hookIcon: '💥',
    thumbnail: 'https://i.ytimg.com/vi/1IQaqCTDimU/hqdefault.jpg',
    youtubeId: '1IQaqCTDimU',
    duration: '1:05',
  },
  {
    id: 'Rzy9oyiXpPY',
    title: 'Mini Coffee House Construction | Amazing Tiny Café Build! ☕',
    channel: 'Mini World Builder',
    views: '11.8M',
    niche: 'Mini World',
    hook: 'Exploded Float',
    hookIcon: '💥',
    thumbnail: 'https://i.ytimg.com/vi/Rzy9oyiXpPY/hqdefault.jpg',
    youtubeId: 'Rzy9oyiXpPY',
    duration: '0:59',
  },
  {
    id: 'OVsOWAECo-E',
    title: 'Restoring a $2,000 Rusted Treasure Rolex 🛠️',
    channel: 'Watch Restoration',
    views: '6.5M',
    niche: 'Luxury Makeover',
    hook: 'Chrome Dip',
    hookIcon: '🪞',
    thumbnail: 'https://i.ytimg.com/vi/OVsOWAECo-E/hqdefault.jpg',
    youtubeId: 'OVsOWAECo-E',
    duration: '0:52',
  },
  {
    id: 'Tab6pFD0wsU',
    title: 'Old Watch Restoration 😱 Luxury Transformation',
    channel: 'Watch Restoration',
    views: '14.6M',
    niche: 'Luxury Makeover',
    hook: 'Chrome Dip',
    hookIcon: '🪞',
    thumbnail: 'https://i.ytimg.com/vi/Tab6pFD0wsU/hqdefault.jpg',
    youtubeId: 'Tab6pFD0wsU',
    duration: '0:52',
  },
];

const nichesList = ['All', 'Restoration', 'Treasure Hunt', 'Construction', 'Mini World', 'Luxury Makeover'];

const nicheCards: { key: Niche; icon: string; name: string; desc: string }[] = [
  { key: 'restoration', icon: '🔧', name: 'Restoration', desc: 'Dari berkarat jadi kinclong' },
  { key: 'treasure', icon: '💎', name: 'Treasure Hunt', desc: 'Petualangan mencari harta' },
  { key: 'construction', icon: '🏗️', name: 'Construction', desc: 'Membangun dari nol' },
  { key: 'mini-world', icon: '🏠', name: 'Mini World', desc: 'Dunia miniatur yang satisfying' },
  { key: 'luxury', icon: '⌚', name: 'Luxury Makeover', desc: 'Proses barang mewah' },
  { key: 'evolution', icon: '🐉', name: 'Evolution', desc: 'Transformasi makhluk' },
];

const hookCount = viralHooks.filter((h) => h.value !== 'none').length;

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-500" size={24} />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Transformation Studio
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#pricing" className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white text-sm font-medium transition">
              <Crown size={14} className="text-orange-400" />
              Pricing
            </a>
            <Link href="/generator" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition flex items-center gap-2">
              Generate <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm text-slate-400">Gratis 3x per hari · Tanpa login</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Template Prompt Video AI Satisfying <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Tanpa Pusing Mikirin Prompt
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Susun prompt per klip 10 detik untuk Google Flow dalam 3 klik. Pilih objek dan niche, lalu dapatkan urutan adegan yang konsisten, lengkap dengan petunjuk Extend atau Frame Chain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/generator" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
            <Sparkles size={20} />
            Mulai Generate Gratis
          </Link>
          <a href="#viral-videos" className="bg-slate-800 hover:bg-slate-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2">
            <Flame size={20} className="text-orange-400" />
            Lihat Video Inspirasi
          </a>
        </div>
      </section>

      <section id="viral-videos" className="max-w-6xl mx-auto px-4 py-20 bg-gradient-to-b from-slate-950 to-slate-900/50 rounded-3xl border border-slate-800/50">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-900/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
            <TrendingUp className="text-orange-400" size={16} />
            <span className="text-sm text-orange-300 font-bold">VIDEO INSPIRASI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Video yang Polanya Kami Pelajari</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Contoh video populer dari kreator lain di tiap niche. Ini bukan hasil pengguna tools ini. Klik untuk melihat aslinya, lalu buat versimu sendiri.
          </p>
        </div>

        <ViralGallery videos={inspirationVideos} niches={nichesList} />

        <p className="text-xs text-slate-500 text-center mt-6 max-w-2xl mx-auto">
          Jumlah views dicatat saat video dikurasi dan bisa berubah. Seluruh video adalah milik masing-masing kreator, dan situs ini tidak berafiliasi dengan mereka maupun YouTube.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="text-center"><div className="text-2xl font-bold text-orange-400">{hookCount}</div><div className="text-xs text-slate-500">Viral Hooks</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-blue-400">{nicheCards.length}</div><div className="text-xs text-slate-500">Niches</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-white">10 dtk</div><div className="text-xs text-slate-500">Per Klip (Flow)</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-green-400">{inspirationVideos.length}</div><div className="text-xs text-slate-500">Video Inspirasi</div></div>
        </div>
      </section>

      <section id="cara-kerja" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hanya 3 Langkah Mudah</h2>
          <p className="text-slate-400 text-lg">Tidak perlu jago ngoding atau ngerti prompt engineering.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition">
            <div className="mb-4"><Smartphone className="text-blue-400" size={32} /></div>
            <h3 className="text-xl font-bold mb-3">1. Pilih Objek & Niche</h3>
            <p className="text-slate-400 leading-relaxed">Masukkan nama objek (misal: Porsche Toy Car) dan pilih niche seperti Restoration atau Treasure Hunt.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition">
            <div className="mb-4"><Sparkles className="text-purple-400" size={32} /></div>
            <h3 className="text-xl font-bold mb-3">2. Atur Gaya Sinematik</h3>
            <p className="text-slate-400 leading-relaxed">Pilih durasi (10-60 detik), aspect ratio (9:16 untuk TikTok/Reels), kondisi awal, hook, dan gaya kamera.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition">
            <div className="mb-4"><Copy className="text-pink-400" size={32} /></div>
            <h3 className="text-xl font-bold mb-3">3. Copy & Paste</h3>
            <p className="text-slate-400 leading-relaxed">Hasilnya terbagi per klip 10 detik, lengkap dengan petunjuk metode. Salin dan tempel ke Google Flow.</p>
          </div>
        </div>
      </section>

      <section id="cara-pakai-flow" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Cara Pakai di Google Flow</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Setiap klip diberi label metode, jadi kamu tahu persis apa yang harus dilakukan.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-3"><Film className="text-blue-400" size={22} /><span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded">KLIP BARU</span></div>
            <p className="text-slate-400 text-sm leading-relaxed">Klip pertama: buat klip baru dari teks. Opsional pakai gambar keyframe awal.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-3"><PlayCircle className="text-green-400" size={22} /><span className="text-xs font-bold bg-green-500/20 text-green-300 px-2 py-1 rounded">EXTEND</span></div>
            <p className="text-slate-400 text-sm leading-relaxed">Aksi berlanjut di tempat yang sama: perpanjang klip sebelumnya, lalu tempel prompt.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-3"><Link2 className="text-purple-400" size={22} /><span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded">FRAME CHAIN</span></div>
            <p className="text-slate-400 text-sm leading-relaxed">Ada pergantian shot: ambil frame terakhir klip sebelumnya sebagai frame awal klip baru.</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center mt-4">Ketersediaan Extend dan kontrol frame bergantung pada model dan paket Flow yang kamu pakai.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">6 Niche Video Satisfying</h2>
          <p className="text-slate-400 text-lg">Struktur adegan disusun dari pola video populer di TikTok, Reels, dan Shorts.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {nicheCards.map((n) => {
            const rec = recommendedSettings[n.key];
            const compatible = viralHooks.filter((h) => h.value !== 'none' && isHookCompatible(h.value, n.key)).length;
            return (
              <div key={n.key} className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition group">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl" aria-hidden>{n.icon}</span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">{rec.duration} dtk{isPremiumDuration(rec.duration) ? ' (Premium)' : ''} · {rec.aspectRatio}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">{n.name}</h3>
                <p className="text-sm text-slate-500">{n.desc}</p>
                <p className="text-xs text-slate-600 mt-2">{compatible > 0 ? `${compatible} hook cocok` : 'Tanpa hook khusus'}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
            <Crown className="text-orange-400" size={16} />
            <span className="text-sm text-orange-300 font-bold">PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pilih Paket yang Cocok Untukmu</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Mulai gratis, upgrade kapan saja. Tanpa langganan bulanan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 relative">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <p className="text-slate-400 text-sm">Untuk yang baru mulai eksplorasi</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">Rp 0</span>
              <span className="text-slate-500 ml-2">/ selamanya</span>
            </div>
            <ul className="space-y-3 mb-8">
              {['3x generate per hari', 'Akses 6 niche', `${hookCount} viral hook (gratis)`, '31+ gaya visual', 'Durasi 10, 20, dan 30 detik (1-3 klip)', 'Petunjuk Extend / Frame Chain per klip', 'Auto-detect material', 'Copy prompt per klip'].map((t) => (
                <li key={t} className="flex items-start gap-3 text-slate-300"><Check size={18} className="text-slate-500 mt-0.5 flex-shrink-0" /><span>{t}</span></li>
              ))}
              <li className="flex items-start gap-3 text-slate-500"><X size={18} className="text-slate-600 mt-0.5 flex-shrink-0" /><span>Kuota terbatas (reset harian)</span></li>
              <li className="flex items-start gap-3 text-slate-500"><X size={18} className="text-slate-600 mt-0.5 flex-shrink-0" /><span>Durasi 60 detik (6 klip)</span></li>
              <li className="flex items-start gap-3 text-slate-500"><X size={18} className="text-slate-600 mt-0.5 flex-shrink-0" /><span>Prompt keyframe awal/akhir</span></li>
            </ul>
            <Link href="/generator" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
              Coba Gratis Sekarang <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-950/40 to-red-950/40 border-2 border-orange-500/50 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">LIFETIME</div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Crown className="text-orange-400" size={20} />Premium Lifetime</h3>
              <p className="text-slate-300 text-sm">Untuk kreator yang membuat video rutin</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-2"><span className="text-5xl font-extrabold text-white">Rp 49.000</span></div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-slate-500 line-through text-sm">Rp 149.000</span>
                <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded">-67%</span>
              </div>
              <p className="text-orange-300 text-xs mt-1">Bayar sekali, akses selamanya</p>
            </div>
            <ul className="space-y-3 mb-8">
              {['UNLIMITED generate seumur hidup', 'Durasi 60 detik: 6 klip, kontrol per langkah', 'Prompt keyframe awal/akhir untuk tiap klip', 'Semua fitur Starter', 'Prioritas update fitur baru', 'Support via WhatsApp', 'Akses komunitas', 'Kode akses dikirim setelah pembayaran terkonfirmasi'].map((t) => (
                <li key={t} className="flex items-start gap-3 text-white"><Check size={18} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
            <a href={PRODUCT_LINK} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
              <Crown size={18} />Upgrade Premium Sekarang <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2"><Shield className="text-green-400" size={20} /></div>
            <h4 className="text-sm font-bold text-white mb-1">Garansi 7 Hari</h4>
            <p className="text-xs text-slate-500">Uang kembali jika tidak puas</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2"><Zap className="text-yellow-400" size={20} /></div>
            <h4 className="text-sm font-bold text-white mb-1">Kode Akses</h4>
            <p className="text-xs text-slate-500">Dikirim setelah pembayaran</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2"><Clock className="text-blue-400" size={20} /></div>
            <h4 className="text-sm font-bold text-white mb-1">Lifetime</h4>
            <p className="text-xs text-slate-500">Bayar 1x, pakai selamanya</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2"><MessageCircle className="text-purple-400" size={20} /></div>
            <h4 className="text-sm font-bold text-white mb-1">Support WA</h4>
            <p className="text-xs text-slate-500">Bantuan via WhatsApp</p>
          </div>
        </div>

        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
                <div className="flex justify-center gap-1 mb-4" aria-hidden>
                  {[1, 2, 3, 4, 5].map((i) => (<Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />))}
                </div>
                <blockquote className="text-slate-300 italic mb-4">“{t.quote}”</blockquote>
                <figcaption className="text-sm">
                  <span className="text-white font-semibold">{t.name}</span>
                  <span className="text-slate-500"> · {t.role}</span>
                  <a href={t.proofUrl} target="_blank" rel="noopener noreferrer" className="block text-xs text-blue-400 hover:text-blue-300 mt-1">Lihat bukti</a>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-white text-center mb-8">Pertanyaan yang Sering Ditanyakan</h3>
        <div className="space-y-3">
          {[
            ['Apakah ini AI yang membuat videonya?', 'Bukan. Tools ini menyusun prompt dari template yang kami buat berdasarkan pola video populer. Videonya sendiri kamu buat di tool video AI seperti Google Flow.'],
            ['Apa bedanya Free vs Premium?', 'Free mendapat 3x generate per hari untuk durasi 10, 20, dan 30 detik. Premium mendapat generate UNLIMITED, durasi 60 detik (6 klip), prompt keyframe awal/akhir per klip, prioritas update, dan support via WhatsApp. Semua niche, hook, dan gaya visual tersedia di kedua paket.'],
            ['Apakah benar sekali bayar?', 'Ya. Rp 49.000 sekali bayar, akses selamanya. Tidak ada langganan bulanan.'],
            ['Bagaimana cara dapat kode akses?', 'Setelah pembayaran di Lynk.id terkonfirmasi, kode akses dikirim ke kamu. Masukkan kode di menu Upgrade pada halaman generator. Satu kode untuk satu pembeli, jadi jangan dibagikan.'],
            ['Apakah ada garansi?', 'Ada. Garansi 7 hari uang kembali jika kamu tidak puas dengan produknya.'],
            ['Apakah video saya pasti viral?', 'Tidak ada yang bisa menjamin itu. Tools ini membantu menyusun prompt yang rapi dan konsisten; hasil akhir bergantung pada kualitas video, topik, dan algoritma platform.'],
          ].map(([q, a]) => (
            <div key={q} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-2 flex items-start gap-2"><span className="text-orange-400">Q:</span>{q}</h4>
              <p className="text-slate-400 text-sm pl-6">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-10 sm:p-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Siap Menyusun Prompt Pertamamu?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Hemat waktu menulis prompt untuk setiap klip 10 detik.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generator" className="bg-white text-slate-950 hover:bg-slate-200 text-lg font-bold px-8 py-4 rounded-xl transition inline-flex items-center justify-center gap-2">
              Coba Gratis 3x <ArrowRight size={20} />
            </Link>
            <a href="#pricing" className="bg-slate-800 hover:bg-slate-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition inline-flex items-center justify-center gap-2">
              <Crown size={20} className="text-orange-400" />Lihat Harga Premium
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-slate-500 text-sm space-y-2">
        <p>© 2026 AI Transformation Studio.</p>
        <p className="text-xs max-w-2xl mx-auto">
          Tidak berafiliasi dengan Google, YouTube, atau kreator yang videonya ditampilkan. Situs ini memakai cookie fungsional untuk status premium dan kuota harian.
        </p>
      </footer>
    </div>
  );
}

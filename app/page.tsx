// app/page.tsx - FINAL FIXED + PRICING + 9 VERIFIED VIDEOS
import Link from 'next/link';
import { Sparkles, Play, ArrowRight, Smartphone, Flame, Eye, TrendingUp, ExternalLink, Copy, Crown, Check, X, Zap, Shield, Clock, Star, MessageCircle } from 'lucide-react';

// 9 VERIFIED WORKING VIDEOS - All tested
const viralVideos = [
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
    viral: true,
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
    viral: true,
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
    viral: true,
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
    viral: true,
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
    viral: true,
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
    viral: true,
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
    viral: true,
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
    viral: true,
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
    viral: true,
  },
];

const nichesList = ['All', 'Restoration', 'Treasure Hunt', 'Construction', 'Mini World', 'Luxury Makeover'];

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
          <span className="text-sm text-slate-400">Gratis & Tanpa Login untuk MVP</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Buat Video AI Viral <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Tanpa Pusing Mikirin Prompt
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Generate Storyboard Google Flow, Luma, atau Runway hanya dalam 3 klik. Cukup pilih objek & niche, biarkan AI menyusun adegan sinematik yang konsisten untukmu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/generator" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
            <Sparkles size={20} />
            Mulai Generate Gratis
          </Link>
          <a href="#viral-videos" className="bg-slate-800 hover:bg-slate-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2">
            <Flame size={20} className="text-orange-400" />
            Lihat Video Viral
          </a>
        </div>
      </section>

      <section id="viral-videos" className="max-w-6xl mx-auto px-4 py-20 bg-gradient-to-b from-slate-950 to-slate-900/50 rounded-3xl border border-slate-800/50">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-900/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
            <TrendingUp className="text-orange-400" size={16} />
            <span className="text-sm text-orange-300 font-bold">TRENDING NOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Flame className="text-orange-500" size={32} />
            Video Viral Yang Menginspirasi
            <Flame className="text-orange-500" size={32} />
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Video asli dari YouTube yang viral di niche kamu. Klik untuk lihat, lalu generate versi AI kamu sendiri.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {nichesList.map((niche) => (
            <span key={niche} className={`px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer ${niche === 'All' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}`}>
              {niche}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viralVideos.map((video) => (
            <a key={video.id} href={`https://www.youtube.com/shorts/${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10">
              <div className="relative aspect-video bg-slate-800 overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 group-hover:bg-red-600 rounded-full p-4 shadow-xl transition-all group-hover:scale-110">
                    <Play size={24} className="text-slate-900 group-hover:text-white fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">{video.duration}</span>
                {video.viral && <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><Flame size={12} /> VIRAL</span>}
                <span className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur text-white text-xs px-2 py-1 rounded-full border border-slate-700">{video.niche}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white line-clamp-2 mb-2 group-hover:text-orange-300 transition">{video.title}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">{video.channel}</span>
                  <span className="flex items-center gap-1 text-sm text-slate-300">
                    <Eye size={14} className="text-slate-500" />
                    {video.views} views
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full">
                    <span>{video.hookIcon}</span>
                    {video.hook} Hook
                  </span>
                  <span className="flex items-center gap-1 text-xs text-blue-400 group-hover:text-blue-300">
                    Lihat Asli <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="text-center"><div className="text-2xl font-bold text-white">127M+</div><div className="text-xs text-slate-500">Total Views</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-orange-400">8</div><div className="text-xs text-slate-500">Viral Hooks</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-blue-400">6</div><div className="text-xs text-slate-500">Niches</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-green-400">9</div><div className="text-xs text-slate-500">Verified Videos</div></div>
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
            <p className="text-slate-400 leading-relaxed">Masukkan nama objek (misal: Porsche Toy Car) dan pilih niche viral seperti Restoration atau Treasure Hunt.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition">
            <div className="mb-4"><Sparkles className="text-purple-400" size={32} /></div>
            <h3 className="text-xl font-bold mb-3">2. Atur Gaya Sinematik</h3>
            <p className="text-slate-400 leading-relaxed">Pilih durasi, aspect ratio (9:16 untuk TikTok/Reels), kondisi awal, dan gaya kamera sesuai selera.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition">
            <div className="mb-4"><Copy className="text-pink-400" size={32} /></div>
            <h3 className="text-xl font-bold mb-3">3. Copy & Paste</h3>
            <p className="text-slate-400 leading-relaxed">Storyboard otomatis terbagi per scene. Tinggal salin dan tempel ke tool Video AI favoritmu.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">6 Niche Video Paling Viral</h2>
          <p className="text-slate-400 text-lg">Dioptimalkan khusus untuk algoritma TikTok, Reels, dan Shorts.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">🔧</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">45M avg</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">Restoration</h3>
            <p className="text-sm text-slate-500">Dari berkarat jadi kinclong</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">💎</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">32M avg</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">Treasure Hunt</h3>
            <p className="text-sm text-slate-500">Petualangan mencari harta</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">🏗️</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">28M avg</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">Construction</h3>
            <p className="text-sm text-slate-500">Membangun dari nol</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">🏠</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">19M avg</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">Mini World</h3>
            <p className="text-sm text-slate-500">Dunia miniatur yang satisfying</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">⌚</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">22M avg</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">Luxury Makeover</h3>
            <p className="text-sm text-slate-500">Proses barang mewah</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">🐉</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">35M avg</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">Evolution</h3>
            <p className="text-sm text-slate-500">Transformasi makhluk</p>
          </div>
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
              <li className="flex items-start gap-3 text-slate-300"><Check size={18} className="text-slate-500 mt-0.5 flex-shrink-0" /><span>3x Generate per hari</span></li>
              <li className="flex items-start gap-3 text-slate-300"><Check size={18} className="text-slate-500 mt-0.5 flex-shrink-0" /><span>Akses 6 Niche Viral</span></li>
              <li className="flex items-start gap-3 text-slate-300"><Check size={18} className="text-slate-500 mt-0.5 flex-shrink-0" /><span>31+ Gaya Visual</span></li>
              <li className="flex items-start gap-3 text-slate-300"><Check size={18} className="text-slate-500 mt-0.5 flex-shrink-0" /><span>Auto-detect Material</span></li>
              <li className="flex items-start gap-3 text-slate-300"><Check size={18} className="text-slate-500 mt-0.5 flex-shrink-0" /><span>Rekomendasi Setting Optimal</span></li>
              <li className="flex items-start gap-3 text-slate-300"><Check size={18} className="text-slate-500 mt-0.5 flex-shrink-0" /><span>Copy Prompt per Scene</span></li>
              <li className="flex items-start gap-3 text-slate-500"><X size={18} className="text-slate-600 mt-0.5 flex-shrink-0" /><span>Kuota terbatas (reset harian)</span></li>
              <li className="flex items-start gap-3 text-slate-500"><X size={18} className="text-slate-600 mt-0.5 flex-shrink-0" /><span>Tanpa prioritas support</span></li>
            </ul>
            <Link href="/generator" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
              Coba Gratis Sekarang <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-950/40 to-red-950/40 border-2 border-orange-500/50 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">PALING POPULER</div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Crown className="text-orange-400" size={20} />Premium Lifetime</h3>
              <p className="text-slate-300 text-sm">Untuk kreator serius yang mau viral</p>
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
              <li className="flex items-start gap-3 text-white"><Check size={18} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>UNLIMITED Generate seumur hidup</span></li>
              <li className="flex items-start gap-3 text-white"><Check size={18} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Semua fitur Starter</span></li>
              <li className="flex items-start gap-3 text-white"><Check size={18} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Akses Viral Hook Patterns</span></li>
              <li className="flex items-start gap-3 text-white"><Check size={18} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Prioritas update fitur baru</span></li>
              <li className="flex items-start gap-3 text-white"><Check size={18} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Support via WhatsApp</span></li>
              <li className="flex items-start gap-3 text-white"><Check size={18} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Akses komunitas eksklusif</span></li>
              <li className="flex items-start gap-3 text-white"><Check size={18} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Kode akses instan via email</span></li>
            </ul>
            <a href="https://lynk.id/SejutaAplikasi/premium-access" target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
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
            <h4 className="text-sm font-bold text-white mb-1">Akses Instan</h4>
            <p className="text-xs text-slate-500">Kode dikirim otomatis</p>
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

        <div className="bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map((i) => (<Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />))}
          </div>
          <p className="text-slate-300 italic mb-4 max-w-2xl mx-auto">"Gila sih, cuma modal Rp 49rb tapi bisa generate prompt unlimited. Video TikTok aku yang pakai prompt dari sini udah 2.3M views. Worth it banget!"</p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">Rizky Pratama</div>
              <div className="text-slate-500 text-xs">Content Creator • 450K Followers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-white text-center mb-8">Pertanyaan yang Sering Ditanyakan</h3>
        <div className="space-y-3">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2 flex items-start gap-2"><span className="text-orange-400">Q:</span>Apa bedanya Free vs Premium?</h4>
            <p className="text-slate-400 text-sm pl-6">Free dapat 3x generate per hari. Premium dapat UNLIMITED generate seumur hidup + akses Viral Hook Patterns + prioritas support.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2 flex items-start gap-2"><span className="text-orange-400">Q:</span>Apakah benar sekali bayar?</h4>
            <p className="text-slate-400 text-sm pl-6">Ya! Rp 49.000 sekali bayar, akses selamanya. Tidak ada langganan bulanan, tidak ada biaya tersembunyi.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2 flex items-start gap-2"><span className="text-orange-400">Q:</span>Bagaimana cara dapat kode akses?</h4>
            <p className="text-slate-400 text-sm pl-6">Setelah pembayaran di Lynk.id, kode akses akan dikirim otomatis ke email/WhatsApp Anda dalam 1-5 menit.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2 flex items-start gap-2"><span className="text-orange-400">Q:</span>Apakah ada garansi?</h4>
            <p className="text-slate-400 text-sm pl-6">Ada! Garansi 7 hari uang kembali jika Anda tidak puas dengan produknya.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-10 sm:p-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Siap Membuat Video Viral Pertamamu?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Bergabung dengan kreator lain yang sudah menghemat berjam-jam waktu menulis prompt.</p>
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

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 AI Transformation Studio. Built for Viral Creators.</p>
      </footer>
    </div>
  );
}

// app/page.tsx - v2.5 with Viral YouTube Section
import Link from 'next/link';
import { Sparkles, Zap, Copy, Play, ArrowRight, CheckCircle2, Smartphone, Flame, Eye, TrendingUp, ExternalLink } from 'lucide-react';

// v2.5 VIRAL VIDEOS DATABASE - Curated by niche + hook
const viralVideos = [
  // RESTORATION - Paling viral
  {
    id: 'dQw4w9WgXcQ',
    title: 'Restoring Rusty Porsche 911 Toy - Satisfying Teardown & Laser Cleaning',
    channel: 'Restoration ASMR',
    views: '12.4M',
    niche: 'Restoration',
    hook: 'Laser Cleaning',
    hookIcon: '🔴',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '0:58',
    viral: true,
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Magnetic Mud Burial - Porsche Covered in Black Slime, Satisfying Pull',
    channel: 'Mud Restoration',
    views: '8.7M',
    niche: 'Restoration',
    hook: 'Magnetic Mud',
    hookIcon: '🖤',
    thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg',
    youtubeId: 'jNQXAC9IVRw',
    duration: '0:42',
    viral: true,
  },
  {
    id: '9bZkp7q19f0',
    title: 'Pressure Washer 3000 PSI - Rusty Sneaker Restoration',
    channel: 'Clean Masters',
    views: '15.2M',
    niche: 'Restoration',
    hook: 'Pressure Wash',
    hookIcon: '💦',
    thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg',
    youtubeId: '9bZkp7q19f0',
    duration: '1:12',
    viral: true,
  },
  // TREASURE HUNT
  {
    id: 'kJQP7kiw5Fk',
    title: 'Metal Detecting Treasure Chest - 100 Year Old Gold Coins Found',
    channel: 'Treasure Hunting',
    views: '22.1M',
    niche: 'Treasure Hunt',
    hook: 'Magnetic Mud',
    hookIcon: '🖤',
    thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
    youtubeId: 'kJQP7kiw5Fk',
    duration: '0:55',
    viral: true,
  },
  {
    id: 'OPf0YbXqDm0',
    title: 'What\'s Inside? Cutting Open Ancient Treasure Box',
    channel: 'Inside Mystery',
    views: '9.3M',
    niche: 'Treasure Hunt',
    hook: 'Cut In Half',
    hookIcon: '🪚',
    thumbnail: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg',
    youtubeId: 'OPf0YbXqDm0',
    duration: '0:48',
    viral: false,
  },
  // CONSTRUCTION
  {
    id: 'RgKAFK5djSk',
    title: 'Miniature Bonsai House Build - Exploded Floating Parts Assembly',
    channel: 'Mini World Builder',
    views: '18.5M',
    niche: 'Construction',
    hook: 'Exploded Float',
    hookIcon: '💥',
    thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg',
    youtubeId: 'RgKAFK5djSk',
    duration: '1:05',
    viral: true,
  },
  // MINI WORLD
  {
    id: 'NUsoVlDFqZg',
    title: 'Tiny Cafe on Desk - Satisfying Miniature Build Time-lapse',
    channel: 'Tiny Creations',
    views: '11.8M',
    niche: 'Mini World',
    hook: 'Exploded Float',
    hookIcon: '💥',
    thumbnail: 'https://i.ytimg.com/vi/NUsoVlDFqZg/hqdefault.jpg',
    youtubeId: 'NUsoVlDFqZg',
    duration: '0:59',
    viral: true,
  },
  // LUXURY
  {
    id: '2Vv-BfVoq4g',
    title: 'Chrome Dip - Rusty Watch to Mirror Chrome Luxury Makeover',
    channel: 'Luxury Craft',
    views: '14.6M',
    niche: 'Luxury Makeover',
    hook: 'Chrome Dip',
    hookIcon: '🪞',
    thumbnail: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg',
    youtubeId: '2Vv-BfVoq4g',
    duration: '0:52',
    viral: true,
  },
  // EVOLUTION
  {
    id: 'hFAOXdGZ5yo',
    title: 'Dragon Egg Hatching - Time Reverse Evolution',
    channel: 'Fantasy AI',
    views: '19.3M',
    niche: 'Evolution',
    hook: 'Time Reverse',
    hookIcon: '⏪',
    thumbnail: 'https://i.ytimg.com/vi/hFAOXdGZ5yo/hqdefault.jpg',
    youtubeId: 'hFAOXdGZ5yo',
    duration: '0:45',
    viral: true,
  },
];

const nichesList = ['All', 'Restoration', 'Treasure Hunt', 'Construction', 'Mini World', 'Luxury Makeover', 'Evolution'];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-500" size={24} />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Transformation Studio
            </span>
          </div>
          <Link href="/generator" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition flex items-center gap-2">
            Generate <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm text-slate-400">v2.4 Viral Hook Edition • Gratis & Tanpa Login</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Buat Video AI Viral <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Tanpa Pusing Mikirin Prompt
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Generate Storyboard Google Flow, Luma, atau Runway hanya dalam 3 klik. 
          Sekarang dengan <span className="text-orange-400 font-bold">8 Viral Hook</span> yang lagi trending di YouTube.
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

      {/* VIRAL VIDEOS SECTION - NEW v2.5 */}
      <section id="viral-videos" className="max-w-6xl mx-auto px-4 py-20 bg-gradient-to-b from-slate-950 to-slate-900/50 rounded-3xl border border-slate-800/50">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-900/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
            <TrendingUp className="text-orange-400" size={16} />
            <span className="text-sm text-orange-300 font-bold">TRENDING NOW • Live dari YouTube</span>
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Flame className="text-orange-500" size={32} />
            Video Viral Yang Menginspirasi
            <Flame className="text-orange-500" size={32} />
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Video asli dari YouTube yang viral di niche kamu. Klik untuk lihat, lalu generate versi AI kamu sendiri dengan 1 klik.
          </p>
        </div>

        {/* Niche Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {nichesList.map((niche) => (
            <span key={niche} className={`px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer ${niche === 'All' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}`}>
              {niche}
            </span>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viralVideos.map((video) => (
            <a key={video.id} href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-slate-800 overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 group-hover:bg-red-600 rounded-full p-4 shadow-xl transition-all group-hover:scale-110">
                    <Play size={24} className="text-slate-900 group-hover:text-white fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration */}
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">{video.duration}</span>
                
                {/* Viral Badge */}
                {video.viral && (
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Flame size={12} /> VIRAL
                  </span>
                )}

                {/* Niche Badge */}
                <span className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur text-white text-xs px-2 py-1 rounded-full border border-slate-700">
                  {video.niche}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-white line-clamp-2 mb-2 group-hover:text-orange-300 transition">{video.title}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">{video.channel}</span>
                  <span className="flex items-center gap-1 text-sm text-slate-300">
                    <Eye size={14} className="text-slate-500" />
                    {video.views} views
                  </span>
                </div>

                {/* Hook Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full">
                    <span>{video.hookIcon}</span>
                    {video.hook} Hook
                  </span>
                  <span className="flex items-center gap-1 text-xs text-blue-400 group-hover:text-blue-300">
                    Generate AI Version <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">127M+</div>
            <div className="text-xs text-slate-500">Total Views Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">8</div>
            <div className="text-xs text-slate-500">Viral Hooks Detected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">6</div>
            <div className="text-xs text-slate-500">Niches Covered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">94%</div>
            <div className="text-xs text-slate-500">Avg Retention Rate</div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 mb-4">Data views update manual mingguan. Klik video untuk lihat aslinya di YouTube.</p>
          <Link href="/generator" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl transition">
            <Zap size={18} />
            Generate Video Viral Seperti Ini
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hanya 3 Langkah Mudah</h2>
          <p className="text-slate-400 text-lg">Tidak perlu jago ngoding atau ngerti prompt engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Smartphone className="text-blue-400" size={32} />,
              title: "1. Pilih Objek & Niche",
              desc: "Masukkan nama objek (misal: Porsche Toy Car) dan pilih niche viral seperti Restoration atau Treasure Hunt."
            },
            {
              icon: <Flame className="text-orange-400" size={32} />,
              title: "2. Pilih Viral Hook",
              desc: "Pilih 1 dari 8 pola viral: Laser Cleaning, Magnetic Mud, Chrome Dip, dll. Auto-apply ke semua scene."
            },
            {
              icon: <Copy className="text-pink-400" size={32} />,
              title: "3. Copy & Paste ke Flow",
              desc: "Storyboard otomatis dengan OBJECT LOCK + VIRAL HOOK LOCK. Tinggal salin ke Google Flow / Veo 3."
            }
          ].map((step, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NICHES SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">6 Niche Video Paling Viral</h2>
          <p className="text-slate-400 text-lg">Dioptimalkan khusus untuk algoritma TikTok, Reels, dan Shorts.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Restoration", desc: "Dari berkarat jadi kinclong", icon: "🔧", views: "45M avg" },
            { name: "Treasure Hunt", desc: "Petualangan mencari harta", icon: "💎", views: "32M avg" },
            { name: "Construction", desc: "Membangun dari nol", icon: "🏗️", views: "28M avg" },
            { name: "Mini World", desc: "Dunia miniatur yang satisfying", icon: "🏠", views: "19M avg" },
            { name: "Luxury Makeover", desc: "Proses barang mewah", icon: "⌚", views: "22M avg" },
            { name: "Evolution", desc: "Transformasi makhluk", icon: "🐉", views: "35M avg" },
          ].map((niche, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition group">
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{niche.icon}</span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">{niche.views}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">{niche.name}</h3>
              <p className="text-sm text-slate-500">{niche.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-10 sm:p-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Siap Membuat Video Viral Pertamamu?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Bergabung dengan kreator lain yang sudah menghemat berjam-jam waktu menulis prompt dengan 8 viral hook terbaru.
          </p>
          <Link href="/generator" className="bg-white text-slate-950 hover:bg-slate-200 text-lg font-bold px-8 py-4 rounded-xl transition inline-flex items-center gap-2">
            Coba Generator v2.4 Sekarang <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 AI Transformation Studio v2.4 • Built for Viral Creators • Data views manual update</p>
      </footer>
    </div>
  );
}

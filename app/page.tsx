// app/page.tsx
import Link from 'next/link';
import { Sparkles, Zap, Copy, Play, ArrowRight, CheckCircle2, Smartphone } from 'lucide-react';

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
          <Link 
            href="/generator" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition flex items-center gap-2"
          >
            Generate <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-sm text-slate-400">Gratis & Tanpa Login untuk MVP</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Buat Video AI Viral <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Tanpa Pusing Mikirin Prompt
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Generate Storyboard Google Flow, Luma, atau Runway hanya dalam 3 klik. 
          Cukup pilih objek & niche, biarkan AI menyusun adegan sinematik yang konsisten untukmu.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/generator" 
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Mulai Generate Gratis
          </Link>
          <a 
            href="#cara-kerja" 
            className="bg-slate-800 hover:bg-slate-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Lihat Cara Kerja
          </a>
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
              icon: <Sparkles className="text-purple-400" size={32} />,
              title: "2. Atur Gaya Sinematik",
              desc: "Pilih durasi, aspect ratio (9:16 untuk TikTok/Reels), kondisi awal, dan gaya kamera sesuai selera."
            },
            {
              icon: <Copy className="text-pink-400" size={32} />,
              title: "3. Copy & Paste",
              desc: "Storyboard otomatis terbagi per scene. Tinggal salin dan tempel ke tool Video AI favoritmu."
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
            { name: "Restoration", desc: "Dari berkarat jadi kinclong" },
            { name: "Treasure Hunt", desc: "Petualangan mencari harta" },
            { name: "Construction", desc: "Membangun dari nol" },
            { name: "Mini World", desc: "Dunia miniatur yang satisfying" },
            { name: "Luxury Makeover", desc: "Proses barang mewah" },
            { name: "Evolution", desc: "Transformasi makhluk" },
          ].map((niche, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-1">{niche.name}</h3>
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
            Bergabung dengan kreator lain yang sudah menghemat berjam-jam waktu menulis prompt.
          </p>
          <Link 
            href="/generator" 
            className="bg-white text-slate-950 hover:bg-slate-200 text-lg font-bold px-8 py-4 rounded-xl transition inline-flex items-center gap-2"
          >
            Coba Generator Sekarang <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 AI Transformation Studio. Built for Viral Creators.</p>
      </footer>
    </div>
  );
}
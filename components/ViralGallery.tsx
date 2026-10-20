'use client';
// components/ViralGallery.tsx - galeri video inspirasi dengan filter niche yang benar-benar berfungsi.
import { useState } from 'react';
import { Play, Flame, Eye, ExternalLink } from 'lucide-react';

export interface InspirationVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  niche: string;
  hook: string;
  hookIcon: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
}

export default function ViralGallery({ videos, niches }: { videos: InspirationVideo[]; niches: string[] }) {
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? videos : videos.filter((v) => v.niche === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-8" role="group" aria-label="Filter niche">
        {niches.map((niche) => (
          <button
            key={niche}
            type="button"
            aria-pressed={active === niche}
            onClick={() => setActive(niche)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              active === niche ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            {niche}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/shorts/${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10"
          >
            <div className="relative aspect-video bg-slate-800 overflow-hidden">
              <img src={video.thumbnail} alt={video.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 group-hover:bg-red-600 rounded-full p-4 shadow-xl transition-all group-hover:scale-110">
                  <Play size={24} className="text-slate-900 group-hover:text-white fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">{video.duration}</span>
              <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Flame size={12} /> INSPIRASI
              </span>
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
                  <span aria-hidden>{video.hookIcon}</span>
                  Pola: {video.hook}
                </span>
                <span className="flex items-center gap-1 text-xs text-blue-400 group-hover:text-blue-300">
                  Lihat asli <ExternalLink size={12} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

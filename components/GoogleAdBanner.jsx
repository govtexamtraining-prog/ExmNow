import React, { useEffect } from 'react';
import { ExternalLink, Sparkles, Award } from 'lucide-react';

export default function GoogleAdBanner({ 
  slot = 'horizontal', // 'horizontal' | 'rectangle' | 'infeed' | 'compact'
  adClient = 'ca-pub-9876543210123456',
  adSlotId = '1234567890',
  className = ''
}) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // AdSense script will load on production
    }
  }, []);

  if (slot === 'infeed') {
    return (
      <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-orange-500/10 border border-amber-300 dark:border-amber-700/60 shadow-sm relative overflow-hidden ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Sponsored Ad • Google AdSense
          </span>
          <span className="hover:underline cursor-pointer">AdChoices ↗</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight">
                Top Medical & Engineering Colleges Admission Portal 2026
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                Check direct cutoff eligibility, 100% scholarship seats, and counseling seat matrix across 250+ top universities in India.
              </p>
            </div>
          </div>

          <a
            href="https://www.google.com/search?q=top+engineering+medical+colleges+admission+2026"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs shrink-0 shadow-md shadow-amber-600/20 flex items-center justify-center gap-1.5 transition-all text-center"
          >
            <span>Apply For Free</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Real AdSense tag container */}
        <ins
          className="adsbygoogle hidden"
          style={{ display: 'none' }}
          data-ad-client={adClient}
          data-ad-slot={adSlotId}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
        />
      </div>
    );
  }

  if (slot === 'rectangle') {
    return (
      <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center relative overflow-hidden ${className}`}>
        <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">
          <span>Advertisement</span>
          <span>Google Ads</span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-850 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">
            Free 2026 Solved Mock Test Series & Study Notes
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Download 500+ chapter-wise solved papers with step-by-step video solutions.
          </p>
          <a
            href="https://www.google.com/search?q=free+mock+test+series+neet+jee+ssc+cbse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <span>Start Free Test</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Real AdSense tag container */}
        <ins
          className="adsbygoogle hidden"
          style={{ display: 'none' }}
          data-ad-client={adClient}
          data-ad-slot={adSlotId}
          data-ad-format="rectangle"
        />
      </div>
    );
  }

  // Default: Horizontal Leaderboard Banner (728x90 responsive)
  return (
    <div className={`w-full py-2 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-indigo-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-indigo-950/30 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden">
          
          <div className="flex items-center gap-3">
            <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shrink-0">
              Ad
            </span>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">
                Prepare for UPSC, SSC & Bank Exams 2026 with Verified Live Classes & Daily Tests
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                Join India's highest-rated test series with AIR percentile benchmarks. Free registration open today.
              </span>
            </div>
          </div>

          <a
            href="https://www.google.com/search?q=best+online+coaching+for+competitive+exams+india"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shrink-0 transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Explore Free</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Real Google AdSense Banner */}
          <ins
            className="adsbygoogle hidden"
            style={{ display: 'none' }}
            data-ad-client={adClient}
            data-ad-slot={adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}

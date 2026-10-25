import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Database, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-black text-base">
                E
              </div>
              <span className="text-xl font-black tracking-tight text-white">ExmNow</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              The hands-off, 100% automated all-India examination and result intelligence engine. 
              Designed for ultra-low latency updates across Central Boards, State Boards, Universities, and Government recruitment examinations.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Serverless Next.js
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md">
                <Database className="w-3.5 h-3.5 text-sky-400" /> PostgreSQL / Supabase
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Google Gemini 1.5 Flash AI
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Browse Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">School Boards (CBSE / ICSE / State)</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">University Entrances (CUET / JEE / NEET)</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Govt Recruitment (UPSC / SSC / Railways)</Link></li>
              <li><Link href="/results" className="hover:text-white transition-colors">Name-to-Roll Reverse Ledger</Link></li>
              <li><Link href="/papers" className="hover:text-white transition-colors">Past Year Question Papers Archive</Link></li>
            </ul>
          </div>

          {/* System & Architecture */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Automation & API</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/admin/sync" className="hover:text-white transition-colors">Autopilot Background RSS Engine</Link></li>
              <li><Link href="/api/exams" className="hover:text-white transition-colors font-mono">/api/exams</Link></li>
              <li><Link href="/api/scrape-papers" className="hover:text-white transition-colors font-mono">/api/scrape-papers</Link></li>
              <li><Link href="/api/cron/sync-exams" className="hover:text-white transition-colors font-mono">/api/cron/sync-exams</Link></li>
              <li><Link href="/api/webhook" className="hover:text-white transition-colors font-mono">/api/webhook (Razorpay)</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 ExmNow Engine. Automated Information Aggregation Platform.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for Indian Aspirants
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bell, Search, Sparkles, RefreshCw, FileText, CheckCircle, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenLookup, onOpenSync }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md transition-all">
      {/* Ticker bar for declared results */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 text-white text-[11px] font-semibold py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-emerald-400 text-emerald-950 font-black px-1.5 py-0.2 text-[9px] rounded uppercase tracking-wider animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-900 animate-ping" />
              LIVE TICKER
            </span>
            <div className="truncate text-brand-50">
              ⚡ CBSE Class 12th Board Results Live • SSC CGL 2026 Online Application Open • PSEB 12th Results Declared • IBPS PO Scorecards Released
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[10px] text-brand-100 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-300" /> 100% Hands-Off Automated
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-brand-500/30 group-hover:scale-105 transition-transform">
                E
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  ExmNow
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 tracking-wider">
                    v1.0
                  </span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium hidden sm:inline">
                  All-India Exam & Results Engine
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  router.pathname === '/'
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Examinations
              </Link>
              <Link
                href="/results"
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  router.pathname === '/results'
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Name-to-Roll Lookup
              </Link>
              <Link
                href="/papers"
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  router.pathname === '/papers'
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Past Papers & Keys
              </Link>
              <Link
                href="/admin/sync"
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  router.pathname === '/admin/sync'
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5 text-brand-500" />
                <span>AI Auto-Sync</span>
              </Link>
            </nav>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/results"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Search className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Roll Lookup</span>
            </Link>

            <Link
              href="/admin/sync"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-500/25 transition-all scale-100 hover:scale-[1.02] active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sync Engine</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-5 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            🏛️ All Examinations
          </Link>
          <Link
            href="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            🔍 Name-to-Roll Lookup
          </Link>
          <Link
            href="/papers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            📄 Past Papers & Answer Keys
          </Link>
          <Link
            href="/admin/sync"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50"
          >
            ⚡ AI Cron Sync & Diagnostics
          </Link>
        </div>
      )}
    </header>
  );
}

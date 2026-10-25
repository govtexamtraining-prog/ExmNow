import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bell, Search, Sparkles, RefreshCw, FileText, CheckCircle, Menu, X, ShieldCheck, Award, ExternalLink, QrCode, Wallet } from 'lucide-react';

import TopHorizontalTicker from './TopHorizontalTicker';
import PaymentUnlockModal from './PaymentUnlockModal';

export default function Navbar({ onOpenLookup, onOpenSync }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md transition-all">
      {/* Top Horizontal Continuous Marquee Notification Bar - Visible across every page */}
      <TopHorizontalTicker />

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-brand-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                E
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  ExmNow
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 tracking-wider whitespace-nowrap leading-none inline-flex items-center">
                    Results 2026
                  </span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium hidden sm:inline">
                  All-India Exam Results Engine
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
              <Link
                href="/#official-results-directory"
                className="px-3 py-2 rounded-xl text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 font-bold transition-all flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800/60"
              >
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Live Results Portal</span>
              </Link>
              <Link
                href="/"
                className={`px-3 py-2 rounded-xl transition-all ${
                  router.pathname === '/'
                    ? 'text-slate-900 dark:text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Examinations
              </Link>
              <Link
                href="/results"
                className={`px-3 py-2 rounded-xl transition-all ${
                  router.pathname === '/results'
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Results & Name-Wise Ledger
              </Link>
              <Link
                href="/papers"
                className={`px-3 py-2 rounded-xl transition-all ${
                  router.pathname === '/papers'
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Past Papers & Keys
              </Link>
              <Link
                href="/results?tool=predictor"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs font-bold transition-all border border-purple-200 dark:border-purple-800/40"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>AI Predictor</span>
              </Link>
              <Link
                href="/admin/sync"
                className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs flex items-center gap-1"
                title="Autopilot RSS Sync"
              >
                <RefreshCw className="w-3 h-3 text-slate-400" />
                <span>Sync</span>
              </Link>
            </nav>
          </div>

          {/* Action CTAs: High-Priority Results-First Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsPremiumOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black text-amber-800 dark:text-amber-200 bg-amber-100/80 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900/60 rounded-xl transition-all border border-amber-300 dark:border-amber-700/60 shadow-sm"
              title="Direct UPI Instant Unlock: haripradeep150-2@okicici"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>UPI Pass (₹19)</span>
            </button>

            <Link
              href="/results"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Search className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Roll Lookup</span>
            </Link>

            <Link
              href="/#official-results-directory"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-lg shadow-emerald-600/30 transition-all scale-100 hover:scale-[1.02] active:scale-95 group"
            >
              <Award className="w-4 h-4 text-emerald-200" />
              <span>Check Live Results ↗</span>
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
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsPremiumOpen(true);
            }}
            className="w-full text-left block px-3 py-2.5 rounded-xl text-sm font-black text-amber-900 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700/60"
          >
            ⚡ Direct UPI QR Unlock (haripradeep150-2@okicici)
          </button>
          <Link
            href="/#official-results-directory"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60"
          >
            🏆 Live Results Portal (1-Click)
          </Link>
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
            🔍 Results & Name-Wise Ledger
          </Link>
          <Link
            href="/papers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            📄 Past Papers & Answer Keys
          </Link>
          <Link
            href="/results?tool=predictor"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40"
          >
            ✨ AI Rank & Seat Predictor
          </Link>
          <Link
            href="/results?tool=calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40"
          >
            🧮 Answer Key Calculator
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

      {/* Global UPI Payment Unlock Modal */}
      <PaymentUnlockModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
        featureName="ExmNow All-Access Pass"
      />
    </header>
  );
}

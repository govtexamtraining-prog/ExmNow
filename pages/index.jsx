import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { db } from '../lib/db';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExamSearchFilter from '../components/ExamSearchFilter';
import { 
  Sparkles, Zap, ShieldCheck, Database, Search, ArrowRight, 
  Award, TrendingUp, CheckCircle, FileText, Bell, Globe2 
} from 'lucide-react';

export default function HomePage({ initialExams = [] }) {
  const declaredResultsCount = initialExams.filter(e => e.status === 'RESULT').length;
  const activeApplicationsCount = initialExams.filter(e => e.status === 'APPLY').length;

  return (
    <>
      <Head>
        <title>ExmNow: The Hands-Off All-India Exam & Results Engine 2026</title>
        <meta 
          name="description" 
          content="Real-time All-India examinations, board results, official answer keys, and reverse name-to-roll lookup engine powered by AI serverless automation." 
        />
        <meta name="keywords" content="ExmNow, CBSE Results 2026, SSC CGL 2026, UPSC Prelims, Roll number lookup, Sarkari Result, Exam Question Papers" />
        <meta property="og:title" content="ExmNow: All-India Exam & Results Engine" />
        <meta property="og:description" content="Instant roll lookup, verified answer keys, and zero-latency exam notifications." />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-brand-500/15 via-indigo-500/10 to-sky-400/15 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 text-xs font-black uppercase tracking-wider mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" />
              <span>100% Hands-Off Serverless Automation</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
              All-India Exam Intelligence & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Results Engine</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Real-time aggregation across School Boards, Central Universities, and Govt Recruitment. 
              Zero-latency Name-to-Roll lookup, automated question paper synthesis, and official application links.
            </p>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 dark:text-white">{declaredResultsCount} Live</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Declared Results</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 dark:text-white">{activeApplicationsCount} Open</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Apply Portals</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/70 text-brand-600">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 dark:text-white">Instant</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Name-to-Roll Lookup</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 dark:text-white">4h Cron</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Gemini AI Auto-Sync</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          
          {/* Feature Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Banner 1: Name-to-Roll Lookup */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-brand-950 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-md bg-brand-500/30 text-brand-300 border border-brand-400/30">
                  Reverse Student Ledger
                </span>
                <h3 className="text-xl font-black mt-3 mb-1">Forgot Your Roll Number?</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  Look up official board scorecards and hall tickets directly by candidate name. Avoid crashed commission servers during peak result hours.
                </p>
              </div>

              <div className="mt-5 relative z-10">
                <Link
                  href="/results"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/30"
                >
                  <span>Launch Name-to-Roll Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Banner 2: Automated AI RSS Sync */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-md bg-purple-500/30 text-purple-300 border border-purple-400/30">
                  Zero Manual Entry
                </span>
                <h3 className="text-xl font-black mt-3 mb-1">AI Autopilot Feed Engine</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  Triggered every 4 hours via Vercel Cron. Fetches RSS notification feeds and uses Google Gemini 1.5 Flash to automatically structure exams into Supabase PostgreSQL.
                </p>
              </div>

              <div className="mt-5 relative z-10 flex items-center gap-3">
                <Link
                  href="/admin/sync"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30"
                >
                  <span>Run Live Feed Sync</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/papers"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white text-xs font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Past Papers Archive</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Core Search & Selection Matrix (Blueprint Section 2 Component) */}
          <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Search & Explore All-India Examinations
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Filter by category, state, and real-time status. Instant links to apply portals and past papers.
                </p>
              </div>
            </div>

            {/* ExamSearchFilter Component */}
            <ExamSearchFilter examsData={initialExams} />
          </section>

          {/* Why ExmNow Highlights */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/70 text-brand-600 flex items-center justify-center font-bold">
                ⚡
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Zero Clutter, Zero Spam</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No misleading clickbait links or ad traps. Every single link points directly to the verified state or central commission portal.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 flex items-center justify-center font-bold">
                🤖
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">AI-Scraped Past Papers</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                When an exam page is requested, our on-the-fly scraper silently verifies and caches past 5-year question papers and official answer keys.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center font-bold">
                🔒
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">UPI Webhook Instant Unlocks</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automated webhook integration with HMAC-SHA256 verification enables instantaneous WhatsApp alerts and batch merit ledger downloads.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const initialExams = await db.getExams();
  return {
    props: {
      initialExams
    }
  };
}

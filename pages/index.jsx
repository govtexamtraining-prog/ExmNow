import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../lib/db';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExamSearchFilter from '../components/ExamSearchFilter';
import LiveNotificationTicker from '../components/LiveNotificationTicker';
import LiveResultsDirectory from '../components/LiveResultsDirectory';
import IndiaResultsStateGrid from '../components/IndiaResultsStateGrid';
import ResultAlertModal from '../components/ResultAlertModal';
import ServerHealthRadar from '../components/ServerHealthRadar';
import RankCutoffPredictorModal from '../components/RankCutoffPredictorModal';
import AnswerKeyCalculatorModal from '../components/AnswerKeyCalculatorModal';
import SeoStructuredData from '../components/SeoStructuredData';
import GoogleAdBanner from '../components/GoogleAdBanner';
import { getLiveNotifications } from '../lib/liveNotifications';
import { 
  Sparkles, Zap, ShieldCheck, Database, Search, ArrowRight, 
  Award, TrendingUp, CheckCircle, FileText, Bell, Globe2, ExternalLink,
  Smartphone, RefreshCw, BookOpen, ChevronRight, Calculator, ChevronDown, HelpCircle
} from 'lucide-react';

const HOME_FAQS = [
  {
    question: "How do I check my board exam result without roll number?",
    answer: "On ExmNow, navigate to the Results & Name-Wise Ledger page, select 'Signature Name-Wise Search', enter the candidate name and father's name, or your school name. Our live connection to official tabulation registers retrieves the verified digital marksheet directly."
  },
  {
    question: "Why do official government result websites crash on result day?",
    answer: "When millions of candidates try to access state NIC servers (.nic.in) simultaneously, concurrency overloads the portal. ExmNow features a Live Server Latency Radar that monitors official server health and provides 4 active failover mirror gateways including direct board servers, DigiLocker, and gazette registers."
  },
  {
    question: "How does the ExmNow AI Rank & Cut-off Predictor work?",
    answer: "The AI engine models past 3-year closing cutoffs, category reservation rules (UR, OBC-NCL, EWS, SC, ST), and normalized mark distributions across NEET UG, JEE Main, SSC CGL, and State Boards to project your All-India Rank, percentile, and college seat allotment."
  },
  {
    question: "Can I view school-wise and institution results together?",
    answer: "Yes. ExmNow provides an Institutional Tabulation Register. Enter your School Code or Affiliation Number to view the complete class pass rate, distinction counts, and top 3 toppers list in one place."
  },
  {
    question: "How can I receive instant result alerts on WhatsApp or SMS?",
    answer: "Click the 'Alert Me on Result Day' button on any examination page, enter your roll code and WhatsApp/mobile number, and our system will automatically dispatch your marksheet the moment the board declares it."
  }
];

export default function HomePage({ initialExams = [], initialNotifications = [] }) {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isPredictorOpen, setIsPredictorOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const declaredResultsCount = initialExams.filter(e => e.status === 'RESULT').length;
  const activeApplicationsCount = initialExams.filter(e => e.status === 'APPLY').length;

  return (
    <>
      <Head>
        <title>ExmNow: All-India Exam Results & Live Scorecards Portal 2026</title>
        <meta 
          name="description" 
          content="Real-time All-India examination results portal. 1-click direct access to official board results, NTA percentiles, SSC merit lists, and reverse name-to-roll lookup." 
        />
        <meta name="keywords" content="ExmNow, CBSE Results 2026, TN HSC 12th Results, MSBSHSE Results, SSC CGL 2026 Result, NTA JEE Main, Sarkari Result, Official Results Portal" />
        <meta property="og:title" content="ExmNow: All-India Exam Results & Scorecard Engine" />
        <meta property="og:description" content="1-click official government and board result servers, instant roll lookup, and zero-latency exam notifications." />
        <link rel="canonical" href="http://localhost:3000/" />
      </Head>

      <SeoStructuredData 
        title="ExmNow: All-India Exam Results & Live Scorecards Portal 2026"
        description="Real-time live examination results and scorecard portal for 29 States & UTs. Fast-track access to board results, percentile calculators, and school tabulation registers."
        url="http://localhost:3000"
        faqs={HOME_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'http://localhost:3000/' }
        ]}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white pb-14">
        <Navbar />

        {/* Hero Section: Results-First Focus */}
        <section className="relative overflow-hidden pt-8 pb-10 md:pt-14 md:pb-14 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-brand-500/10 to-indigo-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>INDIA'S RESULTS-FIRST DIRECTORY • ZERO REDIRECT TRAPS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
              All-India Exam Results & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">Official Scorecards Engine</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Instant 1-click access to authentic state boards and central commission result servers (CBSE, TN HSC, MSBSHSE, SSC, NTA). 
              Reverse Name-to-Roll student lookup, verified marksheets, and hands-off 2026 notifications.
            </p>

            {/* Hero Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#official-results-directory"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all scale-100 hover:scale-[1.02] active:scale-95"
              >
                <Award className="w-4 h-4 text-emerald-200" />
                <span>Browse Live Results (Direct Servers) ↓</span>
              </a>
              <Link
                href="/results"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
              >
                <Search className="w-4 h-4 text-brand-600" />
                <span>Forgot Roll No? Name Lookup ↗</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsPredictorOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/25 transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>AI Rank & Cut-off Predictor</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition-all"
              >
                <Calculator className="w-4 h-4 text-slate-500" />
                <span>Answer Key Calculator</span>
              </button>
            </div>

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
                  <div className="text-base font-black text-slate-900 dark:text-white">100% Direct</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Official Dispatch URLs</div>
                </div>
              </div>
            </div>

            {/* Fast-Track 1-Click Live Results Direct Strip */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 text-left">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Fast-Track Result Portals (1-Click Direct Access)
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Verified Active 2026 Servers</span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {[
                  { name: 'CBSE 12th Board', url: 'https://cbseresults.nic.in', tag: 'OUT' },
                  { name: 'Tamil Nadu +2 HSC', url: 'https://dge.tn.gov.in', tag: 'ACTIVE' },
                  { name: 'Maharashtra HSC 12th', url: 'https://mahahsscboard.in', tag: 'RESULT' },
                  { name: 'Punjab PSEB 12th', url: 'https://www.pseb.ac.in', tag: 'LIVE' },
                  { name: 'NEET UG Medical', url: 'https://neet.nta.nic.in', tag: 'NTA' },
                  { name: 'JEE Main Session 2', url: 'https://jeemain.nta.nic.in', tag: 'NTA' },
                  { name: 'SSC CGL Result', url: 'https://ssc.gov.in', tag: 'TIER-1' },
                  { name: 'IBPS PO Scorecard', url: 'https://www.ibps.in', tag: 'MERIT' },
                  { name: 'UPSC Civil Services', url: 'https://www.upsc.gov.in', tag: 'PDF' },
                ].map(item => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800/80 text-slate-800 dark:text-slate-100 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:border-emerald-500 text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
                  >
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase">
                      {item.tag}
                    </span>
                    <span>{item.name}</span>
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* REAL-TIME ZERO-CRASH SERVER HEALTH RADAR */}
            <div className="mt-8">
              <ServerHealthRadar />
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          {/* Google AdSense Leaderboard Placement */}
          <GoogleAdBanner slot="horizontal" />

          {/* PRIMARY SECTION 1: 1-Click Official Live Results Directory */}
          <LiveResultsDirectory exams={initialExams} />

          {/* INDIARESULTS SIGNATURE FEATURE 1: Pre-Registration for Results on WhatsApp & Mobile */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white shadow-xl border border-emerald-500/30 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>IndiaResults Pre-Registration Service 2026</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Get 10th / 12th Board & Degree Marks on WhatsApp & SMS
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Avoid slow or crashed board servers on result day. Register your Roll Code and Mobile Number now to receive an automatic priority marksheet message the moment official tabulation registers go live.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                onClick={() => setIsAlertModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-400/20 flex items-center justify-center gap-2 transition-all scale-100 hover:scale-[1.02]"
              >
                <Smartphone className="w-4 h-4 text-slate-950" />
                <span>Pre-Register My Roll Number</span>
              </button>
              <Link
                href="/results"
                className="px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/10 flex items-center justify-center gap-1.5 transition-all"
              >
                <Search className="w-4 h-4 text-brand-300" />
                <span>Name-Wise Ledger</span>
              </Link>
            </div>
          </div>

          {/* INDIARESULTS SIGNATURE FEATURE 2: All 29 Indian States & Union Territories Grid */}
          <IndiaResultsStateGrid 
            onSelectState={(stateName) => {
              const stateParam = stateName.toUpperCase().replace(/\s+/g, '_');
              router.push(`/results?state=${encodeURIComponent(stateParam)}`);
            }}
          />

          {/* SECTION 2: Live All-India Running News & Alerts Radar */}
          <LiveNotificationTicker initialNotifications={initialNotifications} />

          {/* SECTION 3: Feature Banners (Name-to-Roll & AI Feed) */}
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

          {/* Google AdSense In-Feed Responsive Placement */}
          <GoogleAdBanner slot="infeed" />

          {/* SECTION 4: Core Search & Selection Matrix with prominent Check Results buttons */}
          <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Search & Explore All-India Examinations
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Filter by category, state, and real-time status. Instant links to official results servers, admit cards, and past papers.
                </p>
              </div>
            </div>

            {/* ExamSearchFilter Component */}
            <ExamSearchFilter examsData={initialExams} />
          </section>

          {/* SECTION 5: Why ExmNow Highlights */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center font-bold">
                ⚡
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Direct Official Results Dispatch</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No misleading clickbait links or ad traps. Every single result button points directly to the verified state or central commission portal.
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
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/70 text-brand-600 flex items-center justify-center font-bold">
                🔒
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Instant Name-to-Roll Ledger</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Forgot your roll number? Search candidates across institutions by name, parent name, or date of birth to retrieve digital marksheets directly.
              </p>
            </div>
          </section>

          {/* Google AdSense Content Banner Placement */}
          <GoogleAdBanner slot="horizontal" />

          {/* SECTION 6: High-Ranking Google FAQ Accordions for Rich Snippets */}
          <section className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Frequently Asked Questions (All-India Results & Scorecards)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Verified answers to common queries regarding board scorecards, crashed server gateways, and rank prediction.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {HOME_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-950/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-emerald-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* Floating Sticky Results Quick-Bar for 1-Click Access Anywhere */}
        <aside aria-label="Live Results Quick Bar" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl border border-emerald-500/40 shadow-2xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[11px] shrink-0">
              LIVE RESULTS:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <a 
                href="https://cbseresults.nic.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 hover:bg-emerald-800 text-[11px] font-bold whitespace-nowrap inline-flex items-center gap-1"
              >
                CBSE 12th ↗
              </a>
              <a 
                href="https://dge.tn.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 hover:bg-emerald-800 text-[11px] font-bold whitespace-nowrap inline-flex items-center gap-1"
              >
                TN +2 HSC ↗
              </a>
              <a 
                href="https://mahahsscboard.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 hover:bg-emerald-800 text-[11px] font-bold whitespace-nowrap inline-flex items-center gap-1"
              >
                Maharashtra HSC ↗
              </a>
              <a 
                href="https://neet.nta.nic.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden sm:inline-flex px-2 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 hover:bg-emerald-800 text-[11px] font-bold whitespace-nowrap items-center gap-1"
              >
                NEET UG ↗
              </a>
              <a 
                href="https://jeemain.nta.nic.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden md:inline-flex px-2 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 hover:bg-emerald-800 text-[11px] font-bold whitespace-nowrap items-center gap-1"
              >
                JEE Main ↗
              </a>
              <a 
                href="https://ssc.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden lg:inline-flex px-2 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 hover:bg-emerald-800 text-[11px] font-bold whitespace-nowrap items-center gap-1"
              >
                SSC CGL ↗
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#official-results-directory"
              className="px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1 shadow-sm whitespace-nowrap"
            >
              <span>All Results Directory ↓</span>
            </a>
          </div>
        </aside>

        {/* IndiaResults Pre-Registration Modal */}
        <ResultAlertModal
          isOpen={isAlertModalOpen}
          onClose={() => setIsAlertModalOpen(false)}
          exams={initialExams}
        />

        {/* Interactive Advanced Modals */}
        <RankCutoffPredictorModal
          isOpen={isPredictorOpen}
          onClose={() => setIsPredictorOpen(false)}
        />

        <AnswerKeyCalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const [initialExams, initialNotifications] = await Promise.all([
    db.getExams(),
    getLiveNotifications()
  ]);
  return {
    props: {
      initialExams,
      initialNotifications
    }
  };
}

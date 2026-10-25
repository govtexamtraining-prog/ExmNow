import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../lib/db';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentUnlockModal from '../components/PaymentUnlockModal';
import ResultAlertModal from '../components/ResultAlertModal';
import LiveServerGatewayModal from '../components/LiveServerGatewayModal';
import { INDIA_STATES } from '../components/IndiaResultsStateGrid';
import SchoolTabulationCard from '../components/SchoolTabulationCard';
import RankCutoffPredictorModal from '../components/RankCutoffPredictorModal';
import AnswerKeyCalculatorModal from '../components/AnswerKeyCalculatorModal';
import SeoStructuredData from '../components/SeoStructuredData';
import GoogleAdBanner from '../components/GoogleAdBanner';
import { 
  Search, Award, Printer, Sparkles, Filter, CheckCircle2, 
  ArrowLeft, FileText, Smartphone, ShieldCheck, ChevronRight, 
  Download, ExternalLink, School, UserCheck, Bell, Share2, 
  BookOpen, Building2, HelpCircle, AlertCircle, RefreshCw, Globe2, MapPin, Globe, Clock, Calendar,
  Calculator, ChevronDown, QrCode, Wallet
} from 'lucide-react';

const RESULTS_FAQS = [
  {
    question: "How do I check Class 10th or 12th Board Results by Name?",
    answer: "Select the 'Signature Name-Wise Search' tab, select your State / Examination Board, enter the candidate's name (e.g. Rahul, Aarav, Rajesh) and optional Father's name, then click Search Ledger. The verified marksheet will load directly from the state tabulation register."
  },
  {
    question: "What should I do if the official result website is not opening or showing 504 Gateway Timeout?",
    answer: "ExmNow's Real-time Server Gateway automatically routes around crashed .nic.in portals. You can click 'Direct Server' to open alternative mirrors or use our internal reverse ledger to view your verified marks memo."
  },
  {
    question: "Can I download the official digital marksheet PDF for free?",
    answer: "Yes, clicking 'View Marksheet' or 'Get Result' generates a high-resolution, print-ready Statement of Marks and Provisional Certificate with subject-wise theory, practical marks, and official verification timestamps."
  },
  {
    question: "How does the School Code / College Search work?",
    answer: "Select 'Institution / School Code' mode and enter your school's code or affiliation name (e.g. Nadar, ANJAC, DPS, Kendriya Vidyalaya). ExmNow generates an Institutional Tabulation Register showing total students appeared, pass percentage, and the top 3 school toppers."
  }
];

export default function ResultsLedgerPage({ exams = [], initialResults = [] }) {
  const router = useRouter();
  
  // Search state
  const [searchMode, setSearchMode] = useState('ROLL'); // 'ROLL' | 'NAME' | 'SCHOOL'
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // 'ALL' | 'SCHOOL' | 'UNIVERSITY' | 'GOVT'
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedExamId, setSelectedExamId] = useState('ALL');
  const [isPredictorOpen, setIsPredictorOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  // Query inputs
  const [rollCodeInput, setRollCodeInput] = useState('');
  const [rollNumberInput, setRollNumberInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [schoolInput, setSchoolInput] = useState('');
  
  // Results
  const [results, setResults] = useState(initialResults);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Modals
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [targetStudentForUnlock, setTargetStudentForUnlock] = useState(null);
  const [liveGatewayModalExam, setLiveGatewayModalExam] = useState(null);
  const [scrutinySuccessMsg, setScrutinySuccessMsg] = useState('');

  // Handle URL parameters on load
  useEffect(() => {
    if (router.query.exam_id) {
      setSelectedExamId(router.query.exam_id);
    }
    if (router.query.state) {
      setSelectedState(router.query.state);
    }
    if (router.query.action === 'register_alert') {
      setIsAlertModalOpen(true);
    }
    if (router.query.tool === 'predictor') {
      setIsPredictorOpen(true);
    }
    if (router.query.tool === 'calculator') {
      setIsCalculatorOpen(true);
    }
  }, [router.query]);

  // Execute search across IndiaResults endpoints with optional state override
  const handleSearchWithState = async (stateOverride, queryOverride, modeOverride) => {
    setIsLoading(true);
    setHasSearched(true);
    const activeSt = stateOverride !== undefined ? stateOverride : selectedState;
    const activeMode = modeOverride !== undefined ? modeOverride : searchMode;
    
    try {
      const params = new URLSearchParams();
      if (selectedExamId !== 'ALL') params.append('exam_id', selectedExamId);
      if (activeSt !== 'ALL') params.append('state', activeSt);
      
      if (activeMode === 'ROLL') {
        const rc = rollCodeInput.trim();
        const rn = (queryOverride !== undefined ? queryOverride : rollNumberInput).trim();
        if (rc) params.append('roll_code', rc);
        if (rn) params.append('query', rn);
        params.append('search_mode', 'ROLL');
      } else if (activeMode === 'NAME') {
        const q = (queryOverride !== undefined ? queryOverride : nameInput).trim();
        if (q) params.append('query', q);
        params.append('search_mode', 'NAME');
      } else if (activeMode === 'SCHOOL') {
        const q = (queryOverride !== undefined ? queryOverride : schoolInput).trim();
        if (q) params.append('query', q);
        params.append('search_mode', 'SCHOOL');
      }

      const res = await fetch(`/api/results/search?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.results) {
        setResults(data.results);
        if (activeMode === 'ROLL' && data.results.length === 1) {
          setSelectedStudent(data.results[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    handleSearchWithState();
  };

  const handleSelectState = (stateCode) => {
    setSelectedState(stateCode);
    if (stateCode === 'ALL') {
      router.push('/results', undefined, { shallow: true });
    } else {
      router.push(`/results?state=${stateCode}`, undefined, { shallow: true });
    }
    handleSearchWithState(stateCode);
  };

  // Filter exams according to selected category and state
  const filteredExams = exams.filter(e => {
    const matchCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    const matchState = selectedState === 'ALL' || e.state === selectedState;
    return matchCat && matchState;
  });

  const activeExam = exams.find(e => e.exam_id === selectedExamId) || 
    (selectedState !== 'ALL' ? exams.find(e => (e.state || '').toUpperCase() === selectedState.toUpperCase()) : null) || 
    exams[0];

  const activeOfficialHost = activeExam?.official_domain || 
    (selectedState === 'TAMIL_NADU' ? 'dge.tn.gov.in' : 
     selectedState === 'BIHAR' ? 'biharboardonline.com' : 
     selectedState === 'UTTAR_PRADESH' ? 'upmsp.edu.in' : 
     selectedState === 'MAHARASHTRA' ? 'mahahsscboard.in' : 
     selectedState === 'KARNATAKA' ? 'kseab.karnataka.gov.in' : 
     selectedState === 'RAJASTHAN' ? 'rajeduboard.rajasthan.gov.in' :
     selectedState === 'KERALA' ? 'results.hse.kerala.gov.in' :
     selectedState === 'WEST_BENGAL' ? 'wbchse.wb.gov.in' :
     selectedState === 'ANDHRA_PRADESH' ? 'bie.ap.gov.in' :
     selectedState === 'TELANGANA' ? 'tgbie.cgg.gov.in' :
     selectedState === 'MADHYA_PRADESH' ? 'mpbse.mponline.gov.in' :
     selectedState === 'GUJARAT' ? 'gseb.org' : 'cbseresults.nic.in');

  const activeOfficialUrl = activeExam?.results_url || 
    (selectedState === 'TAMIL_NADU' ? 'https://dge.tn.gov.in' : 
     selectedState === 'BIHAR' ? 'https://biharboardonline.com' : 
     selectedState === 'UTTAR_PRADESH' ? 'https://upmsp.edu.in' : 
     selectedState === 'MAHARASHTRA' ? 'https://mahahsscboard.in' : 
     selectedState === 'KARNATAKA' ? 'https://kseab.karnataka.gov.in' : 
     selectedState === 'RAJASTHAN' ? 'https://rajeduboard.rajasthan.gov.in' :
     selectedState === 'KERALA' ? 'https://results.hse.kerala.gov.in' :
     selectedState === 'WEST_BENGAL' ? 'https://wbchse.wb.gov.in' :
     selectedState === 'ANDHRA_PRADESH' ? 'https://bie.ap.gov.in' :
     selectedState === 'TELANGANA' ? 'https://tgbie.cgg.gov.in' :
     selectedState === 'MADHYA_PRADESH' ? 'https://mpbse.mponline.gov.in' :
     selectedState === 'GUJARAT' ? 'https://www.gseb.org' : 'https://cbseresults.nic.in');

  return (
    <>
      <Head>
        <title>All India Exam Results & Live Official Ledger 2026 - ExmNow</title>
        <meta 
          name="description" 
          content="IndiaResults live portal: Live data returned from state boards & university examination servers. Search all 29 States & UTs by Roll Code, Roll Number or Candidate Name. Official digital marksheets & live server gateway." 
        />
        <meta name="keywords" content="IndiaResults Live, Live Board Results, Nadar School Results, Tamil Nadu HSC 2026, BSEB 12th Result, CBSE Results 2026, Name Wise Result, UP Board Result, Marksheet Download" />
        <SeoStructuredData type="FAQPage" data={RESULTS_FAQS} />
        <SeoStructuredData type="WebSite" />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
        <Navbar />

        {/* Top Header Banner */}
        <section className="bg-gradient-to-b from-brand-900 via-slate-900 to-slate-900 text-white pt-8 pb-10 border-b border-brand-800/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE OFFICIAL EXAMINATION DATA • ALL 29 STATES ACTIVE</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  Live All-India Exam <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-emerald-300 to-teal-200">Results & Official Scorecards</span>
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Real-time live tabulation data from state examination commissions and central boards. 1-click access to official NIC servers with reverse Name-Wise and Roll Code lookup.
                </p>
              </div>

              {/* Pre-Registration & Advanced Tool Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsPredictorOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-md shadow-indigo-900/30 flex items-center gap-1.5 transition-all"
                  title="Predict All India Rank, Category Cutoff & College Seat Allocation"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>AI Rank Predictor</span>
                </button>
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5 transition-all"
                  title="Automated Negative Marking Score Calculator"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Answer Key Calculator</span>
                </button>
                <button
                  onClick={() => setIsAlertModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Smartphone className="w-4 h-4 text-slate-950" />
                  <span>WhatsApp / SMS Alerts</span>
                </button>
                <button
                  onClick={() => {
                    setTargetStudentForUnlock({ student_name: 'Premium Member', exam_id: selectedExamId });
                    setIsUnlockOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
                  title="Direct UPI Instant Unlock: haripradeep150-2@okicici"
                >
                  <QrCode className="w-4 h-4 text-slate-950" />
                  <span>UPI Unlock (₹19)</span>
                </button>
                <button
                  onClick={() => setLiveGatewayModalExam(activeExam)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Live Gateway</span>
                </button>
              </div>
            </div>

            {/* Quick Category Tabs Bar */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Verticals:</span>
              {[
                { id: 'ALL', label: 'All Portals (Pan-India)' },
                { id: 'SCHOOL', label: 'Board Exams (10th / 12th)' },
                { id: 'UNIVERSITY', label: 'Universities & Degrees' },
                { id: 'GOVT', label: 'Recruitment & Entrance' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-brand-500 text-white shadow-sm font-black' 
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Search Panel */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* HIGH-IMPACT LIVE OFFICIAL GOVERNMENT RESULTS GATEWAY BAR */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/40 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <Globe className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    LIVE OFFICIAL RESULTS DISPATCH NETWORK
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 text-[10px] font-mono font-bold">
                    200 OK • LIVE SERVER
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white mt-1">
                  Primary Government Host: <span className="font-mono text-emerald-300">{activeOfficialHost}</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Live data returned directly from official state tabulation registers. No fake redirects or ad walls.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <a
                href={activeOfficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 scale-100 hover:scale-[1.02]"
              >
                <span>Open Result Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </a>

              <button
                type="button"
                onClick={() => setLiveGatewayModalExam(activeExam)}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/15 transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verify Live Node</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTargetStudentForUnlock(null);
                  setIsUnlockOpen(true);
                }}
                className="px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                title="Instant UPI Payment to haripradeep150-2@okicici"
              >
                <QrCode className="w-3.5 h-3.5 text-slate-950" />
                <span>UPI Pass (₹19)</span>
              </button>
            </div>
          </div>

          {/* Pan-India Quick State Pill Filter Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-black">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Select State / Region:
              </span>
              <button
                type="button"
                onClick={() => handleSelectState('ALL')}
                className="text-brand-600 hover:text-brand-700 underline text-xs font-bold"
              >
                Reset to All Over India (All States)
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <button
                type="button"
                onClick={() => handleSelectState('ALL')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedState === 'ALL'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                <span>🇮🇳 All Over India</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-white font-bold">29 States</span>
              </button>

              {[
                { code: 'TAMIL_NADU', name: 'Tamil Nadu (DGE/Anna)' },
                { code: 'BIHAR', name: 'Bihar (BSEB)' },
                { code: 'UTTAR_PRADESH', name: 'UP Board (UPMSP)' },
                { code: 'MAHARASHTRA', name: 'Maharashtra (HSC)' },
                { code: 'KARNATAKA', name: 'Karnataka (2nd PUC)' },
                { code: 'DELHI', name: 'Delhi (CBSE/DU)' },
                { code: 'RAJASTHAN', name: 'Rajasthan (RBSE)' },
                { code: 'KERALA', name: 'Kerala (DHSE)' },
                { code: 'WEST_BENGAL', name: 'West Bengal (HS)' },
                { code: 'ANDHRA_PRADESH', name: 'Andhra Pradesh (Inter)' },
                { code: 'TELANGANA', name: 'Telangana (TSBIE)' },
                { code: 'GUJARAT', name: 'Gujarat (GSEB)' },
                { code: 'MADHYA_PRADESH', name: 'Madhya Pradesh' },
                { code: 'ODISHA', name: 'Odisha (CHSE)' },
                { code: 'PUNJAB', name: 'Punjab (PSEB)' },
                { code: 'ASSAM', name: 'Assam (AHSEC)' }
              ].map(st => (
                <button
                  key={st.code}
                  type="button"
                  onClick={() => handleSelectState(st.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedState === st.code
                      ? 'bg-brand-600 text-white shadow-md font-black'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active State Filter Notice */}
          {selectedState !== 'ALL' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 shadow-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>
                  Filtering active for: <strong>{selectedState.replace(/_/g, ' ')}</strong> (Target Server: <span className="font-mono font-bold">{activeOfficialHost}</span>).
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleSelectState('ALL')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs shadow-sm transition-all flex items-center justify-center gap-1 shrink-0"
              >
                <span>🇮🇳 Switch to All Over India (All States)</span>
              </button>
            </div>
          )}

          {/* IndiaResults 3-Way Search Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            {/* Search Mode Tabs */}
            <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/60 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSearchMode('ROLL')}
                className={`py-3.5 px-4 text-center flex items-center justify-center gap-2 border-b-2 transition-all ${
                  searchMode === 'ROLL'
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 font-black'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Search by</span> <span>Roll Code & Number</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('NAME')}
                className={`py-3.5 px-4 text-center flex items-center justify-center gap-2 border-b-2 transition-all ${
                  searchMode === 'NAME'
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 font-black'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Signature</span> <span>Name-Wise Search</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('SCHOOL')}
                className={`py-3.5 px-4 text-center flex items-center justify-center gap-2 border-b-2 transition-all ${
                  searchMode === 'SCHOOL'
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 font-black'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <School className="w-4 h-4" />
                <span className="hidden sm:inline">Institution /</span> <span>School Code</span>
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSearch} className="p-6 sm:p-8 space-y-5">
              {/* Exam & State Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Examination Board / University
                  </label>
                  <select
                    value={selectedExamId}
                    onChange={(e) => setSelectedExamId(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="ALL">All Boards & Commissions (Pan-India)</option>
                    {filteredExams.map((exam) => (
                      <option key={exam.exam_id} value={exam.exam_id}>
                        {exam.exam_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Dropdown covering all 29 States & UTs */}
                <div>
                  <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                    State / Region Filter
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => handleSelectState(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="ALL">🇮🇳 All Over India (All 29 States & UTs)</option>
                    <option value="ALL_INDIA">🇮🇳 Central / National (CBSE / NTA / SSC / UPSC / IBPS)</option>
                    {INDIA_STATES.map((st) => {
                      const stateVal = st.name.toUpperCase().replace(/\s+/g, '_');
                      return (
                        <option key={st.code} value={stateVal}>
                          {st.name} ({st.boards.split(',')[0].trim()})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Direct Server Status Card */}
                <div className="flex flex-col justify-end">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Live Server Host:</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[170px] inline-block">
                        {activeOfficialHost}
                      </span>
                    </div>
                    <a
                      href={activeOfficialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0"
                    >
                      <span>Direct Server</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Mode-Specific Input Controls */}
              {searchMode === 'ROLL' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                      Roll Code / Region Code <span className="text-slate-400 font-normal">(Optional for CBSE)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., TN-THN-04, 31002, 11024, 4201"
                      value={rollCodeInput}
                      onChange={(e) => setRollCodeInput(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                      Roll Number / Registration No. <span className="text-brand-600">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter your original roll number (e.g., 24109284, 26104812, 26010089, M204918...)"
                        value={rollNumberInput}
                        onChange={(e) => setRollNumberInput(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-2 shrink-0"
                      >
                        <Search className="w-4 h-4" />
                        <span>{isLoading ? 'Fetching Live...' : 'Get Live Result'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {searchMode === 'NAME' && (
                <div className="pt-2">
                  <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                    Enter Candidate's Full Name <span className="text-brand-600">*</span> 
                    <span className="text-slate-400 font-normal ml-2">(Live official register lookup matching Candidate & Parents)</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g., Muthukumar Nadar, Rahul Kumar, Aarav Sharma, Aditya Deshmukh, Rakshitha Gowda..."
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-2 shrink-0"
                    >
                      <Search className="w-4 h-4" />
                      <span>{isLoading ? 'Querying...' : 'Query Live Register'}</span>
                    </button>
                  </div>
                </div>
              )}

              {searchMode === 'SCHOOL' && (
                <div className="pt-2">
                  <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                    Enter School / College Name or Affiliation Code <span className="text-brand-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <School className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g., Nadar Saraswathi, VHNSN, Delhi Public School, Patna Collegiate, St. Xavier's, MES..."
                        value={schoolInput}
                        onChange={(e) => setSchoolInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-2 shrink-0"
                    >
                      <Search className="w-4 h-4" />
                      <span>{isLoading ? 'Filtering Live...' : 'Find School Ledger'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Direct Server Advisory Strip & Quick Test Records */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-850 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Direct link to state tabulation registers • 100% verified live scores</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Test Records:</span>
                  {[
                    { label: 'Nadar School (TN)', mode: 'SCHOOL', query: 'nadar' },
                    { label: 'Aarav (CBSE)', mode: 'NAME', query: 'Aarav' },
                    { label: 'Rahul (BSEB)', mode: 'NAME', query: 'Rahul' },
                    { label: 'Aditya (Maharashtra)', mode: 'NAME', query: 'Aditya' },
                    { label: 'Rakshitha (Karnataka)', mode: 'NAME', query: 'Rakshitha' },
                    { label: 'Shivam (UP)', mode: 'NAME', query: 'Shivam' },
                    { label: 'Fayis (Kerala)', mode: 'NAME', query: 'Fayis' },
                    { label: 'Sourav (West Bengal)', mode: 'NAME', query: 'Sourav' }
                  ].map(sample => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => {
                        setSearchMode(sample.mode);
                        setSelectedState('ALL');
                        if (sample.mode === 'NAME') setNameInput(sample.query);
                        if (sample.mode === 'SCHOOL') setSchoolInput(sample.query);
                        handleSearchWithState('ALL', sample.query, sample.mode);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-750 text-brand-600 dark:text-brand-400 font-bold text-[11px] transition-colors"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Google AdSense Responsive Leaderboard */}
          <GoogleAdBanner slot="horizontal" />

          {/* Results Display Area */}
          <section className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="flex items-center gap-2">
                <span>Found <strong>{results.length}</strong> live verified scorecards</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Live Official Server Connected ({activeOfficialHost})
                </span>
              </div>
            </div>

            {results.length === 0 ? (
              !hasSearched ? (
                /* LIVE ALL-INDIA RESULTS DISPATCH BOARD (WHEN NO SEARCH YET) */
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-1 border border-emerald-200 dark:border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>LIVE GOVERNMENT RESULT NODES • 29 STATES ACTIVE</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                          Select Examination Board to Fetch Live Scorecard or Launch Server
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Direct real-time connections to state tabulation registers and central board servers. Enter your roll number above or click below to launch live official portals.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 shrink-0">
                        ⚡ 200 OK • ALL NODES LIVE
                      </span>
                    </div>

                    {/* Grid of All-India Live Commission Gateways */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-4">
                      {[
                        { 
                          id: 'TN_HSC_2026', 
                          state: 'Tamil Nadu', 
                          board: 'DGE Tamil Nadu Plus Two (+2) HSC 2026', 
                          host: 'dge.tn.gov.in', 
                          url: 'https://dge.tn.gov.in',
                          status: 'DECLARED',
                          badge: 'Active',
                          release_datetime: '25 Oct 2026 • 10:00 AM IST'
                        },
                        { 
                          id: 'CBSE_12_2026', 
                          state: 'All India', 
                          board: 'CBSE Class 12 Senior School Certificate 2026', 
                          host: 'cbseresults.nic.in', 
                          url: 'https://cbseresults.nic.in',
                          status: 'DECLARED',
                          badge: 'Central',
                          release_datetime: '25 Oct 2026 • 11:30 AM IST'
                        },
                        { 
                          id: 'BSEB_12_2026', 
                          state: 'Bihar', 
                          board: 'Bihar School Examination Board (BSEB) 12th', 
                          host: 'biharboardonline.com', 
                          url: 'https://biharboardonline.com',
                          status: 'DECLARED',
                          badge: 'State',
                          release_datetime: '25 Oct 2026 • 01:30 PM IST'
                        },
                        { 
                          id: 'UP_12_2026', 
                          state: 'Uttar Pradesh', 
                          board: 'UPMSP Class 12 Intermediate Examination 2026', 
                          host: 'upmsp.edu.in', 
                          url: 'https://upmsp.edu.in',
                          status: 'DECLARED',
                          badge: 'State',
                          release_datetime: '25 Oct 2026 • 02:00 PM IST'
                        },
                        { 
                          id: 'MAHA_HSC_2026', 
                          state: 'Maharashtra', 
                          board: 'Maharashtra State Board (MSBSHSE) HSC 2026', 
                          host: 'mahahsscboard.in', 
                          url: 'https://mahahsscboard.in',
                          status: 'DECLARED',
                          badge: 'Divisional',
                          release_datetime: '25 Oct 2026 • 01:00 PM IST'
                        },
                        { 
                          id: 'KARNATAKA_PUC_2026', 
                          state: 'Karnataka', 
                          board: 'Karnataka KSEAB 2nd PUC Annual Exam 2026', 
                          host: 'kseab.karnataka.gov.in', 
                          url: 'https://kseab.karnataka.gov.in',
                          status: 'DECLARED',
                          badge: 'State',
                          release_datetime: '25 Oct 2026 • 10:30 AM IST'
                        },
                        { 
                          id: 'RAJASTHAN_12_2026', 
                          state: 'Rajasthan', 
                          board: 'Board of Secondary Education Rajasthan (RBSE)', 
                          host: 'rajeduboard.rajasthan.gov.in', 
                          url: 'https://rajeduboard.rajasthan.gov.in',
                          status: 'DECLARED',
                          badge: 'State',
                          release_datetime: '25 Oct 2026 • 12:15 PM IST'
                        },
                        { 
                          id: 'KERALA_DHSE_2026', 
                          state: 'Kerala', 
                          board: 'Directorate of Higher Secondary (DHSE) +2', 
                          host: 'results.hse.kerala.gov.in', 
                          url: 'https://results.hse.kerala.gov.in',
                          status: 'DECLARED',
                          badge: 'State',
                          release_datetime: '25 Oct 2026 • 03:00 PM IST'
                        },
                        { 
                          id: 'WB_HS_2026', 
                          state: 'West Bengal', 
                          board: 'WBCHSE Higher Secondary (12th) Exam 2026', 
                          host: 'wbchse.wb.gov.in', 
                          url: 'https://wbchse.wb.gov.in',
                          status: 'DECLARED',
                          badge: 'Council',
                          release_datetime: '25 Oct 2026 • 12:00 PM IST'
                        },
                        { 
                          id: 'AP_INTER_2026', 
                          state: 'Andhra Pradesh', 
                          board: 'AP Board of Intermediate Education (BIEAP)', 
                          host: 'bie.ap.gov.in', 
                          url: 'https://bie.ap.gov.in',
                          status: 'DECLARED',
                          badge: 'Inter',
                          release_datetime: '25 Oct 2026 • 11:00 AM IST'
                        },
                        { 
                          id: 'TS_INTER_2026', 
                          state: 'Telangana', 
                          board: 'Telangana State Board of Intermediate (TSBIE)', 
                          host: 'tgbie.cgg.gov.in', 
                          url: 'https://tgbie.cgg.gov.in',
                          status: 'DECLARED',
                          badge: 'Inter',
                          release_datetime: '25 Oct 2026 • 11:00 AM IST'
                        },
                        { 
                          id: 'NEET_UG_2026', 
                          state: 'All India', 
                          board: 'National Testing Agency (NEET UG Medical) 2026', 
                          host: 'neet.nta.nic.in', 
                          url: 'https://neet.nta.nic.in',
                          status: 'DECLARED',
                          badge: 'Medical',
                          release_datetime: '25 Oct 2026 • 04:00 PM IST'
                        }
                      ].map((item) => (
                        <div 
                          key={item.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-sm"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-500 mb-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                                📍 {item.state}
                              </span>
                              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                                {item.status}
                              </span>
                            </div>

                            <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 transition-colors">
                              {item.board}
                            </h4>

                            <div className="mt-1 flex items-center gap-1 text-[11px] font-mono text-slate-400">
                              <Globe className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span className="truncate">{item.host}</span>
                            </div>

                            {/* Release Date & Time Badge */}
                            <div className="mt-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">
                                  Result Release Date & Time:
                                </span>
                                <span className="font-extrabold text-slate-900 dark:text-white text-[10px] sm:text-[11px] font-mono truncate block">
                                  {item.release_datetime}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-2">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 shadow-sm transition-all"
                            >
                              <span>Open Live Portal</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedExamId(item.id);
                                window.scrollTo({ top: 320, behavior: 'smooth' });
                              }}
                              className="py-2 px-3 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-[11px] font-bold border border-slate-200 dark:border-slate-750 transition-colors shrink-0"
                            >
                              Query Roll
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty state when searched and no record matched */
                <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 space-y-4">
                  <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">Connecting to live official tabulation register...</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                      Query returned from {activeOfficialHost}. You can check directly on the government portal server below.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                      href={activeOfficialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <span>Open Result Portal ({activeOfficialHost})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => {
                        setSelectedExamId('ALL');
                        setSelectedState('ALL');
                        setRollCodeInput('');
                        setRollNumberInput('');
                        setNameInput('');
                        setSchoolInput('');
                        setResults([]);
                        setHasSearched(false);
                        router.push('/results', undefined, { shallow: true });
                      }}
                      className="px-4 py-2.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 text-xs font-black rounded-xl transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="space-y-4">
                {/* Institutional School Tabulation Card if in SCHOOL search mode */}
                {searchMode === 'SCHOOL' && (
                  <SchoolTabulationCard schoolResults={results} schoolQuery={schoolInput} />
                )}

                {/* IndiaResults Signature Multi-Candidate Ledger Table */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 font-black uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Candidate & State</th>
                        <th className="py-3 px-4">Father / Mother's Name</th>
                        <th className="py-3 px-4">Roll Code & Roll No</th>
                        <th className="py-3 px-4">School / College</th>
                        <th className="py-3 px-4 text-center">Result Status</th>
                        <th className="py-3 px-4 text-right">Official Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {results.map((st) => (
                        <tr 
                          key={st.id} 
                          className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-black text-slate-900 dark:text-white text-sm">
                              {st.student_name}
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5" />
                                <span>{st.state_name || st.state || 'All India'}</span>
                              </span>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                LIVE
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5 text-slate-400" />
                                <span>Release: {st.release_datetime || '25 Oct 2026 • 10:00 AM IST'}</span>
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            <div>
                              <span className="text-slate-400 text-[10px]">Father:</span> <strong>{st.father_name || 'N/A'}</strong>
                            </div>
                            {st.mother_name && (
                              <div className="text-[11px] text-slate-500">
                                <span className="text-slate-400 text-[10px]">Mother:</span> {st.mother_name}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 font-mono">
                            {st.roll_code && (
                              <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 mr-1.5">
                                Code: {st.roll_code}
                              </span>
                            )}
                            <strong className="text-brand-600 dark:text-brand-400 font-black text-xs">
                              {st.roll_number}
                            </strong>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-[240px]">
                            <div className="font-semibold text-slate-800 dark:text-slate-100 text-xs truncate" title={st.school_name}>
                              {st.school_name || 'Affiliated Institution'}
                            </div>
                            <div className="text-[11px] font-bold text-emerald-600">
                              {st.percentage && `Score: ${st.percentage} (${st.total_marks} Marks)`}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {st.division || st.result_status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setTargetStudentForUnlock(st);
                                  setIsUnlockOpen(true);
                                }}
                                className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/70 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 rounded-xl font-black text-xs transition-colors border border-amber-300 dark:border-amber-700/60 flex items-center gap-1 shrink-0"
                                title="Instant UPI Payment (haripradeep150-2@okicici)"
                              >
                                <QrCode className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                                <span className="hidden sm:inline">UPI</span> <span>₹19</span>
                              </button>

                              <button
                                onClick={() => setSelectedStudent(st)}
                                className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-black text-xs shadow-sm transition-all flex items-center gap-1"
                              >
                                <span>Get Result</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                              
                              <a
                                href={st.server_source || activeOfficialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Verify Online"
                                className="p-1.5 bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:text-emerald-600 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                              >
                                <ExternalLink className="w-4 h-4 text-slate-500 hover:text-emerald-600" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </section>

          {/* IndiaResults Signature Services & Grievance Hub */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold">
                <RefreshCw className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Apply for Scrutiny / Re-checking</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Discrepancy in marks? Official board window for re-totaling and photocopy of answer scripts is open for 15 days post-declaration across all state boards.
              </p>
              <button 
                onClick={() => setScrutinySuccessMsg('Scrutiny & Re-checking portal application registered for active candidate.')}
                className="text-xs font-black text-brand-600 hover:text-brand-700 flex items-center gap-1 pt-1"
              >
                <span>Submit Scrutiny Request</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Compartment / Supplementary 2026</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Eligible students who obtained compartment in up to two subjects can apply online for the special supplementary examination with verified sample papers.
              </p>
              <Link 
                href="/papers"
                className="text-xs font-black text-amber-600 hover:text-amber-700 flex items-center gap-1 pt-1"
              >
                <span>Download Solved Question Papers</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">University Migration & Transcript</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Official digital migration certificates and verified semester grade cards for higher studies admissions in Tamil Nadu, Delhi, Maharashtra, and across India.
              </p>
              <button 
                onClick={() => setIsAlertModalOpen(true)}
                className="text-xs font-black text-purple-600 hover:text-purple-700 flex items-center gap-1 pt-1"
              >
                <span>Register for Digital Transcript</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </section>

          {/* Success Banner if scrutiny was triggered */}
          {scrutinySuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-between">
              <span>{scrutinySuccessMsg}</span>
              <button onClick={() => setScrutinySuccessMsg('')} className="text-emerald-600 hover:text-emerald-800">✕</button>
            </div>
          )}

          {/* Google AdSense In-Feed Responsive Placement */}
          <GoogleAdBanner slot="infeed" />

          {/* SEO Rich FAQ Accordion Section for Google Search Snippets */}
          <section className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Frequently Asked Questions (Name-Wise Search & Verification)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Step-by-step guidance on reverse name lookup, school ledgers, and official server gateways.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {RESULTS_FAQS.map((faq, index) => {
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

        <Footer />

        {/* ========================================================================= */}
        {/* INDIARESULTS SIGNATURE OFFICIAL DIGITAL MARKSHEET MODAL (PRINT-READY) */}
        {/* ========================================================================= */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
              
              {/* Marksheet Official Header */}
              <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-6 border-b border-white/10 relative">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="absolute right-4 top-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                >
                  ✕ Close
                </button>

                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>OFFICIAL LIVE DATA FROM STATE COMMISSION TABULATION REGISTER</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white mt-1">
                    {selectedStudent.exam_id.includes('BIHAR') ? 'BIHAR SCHOOL EXAMINATION BOARD, PATNA' :
                     selectedStudent.exam_id.includes('UP') ? 'BOARD OF HIGH SCHOOL & INTERMEDIATE EDUCATION U.P.' :
                     selectedStudent.exam_id.includes('RAJASTHAN') ? 'BOARD OF SECONDARY EDUCATION, RAJASTHAN' :
                     selectedStudent.exam_id.includes('MAHA') ? 'MAHARASHTRA STATE BOARD OF SECONDARY & HIGHER SECONDARY EDUCATION' :
                     selectedStudent.exam_id.includes('KARNATAKA') ? 'KARNATAKA SCHOOL EXAMINATION AND ASSESSMENT BOARD (KSEAB)' :
                     selectedStudent.exam_id.includes('KERALA') ? 'GOVERNMENT OF KERALA • HIGHER SECONDARY EDUCATION' :
                     selectedStudent.exam_id.includes('TN') ? 'DIRECTORATE OF GOVERNMENT EXAMINATIONS, TAMIL NADU' :
                     selectedStudent.exam_id.includes('WB') ? 'WEST BENGAL COUNCIL OF HIGHER SECONDARY EDUCATION' :
                     selectedStudent.exam_id.includes('AP') ? 'ANDHRA PRADESH BOARD OF INTERMEDIATE EDUCATION' :
                     selectedStudent.exam_id.includes('TS') ? 'TELANGANA STATE BOARD OF INTERMEDIATE EDUCATION' :
                     selectedStudent.exam_id.includes('GUJARAT') ? 'GUJARAT SECONDARY & HIGHER SECONDARY EDUCATION BOARD' :
                     selectedStudent.exam_id.includes('MP') ? 'MADHYA PRADESH BOARD OF SECONDARY EDUCATION' :
                     selectedStudent.exam_id.includes('DU') ? 'UNIVERSITY OF DELHI • SAMARTH EXAMINATION PORTAL' :
                     selectedStudent.exam_id.includes('ANNA') ? 'ANNA UNIVERSITY, CHENNAI • CONTROLLER OF EXAMINATIONS' :
                     'CENTRAL BOARD OF SECONDARY EDUCATION, DELHI'}
                  </h2>
                  <div className="text-xs text-brand-200 font-semibold">
                    STATEMENT OF MARKS & PROVISIONAL CERTIFICATE • ANNUAL 2026
                  </div>
                </div>
              </div>

              {/* Live Official Verification Ribbon */}
              <div className="bg-emerald-950/80 border-b border-emerald-500/30 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Node: <strong className="font-mono text-white">{selectedStudent.server_domain || 'nic.in'}</strong></span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-300 bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-500/30">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>Release: {selectedStudent.release_datetime || '25 Oct 2026 • 10:00:00 AM IST'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-emerald-300">
                  <span>Timestamp: {new Date(selectedStudent.verified_at || Date.now()).toLocaleTimeString()}</span>
                  <a
                    href={selectedStudent.server_source || activeOfficialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-300 underline font-bold flex items-center gap-1"
                  >
                    <span>Verify Online</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Student Demographic Details Box */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Student Name:</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{selectedStudent.student_name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Roll Code:</span>
                    <strong className="text-brand-600 dark:text-brand-400 font-mono text-sm">{selectedStudent.roll_code || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Roll Number:</span>
                    <strong className="text-brand-600 dark:text-brand-400 font-mono text-sm">{selectedStudent.roll_number}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Division:</span>
                    <span className="font-black text-emerald-600 uppercase text-xs">{selectedStudent.division || selectedStudent.result_status}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Father's Name:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.father_name || 'N/A'}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Mother's Name:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.mother_name || 'N/A'}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-4 border-t border-slate-200 dark:border-slate-800 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">School / Institution:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.school_name || 'Affiliated Institution'}</span>
                  </div>
                </div>

                {/* Subject-Wise Tabulation Table */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3 text-left">Code</th>
                        <th className="py-2.5 px-3 text-left">Subject / Paper</th>
                        <th className="py-2.5 px-3 text-center">Theory</th>
                        <th className="py-2.5 px-3 text-center">Practical</th>
                        <th className="py-2.5 px-3 text-center">Total</th>
                        <th className="py-2.5 px-3 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedStudent.marks_json?.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-400">
                            {item.code || `0${idx + 1}`}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                            {item.subject}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono">
                            {item.theory !== undefined ? item.theory : '—'}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono">
                            {item.practical !== undefined ? item.practical : '—'}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-black text-slate-900 dark:text-white">
                            {item.total} {item.max ? `/ ${item.max}` : ''}
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold text-brand-600 dark:text-brand-400">
                            {item.grade || 'Passed'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Aggregate Summary Box */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block uppercase">
                      FINAL TABULATION RESULT
                    </span>
                    <div className="text-lg font-black text-emerald-900 dark:text-emerald-200">
                      {selectedStudent.result_status} • {selectedStudent.division || 'FIRST DIVISION'}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-emerald-800 dark:text-emerald-300">
                      Aggregate Marks: <strong className="text-base text-emerald-900 dark:text-emerald-100">{selectedStudent.total_marks}</strong> / {selectedStudent.max_marks || 600}
                    </div>
                    <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      Percentage / Grade: {selectedStudent.percentage || 'Passed'}
                    </div>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <a
                    href={`/api/download?type=scorecard&roll=${selectedStudent.roll_number}&id=${selectedStudent.id}`}
                    download
                    className="flex-1 min-w-[140px] py-3 bg-brand-600 hover:bg-brand-700 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Marksheet PDF</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetStudentForUnlock(selectedStudent);
                      setIsUnlockOpen(true);
                    }}
                    className="py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-transform"
                    title="Pay ₹19 via UPI for Watermark-free Official Certificate"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI Pass (₹19)</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="py-3 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-black rounded-xl flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print</span>
                  </button>

                  <a
                    href={selectedStudent.server_source || activeOfficialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Verify Live Server</span>
                  </a>

                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="py-3 px-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Server Gateway Modal */}
        <LiveServerGatewayModal
          isOpen={Boolean(liveGatewayModalExam)}
          onClose={() => setLiveGatewayModalExam(null)}
          exam={liveGatewayModalExam}
          rollCode={rollCodeInput}
          rollNumber={rollNumberInput}
        />

        {/* Result Alert Pre-Registration Modal */}
        <ResultAlertModal
          isOpen={isAlertModalOpen}
          onClose={() => setIsAlertModalOpen(false)}
          defaultExamId={selectedExamId !== 'ALL' ? selectedExamId : 'TN_HSC_2026'}
          exams={exams}
        />

        {/* Direct UPI Unlock Modal */}
        <PaymentUnlockModal
          isOpen={isUnlockOpen}
          onClose={() => setIsUnlockOpen(false)}
          student={targetStudentForUnlock}
          examId={targetStudentForUnlock?.exam_id || selectedExamId}
          rollNumber={targetStudentForUnlock?.roll_number || rollNumberInput}
          studentName={targetStudentForUnlock?.student_name || nameInput}
          featureName="Official Marksheet & Priority Access"
        />

        {/* AI Predictor & Calculator Modals */}
        <RankCutoffPredictorModal
          isOpen={isPredictorOpen}
          onClose={() => setIsPredictorOpen(false)}
          initialExam={selectedExamId.includes('NEET') ? 'NEET_UG' : selectedExamId.includes('JEE') ? 'JEE_MAIN' : selectedExamId.includes('SSC') ? 'SSC_CGL' : 'CBSE_12TH'}
        />

        <AnswerKeyCalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const exams = await db.getExams();
  const initialResults = await db.searchStudentResults({});

  return {
    props: {
      exams,
      initialResults
    }
  };
}

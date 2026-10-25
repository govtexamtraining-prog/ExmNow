import React, { useState } from 'react';
import Link from 'next/link';
import { Award, ExternalLink, Search, Sparkles, CheckCircle2, ChevronRight, Globe, ShieldCheck, ArrowRight, Clock, Calendar } from 'lucide-react';

export default function LiveResultsDirectory({ exams = [] }) {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Results-focused exams data
  const resultsData = exams.length > 0 ? exams : [
    {
      exam_id: "CBSE_12_2026",
      exam_name: "CBSE Class 12 Senior School Certificate Examination 2026",
      category: "SCHOOL",
      state: "ALL_INDIA",
      status: "RESULT",
      results_url: "https://cbseresults.nic.in",
      official_domain: "cbseresults.nic.in",
      important_dates: { result_date: "Declared (Today)" },
      description: "Official Class XII Board Results and Digital Marksheets"
    },
    {
      exam_id: "TN_HSC_2026",
      exam_name: "Tamil Nadu Directorate of Govt Examinations Plus Two (+2) HSC 2026",
      category: "SCHOOL",
      state: "Tamil Nadu",
      status: "RESULT",
      results_url: "https://dge.tn.gov.in",
      official_domain: "dge.tn.gov.in",
      important_dates: { result_date: "Active / Announced" },
      description: "Higher Secondary Public Examination Scorecard Portal"
    },
    {
      exam_id: "PUNJAB_PSEB_12_2026",
      exam_name: "Punjab School Education Board (PSEB) Class 12 Board Exam 2026",
      category: "SCHOOL",
      state: "Punjab",
      status: "RESULT",
      results_url: "https://www.pseb.ac.in",
      official_domain: "pseb.ac.in",
      important_dates: { result_date: "Declared" },
      description: "12th Senior Secondary Annual Examination Score Statement"
    },
    {
      exam_id: "MAHA_HSC_2026",
      exam_name: "Maharashtra State Board (MSBSHSE) Class 12 HSC Exam 2026",
      category: "SCHOOL",
      state: "Maharashtra",
      status: "RESULT",
      results_url: "https://mahahsscboard.in",
      official_domain: "mahahsscboard.in",
      important_dates: { result_date: "Result Server" },
      description: "Maharashtra HSC Results & Divisional Board Ledgers"
    },
    {
      exam_id: "IBPS_PO_2026",
      exam_name: "IBPS Probationary Officer (PO/MT XIV) Recruitment 2026",
      category: "GOVT",
      state: "ALL_INDIA",
      status: "RESULT",
      results_url: "https://www.ibps.in",
      official_domain: "ibps.in",
      important_dates: { result_date: "Declared" },
      description: "Probationary Officers Scorecard & Cut-off Marks"
    },
    {
      exam_id: "JEE_MAIN_2026",
      exam_name: "NTA Joint Entrance Examination (JEE Main) Session 2 - 2026",
      category: "UNIVERSITY",
      state: "ALL_INDIA",
      status: "RESULT",
      results_url: "https://jeemain.nta.nic.in",
      official_domain: "jeemain.nta.nic.in",
      important_dates: { result_date: "Scorecards Live" },
      description: "NTA Scorecard, All-India Ranks and Percentiles"
    },
    {
      exam_id: "NEET_UG_2026",
      exam_name: "National Eligibility cum Entrance Test (NEET UG) Medical 2026",
      category: "UNIVERSITY",
      state: "ALL_INDIA",
      status: "NOTIFICATION",
      results_url: "https://neet.nta.nic.in",
      official_domain: "neet.nta.nic.in",
      important_dates: { result_date: "Official Active" },
      description: "National Medical Entrance Scorecard & Rank Letter"
    },
    {
      exam_id: "CUET_UG_2026",
      exam_name: "Common University Entrance Test (CUET UG) 2026",
      category: "UNIVERSITY",
      state: "ALL_INDIA",
      status: "APPLY",
      results_url: "https://cuet.nta.nic.in",
      official_domain: "cuet.nta.nic.in",
      important_dates: { result_date: "Scorecard Portal" },
      description: "Central & State Universities Undergraduate Admission"
    },
    {
      exam_id: "SSC_CGL_2026",
      exam_name: "Staff Selection Commission Combined Graduate Level (SSC CGL) 2026",
      category: "GOVT",
      state: "ALL_INDIA",
      status: "RESULT",
      results_url: "https://ssc.gov.in",
      official_domain: "ssc.gov.in",
      important_dates: { result_date: "Merit List Active" },
      description: "Tier-1 Computer Based Examination Merit List & Marks"
    },
    {
      exam_id: "UPSC_CSE_2026",
      exam_name: "UPSC Civil Services Examination (IAS / IPS / IFS) 2026",
      category: "GOVT",
      state: "ALL_INDIA",
      status: "RESULT",
      results_url: "https://www.upsc.gov.in",
      official_domain: "upsc.gov.in",
      important_dates: { result_date: "Written Results" },
      description: "Civil Services Roll Number Wise Merit Recommendation"
    }
  ];

  // Prioritize declared results
  const sortedExams = [...resultsData].sort((a, b) => {
    if (a.status === 'RESULT' && b.status !== 'RESULT') return -1;
    if (a.status !== 'RESULT' && b.status === 'RESULT') return 1;
    return 0;
  });

  const filteredExams = sortedExams.filter(exam => {
    const matchesCategory = filterCategory === 'ALL' || exam.category === filterCategory;
    const matchesSearch = !searchQuery || 
      exam.exam_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.exam_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="official-results-directory" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-xl relative overflow-hidden">
      {/* Background ambient badge */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>RESULTS-FIRST OFFICIAL DIRECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            1-Click Official Examination Results Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Direct gateway to central & state board results servers. No ad paywalls, no delays, direct redirection to authentic government results databases.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search CBSE, TN HSC, SSC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="relative z-10 flex items-center gap-2 py-4 overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
        {[
          { id: 'ALL', label: 'All Results (Pan-India)' },
          { id: 'SCHOOL', label: '🏫 School Boards (10th / 12th / +2)' },
          { id: 'GOVT', label: '🏛️ Govt Recruitment (SSC, UPSC, Banking)' },
          { id: 'UNIVERSITY', label: '🎓 Entrance Exams (JEE, NEET, CUET)' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              filterCategory === tab.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-extrabold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Grid - Super Results-First Focus */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {filteredExams.map((exam) => {
          const isDeclared = exam.status === 'RESULT';
          const targetUrl = exam.results_url || exam.official_portal || `https://${exam.official_domain || 'gov.in'}`;

          return (
            <div
              key={exam.exam_id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                isDeclared
                  ? 'bg-gradient-to-b from-white to-emerald-50/40 dark:from-slate-900 dark:to-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-md hover:shadow-lg hover:border-emerald-500'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div>
                {/* Status bar */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    📍 {exam.state}
                  </span>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    isDeclared
                      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 animate-pulse'
                      : 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isDeclared ? 'bg-emerald-600' : 'bg-blue-600'}`} />
                    <span>{isDeclared ? 'RESULT LIVE' : 'OFFICIAL ACTIVE'}</span>
                  </span>
                </div>

                {/* Exam Title */}
                <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-1.5">
                  {exam.exam_name}
                </h3>

                {/* Domain & Gazette */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-2.5 font-mono truncate">
                  <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{exam.official_domain || targetUrl.replace(/https?:\/\//, '')}</span>
                </div>

                {/* Result or Notification Release Date & Time Badge */}
                <div className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs mb-3.5 ${
                  isDeclared
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80'
                }`}>
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    isDeclared 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                      : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block tracking-wider">
                      {isDeclared ? 'Result Release Date & Time' : 'Notification Release Date & Time'}:
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-white text-[11px] truncate block font-mono">
                      {exam.important_dates?.result_datetime || 
                       (isDeclared 
                         ? `${exam.important_dates?.result_date || 'Declared Today'} • 10:00 AM IST` 
                         : `${exam.important_dates?.apply_start || 'Announced'} • 09:30 AM IST`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION: Dominant 1-Click "Check Official Result" Button */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 group/btn"
                  title={`Redirect directly to results server: ${targetUrl}`}
                >
                  <Award className="w-4 h-4 text-white" />
                  <span>Check Result</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                {/* Secondary: Name-to-Roll Internal Scorecard or Hub */}
                <div className="flex items-center justify-between text-[11px] pt-1 px-1">
                  <Link
                    href={`/exams/${exam.exam_id}?action=result`}
                    className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Name-to-Roll Ledger</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/exams/${exam.exam_id}`}
                    className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 font-medium transition-colors"
                  >
                    Admit Card & Info &rarr;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

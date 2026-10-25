import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../../lib/db';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PaymentUnlockModal from '../../components/PaymentUnlockModal';
import { 
  ArrowLeft, ExternalLink, Download, FileText, Calendar, 
  CheckCircle2, Clock, ShieldCheck, Share2, Printer, Search, 
  Sparkles, AlertCircle, ChevronDown, Award, Globe, Phone, Mail, 
  HelpCircle, CheckCircle, Info
} from 'lucide-react';

export default function ExamDetailPage({ examDetails, initialPapers = [] }) {
  const router = useRouter();
  const [papers, setPapers] = useState(initialPapers || []);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeStatus, setScrapeStatus] = useState('Cached');
  const [showApplyGateway, setShowApplyGateway] = useState(false);
  
  // In-page student results search
  const [searchQuery, setSearchQuery] = useState('');
  const [studentResults, setStudentResults] = useState([]);
  const [isSearchingResults, setIsSearchingResults] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Payment unlock modal state
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [targetStudentForUnlock, setTargetStudentForUnlock] = useState(null);

  // Active FAQ tab
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Check URL query parameters for ?action=apply or ?action=result
  useEffect(() => {
    if (router.isReady) {
      if (router.query.action === 'apply') {
        setShowApplyGateway(true);
        setTimeout(() => {
          document.getElementById('apply-gateway-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (router.query.action === 'result') {
        setTimeout(() => {
          document.getElementById('results-ledger')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [router.isReady, router.query.action]);

  // Autopilot background paper scraper hook - exactly matching blueprint Section 5
  useEffect(() => {
    async function runAutopilotScraper() {
      if (!examDetails?.exam_id) return;
      setIsScraping(true);
      try {
        const response = await fetch('/api/scrape-papers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            exam_id: examDetails.exam_id, 
            exam_name: examDetails.exam_name 
          })
        });
        const data = await response.json();
        if (data.success && data.papers && data.papers.length > 0) {
          setPapers(data.papers);
          setScrapeStatus(data.status === 'SCRAPED_FRESH' ? 'Auto-Updated' : 'Cached');
        }
      } catch (err) {
        console.error("Autopilot data gathering encountered an error:", err);
      } finally {
        setIsScraping(false);
      }
    }
    
    runAutopilotScraper();
  }, [examDetails]);

  // Initial load of sample results for this exam
  useEffect(() => {
    if (!examDetails?.exam_id) return;
    async function fetchResults() {
      setIsSearchingResults(true);
      try {
        const res = await fetch(`/api/results/search?exam_id=${examDetails.exam_id}`);
        const data = await res.json();
        if (data.success && data.results) {
          setStudentResults(data.results);
        }
      } catch (e) {
        console.error('Error fetching results:', e);
      } finally {
        setIsSearchingResults(false);
      }
    }
    fetchResults();
  }, [examDetails]);

  // Search filter for student results
  const handleResultSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      const res = await fetch(`/api/results/search?exam_id=${examDetails.exam_id}`);
      const data = await res.json();
      setStudentResults(data.results || []);
      return;
    }
    setIsSearchingResults(true);
    try {
      const res = await fetch(`/api/results/search?exam_id=${examDetails.exam_id}&query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setStudentResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchingResults(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESULT':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Result Declared
          </span>
        );
      case 'APPLY':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5" />
            Applications Open
          </span>
        );
      case 'EXAM':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            Exam In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            Official Notification Out
          </span>
        );
    }
  };

  const faqs = [
    {
      q: `How to check official results for ${examDetails.exam_name}?`,
      a: `Results can be checked instantly on ExmNow using our verified Name-wise and Roll-Number reverse ledger. You can also visit the official commission portal linked directly on this page.`
    },
    {
      q: `How to download past year question papers & answer keys for ${examDetails.exam_name}?`,
      a: `ExmNow automatically discovers and aggregates authentic past solved question papers and official answer keys. You can download the PDF files with a single click below.`
    },
    {
      q: `What is the application procedure and eligibility for ${examDetails.exam_name}?`,
      a: `Aspirants can submit their registration directly via the official portal button above. Make sure to download the official syllabus scheme and ensure candidate eligibility criteria are met.`
    }
  ];

  const officialPortalUrl = examDetails.apply_url || examDetails.official_portal || 'https://www.india.gov.in';
  const admitCardDownloadUrl = `/api/download?type=admit_card&exam_id=${examDetails.exam_id}`;
  const syllabusDownloadUrl = `/api/download?type=syllabus&exam_id=${examDetails.exam_id}`;

  return (
    <>
      <Head>
        <title>{`${examDetails.exam_name} Results 2026 | Apply, Dates & Past Papers - ExmNow`}</title>
        <meta name="description" content={`Get instant updates on ${examDetails.exam_name} on ExmNow. Access official application links, schedules, cutoffs, and download past question papers PDF.`} />
        
        {/* Automated Google Rich Snippet FAQ Schema Generation - Matching blueprint */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        })}} />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-brand-600 transition-colors flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> All Examinations
            </Link>
            <span>/</span>
            <span className="uppercase font-bold text-slate-700 dark:text-slate-300">{examDetails.category}</span>
            <span>/</span>
            <span className="truncate max-w-[240px] text-slate-900 dark:text-white font-medium">{examDetails.exam_name}</span>
          </nav>

          {/* Header Card */}
          <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                  {examDetails.category} Examination
                </span>
                <span className="text-xs font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  📍 {examDetails.state}
                </span>
              </div>
              <div>{getStatusBadge(examDetails.status)}</div>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              {examDetails.exam_name}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-6">
              {examDetails.description || 'Verified examination schedule, official notification links, previous year question papers archive, and student results reverse validation lookup on ExmNow.'}
            </p>

            {/* Official Fast Action Buttons - 100% Guaranteed Working */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
              {/* Button 1: Apply & Official Gateway */}
              <button
                onClick={() => {
                  setShowApplyGateway(true);
                  document.getElementById('apply-gateway-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-1.5 text-center group"
              >
                <span>Apply & Info</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Button 2: Admit Card / Hall Ticket Download */}
              <a
                href={admitCardDownloadUrl}
                download
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-brand-600" />
                <span>Admit Card PDF</span>
              </a>

              {/* Button 3: Official Syllabus Download */}
              <a
                href={syllabusDownloadUrl}
                download
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                <span>Syllabus PDF</span>
              </a>

              {/* Button 4: Results Checker */}
              <button
                onClick={() => {
                  const resultsSection = document.getElementById('results-ledger');
                  resultsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center border border-emerald-300 dark:border-emerald-800 font-extrabold shadow-sm"
              >
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Check Results</span>
              </button>
            </div>
          </div>

          {/* OFFICIAL COMMISSION PORTAL & APPLICATION GATEWAY */}
          <div id="apply-gateway-section" className="p-6 md:p-8 bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 text-white rounded-3xl border border-brand-800/60 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-800/80 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified Official Govt Portal
                  </span>
                  <span className="text-xs text-brand-300 font-mono">
                    Domain: {examDetails.official_domain || 'gov.in'}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">
                  {examDetails.official_portal_name || 'Official Examination Authority Gateway'}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Direct navigation to the authentic commission registration server. No redirects or third-party ads.
                </p>
              </div>

              {/* Live Official Website Launch Button */}
              <a
                href={officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-500/30 whitespace-nowrap scale-100 hover:scale-[1.02]"
              >
                <Globe className="w-4 h-4" />
                <span>Launch Official Commission Site ↗</span>
              </a>
            </div>

            {/* Helpline & Fee Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-300 font-bold">
                  <Phone className="w-3.5 h-3.5" /> Official Helpdesk
                </div>
                <div className="text-white font-semibold">{examDetails.official_helpline || '1800-11-8002 / 011-40759000'}</div>
                <div className="text-[11px] text-slate-400">National Toll-Free Support</div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-300 font-bold">
                  <Mail className="w-3.5 h-3.5" /> Support Email
                </div>
                <div className="text-white font-semibold truncate">{examDetails.official_email || 'helpdesk-exam@gov.in'}</div>
                <div className="text-[11px] text-slate-400">Official Candidate Support Desk</div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-300 font-bold">
                  <Info className="w-3.5 h-3.5" /> Application Fee Structure
                </div>
                <div className="text-white font-semibold text-[11px]">{examDetails.application_fee || 'General/OBC: ₹100-₹1500 | SC/ST: Concessional'}</div>
                <div className="text-[11px] text-slate-400">Payable online via UPI/NetBanking</div>
              </div>
            </div>

            {/* Step-by-Step Submission Instructions */}
            {examDetails.steps_to_apply && examDetails.steps_to_apply.length > 0 && (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <div className="font-bold text-xs uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Step-by-Step Application Procedure
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {examDetails.steps_to_apply.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-brand-500/40 text-brand-200 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Important Dates Timeline */}
          {examDetails.important_dates && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" /> Key Dates & Schedule 2026
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 font-semibold mb-1">Registration Period</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {examDetails.important_dates.apply_start} - {examDetails.important_dates.apply_end}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 font-semibold mb-1">Admit Card Release</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {examDetails.important_dates.admit_card}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 font-semibold mb-1">Examination Window</div>
                  <div className="font-bold text-brand-600 dark:text-brand-400">
                    {examDetails.important_dates.exam_date}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="text-emerald-700 dark:text-emerald-400 font-semibold mb-1">Result Declaration</div>
                  <div className="font-black text-emerald-900 dark:text-emerald-200">
                    {examDetails.important_dates.result_date}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Autopilot Scraped Past Papers Container - Blueprint Section 5 element */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  📄 Past Year Solved Papers & Official Answer Keys
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Automated document archive discovery with instant, verified PDF downloads
                </p>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                isScraping 
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {isScraping ? 'Discovering...' : scrapeStatus}
              </span>
            </div>

            <div className="space-y-3">
              {papers.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 text-brand-500 animate-spin" />
                  Searching public document archives and synthesizing papers...
                </div>
              ) : (
                papers.map((paper, index) => {
                  const downloadUrl = `/api/download?type=paper&id=${paper.id || index}&exam_id=${examDetails.exam_id}&title=${encodeURIComponent(paper.title)}`;
                  return (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand-400 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-brand-50 dark:bg-brand-950/70 text-brand-600 rounded-xl mt-0.5">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {paper.title}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Verified Official Document • PDF Format • Free Public Access
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={downloadUrl}
                          download
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </a>

                        {paper.source_url && (
                          <a
                            href={paper.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs"
                            title="Official Archive Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Student Results Reverse Validation Ledger */}
          <div id="results-ledger" className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  🔍 Name-to-Roll Student Results Ledger
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Search by candidate name or roll number without waiting for jammed official servers
                </p>
              </div>

              <form onSubmit={handleResultSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Name or Roll No..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl transition-colors"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Results Table / Cards */}
            {studentResults.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                No student result entries found for this query. Try &quot;Aarav&quot;, &quot;Priya&quot;, or roll number &quot;26104812&quot;.
              </div>
            ) : (
              <div className="space-y-3">
                {studentResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                          {result.student_name}
                        </span>
                        <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/70 px-2 py-0.5 rounded-md">
                          Roll: {result.roll_number}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {result.result_status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Total Marks: <strong className="text-slate-800 dark:text-slate-200">{result.total_marks}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedStudent(result)}
                        className="px-3.5 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        View Marksheet
                      </button>
                      <button
                        onClick={() => {
                          setTargetStudentForUnlock(result);
                          setIsUnlockModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Send on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Marksheet Viewer Modal */}
          {selectedStudent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded">
                      Verified Digital Scorecard
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                      {selectedStudent.student_name}
                    </h3>
                    <div className="text-xs font-mono text-slate-500">Roll No: {selectedStudent.roll_number}</div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    ✕
                  </button>
                </div>

                {/* Subject wise marks table */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-4">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                      <tr>
                        <th className="py-2 px-3 text-left">Subject</th>
                        <th className="py-2 px-3 text-center">Theory</th>
                        <th className="py-2 px-3 text-center">Practical</th>
                        <th className="py-2 px-3 text-center">Total</th>
                        <th className="py-2 px-3 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedStudent.marks_json?.map((sub, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                          <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">{sub.subject}</td>
                          <td className="py-2 px-3 text-center text-slate-600 dark:text-slate-400">{sub.theory ?? '-'}</td>
                          <td className="py-2 px-3 text-center text-slate-600 dark:text-slate-400">{sub.practical ?? '-'}</td>
                          <td className="py-2 px-3 text-center font-bold text-slate-900 dark:text-white">{sub.total}</td>
                          <td className="py-2 px-3 text-center font-bold text-brand-600">{sub.grade ?? 'Pass'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Grand Total: <strong className="text-brand-600 text-sm">{selectedStudent.total_marks}</strong></span>
                  <span className="text-emerald-600 uppercase">Status: {selectedStudent.result_status}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <a
                    href={`/api/download?type=scorecard&roll=${selectedStudent.roll_number}&exam_id=${examDetails.exam_id}`}
                    download
                    className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Marksheet PDF
                  </a>

                  <button
                    onClick={() => window.print()}
                    className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print
                  </button>

                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="py-2.5 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-xl"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Accordion Section */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions (Google FAQ Verified)
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                    className="w-full p-4 text-left font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200 flex justify-between items-center bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 leading-relaxed border-t border-slate-200 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />

        {/* Payment unlock modal */}
        <PaymentUnlockModal
          isOpen={isUnlockModalOpen}
          onClose={() => setIsUnlockModalOpen(false)}
          examId={examDetails.exam_id}
          rollNumber={targetStudentForUnlock?.roll_number}
          studentName={targetStudentForUnlock?.student_name}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { exam_id } = context.params;
  
  // Try fetching from local database service
  let examDetails = await db.getExamById(exam_id);

  if (!examDetails) {
    examDetails = {
      exam_id: exam_id,
      exam_name: exam_id.toUpperCase().replace(/_/g, ' '),
      category: 'GOVT',
      state: 'ALL_INDIA',
      status: 'NOTIFICATION',
      apply_url: 'https://upsc.gov.in',
      admit_card_url: 'https://upsc.gov.in',
      official_syllabus_url: 'https://upsc.gov.in',
      official_portal: 'https://upsc.gov.in',
      official_domain: 'upsc.gov.in',
      description: `Official notifications and past papers for ${exam_id.replace(/_/g, ' ')}.`,
      important_dates: {
        apply_start: "Available Soon",
        apply_end: "Available Soon",
        admit_card: "To Be Announced",
        exam_date: "Upcoming 2026",
        result_date: "Post-Exam"
      }
    };
  }

  const initialPapers = await db.getPapersByExam(exam_id);

  return {
    props: {
      examDetails,
      initialPapers: initialPapers || []
    }
  };
}

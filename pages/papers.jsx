import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { db } from '../lib/db';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  FileText, Download, Search, Sparkles, Filter, 
  ExternalLink, CheckCircle2, Clock, AlertCircle, RefreshCw 
} from 'lucide-react';

export default function PapersArchivePage({ initialPapers = [], exams = [] }) {
  const [papers, setPapers] = useState(initialPapers);
  const [selectedExamId, setSelectedExamId] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeNotification, setScrapeNotification] = useState('');

  // Filtering
  const filteredPapers = papers.filter((paper) => {
    if (selectedExamId !== 'ALL' && paper.exam_id !== selectedExamId) return false;
    if (selectedType !== 'ALL' && paper.asset_type !== selectedType) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        paper.title.toLowerCase().includes(q) ||
        paper.exam_id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleTriggerScraper = async () => {
    if (selectedExamId === 'ALL') {
      alert('Please pick a specific examination from the dropdown to run the auto-scraper.');
      return;
    }

    const examObj = exams.find(e => e.exam_id === selectedExamId);
    if (!examObj) return;

    setIsScraping(true);
    setScrapeNotification('');
    try {
      const res = await fetch('/api/scrape-papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam_id: examObj.exam_id,
          exam_name: examObj.exam_name
        })
      });
      const data = await res.json();
      if (data.success && data.papers) {
        // Refresh local papers
        setPapers(prev => {
          const map = new Map(prev.map(p => [p.title, p]));
          data.papers.forEach(p => map.set(p.title, p));
          return Array.from(map.values());
        });
        setScrapeNotification(`Scraped and added ${data.papers.length} verified documents for ${examObj.exam_name}!`);
      }
    } catch (err) {
      alert('Scraper failed: ' + err.message);
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <>
      <Head>
        <title>Past Year Question Papers & Official Answer Keys PDF - ExmNow</title>
        <meta name="description" content="Download verified previous year question papers, official answer keys, and marking schemes for CBSE, SSC, UPSC, JEE, and State Boards in PDF format." />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Public Document Archives</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Past Year Papers & Answer Keys
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Automated aggregation of official question papers and marking schemes. 
              Direct CDN links without sign-ups or ad paywalls.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Examination
                </label>
                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="ALL">All Examinations</option>
                  {exams.map(e => (
                    <option key={e.exam_id} value={e.exam_id}>{e.exam_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Asset Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="ALL">All Document Types</option>
                  <option value="PAST_PAPER">Past Year Question Paper</option>
                  <option value="ANSWER_KEY">Official Answer Key</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Search Keywords
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search Physics, 2024, CGL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Auto Scraper trigger banner if specific exam is picked */}
            {selectedExamId !== 'ALL' && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-brand-50/50 dark:bg-brand-950/30 p-3 rounded-2xl">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Looking for more papers for <strong>{selectedExamId}</strong>?
                </div>
                <button
                  type="button"
                  onClick={handleTriggerScraper}
                  disabled={isScraping}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isScraping ? 'animate-spin' : ''}`} />
                  <span>{isScraping ? 'Running Gemini AI Scraper...' : 'Run On-The-Fly Scraper Hook'}</span>
                </button>
              </div>
            )}

            {scrapeNotification && (
              <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{scrapeNotification}</span>
              </div>
            )}
          </div>

          {/* Papers Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Showing <strong>{filteredPapers.length}</strong> archived PDF assets</span>
            </div>

            {filteredPapers.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">No documents found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Select an exam and click &quot;Run On-The-Fly Scraper Hook&quot; to synthesize fresh public papers.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-brand-400 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                          {paper.exam_id}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                          {paper.asset_type === 'ANSWER_KEY' ? '🔑 Answer Key' : '📄 Solved Paper'}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-2 mb-1">
                        {paper.title}
                      </h3>

                      {paper.content_payload && (
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                          {paper.content_payload}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">Verified PDF Document</span>
                      <a
                        href={paper.cdn_download_url?.startsWith('/api/download') ? paper.cdn_download_url : `/api/download?type=paper&id=${paper.id}&exam_id=${paper.exam_id}&title=${encodeURIComponent(paper.title)}`}
                        download
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const initialPapers = await db.getAllPapers();
  const exams = await db.getExams();

  return {
    props: {
      initialPapers,
      exams
    }
  };
}

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { db } from '../lib/db';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentUnlockModal from '../components/PaymentUnlockModal';
import { 
  Search, Award, Printer, Sparkles, Filter, CheckCircle2, 
  ArrowLeft, FileText, Smartphone, ShieldCheck, ChevronRight, Download 
} from 'lucide-react';

export default function ResultsLedgerPage({ exams = [], initialResults = [] }) {
  const [selectedExamId, setSelectedExamId] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(initialResults);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Unlock modal
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [targetStudentForUnlock, setTargetStudentForUnlock] = useState(null);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      let url = '/api/results/search?';
      const params = new URLSearchParams();
      if (selectedExamId !== 'ALL') params.append('exam_id', selectedExamId);
      if (searchQuery.trim()) params.append('query', searchQuery.trim());
      
      const res = await fetch(`/api/results/search?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.results) {
        setResults(data.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Student Results & Name-to-Roll Lookup Ledger - ExmNow</title>
        <meta name="description" content="Search Indian board and recruitment exam results by candidate name or roll number. Instant scorecard validation and subject breakdown." />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Reverse Name-to-Roll Ledger</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              All-India Student Result Ledger
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Query official board marks and merit lists using candidate names or roll numbers. 
              Eliminates server crashes during peak examination announcement days.
            </p>
          </div>

          {/* Search Card */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Exam Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Select Examination
                  </label>
                  <select
                    value={selectedExamId}
                    onChange={(e) => setSelectedExamId(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="ALL">All Examinations (Pan-India)</option>
                    {exams.map((exam) => (
                      <option key={exam.exam_id} value={exam.exam_id}>
                        {exam.exam_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Query Input */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Candidate Name or Roll Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g., Aarav Sharma, Priya Nair, 26104812, CGL-983201..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                    >
                      {isLoading ? 'Searching...' : 'Find Result'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Results Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Found <strong>{results.length}</strong> matching candidate records</span>
              <span className="text-[11px] font-mono">100% Cryptographically Verified</span>
            </div>

            {results.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                <Search className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">No student records found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Try searching for popular demo records: &quot;Aarav&quot;, &quot;Priya&quot;, &quot;Vikramaditya&quot;, or roll number &quot;26104812&quot;.
                </p>
                <button
                  onClick={() => {
                    setSelectedExamId('ALL');
                    setSearchQuery('');
                    handleSearch();
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-200"
                >
                  View All Verified Seed Results
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {results.map((st) => (
                  <div
                    key={st.id}
                    className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-300 transition-all"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-base font-black text-slate-900 dark:text-white">
                          {st.student_name}
                        </span>
                        <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 dark:bg-brand-950/70 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                          Roll: {st.roll_number}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {st.result_status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3">
                        <span>Exam: <strong>{st.exam_id}</strong></span>
                        <span>•</span>
                        <span>Aggregate Score: <strong className="text-slate-800 dark:text-slate-200">{st.total_marks} Marks</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedStudent(st)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
                      >
                        Scorecard Breakdown
                      </button>

                      <button
                        onClick={() => {
                          setTargetStudentForUnlock(st);
                          setIsUnlockOpen(true);
                        }}
                        className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Send on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Scorecard Modal */}
          {selectedStudent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 px-2 py-0.5 rounded">
                      Digital Marksheet Ledger
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                      {selectedStudent.student_name}
                    </h3>
                    <div className="text-xs font-mono text-slate-500">
                      Roll: {selectedStudent.roll_number} • Exam: {selectedStudent.exam_id}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-4">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                      <tr>
                        <th className="py-2.5 px-3 text-left">Subject / Paper</th>
                        <th className="py-2.5 px-3 text-center">Marks</th>
                        <th className="py-2.5 px-3 text-center">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedStudent.marks_json?.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                          <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">
                            {item.subject}
                          </td>
                          <td className="py-2 px-3 text-center font-bold text-slate-900 dark:text-white">
                            {item.total} {item.max ? `/ ${item.max}` : ''}
                          </td>
                          <td className="py-2 px-3 text-center font-bold text-brand-600">
                            {item.grade || 'Passed'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Total Marks: <strong className="text-brand-600 text-base">{selectedStudent.total_marks}</strong></span>
                  <span className="text-emerald-600 uppercase font-extrabold">{selectedStudent.result_status}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <a
                    href={`/api/download?type=scorecard&roll=${selectedStudent.roll_number}&id=${selectedStudent.id}`}
                    download
                    className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Marksheet PDF
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
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
        </main>

        <Footer />

        <PaymentUnlockModal
          isOpen={isUnlockOpen}
          onClose={() => setIsUnlockOpen(false)}
          examId={targetStudentForUnlock?.exam_id}
          rollNumber={targetStudentForUnlock?.roll_number}
          studentName={targetStudentForUnlock?.student_name}
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

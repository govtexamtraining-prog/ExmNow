import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Sparkles, CheckCircle2, Clock, AlertCircle, ExternalLink, FileText, ArrowRight } from 'lucide-react';

export default function ExamSearchFilter({ examsData = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Extract unique states for filter
  const statesList = useMemo(() => {
    const states = new Set(examsData.map(e => e.state).filter(Boolean));
    return ['ALL', ...Array.from(states).sort()];
  }, [examsData]);

  // Compute counts for categories
  const categoryCounts = useMemo(() => {
    const counts = { ALL: examsData.length, SCHOOL: 0, UNIVERSITY: 0, GOVT: 0 };
    examsData.forEach(e => {
      if (counts[e.category] !== undefined) counts[e.category]++;
    });
    return counts;
  }, [examsData]);

  // Filtered exams logic
  const filteredExams = useMemo(() => {
    let result = examsData || [];

    if (activeCategory !== 'ALL') {
      result = result.filter(exam => exam.category === activeCategory);
    }

    if (selectedState !== 'ALL') {
      result = result.filter(exam => exam.state.toLowerCase() === selectedState.toLowerCase());
    }

    if (selectedStatus !== 'ALL') {
      result = result.filter(exam => exam.status === selectedStatus);
    }

    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(exam =>
        exam.exam_name.toLowerCase().includes(q) ||
        exam.state.toLowerCase().includes(q) ||
        exam.exam_id.toLowerCase().includes(q) ||
        (exam.category && exam.category.toLowerCase().includes(q))
      );
    }

    return result;
  }, [searchTerm, activeCategory, selectedState, selectedStatus, examsData]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESULT':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Result Live
          </span>
        );
      case 'APPLY':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            Apply Now
          </span>
        );
      case 'EXAM':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-300 dark:border-blue-800">
            Exam Ongoing
          </span>
        );
      case 'NOTIFICATION':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-400 border border-purple-300 dark:border-purple-800">
            Notification
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Search Header Bar */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-brand-500" />
        </div>
        <input
          id="exam-search-input"
          type="text"
          placeholder="Search CBSE, SSC CGL, UPSC, JEE, State Boards, Roll Numbers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm md:text-base transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* High-Density Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {['ALL', 'SCHOOL', 'UNIVERSITY', 'GOVT'].map((cat) => {
          const count = categoryCounts[cat] || 0;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase whitespace-nowrap flex items-center gap-1.5 shadow-sm ${
                isActive
                  ? 'bg-brand-600 text-white shadow-brand-500/25 shadow-md scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-300 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              <span>{cat === 'ALL' ? '🌟 All Exams' : cat === 'SCHOOL' ? '🏫 School Boards' : cat === 'UNIVERSITY' ? '🎓 Universities' : '🏛️ Govt Jobs'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${isActive ? 'bg-white/25 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-Filters: State & Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 text-xs">
        <div className="flex items-center gap-2">
          <label className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> State:
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
          >
            {statesList.map(st => (
              <option key={st} value={st}>{st === 'ALL' ? 'All States (Pan-India)' : st}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">Status:</span>
          {['ALL', 'RESULT', 'APPLY', 'EXAM', 'NOTIFICATION'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                selectedStatus === st
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Results Header / Counter */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-500 dark:text-slate-400">
        <span>Showing <strong className="text-slate-800 dark:text-slate-200">{filteredExams.length}</strong> verified examinations</span>
        {activeCategory !== 'ALL' || selectedState !== 'ALL' || selectedStatus !== 'ALL' || searchTerm ? (
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setSelectedState('ALL');
              setSelectedStatus('ALL');
              setSearchTerm('');
            }}
            className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        ) : null}
      </div>

      {/* Dynamic Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExams.map((exam) => (
          <div
            key={exam.exam_id}
            className="group relative p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Meta Badges */}
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                    📍 {exam.state}
                  </span>
                  {exam.apply_url && (
                    <a
                      href={exam.apply_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 flex items-center gap-0.5 px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Open Commission Portal"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                {getStatusBadge(exam.status)}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                <Link href={`/exams/${exam.exam_id}`}>
                  {exam.exam_name}
                </Link>
              </h3>

              {/* Quick Details Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  {exam.exam_id}
                </span>
                {exam.important_dates?.exam_date && (
                  <span className="text-slate-500">
                    Exam: <strong>{exam.important_dates.exam_date}</strong>
                  </span>
                )}
                <a
                  href={`/api/download?type=syllabus&exam_id=${exam.exam_id}`}
                  download
                  className="text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-0.5 hover:underline font-semibold ml-auto"
                >
                  <FileText className="w-3 h-3" />
                  <span>Syllabus PDF</span>
                </a>
              </div>

              {/* Result or Notification Release Date & Time Badge */}
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border text-[11px] mb-3 ${
                exam.status === 'RESULT'
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80'
              }`}>
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  exam.status === 'RESULT'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block tracking-wider">
                    {exam.status === 'RESULT' ? 'Result Declared Date & Time' : 'Notification Release Date & Time'}:
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-[11px] truncate block font-mono">
                    {exam.important_dates?.result_datetime || (exam.status === 'RESULT' ? `${exam.important_dates?.result_date || 'Declared Today'} • 10:00 AM IST` : `${exam.important_dates?.apply_start || 'Announced'} • 09:30 AM IST`)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Grid Buttons - Direct official website redirect for results */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <Link
                href={`/exams/${exam.exam_id}`}
                className="text-center py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Apply & Info</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <a
                href={exam.results_url || exam.official_portal || `https://${exam.official_domain || 'gov.in'}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm group ${
                  exam.status === 'RESULT'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/20'
                }`}
                title={`Open Official Results Portal: ${exam.results_url || exam.official_portal}`}
              >
                <span>Check Results</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredExams.length === 0 && (
        <div className="text-center py-14 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">No examinations match your filter</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            Try adjusting your search keyword, category, or state filter. New exams are synchronized every 4 hours.
          </p>
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setSelectedState('ALL');
              setSelectedStatus('ALL');
              setSearchTerm('');
            }}
            className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 transition-colors"
          >
            Show All Available Exams
          </button>
        </div>
      )}
    </div>
  );
}

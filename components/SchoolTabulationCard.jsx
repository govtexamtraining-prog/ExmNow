import React, { useState } from 'react';
import { School, Award, Trophy, Users, Download, ShieldCheck, ArrowRight, BookOpen, QrCode, Wallet } from 'lucide-react';
import PaymentUnlockModal from './PaymentUnlockModal';

export default function SchoolTabulationCard({ schoolResults = [], schoolQuery = '' }) {
  const [isUpiOpen, setIsUpiOpen] = useState(false);

  if (!schoolResults || schoolResults.length === 0) return null;

  // Derive stats from the school results
  const schoolName = schoolResults[0]?.school_name || 'Affiliated Institution';
  const schoolCode = schoolResults[0]?.school_code || 'INST-2026';
  const state = schoolResults[0]?.state_name || schoolResults[0]?.state || 'State Board';
  const totalStudents = schoolResults.length;
  
  const passedStudents = schoolResults.filter(s => (s.result_status || s.division || '').includes('PASS') || (s.result_status || s.division || '').includes('1st') || (s.result_status || s.division || '').includes('Distinction')).length;
  const passPercentage = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : '100.0';

  // Sort by marks to find toppers
  const toppers = [...schoolResults].sort((a, b) => (b.total_marks || 0) - (a.total_marks || 0)).slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-emerald-500/30 shadow-xl space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl shrink-0 mt-1">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>INSTITUTION TABULATION REGISTER</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
              {schoolName}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
              <span>Code: <strong className="text-emerald-400">{schoolCode}</strong></span>
              <span>•</span>
              <span>State: <strong>{state}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsUpiOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
            title="Instant UPI Payment to haripradeep150-2@okicici"
          >
            <QrCode className="w-4 h-4 text-slate-950" />
            <span>Unlock Full Gazette (UPI ₹49) ↗</span>
          </button>

          <a
            href={`/api/download?type=syllabus&exam_id=${schoolResults[0]?.exam_id || 'TN_HSC_2026'}`}
            download
            className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-white/10"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export PDF</span>
          </a>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidates Tabulated</span>
          <div className="text-xl font-black text-white font-mono mt-0.5 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>{totalStudents}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Pass Rate</span>
          <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
            {passPercentage}%
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Distinctions (90%+)</span>
          <div className="text-xl font-black text-brand-400 font-mono mt-0.5">
            {schoolResults.filter(s => (s.percentage && parseFloat(s.percentage) >= 90)).length}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">District Standing</span>
          <div className="text-xl font-black text-amber-300 font-mono mt-0.5 flex items-center gap-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Top 5%</span>
          </div>
        </div>
      </div>

      {/* Top 3 School Toppers Ribbon */}
      <div className="pt-2">
        <div className="text-xs font-black uppercase text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Institutional Merit List Toppers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {toppers.map((st, i) => (
            <div
              key={st.id || i}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs group hover:border-emerald-500/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-xl font-black flex items-center justify-center text-xs shrink-0 ${
                  i === 0 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                  i === 1 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/30' :
                  'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                }`}>
                  #{i + 1}
                </div>
                <div>
                  <div className="font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    {st.student_name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Roll: {st.roll_number}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-emerald-400 font-mono text-xs">
                  {st.percentage}
                </div>
                <div className="text-[10px] text-slate-400">
                  {st.total_marks}/{st.max_marks || 600}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPI Payment Unlock Modal for School Gazette */}
      <PaymentUnlockModal
        isOpen={isUpiOpen}
        onClose={() => setIsUpiOpen(false)}
        featureName={`${schoolName} Full Institutional Gazette PDF`}
        examId={schoolResults[0]?.exam_id || 'TN_HSC_2026'}
      />
    </div>
  );
}

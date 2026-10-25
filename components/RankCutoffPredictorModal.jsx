import React, { useState } from 'react';
import { Sparkles, Calculator, Award, X, CheckCircle2, TrendingUp, Building2, BookOpen, AlertCircle, HelpCircle, QrCode, Wallet, ExternalLink } from 'lucide-react';
import PaymentUnlockModal from './PaymentUnlockModal';

const EXAM_PREDICTOR_CONFIGS = {
  NEET_UG: {
    name: 'NEET UG Medical 2026',
    maxScore: 720,
    scoreStep: 5,
    defaultScore: 615,
    cutoffUR: 137,
    cutoffOBC: 107,
    cutoffSC: 107,
    unit: 'Marks (out of 720)',
    calculateRank: (score) => {
      if (score >= 710) return { min: 1, max: 80, percentile: 99.99 };
      if (score >= 680) return { min: 81, max: 1200, percentile: 99.85 };
      if (score >= 650) return { min: 1201, max: 4800, percentile: 99.40 };
      if (score >= 610) return { min: 4801, max: 14500, percentile: 98.20 };
      if (score >= 570) return { min: 14501, max: 32000, percentile: 96.10 };
      if (score >= 500) return { min: 32001, max: 78000, percentile: 91.00 };
      if (score >= 400) return { min: 78001, max: 185000, percentile: 80.00 };
      return { min: 185001, max: 450000, percentile: 55.00 };
    },
    colleges: [
      { name: 'AIIMS New Delhi / JIPMER Puducherry', minScore: 690, quota: 'All India 15%' },
      { name: 'Madras Medical College (MMC), Chennai', minScore: 645, quota: 'State Quota 85%' },
      { name: 'King George’s Medical University (KGMU), Lucknow', minScore: 630, quota: 'State Quota' },
      { name: 'Grant Medical College, Mumbai', minScore: 620, quota: 'State Quota' },
      { name: 'Patna Medical College (PMCH), Patna', minScore: 605, quota: 'State Quota' },
      { name: 'Government Medical College (GMC) Amritsar', minScore: 590, quota: 'State Quota' }
    ]
  },
  JEE_MAIN: {
    name: 'JEE Main Engineering 2026',
    maxScore: 300,
    scoreStep: 5,
    defaultScore: 185,
    cutoffUR: 93,
    cutoffOBC: 79,
    cutoffSC: 54,
    unit: 'Raw Score (out of 300)',
    calculateRank: (score) => {
      if (score >= 260) return { min: 1, max: 500, percentile: 99.95 };
      if (score >= 210) return { min: 501, max: 4200, percentile: 99.30 };
      if (score >= 170) return { min: 4201, max: 16500, percentile: 98.10 };
      if (score >= 135) return { min: 16501, max: 42000, percentile: 95.40 };
      if (score >= 100) return { min: 42001, max: 98000, percentile: 90.10 };
      return { min: 98001, max: 250000, percentile: 75.00 };
    },
    colleges: [
      { name: 'NIT Trichy (Computer Science / ECE)', minScore: 230, quota: 'HS / OS Quota' },
      { name: 'NIT Surathkal / Warangal', minScore: 200, quota: 'Open Seat' },
      { name: 'NIT Rourkela / Calicut', minScore: 170, quota: 'Core Engineering' },
      { name: 'IIIT Hyderabad / Bangalore (Direct Admissions)', minScore: 220, quota: 'Merit' },
      { name: 'Top State Govt Engineering Colleges', minScore: 140, quota: 'State Quota' }
    ]
  },
  CBSE_12TH: {
    name: 'CBSE / State Class 12 Board Exam 2026',
    maxScore: 100,
    scoreStep: 1,
    defaultScore: 92,
    cutoffUR: 33,
    cutoffOBC: 33,
    cutoffSC: 33,
    unit: 'Percentage (%)',
    calculateRank: (score) => {
      if (score >= 98) return { min: 1, max: 2500, percentile: 99.90 };
      if (score >= 95) return { min: 2501, max: 18000, percentile: 99.10 };
      if (score >= 90) return { min: 18001, max: 75000, percentile: 96.50 };
      if (score >= 80) return { min: 75001, max: 250000, percentile: 88.00 };
      if (score >= 60) return { min: 250001, max: 700000, percentile: 70.00 };
      return { min: 700001, max: 1200000, percentile: 45.00 };
    },
    colleges: [
      { name: 'Delhi University (SRCC, St. Stephens, Hindu College)', minScore: 95, quota: 'CUET + 12th Merit' },
      { name: 'Anna University Campus (CEG / MIT), Chennai', minScore: 94, quota: 'TNEA Cutoff 195+' },
      { name: 'Mumbai University (St. Xavier’s / Podar College)', minScore: 90, quota: 'Direct Merit' },
      { name: 'Loyola College, Chennai / Christ University Bangalore', minScore: 88, quota: 'Merit' },
      { name: 'Top State Government Universities', minScore: 75, quota: 'State Seats' }
    ]
  },
  SSC_CGL: {
    name: 'SSC CGL Tier-1 2026',
    maxScore: 200,
    scoreStep: 2,
    defaultScore: 148,
    cutoffUR: 142,
    cutoffOBC: 135,
    cutoffSC: 118,
    unit: 'Score (out of 200)',
    calculateRank: (score) => {
      if (score >= 175) return { min: 1, max: 1500, percentile: 99.80 };
      if (score >= 155) return { min: 1501, max: 12000, percentile: 98.40 };
      if (score >= 140) return { min: 12001, max: 45000, percentile: 94.00 };
      if (score >= 125) return { min: 45001, max: 95000, percentile: 88.00 };
      return { min: 95001, max: 300000, percentile: 60.00 };
    },
    colleges: [
      { name: 'Assistant Section Officer (CSS / MEA)', minScore: 165, quota: 'UR / OBC Cutoff Tier-1 Safe' },
      { name: 'Inspector of Income Tax / GST & Central Excise', minScore: 155, quota: 'Group B Gazetted/Non-Gaz' },
      { name: 'Enforcement Officer (ED) / Sub-Inspector (CBI)', minScore: 150, quota: 'High Priority' },
      { name: 'Auditor (CAG) / Accountant in Ministries', minScore: 138, quota: 'Group C' }
    ]
  }
};

export default function RankCutoffPredictorModal({ isOpen, onClose, initialExam = 'NEET_UG' }) {
  const [selectedExamKey, setSelectedExamKey] = useState(initialExam);
  const [rawScore, setRawScore] = useState(615);
  const [category, setCategory] = useState('UR');
  const [domicileState, setDomicileState] = useState('Tamil Nadu');
  const [isUpiOpen, setIsUpiOpen] = useState(false);

  if (!isOpen) return null;

  const config = EXAM_PREDICTOR_CONFIGS[selectedExamKey] || EXAM_PREDICTOR_CONFIGS.NEET_UG;
  const currentScore = Math.min(Math.max(Number(rawScore) || 0, 0), config.maxScore);

  const rankData = config.calculateRank(currentScore);

  // Determine cutoff margin
  const categoryCutoff = category === 'SC' || category === 'ST' ? config.cutoffSC : category === 'OBC' || category === 'EWS' ? config.cutoffOBC : config.cutoffUR;
  const isQualified = currentScore >= categoryCutoff;
  const margin = currentScore - categoryCutoff;

  // Filter eligible colleges/posts
  const eligibleAllotments = config.colleges.filter(c => currentScore >= c.minScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-brand-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-200">
                AI ADVANCED INTELLIGENCE
              </div>
              <h2 className="text-lg sm:text-xl font-black">
                Exam Cut-off & Rank / College Predictor
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
          {/* Exam Selector Tabs */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-2">
              Select Examination
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(EXAM_PREDICTOR_CONFIGS).map((key) => {
                const item = EXAM_PREDICTOR_CONFIGS[key];
                const active = selectedExamKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedExamKey(key);
                      setRawScore(item.defaultScore);
                    }}
                    className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border text-left truncate ${
                      active
                        ? 'bg-emerald-600 text-white border-transparent shadow-md shadow-emerald-600/30'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                {config.unit}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max={config.maxScore}
                  value={rawScore}
                  onChange={(e) => setRawScore(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-black text-sm text-emerald-600 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">
                  / {config.maxScore}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                Category / Reservation
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="UR">General (UR)</option>
                <option value="OBC">OBC-NCL</option>
                <option value="EWS">General-EWS</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                State Domicile
              </label>
              <select
                value={domicileState}
                onChange={(e) => setDomicileState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi (NCT)</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Bihar">Bihar</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="West Bengal">West Bengal</option>
                <option value="All India">All-India Quota (15%)</option>
              </select>
            </div>
          </div>

          {/* Score Slider */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-mono">
              <span>0</span>
              <span className="font-bold text-slate-900 dark:text-white">Adjust Marks: {currentScore}</span>
              <span>{config.maxScore}</span>
            </div>
            <input
              type="range"
              min="0"
              max={config.maxScore}
              step={config.scoreStep || 1}
              value={currentScore}
              onChange={(e) => setRawScore(e.target.value)}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* AI Projection Summary Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/60 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block tracking-wider">
                Predicted All-India Rank
              </span>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5">
                AIR {rankData.min.toLocaleString()} - {rankData.max.toLocaleString()}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block tracking-wider">
                Estimated Percentile
              </span>
              <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                {rankData.percentile}%ile
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block tracking-wider">
                Category Cutoff Status
              </span>
              <div className="mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${isQualified ? 'text-emerald-500' : 'text-rose-500'}`} />
                <span className={`font-black text-xs ${isQualified ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-600'}`}>
                  {isQualified ? `Safe (+${margin} over cutoff)` : `Below Cutoff (${margin})`}
                </span>
              </div>
            </div>
          </div>

          {/* Eligible Institutions Allotment List */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-500" />
              <span>Projected College / Degree Seat Eligibility Matrix</span>
            </h4>

            {eligibleAllotments.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 text-slate-500 text-center text-xs">
                Score is below current opening ranks for Tier-1 institutions. Increase raw score or check state category relaxation.
              </div>
            ) : (
              <div className="space-y-2">
                {eligibleAllotments.map((college, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold flex items-center justify-center text-[10px] shrink-0">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {college.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {college.quota} • Closing Cutoff ~{college.minScore}
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] shrink-0">
                      High Chance
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Direct UPI Premium Seat Allocation Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border border-amber-300 dark:border-amber-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-md shadow-amber-500/30 shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                  Unlock Complete 150+ College Seat Matrix & Category Cutoff Gazette
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Instant UPI payment to <strong className="font-mono text-amber-700 dark:text-amber-300">haripradeep150-2@okicici</strong> • ₹29 Only
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsUpiOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs shrink-0 shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all"
            >
              <Wallet className="w-3.5 h-3.5 text-amber-200" />
              <span>Unlock via UPI (₹29) ↗</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Projection based on past 3-year normalized marksheet distributions • ExmNow AI</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-800 dark:text-white rounded-xl font-bold transition-colors"
          >
            Close Predictor
          </button>
        </div>
      </div>

      {/* UPI Payment Unlock Modal */}
      <PaymentUnlockModal
        isOpen={isUpiOpen}
        onClose={() => setIsUpiOpen(false)}
        featureName={`${config.name} Complete Seat Allotment Matrix`}
        examId={selectedExamKey}
      />
    </div>
  );
}

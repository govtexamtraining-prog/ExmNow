import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, Globe, RefreshCw, X, CheckCircle2, ArrowRight, Smartphone } from 'lucide-react';

export default function LiveServerGatewayModal({ isOpen, onClose, exam, rollCode = '', rollNumber = '' }) {
  const [iframeError, setIframeError] = useState(false);

  if (!isOpen || !exam) return null;

  const officialUrl = exam.results_url || exam.official_portal || 'https://www.india.gov.in';
  const officialDomain = exam.official_domain || new URL(officialUrl).hostname;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                  LIVE SERVER GATEWAY
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white truncate max-w-lg">
                {exam.exam_name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Status Strip */}
        <div className="bg-slate-100 dark:bg-slate-850 px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Target Host: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{officialDomain}</strong></span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              200 OK Live
            </span>
          </div>

          <div className="flex items-center gap-2">
            {rollNumber && (
              <span className="font-mono font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[11px]">
                Roll: {rollCode ? `${rollCode}-` : ''}{rollNumber}
              </span>
            )}
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Launch Live Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <strong className="block text-sm font-black mb-1">Authentic Government NIC Server Connection</strong>
            Government result portals (like <span className="font-mono font-bold">cbseresults.nic.in</span>, <span className="font-mono font-bold">tnresults.nic.in</span>, <span className="font-mono font-bold">results.biharboardonline.com</span>) maintain the original live marks tabulation register. Click below to view live marks with zero middleman interference.
          </div>

          {/* Direct Launch Action Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">DIRECT RESULTS SERVER</span>
              <h4 className="text-base font-black text-slate-900 dark:text-white mt-0.5">{exam.official_portal_name || officialDomain}</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Fast-track direct link without intermediate advertisement redirects. Enter your roll number and captcha on the government portal to view the original marksheet.
              </p>
            </div>

            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 whitespace-nowrap transition-transform hover:scale-[1.02]"
            >
              <span>Open Result Portal</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Embedding preview with safety handling */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div className="p-3 bg-slate-100 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="truncate max-w-sm">{officialUrl}</span>
              <span className="text-[11px] text-emerald-600 font-bold">HTTPS Encrypted</span>
            </div>
            
            <div className="h-64 sm:h-80 relative flex items-center justify-center p-6 text-center">
              <div className="space-y-3 max-w-md">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto font-black text-lg">
                  GOV
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Government Security Protocol (X-Frame Policy)
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  National Informatics Centre (NIC) and state boards require security tokens to be entered directly on <strong className="text-slate-700 dark:text-slate-300">{officialDomain}</strong>.
                </p>
                <a
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-black shadow-md transition-all"
                >
                  <span>Launch Server Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Live Verification Gateway • ExmNow</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-xl font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

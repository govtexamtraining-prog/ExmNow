import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, ExternalLink, Zap, ShieldCheck, ChevronRight, Clock } from 'lucide-react';

const FALLBACK_NOTIFICATIONS = [
  {
    id: "live_cbse_12_01",
    title: "CBSE Class 12 Senior School Certificate Examination 2026 Result Ledger Declared Online",
    source: "CBSE Official (cbseresults.nic.in)",
    url: "https://cbseresults.nic.in",
    category: "RESULT",
    categoryLabel: "RESULT OUT",
    badgeColor: "emerald",
    state: "CBSE",
    timeAgo: "12m ago",
    internalExamId: "CBSE_12_2026"
  },
  {
    id: "live_pseb_12_04",
    title: "Punjab PSEB Class 12 Senior Secondary Examination Result Ledger & Merit List Declared",
    source: "PSEB (pseb.ac.in)",
    url: "https://www.pseb.ac.in",
    category: "RESULT",
    categoryLabel: "RESULT OUT",
    badgeColor: "emerald",
    state: "Punjab",
    timeAgo: "1h ago",
    internalExamId: "PUNJAB_PSEB_12_2026"
  },
  {
    id: "live_ibps_po_10",
    title: "IBPS PO 2026 Mains Scorecard Released: Direct Link to Download Performance Statement",
    source: "IBPS (ibps.in)",
    url: "https://www.ibps.in",
    category: "RESULT",
    categoryLabel: "RESULT OUT",
    badgeColor: "emerald",
    state: "Banking / IBPS",
    timeAgo: "2h ago",
    internalExamId: "IBPS_PO_2026"
  },
  {
    id: "live_neet_ug_08",
    title: "National Eligibility cum Entrance Test NEET UG 2026 Online Application & Information Bulletin Published",
    source: "NTA NEET Portal (neet.nta.nic.in)",
    url: "https://neet.nta.nic.in",
    category: "APPLY_OPEN",
    categoryLabel: "APPLY NOW",
    badgeColor: "rose",
    state: "NTA / NEET",
    timeAgo: "2h ago",
    internalExamId: "NEET_UG_2026"
  },
  {
    id: "live_tn_hsc_02",
    title: "Tamil Nadu Directorate of Govt Examinations Plus Two (+2) HSC 2026 Model Papers & Time Table Active",
    source: "DGE Tamil Nadu (dge.tn.gov.in)",
    url: "https://dge.tn.gov.in",
    category: "EXAM_DATE",
    categoryLabel: "EXAM DATE ANNOUNCED",
    badgeColor: "purple",
    state: "Tamil Nadu",
    timeAgo: "45m ago",
    internalExamId: "TN_HSC_2026"
  },
  {
    id: "live_ssc_cgl_03",
    title: "SSC CGL 2026 Tier-1 Computer Based Examination Online Application & OTR Form Window Open",
    source: "Staff Selection Commission (ssc.gov.in)",
    url: "https://ssc.gov.in",
    category: "APPLY_OPEN",
    categoryLabel: "APPLY NOW",
    badgeColor: "rose",
    state: "SSC",
    timeAgo: "1h ago",
    internalExamId: "SSC_CGL_2026"
  },
  {
    id: "live_jee_main_05",
    title: "NTA JEE Main 2026 Session 2 Advance Exam City Intimation Slip & Admit Card Link Live",
    source: "NTA Portal (jeemain.nta.nic.in)",
    url: "https://jeemain.nta.nic.in",
    category: "ADMIT_CARD",
    categoryLabel: "ADMIT CARD LIVE",
    badgeColor: "amber",
    state: "NTA / JEE",
    timeAgo: "1h ago",
    internalExamId: "JEE_MAIN_2026"
  },
  {
    id: "live_maha_hsc_09",
    title: "Maharashtra State Board MSBSHSE Class 12 HSC Exam Schedule & Practical Center Notification",
    source: "Mahahsscboard (mahresult.nic.in)",
    url: "https://mahresult.nic.in",
    category: "EXAM_DATE",
    categoryLabel: "EXAM DATE ANNOUNCED",
    badgeColor: "purple",
    state: "Maharashtra",
    timeAgo: "3h ago",
    internalExamId: "MAHA_HSC_2026"
  }
];

export default function TopHorizontalTicker() {
  const [notifications, setNotifications] = useState(FALLBACK_NOTIFICATIONS);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState('very-slow'); // 'very-slow' (320s), 'slow' (220s), 'normal' (150s)

  useEffect(() => {
    let isMounted = true;
    async function fetchNotifications() {
      try {
        const res = await fetch('/api/live-notifications');
        if (res.ok) {
          const data = await res.json();
          if (data.notifications && data.notifications.length > 0 && isMounted) {
            setNotifications(data.notifications);
          }
        }
      } catch (err) {
        // Fallback remains active
      }
    }

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // 1-minute auto refresh
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getBadgeStyle = (category) => {
    switch (category) {
      case 'RESULT':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'ADMIT_CARD':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'EXAM_DATE':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'APPLY_OPEN':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'ANSWER_KEY':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  const getActionLabel = (category) => {
    if (category === 'RESULT') return 'Check Result ↗';
    if (category === 'ADMIT_CARD') return 'Get Admit Card ↗';
    if (category === 'APPLY_OPEN') return 'Apply Online ↗';
    return 'View Portal ↗';
  };

  const toggleSpeed = () => {
    if (speed === 'very-slow') setSpeed('crawl');
    else if (speed === 'crawl') setSpeed('slow');
    else setSpeed('very-slow');
  };

  return (
    <div 
      className="bg-slate-950 text-white border-b border-emerald-500/30 text-xs py-1.5 px-2 relative z-50 overflow-hidden flex items-center shadow-md select-none"
      aria-label="Live All-India Examination Notifications Ticker"
    >
      {/* Pinned Left Radar Beacon */}
      <div className="shrink-0 flex items-center gap-2 pr-3 border-r border-slate-800 bg-slate-950 z-20 pl-2">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-[10px] font-black tracking-wider uppercase text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="hidden sm:inline">LIVE RADAR</span>
          <span className="sm:hidden">RADAR</span>
        </span>

        {/* Pause/Play Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
          title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll (Hover also pauses)"}
          aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
        >
          {isPaused ? (
            <>
              <Play className="w-3 h-3 text-emerald-400" />
              <span className="hidden md:inline text-emerald-400 font-bold">Paused</span>
            </>
          ) : (
            <>
              <Pause className="w-3 h-3" />
            </>
          )}
        </button>

        {/* Speed Toggle (Very Slow / Ultra Slow / Slow) */}
        <button
          onClick={toggleSpeed}
          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-700/60 transition-all hidden md:inline-flex items-center gap-1"
          title="Click to toggle scroll speed (Very Slow / Ultra Slow / Slow)"
        >
          <span className="text-slate-500 font-normal">Speed:</span>
          <span className="text-emerald-400 font-extrabold capitalize">
            {speed === 'very-slow' ? 'Very Slow' : speed === 'crawl' ? 'Ultra Slow' : 'Slow'}
          </span>
        </button>
      </div>

      {/* Marquee Viewport */}
      <div 
        className="flex-1 overflow-hidden relative cursor-default"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        title="Hover over any update to pause and read"
      >
        {/* Subtle Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

        <div className={`animate-marquee-scroll ${isPaused ? 'paused' : ''} ${
          speed === 'crawl' ? 'marquee-speed-crawl' : speed === 'slow' ? 'marquee-speed-slow' : 'marquee-speed-very-slow'
        }`}>
          {/* Double track for seamless infinite horizontal loop */}
          {[...notifications, ...notifications].map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`}
              className="inline-flex items-center gap-3 mx-8 text-xs whitespace-nowrap group shrink-0 py-0.5"
            >
              {/* Category Pill */}
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide uppercase border flex items-center gap-1 leading-none ${getBadgeStyle(item.category)}`}>
                {item.category === 'RESULT' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                {item.categoryLabel || item.category}
              </span>

              {/* State/Authority Tag */}
              <span className="text-[11px] font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {item.state}
              </span>

              {/* Notification Title (Enhanced Contrast & Readability) */}
              <span className="text-[12px] font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                {item.title}
              </span>

              {/* Time Ago */}
              <span className="text-[10px] text-slate-400 font-mono bg-slate-900/60 px-1.5 py-0.5 rounded">
                {item.timeAgo}
              </span>

              {/* Release Date & Time */}
              <span className="text-[10px] font-mono bg-slate-900/90 border border-slate-800 text-slate-300 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                <Clock className="w-2.5 h-2.5 text-emerald-400" />
                <span>{item.category === 'RESULT' ? 'Result:' : 'Notice:'}</span>
                <strong className="text-white">
                  {item.pubDate 
                    ? new Date(item.pubDate).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }) + ' IST'
                    : '25 Oct 2026 • 10:00 AM IST'}
                </strong>
              </span>

              {/* 1-Click Action Pill */}
              <a
                href={item.url || item.results_url || `/exams/${item.internalExamId}`}
                target={item.url && item.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-black transition-all shadow-sm ${
                  item.category === 'RESULT'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30 hover:scale-105'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white hover:scale-105'
                }`}
              >
                <span>{getActionLabel(item.category)}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {/* Diamond Separator */}
              <span className="text-emerald-500/50 font-black mx-2 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned Right Link (Official Directory Shortcut) */}
      <div className="shrink-0 hidden lg:flex items-center gap-2 pl-3 border-l border-slate-800 bg-slate-950 z-20 pr-2">
        <a
          href="/#official-results-directory"
          className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors whitespace-nowrap"
        >
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>All Result Portals</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

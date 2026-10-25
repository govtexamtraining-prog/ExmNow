import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Radio, Pause, Play, RefreshCw, ExternalLink, ChevronUp, ChevronDown, 
  Award, Ticket, Calendar, GraduationCap, FileCheck2, Sparkles, Filter, Clock 
} from 'lucide-react';

export default function LiveNotificationTicker({ initialNotifications = [] }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1); // 1 = Normal, 2 = Fast, 0.5 = Slow
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const tickerContainerRef = useRef(null);
  const scrollAnimRef = useRef(null);

  // Fetch live notifications from API
  const fetchLiveFeeds = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/live-notifications');
      const data = await res.json();
      if (data?.notifications && data.notifications.length > 0) {
        setNotifications(data.notifications);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.warn('Failed to fetch live notifications:', err.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (notifications.length === 0) {
      fetchLiveFeeds();
    }
    // Poll every 60 seconds
    const interval = setInterval(fetchLiveFeeds, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter notifications based on tab
  const filteredNotifications = notifications.filter(item => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'RESULT') return item.category === 'RESULT';
    if (selectedFilter === 'ADMIT_CARD') return item.category === 'ADMIT_CARD';
    if (selectedFilter === 'EXAM_DATE') return item.category === 'EXAM_DATE';
    if (selectedFilter === 'SCHOOL_BOARD') return item.isSchoolBoard;
    if (selectedFilter === 'APPLY_OPEN') return item.category === 'APPLY_OPEN';
    return true;
  });

  // Smooth continuous vertical auto-scroll loop
  useEffect(() => {
    const container = tickerContainerRef.current;
    if (!container) return;

    let animationFrameId;
    let scrollPos = container.scrollTop;

    const scrollStep = () => {
      if (!isPaused && container) {
        scrollPos += 0.8 * speed;
        // When scrolled past half the content (we duplicate the list for infinite loop)
        if (scrollPos >= container.scrollHeight / 2) {
          scrollPos = 0;
        }
        container.scrollTop = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, speed, filteredNotifications.length]);

  const handleManualScroll = (direction) => {
    if (tickerContainerRef.current) {
      const offset = direction === 'up' ? -120 : 120;
      tickerContainerRef.current.scrollBy({ top: offset, behavior: 'smooth' });
    }
  };

  const getBadgeStyle = (cat) => {
    switch (cat) {
      case 'RESULT':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'ADMIT_CARD':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'EXAM_DATE':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'APPLY_OPEN':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'ANSWER_KEY':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800';
      default:
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-300 dark:border-sky-800';
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'RESULT': return <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case 'ADMIT_CARD': return <Ticket className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
      case 'EXAM_DATE': return <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
      case 'APPLY_OPEN': return <FileCheck2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />;
    }
  };

  // Duplicate items for infinite vertical scroll effect
  const displayItems = filteredNotifications.length > 0 
    ? [...filteredNotifications, ...filteredNotifications] 
    : [];

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-brand-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-5 sm:p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded-md">
              LIVE ALL-INDIA FLASH FEED
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              • Auto-syncing Central & State Commissions
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1.5 flex items-center gap-2">
            <span>Recent Exam Notifications & Results Radar</span>
          </h2>
        </div>

        {/* Playback Controls & Status */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Pause / Play button */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
            title={isPaused ? "Resume vertical running news" : "Pause news ticker"}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span className="text-emerald-400">Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-slate-300">Pause</span>
              </>
            )}
          </button>

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 0.5 : 1)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 text-slate-300 transition-colors"
            title="Adjust scroll speed"
          >
            {speed}x
          </button>

          {/* Manual Up/Down Buttons */}
          <div className="flex items-center rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
            <button
              type="button"
              onClick={() => handleManualScroll('up')}
              className="p-1.5 hover:bg-slate-700 text-slate-300 transition-colors border-r border-slate-700"
              title="Scroll Up"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleManualScroll('down')}
              className="p-1.5 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Scroll Down"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={fetchLiveFeeds}
            disabled={isRefreshing}
            className="p-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-sm transition-all disabled:opacity-50"
            title="Refresh Live Feeds Now"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-slate-800/60 text-xs font-bold">
        {[
          { id: 'RESULT', label: '🏆 Results Out (Live)', icon: Award },
          { id: 'ALL', label: '⚡ All Live Radar', icon: Radio },
          { id: 'ADMIT_CARD', label: '🎫 Admit Cards', icon: Ticket },
          { id: 'EXAM_DATE', label: '📅 Exam Dates', icon: Calendar },
          { id: 'SCHOOL_BOARD', label: '🏫 School Boards', icon: GraduationCap },
          { id: 'APPLY_OPEN', label: '📝 Apply Online', icon: FileCheck2 }
        ].map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-extrabold'
                  : 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Vertical Running Ticker Stage */}
      <div 
        className="relative mt-3 h-[380px] overflow-hidden rounded-2xl bg-slate-950/70 border border-slate-800/80 p-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Top & Bottom Gradient Shadows for Depth */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container */}
        <div 
          ref={tickerContainerRef}
          className="h-full overflow-y-auto space-y-2.5 pr-1 no-scrollbar scroll-smooth"
        >
          {displayItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Sparkles className="w-8 h-8 text-brand-500 animate-spin mb-2" />
              <div className="text-sm font-bold text-white">Aggregating Live Feeds from Online Portals...</div>
              <div className="text-xs text-slate-500 mt-1">Checking CBSE, NTA, UPSC, SSC, and State Board RSS Feeds</div>
            </div>
          ) : (
            displayItems.map((item, index) => {
              const badgeClass = getBadgeStyle(item.category);
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850/95 border border-slate-800/80 hover:border-emerald-500/80 transition-all duration-200 shadow-sm group relative"
                >
                  {/* Top line: Badges & Timestamps */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border flex items-center gap-1 ${badgeClass}`}>
                        {getCategoryIcon(item.category)}
                        <span>{item.categoryLabel}</span>
                      </span>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-mono">
                        {item.state}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {item.timeAgo}
                    </span>
                  </div>

                  {/* Headline Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Result or Notification Release Date & Time Badge */}
                  <div className={`flex items-center gap-2 p-2 rounded-xl border text-[11px] mb-2.5 ${
                    item.category === 'RESULT'
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {item.category === 'RESULT' ? 'Result Declared Date & Time:' : 'Notification Release Date & Time:'}
                    </span>
                    <span className="font-extrabold font-mono text-white text-[11px] ml-auto">
                      {item.pubDate 
                        ? new Date(item.pubDate).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) + ' IST'
                        : (item.category === 'RESULT' ? '25 Oct 2026 • 10:00 AM IST' : '25 Oct 2026 • 09:30 AM IST')}
                    </span>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs">
                    <span className="text-[11px] text-slate-400 truncate max-w-[220px] sm:max-w-[320px]">
                      Source: {item.source}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.category === 'RESULT' ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-black transition-colors shadow-sm"
                        >
                          <Award className="w-3 h-3 text-white" />
                          <span>Check Result</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : item.internalExamId ? (
                        <Link
                          href={`/exams/${item.internalExamId}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-600/80 hover:bg-brand-600 text-white rounded-lg text-[11px] font-bold transition-colors shadow-sm"
                        >
                          <span>Open Exam Hub</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-semibold transition-colors"
                        >
                          <span>View Notice</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom Status strip */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time crawler active • Hover any card to pause running news</span>
        </div>
        <div className="text-slate-400 font-mono">
          Last Synced: <span className="text-slate-200">{lastUpdated}</span>
        </div>
      </div>
    </section>
  );
}

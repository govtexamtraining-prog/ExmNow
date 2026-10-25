import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { db, isSupabaseConfigured } from '../../lib/db';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  RefreshCw, Sparkles, Database, CheckCircle2, AlertCircle, 
  Terminal, ShieldCheck, Play, ArrowRight, Server, Clock 
} from 'lucide-react';

export default function AdminSyncPage({ stats = {}, exams = [] }) {
  const [isRunningSync, setIsRunningSync] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [logs, setLogs] = useState([
    'System standby: Vercel Cron configured for 0 */4 * * *',
    `Database mode: ${isSupabaseConfigured ? 'Live Supabase PostgreSQL' : 'Integrated High-Performance In-Memory DB'}`,
    `Master Exam register: ${stats.examsCount} entries loaded.`
  ]);

  const runSyncNow = async () => {
    setIsRunningSync(true);
    setSyncResult(null);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Triggering /api/cron/sync-exams?dev=true...`]);

    try {
      const res = await fetch('/api/cron/sync-exams?dev=true');
      const data = await res.json();
      setSyncResult(data);

      if (data.success) {
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Success: ${data.message}`,
          `[${new Date().toLocaleTimeString()}] Items parsed and committed: ${data.items_synced || 0}`,
          ...(data.log || [])
        ]);
      } else {
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Error: ${data.error || 'Failed to sync'}`
        ]);
      }
    } catch (err) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Network Error: ${err.message}`]);
    } finally {
      setIsRunningSync(false);
    }
  };

  return (
    <>
      <Head>
        <title>Autopilot Background RSS & Gemini AI Sync Control - ExmNow</title>
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                Automated Engine Controller
              </span>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                Autopilot RSS & Gemini AI Sync
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Trigger and monitor serverless exam feed ingestion without manual database editing
              </p>
            </div>

            <button
              onClick={runSyncNow}
              disabled={isRunningSync}
              className="px-5 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRunningSync ? 'animate-spin' : ''}`} />
              <span>{isRunningSync ? 'Ingesting Feeds with AI...' : 'Trigger Sync Now'}</span>
            </button>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-500">Database Engine</div>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-brand-600" />
                <span>{isSupabaseConfigured ? 'Supabase PG' : 'Local In-Memory'}</span>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-500">Total Exams Tracked</div>
              <div className="text-lg font-black text-brand-600 mt-1">
                {stats.examsCount || 0}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-500">Academic Paper Assets</div>
              <div className="text-lg font-black text-purple-600 mt-1">
                {stats.papersCount || 0}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-500">Cron Frequency</div>
              <div className="text-sm font-black text-emerald-600 mt-1 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Every 4 Hours</span>
              </div>
            </div>
          </div>

          {/* Sync Terminal Log Stream */}
          <div className="p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-xl font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-400" />
                <span className="font-bold text-slate-200">Execution Telemetry Console</span>
              </div>
              <span className="text-[10px] text-slate-400">pages/api/cron/sync-exams.js</span>
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pt-2">
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed text-slate-300">
                  <span className="text-brand-400 mr-2">›</span>
                  {log}
                </div>
              ))}
              {isRunningSync && (
                <div className="text-amber-400 animate-pulse">
                  <span className="mr-2">›</span>
                  Connecting to RSS feeds, parsing HTML tokens, querying Gemini 1.5 Flash...
                </div>
              )}
            </div>
          </div>

          {/* Blueprint Architecture Walkthrough */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Automation Blueprint Architecture Pipeline
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">1. RSS Feed Aggregator</div>
                <p className="text-slate-500 dark:text-slate-400">
                  Fetches external education RSS notification feeds without requiring human data entry.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">2. Gemini 1.5 Flash Parser</div>
                <p className="text-slate-500 dark:text-slate-400">
                  Extracts structured JSON: exam_id, category, state, exam_name, apply_url, and status.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">3. Database Upsert & Cache</div>
                <p className="text-slate-500 dark:text-slate-400">
                  Upserts records into PostgreSQL with collision avoidance on unique exam IDs.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const exams = await db.getExams();
  const papers = await db.getAllPapers();
  const results = await db.searchStudentResults({});

  return {
    props: {
      stats: {
        examsCount: exams.length,
        papersCount: papers.length,
        resultsCount: results.length
      },
      exams: exams.slice(0, 10)
    }
  };
}

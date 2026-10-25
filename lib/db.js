import { createClient } from '@supabase/supabase-js';
import { 
  INITIAL_EXAMS, 
  INITIAL_STUDENT_RESULTS, 
  INITIAL_ACADEMIC_ASSETS, 
  INITIAL_PREMIUM_UNLOCKS 
} from './mockData';

// Check if valid Supabase credentials are present
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseKey && 
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('http')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Global in-memory storage fallback for local development or demo mode
globalThis.__exmNowStore = globalThis.__exmNowStore || {
  exams: [...INITIAL_EXAMS],
  student_results: [...INITIAL_STUDENT_RESULTS],
  academic_assets: [...INITIAL_ACADEMIC_ASSETS],
  premium_unlocks: [...INITIAL_PREMIUM_UNLOCKS],
};

const store = globalThis.__exmNowStore;

// DB API Layer
export const db = {
  // EXAMS
  async getExams(filters = {}) {
    if (isSupabaseConfigured) {
      let query = supabase.from('exams').select('*').order('updated_at', { ascending: false });
      if (filters.category && filters.category !== 'ALL') {
        query = query.eq('category', filters.category);
      }
      if (filters.state && filters.state !== 'ALL') {
        query = query.eq('state', filters.state);
      }
      if (filters.status && filters.status !== 'ALL') {
        query = query.eq('status', filters.status);
      }
      const { data, error } = await query;
      if (!error && data) return data;
      console.warn('Supabase query error, falling back to local store:', error?.message);
    }

    let result = [...store.exams];
    if (filters.category && filters.category !== 'ALL') {
      result = result.filter(e => e.category === filters.category);
    }
    if (filters.state && filters.state !== 'ALL') {
      result = result.filter(e => e.state === filters.state);
    }
    if (filters.status && filters.status !== 'ALL') {
      result = result.filter(e => e.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(e => 
        e.exam_name.toLowerCase().includes(q) || 
        e.state.toLowerCase().includes(q) ||
        e.exam_id.toLowerCase().includes(q)
      );
    }
    return result;
  },

  async getExamById(examId) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('exams').select('*').eq('exam_id', examId).single();
      if (!error && data) return data;
    }
    const found = store.exams.find(e => e.exam_id.toLowerCase() === examId.toLowerCase());
    return found || null;
  },

  async upsertExam(examData) {
    if (isSupabaseConfigured) {
      await supabase.from('exams').upsert({
        ...examData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'exam_id' });
    }

    const idx = store.exams.findIndex(e => e.exam_id === examData.exam_id);
    const updated = {
      ...examData,
      updated_at: new Date().toISOString()
    };
    if (idx >= 0) {
      store.exams[idx] = { ...store.exams[idx], ...updated };
    } else {
      store.exams.unshift(updated);
    }
    return updated;
  },

  // ACADEMIC ASSETS (Past Papers & Keys)
  async getPapersByExam(examId) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('academic_assets')
        .select('*')
        .eq('exam_id', examId)
        .eq('asset_type', 'PAST_PAPER');
      if (!error && data && data.length > 0) return data;
    }

    return store.academic_assets.filter(
      a => a.exam_id.toLowerCase() === examId.toLowerCase() && a.asset_type === 'PAST_PAPER'
    );
  },

  async getAllPapers() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('academic_assets').select('*');
      if (!error && data) return data;
    }
    return store.academic_assets;
  },

  async upsertAsset(assetData) {
    if (isSupabaseConfigured) {
      await supabase.from('academic_assets').upsert({
        ...assetData,
        created_at: new Date().toISOString()
      });
    }

    const existingIdx = store.academic_assets.findIndex(
      a => a.exam_id === assetData.exam_id && a.title === assetData.title
    );
    const newAsset = {
      id: existingIdx >= 0 ? store.academic_assets[existingIdx].id : Date.now() + Math.floor(Math.random() * 1000),
      ...assetData,
      created_at: new Date().toISOString()
    };
    if (existingIdx >= 0) {
      store.academic_assets[existingIdx] = newAsset;
    } else {
      store.academic_assets.push(newAsset);
    }
    return newAsset;
  },

  // STUDENT RESULTS (Name-to-Roll Reverse Lookup)
  async searchStudentResults({ examId, query }) {
    if (isSupabaseConfigured) {
      let q = supabase.from('student_results').select('*');
      if (examId) q = q.eq('exam_id', examId);
      if (query) {
        q = q.or(`student_name.ilike.%${query}%,roll_number.ilike.%${query}%`);
      }
      const { data, error } = await q;
      if (!error && data) return data;
    }

    let results = [...store.student_results];
    if (examId) {
      results = results.filter(r => r.exam_id.toLowerCase() === examId.toLowerCase());
    }
    if (query) {
      const term = query.toLowerCase();
      results = results.filter(
        r => r.student_name.toLowerCase().includes(term) || r.roll_number.toLowerCase().includes(term)
      );
    }
    return results;
  },

  // PREMIUM UNLOCKS
  async createUnlock(unlockData) {
    if (isSupabaseConfigured) {
      await supabase.from('premium_unlocks').insert({
        ...unlockData,
        created_at: new Date().toISOString()
      });
    }

    const newUnlock = {
      id: Date.now(),
      ...unlockData,
      is_active: true,
      created_at: new Date().toISOString()
    };
    store.premium_unlocks.push(newUnlock);
    return newUnlock;
  },

  async isUnlocked({ phone_number, target_exam_id, target_roll_number }) {
    if (isSupabaseConfigured) {
      const { data } = await supabase
        .from('premium_unlocks')
        .select('*')
        .eq('phone_number', phone_number)
        .eq('target_exam_id', target_exam_id)
        .eq('is_active', true);
      if (data && data.length > 0) return true;
    }

    return store.premium_unlocks.some(
      u => u.phone_number === phone_number && 
           u.target_exam_id === target_exam_id && 
           u.is_active
    );
  }
};

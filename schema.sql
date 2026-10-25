-- =========================================================================
-- ExmNow: The Hands-Off All-India Exam & Results Engine
-- PostgreSQL / Supabase Schema Definition
-- =========================================================================

-- 1. EXAM MASTER REGISTER
CREATE TABLE IF NOT EXISTS public.exams (
    exam_id VARCHAR(50) PRIMARY KEY,        -- e.g., 'CBSE_12_2026', 'SSC_CGL_2026'
    category VARCHAR(50) NOT NULL,          -- 'SCHOOL', 'UNIVERSITY', 'GOVT'
    state VARCHAR(50) DEFAULT 'ALL_INDIA',  -- 'Punjab', 'Tamil Nadu', etc.
    exam_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'NOTIFICATION', -- 'APPLY' | 'EXAM' | 'NOTIFICATION' | 'RESULT'
    apply_url TEXT,
    admit_card_url TEXT,
    official_syllabus_url TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for speedy search by category, state, and status
CREATE INDEX IF NOT EXISTS idx_exams_category ON public.exams(category);
CREATE INDEX IF NOT EXISTS idx_exams_state ON public.exams(state);
CREATE INDEX IF NOT EXISTS idx_exams_status ON public.exams(status);

-- 2. STUDENT RESULT LEDGER (Name-to-Roll Lookup Database)
CREATE TABLE IF NOT EXISTS public.student_results (
    id BIGSERIAL PRIMARY KEY,
    exam_id VARCHAR(50) REFERENCES public.exams(exam_id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50) NOT NULL,
    total_marks INT NOT NULL,
    result_status VARCHAR(20) NOT NULL,
    marks_json JSONB                        -- Stores detailed subject-wise marks breakdown
);

CREATE INDEX IF NOT EXISTS idx_student_results_exam ON public.student_results(exam_id);
CREATE INDEX IF NOT EXISTS idx_student_results_roll ON public.student_results(roll_number);
CREATE INDEX IF NOT EXISTS idx_student_results_name ON public.student_results(student_name);

-- 3. PREMIUM UPI TRANSACTIONS TRACKER
CREATE TABLE IF NOT EXISTS public.premium_unlocks (
    id BIGSERIAL PRIMARY KEY,
    phone_number VARCHAR(15) NOT NULL,
    target_exam_id VARCHAR(50),
    target_roll_number VARCHAR(50),
    unlock_type VARCHAR(50) NOT NULL,      -- 'ROLL_LOOKUP', 'WHATSAPP_ALERT', 'PDF_BUY'
    payment_intent_id VARCHAR(100) UNIQUE,  -- Gateway tracking token
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_premium_unlocks_phone ON public.premium_unlocks(phone_number);
CREATE INDEX IF NOT EXISTS idx_premium_unlocks_payment ON public.premium_unlocks(payment_intent_id);

-- 4. FREE / PAID DIGITAL ASSETS & FAQ ARCHIVE
CREATE TABLE IF NOT EXISTS public.academic_assets (
    id BIGSERIAL PRIMARY KEY,
    exam_id VARCHAR(50) REFERENCES public.exams(exam_id) ON DELETE CASCADE,
    asset_type VARCHAR(50) NOT NULL,        -- 'PAST_PAPER', 'ANSWER_KEY', 'FAQ_DOUBT'
    title TEXT NOT NULL,
    content_payload TEXT,                   -- Stores plain text answers for FAQs/Doubts
    cdn_download_url TEXT,                  -- Cloud link for PDFs
    is_premium BOOLEAN DEFAULT FALSE,
    price_in_inr INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_academic_assets_exam ON public.academic_assets(exam_id);
CREATE INDEX IF NOT EXISTS idx_academic_assets_type ON public.academic_assets(asset_type);

# ExmNow: The Hands-Off All-India Exam & Results Engine
### Full-Stack Serverless Automation Engine for Google Project IDX / Antigravity / Vercel

ExmNow is an automated intelligence platform for tracking All-India examinations across Central Boards (CBSE, ICSE), State Boards (Punjab, Maharashtra, Tamil Nadu, Bihar, etc.), Central Universities (CUET, JEE, NEET), and Government recruitment commissions (UPSC, SSC, Railways, IBPS).

---

## 🚀 Key Architectural Pillars

1. **Autopilot Background RSS-to-AI Sync (`/api/cron/sync-exams`)**:
   - Triggers every 4 hours automatically via Vercel Cron.
   - Fetches live educational notifications from RSS feeds.
   - Leverages Google Gemini 1.5 Flash to automatically structure exams into relational schema without manual data entry.

2. **Visitor-Triggered On-The-Fly Scraper Hook (`/api/scrape-papers`)**:
   - Triggers whenever a student accesses an exam details page.
   - Checks if verified question papers are cached (< 30 days).
   - If missing, queries Gemini AI to discover verified public archive PDF links and commits them to the database.

3. **Reverse Name-to-Roll Student Results Ledger (`/results`)**:
   - Allows candidates to find scorecards and merit ranks by entering their name or roll number.
   - Renders subject-wise marks breakdowns (`marks_json`), theory/practical totals, grades, and printable marksheets.

4. **Cryptographic Payment Webhook Validator (`/api/webhook`)**:
   - Validates Razorpay HMAC-SHA256 signatures on the fly.
   - Unlocks WhatsApp score alerts and full school merit ledger batches.

5. **Dynamic Google SEO & Schema.org Rich Snippets (`/exams/[exam_id]`)**:
   - Generates programmatic JSON-LD `FAQPage` schemas for enhanced Google crawler hydration and search snippets.

---

## 🛠️ Project Structure

```
├── components/
│   ├── ExamSearchFilter.jsx     # High-density search & category filter pills (Blueprint Section 2)
│   ├── Navbar.jsx               # Header with live ticker & rapid navigation
│   ├── Footer.jsx               # Portal footer with schema & API links
│   └── PaymentUnlockModal.jsx   # UPI instant test gateway & webhook simulation
├── lib/
│   ├── db.js                    # Dual-mode database layer (Supabase + In-Memory Store)
│   └── mockData.js              # Rich seed data (30+ exams, results, and past papers)
├── pages/
│   ├── _app.jsx                 # Global layout & styles
│   ├── _document.jsx            # HTML document template
│   ├── index.jsx                # Main portal dashboard
│   ├── results.jsx              # All-India Name-to-Roll Results Ledger
│   ├── papers.jsx               # Academic assets & past paper PDF archive
│   ├── admin/sync.jsx           # AI Autopilot sync console & diagnostics
│   ├── exams/[exam_id].jsx      # Dynamic exam view with FAQ Schema (Blueprint Section 5)
│   └── api/
│       ├── cron/sync-exams.js   # Background RSS sync engine (Blueprint Section 3)
│       ├── scrape-papers.js     # On-the-fly paper scraper (Blueprint Section 4)
│       ├── webhook.js           # Cryptographic payment validator (Blueprint Section 6)
│       ├── exams/index.js       # Exams list API
│       └── results/search.js    # Student results search API
├── styles/
│   └── globals.css              # Tailwind directives & glassmorphism
├── schema.sql                   # Complete PostgreSQL schema (Blueprint Section 1)
├── vercel.json                  # Automated Vercel cron configuration (Blueprint Section 7)
├── package.json                 # Next.js, React, Tailwind, Supabase
└── .env.example                 # Environment configuration template
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local` to connect real Supabase or Gemini keys:
```bash
cp .env.example .env.local
```
*(Note: If no keys are provided, ExmNow automatically runs using its built-in high-performance reactive database store with 30+ seed exams and verified results).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (PostgreSQL / Supabase)

If deploying to Supabase or PostgreSQL, execute the SQL script in `schema.sql`:
- `exams`: Master exam register.
- `student_results`: Name-to-roll reverse lookup ledger.
- `academic_assets`: Past year papers and answer keys.
- `premium_unlocks`: UPI transaction tracker.

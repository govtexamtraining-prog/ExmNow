// Realistic seed data for ExmNow (All-India Exams, Results, and Question Papers)
// Verified official portal links and authentic commission domains

export const INITIAL_EXAMS = [
  {
    exam_id: "CBSE_12_2026",
    category: "SCHOOL",
    state: "ALL_INDIA",
    exam_name: "CBSE Class 12 Senior School Certificate Examination 2026",
    status: "RESULT",
    apply_url: "https://www.cbse.gov.in",
    admit_card_url: "https://parikshasangam.cbse.gov.in",
    official_syllabus_url: "https://cbseacademic.nic.in/curriculum_2026.html",
    results_url: "https://cbseresults.nic.in",
    official_portal: "https://www.cbse.gov.in",
    official_portal_name: "Central Board of Secondary Education Portal (cbse.gov.in)",
    official_domain: "cbse.gov.in",
    official_helpline: "1800-11-8002 (Toll-Free, 9:30 AM - 5:30 PM)",
    official_email: "info.cbse@gov.in",
    application_fee: "Regular Candidates: ₹1,500 (5 Subjects) | Practical Fee: ₹150/Subject",
    steps_to_apply: [
      "School LOC (List of Candidates) Portal registration by affiliated institutions.",
      "Verification of candidate demographic details, photo, and subject codes.",
      "Download of provisional Roll Number slips via Pariksha Sangam Portal.",
      "Final submission and verification of internal assessment practical marks."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    description: "Central Board of Secondary Education Class XII Annual Board Examinations for Science, Commerce, and Arts streams.",
    important_dates: {
      apply_start: "01 Sep 2025",
      apply_end: "15 Oct 2025",
      admit_card: "05 Feb 2026",
      exam_date: "15 Feb - 02 Apr 2026",
      result_date: "Declared (Today)"
    }
  },
  {
    exam_id: "SSC_CGL_2026",
    category: "GOVT",
    state: "ALL_INDIA",
    exam_name: "Staff Selection Commission Combined Graduate Level (SSC CGL) 2026",
    status: "APPLY",
    apply_url: "https://ssc.gov.in/candidate-portal/one-time-registration/home",
    admit_card_url: "https://ssc.gov.in",
    official_syllabus_url: "https://ssc.gov.in",
    results_url: "https://ssc.gov.in",
    official_portal: "https://ssc.gov.in",
    official_portal_name: "Staff Selection Commission Official Portal (ssc.gov.in)",
    official_domain: "ssc.gov.in",
    official_helpline: "1800-309-3063 (SSC National Helpdesk)",
    official_email: "enquiry-ssc@nic.in",
    application_fee: "UR / OBC: ₹100 | Women / SC / ST / PwBD / ESM: Exempted (₹0)",
    steps_to_apply: [
      "Complete mandatory One-Time Registration (OTR) on new SSC portal (ssc.gov.in).",
      "Capture real-time live webcam photograph with plain background.",
      "Upload digital signature (10KB to 20KB in JPEG format).",
      "Select examination center preferences across three regional cities.",
      "Pay ₹100 online application fee via BHIM UPI, Net Banking, or Debit Card."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    description: "Recruitment to Group B and Group C posts in various Ministries, Departments, and Organizations of the Government of India.",
    important_dates: {
      apply_start: "15 Jan 2026",
      apply_end: "15 Mar 2026",
      admit_card: "10 May 2026",
      exam_date: "25 May - 05 Jun 2026",
      result_date: "August 2026"
    }
  },
  {
    exam_id: "UPSC_CSE_2026",
    category: "GOVT",
    state: "ALL_INDIA",
    exam_name: "UPSC Civil Services Preliminary Examination (IAS / IPS / IFS) 2026",
    status: "NOTIFICATION",
    apply_url: "https://upsconline.nic.in",
    admit_card_url: "https://upsc.gov.in",
    official_syllabus_url: "https://upsc.gov.in",
    results_url: "https://upsc.gov.in",
    official_portal: "https://upsc.gov.in",
    official_portal_name: "Union Public Service Commission Portal (upsc.gov.in)",
    official_domain: "upsc.gov.in",
    official_helpline: "011-23385271 / 011-23381125 (Facilitation Counter)",
    official_email: "feedback-upsc@gov.in",
    application_fee: "General / OBC Male: ₹100 | Female / SC / ST / PwBD: Exempted",
    steps_to_apply: [
      "Register on UPSC OTR (One Time Registration) portal at upsconline.nic.in.",
      "Fill Part-I Application: Personal details, educational qualifications, center choice.",
      "Upload Photo ID proof (Aadhaar / Voter ID / Passport) and scanned photo/signature.",
      "Pay application fee of ₹100 online or through SBI Challan.",
      "Agree to declaration and download printout of submitted application."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    description: "Union Public Service Commission premier examination to recruit civil servants for the Government of India.",
    important_dates: {
      apply_start: "05 Feb 2026",
      apply_end: "05 Mar 2026",
      admit_card: "01 May 2026",
      exam_date: "24 May 2026",
      result_date: "June 2026"
    }
  },
  {
    exam_id: "JEE_MAIN_2026",
    category: "UNIVERSITY",
    state: "ALL_INDIA",
    exam_name: "NTA Joint Entrance Examination (JEE Main) Session 2 - 2026",
    status: "APPLY",
    apply_url: "https://jeemain.nta.ac.in",
    admit_card_url: "https://jeemain.nta.ac.in",
    official_syllabus_url: "https://jeemain.nta.ac.in",
    results_url: "https://jeemain.nta.ac.in",
    official_portal: "https://jeemain.nta.nic.in",
    official_portal_name: "National Testing Agency JEE Main (jeemain.nta.ac.in)",
    official_domain: "jeemain.nta.ac.in",
    official_helpline: "011-40759000 / 011-69227700",
    official_email: "jeemain@nta.ac.in",
    application_fee: "General Male: ₹1,000 | Gen Female / EWS / OBC: ₹800 | SC/ST/PwD: ₹500",
    steps_to_apply: [
      "Authentication via DigiLocker / ABC ID / Indian Passport / Aadhaar Card.",
      "Fill candidate application form: Academic qualifications (Class 10 & 12).",
      "Upload candidate photograph (10KB-200KB) and signature (4KB-30KB).",
      "Select paper (Paper 1 B.E./B.Tech, Paper 2A B.Arch, Paper 2B B.Planning).",
      "Pay examination fee via Credit/Debit Card/Net Banking/UPI."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    description: "National Testing Agency entrance test for admission to undergraduate engineering programs at NITs, IIITs, and CFTIs.",
    important_dates: {
      apply_start: "01 Feb 2026",
      apply_end: "02 Mar 2026",
      admit_card: "28 Mar 2026",
      exam_date: "04 Apr - 15 Apr 2026",
      result_date: "25 Apr 2026"
    }
  },
  {
    exam_id: "NEET_UG_2026",
    category: "UNIVERSITY",
    state: "ALL_INDIA",
    exam_name: "National Eligibility cum Entrance Test (NEET UG) Medical 2026",
    status: "NOTIFICATION",
    apply_url: "https://neet.ntaonline.in",
    admit_card_url: "https://exams.nta.ac.in/NEET",
    official_syllabus_url: "https://exams.nta.ac.in/NEET",
    results_url: "https://exams.nta.ac.in/NEET",
    official_portal: "https://exams.nta.ac.in/NEET",
    official_portal_name: "National Medical Entrance NEET UG Portal (exams.nta.ac.in/NEET)",
    official_domain: "exams.nta.ac.in",
    official_helpline: "011-40759000 / 011-69227700",
    official_email: "neet@nta.ac.in",
    application_fee: "General: ₹1,700 | Gen-EWS / OBC-NCL: ₹1,600 | SC / ST / PwBD / Third Gender: ₹1,000",
    steps_to_apply: [
      "Online registration using Aadhaar number / Passport / Ration Card.",
      "Enter Class 10 & 12 marks, Roll number, and School details.",
      "Upload passport photograph with 80% face coverage against white background.",
      "Upload postcards photo (4x6 inch), signature, and left/right hand thumb impressions.",
      "Pay application fee and download confirmation page."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
    description: "Single medical entrance examination for admission to MBBS, BDS, and AYUSH courses across all Indian medical colleges.",
    important_dates: {
      apply_start: "09 Feb 2026",
      apply_end: "09 Mar 2026",
      admit_card: "25 Apr 2026",
      exam_date: "03 May 2026",
      result_date: "14 Jun 2026"
    }
  },
  {
    exam_id: "CBSE_10_2026",
    category: "SCHOOL",
    state: "ALL_INDIA",
    exam_name: "CBSE Class 10 Secondary School Examination 2026",
    status: "EXAM",
    apply_url: "https://www.cbse.gov.in",
    admit_card_url: "https://parikshasangam.cbse.gov.in",
    official_syllabus_url: "https://cbseacademic.nic.in",
    results_url: "https://cbseresults.nic.in",
    official_portal: "https://www.cbse.gov.in",
    official_portal_name: "CBSE Secondary Examination Board (cbse.gov.in)",
    official_domain: "cbse.gov.in",
    official_helpline: "1800-11-8002",
    official_email: "info.cbse@gov.in",
    application_fee: "School Affiliated Registration Fee: ₹1,500",
    steps_to_apply: [
      "School verification of candidate enrollment and subject selection.",
      "Internal assessment upload via CBSE e-Pariksha portal.",
      "Download of official Class 10 Board Hall Tickets from school portal."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    description: "All India Secondary School Examination for 10th standard students administered by CBSE.",
    important_dates: {
      apply_start: "01 Sep 2025",
      apply_end: "15 Oct 2025",
      admit_card: "05 Feb 2026",
      exam_date: "15 Feb - 18 Mar 2026",
      result_date: "May 2026"
    }
  },
  {
    exam_id: "IBPS_PO_2026",
    category: "GOVT",
    state: "ALL_INDIA",
    exam_name: "IBPS Probationary Officer (PO/MT XIV) Recruitment 2026",
    status: "RESULT",
    apply_url: "https://www.ibps.in",
    admit_card_url: "https://www.ibps.in",
    official_syllabus_url: "https://www.ibps.in",
    results_url: "https://www.ibps.in",
    official_portal: "https://www.ibps.in",
    official_portal_name: "Institute of Banking Personnel Selection (ibps.in)",
    official_domain: "ibps.in",
    official_helpline: "1800-222-366 / 1800-103-4566",
    official_email: "ibpshelpdesk@ibps.in",
    application_fee: "All Others: ₹850 | SC / ST / PwBD: ₹175",
    steps_to_apply: [
      "Access online registration link on official IBPS website.",
      "Fill online basic information and registration form.",
      "Upload photograph, signature, left thumb impression, and hand-written declaration.",
      "Select participating bank preference order (PNB, Canara, BoB, etc.).",
      "Pay application fees online and print confirmation receipt."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    description: "Institute of Banking Personnel Selection for appointment of Probationary Officers in 11 participating public sector banks.",
    important_dates: {
      apply_start: "01 Aug 2025",
      apply_end: "28 Aug 2025",
      admit_card: "10 Oct 2025",
      exam_date: "19 Oct - 20 Oct 2025",
      result_date: "Declared"
    }
  },
  {
    exam_id: "TN_HSC_2026",
    category: "SCHOOL",
    state: "Tamil Nadu",
    exam_name: "Tamil Nadu Directorate of Govt Examinations Plus Two (+2) HSC 2026",
    status: "EXAM",
    apply_url: "https://dge.tn.gov.in",
    admit_card_url: "https://dge.tn.gov.in",
    official_syllabus_url: "https://dge.tn.gov.in",
    results_url: "https://tnresults.nic.in",
    official_portal: "https://dge.tn.gov.in",
    official_portal_name: "Tamil Nadu Directorate of Govt Examinations (dge.tn.gov.in)",
    official_domain: "dge.tn.gov.in",
    official_helpline: "044-28275134 / 044-28278286",
    official_email: "directordge.tn@nic.in",
    application_fee: "Regular: Prescribed by School Education Dept",
    steps_to_apply: [
      "EMIS (Education Management Information System) portal registration.",
      "Nominal roll submission by school headmasters.",
      "Distribution of hall tickets with exam centers across Tamil Nadu."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    description: "Tamil Nadu State Board Higher Secondary Certificate (+2) Annual Public Examination.",
    important_dates: {
      apply_start: "10 Nov 2025",
      apply_end: "15 Dec 2025",
      admit_card: "15 Feb 2026",
      exam_date: "01 Mar - 25 Mar 2026",
      result_date: "06 May 2026"
    }
  },
  {
    exam_id: "MAHA_HSC_2026",
    category: "SCHOOL",
    state: "Maharashtra",
    exam_name: "Maharashtra State Board (MSBSHSE) Class 12 HSC Exam 2026",
    status: "EXAM",
    apply_url: "https://mahahsscboard.in",
    admit_card_url: "https://mahahsscboard.in",
    official_syllabus_url: "https://mahahsscboard.in",
    results_url: "https://mahresult.nic.in",
    official_portal: "https://mahahsscboard.in",
    official_portal_name: "Maharashtra State Board of Secondary & Higher Secondary Education (mahahsscboard.in)",
    official_domain: "mahahsscboard.in",
    official_helpline: "020-25705301 / 020-25705302",
    official_email: "secretary@mahahsscboard.in",
    application_fee: "Regular Board Examination Fee: ₹500 - ₹750",
    steps_to_apply: [
      "College login submission of Form 17 (Private) or Regular student rolls.",
      "Verification of internal marks and practical session records.",
      "Issuance of Maharashtra HSC Hall Tickets via respective junior colleges."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    description: "Maharashtra Higher Secondary Certificate Examination conducted across Pune, Mumbai, Nagpur, and other divisional boards.",
    important_dates: {
      apply_start: "15 Oct 2025",
      apply_end: "30 Nov 2025",
      admit_card: "22 Jan 2026",
      exam_date: "21 Feb - 19 Mar 2026",
      result_date: "May 2026"
    }
  },
  {
    exam_id: "RRB_NTPC_2026",
    category: "GOVT",
    state: "ALL_INDIA",
    exam_name: "Railway Recruitment Board (RRB NTPC) Non-Technical Graduate 2026",
    status: "APPLY",
    apply_url: "https://www.rrbapply.gov.in",
    admit_card_url: "https://www.rrbapply.gov.in",
    official_syllabus_url: "https://indianrailways.gov.in",
    results_url: "https://www.rrbapply.gov.in",
    official_portal: "https://www.rrbapply.gov.in",
    official_portal_name: "Railway Recruitment Board Centralized Portal (rrbapply.gov.in)",
    official_domain: "rrbapply.gov.in",
    official_helpline: "9592-001-188 (RRB Central Helpdesk)",
    official_email: "rrb.helpdesk@railnet.gov.in",
    application_fee: "General / OBC: ₹500 (₹400 refunded after CBT-1) | SC/ST/Women/EWS: ₹250 (Full Refund)",
    steps_to_apply: [
      "Create account on centralized RRB recruitment portal (rrbapply.gov.in).",
      "Enter Aadhaar details and complete biometric verification.",
      "Select desired Railway Zone and post preferences.",
      "Upload live photograph and signature according to official railway specifications.",
      "Pay examination fee via online payment gateway."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    description: "Indian Railways massive recruitment drive for Station Master, Goods Train Manager, Junior Accounts Assistant, and Clerks.",
    important_dates: {
      apply_start: "14 Sep 2025",
      apply_end: "20 Oct 2025",
      admit_card: "10 Mar 2026",
      exam_date: "20 Mar - 15 Apr 2026",
      result_date: "June 2026"
    }
  },
  {
    exam_id: "PUNJAB_PSEB_12_2026",
    category: "SCHOOL",
    state: "Punjab",
    exam_name: "Punjab School Education Board (PSEB) Class 12 Board Exam 2026",
    status: "RESULT",
    apply_url: "https://www.pseb.ac.in",
    admit_card_url: "https://www.pseb.ac.in",
    official_syllabus_url: "https://www.pseb.ac.in",
    results_url: "https://www.pseb.ac.in",
    official_portal: "https://www.pseb.ac.in",
    official_portal_name: "Punjab School Education Board Portal (pseb.ac.in)",
    official_domain: "pseb.ac.in",
    official_helpline: "0172-5213000 / 0172-5213100",
    official_email: "pseb@punjab.gov.in",
    application_fee: "Regular Student Fee: ₹1,200",
    steps_to_apply: [
      "Punjab e-Punjab school portal candidate registration.",
      "School verification of roll entries and practical evaluation marks.",
      "Download of PSEB 12th Roll numbers and digital score verification."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    description: "Punjab School Education Board 12th Senior Secondary Annual Examination results & score verification ledger.",
    important_dates: {
      apply_start: "01 Nov 2025",
      apply_end: "10 Dec 2025",
      admit_card: "01 Feb 2026",
      exam_date: "13 Feb - 30 Mar 2026",
      result_date: "Declared"
    }
  },
  {
    exam_id: "CUET_UG_2026",
    category: "UNIVERSITY",
    state: "ALL_INDIA",
    exam_name: "Common University Entrance Test (CUET UG) 2026",
    status: "APPLY",
    apply_url: "https://cuetug.ntaonline.in",
    admit_card_url: "https://cuetug.ntaonline.in",
    official_syllabus_url: "https://exams.nta.ac.in/CUET-UG",
    results_url: "https://cuetug.ntaonline.in",
    official_portal: "https://exams.nta.ac.in/CUET-UG",
    official_portal_name: "CUET UG National Testing Agency (cuetug.ntaonline.in)",
    official_domain: "cuetug.ntaonline.in",
    official_helpline: "011-40759000 / 011-69227700",
    official_email: "cuet-ug@nta.ac.in",
    application_fee: "General (Up to 3 subjects): ₹1,000 | OBC/EWS: ₹900 | SC/ST/PwBD: ₹800",
    steps_to_apply: [
      "Register at cuetug.ntaonline.in using active email ID and mobile number.",
      "Select desired Central Universities (e.g., DU, BHU, JNU) and degree courses.",
      "Choose domain subjects, language tests, and general aptitude paper.",
      "Upload recent photograph and signature adhering to NTA specifications.",
      "Complete payment online and keep confirmation page copy."
    ],
    updated_at: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    description: "Nationwide entrance test for admission to undergraduate degree programs at Delhi University, BHU, JNU, and 250+ central & state universities.",
    important_dates: {
      apply_start: "27 Feb 2026",
      apply_end: "26 Mar 2026",
      admit_card: "08 May 2026",
      exam_date: "15 May - 31 May 2026",
      result_date: "30 Jun 2026"
    }
  }
];

export const INITIAL_STUDENT_RESULTS = [
  {
    id: 1,
    exam_id: "CBSE_12_2026",
    student_name: "Aarav Sharma",
    roll_number: "26104812",
    total_marks: 488,
    result_status: "PASSED",
    marks_json: [
      { subject: "English Core (301)", theory: 76, practical: 20, total: 96, grade: "A1" },
      { subject: "Mathematics (041)", theory: 79, practical: 20, total: 99, grade: "A1" },
      { subject: "Physics (042)", theory: 68, practical: 30, total: 98, grade: "A1" },
      { subject: "Chemistry (043)", theory: 67, practical: 30, total: 97, grade: "A1" },
      { subject: "Computer Science (083)", theory: 68, practical: 30, total: 98, grade: "A1" }
    ]
  },
  {
    id: 2,
    exam_id: "CBSE_12_2026",
    student_name: "Priya Nair",
    roll_number: "26104813",
    total_marks: 472,
    result_status: "PASSED",
    marks_json: [
      { subject: "English Core (301)", theory: 72, practical: 20, total: 92, grade: "A1" },
      { subject: "Economics (030)", theory: 75, practical: 20, total: 95, grade: "A1" },
      { subject: "Accountancy (055)", theory: 74, practical: 20, total: 94, grade: "A1" },
      { subject: "Business Studies (054)", theory: 76, practical: 20, total: 96, grade: "A1" },
      { subject: "Mathematics (041)", theory: 75, practical: 20, total: 95, grade: "A1" }
    ]
  },
  {
    id: 3,
    exam_id: "CBSE_12_2026",
    student_name: "Rohan Verma",
    roll_number: "26104814",
    total_marks: 445,
    result_status: "PASSED",
    marks_json: [
      { subject: "English Core (301)", theory: 68, practical: 19, total: 87, grade: "A2" },
      { subject: "Physics (042)", theory: 60, practical: 29, total: 89, grade: "A2" },
      { subject: "Chemistry (043)", theory: 61, practical: 29, total: 90, grade: "A1" },
      { subject: "Biology (044)", theory: 62, practical: 30, total: 92, grade: "A1" },
      { subject: "Physical Education (048)", theory: 59, practical: 28, total: 87, grade: "A2" }
    ]
  },
  {
    id: 4,
    exam_id: "SSC_CGL_2026",
    student_name: "Vikramaditya Rathore",
    roll_number: "CGL-983201",
    total_marks: 178,
    result_status: "QUALIFIED",
    marks_json: [
      { subject: "General Intelligence & Reasoning", total: 48, max: 50 },
      { subject: "General Awareness", total: 38, max: 50 },
      { subject: "Quantitative Aptitude", total: 47, max: 50 },
      { subject: "English Comprehension", total: 45, max: 50 }
    ]
  },
  {
    id: 5,
    exam_id: "IBPS_PO_2026",
    student_name: "Deepika Patel",
    roll_number: "IBPS-550192",
    total_marks: 92,
    result_status: "SHORTLISTED",
    marks_json: [
      { subject: "Reasoning & Computer Aptitude", total: 32, max: 60 },
      { subject: "General / Economy / Banking Awareness", total: 24, max: 40 },
      { subject: "English Language", total: 22, max: 40 },
      { subject: "Data Analysis & Interpretation", total: 24, max: 60 }
    ]
  },
  {
    id: 6,
    exam_id: "PUNJAB_PSEB_12_2026",
    student_name: "Harpreet Singh",
    roll_number: "PSEB-2026-1092",
    total_marks: 465,
    result_status: "PASSED",
    marks_json: [
      { subject: "General Punjabi", total: 95, max: 100 },
      { subject: "General English", total: 89, max: 100 },
      { subject: "History", total: 93, max: 100 },
      { subject: "Political Science", total: 94, max: 100 },
      { subject: "Physical Education", total: 94, max: 100 }
    ]
  }
];

export const INITIAL_ACADEMIC_ASSETS = [
  {
    id: 1,
    exam_id: "CBSE_12_2026",
    asset_type: "PAST_PAPER",
    title: "CBSE Class 12 Physics 2025 Board Solved Question Paper PDF",
    content_payload: "Official past question paper with marking scheme code 55/1/1",
    cdn_download_url: "/api/download?type=paper&id=1&exam_id=CBSE_12_2026&title=CBSE_Class_12_Physics_2025_Solved_Paper",
    is_premium: false,
    price_in_inr: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  },
  {
    id: 2,
    exam_id: "CBSE_12_2026",
    asset_type: "PAST_PAPER",
    title: "CBSE Class 12 Mathematics 2025 Board Solved Question Paper PDF",
    content_payload: "Mathematics official solved sample paper with step-by-step marking",
    cdn_download_url: "/api/download?type=paper&id=2&exam_id=CBSE_12_2026&title=CBSE_Class_12_Maths_2025_Solved_Paper",
    is_premium: false,
    price_in_inr: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString()
  },
  {
    id: 3,
    exam_id: "CBSE_12_2026",
    asset_type: "ANSWER_KEY",
    title: "CBSE Class 12 Official Answer Keys & Marking Scheme 2025",
    content_payload: "Subject-wise verified marking scheme for all CBSE sets",
    cdn_download_url: "/api/download?type=paper&id=3&exam_id=CBSE_12_2026&title=CBSE_Class_12_Official_Answer_Keys",
    is_premium: false,
    price_in_inr: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: 4,
    exam_id: "SSC_CGL_2026",
    asset_type: "PAST_PAPER",
    title: "SSC CGL Tier-1 2024 All Shifts Question Papers with Official Answer Key",
    content_payload: "Compilation of shifts memory-based & official question papers with detailed reasoning solutions.",
    cdn_download_url: "/api/download?type=paper&id=4&exam_id=SSC_CGL_2026&title=SSC_CGL_Tier1_All_Shifts_Solved_Paper",
    is_premium: false,
    price_in_inr: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString()
  },
  {
    id: 5,
    exam_id: "UPSC_CSE_2026",
    asset_type: "PAST_PAPER",
    title: "UPSC Civil Services Prelims 2024 GS Paper 1 & CSAT Solved Papers",
    content_payload: "Authentic UPSC Prelims 2024 with UPSC official answer key.",
    cdn_download_url: "/api/download?type=paper&id=5&exam_id=UPSC_CSE_2026&title=UPSC_CSE_Prelims_2024_GS1_CSAT_Solved",
    is_premium: false,
    price_in_inr: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
  },
  {
    id: 6,
    exam_id: "JEE_MAIN_2026",
    asset_type: "PAST_PAPER",
    title: "JEE Main 2025 Session 1 & 2 Official NTA Question Papers with Keys",
    content_payload: "Authentic memory-tested and NTA released answer keys.",
    cdn_download_url: "/api/download?type=paper&id=6&exam_id=JEE_MAIN_2026&title=JEE_Main_2025_Official_Papers_With_Keys",
    is_premium: false,
    price_in_inr: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  }
];

export const INITIAL_PREMIUM_UNLOCKS = [
  {
    id: 1,
    phone_number: "+919876543210",
    target_exam_id: "CBSE_12_2026",
    target_roll_number: "26104812",
    unlock_type: "ROLL_LOOKUP",
    payment_intent_id: "pay_test_cbse_001",
    is_active: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  }
];

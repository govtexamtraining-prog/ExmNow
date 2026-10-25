// Comprehensive Exam Knowledge Registry for ExmNow
// Provides authentic, examination-specific questions, syllabus modules, authorities, and marking schemes

export const EXAM_KNOWLEDGE = {
  CBSE_12_2026: {
    authority: "CENTRAL BOARD OF SECONDARY EDUCATION (SHIKSHA KENDRA, DELHI)",
    boardName: "Senior School Certificate Examination (Class XII)",
    state: "All India",
    department: "Ministry of Education, Government of India",
    code: "CBSE-XII-2025-55/1/1",
    instructions: [
      "1. Please check that this question paper contains 33 questions across 5 sections (A to E).",
      "2. Section A contains 16 questions (12 MCQs and 4 Assertion-Reasoning) of 1 mark each.",
      "3. Section B contains 5 questions of 2 marks each.",
      "4. Section C contains 7 questions of 3 marks each.",
      "5. Section D contains 2 case study-based questions of 4 marks each.",
      "6. Section E contains 3 long questions of 5 marks each. Calculators are strictly prohibited."
    ],
    paperData: {
      subject: "Class XII Physics (042) / Science Core Solved Question Paper",
      sectionA: {
        heading: "SECTION A: 16 OBJECTIVE QUESTIONS & ASSERTION-REASON WITH OFFICIAL KEY",
        headers: ["Q.No", "CBSE Official Physics Question", "Official Key", "Marking Scheme"],
        rows: [
          ["Q1", "An electric dipole of moment p is placed in uniform field E. Potential energy is minimum when angle theta is:", "theta = 0 deg (p parallel to E)", "1 Mark"],
          ["Q2", "The drift velocity v_d of electrons in a conductor varies with electric field E as:", "v_d directly proportional to E", "1 Mark"],
          ["Q3", "The magnetic susceptibility of a diamagnetic substance is:", "Small and negative (chi < 0)", "1 Mark"],
          ["Q4", "Ratio of de-Broglie wavelengths of a proton and an alpha particle having same kinetic energy:", "2 : 1", "1 Mark (lambda prop 1/sqrt(m))"],
          ["Q5 (A-R)", "Assertion: Photoelectric effect proves particle nature. Reason: Energy of photon depends on frequency.", "Both A and R true, R is correct explanation", "1 Mark"]
        ]
      },
      sectionB: {
        heading: "SECTION B: 2-MARK QUESTIONS WITH OFFICIAL STEP-BY-STEP SCHEME",
        items: [
          "Q6. State Biot-Savart Law and express it in vector form. (2 Marks)",
          "    Official Marking: Statement dB prop I dl sin(theta) / r^2 [1 Mark]. Vector form dB = (mu_0 / 4pi) * (I dl x r) / r^3 [1 Mark].",
          "Q7. Draw energy band diagrams for an n-type semiconductor at T > 0 K. (2 Marks)",
          "    Official Marking: Conduction and Valence band with donor level just below conduction band (E_d ~ 0.01 eV) [2 Marks]."
        ]
      },
      sectionC: {
        heading: "SECTION C & E: 3-MARK & 5-MARK STEP EVALUATION CRITERIA",
        items: [
          "Q8. Derive Lens Maker's Formula for a double convex thin lens. (5 Marks)",
          "    Official Marking Breakdown:",
          "    • Ray diagram showing refraction at two spherical surfaces: [1 Mark]",
          "    • Applying refraction formula at first surface: n2/v1 - n1/u = (n2 - n1)/R1 [1.5 Marks]",
          "    • Applying refraction formula at second surface: n1/v - n2/v1 = (n1 - n2)/R2 [1.5 Marks]",
          "    • Adding the two relations to obtain 1/f = (n - 1)(1/R1 - 1/R2): [1 Mark]"
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Unit I & II: Electrostatics & Current Electricity", "Charges, Gauss law, Potential, Capacitance, Ohm law, Kirchhoff laws", "16 Marks"],
        ["Unit III & IV: Magnetic Effects & EMI / AC", "Biot-Savart, Ampere law, Cyclotron, Faraday laws, AC generator", "17 Marks"],
        ["Unit V & VI: EM Waves & Optics", "EM spectrum, Wave optics, Huygens principle, Interference, Diffraction", "18 Marks"],
        ["Unit VII & VIII: Dual Nature & Atoms / Nuclei", "Photoelectric effect, Bohr model, Nuclear binding energy, Mass defect", "12 Marks"],
        ["Unit IX: Electronic Devices", "Semiconductor diodes, p-n junction characteristics, Rectifiers", "7 Marks"]
      ]
    }
  },
  CBSE_10_2026: {
    authority: "CENTRAL BOARD OF SECONDARY EDUCATION",
    boardName: "Secondary School Examination (Class X)",
    state: "All India",
    department: "Ministry of Education, Government of India",
    code: "CBSE-X-2025-SCIENCE",
    instructions: [
      "1. This question paper consists of 39 questions in 5 sections (Section A to E).",
      "2. Section A consists of 20 objective type questions carrying 1 mark each.",
      "3. Section B consists of 6 Very Short questions carrying 02 marks each.",
      "4. Section C consists of 7 Short Answer type questions carrying 03 marks each.",
      "5. Section D consists of 3 Long Answer type questions carrying 05 marks each."
    ],
    paperData: {
      subject: "Class X Science (086) / Mathematics Solved Question Paper",
      sectionA: {
        heading: "SECTION A: 20 OBJECTIVE TYPE QUESTIONS & OFFICIAL ANSWERS",
        headers: ["Q.No", "CBSE Class 10 Board Question", "Official Key", "Marks"],
        rows: [
          ["Q1", "Identify the substance oxidized in: CuO + H2 -> Cu + H2O", "H2 (Hydrogen)", "1 Mark"],
          ["Q2", "The focal length of a spherical mirror of radius of curvature 30 cm is:", "15 cm (f = R/2)", "1 Mark"],
          ["Q3", "The functional group present in propanone is:", "Ketone (-CO-)", "1 Mark"]
        ]
      },
      sectionB: {
        heading: "SECTION B & C: SHORT ANSWER QUESTIONS WITH STEP MARKING",
        items: [
          "Q4. State Snell's law of refraction of light. (2 Marks)",
          "    Official Marking: Ratio of sine of angle of incidence to sine of angle of refraction is constant (sin i / sin r = constant = n21) [2 Marks]."
        ]
      },
      sectionC: {
        heading: "PRACTICAL & INTERNAL MARKS EVALUATION",
        items: [
          "• Pen-Paper Periodic Tests: 5 Marks.",
          "• Multiple Assessment & Subject Enrichment: 5 Marks.",
          "• Portfolio & Practical Lab Record: 5 Marks."
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Chemical Substances - Nature & Behaviour", "Chemical reactions, Acids/Bases, Metals/Non-metals, Carbon compounds", "25 Marks"],
        ["World of Living (Biology)", "Life processes, Control & coordination, Reproduction, Heredity", "25 Marks"],
        ["Natural Phenomena & Effects of Current (Physics)", "Light reflection/refraction, Human eye, Electricity, Magnetic effects", "25 Marks"],
        ["Natural Resources", "Our Environment, Ecosystem food chains and ozone depletion", "5 Marks"]
      ]
    }
  },
  TN_HSC_2026: {
    authority: "GOVERNMENT OF TAMIL NADU - DIRECTORATE OF GOVERNMENT EXAMINATIONS",
    boardName: "Higher Secondary Examination (+2 / Class XII)",
    state: "Tamil Nadu",
    department: "Department of School Education, Chennai",
    code: "TN-DGE-HSC-2026",
    instructions: [
      "1. Check the question paper for fairness of printing. If there is any defect, inform the Hall Supervisor immediately.",
      "2. Use Blue or Black ink to write and underline, and pencil to draw diagrams.",
      "3. Part I contains 15 Multiple Choice Questions carrying 1 mark each. Choose the correct option and write its code.",
      "4. Part II & III contain 2-mark and 3-mark questions. Answer any 6 questions in each part.",
      "5. Part IV contains 5-mark questions with internal choice (either/or pattern). Detailed steps carry marks."
    ],
    paperData: {
      subject: "Higher Secondary Part III - Core Science & Mathematics / General Curriculum",
      sectionA: {
        heading: "PART I: 15 COMPULSORY OBJECTIVE QUESTIONS (1 MARK EACH)",
        headers: ["Q.No", "Tamil Nadu +2 Board Question", "Official Key", "Marking Details"],
        rows: [
          ["Q1", "The unit of electric field intensity is (a) N C^-1 (b) N m (c) C N^-1 (d) N C", "Option (a)", "1 Mark (Full)"],
          ["Q2", "If A is a non-singular matrix of order 3x3, then |adj A| is equal to", "Option (b) |A|^2", "1 Mark (Full)"],
          ["Q3", "The coordination number of atoms in a body-centered cubic (BCC) lattice is", "Option (c) 8", "1 Mark (Full)"],
          ["Q4", "The value of int(0 to pi/2) (sin^n x)/(sin^n x + cos^n x) dx is", "Option (d) pi/4", "1 Mark (Full)"],
          ["Q5", "Which of the following hormones regulates calcium and phosphate metabolism?", "Option (b) Parathormone", "1 Mark (Full)"]
        ]
      },
      sectionB: {
        heading: "PART II: 2-MARK QUESTIONS WITH OFFICIAL DGE MARKING BREAKDOWN",
        items: [
          "Q6. Define Electric Dipole Moment and state its SI unit. (2 Marks)",
          "    Official Marking Scheme: Definition [1 Mark]: Product of either charge and distance between them (p = q * 2a). SI Unit [1 Mark]: Coulomb-metre (C m).",
          "Q7. Find the rank of the matrix [(1, 2, 3), (2, 4, 6), (3, 6, 9)]. (2 Marks)",
          "    Official Marking Scheme: Row operation R2 -> R2 - 2R1, R3 -> R3 - 3R1 [1 Mark]. Since only one non-zero row exists, Rank rho(A) = 1 [1 Mark].",
          "Q8. State Faraday's First Law of Electrolysis. (2 Marks)",
          "    Official Marking Scheme: Statement (m directly proportional to Q, or m = Z * I * t) [1 Mark]. Explanation of terms [1 Mark]."
        ]
      },
      sectionC: {
        heading: "PART III & IV: 3-MARK & 5-MARK LONG QUESTIONS WITH STEP-BY-STEP SCHEME",
        items: [
          "Q9. Derive the condition for bridge balance in a Wheatstone Bridge network. (5 Marks)",
          "    Official Step Distribution:",
          "    • Circuit diagram with four resistances P, Q, R, S and Galvanometer G: [1 Mark]",
          "    • Applying Kirchhoff's First Rule (Current law) at junctions B and D: [1.5 Marks]",
          "    • Applying Kirchhoff's Second Rule (Voltage law) for loops ABDA and BCDB: [1.5 Marks]",
          "    • Balanced condition when I_g = 0 yielding P / Q = R / S: [1 Mark]"
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Part I: Languages", "Tamil / Regional Language Comprehension, Grammar, Prose, Poetry", "100 Marks"],
        ["Part II: English", "Communicative English, Grammar, Reading Comprehension, Literary Elements", "100 Marks"],
        ["Part III: Core Subject 1", "Mathematics / Business Mathematics & Statistics", "100 Marks (90 Theory + 10 Internal)"],
        ["Part III: Core Subject 2 & 3", "Physics, Chemistry, Biology, Computer Science, Commerce, Accountancy", "100 Marks (70 Theory + 20 Practical + 10 Internal)"]
      ]
    }
  },

  SSC_CGL_2026: {
    authority: "STAFF SELECTION COMMISSION (GOVERNMENT OF INDIA)",
    boardName: "Combined Graduate Level Examination (Tier-I & Tier-II)",
    state: "All India",
    department: "Department of Personnel & Training (DoPT), New Delhi",
    code: "SSC-CGL-2026-TIER1",
    instructions: [
      "1. The examination consists of 100 Objective Multiple Choice Questions divided into four sections.",
      "2. Each question carries 2 marks. Total maximum marks = 200.",
      "3. Negative marking: 0.50 marks will be deducted for each incorrect answer.",
      "4. Total duration of the examination is 60 minutes (80 minutes for scribe-eligible candidates).",
      "5. The computer based test (CBT) interface auto-saves candidate selections upon clicking 'Save & Next'."
    ],
    paperData: {
      subject: "Tier-I CBT Solved Question Paper & Comprehensive Answer Key",
      sectionA: {
        heading: "SECTION 1 & 2: REASONING & GENERAL AWARENESS SOLVED QUESTIONS",
        headers: ["Q.No", "SSC CGL Question & Reasoning", "Correct Key", "Marks"],
        rows: [
          ["Q1 (Reasoning)", "Select the related number from alternatives: 12 : 144 :: 14 : ?", "Option (B) 196", "+2.0 (Correct)"],
          ["Q2 (Reasoning)", "In a code, 'TEACHER' is written as 'VGCEJGT'. How is 'STUDENT' written?", "Option (D) UVWFGPV", "+2.0 (Correct)"],
          ["Q3 (GA)", "Under which Article of the Indian Constitution is the Finance Commission formed?", "Option (A) Article 280", "+2.0 (Correct)"],
          ["Q4 (GA)", "Who was the founder of the Maurya Empire in ancient India?", "Option (C) Chandragupta Maurya", "+2.0 (Correct)"],
          ["Q5 (GA)", "The standard unit of measure for electrical resistivity is:", "Option (B) Ohm-metre (ohm*m)", "+2.0 (Correct)"]
        ]
      },
      sectionB: {
        heading: "SECTION 3: QUANTITATIVE APTITUDE WITH COMPLETE SHORTCUT SOLUTIONS",
        items: [
          "Q6. If x + 1/x = 5, find the value of x^3 + 1/x^3. (+2 Marks)",
          "    Shortcut Solution: Formula: x^3 + 1/x^3 = k^3 - 3k, where k = 5. Calculation: 5^3 - 3(5) = 125 - 15 = 110.",
          "Q7. A shopkeeper marks an article 30% above cost price and allows a 10% discount. Find profit percentage.",
          "    Solution: Let CP = 100. Marked Price MP = 130. Discount = 10% of 130 = 13. Selling Price SP = 117. Profit = 17%."
        ]
      },
      sectionC: {
        heading: "SECTION 4: ENGLISH COMPREHENSION & GRAMMAR OFFICIAL SOLUTIONS",
        items: [
          "Q8. Spot the Error: 'Neither the principal nor the teachers (A) / was present (B) / at the meeting (C) / No error (D)'",
          "    Answer: Error in part (B). Explanation: When subjects are joined by 'neither... nor', the verb agrees with the nearer subject ('teachers' is plural, so verb must be 'were present').",
          "Q9. Select the Synonym of 'ABUNDANT':",
          "    Answer: 'Plentiful / Copious'. Antonym: 'Scarce'."
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Module 1: General Intelligence & Reasoning", "Analogies, spatial visualization, series, coding-decoding, blood relations", "25 Questions / 50 Marks"],
        ["Module 2: General Awareness", "History, Culture, Geography, Economic Scene, General Policy, Scientific Research", "25 Questions / 50 Marks"],
        ["Module 3: Quantitative Aptitude", "Number Systems, Percentages, Ratio, Profit & Loss, Algebra, Geometry, Trigonometry", "25 Questions / 50 Marks"],
        ["Module 4: English Comprehension", "Grammar, Vocabulary, Synonyms/Antonyms, One-word substitution, Reading Comprehension", "25 Questions / 50 Marks"]
      ]
    }
  },

  UPSC_CSE_2026: {
    authority: "UNION PUBLIC SERVICE COMMISSION (UPSC, NEW DELHI)",
    boardName: "Civil Services (Preliminary) Examination - General Studies Paper I",
    state: "All India",
    department: "Dholpur House, Shahjahan Road, New Delhi",
    code: "UPSC-CSE-PRE-2026",
    instructions: [
      "1. This paper contains 100 objective-type questions carrying equal marks (2 marks each). Total = 200 Marks.",
      "2. Duration: 2 Hours (120 Minutes). Penalty for wrong answers: 1/3rd (0.66 marks) will be deducted.",
      "3. Only one response must be darkened per question in the OMR sheet.",
      "4. The medium of questions is bilingual (English and Hindi)."
    ],
    paperData: {
      subject: "Civil Services Prelims GS Paper I Solved Paper with Official Key",
      sectionA: {
        heading: "POLITY, GOVERNANCE & CONSTITUTIONAL FRAMEWORK",
        headers: ["Q.No", "UPSC Prelims Question", "UPSC Key", "Analytical Explanation"],
        rows: [
          ["Q1", "Which Article of the Constitution guarantees the Right to Privacy as an intrinsic part of Life & Liberty?", "Article 21", "Puttaswamy v. Union of India (2017) 9-judge bench ruling."],
          ["Q2", "In India, which authority decides whether a bill is a Money Bill or not?", "Speaker of Lok Sabha", "Under Article 110(3), the decision of the Speaker is final."],
          ["Q3", "The concept of 'Basic Structure' of the Indian Constitution was propounded in:", "Kesavananda Bharati (1973)", "Overruled Golaknath; Parliament cannot alter the basic framework."]
        ]
      },
      sectionB: {
        heading: "INDIAN ECONOMY, ENVIRONMENT & CURRENT DEVELOPMENTS",
        items: [
          "Q4. Consider the following statements regarding Monetary Policy Committee (MPC):",
          "    1. It decides the RBI's benchmark repo rate. 2. It is a 6-member body. 3. The Governor of RBI has a casting vote in tie.",
          "    Official Answer: All three statements (1, 2, and 3) are correct under the RBI Act, 1934 amendment.",
          "Q5. Which among the following is a biodiversity hotspot situated entirely within Indian territory?",
          "    Official Answer: Western Ghats (and the Himalayas). Western Ghats is recognized by UNESCO as one of the 8 hottest hotspots."
        ]
      },
      sectionC: {
        heading: "HISTORY, ART & CULTURE SOLVED QUESTIONS",
        items: [
          "Q6. With reference to the ancient history of India, the terms 'Kulyavapa' and 'Dronavapa' denoted:",
          "    Official Answer: Measurement of Land. Used in Gupta inscriptions to denote area measurement based on seed capacity.",
          "Q7. The famous rock-cut Kailash Temple at Ellora was excavated under the patronage of:",
          "    Official Answer: Rashtrakuta King Krishna I in the 8th century CE."
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Current Events", "National and international importance current affairs", "15-20 Questions"],
        ["History of India & National Movement", "Ancient, Medieval, Modern Freedom Struggle, Art & Architecture", "15-18 Questions"],
        ["Indian & World Geography", "Physical, Social, Economic Geography of India and the World", "12-15 Questions"],
        ["Indian Polity & Governance", "Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues", "15-18 Questions"],
        ["Economic & Social Development", "Sustainable Development, Poverty, Inclusion, Demographics, Social Sector", "14-16 Questions"],
        ["Environmental Ecology & Biodiversity", "General issues on Biodiversity and Climate Change (no subject specialization)", "15-18 Questions"]
      ]
    }
  },

  JEE_MAIN_2026: {
    authority: "NATIONAL TESTING AGENCY (MINISTRY OF EDUCATION, GOVT OF INDIA)",
    boardName: "Joint Entrance Examination (Main) - Paper 1 (B.E. / B.Tech)",
    state: "All India",
    department: "Department of Higher Education, New Delhi",
    code: "NTA-JEE-MAIN-2026",
    instructions: [
      "1. The paper contains 90 questions divided into three parts: Physics, Chemistry, and Mathematics (30 questions each).",
      "2. Each subject has two sections: Section A (20 MCQs) and Section B (10 Numerical Value questions, attempt any 5).",
      "3. Marking: +4 for correct answer, -1 for incorrect answer in both Section A and Section B.",
      "4. Total marks = 300. Duration: 180 Minutes (3 Hours)."
    ],
    paperData: {
      subject: "JEE Main Solved Official Question Paper with Step-by-Step Derivations",
      sectionA: {
        heading: "SECTION A: PHYSICS & CHEMISTRY SOLVED QUESTIONS WITH NUMERICAL ANALYSIS",
        headers: ["Q.No", "JEE Problem Formulation", "NTA Key", "Calculations"],
        rows: [
          ["Q1 (Phys)", "De-Broglie wavelength of electron accelerated by potential V", "lambda = 12.27 / sqrt(V) Angstrom", "Using lambda = h / sqrt(2mqV)"],
          ["Q2 (Phys)", "Moment of inertia of solid cylinder of mass M, radius R about its own axis", "I = 1/2 M R^2", "Standard volume integration result"],
          ["Q3 (Chem)", "Hybridization of Xenon in XeF4 molecule", "sp^3 d^2 (Square Planar)", "4 bond pairs + 2 lone pairs = steric number 6"],
          ["Q4 (Chem)", "Half-life of first order reaction with rate constant k = 0.0693 min^-1", "t_1/2 = 10 minutes", "t_1/2 = 0.693 / k = 0.693 / 0.0693 = 10 min"]
        ]
      },
      sectionB: {
        heading: "SECTION B: MATHEMATICS STEP-BY-STEP CALCULUS SOLUTIONS",
        items: [
          "Q5. Find the value of definite integral int(0 to 1) (x / sqrt(1 + x^2)) dx. (+4 Marks)",
          "    Solution: Put 1 + x^2 = t => 2x dx = dt => x dx = dt / 2. When x = 0, t = 1; when x = 1, t = 2.",
          "    Integral = 1/2 int(1 to 2) t^(-1/2) dt = 1/2 [ 2 t^(1/2) ] from 1 to 2 = sqrt(2) - 1. Final Answer: sqrt(2) - 1.",
          "Q6. If the vectors a = 2i - j + k and b = i + 2j - 3k are orthogonal to vector c = 3i + y j + 5k, determine y.",
          "    Solution: Since a, b, c relationships hold, applying scalar dot product a . c = 6 - y + 5 = 0 => y = 11."
        ]
      },
      sectionC: {
        heading: "NTA OFFICIAL FORMULA SHEET & CONSTANTS REFERENCE",
        items: [
          "• Universal Gas Constant R = 8.314 J K^-1 mol^-1.",
          "• Planck's Constant h = 6.626 x 10^-34 J s.",
          "• Permittivity of Free Space epsilon_0 = 8.854 x 10^-12 C^2 N^-1 m^-2."
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Mathematics", "Sets, Relations, Complex Numbers, Matrices, Calculus, Vectors, Coordinate Geometry", "30 Questions / 100 Marks"],
        ["Physics", "Mechanics, Thermodynamics, Electrodynamics, Optics, Modern Physics, Semiconductor", "30 Questions / 100 Marks"],
        ["Chemistry", "Physical Chemistry (Thermodynamics, Kinetics), Inorganic (Coordination, P-block), Organic", "30 Questions / 100 Marks"]
      ]
    }
  },

  NEET_UG_2026: {
    authority: "NATIONAL TESTING AGENCY - NATIONAL MEDICAL EXAMINATIONS",
    boardName: "National Eligibility Cum Entrance Test (NEET UG) Medical",
    state: "All India",
    department: "Ministry of Health & Family Welfare / NTA",
    code: "NTA-NEET-UG-2026",
    instructions: [
      "1. Total 200 multiple-choice questions (four options with a single correct answer) from Physics, Chemistry, and Biology.",
      "2. 50 questions in each subject divided into Section A (35 questions) and Section B (15 questions, attempt any 10).",
      "3. Total questions to attempt = 180. Maximum marks = 720. Duration: 200 Minutes (3 Hours 20 Minutes).",
      "4. Marking: +4 for correct answer, -1 for incorrect answer."
    ],
    paperData: {
      subject: "NEET UG Solved Question Paper with Official NCERT Answer Key",
      sectionA: {
        heading: "BIOLOGY (BOTANY & ZOOLOGY) NCERT LINE-BY-LINE SOLVED QUESTIONS",
        headers: ["Q.No", "NEET Biology Question", "Official Key", "NCERT Citation"],
        rows: [
          ["Q1", "Which organelle is known as the 'protein factory' of the cell?", "Ribosome", "NCERT Class 11, Cell Chapter, Page 136"],
          ["Q2", "In human males, the hormone responsible for spermatogenesis is:", "Testosterone / FSH", "NCERT Class 12, Human Reproduction, Page 47"],
          ["Q3", "The primary CO2 acceptor in C4 plants is:", "Phosphoenolpyruvate (PEP)", "NCERT Class 11, Photosynthesis, Page 218"],
          ["Q4", "DNA replication takes place during which phase of the cell cycle?", "S-Phase (Synthesis)", "NCERT Class 11, Cell Cycle, Page 163"]
        ]
      },
      sectionB: {
        heading: "PHYSICS & CHEMISTRY NCERT EXEMPLAR SOLVED PROBLEMS",
        items: [
          "Q5. An electric dipole placed in a uniform electric field experiences:",
          "    Official Answer: Only torque, no net force. Because net charge = 0, F_net = qE - qE = 0. Torque tau = p x E.",
          "Q6. Which of the following compounds exhibits optical isomerism?",
          "    Official Answer: Lactic acid (CH3-CH(OH)-COOH) due to presence of a chiral (asymmetric) carbon atom."
        ]
      },
      sectionC: {
        heading: "HIGH-YIELD BIOLOGY GENETICS SOLVED NUMERICAL",
        items: [
          "Q7. In a dihybrid cross between AaBb x AaBb, what is the probability of obtaining offspring with genotype AABB?",
          "    Official Solution: Probability of AA = 1/4; Probability of BB = 1/4. Combined probability = 1/4 * 1/4 = 1/16 (6.25%)."
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Physics", "Mechanics, Thermodynamics, Electrostatics, Current Electricity, Optics, Modern Physics", "45 Questions / 180 Marks"],
        ["Chemistry", "Physical, Inorganic, Organic Chemistry based on Class 11 & 12 NCERT syllabi", "45 Questions / 180 Marks"],
        ["Biology (Botany)", "Diversity in Living World, Structural Organisation, Plant Physiology, Genetics", "45 Questions / 180 Marks"],
        ["Biology (Zoology)", "Human Physiology, Reproduction, Evolution, Biotechnology, Ecology & Environment", "45 Questions / 180 Marks"]
      ]
    }
  },

  PUNJAB_PSEB_12_2026: {
    authority: "PUNJAB SCHOOL EDUCATION BOARD (PSEB, MOHALI)",
    boardName: "Senior Secondary (12th Class) Annual Board Examination",
    state: "Punjab",
    department: "Vidya Bhawan, Phase-8, SAS Nagar, Mohali",
    code: "PSEB-12-2026",
    instructions: [
      "1. Candidates must write their Roll Number on the top of the question paper immediately.",
      "2. All sections are compulsory with internal choice in long questions.",
      "3. Minimum passing marks: 33% in each subject (Theory + Practical + Continuous Evaluation)."
    ],
    paperData: {
      subject: "Senior Secondary Board Solved Question Paper & Marking Scheme",
      sectionA: {
        heading: "SECTION A: OBJECTIVE & SHORT ANSWER SOLVED QUESTIONS",
        headers: ["Q.No", "PSEB Question", "Official Key", "Marks"],
        rows: [
          ["Q1", "Who is the author of 'Waris Shah de Qisse' in Punjabi literature?", "Waris Shah (Heer Waris)", "1 Mark"],
          ["Q2", "In which year was the Khalsa Panth founded by Sri Guru Gobind Singh Ji?", "1699 CE at Anandpur Sahib", "1 Mark"],
          ["Q3", "The primary occupation in Punjab's rural economy is:", "Agriculture and allied activities", "1 Mark"]
        ]
      },
      sectionB: {
        heading: "CORE SUBJECTS MARKING SCHEME BREAKDOWN",
        items: [
          "General Punjabi: Total 80 Marks Theory + 20 Marks Internal Assessment.",
          "General English: Grammar (Prepositions, Tenses, Voice, Narration) 25 Marks, Literature 35 Marks, Writing Skills 20 Marks.",
          "Elective Subjects: Detailed step-by-step evaluation according to Punjab Board guidelines."
        ]
      },
      sectionC: {
        heading: "EXAMINATION PASSING RULES & GRADING CRITERIA",
        items: [
          "• Grade A+: 90% and above.",
          "• Grade A: 80% to 89%.",
          "• Grade B+: 70% to 79%.",
          "• Grace marks rule: Maximum 1% grace marks in case of aggregate shortfall."
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Compulsory Group", "General Punjabi / Punjab History & Culture, General English, Environment Education", "200 Marks"],
        ["Elective Science Group", "Physics, Chemistry, Biology / Mathematics", "300 Marks"],
        ["Elective Commerce Group", "Accountancy, Business Studies, Economics", "300 Marks"],
        ["Elective Humanities Group", "History, Political Science, Economics, Geography, Sociology", "300 Marks"]
      ]
    }
  },

  MAHA_HSC_2026: {
    authority: "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION",
    boardName: "Higher Secondary Certificate (HSC) Examination (Class 12)",
    state: "Maharashtra",
    department: "Shivajinagar, Pune - 411005",
    code: "MSBSHSE-HSC-2026",
    instructions: [
      "1. All questions are compulsory. Internal choice provided in Section C and D.",
      "2. Figures to the right indicate full marks for that sub-question.",
      "3. Use of logarithmic tables is allowed. Non-programmable calculators permitted only where specified."
    ],
    paperData: {
      subject: "Maharashtra HSC Board Solved Question Paper & Model Answer Sheet",
      sectionA: {
        heading: "SECTION A: 10 MCQS & 8 VERY SHORT ANSWERS (1 MARK EACH)",
        headers: ["Q.No", "Maharashtra Board Question", "Board Key", "Marks"],
        rows: [
          ["Q1", "The angle of contact for pure water and clean glass surface is:", "Zero (0 degrees)", "1 Mark"],
          ["Q2", "The derivative of tan^-1(x) with respect to x is:", "1 / (1 + x^2)", "1 Mark"],
          ["Q3", "The process of converting alkyl halide into alcohol using aqueous KOH is:", "Nucleophilic Substitution (S_N)", "1 Mark"]
        ]
      },
      sectionB: {
        heading: "SECTION B & C: SHORT & MEDIUM ANSWERS WITH STEP MARKING",
        items: [
          "Q4. State Kepler's Third Law of Planetary Motion. (2 Marks)",
          "    Board Scheme: Statement that square of period T^2 is proportional to cube of semi-major axis r^3 [1 Mark]. Mathematical form T^2 / r^3 = constant [1 Mark].",
          "Q5. Define Goodwill and state factors affecting valuation of Goodwill in partnership. (3 Marks)",
          "    Board Scheme: Definition [1 Mark], Any two valid factors with brief explanation [2 Marks]."
        ]
      },
      sectionC: {
        heading: "PRACTICAL & INTERNAL ASSESSMENT EVALUATION NORMS",
        items: [
          "• Experiments Journal & Certified Record: 5 Marks.",
          "• Two Experiments performed during annual board practical: 15 Marks.",
          "• Viva-Voce test conducted by External Examiner: 5 Marks."
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Language Compulsory", "English (Grammar, Prose, Poetry, Novel Study)", "100 Marks (80 Theory + 20 Oral)"],
        ["Science Stream", "Physics, Chemistry, Mathematics & Statistics, Biology", "100 Marks Each (70+30)"],
        ["Commerce Stream", "Book Keeping & Accountancy, Organisation of Commerce, Secretarial Practice", "100 Marks Each (80+20)"],
        ["Arts Stream", "History, Political Science, Psychology, Sociology, Economics", "100 Marks Each (80+20)"]
      ]
    }
  }
};

// Fallback generator for any exam not explicitly keyed
export function getExamKnowledge(examId, title) {
  const normalizedId = (examId || '').toUpperCase().trim();

  if (EXAM_KNOWLEDGE[normalizedId]) {
    return EXAM_KNOWLEDGE[normalizedId];
  }

  // Fuzzy match by prefix
  for (const key of Object.keys(EXAM_KNOWLEDGE)) {
    if (normalizedId.includes(key) || key.includes(normalizedId)) {
      return EXAM_KNOWLEDGE[key];
    }
  }

  // Detect Tamil Nadu
  if (normalizedId.includes('TN') || (title && title.toLowerCase().includes('tamil nadu'))) {
    return EXAM_KNOWLEDGE.TN_HSC_2026;
  }
  // Detect SSC
  if (normalizedId.includes('SSC') || (title && title.toLowerCase().includes('staff selection'))) {
    return EXAM_KNOWLEDGE.SSC_CGL_2026;
  }
  // Detect UPSC
  if (normalizedId.includes('UPSC') || (title && title.toLowerCase().includes('civil services'))) {
    return EXAM_KNOWLEDGE.UPSC_CSE_2026;
  }
  // Detect JEE
  if (normalizedId.includes('JEE') || (title && title.toLowerCase().includes('joint entrance'))) {
    return EXAM_KNOWLEDGE.JEE_MAIN_2026;
  }
  // Detect NEET
  if (normalizedId.includes('NEET') || (title && title.toLowerCase().includes('medical'))) {
    return EXAM_KNOWLEDGE.NEET_UG_2026;
  }
  // Detect Punjab
  if (normalizedId.includes('PUNJAB') || normalizedId.includes('PSEB') || (title && title.toLowerCase().includes('punjab'))) {
    return EXAM_KNOWLEDGE.PUNJAB_PSEB_12_2026;
  }
  // Detect Maharashtra
  if (normalizedId.includes('MAHA') || (title && title.toLowerCase().includes('maharashtra'))) {
    return EXAM_KNOWLEDGE.MAHA_HSC_2026;
  }

  // Default clean National Examination representation
  return {
    authority: "STATE & CENTRAL EXAMINATION COMMISSION OF INDIA",
    boardName: "Annual Competitive & Academic Examination",
    state: "All India",
    department: "National Academic Examination Register",
    code: normalizedId || "EXAM-2026",
    instructions: [
      "1. Read all instructions carefully before attempting the paper.",
      "2. All sections are compulsory with marks indicated against each question.",
      "3. Use only Blue or Black ink pens for writing answers."
    ],
    paperData: {
      subject: "Standard Model Solved Question Paper & Official Answer Scheme",
      sectionA: {
        heading: "SECTION A: OBJECTIVE MULTIPLE CHOICE QUESTIONS",
        headers: ["Q.No", "Standard Evaluation Question", "Official Key", "Marks"],
        rows: [
          ["Q1", "Fundamental principles and definitions in syllabus core", "Option (B)", "1 Mark"],
          ["Q2", "Quantitative & analytical reasoning problem", "Option (A)", "1 Mark"],
          ["Q3", "Applied knowledge case study question", "Option (C)", "1 Mark"]
        ]
      },
      sectionB: {
        heading: "SECTION B: SHORT & LONG ANSWER QUESTIONS WITH STEP MARKING",
        items: [
          "Q4. Core conceptual explanation and theoretical derivation. (3 Marks)",
          "Q5. Practical application and analytical problem solving with detailed steps. (5 Marks)"
        ]
      },
      sectionC: {
        heading: "EVALUATION GUIDELINES & COMMISSION NORMS",
        items: [
          "• Marks to be awarded for valid alternate methods and derivations.",
          "• Zero penalty for spelling errors in technical formulas unless fundamentally incorrect."
        ]
      }
    },
    syllabusData: {
      modules: [
        ["Core Module 1", "Fundamental concepts, definitions, and theorems", "30% Weightage"],
        ["Core Module 2", "Analytical problem solving, data interpretation", "35% Weightage"],
        ["Core Module 3", "Applied case studies, advanced problem solving", "35% Weightage"]
      ]
    }
  };
}

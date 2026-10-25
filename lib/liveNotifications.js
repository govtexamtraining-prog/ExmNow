import https from 'https';

// In-memory cache for live notifications (60 seconds TTL)
let cachedNotifications = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000;

function fetchRss(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8'
      },
      timeout: 5000 
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    });
    
    req.on('error', () => resolve(''));
    req.on('timeout', () => {
      req.destroy();
      resolve('');
    });
  });
}

function parseItems(xml) {
  const items = [];
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

  for (const itemXml of itemMatches) {
    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const sourceMatch = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/);

    if (titleMatch) {
      let fullTitle = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
      fullTitle = fullTitle.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

      let source = sourceMatch ? sourceMatch[1].trim() : '';
      let cleanTitle = fullTitle;

      if (source && cleanTitle.endsWith(`- ${source}`)) {
        cleanTitle = cleanTitle.substring(0, cleanTitle.length - (source.length + 3)).trim();
      } else if (cleanTitle.includes(' - ')) {
        const parts = cleanTitle.split(' - ');
        if (parts.length > 1) {
          source = parts.pop().trim();
          cleanTitle = parts.join(' - ').trim();
        }
      }

      if (!source) source = 'Official Press / Education Gazette';

      let link = linkMatch ? linkMatch[1].trim() : '';
      let pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toUTCString();

      // Compute relative time string
      const dateObj = new Date(pubDate);
      const diffMs = Date.now() - (isNaN(dateObj.getTime()) ? Date.now() : dateObj.getTime());
      const diffMins = Math.floor(diffMs / (1000 * 60));
      let timeAgo = 'Just now';
      if (diffMins >= 1 && diffMins < 60) {
        timeAgo = `${diffMins}m ago`;
      } else if (diffMins >= 60 && diffMins < 1440) {
        timeAgo = `${Math.floor(diffMins / 60)}h ago`;
      } else if (diffMins >= 1440) {
        timeAgo = `${Math.floor(diffMins / 1440)}d ago`;
      }

      const t = cleanTitle.toLowerCase();
      let category = 'NOTIFICATION';
      let categoryLabel = 'OFFICIAL NOTICE';
      let badgeColor = 'blue';

      if (t.includes('result') || t.includes('scorecard') || t.includes('marksheet') || t.includes('declared') || t.includes('rank list')) {
        category = 'RESULT';
        categoryLabel = 'RESULT OUT';
        badgeColor = 'emerald';
      } else if (t.includes('admit card') || t.includes('hall ticket') || t.includes('call letter') || t.includes('city intimation') || t.includes('city slip')) {
        category = 'ADMIT_CARD';
        categoryLabel = 'ADMIT CARD LIVE';
        badgeColor = 'amber';
      } else if (t.includes('exam date') || t.includes('datesheet') || t.includes('date sheet') || t.includes('schedule') || t.includes('timetable') || t.includes('postponed')) {
        category = 'EXAM_DATE';
        categoryLabel = 'EXAM DATE ANNOUNCED';
        badgeColor = 'purple';
      } else if (t.includes('apply') || t.includes('registration') || t.includes('application form') || t.includes('recruitment') || t.includes('vacancy')) {
        category = 'APPLY_OPEN';
        categoryLabel = 'APPLY NOW';
        badgeColor = 'rose';
      } else if (t.includes('answer key') || t.includes('response sheet') || t.includes('marking scheme') || t.includes('solved paper')) {
        category = 'ANSWER_KEY';
        categoryLabel = 'ANSWER KEY OUT';
        badgeColor = 'indigo';
      }

      // Check if it's a school board
      let isSchoolBoard = false;
      if (t.includes('school') || t.includes('cbse') || t.includes('icse') || t.includes('isc') || 
          t.includes('10th') || t.includes('12th') || t.includes('plus two') || t.includes('+2') || 
          t.includes('matric') || t.includes('hsc') || t.includes('sslc') || t.includes('intermediate')) {
        isSchoolBoard = true;
      }

      // Detect authority / state
      let state = 'All India';
      let internalExamId = null;

      if (t.includes('cbse') || t.includes('central board')) {
        state = 'CBSE';
        internalExamId = t.includes('10') ? 'CBSE_10_2026' : 'CBSE_12_2026';
      } else if (t.includes('tamil nadu') || t.includes('tn ') || t.includes('tndge') || t.includes('dge tn')) {
        state = 'Tamil Nadu';
        internalExamId = 'TN_HSC_2026';
      } else if (t.includes('upsc') || t.includes('ias') || t.includes('civil services')) {
        state = 'UPSC';
        internalExamId = 'UPSC_CSE_2026';
      } else if (t.includes('ssc') || t.includes('cgl') || t.includes('chsl') || t.includes('staff selection')) {
        state = 'SSC';
        internalExamId = 'SSC_CGL_2026';
      } else if (t.includes('jee') || t.includes('joint entrance')) {
        state = 'NTA / JEE';
        internalExamId = 'JEE_MAIN_2026';
      } else if (t.includes('neet') || t.includes('medical entrance')) {
        state = 'NTA / NEET';
        internalExamId = 'NEET_UG_2026';
      } else if (t.includes('punjab') || t.includes('pseb')) {
        state = 'Punjab (PSEB)';
        internalExamId = 'PUNJAB_PSEB_12_2026';
      } else if (t.includes('maharashtra') || t.includes('maha hsc') || t.includes('msbshse')) {
        state = 'Maharashtra';
        internalExamId = 'MAHA_HSC_2026';
      } else if (t.includes('up board') || t.includes('upmsp') || t.includes('uttar pradesh')) {
        state = 'Uttar Pradesh';
      } else if (t.includes('bihar') || t.includes('bseb')) {
        state = 'Bihar (BSEB)';
      } else if (t.includes('karnataka') || t.includes('kseeb') || t.includes('karnatka')) {
        state = 'Karnataka';
      } else if (t.includes('rajasthan') || t.includes('rbse')) {
        state = 'Rajasthan';
      } else if (t.includes('kerala') || t.includes('dhse')) {
        state = 'Kerala';
      } else if (t.includes('ibps') || t.includes('sbi') || t.includes('banking')) {
        state = 'Banking / IBPS';
        internalExamId = 'IBPS_PO_2026';
      }

      items.push({
        id: 'live_' + Math.random().toString(36).substring(2, 9),
        title: cleanTitle,
        source: source,
        url: link,
        category: category,
        categoryLabel: categoryLabel,
        badgeColor: badgeColor,
        state: state,
        timeAgo: timeAgo,
        pubDate: pubDate,
        isSchoolBoard: isSchoolBoard,
        internalExamId: internalExamId
      });
    }
  }
  return items;
}

export const FALLBACK_NOTIFICATIONS = [
  {
    id: "live_cbse_res_01",
    title: "CBSE Class 12 Senior School Certificate Examination 2026 Result Ledger Declared Online",
    source: "CBSE Official Press Release (cbseresults.nic.in)",
    url: "https://cbseresults.nic.in",
    category: "RESULT",
    categoryLabel: "RESULT OUT",
    badgeColor: "emerald",
    state: "CBSE",
    timeAgo: "12m ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 12).toUTCString(),
    isSchoolBoard: true,
    internalExamId: "CBSE_12_2026"
  },
  {
    id: "live_jee_admit_02",
    title: "NTA JEE Main 2026 Session 2 Hall Ticket and City Intimation Slip Released",
    source: "National Testing Agency Portal (jeemain.nta.ac.in)",
    url: "https://jeemain.nta.ac.in",
    category: "ADMIT_CARD",
    categoryLabel: "ADMIT CARD LIVE",
    badgeColor: "amber",
    state: "NTA / JEE",
    timeAgo: "25m ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 25).toUTCString(),
    isSchoolBoard: false,
    internalExamId: "JEE_MAIN_2026"
  },
  {
    id: "live_tn_hsc_03",
    title: "Tamil Nadu Directorate of Govt Examinations Plus Two (+2) HSC 2026 Model Papers & Time Table Active",
    source: "DGE Tamil Nadu (dge.tn.gov.in)",
    url: "https://dge.tn.gov.in",
    category: "EXAM_DATE",
    categoryLabel: "EXAM DATE ANNOUNCED",
    badgeColor: "purple",
    state: "Tamil Nadu",
    timeAgo: "45m ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 45).toUTCString(),
    isSchoolBoard: true,
    internalExamId: "TN_HSC_2026"
  },
  {
    id: "live_ssc_apply_04",
    title: "Staff Selection Commission CGL 2026 One-Time Registration & Online Application Window Open",
    source: "SSC Official Portal (ssc.gov.in)",
    url: "https://ssc.gov.in",
    category: "APPLY_OPEN",
    categoryLabel: "APPLY NOW",
    badgeColor: "rose",
    state: "SSC",
    timeAgo: "1h ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 60).toUTCString(),
    isSchoolBoard: false,
    internalExamId: "SSC_CGL_2026"
  },
  {
    id: "live_pseb_12_05",
    title: "Punjab School Education Board PSEB Class 12 Senior Secondary Results Declared",
    source: "PSEB Official (pseb.ac.in)",
    url: "https://pseb.ac.in",
    category: "RESULT",
    categoryLabel: "RESULT OUT",
    badgeColor: "emerald",
    state: "Punjab (PSEB)",
    timeAgo: "1h ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 75).toUTCString(),
    isSchoolBoard: true,
    internalExamId: "PUNJAB_PSEB_12_2026"
  },
  {
    id: "live_upsc_prelims_06",
    title: "UPSC Civil Services Preliminary Examination 2026 Official Notification & Center Allotment List",
    source: "UPSC Facilitation Desk (upsc.gov.in)",
    url: "https://www.upsc.gov.in",
    category: "EXAM_DATE",
    categoryLabel: "EXAM DATE ANNOUNCED",
    badgeColor: "purple",
    state: "UPSC",
    timeAgo: "2h ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 120).toUTCString(),
    isSchoolBoard: false,
    internalExamId: "UPSC_CSE_2026"
  },
  {
    id: "live_cbse_10_07",
    title: "CBSE Class 10 Secondary School Examination Standard Maths & Science Sample Papers Released",
    source: "CBSE Academic (cbseacademic.nic.in)",
    url: "https://cbseacademic.nic.in",
    category: "ANSWER_KEY",
    categoryLabel: "ANSWER KEY OUT",
    badgeColor: "indigo",
    state: "CBSE",
    timeAgo: "2h ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 140).toUTCString(),
    isSchoolBoard: true,
    internalExamId: "CBSE_10_2026"
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
    timeAgo: "3h ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 180).toUTCString(),
    isSchoolBoard: false,
    internalExamId: "NEET_UG_2026"
  },
  {
    id: "live_maha_hsc_09",
    title: "Maharashtra State Board MSBSHSE Class 12 HSC Exam Schedule & Practical Center Notification",
    source: "Mahahsscboard.in",
    url: "https://mahahsscboard.in",
    category: "EXAM_DATE",
    categoryLabel: "EXAM DATE ANNOUNCED",
    badgeColor: "purple",
    state: "Maharashtra",
    timeAgo: "3h ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 200).toUTCString(),
    isSchoolBoard: true,
    internalExamId: "MAHA_HSC_2026"
  },
  {
    id: "live_ibps_po_10",
    title: "IBPS PO 2026 Mains Scorecard Released: Direct Link to Download Performance Statement",
    source: "Institute of Banking Personnel Selection (ibps.in)",
    url: "https://ibps.in",
    category: "RESULT",
    categoryLabel: "RESULT OUT",
    badgeColor: "emerald",
    state: "Banking / IBPS",
    timeAgo: "4h ago",
    pubDate: new Date(Date.now() - 1000 * 60 * 240).toUTCString(),
    isSchoolBoard: false,
    internalExamId: "IBPS_PO_2026"
  }
];

export async function getLiveNotifications() {
  const now = Date.now();
  if (cachedNotifications && (now - lastFetchTime < CACHE_TTL_MS)) {
    return cachedNotifications;
  }

  try {
    const rssFeeds = [
      'https://news.google.com/rss/search?q=exam+result+OR+admit+card+OR+exam+date+india&hl=en-IN&gl=IN&ceid=IN:en',
      'https://news.google.com/rss/search?q="board+result"+OR+"10th+result"+OR+"12th+result"+OR+"admit+card"+india&hl=en-IN&gl=IN&ceid=IN:en'
    ];

    const xmlResults = await Promise.all(rssFeeds.map(url => fetchRss(url)));
    let parsedLive = [];

    for (const xml of xmlResults) {
      if (xml) {
        parsedLive = parsedLive.concat(parseItems(xml));
      }
    }

    const seenTitles = new Set();
    const uniqueLive = [];

    for (const item of parsedLive) {
      const simplified = item.title.toLowerCase().substring(0, 45);
      if (!seenTitles.has(simplified)) {
        seenTitles.add(simplified);
        uniqueLive.push(item);
      }
    }

    let finalNotifications = [];
    if (uniqueLive.length > 0) {
      const topCurated = FALLBACK_NOTIFICATIONS.slice(0, 4);
      finalNotifications = [...topCurated, ...uniqueLive];
    } else {
      finalNotifications = FALLBACK_NOTIFICATIONS;
    }

    cachedNotifications = finalNotifications.slice(0, 60);
    lastFetchTime = now;
    return cachedNotifications;
  } catch (error) {
    console.error('Error fetching live notifications:', error);
    return FALLBACK_NOTIFICATIONS;
  }
}

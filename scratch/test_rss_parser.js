const https = require('https');

function fetchRss(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', e => resolve(''));
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
      let title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
      title = title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      
      let link = linkMatch ? linkMatch[1].trim() : '';
      let pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
      let source = sourceMatch ? sourceMatch[1].trim() : 'Official Education News';

      // Detect category
      const t = title.toLowerCase();
      let category = 'NOTIFICATION';
      let badgeColor = 'blue';

      if (t.includes('result') || t.includes('scorecard') || t.includes('marksheet')) {
        category = 'RESULT';
        badgeColor = 'emerald';
      } else if (t.includes('admit card') || t.includes('hall ticket') || t.includes('call letter')) {
        category = 'ADMIT_CARD';
        badgeColor = 'amber';
      } else if (t.includes('exam date') || t.includes('datesheet') || t.includes('date sheet') || t.includes('schedule') || t.includes('timetable')) {
        category = 'EXAM_DATE';
        badgeColor = 'purple';
      } else if (t.includes('apply') || t.includes('registration') || t.includes('application form')) {
        category = 'APPLY_OPEN';
        badgeColor = 'rose';
      } else if (t.includes('answer key') || t.includes('response sheet')) {
        category = 'ANSWER_KEY';
        badgeColor = 'indigo';
      }

      // Detect state or authority
      let state = 'All India';
      if (t.includes('cbse')) state = 'CBSE';
      else if (t.includes('tamil nadu') || t.includes('tn ') || t.includes('tndge')) state = 'Tamil Nadu';
      else if (t.includes('upsc') || t.includes('ias')) state = 'UPSC';
      else if (t.includes('ssc')) state = 'SSC';
      else if (t.includes('nta') || t.includes('jee') || t.includes('neet') || t.includes('cuet')) state = 'NTA / Central';
      else if (t.includes('maharashtra') || t.includes('maha')) state = 'Maharashtra';
      else if (t.includes('up board') || t.includes('upmsp') || t.includes('uttar pradesh')) state = 'Uttar Pradesh';
      else if (t.includes('bihar') || t.includes('bseb')) state = 'Bihar';
      else if (t.includes('punjab') || t.includes('pseb')) state = 'Punjab';
      else if (t.includes('rajasthan') || t.includes('rbse')) state = 'Rajasthan';
      else if (t.includes('karnataka') || t.includes('kseeb')) state = 'Karnataka';
      else if (t.includes('kerala')) state = 'Kerala';
      else if (t.includes('bengal') || t.includes('wbbse')) state = 'West Bengal';

      items.push({
        id: 'rss_' + Math.random().toString(36).substr(2, 9),
        title,
        link,
        pubDate,
        source,
        category,
        badgeColor,
        state,
        isLive: true
      });
    }
  }
  return items;
}

async function run() {
  const xml = await fetchRss('https://news.google.com/rss/search?q=exam+result+OR+admit+card+OR+exam+date+india&hl=en-IN&gl=IN&ceid=IN:en');
  const items = parseItems(xml);
  console.log('Parsed total items:', items.length);
  console.log('Sample 3 items:', JSON.stringify(items.slice(0, 3), null, 2));
}

run();

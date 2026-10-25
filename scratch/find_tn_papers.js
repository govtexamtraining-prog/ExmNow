const https = require('https');
const http = require('http');

function fetchWithRedirect(url) {
  const lib = url.startsWith('https') ? https : http;
  const agent = url.startsWith('https') ? new https.Agent({ rejectUnauthorized: false }) : undefined;
  
  lib.get(url, { agent, headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(url, '=> Status:', res.statusCode, 'Location:', res.headers.location);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      let nextUrl = res.headers.location;
      if (!nextUrl.startsWith('http')) {
        const u = new URL(url);
        nextUrl = `${u.origin}${nextUrl.startsWith('/') ? '' : '/'}${nextUrl}`;
      }
      return fetchWithRedirect(nextUrl);
    }
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const matches = data.match(/href="([^"]+)"/gi);
      console.log('Matches:', matches ? matches.slice(0, 30) : null);
    });
  });
}

fetchWithRedirect('http://www.dge.tn.gov.in/questbank/HSC/default.htm');

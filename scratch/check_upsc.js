const https = require('https');

function follow(url) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(url, '=> Status:', res.statusCode, 'Location:', res.headers.location);
    if (res.headers.location) {
      follow(res.headers.location.startsWith('http') ? res.headers.location : 'https://upsc.gov.in' + res.headers.location);
    } else {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const matches = data.match(/\/sites\/default\/files\/[^\s"'<>]+\.pdf/gi) || [];
        console.log('PDF files on page:', matches.slice(0, 10));
      });
    }
  });
}

follow('https://upsc.gov.in/examinations/previous-question-papers');

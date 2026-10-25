const http = require('http');

http.get('http://localhost:3000/api/live-notifications', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Status:', res.statusCode);
      console.log('Success:', json.success, 'Total:', json.total);
      console.log('Sample 4 notifications:');
      json.notifications.slice(0, 4).forEach((n, i) => {
        console.log((i + 1) + '. [' + n.categoryLabel + '] [' + n.state + '] ' + n.title + ' (' + n.timeAgo + ')');
      });
    } catch (e) {
      console.error('Parse error:', e.message, data.substring(0, 200));
    }
  });
}).on('error', e => console.error(e));

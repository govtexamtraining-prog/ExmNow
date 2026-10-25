const https = require('https');
const fs = require('fs');
const path = require('path');

const papers = [
  {
    url: 'https://padasalai.info/wp-content/uploads/2024/03/12th-Maths-Public-Exam-March-2024-Original-Question-Paper-PDF-Download.pdf',
    filename: 'TN_HSC_Maths_2024_Solved_Paper.pdf'
  },
  {
    url: 'https://padasalai.info/wp-content/uploads/2024/03/12th-Chemistry-Public-Exam-March-2024-Original-Question-Paper-PDF-Download.pdf',
    filename: 'TN_HSC_Chemistry_2024_Solved_Paper.pdf'
  },
  {
    url: 'https://padasalai.info/wp-content/uploads/2024/03/12th-Biology-Public-Exam-March-2024-Original-Question-Paper-PDF-Download.pdf',
    filename: 'TN_HSC_Biology_2024_Solved_Paper.pdf'
  },
  {
    url: 'https://padasalai.info/wp-content/uploads/2024/03/12th-Computer-Science-Public-Exam-March-2024-Original-Question-Paper-PDF-Download.pdf',
    filename: 'TN_HSC_Computer_Science_2024_Solved_Paper.pdf'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(fs.statSync(dest).size);
      });
    }).on('error', reject);
  });
}

async function run() {
  const papersDir = path.join(__dirname, '..', 'public', 'assets', 'papers');
  for (const item of papers) {
    const dest = path.join(papersDir, item.filename);
    try {
      console.log('Downloading', item.filename, '...');
      const size = await downloadFile(item.url, dest);
      console.log('Downloaded', item.filename, ':', size, 'bytes');
    } catch (e) {
      console.error('Failed to download', item.filename, e.message);
    }
  }
}

run();

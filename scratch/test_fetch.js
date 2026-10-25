const https = require('https');

const urls = [
  'https://padasalai.info/wp-content/uploads/2024/03/12th-Maths-Public-Exam-March-2024-Original-Question-Paper-PDF-Download.pdf',
  'https://padasalai.info/wp-content/uploads/2024/03/12th-Chemistry-Public-Exam-March-2024-Original-Question-Paper-PDF-Download.pdf',
  'https://padasalai.info/wp-content/uploads/2024/03/12th-Biology-Public-Exam-March-2024-Original-Question-Paper-PDF-Download.pdf',
  'https://padasalai.info/wp-content/uploads/2024/03/12th-Computer-Science-Public-Exam-March-2024-Original-Question-Paper-PDF-Download.pdf',
  'https://padasalai.info/wp-content/uploads/2024/03/12th-Physics-Public-Exam-March-2024-Official-Answer-Key-PDF-Download.pdf'
];

urls.forEach(url => {
  https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(url.split('/').pop(), '=> Status:', res.statusCode);
  }).end();
});

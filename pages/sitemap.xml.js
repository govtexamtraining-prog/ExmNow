import { INITIAL_EXAMS } from '../lib/mockData';
import { INDIA_STATES } from '../components/IndiaResultsStateGrid';

export async function getServerSideProps({ req, res }) {
  const host = req.headers.host || 'exmnow.com';
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = `${protocol}://${host}`;

  const currentDate = new Date().toISOString().split('T')[0];

  // Static core routes
  const staticRoutes = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'hourly' },
    { loc: `${baseUrl}/results`, priority: '1.0', changefreq: 'always' },
    { loc: `${baseUrl}/papers`, priority: '0.8', changefreq: 'daily' },
  ];

  // Dynamic Exam Hubs
  const examRoutes = INITIAL_EXAMS.map((exam) => ({
    loc: `${baseUrl}/exams/${exam.exam_id}`,
    lastmod: currentDate,
    priority: exam.status === 'RESULT' ? '0.9' : '0.8',
    changefreq: exam.status === 'RESULT' ? 'hourly' : 'daily'
  }));

  // Dynamic State Results Hubs
  const stateRoutes = INDIA_STATES.map((st) => ({
    loc: `${baseUrl}/results?state=${st.name.toUpperCase().replace(/\s+/g, '_')}`,
    lastmod: currentDate,
    priority: '0.8',
    changefreq: 'hourly'
  }));

  const allUrls = [...staticRoutes, ...examRoutes, ...stateRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : `<lastmod>${currentDate}</lastmod>`}
    <changefreq>${item.changefreq || 'daily'}</changefreq>
    <priority>${item.priority || '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}

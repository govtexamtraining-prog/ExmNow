import https from 'https';
import http from 'http';
import { URL } from 'url';

// Cache ping results for 30 seconds to prevent overloading
let pingCache = {};
let lastPingTime = 0;
const PING_CACHE_TTL = 30 * 1000;

const MONITORED_NODES = [
  { id: 'cbse', name: 'CBSE Delhi Server', host: 'cbseresults.nic.in', url: 'https://cbseresults.nic.in' },
  { id: 'tn', name: 'Tamil Nadu DGE Node', host: 'dge.tn.gov.in', url: 'https://dge.tn.gov.in' },
  { id: 'maha', name: 'Maharashtra Board Server', host: 'mahahsscboard.in', url: 'https://mahahsscboard.in' },
  { id: 'bseb', name: 'Bihar Board Primary Node', host: 'biharboardonline.com', url: 'https://biharboardonline.com' },
  { id: 'upmsp', name: 'UP Board High-Speed Server', host: 'upmsp.edu.in', url: 'https://upmsp.edu.in' },
  { id: 'neet', name: 'NTA NEET Examination Portal', host: 'neet.nta.nic.in', url: 'https://neet.nta.nic.in' },
  { id: 'ssc', name: 'SSC GoI National Gateway', host: 'ssc.gov.in', url: 'https://ssc.gov.in' },
  { id: 'upsc', name: 'UPSC Commission Portal', host: 'www.upsc.gov.in', url: 'https://www.upsc.gov.in' },
  { id: 'kseab', name: 'Karnataka KSEAB Server', host: 'kseab.karnataka.gov.in', url: 'https://kseab.karnataka.gov.in' }
];

async function pingUrl(targetUrl) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    try {
      const u = new URL(targetUrl);
      const mod = u.protocol === 'https:' ? https : http;
      const req = mod.request(u, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'ExmNow-ServerHealthRadar/2.0',
          'Accept': '*/*'
        },
        timeout: 4000,
        rejectUnauthorized: false
      }, (res) => {
        const latency = Date.now() - startTime;
        resolve({
          status: 'ONLINE',
          statusCode: res.statusCode,
          latencyMs: latency,
          loadState: latency < 200 ? 'FAST' : latency < 600 ? 'MODERATE' : 'HEAVY_TRAFFIC'
        });
      });

      req.on('error', (err) => {
        resolve({
          status: 'OFFLINE',
          statusCode: 0,
          latencyMs: 999,
          loadState: 'DOWN',
          error: err.message
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          status: 'TIMEOUT',
          statusCode: 504,
          latencyMs: 4000,
          loadState: 'OVERLOADED'
        });
      });

      req.end();
    } catch (e) {
      resolve({ status: 'ERROR', error: e.message, latencyMs: 999, loadState: 'DOWN' });
    }
  });
}

export default async function handler(req, res) {
  const now = Date.now();
  const requestedHost = req.query.host;

  if (requestedHost) {
    const url = requestedHost.startsWith('http') ? requestedHost : `https://${requestedHost}`;
    const pingResult = await pingUrl(url);
    return res.status(200).json({
      host: requestedHost,
      ...pingResult,
      timestamp: new Date().toISOString()
    });
  }

  // If cached and still fresh
  if (pingCache && Object.keys(pingCache).length > 0 && (now - lastPingTime < PING_CACHE_TTL)) {
    res.setHeader('Cache-Control', 'public, s-maxage=30');
    return res.status(200).json({
      success: true,
      cached: true,
      timestamp: new Date(lastPingTime).toISOString(),
      nodes: pingCache
    });
  }

  // Test all monitored nodes in parallel
  const results = {};
  await Promise.all(
    MONITORED_NODES.map(async (node) => {
      const ping = await pingUrl(node.url);
      results[node.host] = {
        name: node.name,
        host: node.host,
        url: node.url,
        ...ping
      };
    })
  );

  pingCache = results;
  lastPingTime = now;

  res.setHeader('Cache-Control', 'public, s-maxage=30');
  return res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    nodes: results
  });
}

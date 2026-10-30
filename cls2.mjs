import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
const cdp = await p.createCDPSession();
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await p.evaluateOnNewDocument(() => {
  window.__s = [];
  new PerformanceObserver(l => {
    for (const e of l.getEntries()) {
      if (e.hadRecentInput) continue;
      window.__s.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: e.sources.map(s => (s.node ? (s.node.className || s.node.nodeName) : '?') + '|' + Math.round(s.previousRect.y) + '->' + Math.round(s.currentRect.y)).slice(0, 3) });
    }
  }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('http://127.0.0.1:4300/samoed-taxi/', { waitUntil: 'load' });
await new Promise(r => setTimeout(r, 4000));
console.log(JSON.stringify(await p.evaluate(() => ({ total: window.__s.reduce((a, s) => a + s.v, 0).toFixed(3), list: window.__s.slice(0, 8) })), null, 1));
await b.close();

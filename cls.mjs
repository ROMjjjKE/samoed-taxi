import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await p.setUserAgent('Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Mobile Safari/537.36');
await p.evaluateOnNewDocument(() => {
  window.__shifts = [];
  new PerformanceObserver(l => {
    for (const e of l.getEntries()) {
      if (e.hadRecentInput) continue;
      window.__shifts.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: e.sources.map(s => (s.node ? (s.node.className || s.node.nodeName) : '?') + '|' + Math.round(s.previousRect.y) + '->' + Math.round(s.currentRect.y)).slice(0, 3) });
    }
  }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('https://romjjjke.github.io/samoed-taxi/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1600));
console.log(JSON.stringify(await p.evaluate(() => window.__shifts), null, 1));
await b.close();

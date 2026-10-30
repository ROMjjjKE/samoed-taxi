import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const w of [320, 390, 480, 768, 1024, 1200, 1440, 1680]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: 900 });
  await p.goto('http://127.0.0.1:4300/samoed-taxi/', { waitUntil: 'networkidle2' });
  await p.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 300));
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, inner: window.innerWidth, h1: getComputedStyle(document.querySelector('h1')).fontSize }));
  console.log(w, 'sw', r.sw, r.sw > r.inner ? 'OVERFLOW' : 'ok', 'h1', r.h1);
  await p.close();
}
await b.close();

import puppeteer from 'puppeteer-core';
const URL = 'http://127.0.0.1:4300/samoed-taxi/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const m = async (block) => {
  const p = await b.newPage();
  await p.setViewport({ width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
  if (block) { await p.setRequestInterception(true); p.on('request', r => (r.url().includes('.woff2') ? r.abort() : r.continue())); }
  await p.goto(URL, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 900));
  const res = await p.evaluate(() => {
    const q = s => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return Math.round(r.height); };
    return { plate: q('.hero__plate'), h1: q('h1'), lead: q('.lead'), actions: q('.hero__actions'), note: q('.hero__note'), steps: q('.hero__steps'), hero: q('.hero') };
  });
  await p.close();
  return res;
};
const bl = await m(true), ld = await m(false);
for (const k of Object.keys(bl)) if (bl[k] !== ld[k]) console.log(k, bl[k], '->', ld[k]);
console.log('blocked', bl); console.log('loaded ', ld);
await b.close();

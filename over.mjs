import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844 });
await p.goto('http://127.0.0.1:4300/samoed-taxi/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 500));
console.log(await p.evaluate(() => {
  const out = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.right > window.innerWidth + 1 && r.width > 0) {
      out.push({ s: el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : ''), right: Math.round(r.right), w: Math.round(r.width) });
    }
  });
  return out.slice(0, 10);
}));
await b.close();

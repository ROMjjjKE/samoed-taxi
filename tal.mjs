import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4300/samoed-taxi/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
const pre = await p.evaluate(() => Math.round(document.querySelector('#talon').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y - 400, behavior: 'instant' }), pre);
await new Promise(r => setTimeout(r, 1200));
const st = await p.evaluate(() => Math.round(document.querySelector('.talon__stage').getBoundingClientRect().top + window.scrollY));
for (const off of [40, 500, 900, 1250]) {
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), st + off);
  await new Promise(r => setTimeout(r, 700));
  console.log(off, await p.evaluate(() => ({ cls: document.querySelector('.talon').className.split(' ').pop(), y: Math.round(document.querySelector('.talon__stage').getBoundingClientRect().top), tr: document.querySelector('.talon__paper').style.transform })));
}
await b.close();

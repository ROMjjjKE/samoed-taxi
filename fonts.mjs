import puppeteer from 'puppeteer-core';
const URL = 'https://romjjjke.github.io/samoed-taxi/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });

const m = async (block) => {
  const p = await b.newPage();
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  if (block) {
    await p.setRequestInterception(true);
    p.on('request', r => (r.url().includes('.woff2') ? r.abort() : r.continue()));
  }
  await p.goto(URL, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  const res = await p.evaluate(() => {
    const h = document.querySelector('h1');
    const hero = document.querySelector('.hero');
    return { h1: Math.round(h.getBoundingClientRect().height), hero: Math.round(hero.getBoundingClientRect().height), steps: Math.round(document.querySelector('.hero__steps').getBoundingClientRect().top) };
  });
  await p.close();
  return res;
};
console.log('blocked', await m(true));
console.log('loaded ', await m(false));
await b.close();

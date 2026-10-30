import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4300/samoed-taxi/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
console.log(JSON.stringify(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Такси по заявке: адрес, время, телефон — Пинск';
  const w = f => { c.font = f; return +c.measureText(s).width.toFixed(1); };
  return {
    osw: w('500 40px Oswald'), narrow: w('500 40px "Arial Narrow"'),
    nun: w('400 40px "Nunito Sans"'), arial: w('400 40px Arial'),
    rOsw: +(w('500 40px Oswald') / w('500 40px "Arial Narrow"')).toFixed(4),
    rNun: +(w('400 40px "Nunito Sans"') / w('400 40px Arial')).toFixed(4),
    h1: document.querySelector('h1').textContent.trim(),
    talon: document.querySelectorAll('.talon__row').length,
    trips: document.querySelectorAll('.trips__item').length,
    faq: document.querySelectorAll('.faq__item').length,
  };
}), null, 1), errs);
await b.close();

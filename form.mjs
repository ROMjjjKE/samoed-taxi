import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4300/samoed-taxi/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 400));
await p.evaluate(() => document.querySelector('#zayavka').scrollIntoView());
await new Promise(r => setTimeout(r, 500));
// пустая отправка -> ошибки
await p.click('form.form button[type=submit]');
await new Promise(r => setTimeout(r, 300));
console.log('empty submit errors:', await p.evaluate(() => [...document.querySelectorAll('.field__err')].map(e => e.textContent)));
// заполняем
await p.type('#from', 'Пинск, ул. Ленина 12, подъезд 3');
await p.type('#to', 'Вокзал');
await p.click('.seg label:nth-child(2) input');
await p.type('#time', '07:30');
await p.select('#car', 'Комфорт');
await p.type('#phone', '+375 33 111-22-33');
await p.type('#note', 'нужно детское кресло');
await new Promise(r => setTimeout(r, 300));
console.log('draft:', await p.evaluate(() => [...document.querySelectorAll('.copy__row')].map(r => r.innerText.replace(/\n/g, ': '))));
console.log('status after fill:', await p.evaluate(() => document.querySelector('form.form').innerText.includes('Укажите адрес')));
await b.close();

import { useEffect, useRef, useState } from 'react';

const ROWS: Array<[string, string]> = [
  ['Подача', 'адрес и подъезд'],
  ['Куда', 'улица, район или город'],
  ['Когда', 'сейчас или ко времени'],
  ['Машина', 'любая · комфорт · минивэн'],
  ['Телефон', 'номер для связи'],
];

export default function Talon() {
  const [pin, setPin] = useState(false);
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 981px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    let st: { kill: () => void } | null = null;
    let killed = false;

    if (!desktop.matches || calm.matches) return;

    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      window.setTimeout(() => {
        if (killed) return;
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
          if (killed || !sec.current || !stage.current) return;
          gsap.registerPlugin(ScrollTrigger);
          setPin(true);
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            const t = ScrollTrigger.create({
              trigger: stage.current!,
              start: 'top top',
              end: () => '+=' + Math.round(window.innerHeight * 1.4),
              pin: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                const k = Math.min(1, Math.max(0, (p - 0.04) / 0.8));
                if (paper.current) paper.current.style.transform = `translate3d(0, ${(1 - k) * 100}%, 0)`;
                if (hint.current) hint.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.72) / 0.2)));
              },
            });
            st = t as unknown as { kill: () => void };
          });
        });
      }, 80);
    }, { rootMargin: '320px 0px' });
    if (sec.current) io.observe(sec.current);

    return () => {
      killed = true;
      io.disconnect();
      if (st) st.kill();
    };
  }, []);

  return (
    <section className={`talon ${pin ? 'talon--pin' : 'talon--manual'}`} id="talon" ref={sec} aria-labelledby="talon-h">
      <div className="talon__stage" ref={stage}>
        <div className="wrap talon__grid">
          <div className="talon__side">
            <span className="talon__count">01 / ЗАЯВКА</span>
            <h2 id="talon-h" style={{ marginTop: 12 }}>Одна заявка вместо десяти вопросов</h2>
            <p>
              Пять полей — и диспетчеру не нужно ничего выяснять по телефону. Адрес, время и телефон
              попадают к нам вместе, поэтому поездка подтверждается одним звонком.
            </p>
            <p className="talon__hint" ref={hint}>
              Если что-то поменяется — скажите при подтверждении, заявка правится без нового круга.
            </p>
          </div>
          <div className="talon__slit">
            <div className="talon__mask">
              <div className="talon__paper" ref={paper}>
                <div className="talon__head">
                  <span className="talon__brand">Заявка на поездку</span>
                  <span className="talon__no">САМОЕДАВТО · ПИНСК</span>
                </div>
                {ROWS.map(([k, v]) => (
                  <div className="talon__row" key={k}>
                    <span className="talon__k">{k}</span>
                    <span className="talon__v talon__v--empty">{v}</span>
                  </div>
                ))}
                <div className="talon__foot">
                  <span aria-hidden="true" className="checker checker--soft" style={{ flex: 1 }} />
                  <span>подтверждение — звонком</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

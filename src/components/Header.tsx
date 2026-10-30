import { useEffect, useRef } from 'react';

const PHONE = '+375 33 336-01-04';
const TEL = 'tel:+375333360104';

export default function Header() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="checker" aria-hidden="true" />
      <header className="hdr">
        <div className="hdr__bar">
          <a className="hdr__brand" href="#top">
            <span className="hdr__name">СамоедАвто</span>
            <span className="hdr__dot" aria-hidden="true" />
            <span className="hdr__city">такси · Пинск</span>
          </a>
          <nav className="hdr__nav" aria-label="Разделы">
            <a href="#zayavka">Заявка</a>
            <a href="#poezdki">Поездки</a>
            <a href="#voprosy">Вопросы</a>
          </nav>
          <a className="hdr__phone" href={TEL}>{PHONE}</a>
        </div>
        <span className="hdr__progress" ref={bar} aria-hidden="true" />
      </header>
    </>
  );
}

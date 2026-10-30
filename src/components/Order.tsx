import { useMemo, useState } from 'react';

const PHONE = '+375 33 336-01-04';
const WA = 'https://wa.me/375333360104';
const CARS = ['Любая', 'Комфорт', 'Минивэн'];

type Form = {
  from: string; to: string; when: 'now' | 'time'; time: string;
  car: string; phone: string; note: string;
};

const EMPTY: Form = { from: '', to: '', when: 'now', time: '', car: 'Любая', phone: '', note: '' };

export default function Order() {
  const [f, setF] = useState<Form>(EMPTY);
  const [err, setErr] = useState<{ from?: boolean; phone?: boolean; time?: boolean }>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setF((prev) => ({ ...prev, [k]: v }));
    setSent(false);
  };

  const text = useMemo(() => {
    const when = f.when === 'now' ? 'сейчас' : f.time ? `ко времени ${f.time}` : 'ко времени';
    return [
      'Заявка на такси · СамоедАвто',
      `Подача: ${f.from || '—'}`,
      `Куда: ${f.to || '—'}`,
      `Когда: ${when}`,
      `Машина: ${f.car}`,
      f.note.trim() ? `Комментарий: ${f.note.trim()}` : '',
      `Телефон: ${f.phone || '—'}`,
    ].filter(Boolean).join('\n');
  }, [f]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      from: !f.from.trim(),
      phone: f.phone.replace(/\D/g, '').length < 9,
      time: f.when === 'time' && !f.time,
    };
    setErr(next);
    if (next.from || next.phone || next.time) return;
    window.open(`${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section className="section order" id="zayavka">
      <div className="wrap">
        <div className="micro micro--muted">03 / заявка</div>
        <h2 style={{ marginTop: 12, fontSize: 'var(--fs-44)', maxWidth: '13em' }}>Оставьте заявку на поездку</h2>

        <div className="order__grid" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
          <form className="form" onSubmit={submit} noValidate>
            <div className={`field${err.from ? ' field--err' : ''}`}>
              <label htmlFor="from">Откуда (адрес и подъезд)</label>
              <input id="from" name="from" value={f.from} autoComplete="street-address"
                placeholder="Пинск, ул. Ленина 12, подъезд 3"
                onChange={(e) => set('from', e.target.value)}
                aria-invalid={!!err.from} aria-describedby={err.from ? 'from-err' : undefined} />
              {err.from && <span className="field__err" id="from-err">Укажите адрес подачи — без него не найдём вас</span>}
            </div>

            <div className="field">
              <label htmlFor="to">Куда</label>
              <input id="to" name="to" value={f.to} placeholder="улица, район или город"
                onChange={(e) => set('to', e.target.value)} />
            </div>

            <div className="half">
              <div className="field">
                <label id="when-label">Когда</label>
                <div className="seg" role="group" aria-labelledby="when-label">
                  <label><input type="radio" name="when" checked={f.when === 'now'} onChange={() => set('when', 'now')} />Сейчас</label>
                  <label><input type="radio" name="when" checked={f.when === 'time'} onChange={() => set('when', 'time')} />Ко времени</label>
                </div>
              </div>
              <div className={`field${err.time ? ' field--err' : ''}`}>
                <label htmlFor="time">Время</label>
                <input id="time" name="time" type="time" value={f.time} disabled={f.when !== 'time'}
                  aria-invalid={!!err.time} aria-describedby={err.time ? 'time-err' : undefined}
                  onChange={(e) => set('time', e.target.value)} />
                {err.time && <span className="field__err" id="time-err">Выберите час подачи или переключите на «Сейчас»</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="car">Машина</label>
              <select id="car" name="car" value={f.car} onChange={(e) => set('car', e.target.value)}>
                {CARS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className={`field${err.phone ? ' field--err' : ''}`}>
              <label htmlFor="phone">Телефон для связи</label>
              <input id="phone" name="phone" type="tel" value={f.phone} autoComplete="tel"
                placeholder="+375 33 000-00-00" inputMode="tel"
                onChange={(e) => set('phone', e.target.value)}
                aria-invalid={!!err.phone} aria-describedby={err.phone ? 'phone-err' : undefined} />
              {err.phone && <span className="field__err" id="phone-err">Проверьте номер: нужно не меньше 9 цифр</span>}
            </div>

            <div className="field">
              <label htmlFor="note">Комментарий</label>
              <textarea id="note" name="note" value={f.note} placeholder="детское кресло, багаж, животное, «позвоните, не стучите»"
                onChange={(e) => set('note', e.target.value)} />
            </div>

            <div className="form__foot">
              <button className="btn btn--wide" type="submit">Отправить заявку</button>
              <p className="form__fine">
                Кнопка откроет WhatsApp с готовым текстом заявки — останется отправить. Или позвоните:{' '}
                <a href="tel:+375333360104">+375 33 336-01-04</a>.
              </p>
              <p role="status" aria-live="polite" className="form__fine">
                {sent ? 'Текст заявки открыт в WhatsApp — отправьте сообщение, и мы подтвердим поездку звонком.' : ''}
              </p>
            </div>
          </form>

          <aside className="copy" aria-label="Ваша заявка">
            <div className="copy__head">
              <span className="talon__brand" style={{ fontSize: 'var(--fs-19)' }}>Ваша заявка</span>
              <span className="talon__no">черновик</span>
            </div>
            <dl style={{ margin: 0 }}>
              <div className="copy__row"><dt>Подача</dt><dd>{f.from || <i>адрес и подъезд</i>}</dd></div>
              <div className="copy__row"><dt>Куда</dt><dd>{f.to || <i>не указано</i>}</dd></div>
              <div className="copy__row"><dt>Когда</dt><dd>{f.when === 'now' ? 'сейчас' : f.time ? `ко времени ${f.time}` : <i>выберите время</i>}</dd></div>
              <div className="copy__row"><dt>Машина</dt><dd>{f.car}</dd></div>
              <div className="copy__row"><dt>Телефон</dt><dd>{f.phone || <i>номер для связи</i>}</dd></div>
              {f.note.trim() && <div className="copy__row"><dt>Комментарий</dt><dd>{f.note}</dd></div>}
            </dl>
            <p className="copy__note">
              Это черновик, который заполняется на глазах. Сумму и время подачи назовём при подтверждении —
              тариф зависит от расстояния и загрузки.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

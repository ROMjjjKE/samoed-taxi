const PHONE = '+375 33 336-01-04';
const TEL = 'tel:+375333360104';

const STEPS: Array<[string, string]> = [
  ['01', 'Заявка: адрес подачи, куда едем и телефон'],
  ['02', 'Звонок: подтверждаем время и говорим сумму'],
  ['03', 'Подача: машина у вашего подъезда'],
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div>
          <div className="hero__plate micro">
            <span aria-hidden="true" className="hdr__dot" />
            ООО «СамоедАвто» · Пинск
          </div>
          <h1 style={{ marginTop: 'clamp(14px, 2vw, 22px)' }}>
            Такси по заявке: адрес, время, телефон
          </h1>
          <p className="lead">
            Оставьте заявку на сайте — перезвоним, подтвердим поездку и подадим машину.
            Адрес уже в заявке, объяснять «где я стою» не придётся.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#zayavka">Оставить заявку</a>
            <a className="btn btn--ghost" href={TEL}>{PHONE}</a>
          </div>
          <p className="micro micro--muted hero__note">
            Тариф и время подачи подтверждаем звонком, а не обещаем на сайте
          </p>
        </div>
        <div className="hero__steps">
          {STEPS.map(([n, t]) => (
            <div className="hero__step" key={n}>
              <b>{n}</b>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

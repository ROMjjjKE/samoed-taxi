const PHONE = '+375 33 336-01-04';
const TEL = 'tel:+375333360104';

export default function Footer() {
  return (
    <footer className="ftr" id="kontakty">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <h3>ООО «СамоедАвто»</h3>
            <p className="ftr__list" style={{ marginTop: 10 }}>
              Такси в Пинске и по заявке: подача по адресу, подтверждение звонком.
            </p>
          </div>
          <div>
            <h3>Связаться</h3>
            <p style={{ marginTop: 10 }}>
              <a className="ftr__phone" href={TEL}>{PHONE}</a>
            </p>
            <p className="ftr__list" style={{ marginTop: 8 }}>
              Звонок или WhatsApp — как удобнее.
            </p>
          </div>
          <div>
            <h3>Заявка</h3>
            <p className="ftr__list" style={{ marginTop: 10 }}>
              <a href="#zayavka">Заполнить на сайте</a><br />
              <a href="https://wa.me/375333360104" target="_blank" rel="noopener">Написать в WhatsApp</a>
            </p>
          </div>
        </div>
        <div className="ftr__legal">
          <span>© {new Date().getFullYear()} ООО «СамоедАвто», Пинск</span>
          <span>Тариф, время подачи и состав поездки подтверждаются при заявке</span>
        </div>
      </div>
    </footer>
  );
}

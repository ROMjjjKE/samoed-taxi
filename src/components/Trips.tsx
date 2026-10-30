const TRIPS: Array<[string, string, string]> = [
  ['01', 'Вокзал и автовокзал', 'Укажите номер поезда или рейса и время — встретим у выхода.'],
  ['02', 'Аэропорт и обратно', 'Поездка на дальнее расстояние: пишите город и адрес, подтвердим по телефону.'],
  ['03', 'Межгород', 'Считаем по расстоянию, а не «на глаз»: нужен точный адрес назначения.'],
  ['04', 'С детьми', 'В комментарии напишите «нужно кресло» — уточним, что есть в наличии.'],
  ['05', 'С багажом', 'Чемоданы, коляска, крупные сумки — предупредите, подберём машину побольше.'],
  ['06', 'На время', 'Выберите «ко времени» и укажите час: машина приедет к назначенному моменту.'],
];

export default function Trips() {
  return (
    <section className="section" id="poezdki">
      <div className="wrap">
        <div className="micro micro--muted">02 / поездки</div>
        <h2 style={{ marginTop: 12, fontSize: 'var(--fs-44)', maxWidth: '14em' }}>Частые поездки и что указать</h2>
        <p className="lead">
          Чем точнее заявка, тем меньше уточнений по телефону. Ниже — то, о чём обычно забывают.
        </p>
        <div className="trips">
          {TRIPS.map(([n, t, d]) => (
            <article className="trips__item" key={n} data-reveal>
              <span className="trips__n">{n}</span>
              <h3 className="trips__t">{t}</h3>
              <p className="trips__d">{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

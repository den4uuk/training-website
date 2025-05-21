function Morphology() {
  return (
    <main className="container px-4 py-4">
      <article>
        <section>
          <h3 className="h3 text-success">Зовнішній вигляд</h3>
          <p>Їжаки — це маленькі ссавці з колючками на спині, які служать їм захистом. Вони мають короткі лапи, гострий писочок та маленькі вуха.</p>
        </section>
        <section>
          <h3 className="h3 text-success">Особливості будови</h3>
          <ul>
            <li>Довжина тіла 20—30 см, довжина хвоста 1,5—3 см, вага 600—1200 г.</li>
            <li>Тіло вкрите колючками (видозмінене волосся), черевце м’яке, без колючок.</li>
            <li>Має короткі лапи з гострими кігтями, мордочка видовжена, вуха маленькі, очі чорні та блискучі.</li>
          </ul>
        </section>
        <figure className="text-center">
          <img src="https://s3.animalia.bio/animals/photos/full/original/hedgehog-erinaceus-europaeus-1.webp" alt="Їжак на галявині" className="img-fluid rounded my-4"/>
          <figcaption className="text-muted">Молодий їжак</figcaption>
        </figure>
      </article>
    </main>
  );
}

export default Morphology;
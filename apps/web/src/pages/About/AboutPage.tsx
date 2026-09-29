import './AboutPage.css';

export function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-hero">
        <div className="container container--narrow">
          <span className="about-hero__eyebrow">Studio & Philosophy</span>
          <h1 className="about-hero__title">
            The Space Between Built Form and Dwelling
          </h1>
          <p className="about-hero__lead">
            Sanatan is an architecture practice and design atelier founded on the
            premise that buildings and the objects that inhabit them are not separate
            disciplines, but two scales of the same pursuit.
          </p>
        </div>
      </header>

      <section className="about-content container container--narrow">
        <div className="about-section">
          <h2>Origins</h2>
          <p>
            Founded in Ahmedabad, Gujarat — a territory with centuries of tectonic
            mastery spanning Mughal stepwells, Jain temples, and modernist landmarks
            by Le Corbusier and Louis Kahn — Sanatan is rooted in material memory.
          </p>
          <p>
            We do not believe in disposable interior decoration or transient trends.
            We construct environments where walls are thick enough to hold temperature,
            where courtyards invite the sky, and where solid timber furniture acquires
            character across decades of touch.
          </p>
        </div>

        <div className="about-quote">
          <blockquote>
            “Architecture is the container of silence; furniture is how the human
            body comes to rest within that silence.”
          </blockquote>
        </div>

        <div className="about-section">
          <h2>Tectonic Disciplines</h2>
          <div className="disciplines-grid">
            <div className="discipline-item">
              <h3>01 / Architecture</h3>
              <p>
                Contextual residential dwellings, landscape pavilions, and cultural
                enclosures tailored to local climate, natural cross-ventilation, and
                light orientation.
              </p>
            </div>
            <div className="discipline-item">
              <h3>02 / Spatial Interiors</h3>
              <p>
                Interior volumes carved from stone, lime plaster, and handmade brick,
                fostering deep spatial tranquility and acoustic warmth.
              </p>
            </div>
            <div className="discipline-item">
              <h3>03 / Furniture Editions</h3>
              <p>
                Bespoke tables, lounge seating, and luminaires originally commissioned
                for specific rooms, subsequently released in numbered studio editions.
              </p>
            </div>
            <div className="discipline-item">
              <h3>04 / Material Conservation</h3>
              <p>
                Direct collaboration with master stone-cutters, reclaimed timber
                carvers, and bronze casters to sustain generational craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useMemo, useState } from "react";
import data from "./assets/data.json";
import "./styles.css";

const pages = [
  { id: "home", label: "Home", no: "00" },
  { id: "destination", label: "Destination", no: "01" },
  { id: "crew", label: "Crew", no: "02" },
  { id: "technology", label: "Technology", no: "03" },
];

function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [destinationIndex, setDestinationIndex] = useState(0);
  const [crewIndex, setCrewIndex] = useState(0);
  const [technologyIndex, setTechnologyIndex] = useState(0);

  const destination = useMemo(
    () => data.destination[destinationIndex],
    [destinationIndex]
  );
  const crew = useMemo(() => data.crew[crewIndex], [crewIndex]);
  const technology = useMemo(
    () => data.technology[technologyIndex],
    [technologyIndex]
  );

  const handlePageChange = (id) => {
    setPage(id);
    setMenuOpen(false);
  };

  return (
    <div className={`app page-${page}`}>
      <header className="header">
        <a className="logo-link" href="#" aria-label="Space tourism">
          <img src="/images/shared/logo.svg" alt="" />
        </a>

        <button
          className="menu-btn"
          type="button"
          aria-label="Open navigation"
          onClick={() => setMenuOpen(true)}
        >
          <img src="/images/shared/icon-hamburger.svg" alt="" />
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button
            className="close-btn"
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/images/shared/icon-close.svg" alt="" />
          </button>

          {pages.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${page === item.id ? "active" : ""}`}
              type="button"
              onClick={() => handlePageChange(item.id)}
            >
              <span>{item.no}</span> {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="content">
        {page === "home" && (
          <section className="home">
            <div className="home-left">
              <p className="sub-title">So, you want to travel to</p>
              <h1>Space</h1>
              <p>
                Let’s face it; if you want to go to space, you might as well
                genuinely go to outer space and not hover kind of on the edge of
                it. Well sit back, and relax because we’ll give you a truly out of
                this world experience.
              </p>
            </div>
            <button
              className="explore-btn"
              type="button"
              onClick={() => handlePageChange("destination")}
            >
              Explore
            </button>
          </section>
        )}

        {page === "destination" && (
          <section className="destination page-block">
            <h2>
              <span>01</span> Pick your destination
            </h2>
            <div className="panel">
              <img src={destination.images.png} alt={destination.name} />

              <div className="panel-content">
                <div className="tabs">
                  {data.destination.map((item, index) => (
                    <button
                      key={item.name}
                      className={destinationIndex === index ? "active" : ""}
                      type="button"
                      onClick={() => setDestinationIndex(index)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                <h3>{destination.name}</h3>
                <p>{destination.description}</p>

                <div className="stats">
                  <div>
                    <small>Avg. distance</small>
                    <strong>{destination.distance}</strong>
                  </div>
                  <div>
                    <small>Est. travel time</small>
                    <strong>{destination.travel}</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "crew" && (
          <section className="crew page-block">
            <h2>
              <span>02</span> Meet your crew
            </h2>
            <div className="panel">
              <div className="panel-content">
                <p className="role">{crew.role}</p>
                <h3>{crew.name}</h3>
                <p>{crew.bio}</p>

                <div className="dots">
                  {data.crew.map((item, index) => (
                    <button
                      key={item.name}
                      className={crewIndex === index ? "active" : ""}
                      type="button"
                      onClick={() => setCrewIndex(index)}
                      aria-label={item.name}
                    />
                  ))}
                </div>
              </div>

              <img src={crew.images.png} alt={crew.name} className="crew-image" />
            </div>
          </section>
        )}

        {page === "technology" && (
          <section className="technology page-block">
            <h2>
              <span>03</span> Space launch 101
            </h2>
            <div className="panel tech-panel">
              <div className="number-tabs">
                {data.technology.map((item, index) => (
                  <button
                    key={item.name}
                    className={technologyIndex === index ? "active" : ""}
                    type="button"
                    onClick={() => setTechnologyIndex(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="panel-content">
                <p className="sub-title">The terminology…</p>
                <h3>{technology.name}</h3>
                <p>{technology.description}</p>
              </div>

              <picture>
                <source
                  media="(max-width: 1000px)"
                  srcSet={technology.images.landscape}
                />
                <img src={technology.images.portrait} alt={technology.name} />
              </picture>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

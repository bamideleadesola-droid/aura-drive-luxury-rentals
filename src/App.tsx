import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="site-shell">
      <header className="nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="AURA DRIVE home">
          AuraDrive<sup>®</sup>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#reserve">Fleet</a>
          <a href="#reserve">Experience</a>
          <a href="mailto:hello@auradrive.example">Contact</a>
        </nav>

        <a className="nav__cta" href="#reserve">
          Reserve now
        </a>

        <button
          className="nav__menu"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>

        <nav className={`nav__mobile ${menuOpen ? "nav__mobile--open" : ""}`} aria-label="Mobile">
          <a href="#reserve" onClick={() => setMenuOpen(false)}>
            Fleet
          </a>
          <a href="#reserve" onClick={() => setMenuOpen(false)}>
            Experience
          </a>
          <a href="mailto:hello@auradrive.example" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
      </header>

      <section className="hero" aria-label="AURA DRIVE luxury car rental hero">
        <img
          className="hero__image"
          src="/assets/bright-coastal-car.png"
          alt="Pearl white luxury convertible parked beside a sunny coastal villa"
        />
        <div className="hero__wash" />

        <div className="hero__content">
          <h1>Luxury cars for bright arrivals</h1>
          <p>Premium rentals, delivered simply.</p>

          <div className="hero__actions" aria-label="Hero actions">
            <a className="button button--primary" id="reserve" href="mailto:hello@auradrive.example">
              Reserve now
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button button--secondary" href="mailto:hello@auradrive.example">
              View fleet
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

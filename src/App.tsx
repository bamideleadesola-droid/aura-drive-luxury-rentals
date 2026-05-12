import { useState } from "react";
import { ArrowRight, Gem, Menu, Phone, X } from "lucide-react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="site-shell">
      <header className="nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="AURA DRIVE home">
          AURA DRIVE
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#reserve">Cars</a>
          <a href="#reserve">Rental Terms</a>
          <a href="#reserve">Concierge</a>
          <a href="mailto:hello@auradrive.example">Contact</a>
        </nav>

        <div className="nav__actions">
          <a className="nav__icon" href="mailto:hello@auradrive.example" aria-label="Contact AURA DRIVE">
            <Phone aria-hidden="true" size={20} />
          </a>
          <a className="nav__cta" href="#reserve">
            Book now
          </a>
        </div>

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
            Cars
          </a>
          <a href="#reserve" onClick={() => setMenuOpen(false)}>
            Rental Terms
          </a>
          <a href="#reserve" onClick={() => setMenuOpen(false)}>
            Concierge
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
          <div className="hero__proof">
            <Gem aria-hidden="true" size={18} />
            Chosen by more than 250 clients
          </div>

          <h1>Premium car rental for every arrival</h1>
          <p>Curated luxury cars, delivered with concierge care.</p>

          <div className="hero__actions" aria-label="Hero actions">
            <a className="button button--primary" id="reserve" href="mailto:hello@auradrive.example">
              Choose your car
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

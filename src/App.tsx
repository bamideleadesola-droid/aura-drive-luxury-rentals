import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Gem, Menu, Phone, Plane, Sparkles, Waves, X } from "lucide-react";

const arrivalTypes = [
  {
    title: "Airport arrival",
    description: "Quiet handover, luggage space, and a composed first mile.",
    match: "Executive sedan or long-wheelbase SUV",
    tone: "Composed",
    icon: Plane,
    imageClass: "arrival-card__image--airport",
  },
  {
    title: "Business day",
    description: "Discreet cars prepared for meetings, transfers, and long waits.",
    match: "S-Class, 7 Series, or Range Rover",
    tone: "Discreet",
    icon: BriefcaseBusiness,
    imageClass: "arrival-card__image--business",
  },
  {
    title: "Weekend coast",
    description: "Open routes, grand tourers, and SUVs with room to breathe.",
    match: "Convertible, GT coupe, or premium SUV",
    tone: "Open",
    icon: Waves,
    imageClass: "arrival-card__image--coast",
  },
  {
    title: "Evening entrance",
    description: "Sharper arrivals for private dinners, events, and late plans.",
    match: "Supercar, coupe, or chauffeur-ready sedan",
    tone: "Sharp",
    icon: Sparkles,
    imageClass: "arrival-card__image--evening",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedArrival, setSelectedArrival] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeArrival = arrivalTypes[selectedArrival];

  const ease = [0.22, 1, 0.36, 1] as const;
  const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };
  const imageReveal = shouldReduceMotion
    ? {}
    : {
        initial: { scale: 1.22, opacity: 0.82 },
        animate: { scale: 1.16, opacity: 1 },
        transition: { duration: 1.4, ease },
      };

  return (
    <main className="site-shell">
      <motion.header
        className="nav"
        aria-label="Main navigation"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <motion.a className="brand" href="/" aria-label="AURA DRIVE home" whileHover={{ opacity: 0.72 }}>
          AURA DRIVE
        </motion.a>

        <nav className="nav__links" aria-label="Primary">
          <motion.a href="#arrivals" whileHover={{ y: -1 }}>
            Cars
          </motion.a>
          <motion.a href="#reserve" whileHover={{ y: -1 }}>
            Terms
          </motion.a>
          <motion.a href="#reserve" whileHover={{ y: -1 }}>
            Concierge
          </motion.a>
          <motion.a href="mailto:hello@auradrive.example" whileHover={{ y: -1 }}>
            Contact
          </motion.a>
        </nav>

        <div className="nav__actions">
          <motion.a
            className="nav__icon"
            href="mailto:hello@auradrive.example"
            aria-label="Contact AURA DRIVE"
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Phone aria-hidden="true" size={20} />
          </motion.a>
          <motion.a
            className="nav__cta"
            href="#reserve"
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            Book now
          </motion.a>
        </div>

        <motion.button
          className="nav__menu"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        >
          {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </motion.button>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              className="nav__mobile nav__mobile--open"
              aria-label="Mobile"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease }}
            >
              <a href="#arrivals" onClick={() => setMenuOpen(false)}>
                Cars
              </a>
              <a href="#reserve" onClick={() => setMenuOpen(false)}>
                Terms
              </a>
              <a href="#reserve" onClick={() => setMenuOpen(false)}>
                Concierge
              </a>
              <a href="mailto:hello@auradrive.example" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </motion.header>

      <motion.section
        className="hero"
        aria-label="AURA DRIVE luxury cars hero"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease }}
      >
        <motion.img
          className="hero__image"
          src="/assets/bright-coastal-car.png"
          alt="Pearl white luxury convertible parked beside a sunny coastal villa"
          {...imageReveal}
        />
        <div className="hero__wash" />

        <motion.div
          className="hero__content"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.38 }}
        >
          <motion.div className="hero__proof" variants={reveal} transition={{ duration: 0.58, ease }}>
            <Gem aria-hidden="true" size={18} />
            Chosen by more than 250 clients
          </motion.div>

          <motion.h1 variants={reveal} transition={{ duration: 0.68, ease }}>
            Premium cars for <span>every arrival</span>
          </motion.h1>
          <motion.p variants={reveal} transition={{ duration: 0.6, ease }}>
            Curated luxury cars, delivered with concierge care.
          </motion.p>

          <motion.div className="hero__actions" aria-label="Hero actions" variants={reveal} transition={{ duration: 0.6, ease }}>
            <motion.a
              className="button button--primary"
              id="reserve"
              href="mailto:hello@auradrive.example"
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              Choose your car
              <ArrowRight aria-hidden="true" size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="arrival"
        id="arrivals"
        aria-labelledby="arrival-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="arrival__inner">
          <div className="arrival__intro">
            <motion.h2
              id="arrival-heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, ease }}
            >
              Choose the arrival. We'll match the car.
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, delay: 0.08, ease }}
            >
              From airport pickups to weekend escapes, every drive is prepared with concierge care and the right presence.
            </motion.p>
          </div>

          <div className="arrival__grid">
            <motion.div className="arrival__feature" layout>
              <img
                src="/assets/bright-coastal-car.png"
                alt="Luxury convertible on a coastal driveway"
                className={`arrival__feature-image ${activeArrival.imageClass}`}
              />
              <div className="arrival__feature-wash" />
              <AnimatePresence mode="wait">
                <motion.div
                  className="arrival__feature-copy"
                  key={activeArrival.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease }}
                >
                  <span>{activeArrival.tone}</span>
                  <h3>{activeArrival.title}</h3>
                  <p>{activeArrival.match}</p>
                  <a
                    href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - ${activeArrival.title}`)}`}
                    className="arrival__feature-link"
                  >
                    Request this arrival
                    <ArrowRight aria-hidden="true" size={17} />
                  </a>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="arrival__cards" aria-label="Arrival options">
              {arrivalTypes.map((arrival, index) => {
                const ArrivalIcon = arrival.icon;
                const isSelected = selectedArrival === index;

                return (
                  <motion.button
                    className={`arrival-card ${isSelected ? "arrival-card--active" : ""}`}
                    type="button"
                    key={arrival.title}
                    onClick={() => setSelectedArrival(index)}
                    aria-pressed={isSelected}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                    transition={{ duration: 0.2, ease }}
                  >
                    <span className="arrival-card__media">
                      <img
                        src="/assets/bright-coastal-car.png"
                        alt=""
                        aria-hidden="true"
                        className={`arrival-card__image ${arrival.imageClass}`}
                      />
                    </span>
                    <span className="arrival-card__body">
                      <span className="arrival-card__meta">
                        <ArrivalIcon aria-hidden="true" size={18} />
                        {arrival.tone}
                      </span>
                      <span className="arrival-card__title">{arrival.title}</span>
                      <span className="arrival-card__description">{arrival.description}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

export default App;

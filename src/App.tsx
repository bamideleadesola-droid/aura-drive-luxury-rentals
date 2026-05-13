import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Gem, Menu, Phone, Plane, Sparkles, Waves, X } from "lucide-react";

const arrivalTypes = [
  {
    title: "Airport arrival",
    description: "Tarmac timing, luggage space, and a calm first mile.",
    match: "Sedan / SUV",
    tone: "Arrival",
    icon: Plane,
    image: "/assets/arrival-airport.jpg",
    alt: "Black luxury sedan parked beside a private aircraft on a runway",
  },
  {
    title: "Business day",
    description: "Quiet presence for meetings, transfers, and waiting time.",
    match: "Chauffeur-ready",
    tone: "Executive",
    icon: BriefcaseBusiness,
    image: "/assets/arrival-business.jpg",
    alt: "Well-dressed client stepping into a black luxury sedan outside a modern business building",
  },
  {
    title: "Weekend coast",
    description: "Open routes, grand tourers, and SUVs with room to breathe.",
    match: "GT / convertible",
    tone: "Open route",
    icon: Waves,
    image: "/assets/arrival-coast.jpg",
    alt: "Black Ferrari convertible on a coastal hillside road at golden hour",
  },
  {
    title: "Evening entrance",
    description: "Sharper arrivals for private dinners, events, and late plans.",
    match: "Supercar / coupe",
    tone: "After dark",
    icon: Sparkles,
    image: "/assets/arrival-evening.jpg",
    alt: "Red supercar parked outside a refined hotel entrance",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
        viewport={{ once: true, amount: 0.18 }}
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
              Arrivals, matched to the moment.
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, delay: 0.08, ease }}
            >
              Tell us where the day begins. We prepare the car, timing, and handover around it.
            </motion.p>
          </div>

          <motion.div
            className="arrival__grid"
            aria-label="Arrival options"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {arrivalTypes.map((arrival, index) => {
              const ArrivalIcon = arrival.icon;

              return (
                <motion.a
                  className="arrival-card"
                  href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - ${arrival.title}`)}`}
                  key={arrival.title}
                  aria-label={`Request ${arrival.title}`}
                  variants={reveal}
                  whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                  transition={{ duration: 0.34, ease }}
                >
                  <img className="arrival-card__image" src={arrival.image} alt={arrival.alt} />
                  <span className="arrival-card__wash" />

                  <span className="arrival-card__top">
                    <span className="arrival-card__icon">
                      <ArrivalIcon aria-hidden="true" size={19} />
                    </span>
                    <span className="arrival-card__number">{String(index + 1).padStart(2, "0")}</span>
                  </span>

                  <span className="arrival-card__content">
                    <span className="arrival-card__tone">{arrival.tone}</span>
                    <span className="arrival-card__title">{arrival.title}</span>
                    <span className="arrival-card__description">{arrival.description}</span>
                    <span className="arrival-card__footer">
                      <span>{arrival.match}</span>
                      <span className="arrival-card__link">
                        Plan this arrival
                        <ArrowRight aria-hidden="true" size={17} />
                      </span>
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}

export default App;

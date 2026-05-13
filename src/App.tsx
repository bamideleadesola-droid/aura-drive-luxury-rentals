import { type PointerEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Gem, Images, Menu, Phone, Plane, Sparkles, Waves, X } from "lucide-react";

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

const fleetCars = [
  {
    name: "Mercedes S-Class",
    category: "Executive sedan",
    price: "from $820/day",
    image: "/assets/fleet-s-class.jpg",
    alt: "Black Mercedes S-Class in a bright studio",
    specs: ["4 seats", "Chauffeur-ready", "Quiet cabin"],
  },
  {
    name: "Range Rover Autobiography",
    category: "Luxury SUV",
    price: "from $940/day",
    image: "/assets/fleet-range-rover.jpg",
    alt: "Black Range Rover parked by palm trees and modern architecture",
    specs: ["5 seats", "Large luggage", "All terrain"],
  },
  {
    name: "Porsche 911 GT3 RS",
    category: "Performance coupe",
    price: "from $1,180/day",
    image: "/assets/fleet-porsche.jpg",
    alt: "Close detail of a red Porsche 911 GT3 RS wheel and bodywork",
    specs: ["2 seats", "Track-bred", "Sharp handling"],
  },
  {
    name: "Lamborghini Huracan",
    category: "Supercar",
    price: "from $1,520/day",
    image: "/assets/fleet-lamborghini.jpg",
    alt: "Blue Lamborghini Huracan driving at sunset",
    specs: ["2 seats", "V10", "3.2 sec"],
  },
  {
    name: "Rolls-Royce Ghost",
    category: "Chauffeur luxury",
    price: "from $1,640/day",
    image: "/assets/fleet-rolls-royce.jpg",
    alt: "Black Rolls-Royce Ghost in a refined city street",
    specs: ["4 seats", "Privacy cabin", "Soft ride"],
  },
  {
    name: "Ferrari Spider",
    category: "Convertible",
    price: "from $1,390/day",
    image: "/assets/fleet-ferrari.jpg",
    alt: "Red Ferrari driving through a city at night",
    specs: ["2 seats", "Open top", "Weekend ready"],
  },
];

const featuredVehicle = fleetCars[1];
const galleryVehicles = [fleetCars[0], fleetCars[3], fleetCars[4], fleetCars[5]];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArrival, setActiveArrival] = useState<number | null>(null);
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
  const handleCardPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
    event.currentTarget.style.setProperty("--parallax-x", `${(50 - x) * 0.18}px`);
    event.currentTarget.style.setProperty("--parallax-y", `${(50 - y) * 0.14}px`);
  };
  const resetCardPointer = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
    event.currentTarget.style.setProperty("--parallax-x", "0px");
    event.currentTarget.style.setProperty("--parallax-y", "0px");
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
          <motion.a href="#fleet" whileHover={{ y: -1 }}>
            Cars
          </motion.a>
          <motion.a href="mailto:hello@auradrive.example?subject=AURA%20DRIVE%20-%20Rental%20terms" whileHover={{ y: -1 }}>
            Terms
          </motion.a>
          <motion.a href="#arrivals" whileHover={{ y: -1 }}>
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
            href="mailto:hello@auradrive.example?subject=AURA%20DRIVE%20-%20Reserve"
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
              <a href="#fleet" onClick={() => setMenuOpen(false)}>
                Cars
              </a>
              <a href="mailto:hello@auradrive.example?subject=AURA%20DRIVE%20-%20Rental%20terms" onClick={() => setMenuOpen(false)}>
                Terms
              </a>
              <a href="#arrivals" onClick={() => setMenuOpen(false)}>
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
              href="#fleet"
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
                  className={`arrival-card ${activeArrival === index ? "arrival-card--active" : ""} ${
                    activeArrival !== null && activeArrival !== index ? "arrival-card--inactive" : ""
                  }`}
                  href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - ${arrival.title}`)}`}
                  key={arrival.title}
                  aria-label={`Request ${arrival.title}`}
                  variants={reveal}
                  onFocus={() => setActiveArrival(index)}
                  onBlur={() => setActiveArrival(null)}
                  onPointerEnter={() => setActiveArrival(index)}
                  onPointerLeave={(event) => {
                    setActiveArrival(null);
                    resetCardPointer(event);
                  }}
                  onPointerMove={handleCardPointerMove}
                  whileHover={shouldReduceMotion ? undefined : { y: -16, scale: 1.012 }}
                  whileFocus={shouldReduceMotion ? undefined : { y: -10, scale: 1.008 }}
                  whileTap={shouldReduceMotion ? undefined : { y: -6, scale: 0.992 }}
                  transition={{ duration: 0.38, ease }}
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

      <motion.section
        className="fleet"
        id="fleet"
        aria-labelledby="fleet-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.14 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="fleet__inner">
          <motion.div
            className="fleet-showcase"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={reveal}
            transition={{ duration: 0.68, ease }}
          >
            <div className="fleet-showcase__top">
              <a className="fleet-showcase__back" href="#arrivals">
                <ArrowLeft aria-hidden="true" size={16} />
                Browse vehicles
              </a>
            </div>

            <div className="fleet-showcase__gallery" aria-label="Featured luxury vehicle gallery">
              <motion.a
                className="fleet-showcase__main"
                href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - Reserve ${featuredVehicle.name}`)}`}
                aria-label={`Reserve ${featuredVehicle.name}`}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.996 }}
                transition={{ duration: 0.32, ease }}
              >
                <img src={featuredVehicle.image} alt={featuredVehicle.alt} />
                <span className="fleet-showcase__image-wash" />
                <span className="fleet-showcase__view-more">
                  <Images aria-hidden="true" size={17} />
                  View more
                </span>
              </motion.a>

              <div className="fleet-showcase__thumbs">
                {galleryVehicles.map((car) => (
                  <motion.a
                    className="fleet-showcase__thumb"
                    href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - Reserve ${car.name}`)}`}
                    key={car.name}
                    aria-label={`Reserve ${car.name}`}
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.996 }}
                    transition={{ duration: 0.28, ease }}
                  >
                    <img src={car.image} alt={car.alt} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="fleet-showcase__details">
              <div className="fleet-showcase__copy">
                <span className="fleet-showcase__eyebrow">{featuredVehicle.category}</span>
                <h2 id="fleet-heading">{featuredVehicle.name}</h2>
                <p>
                  A spacious luxury SUV prepared for airport arrivals, business transfers, and weekend routes with a
                  calm, polished presence.
                </p>
              </div>

              <motion.a
                className="fleet-showcase__booking"
                href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - Reserve ${featuredVehicle.name}`)}`}
                aria-label={`Reserve ${featuredVehicle.name}`}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.996 }}
                transition={{ duration: 0.32, ease }}
              >
                <span className="fleet-showcase__rate">
                  <strong>{featuredVehicle.price}</strong>
                  <span>Concierge delivery included</span>
                </span>
                <span className="fleet-showcase__button">
                  Reserve this car
                  <ArrowRight aria-hidden="true" size={17} />
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}

export default App;

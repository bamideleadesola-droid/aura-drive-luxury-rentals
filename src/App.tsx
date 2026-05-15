import { type PointerEvent, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  type MotionStyle,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Gem, Images, Menu, Pause, Phone, Plane, Play, Plus, Quote, Sparkles, Waves, X } from "lucide-react";

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

const fleetShowcases = [
  {
    id: "range-rover",
    name: "Range Rover Autobiography",
    category: "Luxury SUV",
    price: "from $940/day",
    description: "Spacious, calm, and polished for airport pickup, luggage, family comfort, or a business route with presence.",
    primary: {
      src: "/assets/fleet-range-rover.jpg",
      alt: "Black Range Rover parked by palm trees and modern architecture",
    },
    gallery: [
      { src: "/assets/range-rover-cabin-front.jpg", alt: "Range Rover front cabin with leather seats" },
      { src: "/assets/range-rover-cabin-rear.jpg", alt: "Range Rover rear cabin seating" },
      { src: "/assets/range-rover-cabin-controls.jpg", alt: "Range Rover interior controls and center console" },
      { src: "/assets/range-rover-cabin-profile.jpg", alt: "Range Rover side cabin profile" },
    ],
  },
  {
    id: "mercedes",
    name: "Mercedes S-Class",
    category: "Executive sedan",
    price: "from $820/day",
    description: "A quiet flagship sedan for airport arrivals, business days, and evenings that need a softer handover.",
    primary: {
      src: "/assets/fleet-s-class.jpg",
      alt: "Black Mercedes S-Class in a bright studio",
    },
    gallery: [
      { src: "/assets/mercedes-cabin-front.jpg", alt: "Mercedes S-Class front cabin and steering wheel" },
      { src: "/assets/mercedes-cabin-rear.jpg", alt: "Mercedes S-Class rear cabin detail" },
      { src: "/assets/mercedes-exterior-side.jpg", alt: "Mercedes S-Class exterior side profile" },
      { src: "/assets/mercedes-exterior-rear.jpg", alt: "Mercedes S-Class rear exterior detail" },
    ],
  },
  {
    id: "rolls-royce",
    name: "Rolls-Royce Ghost",
    category: "Chauffeur luxury",
    price: "from $1,640/day",
    description: "For quieter entrances, private transfers, and plans where comfort should feel invisible until it matters.",
    primary: {
      src: "/assets/fleet-rolls-royce.jpg",
      alt: "Black Rolls-Royce Ghost in a refined city street",
    },
    gallery: [
      { src: "/assets/ghost-cabin-front.jpg", alt: "Luxury sedan front cabin detail" },
      { src: "/assets/ghost-cabin-seat.jpg", alt: "Luxury leather seat detail" },
      { src: "/assets/ghost-cabin-dashboard.jpg", alt: "Luxury dashboard and steering wheel detail" },
      { src: "/assets/ghost-cabin-rear.jpg", alt: "Luxury rear cabin detail" },
    ],
  },
];

const reservationSteps = [
  {
    title: "Choose your car",
    detail: "Pick a model or ask us to match one to the trip.",
  },
  {
    title: "Share the arrival details",
    detail: "Pickup time, destination, passengers, and luggage.",
  },
  {
    title: "Confirm the essentials",
    detail: "Documents, payment, and delivery notes handled once.",
  },
  {
    title: "Meet the car ready",
    detail: "Clean, fueled, timed, and handed over without the back-and-forth.",
  },
];

const testimonials = [
  {
    quote: "The car was waiting when our bags arrived. Clean cabin, calm handover, and no calls while we were trying to get moving.",
    client: "Private client",
    trip: "Airport arrival",
    vehicle: "Range Rover Autobiography",
    image: "/assets/client-airport.jpg",
    alt: "Portrait of a private AURA DRIVE client",
  },
  {
    quote: "For a two-day roadshow, the S-Class felt discreet and on time at every stop. The team handled the changes quietly.",
    client: "Executive assistant",
    trip: "Business day",
    vehicle: "Mercedes S-Class",
    image: "/assets/client-business.jpg",
    alt: "Portrait of an executive assistant client",
  },
  {
    quote: "We booked late for a family weekend and it still felt considered. Enough space, clear pricing, and a very easy return.",
    client: "Family trip",
    trip: "Weekend route",
    vehicle: "Range Rover Autobiography",
    image: "/assets/client-weekend.jpg",
    alt: "Portrait of a family trip client",
  },
  {
    quote: "The Ghost arrived exactly when requested, detailed properly, and the handover took less than five minutes.",
    client: "Event guest",
    trip: "Evening entrance",
    vehicle: "Rolls-Royce Ghost",
    image: "/assets/client-evening.jpg",
    alt: "Portrait of an evening event client",
  },
];

const closingSignals = [
  {
    title: "Airport pickup",
    detail: "Timed around landing, luggage, and the first mile.",
    icon: Plane,
  },
  {
    title: "Same-day delivery",
    detail: "We bring the car where the trip begins.",
    icon: Sparkles,
  },
  {
    title: "Prepared handover",
    detail: "Clean, fueled, documented, and ready.",
    icon: Gem,
  },
  {
    title: "Concierge support",
    detail: "A real person before and during the trip.",
    icon: Phone,
  },
];

const faqItems = [
  {
    question: "How early should I reserve?",
    answer: "For airport arrivals and weekends, a few days ahead is best. Same-day requests are possible when a car is available.",
  },
  {
    question: "Can the car be delivered to me?",
    answer: "Yes. We can arrange delivery to an airport, hotel, residence, office, or private venue depending on timing and access.",
  },
  {
    question: "What do I need to confirm a booking?",
    answer: "We confirm the car, dates, delivery location, valid driving details, payment, and any handover notes before the trip.",
  },
  {
    question: "What if my flight or schedule changes?",
    answer: "Share the update with the concierge team. We adjust the handover timing where possible and keep the process calm.",
  },
  {
    question: "Can I request a chauffeur?",
    answer: "Yes. Tell us the route, timing, and service style you prefer, and we will confirm the right car and driver arrangement.",
  },
  {
    question: "Are fees clear before pickup?",
    answer: "Yes. Pricing, delivery notes, deposit, coverage, and any extras are confirmed before the car is prepared.",
  },
];

type FleetShowcase = (typeof fleetShowcases)[number];

type FleetShowcaseCardProps = {
  active: boolean;
  index: number;
  progress: MotionValue<number>;
  vehicle: FleetShowcase;
};

function FleetShowcaseCard({ active, index, progress, vehicle }: FleetShowcaseCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const total = fleetShowcases.length;
  const segment = 1 / total;
  const enterStart = index === 0 ? 0 : Math.max(0, index * segment - 0.02);
  const enterEnd = index === 0 ? 0.04 : Math.min(1, index * segment + 0.02);
  const inputRange = [enterStart, enterEnd];
  const cardY = useTransform(progress, inputRange, index === 0 ? [0, 0] : [700, 0]);
  const cardScale = useTransform(progress, inputRange, index === 0 ? [1, 1] : [0.965, 1]);
  const cardOpacity = useTransform(progress, [enterStart, Math.min(1, enterStart + 0.006)], index === 0 ? [1, 1] : [0, 1]);
  const motionStyle = {
    "--card-offset": `${index * 16}px`,
    zIndex: 10 + index,
    pointerEvents: active ? "auto" : "none",
    ...(shouldReduceMotion ? { opacity: active ? 1 : 0 } : { opacity: cardOpacity, scale: cardScale, y: cardY }),
  } as MotionStyle & { "--card-offset": string };

  return (
    <motion.article
      className={`fleet-showcase ${active ? "fleet-showcase--active" : ""}`}
      aria-labelledby={`${vehicle.id}-heading`}
      style={motionStyle}
    >
      <div className="fleet-showcase__top">
        <span className="fleet-showcase__kicker">{vehicle.name} gallery</span>
        <span className="fleet-showcase__index">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="fleet-showcase__gallery" aria-label={`${vehicle.name} image gallery`}>
        <motion.a
          className="fleet-showcase__main"
          href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - Reserve ${vehicle.name}`)}`}
          aria-label={`Reserve ${vehicle.name}`}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.996 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={vehicle.primary.src} alt={vehicle.primary.alt} />
          <span className="fleet-showcase__image-wash" />
          <span className="fleet-showcase__view-more">
            <Images aria-hidden="true" size={17} />
            View details
          </span>
        </motion.a>

        <div className="fleet-showcase__thumbs">
          {vehicle.gallery.map((image) => (
            <motion.a
              className="fleet-showcase__thumb"
              href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - Reserve ${vehicle.name}`)}`}
              key={image.src}
              aria-label={`Reserve ${vehicle.name}`}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.996 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={image.src} alt={image.alt} />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="fleet-showcase__details">
        <div className="fleet-showcase__copy">
          <span className="fleet-showcase__eyebrow">{vehicle.category}</span>
          <h3 id={`${vehicle.id}-heading`}>{vehicle.name}</h3>
          <p>{vehicle.description}</p>
        </div>

        <motion.a
          className="fleet-showcase__booking"
          href={`mailto:hello@auradrive.example?subject=${encodeURIComponent(`AURA DRIVE - Reserve ${vehicle.name}`)}`}
          aria-label={`Reserve ${vehicle.name}`}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.996 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="fleet-showcase__rate">
            <strong>{vehicle.price}</strong>
            <span>Concierge delivery included</span>
          </span>
          <span className="fleet-showcase__button">
            Reserve this car
            <ArrowRight aria-hidden="true" size={17} />
          </span>
        </motion.a>
      </div>
    </motion.article>
  );
}

function FleetShowcaseStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 12%", "end 90%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(fleetShowcases.length - 1, Math.max(0, Math.floor(latest * fleetShowcases.length + 0.08)));
    setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
  });

  return (
    <div className="fleet-stack" ref={stackRef}>
      <div className="fleet-stage">
        {fleetShowcases.map((vehicle, index) => (
          <FleetShowcaseCard
            active={activeIndex === index}
            index={index}
            key={vehicle.name}
            progress={scrollYProgress}
            vehicle={vehicle}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArrival, setActiveArrival] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
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
  const toggleFilmPlayback = () => {
    const video = filmVideoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      setFilmPlaying(true);
      return;
    }

    video.pause();
    setFilmPlaying(false);
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

      <section
        className="fleet"
        id="fleet"
        aria-labelledby="fleet-heading"
      >
        <div className="fleet__inner">
          <div className="fleet__intro">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.56, ease }}
            >
              Browse vehicles
            </motion.span>
            <motion.h2
              id="fleet-heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, ease }}
            >
              Browse the fleet.
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, delay: 0.08, ease }}
            >
              Exterior, cabin, and detail shots grouped by vehicle.
            </motion.p>
          </div>

          <FleetShowcaseStack />
        </div>
      </section>

      <motion.section
        className="film"
        id="film"
        aria-labelledby="film-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="film__inner">
          <div className="film__intro">
            <h2 id="film-heading">From pickup to arrival.</h2>
            <p>A short look at the road, the handover, and the care around every trip.</p>
          </div>

          <div className="film__frame">
            <video
              ref={filmVideoRef}
              className="film__video"
              src="/assets/aura-drive-promo.mp4"
              poster="/assets/aura-drive-promo-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={(event) => {
                const video = event.currentTarget;
                if (video.paused) {
                  void video.play().then(() => setFilmPlaying(true)).catch(() => setFilmPlaying(false));
                }
              }}
              onPause={() => setFilmPlaying(false)}
              onPlay={() => setFilmPlaying(true)}
            />
            <span className="film__wash" />
            <button className="film__control" type="button" onClick={toggleFilmPlayback} aria-label={filmPlaying ? "Pause reel" : "Play reel"}>
              {filmPlaying ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
              {filmPlaying ? "Pause reel" : "Play reel"}
            </button>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="process"
        id="process"
        aria-labelledby="process-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="process__inner">
          <div className="process__intro">
            <motion.h2
              id="process-heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.64, ease }}
            >
              Reserve without the back-and-forth.
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.64, delay: 0.08, ease }}
            >
              Choose the car, tell us where and when, and we handle the handover.
            </motion.p>
            <motion.a
              className="process__cta"
              href="mailto:hello@auradrive.example?subject=AURA%20DRIVE%20-%20Reserve"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.56, delay: 0.16, ease }}
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.012 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              Reserve your car
              <ArrowRight aria-hidden="true" size={18} />
            </motion.a>
          </div>

          <motion.div
            className="process__steps"
            aria-label="Reservation process"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {reservationSteps.map((step, index) => (
              <motion.div
                className="process-step"
                key={step.title}
                variants={reveal}
                transition={{ duration: 0.56, ease }}
                whileHover={shouldReduceMotion ? undefined : { x: 8 }}
              >
                <span className="process-step__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="process-step__content">
                  <span className="process-step__title">{step.title}</span>
                  <span className="process-step__detail">{step.detail}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="testimonials"
        id="testimonials"
        aria-labelledby="testimonials-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="testimonials__inner">
          <div className="testimonials__intro">
            <motion.h2
              id="testimonials-heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, ease }}
            >
              What clients remember.
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, delay: 0.08, ease }}
            >
              The timing, the handover, and the feeling that the car was already handled.
            </motion.p>
          </div>

          <motion.div
            className="testimonials__layout"
            aria-label="Client testimonials"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.article
              className="testimonial-card testimonial-card--featured"
              variants={reveal}
              transition={{ duration: 0.62, ease }}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
            >
              <span className="testimonial-card__media">
                <img src={testimonials[0].image} alt={testimonials[0].alt} />
                <span className="testimonial-card__quote-icon">
                  <Quote aria-hidden="true" size={26} />
                </span>
              </span>
              <span className="testimonial-card__body">
                <blockquote>{testimonials[0].quote}</blockquote>
                <footer>
                  <span>{testimonials[0].client}</span>
                  <span>
                    {testimonials[0].trip} / {testimonials[0].vehicle}
                  </span>
                </footer>
              </span>
            </motion.article>

            <div className="testimonials__grid">
              {testimonials.slice(1).map((testimonial) => (
                <motion.article
                  className="testimonial-card"
                  key={`${testimonial.client}-${testimonial.trip}`}
                  variants={reveal}
                  transition={{ duration: 0.56, ease }}
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                >
                  <span className="testimonial-card__media">
                    <img src={testimonial.image} alt={testimonial.alt} />
                  </span>
                  <span className="testimonial-card__body">
                    <span className="testimonial-card__trip">{testimonial.trip}</span>
                    <blockquote>{testimonial.quote}</blockquote>
                    <footer>
                      <span>{testimonial.client}</span>
                      <span>{testimonial.vehicle}</span>
                    </footer>
                  </span>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="faq"
        id="faq"
        aria-labelledby="faq-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="faq__inner">
          <div className="faq__intro">
            <motion.h2
              id="faq-heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, ease }}
            >
              Questions before you reserve.
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.64, delay: 0.08, ease }}
            >
              Clear answers for delivery, timing, documents, and concierge requests.
            </motion.p>
          </div>

          <motion.div
            className="faq__list"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            transition={{ staggerChildren: 0.06 }}
          >
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              const answerId = `faq-answer-${index}`;

              return (
                <motion.div
                  className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                  key={item.question}
                  variants={reveal}
                  transition={{ duration: 0.5, ease }}
                >
                  <button
                    className="faq-item__button"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                  >
                    <span>{item.question}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      <Plus size={20} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        className="faq-item__answer"
                        id={answerId}
                        initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease }}
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="closing-cta"
        id="book"
        aria-labelledby="closing-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="closing-cta__inner">
          <motion.div
            className="closing-cta__copy"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h2 id="closing-heading" variants={reveal} transition={{ duration: 0.64, ease }}>
              Ready when you are.
            </motion.h2>
            <motion.p variants={reveal} transition={{ duration: 0.64, ease }}>
              Tell us the car, location, and timing. We will confirm availability and prepare the handover.
            </motion.p>
            <motion.div className="closing-cta__actions" variants={reveal} transition={{ duration: 0.56, ease }}>
              <motion.a
                className="closing-cta__button closing-cta__button--primary"
                href="mailto:hello@auradrive.example?subject=AURA%20DRIVE%20-%20Reserve"
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.012 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                Reserve your car
                <ArrowRight aria-hidden="true" size={18} />
              </motion.a>
              <motion.a
                className="closing-cta__button closing-cta__button--secondary"
                href="mailto:hello@auradrive.example?subject=AURA%20DRIVE%20-%20Concierge"
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.012 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                Ask a concierge
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="closing-cta__panel"
            aria-label="Concierge confirmation details"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.24 }}
            transition={{ staggerChildren: 0.07 }}
          >
            {closingSignals.map((signal) => {
              const SignalIcon = signal.icon;

              return (
                <motion.div className="closing-cta__item" key={signal.title} variants={reveal} transition={{ duration: 0.5, ease }}>
                  <span className="closing-cta__item-icon">
                    <SignalIcon aria-hidden="true" size={18} />
                  </span>
                  <span>
                    <strong>{signal.title}</strong>
                    <span>{signal.detail}</span>
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}

export default App;

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Headphones,
  Menu,
  ShieldCheck,
  Sparkles
} from "lucide-react";

type VehicleClass = "Any class" | "Supercar" | "Executive SUV" | "Performance sedan";

type FleetVehicle = {
  name: string;
  className: Exclude<VehicleClass, "Any class">;
  rate: string;
  detail: string;
};

const vehicleClasses: VehicleClass[] = [
  "Any class",
  "Supercar",
  "Executive SUV",
  "Performance sedan"
];

const fleet: FleetVehicle[] = [
  {
    name: "Aston Grand Tourer",
    className: "Supercar",
    rate: "$1,240/day",
    detail: "V12 coupe, concierge delivery"
  },
  {
    name: "Range Autobiography",
    className: "Executive SUV",
    rate: "$780/day",
    detail: "Chauffeur-ready, airport handoff"
  },
  {
    name: "Bentley Flying Spur",
    className: "Performance sedan",
    rate: "$960/day",
    detail: "Executive rear cabin, weekend terms"
  }
];

const defaultPickup = "2026-05-16";
const defaultReturn = "2026-05-18";

function App() {
  const [pickup, setPickup] = useState(defaultPickup);
  const [returnDate, setReturnDate] = useState(defaultReturn);
  const [vehicleClass, setVehicleClass] = useState<VehicleClass>("Any class");
  const [result, setResult] = useState("Select your dates and preferred class.");

  const availableFleet = useMemo(() => {
    if (vehicleClass === "Any class") {
      return fleet;
    }

    return fleet.filter((vehicle) => vehicle.className === vehicleClass);
  }, [vehicleClass]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const matches = availableFleet.length;
    const plural = matches === 1 ? "vehicle" : "vehicles";
    setResult(`${matches} ${plural} available from ${formatDate(pickup)} to ${formatDate(returnDate)}.`);
  }

  return (
    <main className="site-shell">
      <section className="hero" aria-label="AURA DRIVE luxury car rental hero">
        <img
          className="hero__image"
          src="/assets/hero-luxury-car.png"
          alt="Black luxury grand tourer outside an illuminated hotel entrance"
        />
        <div className="hero__shade" />

        <header className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="AURA DRIVE home">
            AURA DRIVE
          </a>
          <nav className="nav__links" aria-label="Primary">
            <a href="#fleet">Fleet</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav__cta" href="#booking">
            Book a car
            <ArrowRight aria-hidden="true" size={18} />
          </a>
          <button className="nav__menu" type="button" aria-label="Open navigation menu">
            <Menu aria-hidden="true" size={24} />
          </button>
        </header>

        <div className="hero__content" id="top">
          <div className="hero__copy">
            <h1>Luxury cars, delivered on your schedule</h1>
            <p>
              Reserve performance sedans, supercars, and executive SUVs with white-glove handoff
              across the city.
            </p>

            <div className="hero__actions" aria-label="Hero actions">
              <a className="button button--primary" href="#booking">
                Reserve now
                <ArrowRight aria-hidden="true" size={20} />
              </a>
              <a className="button button--secondary" href="#fleet">
                Explore fleet
                <ArrowRight aria-hidden="true" size={20} />
              </a>
            </div>

            <div className="hero__proof" aria-label="Luxury rental promises">
              <span>
                <Headphones aria-hidden="true" size={22} />
                24/7 concierge
              </span>
              <span>
                <ShieldCheck aria-hidden="true" size={22} />
                Insured luxury fleet
              </span>
            </div>
          </div>
        </div>

        <form className="booking" id="booking" onSubmit={handleSubmit}>
          <label className="booking__field">
            <span>Pickup</span>
            <div>
              <CalendarDays aria-hidden="true" size={22} />
              <input
                type="date"
                value={pickup}
                min="2026-05-12"
                onChange={(event) => setPickup(event.target.value)}
              />
            </div>
          </label>

          <label className="booking__field">
            <span>Return</span>
            <div>
              <CalendarDays aria-hidden="true" size={22} />
              <input
                type="date"
                value={returnDate}
                min={pickup}
                onChange={(event) => setReturnDate(event.target.value)}
              />
            </div>
          </label>

          <label className="booking__field">
            <span>Vehicle class</span>
            <div>
              <CarFront aria-hidden="true" size={22} />
              <select
                value={vehicleClass}
                onChange={(event) => setVehicleClass(event.target.value as VehicleClass)}
              >
                {vehicleClasses.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </label>

          <button className="booking__submit" type="submit">
            Search available cars
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </form>
      </section>

      <section className="fleet-preview" id="fleet" aria-label="Curated vehicle preview">
        <div className="fleet-preview__heading">
          <div>
            <h2>Curated vehicles. Uncompromising standard.</h2>
            <p>{result}</p>
          </div>
          <a className="fleet-preview__link" href="#contact">
            View all vehicles
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>

        <div className="vehicle-grid">
          {availableFleet.map((vehicle) => (
            <article className="vehicle-card" key={vehicle.name}>
              <div className="vehicle-card__media">
                <img src="/assets/hero-luxury-car.png" alt="" aria-hidden="true" />
                <Sparkles aria-hidden="true" size={20} />
              </div>
              <div className="vehicle-card__body">
                <span>{vehicle.className}</span>
                <h3>{vehicle.name}</h3>
                <p>{vehicle.detail}</p>
                <strong>{vehicle.rate}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

export default App;

import { type FormEvent, type PointerEvent, useEffect, useRef, useState } from "react";
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
import {
  ArrowRight,
  BriefcaseBusiness,
  Gem,
  Images,
  Menu,
  Pause,
  Phone,
  Plane,
  Play,
  Plus,
  Quote,
  Sparkles,
  Waves,
  X,
} from "lucide-react";

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

const carCategories = ["All", "SUV", "Sedan", "Chauffeur", "Supercar"] as const;

const carsPageVehicles = [
  {
    id: "range-rover-autobiography",
    name: "Range Rover Autobiography",
    category: "SUV",
    brand: "Range Rover",
    price: "from $940/day",
    dailyRate: 940,
    image: "/assets/fleet-range-rover.jpg",
    alt: "Black Range Rover parked by palm trees and modern architecture",
    seats: "5 seats",
    ideal: "Airport / family",
  },
  {
    id: "mercedes-s-class",
    name: "Mercedes S-Class",
    category: "Sedan",
    brand: "Mercedes",
    price: "from $820/day",
    dailyRate: 820,
    image: "/assets/fleet-s-class.jpg",
    alt: "Black Mercedes S-Class in a bright studio",
    seats: "4 seats",
    ideal: "Business / airport",
  },
  {
    id: "rolls-royce-ghost",
    name: "Rolls-Royce Ghost",
    category: "Chauffeur",
    brand: "Rolls-Royce",
    price: "from $1,640/day",
    dailyRate: 1640,
    image: "/assets/fleet-rolls-royce.jpg",
    alt: "Black Rolls-Royce Ghost in a refined city street",
    seats: "4 seats",
    ideal: "Private entrance",
  },
  {
    id: "porsche-911",
    name: "Porsche 911 GT3 RS",
    category: "Supercar",
    brand: "Porsche",
    price: "from $1,180/day",
    dailyRate: 1180,
    image: "/assets/fleet-porsche.jpg",
    alt: "White Porsche 911 GT3 RS driving on an open road",
    seats: "2 seats",
    ideal: "Weekend / coast",
  },
  {
    id: "lamborghini-huracan",
    name: "Lamborghini Huracan",
    category: "Supercar",
    brand: "Lamborghini",
    price: "from $1,450/day",
    dailyRate: 1450,
    image: "/assets/fleet-lamborghini.jpg",
    alt: "Blue Lamborghini Huracan driving on a road",
    seats: "2 seats",
    ideal: "Evening / event",
  },
  {
    id: "ferrari-portofino",
    name: "Ferrari Portofino",
    category: "Supercar",
    brand: "Ferrari",
    price: "from $1,360/day",
    dailyRate: 1360,
    image: "/assets/fleet-ferrari.jpg",
    alt: "Red Ferrari convertible on a sunlit road",
    seats: "2 seats",
    ideal: "Coast / weekend",
  },
  {
    id: "mercedes-maybach-s580",
    name: "Mercedes-Maybach S580",
    category: "Chauffeur",
    brand: "Mercedes",
    price: "from $1,080/day",
    dailyRate: 1080,
    image: "/assets/arrival-airport.jpg",
    alt: "Black luxury sedan parked beside a private aircraft on a runway",
    seats: "4 seats",
    ideal: "VIP airport",
  },
  {
    id: "bmw-7-series",
    name: "BMW 7 Series",
    category: "Sedan",
    brand: "BMW",
    price: "from $760/day",
    dailyRate: 760,
    image: "/assets/arrival-business.jpg",
    alt: "Client stepping into a black luxury sedan outside a modern business building",
    seats: "4 seats",
    ideal: "Business day",
  },
  {
    id: "bentley-bentayga",
    name: "Bentley Bentayga",
    category: "SUV",
    brand: "Bentley",
    price: "from $1,220/day",
    dailyRate: 1220,
    image: "/assets/range-rover-cabin-profile.jpg",
    alt: "Luxury SUV cabin side profile",
    seats: "5 seats",
    ideal: "Family route",
  },
  {
    id: "rolls-royce-cullinan",
    name: "Rolls-Royce Cullinan",
    category: "SUV",
    brand: "Rolls-Royce",
    price: "from $1,880/day",
    dailyRate: 1880,
    image: "/assets/fleet-rolls-royce.jpg",
    alt: "Black Rolls-Royce in a refined city street",
    seats: "4 seats",
    ideal: "Private arrival",
  },
  {
    id: "aston-martin-vantage",
    name: "Aston Martin Vantage",
    category: "Supercar",
    brand: "Aston Martin",
    price: "from $980/day",
    dailyRate: 980,
    image: "/assets/arrival-coast.jpg",
    alt: "Black performance convertible on a coastal hillside road at golden hour",
    seats: "2 seats",
    ideal: "Coast drive",
  },
  {
    id: "mclaren-720s",
    name: "McLaren 720S",
    category: "Supercar",
    brand: "McLaren",
    price: "from $1,520/day",
    dailyRate: 1520,
    image: "/assets/fleet-lamborghini.jpg",
    alt: "Blue supercar driving on a road",
    seats: "2 seats",
    ideal: "Event arrival",
  },
  {
    id: "porsche-911-turbo-s",
    name: "Porsche 911 Turbo S",
    category: "Supercar",
    brand: "Porsche",
    price: "from $1,240/day",
    dailyRate: 1240,
    image: "/assets/fleet-porsche.jpg",
    alt: "White Porsche driving on an open road",
    seats: "2 seats",
    ideal: "Weekend drive",
  },
  {
    id: "ferrari-roma",
    name: "Ferrari Roma",
    category: "Supercar",
    brand: "Ferrari",
    price: "from $1,420/day",
    dailyRate: 1420,
    image: "/assets/arrival-evening.jpg",
    alt: "Red supercar parked outside a refined hotel entrance",
    seats: "2 seats",
    ideal: "Evening entrance",
  },
  {
    id: "maserati-grancabrio",
    name: "Maserati GranCabrio",
    category: "Supercar",
    brand: "Maserati",
    price: "from $890/day",
    dailyRate: 890,
    image: "/assets/bright-coastal-car.png",
    alt: "Pearl white luxury convertible parked beside a sunny coastal villa",
    seats: "2 seats",
    ideal: "Bright arrival",
  },
];

const carBrands = [
  "All brands",
  "Aston Martin",
  "Bentley",
  "BMW",
  "Ferrari",
  "Lamborghini",
  "Maserati",
  "McLaren",
  "Mercedes",
  "Porsche",
  "Range Rover",
  "Rolls-Royce",
] as const;
const carSortOptions = ["Recommended", "Price low", "Price high"] as const;

const vehiclePreferenceStorageKey = "aura-drive-vehicle-preference";
const vehicleRequestOptions = Array.from(new Set([...fleetShowcases.map((vehicle) => vehicle.name), ...carsPageVehicles.map((vehicle) => vehicle.name)]));

type VehicleGalleryImage = {
  src: string;
  alt: string;
};

const carDetailGalleries: Record<string, VehicleGalleryImage[]> = {
  "range-rover-autobiography": [
    { src: "/assets/fleet-range-rover.jpg", alt: "Black Range Rover parked by palm trees and modern architecture" },
    { src: "/assets/range-rover-cabin-front.jpg", alt: "Range Rover front cabin with leather seats" },
    { src: "/assets/range-rover-cabin-rear.jpg", alt: "Range Rover rear cabin seating" },
    { src: "/assets/range-rover-cabin-controls.jpg", alt: "Range Rover interior controls and center console" },
    { src: "/assets/range-rover-cabin-profile.jpg", alt: "Range Rover side cabin profile" },
  ],
  "mercedes-s-class": [
    { src: "/assets/fleet-s-class.jpg", alt: "Black Mercedes S-Class in a bright studio" },
    { src: "/assets/mercedes-cabin-front.jpg", alt: "Mercedes S-Class front cabin and steering wheel" },
    { src: "/assets/mercedes-cabin-rear.jpg", alt: "Mercedes S-Class rear cabin detail" },
    { src: "/assets/mercedes-exterior-side.jpg", alt: "Mercedes S-Class exterior side profile" },
    { src: "/assets/mercedes-exterior-rear.jpg", alt: "Mercedes S-Class rear exterior detail" },
  ],
  "rolls-royce-ghost": [
    { src: "/assets/fleet-rolls-royce.jpg", alt: "Black Rolls-Royce Ghost in a refined city street" },
    { src: "/assets/ghost-cabin-front.jpg", alt: "Rolls-Royce Ghost front cabin detail" },
    { src: "/assets/ghost-cabin-seat.jpg", alt: "Rolls-Royce Ghost leather seat detail" },
    { src: "/assets/ghost-cabin-dashboard.jpg", alt: "Rolls-Royce Ghost dashboard detail" },
    { src: "/assets/ghost-cabin-rear.jpg", alt: "Rolls-Royce Ghost rear cabin detail" },
  ],
};

const categoryDetailCopy: Record<string, string> = {
  Chauffeur: "Quiet presence for private transfers, events, and entrances where the handover should feel invisible.",
  Sedan: "A polished choice for airport arrivals, business days, and calm city movement.",
  Supercar: "Sharper energy for weekends, coast routes, evening entrances, and moments that should feel memorable.",
  SUV: "Space, comfort, and presence for airport pickup, luggage, family routes, and longer plans.",
};

function getVehicleDetailPath(vehicleName: string) {
  const vehicle = carsPageVehicles.find((car) => car.name === vehicleName);

  return vehicle ? `/cars/${vehicle.id}` : "/cars";
}

function getVehicleGallery(vehicle: (typeof carsPageVehicles)[number]) {
  return (
    carDetailGalleries[vehicle.id] ?? [
      { src: vehicle.image, alt: vehicle.alt },
      { src: "/assets/arrival-airport.jpg", alt: "Luxury car prepared for an airport pickup" },
      { src: "/assets/arrival-business.jpg", alt: "Luxury car prepared for a business arrival" },
      { src: "/assets/arrival-coast.jpg", alt: "Luxury performance car on a coastal route" },
      { src: "/assets/arrival-evening.jpg", alt: "Luxury car prepared for an evening entrance" },
    ]
  );
}

function rememberVehiclePreference(vehicleName: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(vehiclePreferenceStorageKey, vehicleName);
  } catch {
    // Browsers can block storage in strict privacy modes; the request form still works without it.
  }
}

function getInitialVehiclePreference() {
  if (typeof window === "undefined") {
    return fleetShowcases[0].name;
  }

  let savedVehicle: string | null = null;

  try {
    savedVehicle = window.localStorage.getItem(vehiclePreferenceStorageKey);
  } catch {
    return fleetShowcases[0].name;
  }

  return savedVehicle && vehicleRequestOptions.includes(savedVehicle) ? savedVehicle : fleetShowcases[0].name;
}

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

const requestTypes = [
  {
    label: "Airport",
    detail: "Flight timing, luggage, and terminal pickup.",
    icon: Plane,
  },
  {
    label: "Business",
    detail: "Meetings, waiting time, and discreet routes.",
    icon: BriefcaseBusiness,
  },
  {
    label: "Weekend",
    detail: "Family plans, coast drives, and extra room.",
    icon: Waves,
  },
  {
    label: "Chauffeur",
    detail: "Driver-led transfers and private arrivals.",
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

const conciergeServices = [
  {
    title: "Airport arrivals",
    detail: "Flight-aware timing, terminal pickup, luggage planning, and a calm first mile.",
    image: "/assets/arrival-airport.jpg",
    alt: "Black luxury sedan parked beside a private aircraft on a runway",
    icon: Plane,
  },
  {
    title: "Business routes",
    detail: "Discreet vehicles for meetings, waiting time, multi-stop schedules, and late changes.",
    image: "/assets/arrival-business.jpg",
    alt: "Client stepping into a black luxury sedan outside a modern business building",
    icon: BriefcaseBusiness,
  },
  {
    title: "Weekend plans",
    detail: "SUVs, grand tourers, and convertibles matched to luggage, distance, and mood.",
    image: "/assets/arrival-coast.jpg",
    alt: "Black Ferrari convertible on a coastal hillside road at golden hour",
    icon: Waves,
  },
  {
    title: "Private entrances",
    detail: "Prepared handovers for dinners, hotels, events, and chauffeur-led arrivals.",
    image: "/assets/arrival-evening.jpg",
    alt: "Red supercar parked outside a refined hotel entrance",
    icon: Sparkles,
  },
];

const conciergeSteps = ["Share the route", "Confirm the car", "Prepare handover", "Stay supported"];

const termsItems = [
  {
    title: "Booking confirmation",
    body: "Availability, final rate, delivery details, deposit, and handover timing are confirmed before a vehicle is prepared.",
  },
  {
    title: "Driver eligibility",
    body: "Drivers must provide valid licence details, contact information, and any documents required for the selected vehicle and location.",
  },
  {
    title: "Delivery and return",
    body: "Delivery can be arranged for airports, hotels, residences, offices, and private venues where access and timing allow.",
  },
  {
    title: "Coverage and responsibility",
    body: "Coverage, excess, mileage, fuel, tolls, parking, and any additional driver details are confirmed with the booking.",
  },
  {
    title: "Changes and cancellations",
    body: "Schedule changes are handled by the concierge team where possible. Cancellation terms depend on the vehicle and preparation window.",
  },
  {
    title: "Vehicle condition",
    body: "Cars are handed over clean, documented, and ready. Return condition, fuel level, and mileage are reviewed at collection.",
  },
];

const contactMethods = [
  {
    title: "Email",
    value: "hello@auradrive.example",
    href: "mailto:hello@auradrive.example",
    detail: "Best for quotes, documents, and planned bookings.",
  },
  {
    title: "Phone",
    value: "+1 000 000 0000",
    href: "tel:+10000000000",
    detail: "Best for same-day timing and handover updates.",
  },
  {
    title: "Concierge",
    value: "Request availability",
    href: "/book",
    detail: "Best when you want us to match the car to the trip.",
  },
];

const bookingAssurances = [
  "Availability checked before preparation",
  "Delivery notes confirmed with concierge",
  "Rate and deposit shared before handover",
];

const siteOrigin = "https://aura-drive-luxury-rentals.vercel.app";
const lastSubmissionStorageKey = "aura-drive-last-submission";

type FormStatus = "idle" | "submitting" | "error";

type SubmissionResponse = {
  ok: boolean;
  reference: string;
  type: string;
  receivedAt: string;
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

function getRouteMeta(currentPath: string, carDetailId: string): PageMeta {
  const path = currentPath || "/";

  if (carDetailId) {
    const vehicle = carsPageVehicles.find((car) => car.id === carDetailId);

    return {
      title: vehicle ? `${vehicle.name} | AURA DRIVE` : "Luxury Cars | AURA DRIVE",
      description: vehicle
        ? `${vehicle.name} available through AURA DRIVE with concierge delivery, clear rates, and a prepared handover.`
        : "Browse AURA DRIVE luxury cars for airport arrivals, business routes, weekends, and private entrances.",
      path,
    };
  }

  const metaByPath: Record<string, PageMeta> = {
    "/": {
      title: "AURA DRIVE | Luxury Car Rentals",
      description: "Luxury-only car rentals with concierge delivery for airport arrivals, business routes, weekends, and private entrances.",
      path: "/",
    },
    "/cars": {
      title: "Cars | AURA DRIVE",
      description: "Browse the AURA DRIVE luxury fleet, including SUVs, executive sedans, chauffeur cars, and supercars.",
      path: "/cars",
    },
    "/concierge": {
      title: "Concierge | AURA DRIVE",
      description: "Plan airport pickups, business routes, weekend trips, and private entrances with the AURA DRIVE concierge team.",
      path: "/concierge",
    },
    "/terms": {
      title: "Rental Terms | AURA DRIVE",
      description: "Review AURA DRIVE booking, delivery, driver, coverage, and handover terms before confirming a luxury car rental.",
      path: "/terms",
    },
    "/contact": {
      title: "Contact | AURA DRIVE",
      description: "Contact the AURA DRIVE concierge team for availability, documents, same-day timing, or vehicle guidance.",
      path: "/contact",
    },
    "/book": {
      title: "Book Now | AURA DRIVE",
      description: "Request a luxury car booking with vehicle preference, pickup timing, delivery location, and concierge support.",
      path: "/book",
    },
    "/thank-you": {
      title: "Request Received | AURA DRIVE",
      description: "Your AURA DRIVE request has been received. Concierge will review availability and reply with the next step.",
      path: "/thank-you",
    },
  };

  return metaByPath[path] ?? metaByPath["/"];
}

function setMetaAttribute(attribute: "name" | "property", key: string, content: string) {
  if (typeof document === "undefined") {
    return;
  }

  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(path: string) {
  if (typeof document === "undefined") {
    return;
  }

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", `${siteOrigin}${path === "/" ? "" : path}`);
}

function useRouteMeta(currentPath: string, carDetailId: string) {
  useEffect(() => {
    const meta = getRouteMeta(currentPath, carDetailId);

    document.title = meta.title;
    setMetaAttribute("name", "description", meta.description);
    setMetaAttribute("property", "og:title", meta.title);
    setMetaAttribute("property", "og:description", meta.description);
    setMetaAttribute("property", "og:url", `${siteOrigin}${meta.path === "/" ? "" : meta.path}`);
    setMetaAttribute("property", "og:type", "website");
    setMetaAttribute("name", "twitter:card", "summary_large_image");
    setMetaAttribute("name", "twitter:title", meta.title);
    setMetaAttribute("name", "twitter:description", meta.description);
    setCanonical(meta.path);
  }, [currentPath, carDetailId]);
}

function readLastSubmission() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const savedSubmission = window.localStorage.getItem(lastSubmissionStorageKey);

    return savedSubmission ? (JSON.parse(savedSubmission) as SubmissionResponse) : null;
  } catch {
    return null;
  }
}

function rememberSubmission(submission: SubmissionResponse) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(lastSubmissionStorageKey, JSON.stringify(submission));
  } catch {
    // Confirmation still works through the URL reference if storage is unavailable.
  }
}

async function submitLeadForm(form: HTMLFormElement, formType: string, extraFields: Record<string, string> = {}) {
  const formData = new FormData(form);
  const fields = Object.fromEntries([...formData.entries()].map(([key, value]) => [key, String(value)]));
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType,
      fields: {
        ...fields,
        ...extraFields,
      },
      path: typeof window === "undefined" ? "" : window.location.pathname,
    }),
  });

  const result = (await response.json()) as SubmissionResponse & { message?: string };

  if (!response.ok || !result.ok) {
    throw new Error(result.message ?? "Unable to submit the form.");
  }

  rememberSubmission(result);

  if (typeof window !== "undefined") {
    window.location.assign(`/thank-you?ref=${encodeURIComponent(result.reference)}&type=${encodeURIComponent(result.type)}`);
  }

  return result;
}

type FleetShowcase = (typeof fleetShowcases)[number];

type FleetShowcaseCardProps = {
  active: boolean;
  index: number;
  onReserve: (vehicleName: string) => void;
  progress: MotionValue<number>;
  vehicle: FleetShowcase;
};

function FleetShowcaseCard({ active, index, onReserve, progress, vehicle }: FleetShowcaseCardProps) {
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
          href={getVehicleDetailPath(vehicle.name)}
          aria-label={`View ${vehicle.name} details`}
          onClick={() => rememberVehiclePreference(vehicle.name)}
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
              href={getVehicleDetailPath(vehicle.name)}
              key={image.src}
              aria-label={`View ${vehicle.name} details`}
              onClick={() => rememberVehiclePreference(vehicle.name)}
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
          href="/book"
          aria-label={`Reserve ${vehicle.name}`}
          onClick={() => onReserve(vehicle.name)}
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

function FleetShowcaseStack({ onReserve }: { onReserve: (vehicleName: string) => void }) {
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
            onReserve={onReserve}
            progress={scrollYProgress}
            vehicle={vehicle}
          />
        ))}
      </div>
    </div>
  );
}

function CarsPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof carCategories)[number]>("All");
  const [selectedBrand, setSelectedBrand] = useState<(typeof carBrands)[number]>("All brands");
  const [sortOption, setSortOption] = useState<(typeof carSortOptions)[number]>("Recommended");
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };
  const filteredVehicles = carsPageVehicles
    .filter((vehicle) => selectedCategory === "All" || vehicle.category === selectedCategory)
    .filter((vehicle) => selectedBrand === "All brands" || vehicle.brand === selectedBrand)
    .sort((firstVehicle, secondVehicle) => {
      if (sortOption === "Price low") {
        return firstVehicle.dailyRate - secondVehicle.dailyRate;
      }

      if (sortOption === "Price high") {
        return secondVehicle.dailyRate - firstVehicle.dailyRate;
      }

      return 0;
    });
  const resetCarsFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All brands");
    setSortOption("Recommended");
  };

  return (
    <motion.section
      className="cars-page"
      id="cars-list"
      aria-labelledby="cars-page-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease }}
    >
      <div className="cars-page__inner">
        <div className="cars-page__masthead">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.08 }}
          >
            <motion.h1 id="cars-page-heading" variants={reveal} transition={{ duration: 0.68, ease }}>
              Cars
            </motion.h1>
            <motion.p variants={reveal} transition={{ duration: 0.62, ease }}>
              Explore a focused luxury fleet for airport arrivals, business routes, weekends, and private entrances.
            </motion.p>
          </motion.div>

          <motion.a
            className="cars-page__concierge"
            href="/concierge"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.56, delay: 0.22, ease }}
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.012 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            Ask concierge
            <ArrowRight aria-hidden="true" size={17} />
          </motion.a>
        </div>

        <motion.div
          className="cars-toolbar"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.18, ease }}
        >
          <div className="cars-filter" aria-label="Filter cars by type">
            <span className="cars-filter__label">Type</span>
            <span className="cars-filter__options">
              {carCategories.map((category) => (
                <button
                  className={`cars-filter__button ${selectedCategory === category ? "cars-filter__button--active" : ""}`}
                  type="button"
                  key={category}
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "All" ? "All vehicles" : category}
                </button>
              ))}
            </span>
          </div>

          <label className="cars-select">
            <span>Brand</span>
            <select value={selectedBrand} onChange={(event) => setSelectedBrand(event.currentTarget.value as (typeof carBrands)[number])}>
              {carBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </label>

          <label className="cars-select">
            <span>Sort</span>
            <select value={sortOption} onChange={(event) => setSortOption(event.currentTarget.value as (typeof carSortOptions)[number])}>
              {carSortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </motion.div>

        <div className="cars-page__count" aria-live="polite">
          {filteredVehicles.length} {filteredVehicles.length === 1 ? "vehicle" : "vehicles"} available
        </div>

        <motion.div
          className="cars-grid"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.06 }}
        >
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <motion.article className="car-card" key={vehicle.id} variants={reveal} transition={{ duration: 0.52, ease }}>
                <a className="car-card__media" href={`/cars/${vehicle.id}`} aria-label={`View ${vehicle.name} details`} onClick={() => rememberVehiclePreference(vehicle.name)}>
                  <img src={vehicle.image} alt={vehicle.alt} />
                  <span className="car-card__wash" />
                  <span className="car-card__chips" aria-hidden="true">
                    <span>{vehicle.seats}</span>
                    <span>{vehicle.category}</span>
                    <span>{vehicle.ideal}</span>
                  </span>
                  <span className="car-card__view">
                    View details
                    <ArrowRight aria-hidden="true" size={15} />
                  </span>
                </a>

                <div className="car-card__body">
                  <div className="car-card__summary">
                    <div className="car-card__title">
                      <span>{vehicle.brand}</span>
                      <h2>{vehicle.name}</h2>
                    </div>
                    <span className="car-card__price">{vehicle.price}</span>
                  </div>

                  <a className="car-card__request" href="/book" onClick={() => rememberVehiclePreference(vehicle.name)}>
                    Reserve this car
                    <ArrowRight aria-hidden="true" size={17} />
                  </a>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div className="cars-empty" variants={reveal} transition={{ duration: 0.52, ease }}>
              <h2>No cars match this filter.</h2>
              <p>Reset the filters or ask concierge to recommend the closest available car.</p>
              <button type="button" onClick={resetCarsFilters}>
                Reset filters
              </button>
            </motion.div>
          )}
        </motion.div>

      <motion.section
        className="cars-page__closing"
        aria-labelledby="cars-closing-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.36 }}
        transition={{ duration: 0.62, ease }}
      >
        <div>
          <h2 id="cars-closing-heading">Not sure which car fits?</h2>
          <p>Tell us the route, passengers, luggage, and tone of the arrival. We will suggest the right option.</p>
        </div>

        <motion.a
          className="cars-page__closing-button"
          href="/book"
          whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.012 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          Request a match
          <ArrowRight aria-hidden="true" size={17} />
        </motion.a>
      </motion.section>
      </div>
    </motion.section>
  );
}

function CarDetailPage({ vehicleId }: { vehicleId: string }) {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };
  const vehicle = carsPageVehicles.find((car) => car.id === vehicleId);

  if (!vehicle) {
    return (
      <motion.section
        className="cars-page car-detail-page"
        id="car-detail"
        aria-labelledby="car-detail-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="cars-page__inner">
          <div className="car-detail-empty">
            <h1 id="car-detail-heading">Car not found</h1>
            <p>This car may no longer be available. Browse the fleet or ask concierge to match the right option.</p>
            <a href="/cars">
              Browse cars
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
      </motion.section>
    );
  }

  const gallery = getVehicleGallery(vehicle);
  const [primaryImage, ...supportingImages] = gallery;
  const directMatches = carsPageVehicles
    .filter((candidate) => candidate.id !== vehicle.id)
    .filter((candidate) => candidate.category === vehicle.category || candidate.brand === vehicle.brand)
    .slice(0, 3);
  const relatedIds = new Set(directMatches.map((candidate) => candidate.id));
  const relatedVehicles = [
    ...directMatches,
    ...carsPageVehicles.filter((candidate) => candidate.id !== vehicle.id && !relatedIds.has(candidate.id)),
  ].slice(0, 3);
  const specs = [
    { label: "Rate", value: vehicle.price },
    { label: "Seats", value: vehicle.seats },
    { label: "Best for", value: vehicle.ideal },
    { label: "Delivery", value: "Airport / hotel / residence" },
    { label: "Support", value: vehicle.category === "Chauffeur" ? "Driver-led available" : "Concierge handover" },
  ];

  return (
    <motion.section
      className="cars-page car-detail-page"
      id="car-detail"
      aria-labelledby="car-detail-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease }}
    >
      <div className="cars-page__inner">
        <motion.a
          className="car-detail__return"
          href="/cars"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          All cars
        </motion.a>

        <motion.div
          className="car-detail-gallery"
          aria-label={`${vehicle.name} gallery`}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.06, delayChildren: 0.06 }}
        >
          <motion.div className="car-detail-gallery__main" variants={reveal} transition={{ duration: 0.58, ease }}>
            <img src={primaryImage.src} alt={primaryImage.alt} />
            <span className="car-detail-gallery__wash" />
            <a href="/book" onClick={() => rememberVehiclePreference(vehicle.name)}>
              Book this car
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </motion.div>

          <div className="car-detail-gallery__side">
            {supportingImages.slice(0, 4).map((image) => (
              <motion.div className="car-detail-gallery__thumb" key={image.src} variants={reveal} transition={{ duration: 0.52, ease }}>
                <img src={image.src} alt={image.alt} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="car-detail-info">
          <motion.div
            className="car-detail-info__copy"
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.08 }}
          >
            <motion.span variants={reveal} transition={{ duration: 0.48, ease }}>
              {vehicle.category}
            </motion.span>
            <motion.h1 id="car-detail-heading" variants={reveal} transition={{ duration: 0.62, ease }}>
              {vehicle.name}
            </motion.h1>
            <motion.p variants={reveal} transition={{ duration: 0.56, ease }}>
              {categoryDetailCopy[vehicle.category] ?? "Prepared with concierge support for a calm, polished handover."}
            </motion.p>
          </motion.div>

          <motion.aside
            className="car-detail-booking"
            aria-label={`${vehicle.name} booking summary`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.62, delay: 0.16, ease }}
          >
            <span>{vehicle.price}</span>
            <small>Concierge delivery included</small>
            <a href="/book" onClick={() => rememberVehiclePreference(vehicle.name)}>
              Reserve this car
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </motion.aside>
        </div>

        <motion.div
          className="car-detail-specs"
          aria-label={`${vehicle.name} key details`}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {specs.map((spec) => (
            <motion.div className="car-detail-spec" key={spec.label} variants={reveal} transition={{ duration: 0.48, ease }}>
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </motion.div>
          ))}
        </motion.div>

        <motion.section
          className="car-detail-related"
          aria-labelledby="related-cars-heading"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.62, ease }}
        >
          <div className="car-detail-related__top">
            <h2 id="related-cars-heading">Similar cars</h2>
            <a href="/cars">View fleet</a>
          </div>

          <div className="car-detail-related__grid">
            {relatedVehicles.map((relatedVehicle) => (
              <a className="car-detail-related__card" href={`/cars/${relatedVehicle.id}`} key={relatedVehicle.id}>
                <img src={relatedVehicle.image} alt={relatedVehicle.alt} />
                <span>
                  <small>{relatedVehicle.category}</small>
                  <strong>{relatedVehicle.name}</strong>
                  <em>{relatedVehicle.price}</em>
                </span>
              </a>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.section>
  );
}

function ConciergePage() {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="info-page concierge-page"
      id="concierge-page"
      aria-labelledby="concierge-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease }}
    >
      <div className="info-page__inner">
        <div className="info-hero info-hero--media">
          <motion.div initial={shouldReduceMotion ? false : "hidden"} animate="visible" transition={{ staggerChildren: 0.08, delayChildren: 0.08 }}>
            <motion.h1 id="concierge-heading" variants={reveal} transition={{ duration: 0.68, ease }}>
              Concierge
            </motion.h1>
            <motion.p variants={reveal} transition={{ duration: 0.62, ease }}>
              Tell us the route, timing, passengers, and tone of the arrival. We prepare the right car and keep the handover calm.
            </motion.p>
            <motion.div className="info-hero__actions" variants={reveal} transition={{ duration: 0.56, ease }}>
              <a className="info-button info-button--primary" href="/book">
                Request availability
                <ArrowRight aria-hidden="true" size={17} />
              </a>
              <a className="info-button info-button--secondary" href="/cars">
                Browse cars
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="info-hero__panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
          >
            <img src="/assets/arrival-airport.jpg" alt="Black luxury sedan parked beside a private aircraft on a runway" />
            <span className="info-hero__wash" />
            <span className="info-hero__panel-copy">
              <strong>Airport, hotel, residence, or office.</strong>
              <span>One request. One handover plan.</span>
            </span>
          </motion.div>
        </div>

        <motion.div
          className="service-grid"
          aria-label="Concierge services"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ staggerChildren: 0.08 }}
        >
          {conciergeServices.map((service) => {
            const ServiceIcon = service.icon;

            return (
              <motion.article className="service-card" key={service.title} variants={reveal} transition={{ duration: 0.56, ease }}>
                <img src={service.image} alt={service.alt} />
                <span className="service-card__wash" />
                <span className="service-card__content">
                  <span className="service-card__icon">
                    <ServiceIcon aria-hidden="true" size={18} />
                  </span>
                  <strong>{service.title}</strong>
                  <span>{service.detail}</span>
                </span>
              </motion.article>
            );
          })}
        </motion.div>

        <section className="info-band" aria-labelledby="concierge-process-heading">
          <div>
            <h2 id="concierge-process-heading">How it works.</h2>
            <p>We keep the process edited: the important details, confirmed once, then handled quietly.</p>
          </div>
          <div className="step-rail">
            {conciergeSteps.map((step, index) => (
              <span className="step-rail__item" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </span>
            ))}
          </div>
        </section>
      </div>
    </motion.section>
  );
}

function TermsPage() {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="info-page terms-page"
      id="terms-page"
      aria-labelledby="terms-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease }}
    >
      <div className="info-page__inner info-page__inner--narrow">
        <div className="info-hero">
          <motion.div initial={shouldReduceMotion ? false : "hidden"} animate="visible" transition={{ staggerChildren: 0.08, delayChildren: 0.08 }}>
            <motion.h1 id="terms-heading" variants={reveal} transition={{ duration: 0.68, ease }}>
              Rental terms
            </motion.h1>
            <motion.p variants={reveal} transition={{ duration: 0.62, ease }}>
              A clear overview of how bookings, handovers, documents, and changes are handled. Final terms are confirmed with each reservation.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="terms-list"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.06, delayChildren: 0.18 }}
        >
          {termsItems.map((item, index) => (
            <motion.article className="terms-item" key={item.title} variants={reveal} transition={{ duration: 0.5, ease }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <section className="info-band info-band--compact" aria-label="Terms note">
          <div>
            <h2>Need a confirmed quote?</h2>
            <p>Send the dates, pickup point, driver details, and car preference. We will return the exact rate and handover notes.</p>
          </div>
          <a className="info-button info-button--primary" href="/book">
            Request availability
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </section>
      </div>
    </motion.section>
  );
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };
  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setFormStatus("submitting");
    setFormMessage("");

    try {
      await submitLeadForm(form, "contact");
    } catch {
      setFormStatus("error");
      setFormMessage("We could not send this message. Please try again in a moment.");
    }
  };

  return (
    <motion.section
      className="info-page contact-page"
      id="contact-page"
      aria-labelledby="contact-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease }}
    >
      <div className="info-page__inner">
        <div className="info-hero">
          <motion.div initial={shouldReduceMotion ? false : "hidden"} animate="visible" transition={{ staggerChildren: 0.08, delayChildren: 0.08 }}>
            <motion.h1 id="contact-heading" variants={reveal} transition={{ duration: 0.68, ease }}>
              Contact
            </motion.h1>
            <motion.p variants={reveal} transition={{ duration: 0.62, ease }}>
              Reach the concierge team for availability, same-day timing, documents, or help choosing the right car.
            </motion.p>
          </motion.div>
        </div>

        <div className="contact-layout">
          <motion.div
            className="contact-methods"
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: 0.06, delayChildren: 0.16 }}
          >
            {contactMethods.map((method) => (
              <motion.a className="contact-method" href={method.href} key={method.title} variants={reveal} transition={{ duration: 0.5, ease }}>
                <span>{method.title}</span>
                <strong>{method.value}</strong>
                <small>{method.detail}</small>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleContactSubmit}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.64, delay: 0.18, ease }}
          >
            <h2>Send a note.</h2>
            <label>
              <span>Name</span>
              <input name="Name" placeholder="Your name" required />
            </label>
            <label>
              <span>Phone or email</span>
              <input name="Contact" placeholder="Where should we reply?" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="Message" placeholder="Tell us the car, date, location, or question." rows={5} required />
            </label>
            <button type="submit" disabled={formStatus === "submitting"}>
              {formStatus === "submitting" ? "Sending..." : "Send message"}
              <ArrowRight aria-hidden="true" size={17} />
            </button>
            <p className="form-status" aria-live="polite">
              {formMessage}
            </p>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}

function BookPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(getInitialVehiclePreference);
  const [selectedTripStyle, setSelectedTripStyle] = useState(requestTypes[0].label);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const reveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };
  const selectedVehicleDetails = carsPageVehicles.find((vehicle) => vehicle.name === selectedVehicle);
  const summaryVehicle = selectedVehicleDetails ?? carsPageVehicles[0];
  const summaryName = selectedVehicleDetails ? summaryVehicle.name : "Concierge match";
  const summaryCategory = selectedVehicleDetails ? summaryVehicle.category : "Prepared recommendation";
  const summaryPrice = selectedVehicleDetails ? summaryVehicle.price : "Rate confirmed by concierge";

  const updateVehiclePreference = (vehicleName: string) => {
    setSelectedVehicle(vehicleName);

    if (vehicleName !== "Recommend the best fit") {
      rememberVehiclePreference(vehicleName);
    }
  };
  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setFormStatus("submitting");
    setFormMessage("");

    try {
      await submitLeadForm(form, "booking", {
        "Trip style": selectedTripStyle,
        "Vehicle preference": selectedVehicle,
      });
    } catch {
      setFormStatus("error");
      setFormMessage("We could not send this booking request. Please try again in a moment.");
    }
  };

  return (
    <motion.section
      className="info-page book-page"
      id="book-page"
      aria-labelledby="book-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease }}
    >
      <div className="info-page__inner">
        <div className="info-hero book-hero">
          <motion.div initial={shouldReduceMotion ? false : "hidden"} animate="visible" transition={{ staggerChildren: 0.08, delayChildren: 0.08 }}>
            <motion.h1 id="book-heading" variants={reveal} transition={{ duration: 0.68, ease }}>
              Book now
            </motion.h1>
            <motion.p variants={reveal} transition={{ duration: 0.62, ease }}>
              Share the car, timing, and handover location. Concierge will confirm availability and prepare the next step.
            </motion.p>
          </motion.div>
        </div>

        <div className="booking-layout">
          <motion.form
            className="booking-form"
            onSubmit={handleBookingSubmit}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.64, delay: 0.12, ease }}
          >
            <div className="booking-form__header">
              <h2>Trip request</h2>
              <p>Keep it simple. We will reply with the confirmed car, rate, and delivery plan.</p>
            </div>

            <fieldset className="booking-types">
              <legend>Trip style</legend>
              <div className="booking-types__grid">
                {requestTypes.map((type) => {
                  const RequestIcon = type.icon;
                  const isActive = selectedTripStyle === type.label;

                  return (
                    <button
                      className={`booking-type ${isActive ? "booking-type--active" : ""}`}
                      type="button"
                      key={type.label}
                      aria-pressed={isActive}
                      onClick={() => setSelectedTripStyle(type.label)}
                    >
                      <RequestIcon aria-hidden="true" size={17} />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="Trip style" value={selectedTripStyle} />
            </fieldset>

            <div className="booking-form__grid">
              <label className="booking-field booking-field--full">
                <span>Vehicle preference</span>
                <select name="Vehicle preference" value={selectedVehicle} onChange={(event) => updateVehiclePreference(event.currentTarget.value)}>
                  <option value="Recommend the best fit">Recommend the best fit</option>
                  {vehicleRequestOptions.map((vehicleName) => (
                    <option key={vehicleName} value={vehicleName}>
                      {vehicleName}
                    </option>
                  ))}
                </select>
              </label>

              <label className="booking-field">
                <span>Pickup date</span>
                <input name="Pickup date" type="date" required />
              </label>

              <label className="booking-field">
                <span>Pickup time</span>
                <input name="Pickup time" type="time" required />
              </label>

              <label className="booking-field">
                <span>Return date</span>
                <input name="Return date" type="date" />
              </label>

              <label className="booking-field">
                <span>Passengers</span>
                <input name="Passengers" inputMode="numeric" placeholder="2" />
              </label>

              <label className="booking-field booking-field--full">
                <span>Pickup location</span>
                <input name="Pickup location" placeholder="Airport, hotel, residence, office..." required />
              </label>

              <label className="booking-field booking-field--full">
                <span>Drop-off location</span>
                <input name="Drop-off location" placeholder="Same as pickup, or tell us the destination" />
              </label>

              <label className="booking-field">
                <span>Name</span>
                <input name="Name" placeholder="Your name" required />
              </label>

              <label className="booking-field">
                <span>Phone or email</span>
                <input name="Contact" placeholder="Where should we reply?" required />
              </label>

              <label className="booking-field booking-field--full">
                <span>Notes</span>
                <textarea name="Notes" placeholder="Flight number, luggage, child seat, chauffeur request, or timing details." rows={4} />
              </label>
            </div>

            <motion.button
              className="booking-submit"
              type="submit"
              disabled={formStatus === "submitting"}
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.006 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              {formStatus === "submitting" ? "Sending request..." : "Send booking request"}
              <ArrowRight aria-hidden="true" size={17} />
            </motion.button>
            <p className="form-status" aria-live="polite">
              {formMessage}
            </p>
          </motion.form>

          <motion.aside
            className="booking-summary"
            aria-label="Selected booking summary"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.66, delay: 0.2, ease }}
          >
            <div className="booking-summary__media">
              <img src={summaryVehicle.image} alt={summaryVehicle.alt} />
            </div>

            <div className="booking-summary__body">
              <span>{summaryCategory}</span>
              <h2>{summaryName}</h2>
              <p>{summaryPrice}</p>
            </div>

            <div className="booking-summary__chips" aria-label="Booking details">
              <span>{summaryVehicle.seats}</span>
              <span>{summaryVehicle.ideal}</span>
            </div>

            <div className="booking-summary__notes">
              {bookingAssurances.map((assurance) => (
                <span key={assurance}>{assurance}</span>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
}

function ThankYouPage() {
  const [lastSubmission] = useState(readLastSubmission);
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const searchParams = typeof window === "undefined" ? new URLSearchParams() : new URLSearchParams(window.location.search);
  const reference = searchParams.get("ref") ?? lastSubmission?.reference ?? "AURA-REQUEST";
  const submissionType = searchParams.get("type") ?? lastSubmission?.type ?? "booking";
  const isContact = submissionType === "contact";
  const steps = isContact
    ? ["Message reviewed", "Concierge reply", "Next step confirmed"]
    : ["Availability review", "Car and rate confirmed", "Handover plan prepared"];

  return (
    <motion.section
      className="info-page thank-you-page"
      id="thank-you"
      aria-labelledby="thank-you-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease }}
    >
      <div className="info-page__inner info-page__inner--narrow">
        <motion.div
          className="thank-you-panel"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="thank-you-panel__mark">AURA DRIVE</span>
          <h1 id="thank-you-heading">{isContact ? "Message received." : "Request received."}</h1>
          <p>
            {isContact
              ? "Concierge will review your note and reply with the right next step."
              : "Concierge will check availability, confirm the rate, and send the handover plan."}
          </p>

          <div className="thank-you-panel__reference">
            <span>Reference</span>
            <strong>{reference}</strong>
          </div>

          <div className="thank-you-panel__steps" aria-label="What happens next">
            {steps.map((step, index) => (
              <span key={step}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{step}</strong>
              </span>
            ))}
          </div>

          <div className="thank-you-panel__actions">
            <a className="info-button info-button--primary" href="/cars">
              Browse cars
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            <a className="info-button info-button--secondary" href="/book">
              Book another car
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArrival, setActiveArrival] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedRequestType, setSelectedRequestType] = useState(requestTypes[0].label);
  const [selectedVehicle, setSelectedVehicle] = useState(getInitialVehiclePreference);
  const [requestStatus, setRequestStatus] = useState<FormStatus>("idle");
  const [requestMessage, setRequestMessage] = useState("");
  const [filmPlaying, setFilmPlaying] = useState(false);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const currentPath = typeof window === "undefined" ? "/" : window.location.pathname.replace(/\/$/, "");
  const carDetailId = currentPath.startsWith("/cars/") ? currentPath.replace("/cars/", "").split("/")[0] : "";
  const isHomePage = currentPath === "";
  const isCarsPage = currentPath === "/cars";
  const isCarDetailPage = Boolean(carDetailId);
  const isConciergePage = currentPath === "/concierge";
  const isTermsPage = currentPath === "/terms";
  const isContactPage = currentPath === "/contact";
  const isBookPage = currentPath === "/book";
  const isThankYouPage = currentPath === "/thank-you";
  const carsHref = isCarsPage ? "#cars-list" : "/cars";
  const conciergeHref = isConciergePage ? "#concierge-page" : "/concierge";
  const termsHref = isTermsPage ? "#terms-page" : "/terms";
  const contactHref = isContactPage ? "#contact-page" : "/contact";
  const bookHref = isBookPage ? "#book-page" : "/book";
  const requestHref = isHomePage ? "#request" : "/#request";
  const arrivalsHref = isHomePage ? "#arrivals" : "/#arrivals";
  const filmHref = isHomePage ? "#film" : "/#film";
  const processHref = isHomePage ? "#process" : "/#process";
  const faqHref = isHomePage ? "#faq" : "/#faq";
  useRouteMeta(currentPath, carDetailId);

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
  const handleReserveVehicle = (vehicleName: string) => {
    rememberVehiclePreference(vehicleName);
    setSelectedVehicle(vehicleName);
  };
  const handleAvailabilitySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setRequestStatus("submitting");
    setRequestMessage("");

    try {
      await submitLeadForm(form, "availability", {
        "Trip style": selectedRequestType,
        "Vehicle preference": selectedVehicle,
      });
    } catch {
      setRequestStatus("error");
      setRequestMessage("We could not send this request. Please try again in a moment.");
    }
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
          <motion.a href={carsHref} whileHover={{ y: -1 }}>
            Cars
          </motion.a>
          <motion.a href={termsHref} whileHover={{ y: -1 }}>
            Terms
          </motion.a>
          <motion.a href={conciergeHref} whileHover={{ y: -1 }}>
            Concierge
          </motion.a>
          <motion.a href={contactHref} whileHover={{ y: -1 }}>
            Contact
          </motion.a>
        </nav>

        <div className="nav__actions">
          <motion.a
            className="nav__icon"
            href={contactHref}
            aria-label="Contact AURA DRIVE"
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Phone aria-hidden="true" size={20} />
          </motion.a>
          <motion.a
            className="nav__cta"
            href={bookHref}
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
              <a href={carsHref} onClick={() => setMenuOpen(false)}>
                Cars
              </a>
              <a href={termsHref} onClick={() => setMenuOpen(false)}>
                Terms
              </a>
              <a href={conciergeHref} onClick={() => setMenuOpen(false)}>
                Concierge
              </a>
              <a href={contactHref} onClick={() => setMenuOpen(false)}>
                Contact
              </a>
              <a href={bookHref} onClick={() => setMenuOpen(false)}>
                Book now
              </a>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </motion.header>

      {isCarsPage ? (
        <CarsPage />
      ) : isCarDetailPage ? (
        <CarDetailPage vehicleId={carDetailId} />
      ) : isConciergePage ? (
        <ConciergePage />
      ) : isTermsPage ? (
        <TermsPage />
      ) : isContactPage ? (
        <ContactPage />
      ) : isBookPage ? (
        <BookPage />
      ) : isThankYouPage ? (
        <ThankYouPage />
      ) : (
        <>
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
              href="#request"
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              Request availability
              <ArrowRight aria-hidden="true" size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="request"
        id="request"
        aria-labelledby="request-heading"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.72, ease }}
      >
        <div className="request__inner">
          <motion.div
            className="request__copy"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.h2 id="request-heading" variants={reveal} transition={{ duration: 0.64, ease }}>
              Tell us the arrival.
            </motion.h2>
            <motion.p variants={reveal} transition={{ duration: 0.64, ease }}>
              Share the timing, location, and car preference. We will confirm availability and handover details.
            </motion.p>

            <motion.div className="request__notes" aria-label="Request support details" variants={reveal} transition={{ duration: 0.56, ease }}>
              <span className="request__note">
                <Plane aria-hidden="true" size={19} />
                <span>
                  <strong>Airport, hotel, or residence</strong>
                  <span>We plan the handover around the real pickup point.</span>
                </span>
              </span>
              <span className="request__note">
                <Gem aria-hidden="true" size={19} />
                <span>
                  <strong>Matched vehicle recommendation</strong>
                  <span>Tell us the trip style and we can suggest the best fit.</span>
                </span>
              </span>
              <span className="request__note">
                <Phone aria-hidden="true" size={19} />
                <span>
                  <strong>Concierge confirmation</strong>
                  <span>A real person confirms timing, delivery, and pricing.</span>
                </span>
              </span>
            </motion.div>
          </motion.div>

          <motion.form
            className="request-form"
            onSubmit={handleAvailabilitySubmit}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: 0.64, delay: 0.08, ease }}
          >
            <div className="request-form__header">
              <h3>Request availability</h3>
              <p>We reply with the car, rate, and handover window.</p>
            </div>

            <div className="request-form__grid">
              <label className="request-field request-field--full">
                <span>Pickup location</span>
                <input name="Pickup location" placeholder="Airport, hotel, residence, or office" required />
              </label>

              <label className="request-field">
                <span>Date</span>
                <input name="Pickup date" type="date" required />
              </label>

              <label className="request-field">
                <span>Time</span>
                <input name="Pickup time" type="time" required />
              </label>

              <label className="request-field request-field--full">
                <span>Vehicle preference</span>
                <select name="Vehicle preference" value={selectedVehicle} onChange={(event) => handleReserveVehicle(event.currentTarget.value)}>
                  {vehicleRequestOptions.map((vehicleName) => (
                    <option key={vehicleName} value={vehicleName}>
                      {vehicleName}
                    </option>
                  ))}
                  <option value="Recommend the best fit">Recommend the best fit</option>
                </select>
              </label>

              <fieldset className="request-types">
                <legend>Trip style</legend>
                <input type="hidden" name="Trip style" value={selectedRequestType} />
                <div className="request-types__grid">
                  {requestTypes.map((type) => {
                    const RequestIcon = type.icon;
                    const isSelected = selectedRequestType === type.label;

                    return (
                      <button
                        className={`request-type ${isSelected ? "request-type--active" : ""}`}
                        type="button"
                        key={type.label}
                        aria-pressed={isSelected}
                        onClick={() => setSelectedRequestType(type.label)}
                      >
                        <RequestIcon aria-hidden="true" size={18} />
                        <span>
                          <strong>{type.label}</strong>
                          <span>{type.detail}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="request-field">
                <span>Name</span>
                <input name="Name" placeholder="Your name" required />
              </label>

              <label className="request-field">
                <span>Phone or email</span>
                <input name="Contact" placeholder="Where should we reply?" required />
              </label>
            </div>

            <div className="request-form__footer">
              <button className="request-form__submit" type="submit" disabled={requestStatus === "submitting"}>
                {requestStatus === "submitting" ? "Sending request..." : "Request availability"}
                <ArrowRight aria-hidden="true" size={18} />
              </button>
              <span>{requestMessage || "Same-day requests depend on availability."}</span>
            </div>
          </motion.form>
        </div>
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
                  href="#request"
                  key={arrival.title}
                  aria-label={`Request ${arrival.title}`}
                  onClick={() => setSelectedRequestType(requestTypes[Math.min(index, requestTypes.length - 1)].label)}
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

          <FleetShowcaseStack onReserve={handleReserveVehicle} />
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
              href="#request"
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
                href={bookHref}
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.012 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                Reserve your car
                <ArrowRight aria-hidden="true" size={18} />
              </motion.a>
              <motion.a
                className="closing-cta__button closing-cta__button--secondary"
                href={conciergeHref}
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
        </>
      )}

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__top">
            <a className="site-footer__brand" href="/" aria-label="AURA DRIVE home">
              AURA DRIVE
            </a>
            <a className="site-footer__cta" href={bookHref}>
              Book now
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>

          <div className="site-footer__grid">
            <div className="site-footer__summary">
              <p>Curated luxury cars, prepared for airport arrivals, business routes, weekends, and private entrances.</p>
            </div>

            <nav className="site-footer__nav" aria-label="Footer fleet links">
              <span>Explore</span>
              <a href={carsHref}>Cars</a>
              <a href={arrivalsHref}>Arrivals</a>
              <a href={filmHref}>Film</a>
            </nav>

            <nav className="site-footer__nav" aria-label="Footer service links">
              <span>Service</span>
              <a href={bookHref}>Book now</a>
              <a href={requestHref}>Request</a>
              <a href={conciergeHref}>Concierge</a>
              <a href={termsHref}>Terms</a>
              <a href={processHref}>Process</a>
              <a href={faqHref}>FAQ</a>
            </nav>

            <div className="site-footer__contact">
              <span>Contact</span>
              <a href="mailto:hello@auradrive.example">hello@auradrive.example</a>
              <a href="tel:+10000000000">+1 000 000 0000</a>
            </div>
          </div>

          <div className="site-footer__bottom">
            <span>© 2026 AURA DRIVE. Luxury car rentals by appointment.</span>
            <span>Availability, delivery, and pricing confirmed by concierge.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;

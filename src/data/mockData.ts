import { CityOption, Trip, Seat, SeatDeck, SeatType, BusAmenity } from '../types';

export const CITIES: CityOption[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    code: 'PAR',
    region: 'Île-de-France',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    startingPrice: 14,
  },
  {
    id: 'lyon',
    name: 'Lyon',
    country: 'France',
    code: 'LYS',
    region: 'Auvergne-Rhône-Alpes',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1524047934105-02fc2a76fdf2?auto=format&fit=crop&w=800&q=80',
    startingPrice: 19,
  },
  {
    id: 'marseille',
    name: 'Marseille',
    country: 'France',
    code: 'MRS',
    region: 'PACA',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&w=800&q=80',
    startingPrice: 22,
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    country: 'France',
    code: 'BOD',
    region: 'Nouvelle-Aquitaine',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1563286386-ed4680879667?auto=format&fit=crop&w=800&q=80',
    startingPrice: 16,
  },
  {
    id: 'bruxelles',
    name: 'Bruxelles',
    country: 'Belgique',
    code: 'BRU',
    region: 'Bruxelles-Capitale',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=800&q=80',
    startingPrice: 15,
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Pays-Bas',
    code: 'AMS',
    region: 'Hollande',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
    startingPrice: 24,
  },
  {
    id: 'barcelona',
    name: 'Barcelone',
    country: 'Espagne',
    code: 'BCN',
    region: 'Catalogne',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80',
    startingPrice: 29,
  },
  {
    id: 'geneve',
    name: 'Genève',
    country: 'Suisse',
    code: 'GVA',
    region: 'Romandie',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1574701148212-8518049c7b2c?auto=format&fit=crop&w=800&q=80',
    startingPrice: 21,
  },
  {
    id: 'toulouse',
    name: 'Toulouse',
    country: 'France',
    code: 'TLS',
    region: 'Occitanie',
    isPopular: false,
    startingPrice: 18,
  },
  {
    id: 'nantes',
    name: 'Nantes',
    country: 'France',
    code: 'NTE',
    region: 'Pays de la Loire',
    isPopular: false,
    startingPrice: 17,
  },
  {
    id: 'lille',
    name: 'Lille',
    country: 'France',
    code: 'LIL',
    region: 'Hauts-de-France',
    isPopular: false,
    startingPrice: 12,
  },
  {
    id: 'strasbourg',
    name: 'Strasbourg',
    country: 'France',
    code: 'SXB',
    region: 'Grand Est',
    isPopular: false,
    startingPrice: 20,
  },
  {
    id: 'nice',
    name: 'Nice',
    country: 'France',
    code: 'NCE',
    region: 'PACA',
    isPopular: false,
    startingPrice: 26,
  }
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-101',
    operator: 'Bus Travel Premium',
    operatorColor: '#0ea5e9',
    busModel: 'Setra S 531 DT Double-Étage',
    busClass: 'VIP Lounge',
    departureCity: 'Paris',
    departureStation: 'Gare de Bercy-Seine',
    arrivalCity: 'Lyon',
    arrivalStation: 'Lyon Perrache',
    departureTime: '07:30',
    arrivalTime: '12:15',
    duration: '4h 45m',
    distanceKm: 465,
    basePrice: 24.99,
    currency: '€',
    seatsAvailable: 18,
    totalSeats: 56,
    hasDoubleDeck: true,
    stops: [
      { city: 'Paris', station: 'Bercy-Seine', time: '07:30', isMainStop: true },
      { city: 'Beaune', station: 'Aire de péage', time: '10:15', isMainStop: false },
      { city: 'Lyon', station: 'Lyon Perrache', time: '12:15', isMainStop: true },
    ],
    amenities: ['wifi', 'power', 'wc', 'recline', 'snack', 'tv', 'ac', 'legroom', 'usb'],
    rating: 4.9,
    reviewsCount: 342,
    features: ['Sièges inclinables à 145°', 'Wi-Fi 5G Illimité', 'Service Boisson & Snack offert', 'Prise 220V individuelle'],
    co2SavedKg: 38.5,
    punctualityRate: 98,
  },
  {
    id: 'trip-102',
    operator: 'Bus Travel Express',
    operatorColor: '#f59e0b',
    busModel: 'Mercedes-Benz Tourismo',
    busClass: 'Confort+',
    departureCity: 'Paris',
    departureStation: 'Paris Porte Maillot',
    arrivalCity: 'Lyon',
    arrivalStation: 'Lyon Part-Dieu',
    departureTime: '09:15',
    arrivalTime: '14:30',
    duration: '5h 15m',
    distanceKm: 465,
    basePrice: 19.50,
    currency: '€',
    seatsAvailable: 24,
    totalSeats: 48,
    hasDoubleDeck: false,
    stops: [
      { city: 'Paris', station: 'Porte Maillot', time: '09:15', isMainStop: true },
      { city: 'Auxerre', station: 'Pôle d\'échange', time: '11:10', isMainStop: false },
      { city: 'Chalon-sur-Saône', station: 'Gare Routière', time: '13:00', isMainStop: false },
      { city: 'Lyon', station: 'Lyon Part-Dieu', time: '14:30', isMainStop: true },
    ],
    amenities: ['wifi', 'power', 'wc', 'recline', 'ac', 'usb'],
    rating: 4.7,
    reviewsCount: 218,
    features: ['Direct Autoroute', 'Ports USB rapides', 'Climatisation intelligente'],
    co2SavedKg: 37.2,
    punctualityRate: 96,
  },
  {
    id: 'trip-103',
    operator: 'EuroStar Line',
    operatorColor: '#10b981',
    busModel: 'Scania Irizar i8 High-End',
    busClass: 'Standard',
    departureCity: 'Paris',
    departureStation: 'Paris Gallieni',
    arrivalCity: 'Lyon',
    arrivalStation: 'Lyon Perrache',
    departureTime: '13:00',
    arrivalTime: '18:10',
    duration: '5h 10m',
    distanceKm: 465,
    basePrice: 14.90,
    currency: '€',
    seatsAvailable: 8,
    totalSeats: 52,
    hasDoubleDeck: false,
    stops: [
      { city: 'Paris', station: 'Gallieni', time: '13:00', isMainStop: true },
      { city: 'Lyon', station: 'Lyon Perrache', time: '18:10', isMainStop: true },
    ],
    amenities: ['wifi', 'power', 'wc', 'ac', 'usb'],
    rating: 4.5,
    reviewsCount: 189,
    features: ['Meilleur prix garanti', 'Bagage soute inclus', 'Chauffeurs certifiés'],
    co2SavedKg: 38.0,
    punctualityRate: 94,
  },
  {
    id: 'trip-104',
    operator: 'Night Liner Dream',
    operatorColor: '#8b5cf6',
    busModel: 'Neoplan Skyliner Night',
    busClass: 'Night Sleeper',
    departureCity: 'Paris',
    departureStation: 'Gare de Bercy-Seine',
    arrivalCity: 'Lyon',
    arrivalStation: 'Lyon Perrache',
    departureTime: '23:30',
    arrivalTime: '06:00',
    duration: '6h 30m',
    distanceKm: 465,
    basePrice: 29.00,
    currency: '€',
    seatsAvailable: 12,
    totalSeats: 40,
    hasDoubleDeck: true,
    stops: [
      { city: 'Paris', station: 'Bercy-Seine', time: '23:30', isMainStop: true },
      { city: 'Lyon', station: 'Lyon Perrache', time: '06:00', isMainStop: true },
    ],
    amenities: ['wifi', 'power', 'wc', 'recline', 'snack', 'ac', 'legroom', 'usb'],
    rating: 4.8,
    reviewsCount: 512,
    features: ['Couchette inclinable 165°', 'Kit nuit offert (masque + bouchons)', 'Silence garanti 00h-05h'],
    co2SavedKg: 40.1,
    punctualityRate: 99,
  },
  {
    id: 'trip-105',
    operator: 'Bus Travel Premium',
    operatorColor: '#0ea5e9',
    busModel: 'Setra S 531 DT',
    busClass: 'VIP Lounge',
    departureCity: 'Paris',
    departureStation: 'Gare de Bercy-Seine',
    arrivalCity: 'Marseille',
    arrivalStation: 'Gare Saint-Charles',
    departureTime: '08:00',
    arrivalTime: '17:30',
    duration: '9h 30m',
    distanceKm: 775,
    basePrice: 34.50,
    currency: '€',
    seatsAvailable: 15,
    totalSeats: 56,
    hasDoubleDeck: true,
    stops: [
      { city: 'Paris', station: 'Bercy-Seine', time: '08:00', isMainStop: true },
      { city: 'Lyon', station: 'Perrache', time: '13:00', isMainStop: true },
      { city: 'Avignon', station: 'Le Pontet', time: '15:45', isMainStop: false },
      { city: 'Marseille', station: 'Saint-Charles', time: '17:30', isMainStop: true },
    ],
    amenities: ['wifi', 'power', 'wc', 'recline', 'snack', 'tv', 'ac', 'legroom', 'usb'],
    rating: 4.9,
    reviewsCount: 420,
    features: ['Vue Panoramique Étage Supérieur', 'Snack Bar à bord', 'Écrans individuels'],
    co2SavedKg: 62.0,
    punctualityRate: 97,
  },
  {
    id: 'trip-106',
    operator: 'Bus Travel Express',
    operatorColor: '#f59e0b',
    busModel: 'Volvo 9900 Luxury',
    busClass: 'Confort+',
    departureCity: 'Paris',
    departureStation: 'Porte de Bagnolet',
    arrivalCity: 'Bruxelles',
    arrivalStation: 'Gare du Midi',
    departureTime: '10:00',
    arrivalTime: '14:15',
    duration: '4h 15m',
    distanceKm: 315,
    basePrice: 17.00,
    currency: '€',
    seatsAvailable: 22,
    totalSeats: 48,
    hasDoubleDeck: false,
    stops: [
      { city: 'Paris', station: 'Porte de Bagnolet', time: '10:00', isMainStop: true },
      { city: 'Lille', station: 'Europe', time: '12:20', isMainStop: false },
      { city: 'Bruxelles', station: 'Gare du Midi', time: '14:15', isMainStop: true },
    ],
    amenities: ['wifi', 'power', 'wc', 'recline', 'ac', 'usb'],
    rating: 4.8,
    reviewsCount: 310,
    features: ['Trajet International sans escale lourde', 'Sièges ergonomiques cuir'],
    co2SavedKg: 28.5,
    punctualityRate: 98,
  },
  {
    id: 'trip-107',
    operator: 'TransEuro VIP',
    operatorColor: '#06b6d4',
    busModel: 'MAN Lion\'s Coach L',
    busClass: 'VIP Lounge',
    departureCity: 'Paris',
    departureStation: 'Gare de Bercy-Seine',
    arrivalCity: 'Amsterdam',
    arrivalStation: 'Sloterdijk Station',
    departureTime: '08:30',
    arrivalTime: '15:45',
    duration: '7h 15m',
    distanceKm: 510,
    basePrice: 28.90,
    currency: '€',
    seatsAvailable: 14,
    totalSeats: 50,
    hasDoubleDeck: true,
    stops: [
      { city: 'Paris', station: 'Bercy-Seine', time: '08:30', isMainStop: true },
      { city: 'Bruxelles', station: 'Gare du Midi', time: '12:15', isMainStop: true },
      { city: 'Anvers', station: 'Centraal', time: '13:30', isMainStop: false },
      { city: 'Amsterdam', station: 'Sloterdijk', time: '15:45', isMainStop: true },
    ],
    amenities: ['wifi', 'power', 'wc', 'recline', 'snack', 'tv', 'ac', 'legroom', 'usb'],
    rating: 4.9,
    reviewsCount: 680,
    features: ['Service d\'accueil premium', 'Boissons chaudes illimitées', 'Espace travail avec table'],
    co2SavedKg: 44.2,
    punctualityRate: 97,
  },
  {
    id: 'trip-108',
    operator: 'Bus Travel Express',
    operatorColor: '#f59e0b',
    busModel: 'Mercedes-Benz Tourismo L',
    busClass: 'Confort+',
    departureCity: 'Paris',
    departureStation: 'Gare de Bercy-Seine',
    arrivalCity: 'Bordeaux',
    arrivalStation: 'Gare Saint-Jean',
    departureTime: '11:00',
    arrivalTime: '18:30',
    duration: '7h 30m',
    distanceKm: 585,
    basePrice: 21.00,
    currency: '€',
    seatsAvailable: 28,
    totalSeats: 52,
    hasDoubleDeck: false,
    stops: [
      { city: 'Paris', station: 'Bercy-Seine', time: '11:00', isMainStop: true },
      { city: 'Tours', station: 'Parking Peupliers', time: '13:45', isMainStop: false },
      { city: 'Poitiers', station: 'Gare SNCF', time: '15:20', isMainStop: false },
      { city: 'Bordeaux', station: 'Gare Saint-Jean', time: '18:30', isMainStop: true },
    ],
    amenities: ['wifi', 'power', 'wc', 'recline', 'ac', 'usb'],
    rating: 4.6,
    reviewsCount: 175,
    features: ['Vue pittoresque Val de Loire', 'Équipage bilingue', 'Chauffage & Climatisation auto'],
    co2SavedKg: 49.0,
    punctualityRate: 95,
  }
];

// Helper to generate dynamic trips between any origin & destination
export function getTripsForRoute(fromCity: string, toCity: string): Trip[] {
  const exactMatches = MOCK_TRIPS.filter(
    (t) =>
      t.departureCity.toLowerCase() === fromCity.toLowerCase() &&
      t.arrivalCity.toLowerCase() === toCity.toLowerCase()
  );

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  // Generate dynamic customized trips based on city inputs
  const operators = [
    { name: 'Bus Travel VIP', color: '#0ea5e9', class: 'VIP Lounge' as const, priceMult: 1.3, rating: 4.9 },
    { name: 'Bus Travel Express', color: '#f59e0b', class: 'Confort+' as const, priceMult: 1.0, rating: 4.7 },
    { name: 'EcoLine Direct', color: '#10b981', class: 'Standard' as const, priceMult: 0.8, rating: 4.5 },
    { name: 'Night Sleeper Star', color: '#8b5cf6', class: 'Night Sleeper' as const, priceMult: 1.25, rating: 4.8 },
  ];

  const basePrice = Math.floor(Math.random() * 15) + 18;
  const baseDurationHours = Math.floor(Math.random() * 4) + 3;
  const baseDurationMins = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

  const times = [
    { dep: '06:30', arrH: 6 + baseDurationHours },
    { dep: '09:45', arrH: 9 + baseDurationHours },
    { dep: '14:15', arrH: 14 + baseDurationHours },
    { dep: '18:00', arrH: 18 + baseDurationHours },
    { dep: '23:15', arrH: (23 + baseDurationHours + 1) % 24 },
  ];

  return times.slice(0, 4).map((time, idx) => {
    const op = operators[idx % operators.length];
    const depHour = parseInt(time.dep.split(':')[0], 10);
    const depMin = parseInt(time.dep.split(':')[1], 10);
    const totalArrMins = (depHour * 60 + depMin + baseDurationHours * 60 + baseDurationMins) % (24 * 60);
    const arrHStr = String(Math.floor(totalArrMins / 60)).padStart(2, '0');
    const arrMStr = String(totalArrMins % 60).padStart(2, '0');

    return {
      id: `gen-trip-${idx}-${fromCity.toLowerCase().replace(/\s+/g, '-')}-${toCity.toLowerCase().replace(/\s+/g, '-')}`,
      operator: op.name,
      operatorColor: op.color,
      busModel: op.class === 'VIP Lounge' ? 'Setra S 531 DT Double-Deck' : 'Mercedes Tourismo 2025',
      busClass: op.class,
      departureCity: fromCity,
      departureStation: `${fromCity} Gare Centrale / Pôle Échange`,
      arrivalCity: toCity,
      arrivalStation: `${toCity} Gare Routière`,
      departureTime: time.dep,
      arrivalTime: `${arrHStr}:${arrMStr}`,
      duration: `${baseDurationHours}h ${baseDurationMins > 0 ? baseDurationMins + 'm' : '00m'}`,
      distanceKm: Math.round(baseDurationHours * 85),
      basePrice: Number((basePrice * op.priceMult).toFixed(2)),
      currency: '€',
      seatsAvailable: Math.floor(Math.random() * 20) + 6,
      totalSeats: op.class === 'VIP Lounge' ? 56 : 48,
      hasDoubleDeck: op.class === 'VIP Lounge' || op.class === 'Night Sleeper',
      stops: [
        { city: fromCity, station: 'Gare Centrale', time: time.dep, isMainStop: true },
        { city: 'Escale intermédiaire', station: 'Aire Express', time: 'En route', isMainStop: false },
        { city: toCity, station: 'Gare Routière', time: `${arrHStr}:${arrMStr}`, isMainStop: true },
      ],
      amenities: ['wifi', 'power', 'wc', 'recline', 'ac', 'usb', ...(op.class === 'VIP Lounge' ? ['snack', 'tv', 'legroom'] as BusAmenity[] : [])],
      rating: op.rating,
      reviewsCount: Math.floor(Math.random() * 300) + 80,
      features: ['Prise USB & 220V', 'Espace bagages sécurisé', 'Conducteurs expérimentés'],
      co2SavedKg: Math.round(baseDurationHours * 7.5),
      punctualityRate: 96 + (idx % 4),
    };
  });
}

// Generate realistic bus seats layout
export function generateBusSeats(trip: Trip): Seat[] {
  const seats: Seat[] = [];
  const rowsLower = trip.hasDoubleDeck ? 7 : 12;
  const rowsUpper = trip.hasDoubleDeck ? 9 : 0;

  // Generate Lower Deck
  for (let r = 1; r <= rowsLower; r++) {
    for (let c = 0; c < 4; c++) {
      const isAisle = c === 1 || c === 2;
      const isWindow = c === 0 || c === 3;
      const isFront = r === 1;
      const seatNumber = `${r}${String.fromCharCode(65 + c)}`;

      // Some seats naturally reserved for realistic feel
      const isReservedSeed = (r * 7 + c * 3 + trip.id.length) % 5 === 0;
      const isVip = trip.busClass === 'VIP Lounge' && (isFront || r === 2);
      const isPanoramic = trip.hasDoubleDeck && isFront;

      let type: SeatType = 'standard';
      if (isPanoramic) type = 'panoramic';
      else if (isVip) type = 'vip';
      else if (isWindow) type = 'window';
      else if (isAisle) type = 'aisle';

      let seatExtraPrice = 0;
      if (isPanoramic) seatExtraPrice = 4;
      else if (isVip) seatExtraPrice = 3;
      else if (isWindow) seatExtraPrice = 1.5;

      seats.push({
        id: `seat-lower-${r}-${c}`,
        number: seatNumber,
        row: r,
        col: c,
        deck: 'lower',
        type,
        status: isReservedSeed ? 'reserved' : 'available',
        price: Number((trip.basePrice + seatExtraPrice).toFixed(2)),
        label: isPanoramic ? 'Panoramique' : isVip ? 'Espace VIP' : isWindow ? 'Fenêtre' : 'Couloir',
      });
    }
  }

  // Generate Upper Deck if double decker
  if (trip.hasDoubleDeck && rowsUpper > 0) {
    for (let r = 1; r <= rowsUpper; r++) {
      for (let c = 0; c < 4; c++) {
        const isWindow = c === 0 || c === 3;
        const isAisle = c === 1 || c === 2;
        const isFront = r === 1;
        const seatNumber = `U${r}${String.fromCharCode(65 + c)}`;

        const isReservedSeed = (r * 11 + c * 5 + trip.id.length) % 4 === 0;
        const isPanoramic = isFront;

        let type: SeatType = 'standard';
        if (isPanoramic) type = 'panoramic';
        else if (isWindow) type = 'window';
        else if (isAisle) type = 'aisle';

        let seatExtraPrice = 0;
        if (isPanoramic) seatExtraPrice = 5;
        else if (isWindow) seatExtraPrice = 2;

        seats.push({
          id: `seat-upper-${r}-${c}`,
          number: seatNumber,
          row: r,
          col: c,
          deck: 'upper',
          type,
          status: isReservedSeed ? 'reserved' : 'available',
          price: Number((trip.basePrice + seatExtraPrice).toFixed(2)),
          label: isPanoramic ? 'Vue Panoramique Haut' : isWindow ? 'Fenêtre Étage' : 'Couloir Étage',
        });
      }
    }
  }

  return seats;
}

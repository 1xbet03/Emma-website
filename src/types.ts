export type BusAmenity =
  | 'wifi'
  | 'power'
  | 'wc'
  | 'recline'
  | 'snack'
  | 'tv'
  | 'ac'
  | 'legroom'
  | 'usb';

export type BusClass = 'Standard' | 'Confort+' | 'VIP Lounge' | 'Night Sleeper';

export type SeatType = 'standard' | 'window' | 'aisle' | 'panoramic' | 'table' | 'vip';
export type SeatStatus = 'available' | 'selected' | 'reserved' | 'disabled';
export type SeatDeck = 'lower' | 'upper';

export interface Seat {
  id: string;
  number: string;
  row: number;
  col: number; // 0, 1, 2, 3 (with 2 often being aisle)
  deck: SeatDeck;
  type: SeatType;
  status: SeatStatus;
  price: number;
  label?: string;
}

export interface TripStop {
  city: string;
  station: string;
  time: string;
  isMainStop?: boolean;
}

export interface Trip {
  id: string;
  operator: string;
  operatorLogo?: string;
  operatorColor: string;
  busModel: string;
  busClass: BusClass;
  departureCity: string;
  departureStation: string;
  arrivalCity: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distanceKm: number;
  basePrice: number;
  currency: string;
  seatsAvailable: number;
  totalSeats: number;
  hasDoubleDeck: boolean;
  stops: TripStop[];
  amenities: BusAmenity[];
  rating: number;
  reviewsCount: number;
  features: string[];
  co2SavedKg: number;
  punctualityRate: number;
}

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  seatId?: string;
  seatNumber?: string;
  luggageCount: number; // standard luggage (1 free included)
  bulkyLuggage: boolean; // bikes, skis, etc. (+€9)
  priorityBoarding: boolean; // (+€3)
  snackBox: boolean; // (+€5)
}

export interface Booking {
  id: string;
  bookingReference: string;
  trip: Trip;
  passengers: Passenger[];
  selectedSeats: Seat[];
  totalPrice: number;
  date: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
  paymentMethod: string;
  insuranceSelected: boolean;
  qrCodeData: string;
}

export interface CityOption {
  id: string;
  name: string;
  country: string;
  code: string;
  region?: string;
  isPopular?: boolean;
  image?: string;
  startingPrice?: number;
}

export interface SearchQuery {
  departureCity: string;
  arrivalCity: string;
  date: string;
  returnDate?: string;
  passengersCount: number;
  isRoundTrip: boolean;
}

export interface FilterState {
  sortBy: 'price_asc' | 'duration_asc' | 'departure_asc' | 'rating_desc';
  busClasses: BusClass[];
  operators: string[];
  amenities: BusAmenity[];
  maxPrice: number;
  timeOfDay: 'all' | 'morning' | 'afternoon' | 'evening' | 'night';
  directOnly: boolean;
}

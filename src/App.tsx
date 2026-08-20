import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { FilterBar } from './components/FilterBar';
import { TripCard } from './components/TripCard';
import { SeatMapModal } from './components/SeatMapModal';
import { PassengerFormModal } from './components/PassengerFormModal';
import { PaymentModal } from './components/PaymentModal';
import { TicketPassModal } from './components/TicketPassModal';
import { RouteTrackerModal } from './components/RouteTrackerModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { PopularDestinations } from './components/PopularDestinations';
import { BusFeatures } from './components/BusFeatures';
import { Footer } from './components/Footer';
import {
  Trip,
  Seat,
  Passenger,
  Booking,
  SearchQuery,
  FilterState,
  BusClass,
} from './types';
import { getTripsForRoute, MOCK_TRIPS } from './data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { Bus, Search, ArrowRight, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import {
  subscribeToUserBookings,
  saveBookingToFirestore,
  cancelBookingInFirestore,
} from './lib/bookingsService';

const LOCAL_STORAGE_BOOKINGS_KEY = 'bus_travel_user_bookings';

const DEFAULT_DEMO_BOOKING: Booking = {
  id: 'book-demo-1',
  bookingReference: 'BT-849201',
  trip: MOCK_TRIPS[0],
  passengers: [
    {
      id: 'p-demo-1',
      firstName: 'Alexandre',
      lastName: 'Dubois',
      email: 'alexandre.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      seatId: 'seat-lower-1-0',
      seatNumber: '1A',
      luggageCount: 1,
      bulkyLuggage: false,
      priorityBoarding: true,
      snackBox: true,
    },
  ],
  selectedSeats: [
    {
      id: 'seat-lower-1-0',
      number: '1A',
      row: 1,
      col: 0,
      deck: 'lower',
      type: 'panoramic',
      status: 'selected',
      price: 28.99,
      label: 'Panoramique VIP',
    },
  ],
  totalPrice: 34.49,
  date: '19 août 2026',
  status: 'confirmed',
  createdAt: new Date().toISOString(),
  paymentMethod: 'Carte Bancaire (Apple Pay)',
  insuranceSelected: true,
  qrCodeData: 'https://bustravel.app/verify/BT-849201',
};

export default function App() {
  const { user } = useAuth();

  // Navigation & View
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'tracker' | 'bookings' | 'features'>('home');

  // Search state
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    departureCity: 'Paris',
    arrivalCity: 'Lyon',
    date: new Date().toISOString().split('T')[0],
    passengersCount: 1,
    isRoundTrip: false,
  });

  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    sortBy: 'price_asc',
    busClasses: [],
    operators: [],
    amenities: [],
    maxPrice: 100,
    timeOfDay: 'all',
    directOnly: false,
  });

  // Modals & Active booking flow
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [activePassengers, setActivePassengers] = useState<Passenger[]>([]);
  const [insuranceSelected, setInsuranceSelected] = useState<boolean>(true);
  const [addonsPrice, setAddonsPrice] = useState<number>(0);

  const [bookingStep, setBookingStep] = useState<'none' | 'seat_map' | 'passenger_form' | 'payment' | 'ticket'>('none');
  const [activeTicketBooking, setActiveTicketBooking] = useState<Booking | null>(null);

  // App-wide modals
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [trackerBooking, setTrackerBooking] = useState<Booking | null>(null);

  // Stored bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [DEFAULT_DEMO_BOOKING];
  });

  // Real-time Firestore sync when authenticated
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToUserBookings(
      user.uid,
      (remoteBookings) => {
        if (remoteBookings.length > 0) {
          setBookings(remoteBookings);
        }
      },
      (err) => {
        console.warn('Firestore subscription warning:', err);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Sync to local storage for offline / quick load
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // Derived available trips for query
  const rawTrips = useMemo(() => {
    return getTripsForRoute(searchQuery.departureCity, searchQuery.arrivalCity);
  }, [searchQuery.departureCity, searchQuery.arrivalCity]);

  // Filtered & Sorted trips
  const filteredTrips = useMemo(() => {
    let result = [...rawTrips];

    // Filter by Class
    if (filter.busClasses.length > 0) {
      result = result.filter((t) => filter.busClasses.includes(t.busClass));
    }

    // Filter by Amenities
    if (filter.amenities.length > 0) {
      result = result.filter((t) =>
        filter.amenities.every((a) => t.amenities.includes(a))
      );
    }

    // Filter by Time of day
    if (filter.timeOfDay !== 'all') {
      result = result.filter((t) => {
        const hour = parseInt(t.departureTime.split(':')[0], 10);
        if (filter.timeOfDay === 'morning') return hour >= 6 && hour < 12;
        if (filter.timeOfDay === 'afternoon') return hour >= 12 && hour < 18;
        if (filter.timeOfDay === 'night') return hour >= 18 || hour < 6;
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (filter.sortBy === 'price_asc') return a.basePrice - b.basePrice;
      if (filter.sortBy === 'departure_asc')
        return a.departureTime.localeCompare(b.departureTime);
      if (filter.sortBy === 'rating_desc') return b.rating - a.rating;
      if (filter.sortBy === 'duration_asc') {
        const durA = parseInt(a.duration) || 0;
        const durB = parseInt(b.duration) || 0;
        return durA - durB;
      }
      return 0;
    });

    return result;
  }, [rawTrips, filter]);

  // Handle Search Submission
  const handleSearch = (newQuery: SearchQuery) => {
    setSearchQuery(newQuery);
    setCurrentView('search');
    // Scroll smoothly to results
    setTimeout(() => {
      const resultsEl = document.getElementById('search-results-section');
      resultsEl?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Start booking a trip
  const handleSelectTrip = (trip: Trip) => {
    setActiveTrip(trip);
    setSelectedSeats([]);
    setBookingStep('seat_map');
  };

  // Step 1: Confirmed seats -> move to Passenger form
  const handleConfirmSeats = (seats: Seat[]) => {
    setSelectedSeats(seats);
    setBookingStep('passenger_form');
  };

  // Step 2: Confirmed passengers & addons -> move to Payment
  const handleProceedToPayment = (
    passengers: Passenger[],
    insurance: boolean,
    totalAddons: number
  ) => {
    setActivePassengers(passengers);
    setInsuranceSelected(insurance);
    setAddonsPrice(totalAddons);
    setBookingStep('payment');
  };

  // Step 3: Payment Success -> Save booking to Firestore and show Ticket pass
  const handleBookingSuccess = async (newBooking: Booking) => {
    const bookingWithUser: Booking = {
      ...newBooking,
      userId: user?.uid,
    };

    setBookings((prev) => [bookingWithUser, ...prev]);
    setActiveTicketBooking(bookingWithUser);
    setBookingStep('ticket');

    if (user) {
      try {
        await saveBookingToFirestore(bookingWithUser, user.uid);
      } catch (err) {
        console.error('Failed to save booking to Firestore:', err);
      }
    }
  };

  // Cancel a booking
  const handleCancelBooking = async (bookingId: string) => {
    if (confirm('Êtes-vous sûr de vouloir annuler ce billet ? Le remboursement sera crédité sous 24h.')) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
      );
      if (user) {
        try {
          await cancelBookingInFirestore(bookingId);
        } catch (err) {
          console.error('Failed to cancel booking in Firestore:', err);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black">
      {/* Navigation */}
      <Navbar
        onNavigate={setCurrentView}
        currentView={currentView}
        bookings={bookings}
        onOpenBookings={() => setShowMyBookings(true)}
        onOpenTracker={() => {
          setTrackerBooking(bookings[0] || null);
          setShowTracker(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Search Section with Motion Design */}
        <HeroSearch onSearch={handleSearch} initialQuery={searchQuery} />

        {/* Search Results / Available Trips Section */}
        <section id="search-results-section" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header of results */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  Trajets en direct
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(searchQuery.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
                {searchQuery.departureCity} <span className="text-amber-400">➔</span> {searchQuery.arrivalCity}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                {searchQuery.passengersCount} voyageur{searchQuery.passengersCount > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            totalResults={filteredTrips.length}
          />

          {/* List of Trip Cards */}
          {filteredTrips.length === 0 ? (
            <div className="py-16 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Bus className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Aucun trajet pour ces filtres</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Essayez d'élargir vos filtres d'équipements ou changez l'heure de départ souhaitée.
              </p>
              <button
                type="button"
                onClick={() =>
                  setFilter({
                    sortBy: 'price_asc',
                    busClasses: [],
                    operators: [],
                    amenities: [],
                    maxPrice: 100,
                    timeOfDay: 'all',
                    directOnly: false,
                  })
                }
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-400 text-xs font-bold transition-all cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTrips.map((trip, idx) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSelectTrip={handleSelectTrip}
                  index={idx}
                />
              ))}
            </div>
          )}
        </section>

        {/* Popular Destinations Grid */}
        <PopularDestinations onSelectDestination={handleSearch} />

        {/* Bus Features & Advantages */}
        <BusFeatures />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Flow Modals with AnimatePresence */}
      <AnimatePresence>
        {/* Step 1: Seat Map Modal */}
        {bookingStep === 'seat_map' && activeTrip && (
          <SeatMapModal
            key="modal-seat-map"
            trip={activeTrip}
            passengersCount={searchQuery.passengersCount}
            onClose={() => setBookingStep('none')}
            onConfirmSeats={handleConfirmSeats}
            initialSelectedSeats={selectedSeats}
          />
        )}

        {/* Step 2: Passenger Info & Addons Form */}
        {bookingStep === 'passenger_form' && activeTrip && (
          <PassengerFormModal
            key="modal-passenger-form"
            trip={activeTrip}
            selectedSeats={selectedSeats}
            onClose={() => setBookingStep('none')}
            onBackToSeats={() => setBookingStep('seat_map')}
            onProceedToPayment={handleProceedToPayment}
          />
        )}

        {/* Step 3: Payment Modal */}
        {bookingStep === 'payment' && activeTrip && (
          <PaymentModal
            key="modal-payment"
            trip={activeTrip}
            passengers={activePassengers}
            selectedSeats={selectedSeats}
            insuranceSelected={insuranceSelected}
            addonsPrice={addonsPrice}
            onClose={() => setBookingStep('none')}
            onBackToPassengers={() => setBookingStep('passenger_form')}
            onBookingSuccess={handleBookingSuccess}
          />
        )}

        {/* Step 4: Digital Boarding Pass Ticket */}
        {bookingStep === 'ticket' && activeTicketBooking && (
          <TicketPassModal
            key="modal-ticket"
            booking={activeTicketBooking}
            onClose={() => {
              setBookingStep('none');
              setActiveTicketBooking(null);
            }}
            onOpenTracker={() => {
              setTrackerBooking(activeTicketBooking);
              setShowTracker(true);
            }}
            onOpenMyBookings={() => setShowMyBookings(true)}
          />
        )}

        {/* App-level My Bookings Modal */}
        {showMyBookings && (
          <MyBookingsModal
            key="modal-my-bookings"
            bookings={bookings}
            onClose={() => setShowMyBookings(false)}
            onViewTicket={(b) => {
              setActiveTicketBooking(b);
              setBookingStep('ticket');
            }}
            onOpenTracker={(b) => {
              setTrackerBooking(b);
              setShowTracker(true);
            }}
            onCancelBooking={handleCancelBooking}
            onBookNewTrip={() => {
              const el = document.getElementById('search-results-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {/* App-level Route Tracker GPS Modal */}
        {showTracker && (
          <RouteTrackerModal
            key="modal-route-tracker"
            activeBooking={trackerBooking}
            onClose={() => setShowTracker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

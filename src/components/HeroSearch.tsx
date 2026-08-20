import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  ArrowLeftRight,
  Calendar,
  Users,
  Search,
  Sparkles,
  Zap,
  ShieldCheck,
  Armchair,
  Wifi,
  ChevronDown,
  X,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CITIES } from '../data/mockData';
import { SearchQuery, CityOption, BusClass } from '../types';

interface HeroSearchProps {
  onSearch: (query: SearchQuery) => void;
  initialQuery?: SearchQuery;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, initialQuery }) => {
  const [departure, setDeparture] = useState(initialQuery?.departureCity || 'Paris');
  const [arrival, setArrival] = useState(initialQuery?.arrivalCity || 'Lyon');
  const [date, setDate] = useState(
    initialQuery?.date || new Date().toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState(initialQuery?.returnDate || '');
  const [isRoundTrip, setIsRoundTrip] = useState(initialQuery?.isRoundTrip || false);
  const [passengers, setPassengers] = useState(initialQuery?.passengersCount || 1);
  const [selectedClass, setSelectedClass] = useState<string>('Tous');

  const [showDepDropdown, setShowDepDropdown] = useState(false);
  const [showArrDropdown, setShowArrDropdown] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  const depRef = useRef<HTMLDivElement>(null);
  const arrRef = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (depRef.current && !depRef.current.contains(event.target as Node)) {
        setShowDepDropdown(false);
      }
      if (arrRef.current && !arrRef.current.contains(event.target as Node)) {
        setShowArrDropdown(false);
      }
      if (passRef.current && !passRef.current.contains(event.target as Node)) {
        setShowPassengerModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwap = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departure || !arrival) return;
    onSearch({
      departureCity: departure,
      arrivalCity: arrival,
      date,
      returnDate: isRoundTrip ? returnDate : undefined,
      passengersCount: passengers,
      isRoundTrip,
    });
  };

  const quickRoutes = [
    { from: 'Paris', to: 'Lyon', price: '14,90€' },
    { from: 'Paris', to: 'Bruxelles', price: '15,00€' },
    { from: 'Paris', to: 'Amsterdam', price: '24,00€' },
    { from: 'Paris', to: 'Marseille', price: '22,50€' },
    { from: 'Lyon', to: 'Barcelone', price: '29,00€' },
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-16 lg:pb-24">
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[550px] h-[550px] bg-[#CCFF00] rounded-full blur-[160px] opacity-10" />
        <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-[#3B82F6] rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Badge & Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#CCFF00] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-lg shadow-black/40"
          >
            <Sparkles className="w-4 h-4 text-[#CCFF00] animate-pulse" />
            <span>Nouvelle flotte 2026 : Wi-Fi 5G & Sièges massants VIP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] font-['Outfit'] uppercase italic"
          >
            Voyagez en Europe en toute{' '}
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #CCFF00' }}>
              sérénité
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/70 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Réservez vos billets au meilleur prix avec choix de siège interactif en direct,
            bagages inclus et suivi de trajet en temps réel.
          </motion.p>
        </div>

        {/* Animated Bus Visual Graphic on Highway */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative max-w-4xl mx-auto mb-8 hidden md:block"
        >
          <div className="relative h-20 rounded-2xl bg-[#121212]/90 border border-white/10 p-3 flex items-center justify-between overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* Road lines animated */}
            <div className="absolute inset-x-0 bottom-4 h-[2px] bg-white/10">
              <motion.div
                animate={{ x: [-100, 400] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-20 h-full bg-[#CCFF00]/80 shadow-[0_0_10px_#CCFF00]"
              />
            </div>

            {/* Departure pin */}
            <div className="flex items-center gap-3 relative z-10 pl-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CCFF00] font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Départ</p>
                <p className="text-sm font-bold text-white">{departure}</p>
              </div>
            </div>

            {/* Traveling Animated Bus */}
            <div className="flex-1 px-8 relative flex items-center justify-center">
              <div className="w-full h-1 bg-white/10 rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#3B82F6] to-[#CCFF00] rounded-full" />
                <motion.div
                  animate={{ x: [-80, 80, -80] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFF00] text-black text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(204,255,0,0.4)] whitespace-nowrap">
                    <span>Setra Grand Confort</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Arrival pin */}
            <div className="flex items-center gap-3 relative z-10 pr-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3B82F6] font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Arrivée</p>
                <p className="text-sm font-bold text-white">{arrival}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Search Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-5xl mx-auto rounded-3xl bg-[#121212]/95 border border-white/10 p-4 sm:p-6 lg:p-7 shadow-2xl backdrop-blur-2xl"
        >
          {/* Trip Type & Class Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
              <button
                type="button"
                id="btn-oneway"
                onClick={() => setIsRoundTrip(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  !isRoundTrip
                    ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Aller simple
              </button>
              <button
                type="button"
                id="btn-roundtrip"
                onClick={() => setIsRoundTrip(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isRoundTrip
                    ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Aller-retour
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1.5 text-white/70 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
                Paiement 100% sécurisé
              </span>
              <span className="flex items-center gap-1.5 text-white/70 font-medium">
                <Zap className="w-4 h-4 text-[#CCFF00]" />
                Billet digital instantané
              </span>
            </div>
          </div>

          {/* Form Controls Grid */}
          <form onSubmit={handleSearchSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
              {/* Departure Input */}
              <div className="lg:col-span-3 relative" ref={depRef}>
                <div
                  onClick={() => {
                    setShowDepDropdown(!showDepDropdown);
                    setShowArrDropdown(false);
                  }}
                  className={`p-3.5 rounded-2xl bg-[#0a0a0a] border transition-all cursor-pointer hover:border-[#CCFF00]/50 ${
                    showDepDropdown ? 'border-[#CCFF00] ring-2 ring-[#CCFF00]/20' : 'border-white/10'
                  }`}
                >
                  <label className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest block mb-1">
                    Ville de départ
                  </label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#CCFF00] shrink-0" />
                    <span className="text-white font-bold text-base truncate">{departure || 'Sélectionnez'}</span>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDepDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-[#161616] border border-white/15 rounded-2xl p-3 shadow-2xl z-50 backdrop-blur-xl max-h-72 overflow-y-auto"
                    >
                      <p className="text-[10px] font-bold text-white/40 px-2 py-1 uppercase tracking-widest">
                        Villes recommandées
                      </p>
                      <div className="mt-1 space-y-1">
                        {CITIES.map((city) => (
                          <button
                            key={city.id}
                            type="button"
                            onClick={() => {
                              setDeparture(city.name);
                              setShowDepDropdown(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm transition-all cursor-pointer ${
                              departure === city.name
                                ? 'bg-[#CCFF00]/15 text-[#CCFF00] font-bold border border-[#CCFF00]/30'
                                : 'text-white/80 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <MapPin className="w-4 h-4 text-white/40" />
                              <span>{city.name}</span>
                            </div>
                            <span className="text-xs text-white/40 font-mono">{city.code}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center lg:col-span-1">
                <motion.button
                  type="button"
                  id="swap-cities-btn"
                  whileTap={{ rotate: 180, scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#CCFF00] text-[#CCFF00] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                  title="Inverser les villes"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Arrival Input */}
              <div className="lg:col-span-3 relative" ref={arrRef}>
                <div
                  onClick={() => {
                    setShowArrDropdown(!showArrDropdown);
                    setShowDepDropdown(false);
                  }}
                  className={`p-3.5 rounded-2xl bg-[#0a0a0a] border transition-all cursor-pointer hover:border-[#CCFF00]/50 ${
                    showArrDropdown ? 'border-[#CCFF00] ring-2 ring-[#CCFF00]/20' : 'border-white/10'
                  }`}
                >
                  <label className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest block mb-1">
                    Destination
                  </label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span className="text-white font-bold text-base truncate">{arrival || 'Sélectionnez'}</span>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showArrDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-[#161616] border border-white/15 rounded-2xl p-3 shadow-2xl z-50 backdrop-blur-xl max-h-72 overflow-y-auto"
                    >
                      <p className="text-[10px] font-bold text-white/40 px-2 py-1 uppercase tracking-widest">
                        Destinations populaires
                      </p>
                      <div className="mt-1 space-y-1">
                        {CITIES.map((city) => (
                          <button
                            key={city.id}
                            type="button"
                            onClick={() => {
                              setArrival(city.name);
                              setShowArrDropdown(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm transition-all cursor-pointer ${
                              arrival === city.name
                                ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold border border-[#3B82F6]/30'
                                : 'text-white/80 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <MapPin className="w-4 h-4 text-white/40" />
                              <span>{city.name}</span>
                            </div>
                            <span className="text-xs text-[#CCFF00] font-bold">dès {city.startingPrice}€</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Date Input */}
              <div className={isRoundTrip ? 'lg:col-span-3' : 'lg:col-span-3'}>
                <div className="p-3.5 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#CCFF00]/50 transition-all">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1">
                    {isRoundTrip ? 'Dates Aller - Retour' : 'Date de départ'}
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#CCFF00] shrink-0" />
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-transparent text-white font-bold text-sm sm:text-base focus:outline-none w-full cursor-pointer"
                    />
                    {isRoundTrip && (
                      <input
                        type="date"
                        value={returnDate}
                        min={date}
                        onChange={(e) => setReturnDate(e.target.value)}
                        placeholder="Retour"
                        className="bg-transparent text-white font-bold text-sm sm:text-base focus:outline-none w-full cursor-pointer border-l border-white/10 pl-2"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Passengers & Search Button */}
              <div className="lg:col-span-2 relative" ref={passRef}>
                <div
                  onClick={() => setShowPassengerModal(!showPassengerModal)}
                  className={`p-3.5 rounded-2xl bg-[#0a0a0a] border transition-all cursor-pointer hover:border-[#CCFF00]/50 ${
                    showPassengerModal ? 'border-[#CCFF00] ring-2 ring-[#CCFF00]/20' : 'border-white/10'
                  }`}
                >
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1">
                    Passagers
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#CCFF00] shrink-0" />
                      <span className="text-white font-bold text-base">
                        {passengers} {passengers > 1 ? 'Pers.' : 'Pers.'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/40" />
                  </div>
                </div>

                {/* Passenger Selector Popup */}
                <AnimatePresence>
                  {showPassengerModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-[#161616] border border-white/15 rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-sm font-bold text-white">Voyageurs</span>
                        <span className="text-xs text-[#CCFF00] font-bold">Max. 8 pers.</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm font-semibold text-white">Adultes & Enfants</p>
                          <p className="text-xs text-white/40">Dès 3 ans</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (passengers > 1) setPassengers(passengers - 1);
                            }}
                            disabled={passengers <= 1}
                            className="w-8 h-8 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 flex items-center justify-center cursor-pointer transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-base font-bold text-white w-4 text-center">{passengers}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (passengers < 8) setPassengers(passengers + 1);
                            }}
                            disabled={passengers >= 8}
                            className="w-8 h-8 rounded-lg bg-[#CCFF00] text-black hover:bg-[#bbf000] disabled:opacity-30 flex items-center justify-center cursor-pointer transition-colors font-bold"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassengerModal(false)}
                        className="w-full mt-2 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                      >
                        Valider
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Quick routes */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-white/40 font-medium">Lignes directes :</span>
                {quickRoutes.map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDeparture(r.from);
                      setArrival(r.to);
                      onSearch({
                        departureCity: r.from,
                        arrivalCity: r.to,
                        date,
                        passengersCount: passengers,
                        isRoundTrip: false,
                      });
                    }}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#CCFF00]/15 text-white/70 hover:text-[#CCFF00] border border-white/10 hover:border-[#CCFF00]/30 transition-all cursor-pointer font-medium"
                  >
                    {r.from} ➔ {r.to} <span className="text-[#CCFF00] font-bold ml-1">{r.price}</span>
                  </button>
                ))}
              </div>

              {/* Big Search CTA */}
              <motion.button
                type="submit"
                id="search-trips-submit-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-black text-sm sm:text-base shadow-[0_0_25px_rgba(204,255,0,0.25)] flex items-center justify-center gap-3 cursor-pointer transition-all uppercase tracking-wider font-['Outfit']"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>Rechercher les bus</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

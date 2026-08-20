import React, { useState } from 'react';
import {
  Bus,
  Clock,
  MapPin,
  Wifi,
  Zap,
  Coffee,
  Tv,
  Wind,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Leaf,
  Layers,
  Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Trip, BusAmenity } from '../types';

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
  index: number;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onSelectTrip, index }) => {
  const [expanded, setExpanded] = useState(false);

  const getAmenityIcon = (amenity: BusAmenity) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="w-3.5 h-3.5" title="Wi-Fi 5G Illimité" />;
      case 'power':
        return <Zap className="w-3.5 h-3.5" title="Prises 220V & USB" />;
      case 'snack':
        return <Coffee className="w-3.5 h-3.5" title="Service boisson / snack" />;
      case 'tv':
        return <Tv className="w-3.5 h-3.5" title="Écran de divertissement" />;
      case 'ac':
        return <Wind className="w-3.5 h-3.5" title="Climatisation" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const isVip = trip.busClass === 'VIP Lounge';
  const isNight = trip.busClass === 'Night Sleeper';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group relative rounded-3xl bg-[#121212]/95 border transition-all duration-300 backdrop-blur-xl overflow-hidden hover:shadow-2xl hover:border-[#CCFF00]/40 ${
        isVip
          ? 'border-[#CCFF00]/40 shadow-lg shadow-[#CCFF00]/5'
          : isNight
          ? 'border-[#3B82F6]/30'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Top Banner Tag */}
      <div className="px-6 pt-4 pb-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0a0a0a]/60">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: trip.operatorColor }}
          />
          <span className="text-sm font-black text-white font-['Outfit'] tracking-wide uppercase">
            {trip.operator}
          </span>
          <span className="text-xs text-white/40 font-mono hidden sm:inline">
            {trip.busModel}
          </span>
          {trip.hasDoubleDeck && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30 uppercase tracking-wider">
              <Layers className="w-3 h-3" />
              Double Étage
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2.5 py-1 rounded-full border border-[#CCFF00]/20">
            <Star className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
            <span>{trip.rating}</span>
            <span className="text-white/40 font-normal">({trip.reviewsCount})</span>
          </div>

          {/* Bus Class Badge */}
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              isVip
                ? 'bg-[#CCFF00] text-black font-black shadow-md shadow-[#CCFF00]/20'
                : isNight
                ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/40'
                : 'bg-white/5 text-white/70 border border-white/10'
            }`}
          >
            {trip.busClass}
          </span>
        </div>
      </div>

      {/* Main Trip Card Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Departure & Arrival Visual Route */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center justify-between sm:justify-start sm:gap-10">
              {/* Departure Info */}
              <div className="w-28 sm:w-32">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {trip.departureTime}
                </span>
                <p className="text-sm font-bold text-white mt-0.5">{trip.departureCity}</p>
                <p className="text-xs text-white/40 truncate">{trip.departureStation}</p>
              </div>

              {/* Journey Duration Graphic */}
              <div className="flex-1 max-w-[200px] px-2 flex flex-col items-center">
                <span className="text-xs font-semibold text-white/50 flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                  {trip.duration}
                </span>
                <div className="w-full relative flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] border-2 border-black z-10" />
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-[#CCFF00] via-white/20 to-[#3B82F6] relative">
                    {trip.stops.length > 2 && (
                      <div className="absolute left-1/2 -top-1 w-2 h-2 rounded-full bg-white/40 -translate-x-1/2" />
                    )}
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] border-2 border-black z-10" />
                </div>
                <span className="text-[10px] text-white/40 mt-1 font-mono uppercase tracking-wider">
                  {trip.stops.length > 2 ? `${trip.stops.length - 2} arrêt(s)` : 'Direct'}
                </span>
              </div>

              {/* Arrival Info */}
              <div className="w-28 sm:w-32 text-right sm:text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {trip.arrivalTime}
                </span>
                <p className="text-sm font-bold text-white mt-0.5">{trip.arrivalCity}</p>
                <p className="text-xs text-white/40 truncate">{trip.arrivalStation}</p>
              </div>
            </div>

            {/* Amenities & Highlight Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 bg-[#0a0a0a] px-2.5 py-1 rounded-full border border-white/10 text-white/70">
                {trip.amenities.map((amenity, i) => (
                  <span key={i} className="text-white/40 hover:text-[#CCFF00] transition-colors">
                    {getAmenityIcon(amenity)}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 text-xs text-[#CCFF00] bg-[#CCFF00]/10 px-2.5 py-1 rounded-full border border-[#CCFF00]/20 font-medium">
                <Leaf className="w-3 h-3" />
                -{trip.co2SavedKg}kg CO₂ vs Voiture
              </span>

              {trip.seatsAvailable <= 12 && (
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 animate-pulse">
                  Plus que {trip.seatsAvailable} places !
                </span>
              )}
            </div>
          </div>

          {/* Pricing & Selection CTA */}
          <div className="md:col-span-4 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-6">
            <div className="text-left md:text-right">
              <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Prix par passager</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#CCFF00] font-['Outfit']">
                  {trip.basePrice.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-[#CCFF00]/80">{trip.currency}</span>
              </div>
              <span className="text-[10px] text-white/40 block">Taxes & bagages inclus</span>
            </div>

            <motion.button
              type="button"
              id={`select-trip-${trip.id}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectTrip(trip)}
              className="px-6 py-3.5 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(204,255,0,0.2)] flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider font-['Outfit']"
            >
              <span>Choisir les sièges</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
          </div>
        </div>

        {/* Expand Itinerary Drawer Toggle */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 text-white/40">
            <span className="font-semibold text-white/70">
              Ponctualité garantie à {trip.punctualityRate}%
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Prise en charge bagage gratuite</span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-[#CCFF00] hover:text-[#bbf000] font-bold flex items-center gap-1 transition-colors cursor-pointer text-xs uppercase tracking-wider"
          >
            <span>{expanded ? 'Masquer détails' : 'Voir le détail du trajet'}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Itinerary Drawer */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-white/10 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0a0a0a]/90 p-4 rounded-2xl border border-white/10">
                {/* Stops Timeline */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                    Itinéraire détaillé et arrêts
                  </h4>
                  <div className="space-y-3 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                    {trip.stops.map((stop, sIdx) => (
                      <div key={sIdx} className="relative flex items-start justify-between text-xs">
                        <div
                          className={`absolute -left-4 top-1 w-2.5 h-2.5 rounded-full border-2 border-black ${
                            stop.isMainStop ? 'bg-[#CCFF00]' : 'bg-white/40'
                          }`}
                        />
                        <div>
                          <p className={`font-bold ${stop.isMainStop ? 'text-white' : 'text-white/70'}`}>
                            {stop.city}
                          </p>
                          <p className="text-white/40 text-[11px]">{stop.station}</p>
                        </div>
                        <span className="font-mono font-semibold text-[#CCFF00]">{stop.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Onboard Amenities & Services */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                    Services & Confort à bord
                  </h4>
                  <ul className="space-y-2 text-xs text-white/70">
                    {trip.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-[#CCFF00] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Conducteurs certifiés longue distance avec relève sécurisée</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  X,
  Armchair,
  Sparkles,
  Info,
  Check,
  Layers,
  ArrowRight,
  ShieldCheck,
  Users,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Trip, Seat, SeatDeck } from '../types';
import { generateBusSeats } from '../data/mockData';

interface SeatMapModalProps {
  trip: Trip;
  passengersCount: number;
  onClose: () => void;
  onConfirmSeats: (seats: Seat[]) => void;
  initialSelectedSeats?: Seat[];
}

export const SeatMapModal: React.FC<SeatMapModalProps> = ({
  trip,
  passengersCount,
  onClose,
  onConfirmSeats,
  initialSelectedSeats = [],
}) => {
  const [allSeats, setAllSeats] = useState<Seat[]>(() => {
    const generated = generateBusSeats(trip);
    if (initialSelectedSeats.length > 0) {
      const selectedIds = new Set(initialSelectedSeats.map((s) => s.id));
      return generated.map((s) => ({
        ...s,
        status: selectedIds.has(s.id) ? 'selected' : s.status,
      }));
    }
    return generated;
  });

  const [activeDeck, setActiveDeck] = useState<SeatDeck>('lower');
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);

  const selectedSeats = useMemo(() => {
    return allSeats.filter((s) => s.status === 'selected');
  }, [allSeats]);

  const currentPassengerIndex = Math.min(selectedSeats.length + 1, passengersCount);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'reserved' || seat.status === 'disabled') return;

    if (seat.status === 'selected') {
      // Deselect
      setAllSeats((prev) =>
        prev.map((s) => (s.id === seat.id ? { ...s, status: 'available' } : s))
      );
    } else {
      // Select if under passenger limit
      if (selectedSeats.length >= passengersCount) {
        // Replace earliest selected or alert
        const firstSelected = selectedSeats[0];
        setAllSeats((prev) =>
          prev.map((s) => {
            if (s.id === firstSelected.id) return { ...s, status: 'available' };
            if (s.id === seat.id) return { ...s, status: 'selected' };
            return s;
          })
        );
      } else {
        setAllSeats((prev) =>
          prev.map((s) => (s.id === seat.id ? { ...s, status: 'selected' } : s))
        );
      }
    }
  };

  const currentDeckSeats = useMemo(() => {
    return allSeats.filter((s) => s.deck === activeDeck);
  }, [allSeats, activeDeck]);

  // Group seats by rows
  const seatRows = useMemo(() => {
    const rowsMap = new Map<number, Seat[]>();
    currentDeckSeats.forEach((seat) => {
      if (!rowsMap.has(seat.row)) {
        rowsMap.set(seat.row, []);
      }
      rowsMap.get(seat.row)!.push(seat);
    });
    return Array.from(rowsMap.entries()).sort(([a], [b]) => a - b);
  }, [currentDeckSeats]);

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, s) => sum + s.price, 0);
  }, [selectedSeats]);

  const handleProceed = () => {
    if (selectedSeats.length < passengersCount) {
      alert(`Veuillez choisir ${passengersCount} place(s) avant de continuer.`);
      return;
    }
    onConfirmSeats(selectedSeats);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/80">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 sm:px-8 sm:py-6 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 uppercase tracking-widest">
                Plan de bus interactif
              </span>
              <span className="text-xs text-white/40 font-mono">{trip.busModel}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mt-1 uppercase italic">
              Sélectionnez vos sièges ({trip.departureCity} ➔ {trip.arrivalCity})
            </h2>
            <p className="text-xs text-white/50">
              {passengersCount} voyageur{passengersCount > 1 ? 's' : ''} •{' '}
              <span className="text-[#CCFF00] font-bold">
                {selectedSeats.length} / {passengersCount} sélectionné(s)
              </span>
            </p>
          </div>

          <button
            type="button"
            id="close-seat-map-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deck Switcher & Legend */}
        <div className="px-5 sm:px-8 py-3 bg-[#161616] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          {/* Deck Toggle if double decker */}
          {trip.hasDoubleDeck ? (
            <div className="flex items-center gap-1 bg-[#0a0a0a] p-1 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => setActiveDeck('lower')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeDeck === 'lower'
                    ? 'bg-[#CCFF00] text-black shadow-md shadow-[#CCFF00]/20'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Étage Inférieur</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDeck('upper')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeDeck === 'upper'
                    ? 'bg-[#CCFF00] text-black shadow-md shadow-[#CCFF00]/20'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Étage Supérieur</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-white/50 font-semibold flex items-center gap-2 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#CCFF00]" />
              <span>Autocar Mononiveau Confort Premium</span>
            </div>
          )}

          {/* Seat Status Legend */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-md bg-white/10 border border-white/20" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-md bg-[#CCFF00] border border-[#CCFF00] shadow-[0_0_8px_#CCFF00]" />
              <span className="text-[#CCFF00] font-bold">Sélectionné</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-md bg-[#0a0a0a] border border-white/10 opacity-40" />
              <span className="text-white/30">Occupé</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-[#CCFF00]/30 to-[#3B82F6]/30 border border-[#CCFF00]/80" />
              <span className="text-[#CCFF00]">Panoramique VIP</span>
            </div>
          </div>
        </div>

        {/* Bus Cabin Visual Layout */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#080808] flex flex-col items-center">
          {/* Passenger Assignment Progress Helper */}
          {selectedSeats.length < passengersCount && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-2 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-black/40"
            >
              <Users className="w-4 h-4 text-[#CCFF00]" />
              <span>Choisissez le siège pour le passager {currentPassengerIndex} sur {passengersCount}</span>
            </motion.div>
          )}

          {/* Realistic Bus Frame */}
          <div className="relative w-full max-w-md bg-[#121212] border-2 border-white/10 rounded-[48px] p-5 sm:p-7 shadow-2xl">
            {/* Bus Front Windshield / Cockpit */}
            <div className="relative mb-6 pb-5 border-b border-white/10 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                {/* Driver seat */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-[10px] text-white/40 font-bold">
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 mb-0.5" />
                  <span>Volant</span>
                </div>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  Cabine Conducteur
                </span>
              </div>

              {/* Front Windshield Curved Glass styling */}
              <div className="px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                Pare-Brise Avant
              </div>
            </div>

            {/* Seats Grid */}
            <div className="space-y-3">
              {seatRows.map(([rowNum, rowSeats]) => {
                const leftSeats = rowSeats.filter((s) => s.col < 2);
                const rightSeats = rowSeats.filter((s) => s.col >= 2);

                return (
                  <div key={rowNum} className="flex items-center justify-between gap-4">
                    {/* Left seats pair (A, B) */}
                    <div className="flex items-center gap-2">
                      {leftSeats.map((seat) => {
                        const isSelected = seat.status === 'selected';
                        const isReserved = seat.status === 'reserved';
                        const isPanoramic = seat.type === 'panoramic';
                        const isVip = seat.type === 'vip';

                        return (
                          <motion.button
                            key={seat.id}
                            type="button"
                            disabled={isReserved}
                            onClick={() => handleSeatClick(seat)}
                            onMouseEnter={() => setHoveredSeat(seat)}
                            onMouseLeave={() => setHoveredSeat(null)}
                            whileHover={!isReserved ? { scale: 1.12, y: -2 } : {}}
                            whileTap={!isReserved ? { scale: 0.92 } : {}}
                            className={`relative w-11 h-12 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.5)] ring-2 ring-[#CCFF00] font-black'
                                : isReserved
                                ? 'bg-[#0a0a0a] border border-white/5 text-white/20 cursor-not-allowed opacity-30'
                                : isPanoramic
                                ? 'bg-white/5 border-2 border-[#CCFF00]/60 text-[#CCFF00] hover:border-[#CCFF00]'
                                : isVip
                                ? 'bg-white/5 border-2 border-[#CCFF00]/40 text-[#CCFF00] hover:border-[#CCFF00]'
                                : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30'
                            }`}
                          >
                            <Armchair className={`w-4 h-4 mb-0.5 ${isSelected ? 'stroke-[2.5]' : ''}`} />
                            <span className="text-[10px] font-mono leading-none">{seat.number}</span>

                            {/* Small sparkle for panoramic */}
                            {isPanoramic && !isSelected && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_4px_#CCFF00]" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Central Aisle marker */}
                    <div className="flex-1 flex justify-center">
                      <span className="text-[10px] font-mono text-white/30 font-semibold select-none">
                        R{rowNum}
                      </span>
                    </div>

                    {/* Right seats pair (C, D) */}
                    <div className="flex items-center gap-2">
                      {rightSeats.map((seat) => {
                        const isSelected = seat.status === 'selected';
                        const isReserved = seat.status === 'reserved';
                        const isPanoramic = seat.type === 'panoramic';
                        const isVip = seat.type === 'vip';

                        return (
                          <motion.button
                            key={seat.id}
                            type="button"
                            disabled={isReserved}
                            onClick={() => handleSeatClick(seat)}
                            onMouseEnter={() => setHoveredSeat(seat)}
                            onMouseLeave={() => setHoveredSeat(null)}
                            whileHover={!isReserved ? { scale: 1.12, y: -2 } : {}}
                            whileTap={!isReserved ? { scale: 0.92 } : {}}
                            className={`relative w-11 h-12 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.5)] ring-2 ring-[#CCFF00] font-black'
                                : isReserved
                                ? 'bg-[#0a0a0a] border border-white/5 text-white/20 cursor-not-allowed opacity-30'
                                : isPanoramic
                                ? 'bg-white/5 border-2 border-[#CCFF00]/60 text-[#CCFF00] hover:border-[#CCFF00]'
                                : isVip
                                ? 'bg-white/5 border-2 border-[#CCFF00]/40 text-[#CCFF00] hover:border-[#CCFF00]'
                                : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30'
                            }`}
                          >
                            <Armchair className={`w-4 h-4 mb-0.5 ${isSelected ? 'stroke-[2.5]' : ''}`} />
                            <span className="text-[10px] font-mono leading-none">{seat.number}</span>

                            {isPanoramic && !isSelected && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_4px_#CCFF00]" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rear of bus (WC, Luggage Rack) */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/40 px-2 uppercase tracking-wider">
              <span className="flex items-center gap-1 font-bold">🚻 Toilettes & Lavabo</span>
              <span className="flex items-center gap-1 font-bold">🧳 Rangement soute</span>
            </div>
          </div>

          {/* Floating Seat Tooltip Preview */}
          {hoveredSeat && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-4 py-2 rounded-full bg-[#161616] border border-white/15 text-xs text-white/80 flex items-center gap-3 shadow-xl"
            >
              <span className="font-bold text-white font-mono text-sm">
                Siège {hoveredSeat.number}
              </span>
              <span className="text-[#CCFF00] font-semibold">{hoveredSeat.label}</span>
              <span className="text-white/40">
                {hoveredSeat.status === 'reserved'
                  ? 'Déjà réservé'
                  : `${hoveredSeat.price.toFixed(2)} €`}
              </span>
            </motion.div>
          )}
        </div>

        {/* Footer with Price Summary & Action */}
        <div className="p-5 sm:px-8 sm:py-6 border-t border-white/10 bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block">
              Sièges sélectionnés ({selectedSeats.length}/{passengersCount}) :
            </span>
            <div className="flex items-center gap-2 mt-1">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((s) => (
                  <span
                    key={s.id}
                    className="px-3 py-1 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 text-xs font-mono font-bold"
                  >
                    Siège {s.number} ({s.price.toFixed(2)}€)
                  </span>
                ))
              ) : (
                <span className="text-xs text-white/30 italic">Aucun siège choisi</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Total trajet</span>
              <span className="text-2xl sm:text-3xl font-black text-[#CCFF00] font-['Outfit']">
                {totalPrice > 0 ? totalPrice.toFixed(2) : (trip.basePrice * passengersCount).toFixed(2)}{' '}
                €
              </span>
            </div>

            <motion.button
              type="button"
              id="confirm-seats-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleProceed}
              disabled={selectedSeats.length < passengersCount}
              className="px-6 py-3.5 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(204,255,0,0.2)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider font-['Outfit']"
            >
              <span>Continuer</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

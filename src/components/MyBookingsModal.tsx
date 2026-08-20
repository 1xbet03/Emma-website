import React from 'react';
import {
  X,
  Ticket,
  Bus,
  Calendar,
  Clock,
  ArrowRight,
  Printer,
  Trash2,
  Radio,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking } from '../types';

interface MyBookingsModalProps {
  bookings: Booking[];
  onClose: () => void;
  onViewTicket: (booking: Booking) => void;
  onOpenTracker: (booking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  onBookNewTrip: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  bookings,
  onClose,
  onViewTicket,
  onOpenTracker,
  onCancelBooking,
  onBookNewTrip,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/80">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 sm:px-8 sm:py-6 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40 flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] uppercase italic">
                Mes Billets & Voyages
              </h2>
              <p className="text-xs text-white/40 uppercase tracking-wider">
                {bookings.length} réservation{bookings.length > 1 ? 's' : ''} enregistrée{bookings.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-4 bg-[#080808]">
          {bookings.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#121212] border border-white/10 text-white/40 flex items-center justify-center mx-auto">
                <Ticket className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Aucune réservation pour le moment</h3>
              <p className="text-xs text-white/50 max-w-md mx-auto">
                Recherchez votre prochaine destination et réservez vos sièges préférés en toute
                facilité !
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNewTrip();
                }}
                className="px-6 py-3 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Rechercher un billet de bus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/15 px-2.5 py-1 rounded-md border border-[#CCFF00]/30">
                        {booking.bookingReference}
                      </span>
                      <span className="text-xs text-white/40 font-medium">
                        Réservé le {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2.5 py-1 rounded-full border border-[#CCFF00]/20 uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmé & Payé
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-8 space-y-2">
                      <div className="flex items-center gap-4 text-lg font-black text-white font-['Outfit'] uppercase">
                        <span>{booking.trip.departureCity}</span>
                        <span className="text-[#CCFF00]">➔</span>
                        <span>{booking.trip.arrivalCity}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                          {booking.trip.departureTime} - {booking.trip.arrivalTime} ({booking.trip.duration})
                        </span>
                        <span>•</span>
                        <span>
                          {booking.passengers.length} passager(s) :{' '}
                          {booking.passengers.map((p) => `${p.firstName} ${p.lastName}`).join(', ')}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-[#CCFF00]">
                          Siège(s) : {booking.selectedSeats.map((s) => s.number).join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col md:items-end justify-center">
                      <span className="text-[10px] uppercase tracking-wider text-white/40">Total réglé</span>
                      <span className="text-2xl font-black text-[#CCFF00] font-['Outfit']">
                        {booking.totalPrice.toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-rose-400 hover:text-rose-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Annuler / Remboursement</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenTracker(booking);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 transition-all cursor-pointer flex items-center gap-1.5 uppercase text-[11px] tracking-wider"
                      >
                        <Radio className="w-3.5 h-3.5 text-[#CCFF00]" />
                        <span>Suivi GPS</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onViewTicket(booking)}
                        className="px-4 py-1.5 rounded-xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-black transition-all cursor-pointer flex items-center gap-1.5 font-['Outfit'] uppercase text-[11px] tracking-wider"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Afficher le Billet</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 sm:px-8 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all cursor-pointer border border-white/10 uppercase tracking-wider"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

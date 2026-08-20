import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Download,
  Share2,
  Printer,
  Bus,
  QrCode,
  MapPin,
  Calendar,
  Clock,
  User,
  Armchair,
  ShieldCheck,
  Zap,
  ArrowRight,
  Radio,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Booking } from '../types';

interface TicketPassModalProps {
  booking: Booking;
  onClose: () => void;
  onOpenTracker: () => void;
  onOpenMyBookings: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  booking,
  onClose,
  onOpenTracker,
  onOpenMyBookings,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedPassengerIdx, setSelectedPassengerIdx] = useState(0);

  const currentPassenger = booking.passengers[selectedPassengerIdx] || booking.passengers[0];
  const currentSeat = booking.selectedSeats[selectedPassengerIdx] || booking.selectedSeats[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Mon billet Bus Travel ${booking.bookingReference} pour ${booking.trip.departureCity} -> ${booking.trip.arrivalCity} : https://bustravel.app/pass/${booking.bookingReference}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/80">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 25 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-3xl bg-[#121212] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Top Success Banner */}
        <div className="bg-[#CCFF00] p-4 sm:p-5 flex items-center justify-between text-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-[#CCFF00] flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/80">
                Réservation Confirmée !
              </p>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-black font-['Outfit'] uppercase italic">
                Billet Électronique & Carte d'Embarquement
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-black flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Passenger Switcher if multiple */}
        {booking.passengers.length > 1 && (
          <div className="px-6 py-2.5 bg-[#0a0a0a] border-b border-white/10 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-white/40 uppercase tracking-wider mr-2">Voir le pass :</span>
            {booking.passengers.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPassengerIdx(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer uppercase tracking-wider ${
                  selectedPassengerIdx === idx
                    ? 'bg-[#CCFF00] text-black shadow'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {p.firstName} {p.lastName} (Siège {p.seatNumber})
              </button>
            ))}
          </div>
        )}

        {/* Ticket Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-[#080808]">
          {/* Authentic Digital Boarding Pass Card */}
          <div className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden print:border-black print:text-black">
            {/* Operator & Reference header */}
            <div className="p-6 bg-[#121212] border-b border-dashed border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 border border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00]">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                    Bus Travel Express
                  </span>
                  <span className="text-base font-black text-white font-['Outfit'] uppercase">
                    {booking.trip.busModel}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-white/40 uppercase font-mono block">Réf. Dossier</span>
                <span className="text-lg font-black font-mono text-[#CCFF00]">
                  {booking.bookingReference}
                </span>
              </div>
            </div>

            {/* Main Journey Details Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Route & Timing */}
              <div className="md:col-span-8 space-y-6">
                <div className="flex items-center justify-between sm:justify-start sm:gap-12">
                  <div>
                    <span className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest block">
                      Départ
                    </span>
                    <span className="text-3xl font-black text-white font-mono">
                      {booking.trip.departureTime}
                    </span>
                    <p className="text-base font-black text-white uppercase">{booking.trip.departureCity}</p>
                    <p className="text-xs text-white/50">{booking.trip.departureStation}</p>
                  </div>

                  <div className="flex flex-col items-center px-4">
                    <span className="text-xs font-mono text-white/40 mb-1">{booking.trip.duration}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                      <div className="w-16 sm:w-24 h-0.5 bg-dashed bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    </div>
                    <span className="text-[10px] text-[#CCFF00] font-bold mt-1 uppercase tracking-wider">Direct</span>
                  </div>

                  <div className="text-right sm:text-left">
                    <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest block">
                      Arrivée
                    </span>
                    <span className="text-3xl font-black text-white font-mono">
                      {booking.trip.arrivalTime}
                    </span>
                    <p className="text-base font-black text-white uppercase">{booking.trip.arrivalCity}</p>
                    <p className="text-xs text-white/50">{booking.trip.arrivalStation}</p>
                  </div>
                </div>

                {/* Passenger & Seat badge */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                      Voyageur
                    </span>
                    <span className="text-sm font-bold text-white uppercase">
                      {currentPassenger.firstName} {currentPassenger.lastName}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                      Siège Attribué
                    </span>
                    <span className="text-sm font-mono font-black text-[#CCFF00]">
                      {currentSeat?.number || '04A'} ({currentSeat?.label || 'Fenêtre'})
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                      Classe de bus
                    </span>
                    <span className="text-sm font-bold text-white uppercase">
                      {booking.trip.busClass}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scannable QR Code stub */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#121212] border border-white/10 text-center">
                <div className="relative p-2.5 rounded-xl bg-white text-black shadow-inner">
                  {/* Decorative QR code visual with SVG */}
                  <svg
                    viewBox="0 0 120 120"
                    className="w-28 h-28 text-black"
                    fill="currentColor"
                  >
                    <rect width="120" height="120" fill="white" />
                    {/* QR corner 1 */}
                    <rect x="10" y="10" width="30" height="30" fill="black" />
                    <rect x="15" y="15" width="20" height="20" fill="white" />
                    <rect x="20" y="20" width="10" height="10" fill="black" />
                    {/* QR corner 2 */}
                    <rect x="80" y="10" width="30" height="30" fill="black" />
                    <rect x="85" y="15" width="20" height="20" fill="white" />
                    <rect x="90" y="20" width="10" height="10" fill="black" />
                    {/* QR corner 3 */}
                    <rect x="10" y="80" width="30" height="30" fill="black" />
                    <rect x="15" y="85" width="20" height="20" fill="white" />
                    <rect x="20" y="90" width="10" height="10" fill="black" />
                    {/* Random pattern blocks */}
                    <rect x="45" y="15" width="6" height="6" fill="black" />
                    <rect x="55" y="25" width="8" height="8" fill="black" />
                    <rect x="68" y="15" width="6" height="12" fill="black" />
                    <rect x="45" y="45" width="30" height="30" fill="black" />
                    <rect x="52" y="52" width="16" height="16" fill="white" />
                    <rect x="57" y="57" width="6" height="6" fill="black" />
                    <rect x="85" y="50" width="10" height="6" fill="black" />
                    <rect x="85" y="70" width="25" height="6" fill="black" />
                    <rect x="50" y="85" width="12" height="12" fill="black" />
                    <rect x="70" y="85" width="8" height="20" fill="black" />
                    <rect x="90" y="90" width="15" height="15" fill="black" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-2">
                  Scannez au portillon
                </span>
                <span className="text-xs font-mono font-bold text-[#CCFF00]">
                  {booking.bookingReference}
                </span>
              </div>
            </div>

            {/* Bottom Barcode visual */}
            <div className="px-6 py-4 bg-[#121212] border-t border-dashed border-white/10 flex items-center justify-between text-xs text-white/40">
              <span className="flex items-center gap-1.5 text-[#CCFF00] font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-4 h-4" />
                Embarquement garanti • Présentez une pièce d'identité
              </span>
              <span className="font-mono text-white/30 hidden sm:inline text-[10px]">
                BT-{Date.now().toString().slice(-8)}
              </span>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              id="print-ticket-btn"
              onClick={handlePrint}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
            >
              <Printer className="w-4 h-4 text-[#CCFF00]" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              type="button"
              id="share-ticket-btn"
              onClick={handleShare}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
            >
              {copied ? <Check className="w-4 h-4 text-[#CCFF00]" /> : <Share2 className="w-4 h-4 text-[#3B82F6]" />}
              <span>{copied ? 'Lien copié !' : 'Partager mon billet'}</span>
            </button>

            <button
              type="button"
              id="track-bus-live-btn"
              onClick={() => {
                onClose();
                onOpenTracker();
              }}
              className="p-3.5 rounded-2xl bg-[#CCFF00]/15 hover:bg-[#CCFF00]/25 border border-[#CCFF00]/40 text-[#CCFF00] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.15)] uppercase tracking-wider"
            >
              <Radio className="w-4 h-4 text-[#CCFF00] animate-pulse" />
              <span>Suivi GPS en direct</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:px-8 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenMyBookings();
            }}
            className="text-xs font-bold text-white/40 hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
          >
            Accéder à toutes mes réservations
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-[#bbf000] text-black text-xs font-black transition-all cursor-pointer font-['Outfit'] uppercase tracking-wider"
          >
            Terminer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

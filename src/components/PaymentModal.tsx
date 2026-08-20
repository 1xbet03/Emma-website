import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trip, Seat, Passenger, Booking } from '../types';

interface PaymentModalProps {
  trip: Trip;
  passengers: Passenger[];
  selectedSeats: Seat[];
  insuranceSelected: boolean;
  addonsPrice: number;
  onClose: () => void;
  onBackToPassengers: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  trip,
  passengers,
  selectedSeats,
  insuranceSelected,
  addonsPrice,
  onClose,
  onBackToPassengers,
  onBookingSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'mobile_money' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8829');
  const [cardExp, setCardExp] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [cardHolder, setCardHolder] = useState(
    `${passengers[0]?.firstName || 'Alexandre'} ${passengers[0]?.lastName || 'Dubois'}`
  );

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const seatsBasePrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const subtotal = seatsBasePrice + addonsPrice;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalPrice = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'BUSTRAVEL10' || code === 'PROMO10' || code === 'VOYAGE') {
      setDiscountPercent(10);
      setPromoMessage({ text: 'Code promo appliqué ! -10% de réduction', success: true });
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      setPromoMessage({ text: 'Super promo VIP ! -20% de réduction', success: true });
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.7 } });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ text: 'Code promotionnel invalide ou expiré', success: false });
    }
  };

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // Trigger festive celebration
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
      });

      const refCode = `BT-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: Booking = {
        id: `book-${Date.now()}`,
        bookingReference: refCode,
        trip,
        passengers,
        selectedSeats,
        totalPrice: Number(finalPrice.toFixed(2)),
        date: new Date().toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        paymentMethod:
          paymentMethod === 'card'
            ? 'Carte Bancaire'
            : paymentMethod === 'apple_pay'
            ? 'Apple Pay'
            : paymentMethod === 'mobile_money'
            ? 'Mobile Money (Wave / Orange)'
            : 'PayPal',
        insuranceSelected,
        qrCodeData: `https://bustravel.app/verify/${refCode}`,
      };

      onBookingSuccess(newBooking);
    }, 1400);
  };

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
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 uppercase tracking-wider">
                Étape 3 sur 3
              </span>
              <span className="text-xs text-white/40 uppercase tracking-wider">Paiement 100% Crypté SSL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mt-1 uppercase italic">
              Règlement sécurisé de votre réservation
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#080808]">
          {/* Left Column: Payment Methods & Inputs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00] font-bold shadow-lg shadow-black/30'
                    : 'bg-[#0a0a0a] border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#CCFF00]" />
                <span className="text-xs font-bold uppercase tracking-wider">Carte CB</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-[#3B82F6]/15 border-[#3B82F6] text-[#3B82F6] font-bold shadow-lg shadow-black/30'
                    : 'bg-[#0a0a0a] border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <Smartphone className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-xs font-bold uppercase tracking-wider">Apple / G-Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('mobile_money')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'mobile_money'
                    ? 'bg-orange-500/15 border-orange-500 text-orange-400 font-bold shadow-lg shadow-black/30'
                    : 'bg-[#0a0a0a] border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <Smartphone className="w-5 h-5 text-orange-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Wave / MoMo</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'paypal'
                    ? 'bg-blue-500/15 border-blue-500 text-blue-300 font-bold shadow-lg shadow-black/30'
                    : 'bg-[#0a0a0a] border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <Lock className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider">PayPal</span>
              </button>
            </div>

            {/* Card Simulation Visual */}
            {paymentMethod === 'card' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-3xl bg-gradient-to-tr from-black via-[#161616] to-[#222] p-6 border border-[#CCFF00]/30 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 rounded-md bg-[#CCFF00]/80" />
                    <span className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest font-mono">
                      Bus Travel Black Card
                    </span>
                  </div>
                  <span className="text-lg font-black text-white italic">VISA</span>
                </div>

                <div className="py-2">
                  <span className="text-[10px] text-white/40 block font-mono uppercase tracking-wider">Numéro de carte</span>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-transparent font-mono text-xl sm:text-2xl font-bold tracking-widest text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase font-mono block">Titulaire</span>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="bg-transparent text-sm font-bold text-white focus:outline-none uppercase"
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/40 uppercase font-mono block">Expire</span>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="bg-transparent text-sm font-bold text-white focus:outline-none w-16 text-right font-mono"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mobile Money Notice */}
            {paymentMethod === 'mobile_money' && (
              <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-orange-500/30 space-y-3">
                <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                  Paiement instantané Wave & Orange Money & MTN MoMo
                </p>
                <p className="text-xs text-white/60">
                  Entrez votre numéro mobile sur l'étape suivante pour valider le push de débit
                  sur votre smartphone avec 0 frais de transaction.
                </p>
              </div>
            )}

            {/* Promo Code Box */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                Code promo ou bon de réduction (Ex: BUSTRAVEL10 ou VIP20)
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="BUSTRAVEL10"
                    className="w-full bg-[#0a0a0a] border border-white/15 focus:border-[#CCFF00] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white font-mono uppercase font-bold focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#CCFF00] text-xs font-bold border border-white/10 hover:border-[#CCFF00]/40 transition-all cursor-pointer uppercase tracking-wider"
                >
                  Appliquer
                </button>
              </div>

              {promoMessage && (
                <div
                  className={`flex items-center gap-2 text-xs font-medium ${
                    promoMessage.success ? 'text-[#CCFF00]' : 'text-rose-400'
                  }`}
                >
                  {promoMessage.success ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{promoMessage.text}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Order Recap */}
          <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-white font-['Outfit'] uppercase tracking-wider pb-3 border-b border-white/10">
                Récapitulatif de commande
              </h3>

              <div className="mt-4 space-y-3 text-xs">
                {/* Trip detail */}
                <div className="bg-[#0a0a0a] p-3.5 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between font-bold text-white text-sm">
                    <span>{trip.departureCity}</span>
                    <span className="text-[#CCFF00]">➔</span>
                    <span>{trip.arrivalCity}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/50 mt-1">
                    <span>{trip.departureTime} - {trip.arrivalTime}</span>
                    <span className="text-white/70 font-mono">{trip.duration}</span>
                  </div>
                  <span className="text-[10px] text-[#CCFF00] font-bold block mt-1 uppercase tracking-wider">
                    {trip.operator} • {trip.busClass}
                  </span>
                </div>

                {/* Seats List */}
                <div className="flex items-center justify-between text-white/70">
                  <span>Sièges sélectionnés ({selectedSeats.map((s) => s.number).join(', ')})</span>
                  <span className="font-mono font-bold text-white">{seatsBasePrice.toFixed(2)} €</span>
                </div>

                {/* Add-ons */}
                {addonsPrice > 0 && (
                  <div className="flex items-center justify-between text-white/70">
                    <span>Options & Bagages</span>
                    <span className="font-mono font-bold text-white">+{addonsPrice.toFixed(2)} €</span>
                  </div>
                )}

                {/* Insurance */}
                {insuranceSelected && (
                  <div className="flex items-center justify-between text-[#CCFF00]">
                    <span>Garantie Annulation 100%</span>
                    <span className="font-mono font-bold">Inclus</span>
                  </div>
                )}

                {/* Discount */}
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-[#CCFF00] font-bold">
                    <span>Réduction code promo (-{discountPercent}%)</span>
                    <span className="font-mono">-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total Block */}
            <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase font-bold text-white/50 tracking-wider">Montant Total :</span>
                <span className="text-3xl font-black text-[#CCFF00] font-['Outfit']">
                  {finalPrice.toFixed(2)} €
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Billet instantané & Carte d'embarquement QR Code</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:px-8 sm:py-6 border-t border-white/10 bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToPassengers}
            disabled={isProcessing}
            className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors cursor-pointer disabled:opacity-50 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modifier passagers</span>
          </button>

          <motion.button
            type="button"
            id="pay-now-btn"
            disabled={isProcessing}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePay}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-black text-sm sm:text-base shadow-[0_0_25px_rgba(204,255,0,0.25)] flex items-center justify-center gap-3 cursor-pointer transition-all uppercase tracking-wider font-['Outfit'] disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Traitement bancaire sécurisé...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 stroke-[2.5]" />
                <span>Payer {finalPrice.toFixed(2)} €</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

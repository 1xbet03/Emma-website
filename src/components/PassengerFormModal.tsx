import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Luggage,
  ShieldCheck,
  Zap,
  Coffee,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Bike,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Trip, Seat, Passenger } from '../types';

interface PassengerFormModalProps {
  trip: Trip;
  selectedSeats: Seat[];
  onClose: () => void;
  onBackToSeats: () => void;
  onProceedToPayment: (passengers: Passenger[], insuranceSelected: boolean, totalAddonsPrice: number) => void;
}

export const PassengerFormModal: React.FC<PassengerFormModalProps> = ({
  trip,
  selectedSeats,
  onClose,
  onBackToSeats,
  onProceedToPayment,
}) => {
  const [passengers, setPassengers] = useState<Passenger[]>(() =>
    selectedSeats.map((seat, i) => ({
      id: `p-${i + 1}`,
      firstName: i === 0 ? 'Alexandre' : '',
      lastName: i === 0 ? 'Dubois' : '',
      email: i === 0 ? 'alexandre.dubois@email.com' : '',
      phone: i === 0 ? '+33 6 12 34 56 78' : '',
      seatId: seat.id,
      seatNumber: seat.number,
      luggageCount: 1, // 1 free luggage included
      bulkyLuggage: false,
      priorityBoarding: false,
      snackBox: false,
    }))
  );

  const [insuranceSelected, setInsuranceSelected] = useState(true);

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Addons calculations
  const seatsBaseTotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  let addonsTotal = 0;
  passengers.forEach((p) => {
    if (p.luggageCount > 1) addonsTotal += (p.luggageCount - 1) * 5;
    if (p.bulkyLuggage) addonsTotal += 9;
    if (p.priorityBoarding) addonsTotal += 3;
    if (p.snackBox) addonsTotal += 6;
  });
  if (insuranceSelected) addonsTotal += 2.5 * passengers.length;

  const grandTotal = seatsBaseTotal + addonsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate that at least first passenger has names
    for (const p of passengers) {
      if (!p.firstName.trim() || !p.lastName.trim()) {
        alert('Veuillez renseigner le nom et prénom pour tous les passagers.');
        return;
      }
    }
    onProceedToPayment(passengers, insuranceSelected, addonsTotal);
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
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30 uppercase tracking-wider">
                Étape 2 sur 3
              </span>
              <span className="text-xs text-white/40 uppercase tracking-wider">Détails des voyageurs</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mt-1 uppercase italic">
              Coordonnées des passagers & Options
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

        {/* Form Body */}
        <form id="passenger-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 bg-[#080808]">
          {/* Passenger Info Cards */}
          <div className="space-y-6">
            {passengers.map((p, idx) => (
              <div
                key={p.id}
                className="bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#CCFF00]/20 border border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00] font-black text-sm">
                      {idx + 1}
                    </div>
                    <span className="font-black text-white text-base uppercase tracking-wider">Passager {idx + 1}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#0a0a0a] border border-white/15 text-xs font-mono font-bold text-[#CCFF00]">
                    Siège : {p.seatNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">
                      Prénom *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={p.firstName}
                        onChange={(e) => updatePassenger(idx, 'firstName', e.target.value)}
                        placeholder="Ex: Jean"
                        className="w-full bg-[#0a0a0a] border border-white/15 focus:border-[#CCFF00] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white font-medium focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">
                      Nom de famille *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={p.lastName}
                        onChange={(e) => updatePassenger(idx, 'lastName', e.target.value)}
                        placeholder="Ex: Dupont"
                        className="w-full bg-[#0a0a0a] border border-white/15 focus:border-[#CCFF00] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white font-medium focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {idx === 0 && (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">
                          Adresse Email (Réception des billets) *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={p.email}
                            onChange={(e) => updatePassenger(idx, 'email', e.target.value)}
                            placeholder="jean.dupont@email.com"
                            className="w-full bg-[#0a0a0a] border border-white/15 focus:border-[#CCFF00] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">
                          Numéro de Mobile (Alertes SMS trajet) *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={p.phone}
                            onChange={(e) => updatePassenger(idx, 'phone', e.target.value)}
                            placeholder="+33 6 00 00 00 00"
                            className="w-full bg-[#0a0a0a] border border-white/15 focus:border-[#CCFF00] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Individual Passenger Options */}
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-3">
                    Options supplémentaires pour ce passager :
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Extra Luggage */}
                    <button
                      type="button"
                      onClick={() =>
                        updatePassenger(idx, 'luggageCount', p.luggageCount > 1 ? 1 : 2)
                      }
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                        p.luggageCount > 1
                          ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00]'
                          : 'bg-[#0a0a0a] border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <Luggage className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider">+1 Bagage soute</p>
                        <p className="text-[10px] text-white/50">+5.00 € (20kg)</p>
                      </div>
                    </button>

                    {/* Priority boarding */}
                    <button
                      type="button"
                      onClick={() => updatePassenger(idx, 'priorityBoarding', !p.priorityBoarding)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                        p.priorityBoarding
                          ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00]'
                          : 'bg-[#0a0a0a] border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider">Embarquement Prio</p>
                        <p className="text-[10px] text-white/50">+3.00 € (Coupe-file)</p>
                      </div>
                    </button>

                    {/* Snack Gourmet Box */}
                    <button
                      type="button"
                      onClick={() => updatePassenger(idx, 'snackBox', !p.snackBox)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                        p.snackBox
                          ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00]'
                          : 'bg-[#0a0a0a] border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <Coffee className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider">Box Repas & Café</p>
                        <p className="text-[10px] text-white/50">+6.00 € (Bio & Frais)</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Travel Insurance Card */}
          <div className="bg-[#121212] border border-[#CCFF00]/30 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 border border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base uppercase tracking-wider">
                      Garantie Sérénité Annulation 100%
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CCFF00]/20 text-[#CCFF00] uppercase tracking-wider">
                      Recommandé
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-1 max-w-xl">
                    Annulez jusqu'à 30 minutes avant le départ sans aucun motif et recevez un
                    remboursement intégral instantané ou un bon d'achat majoré de 10%.
                  </p>
                  <p className="text-xs font-bold text-[#CCFF00] mt-2">
                    +2.50 € par passager ({2.5 * passengers.length} €)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInsuranceSelected(!insuranceSelected)}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 mt-1 ${
                  insuranceSelected
                    ? 'bg-[#CCFF00] border-[#CCFF00] text-black'
                    : 'bg-[#0a0a0a] border-white/20 text-transparent'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-5 sm:px-8 sm:py-6 border-t border-white/10 bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToSeats}
            className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modifier les sièges</span>
          </button>

          <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Total général</span>
              <span className="text-2xl sm:text-3xl font-black text-[#CCFF00] font-['Outfit']">
                {grandTotal.toFixed(2)} €
              </span>
            </div>

            <motion.button
              type="submit"
              form="passenger-form"
              id="proceed-to-payment-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(204,255,0,0.2)] flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider font-['Outfit']"
            >
              <span>Passer au paiement</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

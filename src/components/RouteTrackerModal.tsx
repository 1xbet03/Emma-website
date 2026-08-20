import React, { useState, useEffect } from 'react';
import {
  X,
  Radio,
  Bus,
  Gauge,
  Navigation,
  Thermometer,
  Wifi,
  Clock,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Booking } from '../types';

interface RouteTrackerModalProps {
  onClose: () => void;
  activeBooking?: Booking | null;
}

export const RouteTrackerModal: React.FC<RouteTrackerModalProps> = ({
  onClose,
  activeBooking,
}) => {
  const [speed, setSpeed] = useState(94);
  const [progressPercent, setProgressPercent] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => Math.min(100, Math.max(88, prev + (Math.random() * 4 - 2))));
      setProgressPercent((prev) => (prev >= 98 ? 10 : prev + 0.2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const departure = activeBooking?.trip.departureCity || 'Paris';
  const arrival = activeBooking?.trip.arrivalCity || 'Lyon';
  const busModel = activeBooking?.trip.busModel || 'Setra S 531 DT Grand Tourisme';
  const operator = activeBooking?.trip.operator || 'Bus Travel Express';

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
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#CCFF00]"></span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] uppercase italic">
                Suivi GPS en Direct • {operator}
              </h2>
              <p className="text-xs text-white/40 uppercase tracking-wider">
                Ligne {departure} ➔ {arrival} • Télémétrie satellite temps réel
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

        {/* Live Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-[#080808]">
          {/* Live Telemetry KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] flex items-center justify-center border border-[#CCFF00]/30">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Vitesse GPS</span>
                <span className="text-lg font-black text-white font-mono">{speed.toFixed(0)} km/h</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center border border-[#3B82F6]/30">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Prochain arrêt</span>
                <span className="text-lg font-black text-white font-mono">dans 38 min</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] flex items-center justify-center border border-[#CCFF00]/30">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Climatisation</span>
                <span className="text-lg font-black text-white font-mono">21.5 °C</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Réseau 5G</span>
                <span className="text-lg font-black text-white font-mono">Très bon</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Simulation */}
          <div className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 overflow-hidden">
            {/* Map background grid styling */}
            <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] text-[10px] font-bold border border-[#CCFF00]/30 uppercase tracking-wider">
                    Circulation fluide sur Autoroute A6
                  </span>
                  <p className="text-sm font-bold text-white mt-2 uppercase tracking-wide">
                    Position actuelle : En approche de Beaune (km 294)
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#CCFF00]">
                  {progressPercent.toFixed(0)}% du trajet complété
                </span>
              </div>

              {/* Progress Line Bar with Animated Bus Pin */}
              <div className="py-6">
                <div className="relative h-3 rounded-full bg-[#161616] overflow-visible border border-white/5">
                  {/* Active completed track */}
                  <div
                    className="h-full rounded-full bg-[#CCFF00] transition-all duration-700 shadow-[0_0_12px_rgba(204,255,0,0.5)]"
                    style={{ width: `${progressPercent}%` }}
                  />

                  {/* Pulsing Bus Pin Marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700"
                    style={{ left: `${progressPercent}%` }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-10 h-10 rounded-2xl bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black shadow-xl shadow-[#CCFF00]/40 cursor-pointer"
                    >
                      <Bus className="w-5 h-5 stroke-[2.5]" />
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold mt-4">
                  <div className="flex items-center gap-1.5 text-white">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00]" />
                    <span className="uppercase">{departure}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white/40">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="uppercase text-[11px]">Escale Beaune</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                    <span className="uppercase">{arrival}</span>
                  </div>
                </div>
              </div>

              {/* Driver & Safety status */}
              <div className="p-4 rounded-2xl bg-[#121212] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0a0a0a] border border-white/15 flex items-center justify-center font-bold text-[#CCFF00]">
                    MR
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Michel R. (Conducteur Principal)</span>
                    <p className="text-[10px] text-white/50">
                      14 ans d'expérience • Certifié éco-conduite et premiers secours
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-3 py-1.5 rounded-xl border border-[#CCFF00]/20 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Trajet sous télématique continue</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:px-8 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">
            Actualisation auto toutes les 2s
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all cursor-pointer border border-white/10 uppercase tracking-wider"
          >
            Fermer le suivi
          </button>
        </div>
      </motion.div>
    </div>
  );
};

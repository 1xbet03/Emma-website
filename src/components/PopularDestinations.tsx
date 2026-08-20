import React from 'react';
import { MapPin, ArrowRight, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { CITIES } from '../data/mockData';
import { SearchQuery } from '../types';

interface PopularDestinationsProps {
  onSelectDestination: (query: SearchQuery) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  onSelectDestination,
}) => {
  const popularCities = CITIES.filter((c) => c.isPopular);

  return (
    <section id="popular-destinations" className="py-16 sm:py-20 border-t border-white/10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Évadez-vous à petits prix
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit'] mt-1 uppercase italic tracking-tight">
              Destinations les plus prisées
            </h2>
          </div>
          <p className="text-xs text-white/50 max-w-md uppercase tracking-wider">
            Des départs quotidiens vers plus de 150 villes européennes. Voyagez confortablement
            au meilleur prix garanti.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCities.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() =>
                onSelectDestination({
                  departureCity: 'Paris',
                  arrivalCity: city.name,
                  date: new Date().toISOString().split('T')[0],
                  passengersCount: 1,
                  isRoundTrip: false,
                })
              }
              className="group relative rounded-3xl overflow-hidden bg-[#121212] border border-white/10 hover:border-[#CCFF00]/50 shadow-2xl cursor-pointer transition-all"
            >
              {/* City Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />

                {/* Country & Code Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white/80 uppercase font-mono tracking-wider">
                  {city.country} • {city.code}
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#CCFF00] text-black text-xs font-black shadow-lg font-['Outfit'] uppercase tracking-wider">
                  dès {city.startingPrice} €
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white group-hover:text-[#CCFF00] transition-colors font-['Outfit'] uppercase">
                    Paris ➔ {city.name}
                  </h3>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider">Départs fréquents</p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#CCFF00] text-white/60 group-hover:text-black flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

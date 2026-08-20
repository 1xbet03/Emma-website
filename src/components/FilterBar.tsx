import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Wifi, Zap, Armchair, Sparkles, Clock, Check } from 'lucide-react';
import { FilterState, BusClass, BusAmenity } from '../types';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  totalResults,
}) => {
  const classes: BusClass[] = ['Standard', 'Confort+', 'VIP Lounge', 'Night Sleeper'];

  const toggleClass = (cls: BusClass) => {
    const next = filter.busClasses.includes(cls)
      ? filter.busClasses.filter((c) => c !== cls)
      : [...filter.busClasses, cls];
    onFilterChange({ ...filter, busClasses: next });
  };

  const toggleAmenity = (amenity: BusAmenity) => {
    const next = filter.amenities.includes(amenity)
      ? filter.amenities.filter((a) => a !== amenity)
      : [...filter.amenities, amenity];
    onFilterChange({ ...filter, amenities: next });
  };

  return (
    <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-4 mb-6 backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Results count & Quick sorting */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
            <span className="text-[#CCFF00] font-mono text-base">{totalResults}</span> trajet{totalResults > 1 ? 's' : ''} disponible{totalResults > 1 ? 's' : ''}
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-white/40" />
            <select
              id="sort-select"
              value={filter.sortBy}
              onChange={(e) =>
                onFilterChange({ ...filter, sortBy: e.target.value as FilterState['sortBy'] })
              }
              className="bg-[#0a0a0a] border border-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#CCFF00] cursor-pointer"
            >
              <option value="price_asc">Prix : Moins cher d'abord</option>
              <option value="duration_asc">Durée : Plus rapide</option>
              <option value="departure_asc">Départ : Plus tôt</option>
              <option value="rating_desc">Avis : Mieux notés</option>
            </select>
          </div>
        </div>

        {/* Bus Class filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-white/40 uppercase font-bold tracking-wider mr-1 hidden sm:inline">Confort :</span>
          {classes.map((cls) => {
            const isSelected = filter.busClasses.length === 0 || filter.busClasses.includes(cls);
            return (
              <button
                key={cls}
                type="button"
                onClick={() => toggleClass(cls)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#CCFF00]/15 border-[#CCFF00]/40 text-[#CCFF00] border shadow-sm'
                    : 'bg-white/5 border-white/10 text-white/40 border hover:text-white'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-[#CCFF00]" />}
                <span>{cls}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary filter chips (Amenities & Time of day) */}
      <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-white/40 text-[11px] uppercase font-bold tracking-wider">Équipements :</span>
          <button
            type="button"
            onClick={() => toggleAmenity('wifi')}
            className={`px-3 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              filter.amenities.includes('wifi')
                ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/40 font-bold'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
            }`}
          >
            <Wifi className="w-3 h-3" />
            Wi-Fi 5G
          </button>
          <button
            type="button"
            onClick={() => toggleAmenity('power')}
            className={`px-3 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              filter.amenities.includes('power')
                ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/40 font-bold'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
            }`}
          >
            <Zap className="w-3 h-3" />
            Prises 220V/USB
          </button>
          <button
            type="button"
            onClick={() => toggleAmenity('recline')}
            className={`px-3 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              filter.amenities.includes('recline')
                ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/40 font-bold'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
            }`}
          >
            <Armchair className="w-3 h-3" />
            Siège grand confort
          </button>
        </div>

        {/* Time of day selector */}
        <div className="flex items-center gap-1 bg-[#0a0a0a] p-1 rounded-full border border-white/10">
          {[
            { id: 'all', label: 'Toute la journée' },
            { id: 'morning', label: 'Matin' },
            { id: 'afternoon', label: 'Après-midi' },
            { id: 'night', label: 'Nuit' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                onFilterChange({ ...filter, timeOfDay: t.id as FilterState['timeOfDay'] })
              }
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter.timeOfDay === t.id
                  ? 'bg-white/15 text-white shadow'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

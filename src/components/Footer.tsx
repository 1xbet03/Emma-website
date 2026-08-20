import React from 'react';
import { Bus, Heart, ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-16 pb-12 text-white/50 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#CCFF00] flex items-center justify-center text-black shadow-lg shadow-[#CCFF00]/20">
                <Bus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black text-white font-['Outfit'] uppercase tracking-tight italic">Bus Travel</span>
            </div>
            <p className="text-xs text-white/40 max-w-sm leading-relaxed">
              La plateforme de réservation de bus interurbains et internationaux nouvelle
              génération. Choix des sièges en 3D/2D, suivi de trajet en direct et confort 5 étoiles.
            </p>
            <div className="pt-2 flex items-center gap-3 text-white/70">
              <span className="flex items-center gap-1.5 font-bold text-xs text-[#CCFF00] bg-[#CCFF00]/10 px-3 py-1 rounded-full border border-[#CCFF00]/20 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Opérateur certifié ARTC Europe
              </span>
            </div>
          </div>

          {/* Lines */}
          <div className="space-y-3">
            <h4 className="font-black text-white uppercase tracking-wider text-xs font-['Outfit']">
              Trajets Populaires
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Bus Paris - Lyon</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Bus Paris - Bruxelles</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Bus Paris - Amsterdam</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Bus Lyon - Marseille</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Bus Paris - Bordeaux</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="font-black text-white uppercase tracking-wider text-xs font-['Outfit']">
              Services & Confort
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Choix du siège à bord</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Suivi GPS direct</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Garantie Annulation Flex</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Bagages & Équipements</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Offres Groupes & VIP</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-black text-white uppercase tracking-wider text-xs font-['Outfit']">
              Assistance 24/7
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-white/80">
                <PhoneCall className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>+33 (0)1 89 50 00 00</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>support@bustravel.app</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>Gare Routière Centrale, Paris</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© 2026 Bus Travel Inc. Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">Conditions Générales de Vente</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Gestion des Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

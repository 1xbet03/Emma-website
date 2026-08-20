import React from 'react';
import {
  Armchair,
  Wifi,
  Leaf,
  Clock,
  ShieldCheck,
  Zap,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

export const BusFeatures: React.FC = () => {
  const features = [
    {
      icon: <Armchair className="w-5 h-5 text-[#CCFF00]" />,
      title: 'Sièges Confort XXL Inclinables',
      description: 'Espace généreux pour les jambes, repose-pieds ajustables et inclinaison jusqu\'à 145° pour un repos optimal.',
    },
    {
      icon: <Wifi className="w-5 h-5 text-[#CCFF00]" />,
      title: 'Wi-Fi 5G & Prises Individuelles',
      description: 'Connexion haut débit illimitée, ports USB rapides et prises 220V à chaque siège pour recharger vos appareils.',
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#CCFF00]" />,
      title: '85% Moins de CO₂ qu\'en Voiture',
      description: 'L\'autocar moderne est l\'un des moyens de transport les plus écologiques d\'Europe. Flotte Euro 6 basse émission.',
    },
    {
      icon: <Clock className="w-5 h-5 text-[#CCFF00]" />,
      title: 'Ponctualité Record 98.4%',
      description: 'Voies réservées, chauffeurs expérimentés et suivi télématique en temps réel pour des arrivées précises.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#CCFF00]" />,
      title: 'Choix Précis de votre Siège',
      description: 'Sélectionnez votre place sur plan 2D/3D : vue panoramique à l\'étage, côté fenêtre ou rangées avant.',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#CCFF00]" />,
      title: 'Billet Digital & QR Embarquement',
      description: 'Pas besoin d\'imprimer ! Présentez votre e-ticket sur smartphone avec notifications SMS en direct.',
    },
  ];

  return (
    <section id="why-bus-travel" className="py-16 sm:py-24 bg-[#080808] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            L'Expérience Nouvelle Génération
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] uppercase italic tracking-tight">
            Pourquoi voyager avec Bus Travel ?
          </h2>
          <p className="text-xs text-white/50 uppercase tracking-wider mt-4">
            Un standard d'excellence pensé pour allier confort supérieur, technologie moderne et
            respect de l'environnement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="p-7 rounded-3xl bg-[#121212] border border-white/10 hover:border-[#CCFF00]/40 transition-all shadow-2xl group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] border border-white/10 group-hover:border-[#CCFF00]/40 flex items-center justify-center mb-5 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-base font-black text-white font-['Outfit'] uppercase tracking-wide mb-2 group-hover:text-[#CCFF00] transition-colors">{f.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  Bus,
  Ticket,
  Compass,
  ShieldCheck,
  MapPin,
  PhoneCall,
  LogIn,
  LogOut,
  User as UserIcon,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigate: (view: 'home' | 'search' | 'tracker' | 'bookings' | 'features') => void;
  currentView: string;
  bookings: Booking[];
  onOpenBookings: () => void;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  currentView,
  bookings,
  onOpenBookings,
  onOpenTracker,
}) => {
  const { user, signInWithGoogle, logout, loading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setAuthError('Connexion annulée ou indisponible.');
      setTimeout(() => setAuthError(null), 4000);
    }
  };

  const handleSignOut = async () => {
    setShowUserMenu(false);
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#080808]/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 group cursor-pointer focus:outline-none text-left"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            className="w-11 h-11 rounded-2xl bg-[#CCFF00] flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)]"
          >
            <Bus className="w-6 h-6 text-black stroke-[2.4]" />
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight font-['Outfit'] uppercase italic">
                <span className="text-[#CCFF00]">bus</span>travel
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 uppercase tracking-widest">
                Cloud
              </span>
            </div>
            <p className="text-xs text-white/50 font-medium tracking-wider">Voyagez grand confort en Europe</p>
          </div>
        </button>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-inner">
          <button
            id="nav-search-btn"
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              currentView === 'home' || currentView === 'search'
                ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              Réserver
            </span>
          </button>

          <button
            id="nav-destinations-btn"
            onClick={() => {
              onNavigate('home');
              const el = document.getElementById('popular-destinations');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
            Destinations
          </button>

          <button
            id="nav-tracker-btn"
            onClick={onOpenTracker}
            className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]"></span>
            </span>
            Suivi GPS
          </button>

          <button
            id="nav-features-btn"
            onClick={() => {
              onNavigate('home');
              const el = document.getElementById('why-bus-travel');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
            Avantages
          </button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <button
            id="open-my-bookings-btn"
            onClick={onOpenBookings}
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#CCFF00]/60 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer group"
          >
            <Ticket className="w-4 h-4 text-[#CCFF00] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Mes Billets</span>
            {bookings.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-black text-black bg-[#CCFF00] rounded-full"
              >
                {bookings.length}
              </motion.span>
            )}
          </button>

          {/* User Auth Profile / Login */}
          {!loading && (
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    id="user-profile-menu-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#CCFF00]/40 transition-all cursor-pointer"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Avatar'}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-[#CCFF00]/50"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#CCFF00] text-black font-black text-xs flex items-center justify-center">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <span className="hidden md:inline text-xs font-bold text-white max-w-[100px] truncate">
                      {user.displayName?.split(' ')[0] || 'Passager'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#121212] border border-white/15 shadow-2xl p-3 z-50 space-y-3"
                      >
                        <div className="px-3 py-2 border-b border-white/10">
                          <p className="text-xs font-bold text-white truncate">
                            {user.displayName || 'Passager Connecté'}
                          </p>
                          <p className="text-[10px] text-white/50 truncate">{user.email}</p>
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-[#CCFF00]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Cloud Sync Firebase Actif</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              setShowUserMenu(false);
                              onOpenBookings();
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-white/80 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left uppercase tracking-wider"
                          >
                            <Ticket className="w-4 h-4 text-[#CCFF00]" />
                            <span>Mes réservations ({bookings.length})</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left uppercase tracking-wider"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Se déconnecter</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  id="google-signin-btn"
                  onClick={handleSignIn}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#CCFF00]/50 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  title="Se connecter avec Google pour synchroniser vos billets"
                >
                  <LogIn className="w-4 h-4 text-[#CCFF00]" />
                  <span className="hidden sm:inline">Connexion</span>
                </button>
              )}
            </div>
          )}

          <button
            id="quick-help-btn"
            onClick={() =>
              alert("Besoin d'aide ? Le support client Bus Travel est disponible 24/7 par chat ou au +33 (0)1 89 50 00 00.")
            }
            className="hidden sm:flex items-center gap-2 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all cursor-pointer"
            title="Assistance 24/7"
          >
            <PhoneCall className="w-4 h-4 text-[#CCFF00]" />
          </button>
        </div>
      </div>
    </header>
  );
};


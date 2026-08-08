import { motion } from 'framer-motion';
import { Calendar, Shield, Zap, ChevronRight, Minus, Plus, Gift, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { usePricingCalculator } from '@/hooks/usePricingCalculator';

export function Hero() {
  const { 
    days, 
    calculation, 
    incrementDays, 
    decrementDays, 
    setExactDays,
    newsletterSubscribed, 
    toggleNewsletter 
  } = usePricingCalculator();

  const scrollToBooking = () => {
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background avec image aéroport de Beauvais */}
      <div className="absolute inset-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Aéroport de Beauvais-Tillé (BVA) - Parking pas cher avec navette gratuite pour 7 jours ou plus" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay dégradé violet-bleu */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-indigo-900/80 to-purple-900/85" />
        {/* Animated background shapes */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">Navette 100% électrique disponible</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Parking Aéroport{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Beauvais
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/90">
                Jusqu'à{' '}
                <span className="text-green-400">3 jours offerts</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-8 max-w-xl"
            >
              Parking Aéroport Beauvais : parking sécurisé avec navette gratuite dès 7 jours de réservation, disponible 24h/24. 
              Départ tôt, retour tard, sans frais supplémentaires. Économisez jusqu'à <span className="text-green-400 font-bold">70 %</span> sur votre stationnement. 
              Réservez maintenant : <span className="text-green-400 font-bold">25 € TTC</span> pour 7 jours.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {[
                { icon: Shield, text: 'Parking sécurisé' },
                { icon: Zap, text: 'Navette électrique' },
                { icon: Calendar, text: 'Réservation flexible' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                >
                  <feature.icon className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={scrollToBooking}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 shadow-lg hover:shadow-green-500/25 transition-all group"
              >
                Réserver maintenant
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const element = document.querySelector('#features');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-white text-white bg-white/10 hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all"
              >
                En savoir plus
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white/70">87 avis 5 étoiles sur 9O avis Google</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Pricing Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <Card className="glass border-white/20 p-6 sm:p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Calculez votre prix
                </h3>
                <p className="text-white/70">
                  7€ le premier jour, 6€ les jours suivants
                </p>
              </div>

              {/* Days Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Nombre de jours
                </label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={decrementDays}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="w-24 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => setExactDays(parseInt(e.target.value) || 1)}
                      className="w-full text-center text-3xl font-bold text-white bg-transparent border-none outline-none"
                      min={1}
                      max={30}
                    />
                  </div>
                  <button
                    onClick={incrementDays}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Newsletter Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Newsletter</p>
                    <p className="text-xs text-white/60">+2 jours offerts à vie</p>
                  </div>
                </div>
                <Switch
                  checked={newsletterSubscribed}
                  onCheckedChange={toggleNewsletter}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Prix de base ({days} jours)</span>
                  <span>{calculation.basePrice}€</span>
                </div>
                {calculation.discountDays > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span className="flex items-center gap-1">
                      <Gift className="w-4 h-4" />
                      Jours offerts ({calculation.discountDays + (newsletterSubscribed ? 2 : 0)})
                    </span>
                    <span>-{calculation.discountAmount}€</span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-white">Prix final</span>
                    <span className="text-3xl font-bold text-green-400">
                      {calculation.finalPrice}€
                    </span>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm text-white/60">
                      soit {(calculation.finalPrice / days).toFixed(2)}€/jour en moyenne
                    </span>
                  </div>
                </div>
              </div>

              {/* Savings */}
              {calculation.savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 mb-6"
                >
                  <p className="text-center text-green-400 font-medium">
                    Vous économisez {calculation.savings}€ vs le parking officiel !
                  </p>
                </motion.div>
              )}

              {/* CTA */}
              <Button
                onClick={scrollToBooking}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 shadow-lg"
              >
                Réserver à ce prix
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-center text-xs text-white/50 mt-4">
                Annulation gratuite jusqu'à 24h avant l'arrivée
              </p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

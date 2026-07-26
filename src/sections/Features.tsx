import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Shield, 
  Zap, 
  Clock, 
  Camera, 
  MapPin, 
  Leaf,
  Star,
  Users,
  CheckCircle
} from 'lucide-react';
import { AnimatedStat } from '@/components/ui/animated-counter';

const features = [
  {
    icon: Zap,
    title: 'Navette 100% Électrique',
    description: 'Navette électrique gratuite pour toutes les réservations de 7 jours ou plus. Elle vous dépose directement au dépose minute de l\'aéroport en seulement 12 minutes.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Parking Sécurisé',
    description: 'Parking clos et surveillé avec portail électrique, caméras de surveillance et accès contrôlé 24h/24.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Camera,
    title: 'Photos de Votre Véhicule',
    description: 'Sur simple demande, recevez des photos de votre véhicule pendant votre absence pour voyager l\'esprit tranquille.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Clock,
    title: 'Horaire de la navette',
    description: 'Notre navette 100% électrique est disponible 24h/24, 7 jours sur 7, y compris les jours fériés. Transfert vers l\'aéroport à toute heure du jour et de la nuit.',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: MapPin,
    title: 'Terrain Stabilisé',
    description: 'Fini les places sur la pelouse et les chaussures pleines de boue. Emplacements stabilisés et clairement délimités.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Leaf,
    title: 'Écoresponsable',
    description: 'Entreprise locale et indépendante à taille humaine avec navette électrique pour réduire notre impact environnemental.',
    color: 'from-green-400 to-teal-500',
  },
];

const stats = [
  { icon: Star, value: '85', label: 'avis 5 étoiles sur 88' },
  { icon: Users, value: '50+', label: 'personnes nous recommandent' },
  { icon: CheckCircle, value: '70%', label: "d'économies" },
  { icon: Clock, value: '12', suffix: 'min', label: 'de navette' },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-100px' });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-green-100 to-teal-100 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium mb-4"
          >
            Pourquoi nous choisir ?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Le meilleur rapport{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              qualité-prix
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez pourquoi des centaines de voyageurs nous font confiance pour garer leur véhicule 
            lors de leurs départs de l'aéroport de Beauvais.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.25, ease: 'easeOut' } 
              }}
              className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Icon */}
              <motion.div 
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.25 }}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Stats Section avec animations */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          {/* Background animé */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl transform rotate-1 opacity-10"
            animate={statsInView ? { 
              rotate: [1, 2, 1],
              scale: [1, 1.02, 1]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 overflow-hidden">
            {/* Effet de brillance */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: '-100%' }}
              animate={statsInView ? { x: '200%' } : {}}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedStat
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  delay={0.6 + index * 0.15}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* SEO Image Section - Photo parking aéroport Beauvais */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-20 mb-20"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 lg:p-6">
                <img
                  src="/parking-navette-aeroport-beauvais.jpg"
                  alt="Free Day Parking Beauvais - Parking aéroport pas cher avec navette gratuite aller retour 25€ la semaine 85 avis 5 étoiles"
                  className="w-full h-auto max-h-[400px] lg:max-h-[450px] object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
              {/* Texte SEO */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Parking aéroport <span className="text-green-400">Beauvais</span> avec navette
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Le meilleur parking pas cher près de l'aéroport de Beauvais-Tillé (BVA). 
                  Profitez de notre navette électrique gratuite qui vous dépose en seulement 
                  <strong className="text-white"> 12 minutes</strong> au dépose minute de l'aéroport. 
                  À partir de <strong className="text-green-400">25€ la semaine</strong> avec 3 jours offerts.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Navette gratuite dès 7 jours',
                    'Parking sécurisé et clos',
                    '85 avis 5 étoiles Google',
                    'À 12 min de l\'aéroport BVA',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-white/10 text-sm text-white/90 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Comment ça marche ?
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Réservez', desc: 'Choisissez vos dates et réservez en ligne en 2 minutes' },
              { step: '2', title: 'Arrivez', desc: 'Venez garer votre véhicule à notre parking sécurisé' },
              { step: '3', title: 'Navette', desc: 'Notre navette vous dépose à l\'aéroport en 12 min' },
              { step: '4', title: 'Retour', desc: 'Appelez-nous à votre retour, on vient vous chercher' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8 + index * 0.12,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ y: -5 }}
                className="relative text-center"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                  whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.4)' }}
                  transition={{ duration: 0.25 }}
                >
                  {item.step}
                </motion.div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full">
                    <motion.div 
                      className="h-0.5 bg-gradient-to-r from-purple-300 to-blue-300"
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: '4rem' } : {}}
                      transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

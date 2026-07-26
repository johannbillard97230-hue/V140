import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Sun, Umbrella, CheckCircle } from 'lucide-react';

const parkingOptions = [
  {
    title: 'Parking Extérieur',
    image: '/parking-exterieur-aeroport-beauvais.jpg',
    alt: 'Parking extérieur sécurisé Free Day Parking Beauvais près de l\'aéroport Beauvais-Tillé avec places stabilisées et clôture',
    icon: Sun,
    description:
      'Notre parking extérieur stabilisé et clairement délimité vous offre une solution économique pour garer votre véhicule en toute sécurité. Fini les places sur la pelouse et les chaussures pleines de bouon.',
    features: [
      'Places stabilisées et délimitées',
      'Clôture et portail sécurisé',
      'Surveillance vidéo 24h/24',
      'Accès contrôlé',
      'Tarif économique',
    ],
  },
  {
    title: 'Parking Couvert',
    image: '/parking-couvert-aeroport-beauvais.jpg',
    alt: 'Parking couvert intérieur Free Day Parking Beauvais à l\'abri des intempéries près de l\'aéroport Beauvais-Tillé BVA',
    icon: Umbrella,
    description:
      'Notre parking couvert protège votre véhicule des intempéries, de la grêle et des UV. Idéal pour les séjours longue durée, votre voiture reste impeccable à votre retour.',
    features: [
      'Protection contre les intempéries',
      'À l\'abri de la grêle et des UV',
      'Sécurité renforcée en intérieur',
      'Accès par porte sectionnelle',
      'Idéal pour longue durée',
    ],
  },
];

export function ParkingTypes() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="parking-types"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40" />

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
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-medium mb-4"
          >
            Nos solutions de stationnement
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Choisissez votre{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              type de parking
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Deux options de stationnement disponibles à proximité de l'aéroport de
            Beauvais-Tillé (BVA) pour répondre à tous vos besoins et budgets.
          </motion.p>
        </motion.div>

        {/* Parking Options Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {parkingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={option.image}
                  alt={option.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Sécurisé</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{option.title}</h3>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{option.description}</p>

                {/* Features list */}
                <ul className="space-y-3">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Les deux types de parking incluent l'accès à notre navette 100% électrique
            gratuite (pour 7 jours ou plus) vers l'aéroport de Beauvais-Tillé.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

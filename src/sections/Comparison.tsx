import { motion } from 'framer-motion';
import { Check, Crown, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ParkingOption } from '@/types';

const parkingOptions: ParkingOption[] = [
  {
    id: 'official-p1',
    name: 'Parking P1/P2 Officiel',
    price7Days: 128,
    freeDays: 0,
    finalPrice: 128,
    features: [
      'À 2 min à pied du terminal',
      'Pas de navette nécessaire',
      'Surveillance 24h/24',
      'Réservation conseillée',
    ],
  },
  {
    id: 'official-p4',
    name: 'Parking P4 Officiel',
    price7Days: 78,
    freeDays: 0,
    finalPrice: 78,
    features: [
      'À 10 min à pied',
      'Parking longue durée',
      'Surveillance vidéo',
      'Le moins cher officiel',
    ],
  },
  {
    id: 'jt-parking',
    name: 'JT Parking',
    price7Days: 35,
    freeDays: 0,
    finalPrice: 35,
    features: [
      'Navette gratuite',
      'Parking sécurisé',
      'À 5 min de l\'aéroport',
      'Bon rapport qualité-prix',
    ],
  },
  {
    id: 'freedayparking',
    name: 'Free Day Parking',
    price7Days: 43,
    freeDays: 3,
    finalPrice: 25,
    features: [
      'Navette 100% électrique',
      '3 jours offerts',
      'Parking sécurisé',
      'Photos sur demande',
      'Service personnalisé',
    ],
    highlighted: true,
  },
];

export function Comparison() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const scrollToBooking = () => {
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="comparison" 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 text-sm font-medium mb-4">
            Comparatif
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comparez les{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              parkings
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez pourquoi Free Day Parking est la meilleure alternative pour stationner 
            près de l'aéroport de Beauvais.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {parkingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative h-full p-6 transition-all duration-300 flex flex-col ${
                option.highlighted 
                  ? 'border-2 border-purple-500 shadow-xl shadow-purple-500/20 scale-105' 
                  : 'border border-gray-200 hover:shadow-lg'
              }`}>
                {/* Highlighted badge */}
                {option.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium">
                      <Crown className="w-4 h-4" />
                      Meilleur choix
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className={`text-lg font-bold mb-2 ${
                    option.highlighted ? 'text-purple-700' : 'text-gray-900'
                  }`}>
                    {option.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {option.finalPrice}€
                    </span>
                    <span className="text-gray-500">/7j</span>
                  </div>
                  {option.freeDays > 0 && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      +{option.freeDays} jours offerts !
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        option.highlighted ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {option.highlighted && (
                  <Button
                    onClick={scrollToBooking}
                    className="w-full mt-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
                  >
                    Réserver
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hidden md:block overflow-x-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Critères</th>
                  <th className="px-6 py-4 text-center font-semibold">P1/P2 Officiel</th>
                  <th className="px-6 py-4 text-center font-semibold">P4 Officiel</th>
                  <th className="px-6 py-4 text-center font-semibold">JT Parking</th>
                  <th className="px-6 py-4 text-center font-semibold bg-purple-600/50">
                    <span className="flex items-center justify-center gap-1">
                      <Zap className="w-4 h-4" />
                      Free Day Parking
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { label: 'Prix 7 jours', values: ['128€', '78€', '35€', '25€ ✨'] },
                  { label: 'Distance aéroport', values: ['2 min à pied', '10 min à pied', '5 min navette', '12 min navette'] },
                  { label: 'Type de navette', values: ['—', '—', 'Thermique', 'Électrique ✨'] },
                  { label: 'Jours offerts', values: ['Non', 'Non', 'Non', '3 jours ✨'] },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.label}</td>
                    {row.values.map((value, j) => (
                      <td 
                        key={j} 
                        className={`px-6 py-4 text-center ${
                          j === 3 && value.includes('✨') 
                            ? 'text-purple-700 font-semibold bg-purple-50' 
                            : 'text-gray-600'
                        }`}
                      >
                        {value.includes('✅') ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : value.includes('Non') ? (
                          <span className="text-gray-400">Non</span>
                        ) : (
                          value.replace(' ✨', '')
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Savings highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div className="text-5xl font-bold">70%</div>
            <div className="text-left">
              <p className="text-lg font-semibold">d'économies</p>
              <p className="text-green-100">par rapport au parking officiel P1/P2</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

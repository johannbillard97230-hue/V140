import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, CreditCard, Wallet, Landmark, Lock } from 'lucide-react';

const partners = [
  {
    name: 'Qonto',
    role: 'Compte professionnel',
    description:
      'Notre compte bancaire professionnel est géré via Qonto, directement connecté à notre expert-comptable. Cette intégration garantit une gestion financière transparente, sécurisée et conforme aux normes comptables en vigueur.',
    icon: Landmark,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_Qonto_2022.jpg',
    color: 'from-gray-800 to-gray-900',
    iconBg: 'bg-gray-100',
  },
  {
    name: 'Mollie',
    role: 'Paiements sécurisés',
    description:
      'Mollie sécurise l\'ensemble de nos transactions en ligne. Vos paiements par carte bancaire Visa et Mastercard sont protégés, avec l\'option Tap-to-Pay pour un règlement rapide et sans contact directement sur place.',
    icon: CreditCard,
    logo: 'https://cdn.freebiesupply.com/logos/large/2x/mollie-2017-logo-png-transparent.png',
    color: 'from-blue-600 to-indigo-700',
    iconBg: 'bg-blue-50',
  },
  {
    name: 'PayPal',
    role: 'Paiement flexible',
    description:
      'PayPal offre une alternative de paiement simple et sécurisée. Réglez votre réservation en quelques clics, avec la protection acheteur PayPal et la possibilité de payer par carte ou via votre solde PayPal.',
    icon: Wallet,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png',
    color: 'from-blue-700 to-blue-900',
    iconBg: 'bg-blue-50',
  },
];

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4"
          >
            <Lock className="w-3.5 h-3.5" />
            Sécurité & Confiance
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Nos{' '}
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              partenaires
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Nous collaborons avec des acteurs de référence pour garantir la sécurité 
            de vos paiements et la transparence de notre gestion.
          </motion.p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${partner.color}`} />

              <div className="p-8">
                {/* Logo */}
                <div className="flex items-center justify-center h-16 mb-6">
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Role badge */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-lg ${partner.iconBg} flex items-center justify-center`}>
                    <partner.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {partner.role}
                  </span>
                </div>

                {/* Separator */}
                <div className="w-12 h-px bg-gray-200 mx-auto mb-4" />

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {partner.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-10 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-2">
                  Sécurité certifiée PCI-DSS
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                  Tous nos partenaires respectent la norme de sécurité <strong className="text-white">PCI-DSS</strong>{' '}
                  (Payment Card Industry Data Security Standard). Vos données bancaires sont chiffrées, 
                  jamais stockées sur nos serveurs, et chaque transaction est surveillée en temps réel 
                  pour prévenir la fraude. Vous pouvez réserver en toute confiance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

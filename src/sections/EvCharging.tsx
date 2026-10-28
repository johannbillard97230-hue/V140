import { motion } from 'framer-motion';
import { BatteryCharging, ArrowRight, Info } from 'lucide-react';

const EvCharging = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="recharge-electrique" className="py-16 sm:py-24 bg-gradient-to-b from-white to-green-50/60 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            <BatteryCharging className="w-4 h-4" />
            Option recharge électrique — aéroport de Beauvais-Tillé
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Vous partez en avion avec votre voiture électrique ?
            <span className="block text-green-600 mt-2">Pensez aussi à votre batterie au retour.</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Pendant votre voyage, profitez de votre stationnement pour faire recharger votre véhicule.
            À votre retour à l'aéroport de Beauvais, vous pourrez ainsi retrouver votre voiture avec
            davantage d'autonomie, selon la durée de recharge et les caractéristiques de votre véhicule.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Texte commercial : le problème, puis la solution */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-gray-700 leading-relaxed"
          >
            <p className="text-lg">
              Vous avez une voiture électrique et vous partez plusieurs jours en voyage ?
              Vous avez peut-être déjà pensé à ce qui vous attendra après l'atterrissage :
              retrouver votre voiture, reprendre la route et, si votre batterie est trop faible,
              devoir chercher une borne avant de rentrer chez vous.
            </p>
            <p className="text-lg">
              Avec <strong className="text-gray-900">Free Day Parking Beauvais</strong>, anticipez
              cette situation grâce à notre <strong className="text-gray-900">option de recharge
              électrique pendant votre stationnement</strong> — le parking avec recharge électrique
              pratique pour votre départ depuis l'aéroport de Beauvais-Tillé.
            </p>
            <p className="text-lg">
              Pendant que vous profitez de votre voyage, votre véhicule peut se recharger progressivement.
              Vous réduisez ainsi le risque de devoir chercher une borne dès votre retour et pouvez
              reprendre la route plus sereinement.
            </p>
            <p className="text-base text-gray-600 bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>
                Notre solution de <strong>recharge lente</strong> est adaptée au principe d'un véhicule
                qui reste stationné pendant plusieurs jours. La recharge réelle dépend notamment de la
                durée du stationnement, du niveau de batterie au départ et des caractéristiques du véhicule.
              </span>
            </p>
          </motion.div>

          {/* Visuel + offre */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/recharge-electrique-aeroport-beauvais.png"
                alt="Voiture électrique en recharge pendant son stationnement à l'aéroport de Beauvais avec l'option Free Day Parking Beauvais"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Carte prix */}
            <div className="mt-6 bg-white rounded-2xl border-2 border-green-500 shadow-xl p-6 sm:p-8">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
                Un petit supplément pour partir plus sereinement
              </p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">18 €</span>
                <span className="text-gray-500 mb-1">/ option</span>
              </div>
              <p className="text-gray-600 mb-6">
                Ajoutez cette option directement dans notre formulaire de réservation
                ou sur le simulateur de prix.
              </p>
              <button
                onClick={scrollToBooking}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
              >
                Réserver avec recharge électrique
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Vous organisez votre voyage, nous vous aidons à anticiper le retour
                de votre véhicule électrique.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Appel à l'action final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Partez en voyage sans oublier votre autonomie au retour.
          </h3>
          <p className="text-gray-600 mb-6">
            Réservez votre stationnement et sélectionnez l'option de recharge électrique.
          </p>
          <button
            onClick={scrollToBooking}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Accéder au formulaire de réservation
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export { EvCharging };

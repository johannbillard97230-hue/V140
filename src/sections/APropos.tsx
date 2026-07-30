import { motion } from 'framer-motion';
import { Car, Shield, Leaf, Heart, Zap, Users, Phone, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function APropos() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const scrollToBooking = () => {
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="apropos" 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Car className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              À propos
            </span>{' '}
            de FreeDayParkingBeauvais
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bienvenue chez FreeDayParkingBeauvais, où nous rendons votre voyage plus serein depuis l'aéroport de Beauvais.
          </p>
        </motion.div>

        {/* Notre Histoire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Notre Histoire</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-900">FreeDayParkingBeauvais</strong> est née en <strong className="text-gray-900">mars 2025</strong>, fruit de la réflexion de son fondateur, <strong className="text-gray-900">Johann Billard</strong>. Après avoir constaté à quel point le stationnement à l'aéroport de Beauvais-Tillé pouvait être coûteux et stressant pour les voyageurs, Johann a eu une vision claire : créer une alternative abordable, sécurisée et écoresponsable.
            </p>
            <p>
              Né de l'envie de se dépasser personnellement et de ne plus vendre sa force vitale pour réaliser le rêve d'un autre, FreeDayParkingBeauvais s'est donnée pour mission de transformer l'expérience de stationnement aéroportuaire. Notre entreprise se consacre à offrir à chaque voyageur un service fiable, transparent et à taille humaine.
            </p>
            <p>
              Depuis nos débuts, nous avons déjà accueilli des centaines de voyageurs, cumulé <strong className="text-gray-900">86 avis 5 étoiles sur 89 sur Google</strong>, et fait la preuve qu'un parking aéroport peut être à la fois économique et de qualité.
            </p>
          </div>
        </motion.div>

        {/* Notre Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Notre Mission</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            Notre mission est de fournir une solution de stationnement complète et pratique pour les voyageurs de l'aéroport de Beauvais-Tillé. Nous proposons un parking sécurisé, clos et surveillé, accompagné d'une <strong className="text-gray-900">navette 100% électrique gratuite</strong> (pour 7 jours ou plus) qui vous dépose directement au dépose minute de l'aéroport en seulement 12 minutes.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Le but est de réduire le stress du voyage et de fournir aux voyageurs un environnement sûr pour garer leur véhicule avant de s'envoler vers leurs destinations, tout en réalisant des économies substantielles par rapport aux parkings officiels (jusqu'à <strong className="text-gray-900">70% d'économies</strong>).
          </p>
        </motion.div>

        {/* Nos Valeurs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">Nos Valeurs</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { 
                icon: Shield, 
                title: 'Sécurité',
                desc: 'Parking clos, portail électrique, caméras de surveillance et photos de votre véhicule sur demande.'
              },
              { 
                icon: Leaf, 
                title: 'Écoresponsabilité',
                desc: 'Navette 100% électrique, entreprise locale à taille humaine, engagement pour réduire notre empreinte carbone.'
              },
              { 
                icon: Heart, 
                title: 'Service personnalisé',
                desc: 'À votre écoute, aide avec les valises, accueil chaleureux. Chaque client est unique.'
              },
              { 
                icon: Users, 
                title: 'Transparence',
                desc: 'Tarifs clairs, pas de frais cachés. Ce que vous voyez est ce que vous payez.'
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Johann Billard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-40 md:w-40 md:h-52 rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/30 flex-shrink-0">
              <img 
                src="/johann-final.png" 
                alt="Johann Billard, fondateur de FreeDayParkingBeauvais" 
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Johann Billard</h2>
              <p className="text-purple-400 font-medium mb-4">Fondateur de FreeDayParkingBeauvais</p>
              <div className="space-y-3 text-gray-300 leading-relaxed">
                <p>
                  Je suis Johann Billard, le fondateur de FreeDayParkingBeauvais. Mon parcours personnel m'a incité à créer ce service, destiné à aider ceux qui, comme moi, ont envie de se libérer des contraintes et de créer leur propre voie.
                </p>
                <p>
                  Dès mon plus jeune âge, j'ai toujours ressenti cette différence qui me poussait à trouver des solutions alternatives face aux difficultés. C'est vraiment génial de voir comment l'auto-apprentissage peut façonner une personne et influencer sa façon de voir le monde.
                </p>
                <p>
                  Cette passion pour apprendre et partager son savoir est précieuse, car elle permet non seulement de s'enrichir personnellement, mais aussi d'inspirer et d'aider les autres à grandir. Si vous faites de vos passions des sources de revenus, alors ce n'est plus du travail.
                </p>
                <p>
                  Si vous vous retrouvez dans ce que je viens de dire, alors vous êtes conscient de votre valeur, prêt à sortir de votre zone de confort, à vivre votre vie selon vos règles, et surtout sans tenir compte de ce que pensent les autres sur la manière de la vivre.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: 'Mars 2025', label: 'Date de création' },
            { value: '86', label: 'avis 5 étoiles Google' },
            { value: '70%', label: "d'économies vs officiel" },
            { value: '12 min', label: 'de navette aéroport' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-white"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Prêt à voyager l'esprit tranquille ?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Rejoignez les centaines de voyageurs qui nous font confiance. Réservez votre place de parking à l'aéroport de Beauvais dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToBooking}
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 shadow-lg"
            >
              Réserver ma place
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              onClick={() => window.open('https://wa.me/33689826515', '_blank')}
              className="bg-white text-slate-900 hover:bg-gray-100 shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Me contacter sur WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

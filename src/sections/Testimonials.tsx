import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Quote, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const googleMapsUrl = "https://www.google.com/maps/place/FreeDayParkingBeauvais+(17+%E2%82%AC+pour+7+jours+avec+navette+aller+%2F+retour)/@49.42919,2.05781,6729m/data=!3m1!1e3!4m8!3m7!1s0x47e7011af3fc9665:0xd51e7841cd21f3fc!8m2!3d49.4213796!4d2.0739166!9m1!1b1!16s%2Fg%2F11yh0xb2gn?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D";

interface TestimonialData {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: 'Malorie Duchemin',
    rating: 5,
    comment: "Nous avons stationné notre voiture pendant 12 jours. Tout c'est très bien passé. Nous avons été accueillis avec le sourire et attention. Puis conduit à l'aéroport dans la bonne humeur. Le concept est super. Les prix sont moins cher que les concurrents pour un service de meilleur qualité en plus. Merci pour tout. Nous reviendrons sans hésiter lors de notre prochain vol au départ de Beauvais.",
    date: 'Août 2026',
    verified: true,
  },
  {
    id: 2,
    name: 'JAMILA BENZIANE',
    rating: 5,
    comment: "Je recommande vivement Free Day Parking. La personne a été accueillante et professionnel. Les tarifs sont très corrects et l'emplacement très pratique. Je reviendrai sans hésiter. Merci pour votre service !",
    date: 'Juillet 2026',
    verified: true,
  },
  {
    id: 3,
    name: 'Catherine L',
    rating: 5,
    comment: "Parfait rien à dire super sympa, ponctuel et très professionnel et en plus avec le sourire...",
    date: 'Juillet 2026',
    verified: true,
  },
  {
    id: 4,
    name: 'El Persever',
    rating: 5,
    comment: "Parfait, de la réservation, au départ et au retour, merci Johann !",
    date: 'Juillet 2026',
    verified: true,
  },
  {
    id: 5,
    name: 'Dumitru Breabin',
    rating: 5,
    comment: "Très satisfait du service, je le recommande vivement !",
    date: 'Août 2026',
    verified: true,
  },
  {
    id: 6,
    name: 'Alae-eddine HADDOUTI',
    rating: 5,
    comment: "Très bon prix et excellent service. Je recommande vivement !",
    date: 'Juillet 2026',
    verified: true,
  },
  {
    id: 7,
    name: 'Justine Ameye',
    rating: 5,
    comment: "Excellente expérience avec Freeday Parking ! Le gérant est très accueillant, ponctuel et professionnel. La prise en charge à l'aller comme au retour s'est déroulée rapidement, sans aucune attente. Le parking est sécurisé et le service de navette est très pratique. Tout a été simple et efficace, ce qui permet de partir en voyage l'esprit tranquille. Je recommande sans hésiter et je referai appel à leurs services lors de mon prochain départ.",
    date: 'Juin 2026',
    verified: true,
  },
  {
    id: 8,
    name: 'Tarik Raja',
    rating: 5,
    comment: "J'ai fait énormément de parkings près des aéroports, mais honnêtement, je n'ai jamais vu un service aussi incroyable que celui-ci ! Au début, je vais être honnête, je pensais que ça pouvait être une arnaque tellement les prix sont honnêtes et le fonctionnement paraît simple 😅 Mais absolument pas : c'est fiable à 100 % ! La personne qui s'occupe du service est vraiment hyper gentille, professionnelle et réactive. Tout est rapide, simple et parfaitement organisé. Franchement, c'est un 10/10. En plus, j'avais oublié mon téléphone dans la navette et la personne est venue me le rendre ! Encore un énorme merci pour ça 🙏 Les prix sont vraiment très honnêtes, le service est impeccable et l'accueil au top. Je reviendrai sans hésiter et je recommande ce parking à 100 % !",
    date: 'Septembre 2026',
    verified: true,
  },
  {
    id: 9,
    name: 'Paméla Th',
    rating: 5,
    comment: "Un service irréprochable et humain ! J'ai laissé ma voiture dans ce parking privé et l'expérience a été parfaite du début à la fin. L'accueil est chaleureux et d'une fiabilité totale. Le service de navette est au top et sait s'adapter aux retards de Ryanair. En plus de cette tranquillité d'esprit, le prix est ultra compétitif. Je me suis même dit que Google devrait rajouter des étoiles rien que pour eux, tellement ils le méritent !",
    date: 'Juin 2026',
    verified: true,
  },
];

// Component for individual testimonial card with expand/collapse
function TestimonialCard({ testimonial, index, isVisible }: { testimonial: TestimonialData; index: number; isVisible: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // After mount, check if text exceeds 3 lines
  useState(() => {
    const checkHeight = () => {
      if (textRef.current) {
        const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight) || 24;
        const maxHeight = lineHeight * 3;
        setNeedsExpand(textRef.current.scrollHeight > maxHeight + 2);
      }
    };
    // Small delay to ensure render
    setTimeout(checkHeight, 100);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="h-full"
    >
      <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col">
        {/* Quote icon */}
        <Quote className="w-8 h-8 text-green-200 mb-4 group-hover:text-green-300 transition-colors" />

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
          <span className="ml-2 text-xs font-medium text-gray-400">Google</span>
        </div>

        {/* Comment with expand/collapse */}
        <div className="relative flex-grow">
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? 'max-h-[2000px]' : 'max-h-[4.8em]'
            }`}
          >
            <p
              ref={textRef}
              className="text-gray-700 leading-relaxed text-[15px]"
            >
              {testimonial.comment}
            </p>
          </div>

          {/* Fade gradient when collapsed and text is long */}
          {!isExpanded && needsExpand && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          )}

          {/* Read more / Read less button — only show if text is long */}
          {needsExpand && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1 transition-colors group/btn"
            >
              {isExpanded ? (
                <>
                  Réduire
                  <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5" />
                </>
              ) : (
                <>
                  Lire la suite
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-y-0.5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {testimonial.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{testimonial.name}</p>
            <p className="text-xs text-gray-500">{testimonial.date}</p>
          </div>
          {testimonial.verified && (
            <div className="ml-auto flex items-center gap-1 text-green-600 flex-shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Vérifié</span>
            </div>
          )}
        </div>

        {/* Google link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Voir sur Google
        </a>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30" />

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
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 text-sm font-medium mb-4"
          >
            Avis clients Google
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Ils ont testé{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Free Day Parking Beauvais
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Découvrez les avis de voyageurs qui nous ont fait confiance pour leur{' '}
            <strong className="text-gray-900">parking près de l'aéroport de Beauvais</strong>.
            Navette gratuite, tarifs avantageux et service de qualité pour votre voiture.
          </motion.p>

          {/* Google Rating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-lg"
          >
            {/* Google Logo */}
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-bold text-gray-900">4,9 / 5</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-gray-200" />

            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-gray-900">93 avis 5 étoiles</p>
              <p className="text-sm text-gray-500">sur 96 avis Google</p>
            </div>

            <div className="hidden sm:block w-px h-12 bg-gray-200" />

            <Button
              variant="outline"
              className="rounded-full border-gray-300 hover:border-green-500 hover:text-green-600 transition-all"
              onClick={() => window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Voir tous les avis
            </Button>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* SEO Context - Natural semantic integration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Free Day Parking Beauvais est un{' '}
            <strong className="text-gray-500">parking pas cher aéroport Beauvais</strong>{' '}
            avec navette gratuite aller-retour. Réservez votre place de parking couvert ou extérieur
            près de l'aéroport de Beauvais-Tillé (BVA) et voyagez l'esprit tranquille.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

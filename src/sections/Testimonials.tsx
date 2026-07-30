import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Hichem Yacoubi',
    rating: 5,
    comment: "Super merci beaucoup, loueur sympathiques et à l'écoute de nos demandes je conseille les yeux fermés. Service impeccable et navette très pratique !",
    date: 'Il y a 2 semaines',
  },
  {
    id: 2,
    name: 'Charles Pasqua',
    rating: 5,
    comment: "Superbe expérience très réactif je recommande fortement !! Le prix est imbattable et le service est top. Navette électrique au top !",
    date: 'Il y a 1 mois',
  },
  {
    id: 3,
    name: 'Anthony D.',
    rating: 5,
    comment: "Tout c'est très bien passé et superbe communication avec le loueur. Parking sécurisé et bien organisé. Je reviendrai sans hésiter.",
    date: 'Il y a 3 semaines',
  },
  {
    id: 4,
    name: 'Marie L.',
    rating: 5,
    comment: "Excellent service ! Voiture gardée un mois, aide avec les valises, transfert aller/retour parfait. Le prix est vraiment avantageux comparé aux parkings officiels.",
    date: 'Il y a 2 mois',
  },
  {
    id: 5,
    name: 'Philippe R.',
    rating: 5,
    comment: "Première expérience et certainement pas la dernière ! Accueil chaleureux, parking propre et sécurisé. La navette électrique est un vrai plus.",
    date: 'Il y a 1 mois',
  },
];

// Recent Google reviews bubbles
const googleBubbles = [
  { name: 'Sophie M.', text: 'Parfait ! Navette ponctuelle, parking sécurisé.', time: 'il y a 3 jours' },
  { name: 'Jean-Luc P.', text: 'Top rapport qualité prix, je recommande !', time: 'il y a 5 jours' },
  { name: 'Emma T.', text: 'Excellent service, équipe très sympa.', time: 'il y a 1 semaine' },
  { name: 'Lucas B.', text: 'Voiture en parfait état, rien à redire.', time: 'il y a 1 semaine' },
  { name: 'Inès K.', text: "La navette électrique est géniale !", time: 'il y a 2 semaines' },
  { name: 'Thomas R.', text: 'Parking propre et bien organisé.', time: 'il y a 2 semaines' },
  { name: 'Marion D.', text: 'Super accueil, prix imbattable.', time: 'il y a 3 semaines' },
  { name: 'Nicolas F.', text: 'Je reviendrai sans hésiter !', time: 'il y a 3 semaines' },
];

export function Testimonials() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
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
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ce que disent nos{' '}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              clients
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les avis de voyageurs qui nous ont fait confiance pour leurs départs 
            de l'aéroport de Beauvais.
          </p>
        </motion.div>

        {/* Google Reviews Bubbles Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          {/* Google Rating Header */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://www.google.com/maps/place/FreeDayParkingBeauvais+(17+%E2%82%AC+pour+7+jours+avec+navette+aller+%2F+retour)/@49.42919,2.05781,6729m/data=!3m1!1e3!4m8!3m7!1s0x47e7011af3fc9665:0xd51e7841cd21f3fc!8m2!3d49.4213796!4d2.0739166!9m1!1b1!16s%2Fg%2F11yh0xb2gn?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-gray-700 font-bold">5/5</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-700 font-medium">86 avis 5 étoiles sur 89 avis Google</span>
            </a>
          </div>

          {/* Floating Bubbles */}
          <div className="relative h-64 sm:h-48 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-3">
              {googleBubbles.map((bubble, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={isVisible ? { 
                    opacity: 1, 
                    scale: 1, 
                    y: [0, -8, 0],
                  } : {}}
                  transition={{ 
                    opacity: { duration: 0.5, delay: index * 0.1 },
                    scale: { duration: 0.4, delay: index * 0.1 },
                    y: { 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: index * 0.3,
                      ease: 'easeInOut'
                    }
                  }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 cursor-pointer max-w-[200px]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      {bubble.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{bubble.name}</span>
                    <div className="flex ml-auto">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{bubble.text}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{bubble.time}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative h-[400px] sm:h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 h-full flex flex-col justify-center">
                  <Quote className="w-12 h-12 text-green-200 mb-6" />
                  <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed mb-8">
                    {testimonials[currentIndex].comment}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {testimonials[currentIndex].name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                          {testimonials[currentIndex].date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={prevSlide}
                        className="rounded-full hover:bg-green-50 hover:border-green-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={nextSlide}
                        className="rounded-full hover:bg-green-50 hover:border-green-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-green-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

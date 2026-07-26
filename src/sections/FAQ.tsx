import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { FAQItem } from '@/types';

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'Comment fonctionne la navette électrique ?',
    answer: 'Notre navette 100% électrique vous dépose directement au dépose minute de l\'aéroport de Beauvais en seulement 12 minutes. Elle est incluse gratuitement dans votre réservation de 7 jours ou plus. Notre navette est disponible 24h/24, 7j/7, y compris les jours fériés.',
  },
  {
    id: 2,
    question: 'Comment bénéficier des jours offerts ?',
    answer: 'Vous bénéficiez automatiquement de 1 jour offert pour toute réservation de 7 jours ou plus. En vous inscrivant à notre newsletter, vous recevez 2 jours supplémentaires offerts À VIE sur chaque réservation. Ces offres sont cumulables ! Par exemple, pour 7 jours réservés avec newsletter, vous ne payez que pour 4 jours (soit 25€ au lieu de 43€).',
  },
  {
    id: 3,
    question: 'Le parking est-il sécurisé ?',
    answer: 'Absolument ! Notre parking est entièrement clos et sécurisé avec un portail électrique, une porte sectionnelle pour l\'accès intérieur, et un système de vidéosurveillance. De plus, sur simple demande, nous pouvons vous envoyer des photos de votre véhicule pendant votre absence pour vous garantir une tranquillité totale.',
  },
  {
    id: 4,
    question: 'Quelle est l\'adresse exacte du parking ?',
    answer: 'Notre parking est situé au 8 rue Maurice Segonds, 60000 Beauvais. Il est facilement accessible depuis l\'autoroute A16 (sortie Beauvais Nord). Une fois sur place, notre équipe vous accueille et vous aide à garer votre véhicule avant de vous emmener à l\'aéroport avec notre navette.',
  },
  {
    id: 5,
    question: 'Puis-je annuler ou modifier ma réservation ?',
    answer: 'Oui, vous pouvez annuler gratuitement jusqu\'à 24 heures avant votre arrivée prévue. Pour les modifications (dates, durée, etc.), contactez-nous par téléphone ou email et nous ferons le maximum pour adapter votre réservation selon vos besoins.',
  },
  {
    id: 6,
    question: 'Quels sont les horaires de la navette ?',
    answer: 'Notre navette 100% électrique est disponible 24h/24, 7 jours sur 7, y compris les jours fériés. Quel que soit votre créneau de vol, nous assurons votre transfert vers et depuis l\'aéroport de Beauvais-Tillé à toute heure du jour et de la nuit.',
  },
  {
    id: 7,
    question: 'Proposez-vous des places couvertes ?',
    answer: 'Oui, nous proposons deux options : un parking extérieur économique et un parking intérieur couvert qui protège votre véhicule des intempéries. Le parking intérieur est sécurisé par un portail électrique et une porte sectionnelle.',
  },
  {
    id: 8,
    question: 'Comment fonctionne le service de photos ?',
    answer: 'Sur simple demande lors de votre réservation ou au dépôt de votre véhicule, nous pouvons vous envoyer des photos de votre véhicule pendant votre absence (par email ou SMS). Ce service est gratuit et vous permet de voyager l\'esprit tranquille, en toute confiance.',
  },
];

export function FAQ() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Questions{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              fréquentes
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur notre service de parking 
            à l'aéroport de Beauvais.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${item.id}`}
                  className="bg-white border border-gray-100 rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                      </div>
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4 pl-11">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Vous avez d'autres questions ?</p>
                <p className="text-sm text-gray-300">Notre équipe est là pour vous aider</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-white text-white bg-white/10 hover:bg-white hover:text-slate-900 transition-all"
                onClick={() => window.open('tel:+33689826515')}
              >
                Nous appeler
              </Button>
              <Button
                className="bg-white text-slate-900 hover:bg-gray-100"
                onClick={() => window.open('mailto:contact@freedayparkingbeauvais.com')}
              >
                Envoyer un email
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, ExternalLink, Plane } from 'lucide-react';

const AMAZON_LINK = 'https://link.amazon/B02dbcyhr';

function trackAmazonClick() {
  // Google Analytics 4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'amazon_ryanair_bag_click', {
      event_category: 'affiliation',
      event_label: 'sac_cabine_ryanair',
      value: 1,
    });
  }
  // Fallback: console log for debugging
  // eslint-disable-next-line no-console
  console.log('[Analytics] amazon_ryanair_bag_click');
}

export function AmazonAffiliate() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-8 lg:py-10 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-5">
            {/* Product visual — compact icon representation */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                <Plane className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Conseil voyageur
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">Vous voyagez avec Ryanair ?</span>{' '}
                Préparez aussi votre bagage : découvrez ce sac cabine pratique pour votre prochain départ.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <a
                href={AMAZON_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackAmazonClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
              >
                Voir le sac sur Amazon
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Affiliate disclosure — subtle but visible */}
          <div className="px-4 sm:px-5 pb-3 pt-0">
            <p className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">
              Lien affilié — Free Day Parking Beauvais peut percevoir une commission sur les achats éligibles, sans coût supplémentaire pour vous.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

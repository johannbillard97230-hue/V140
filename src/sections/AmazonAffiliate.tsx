import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Plane } from 'lucide-react';

const AMAZON_LINK = 'https://link.amazon/B02dbcyhr';
const PRODUCT_IMAGE = '/images/sac-cabine-ryanair-amazon.png';

function trackAmazonClick() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'amazon_ryanair_bag_click', {
      event_category: 'affiliation',
      event_label: 'sac_cabine_ryanair',
      value: 1,
    });
  }
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
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5">
            {/* Product image — compact and clean */}
            <div className="flex-shrink-0">
              <a
                href={AMAZON_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackAmazonClick}
                className="block w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 hover:opacity-90 transition-opacity"
              >
                <img
                  src={PRODUCT_IMAGE}
                  alt="Sac cabine 30L compatible Ryanair — 45 x 36 x 20 cm"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </a>
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

          {/* Affiliate disclosure */}
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

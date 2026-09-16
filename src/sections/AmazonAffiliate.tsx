import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Plane, ShoppingBag } from 'lucide-react';

interface AmazonProduct {
  id: string;
  link: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  cta: string;
  eventName: string;
}

const products: AmazonProduct[] = [
  {
    id: 'sac-cabine-30l',
    link: 'https://link.amazon/B02dbcyhr',
    image: '/images/sac-cabine-ryanair-amazon.png',
    alt: 'Sac cabine 30L compatible Ryanair — 45 x 36 x 20 cm — idéal pour parking aéroport Beauvais',
    title: 'Sac cabine 30L',
    description: 'Format cabine approuvé Ryanair. Partez léger depuis le parking de l\'aéroport de Beauvais-Tillé.',
    cta: 'Voir sur Amazon',
    eventName: 'amazon_ryanair_bag_click',
  },
  {
    id: 'sac-ryanair-2',
    link: 'https://link.amazon/B0bzVPFyO',
    image: '/images/sac-ryanair-produit-2.jpg',
    alt: 'Sac de voyage Ryanair recommandé par Free Day Parking Beauvais — parking pas cher aéroport Beauvais',
    title: 'Sac de voyage Ryanair',
    description: 'Pratique et conforme aux dimensions cabine. Le compagnon idéal pour votre prochain départ de Beauvais.',
    cta: 'Voir sur Amazon',
    eventName: 'amazon_ryanair_bag_2_click',
  },
];

function trackAmazonClick(eventName: string, productId: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: 'affiliation',
      event_label: productId,
      value: 1,
    });
  }
}

function ProductCard({ product, index }: { product: AmazonProduct; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5">
        {/* Product image */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAmazonClick(product.eventName, product.id)}
          className="flex-shrink-0 block w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 hover:opacity-90 transition-opacity"
        >
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </a>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold text-gray-900 mb-1">{product.title}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAmazonClick(product.eventName, product.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
          >
            {product.cta}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
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
        {/* Section header — very discreet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 mb-5"
        >
          <ShoppingBag className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Recommandations voyageurs
          </span>
        </motion.div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Affiliate disclosure */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-[10px] sm:text-xs text-gray-400 text-center mt-4"
        >
          Liens affiliés Amazon — Free Day Parking Beauvais peut percevoir une commission sur les achats éligibles,
          sans coût supplémentaire pour vous. Notre priorité reste votre parking pas cher à l'aéroport de Beauvais-Tillé (BVA).
        </motion.p>
      </div>
    </section>
  );
}

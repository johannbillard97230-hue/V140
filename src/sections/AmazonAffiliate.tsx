import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Plane, ShoppingBag } from 'lucide-react';

interface AmazonProduct {
  id: string;
  link: string;
  image: string;
  alt: string;
  title: string;
  description: string;
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
    eventName: 'amazon_ryanair_bag_click',
  },
  {
    id: 'sac-ryanair-2',
    link: 'https://link.amazon/B0bzVPFyO',
    image: '/images/sac-ryanair-produit-2.jpg',
    alt: 'Sac de voyage Ryanair recommandé par Free Day Parking Beauvais — parking pas cher aéroport Beauvais',
    title: 'Sac de voyage Ryanair',
    description: 'Pratique et conforme aux dimensions cabine. Le compagnon idéal pour votre prochain départ de Beauvais.',
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

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
        <ShoppingBag className="w-6 h-6" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

function ProductCard({ product, index }: { product: AmazonProduct; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 + index * 0.08 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="flex items-center gap-3 p-3">
        {/* Compact product image */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAmazonClick(product.eventName, product.id)}
          className="flex-shrink-0 block w-14 h-14 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 hover:opacity-90 transition-opacity"
        >
          <ProductImage src={product.image} alt={product.alt} />
        </a>

        {/* Compact content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-tight">{product.title}</p>
          <p className="text-xs text-gray-500 leading-snug mt-0.5">{product.description}</p>
        </div>

        {/* Compact CTA */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAmazonClick(product.eventName, product.id)}
          className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium transition-colors"
        >
          Amazon
          <ExternalLink className="w-3 h-3" />
        </a>
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
      className="relative py-5 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 mb-3"
        >
          <Plane className="w-3 h-3 text-gray-400" />
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
            Conseils voyageurs
          </span>
        </motion.div>

        {/* Products — horizontal row on desktop */}
        <div className="flex flex-col sm:flex-row gap-3">
          {products.map((product, index) => (
            <div key={product.id} className="flex-1">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Compact affiliate disclosure */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-[10px] text-gray-400 mt-2 leading-tight"
        >
          Liens affiliés — commission possible sans surcoût. Priorité : votre parking pas cher à Beauvais-Tillé (BVA).
        </motion.p>
      </div>
    </section>
  );
}

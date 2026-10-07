import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Youtube } from 'lucide-react';

const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Avantages', href: '#features' },
  { label: 'Nos stationnements', href: '#parking-types' },
  { label: 'Comparatif', href: '#comparison' },
  { label: 'Avis', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const externalLinks = [
  { label: 'YouTube', href: 'https://www.freedayparkingbeauvais.com/youtube-location-parking-beauvais-25-euros-les-7-jours', icon: Youtube },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-2"
            >
              <img
                src="/logo.png"
                alt="Free Day Parking Beauvais"
                className="h-10 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <span className={`font-bold text-lg transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Free Day Parking
                </span>
                <span className={`block text-xs transition-colors ${
                  isScrolled ? 'text-gray-500' : 'text-white/70'
                }`}>
                  Beauvais Aéroport
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`text-sm font-medium transition-all duration-300 hover:opacity-80 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              {externalLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium transition-all duration-300 hover:opacity-80 flex items-center gap-1.5 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+33689826515"
                className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>06 89 82 65 15</span>
              </a>
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#booking');
                }}
                className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Réserver
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-20"
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-lg font-medium text-gray-800 hover:text-parking-blue transition-colors py-3 border-b border-gray-100"
                  >
                    {item.label}
                  </motion.a>
                ))}
                {externalLinks.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + index) * 0.1 }}
                    className="text-lg font-medium text-gray-800 hover:text-parking-blue transition-colors py-3 border-b border-gray-100 flex items-center gap-2"
                  >
                    <item.icon className="w-5 h-5 text-red-600" />
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + externalLinks.length) * 0.1 }}
                  className="pt-4"
                >
                  <a
                    href="tel:+33689826515"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold"
                  >
                    <Phone className="w-5 h-5" />
                    06 89 82 65 15
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

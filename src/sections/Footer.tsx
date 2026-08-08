import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook,
  ExternalLink,
  Shield,
  Star
} from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: 'Accueil', href: '#hero' },
    { label: 'Avantages', href: '#features' },
    { label: 'Comparatif', href: '#comparison' },
    { label: 'Avis clients', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'À propos', href: '/apropos.html' },
  ],
  legal: [
    { label: 'Conditions générales', href: 'https://www.freedayparkingbeauvais.com/conditions-generales' },
    { label: 'Politique de confidentialité', href: 'https://www.freedayparkingbeauvais.com/conditions-generales' },
    { label: 'Mentions légales', href: '/mentions-legales.html' },
  ],
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/logo.png" 
                  alt="Free Day Parking Beauvais" 
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <h3 className="font-bold text-lg">Free Day Parking</h3>
                  <p className="text-sm text-gray-400">Beauvais Aéroport</p>
                  <p className="text-xs text-gray-500 mt-0.5">SASU au capital de 500,00 €</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                L'alternative idéale au parking de l'aéroport de Beauvais. 
                Parking sécurisé avec navette électrique 100% gratuite.
              </p>
              
              {/* Trust badges */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">5/5 sur 86 avis Google</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Navigation</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('/')) {
                          // External page link — let default behavior work
                          return;
                        }
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://maps.google.com/?q=8+Rue+Maurice+Segonds+60000+Beauvais"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>8 Rue Maurice Segonds<br />60000 Beauvais</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33689826515"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>06 89 82 65 15</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@freedayparkingbeauvais.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span>contact@freedayparkingbeauvais.com</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>Navette : 24h/24</p>
                    <p>7j/7 — Jours fériés inclus</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Legal & Social */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Informations</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social */}
              <h4 className="font-semibold text-lg mb-4">Suivez-nous</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/groups/1019670350341451/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Groupe Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@freedayparkingbeauvais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="TikTok"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Free Day Parking Beauvais. Tous droits réservés.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  SASU au capital de 500,00 € — RCS Paris 105 806 368 — Siège : 149 avenue du Maine, 75014 Paris
                </p>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.google.com/maps/place/FreeDayParkingBeauvais+(17+%E2%82%AC+pour+7+jours+avec+navette+aller+%2F+retour)/@49.42919,2.05781,6729m/data=!3m1!1e3!4m8!3m7!1s0x47e7011af3fc9665:0xd51e7841cd21f3fc!8m2!3d49.4213796!4d2.0739166!9m1!1b1!16s%2Fg%2F11yh0xb2gn?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>87 avis 5 étoiles Google</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

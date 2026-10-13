import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  days: number;
  startTime: string;
  endTime: string;
  returnFlightNumber: string;
  travelers: number;
  bags: number;
  licensePlate: string;
  carModel: string;
  billingAddress: string;
  billingPostalCode: string;
  billingCity: string;
  parkingType: string;
  price: number;
  newsletter: boolean;
}

function buildWhatsAppUrl(data: BookingData): string {
  const days = data.days;
  const basePrice = 7 + (days - 1) * 6;

  const lines = [
    'Nouvelle demande de reservation Free Day Parking Beauvais',
    '',
    'Paiement : Confirmé',
    '',
    '--- CLIENT ---',
    'Nom : ' + data.lastName,
    'Prénom : ' + data.firstName,
    'Email : ' + data.email,
    'Téléphone : ' + (data.phone || 'Non renseigné'),
    'Adresse de facturation : ' + data.billingAddress + ', ' + data.billingPostalCode + ' ' + data.billingCity,
    '',
    '--- DATES ---',
    'Dates : ' + data.startDate + ' - ' + data.endDate,
    'Durée : ' + days + ' jours',
    '',
    'Décollage à Beauvais : ' + data.startTime,
    'Atterrissage à Beauvais : ' + data.endTime,
    'Numéro de vol retour : ' + data.returnFlightNumber,
    'Voyageurs : ' + data.travelers,
    'Bagages : ' + data.bags,
    '',
    'Newsletter : ' + (data.newsletter ? 'Oui (-2 jours offerts)' : 'Non'),
    '',
    '--- DÉTAIL DU PRIX ---',
    'Parking (' + days + ' jours) : ' + basePrice + '€',
  ];

  if (days < 7) {
    lines.push('Forfait Parking court séjour (1 à 6 jours) : 10€');
  } else {
    lines.push('Navette aller/retour : Gratuite');
    lines.push('1 jour offert : -6€');
  }

  if (data.newsletter) {
    lines.push('Newsletter (2 jours offerts) : -12€');
  }

  lines.push('');
  lines.push('PRIX TOTAL : ' + data.price + '€');

  const message = encodeURIComponent(lines.join('\n'));
  return 'https://wa.me/33689826515?text=' + message;
}

function buildGenericWhatsAppUrl(): string {
  const message = encodeURIComponent(
    'Bonjour ! Je viens de finaliser ma réservation sur freedayparkingbeauvais.com et je souhaite confirmer les détails avec vous.'
  );
  return 'https://wa.me/33689826515?text=' + message;
}

// Garde anti-rejeu : une seule tentative de redirection automatique par réservation.
// sessionStorage (et non localStorage) : la portée est limitée à l'onglet en cours.
const WA_REDIRECT_FLAG = 'wa_auto_redirect_done';
const AUTO_REDIRECT_DELAY = 6; // secondes affichées avant la tentative automatique

export default function SuccessPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<BookingData | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [countdown, setCountdown] = useState(AUTO_REDIRECT_DELAY);
  const [autoState, setAutoState] = useState<'pending' | 'fired' | 'disabled'>('pending');
  const whatsappUrlRef = useRef('');

  // 1) Chargement des données — bookingData est CONSERVÉ dans localStorage :
  //    le bouton de secours doit rester fonctionnel même si la redirection échoue.
  useEffect(() => {
    const stored = localStorage.getItem('bookingData');
    let url = '';
    if (stored) {
      try {
        const bookingData: BookingData = JSON.parse(stored);
        setData(bookingData);
        url = buildWhatsAppUrl(bookingData);
        console.info('[FDP-SUCCESS] réservation chargée et URL WhatsApp générée');
      } catch (error) {
        console.error('[FDP-SUCCESS] données de réservation illisibles, URL générique utilisée', error);
        url = buildGenericWhatsAppUrl();
      }
    } else {
      console.info('[FDP-SUCCESS] aucune donnée localStorage, URL générique utilisée');
      url = buildGenericWhatsAppUrl();
    }
    whatsappUrlRef.current = url;
    setDataLoaded(true);
  }, []);

  // 2) Redirection automatique différée, une seule fois, historique préservé.
  //    window.location.href (et non replace) : si la redirection est bloquée,
  //    le bouton "retour" du navigateur ramène sur cette page avec le bouton de secours.
  useEffect(() => {
    let alreadyAttempted = false;
    try {
      alreadyAttempted = sessionStorage.getItem(WA_REDIRECT_FLAG) === '1';
    } catch { /* sessionStorage indisponible : on tente quand même, une fois */ }

    if (alreadyAttempted) {
      setAutoState('disabled');
      console.info('[FDP-SUCCESS] redirection auto déjà tentée sur cette réservation — bouton de secours uniquement');
      return;
    }
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    try {
      sessionStorage.setItem(WA_REDIRECT_FLAG, '1');
    } catch { /* ignore */ }
    setAutoState('fired');
    // Une TENTATIVE de redirection : le navigateur ne confirme jamais l'ouverture réelle de WhatsApp.
    console.info('[FDP-SUCCESS] tentative de redirection automatique WhatsApp');
    window.location.href = whatsappUrlRef.current || buildGenericWhatsAppUrl();
  }, [countdown]);

  // 3) Bouton de secours : interaction directe = contourne les bloqueurs de redirection.
  const handleOpenWhatsApp = () => {
    try {
      sessionStorage.setItem(WA_REDIRECT_FLAG, '1');
    } catch { /* ignore */ }
    console.info('[FDP-SUCCESS] ouverture WhatsApp via bouton (geste utilisateur)');
    window.location.href = whatsappUrlRef.current || buildGenericWhatsAppUrl();
  };

  const handleGoHome = () => {
    // Nettoyage uniquement sur action explicite de l'utilisateur
    try {
      localStorage.removeItem('bookingData');
      sessionStorage.removeItem(WA_REDIRECT_FLAG);
    } catch { /* ignore */ }
    navigate('/');
  };

  // Page de secours si aucune donnée (visite directe, données perdues) :
  // jamais d'éjection silencieuse, jamais de faux récapitulatif.
  if (dataLoaded && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Merci !</h1>
          <p className="text-lg text-gray-600 mb-6">
            Si vous venez de réserver, votre paiement est confirmé. Confirmez votre réservation
            sur WhatsApp pour recevoir les détails pratiques.
          </p>
          <motion.button
            onClick={handleOpenWhatsApp}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Confirmer ma réservation sur WhatsApp
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <button
            onClick={handleGoHome}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  if (!dataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-14 h-14 text-green-600" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Merci ! Votre reservation est confirmée.
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          Votre paiement de <strong className="text-green-600">{data.price} €</strong> a été reçu.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-left mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Client</span>
              <span className="font-medium">{data.firstName} {data.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dates</span>
              <span className="font-medium">{data.startDate} - {data.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Durée</span>
              <span className="font-medium">{data.days} jours</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="text-gray-900 font-semibold">Montant payé</span>
              <span className="text-green-600 font-bold">{data.price} €</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <p className="text-gray-500 text-sm" aria-live="polite">
            {autoState === 'pending' && countdown > 0 && (
              <>Ouverture automatique de WhatsApp dans <strong>{countdown} s</strong>…</>
            )}
            {autoState === 'fired' && (
              <>Si WhatsApp ne s'est pas ouvert, utilisez le bouton ci-dessous.</>
            )}
            {autoState === 'disabled' && (
              <>Cliquez sur le bouton ci-dessous pour ouvrir WhatsApp.</>
            )}
          </p>

          <motion.button
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            onClick={handleOpenWhatsApp}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Confirmer ma réservation sur WhatsApp
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <p className="text-xs text-gray-400">
            Votre réservation reste confirmée même si WhatsApp ne s'ouvre pas.
          </p>

          <button
            onClick={handleGoHome}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

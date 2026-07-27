import { useEffect, useState } from 'react';
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
    'Paiement : Confirme',
    '',
    '--- CLIENT ---',
    'Nom : ' + data.lastName,
    'Prenom : ' + data.firstName,
    'Email : ' + data.email,
    'Telephone : ' + (data.phone || 'Non renseigne'),
    'Adresse de facturation : ' + data.billingAddress + ', ' + data.billingPostalCode + ' ' + data.billingCity,
    '',
    '--- VEHICULE ---',
    'Modele : ' + (data.carModel || 'Non renseigne'),
    'Immatriculation : ' + (data.licensePlate || 'Non renseignee'),
    'Type de parking : ' + (data.parkingType === 'indoor' ? 'Couvert' : 'Exterieur'),
    '',
    '--- DATES ---',
    'Dates : ' + data.startDate + ' - ' + data.endDate,
    'Duree : ' + days + ' jours',
    '',
    'Decollage a Beauvais : ' + data.startTime,
    'Atterrissage a Beauvais : ' + data.endTime,
    'Voyageurs : ' + data.travelers,
    'Bagages : ' + data.bags,
    '',
    'Newsletter : ' + (data.newsletter ? 'Oui (-2 jours offerts)' : 'Non'),
    '',
    '--- DETAIL DU PRIX ---',
    'Parking (' + days + ' jours) : ' + basePrice + '€',
  ];

  if (days < 7) {
    lines.push('Navette aller/retour : 10€');
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

export default function SuccessPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<BookingData | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [alreadyProcessed, setAlreadyProcessed] = useState(false);

  useEffect(() => {
    const processed = localStorage.getItem('paymentProcessed');
    if (processed === 'true') {
      setAlreadyProcessed(true);
      localStorage.removeItem('paymentProcessed');
      return;
    }

    const stored = localStorage.getItem('bookingData');
    if (!stored) {
      setAlreadyProcessed(true);
      return;
    }

    const bookingData: BookingData = JSON.parse(stored);
    setData(bookingData);

    const url = buildWhatsAppUrl(bookingData);
    setWhatsappUrl(url);

    // SUPPRESSION immediate des donnees pour eviter la double redirection
    localStorage.setItem('paymentProcessed', 'true');
    localStorage.removeItem('bookingData');

    // Redirection immediate vers WhatsApp
    window.location.href = url;
  }, [navigate]);

  const handleOpenWhatsApp = () => {
    if (whatsappUrl) {
      window.location.href = whatsappUrl;
    }
  };

  const handleBackHome = () => {
    localStorage.removeItem('paymentProcessed');
    navigate('/');
  };

  // Si le client revient avec "page precedente" : message simple
  if (alreadyProcessed) {
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
            Merci ! Votre reservation est confirmee.
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Votre paiement a ete recu. Une conversation WhatsApp a ete ouverte avec le loueur.
          </p>

          <button
            onClick={handleBackHome}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Retour a l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  if (!data) {
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
          Merci ! Votre reservation est confirmee.
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          Votre paiement de <strong className="text-green-600">{data.price} €</strong> a ete recu.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-left mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recapitulatif</h2>
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
              <span className="text-gray-500">Duree</span>
              <span className="font-medium">{data.days} jours</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="text-gray-900 font-semibold">Montant paye</span>
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
          <p className="text-gray-500 text-sm">
            Vous allez etre redirige vers WhatsApp...
          </p>

          <motion.button
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            onClick={handleOpenWhatsApp}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Ouvrir WhatsApp
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <button
            onClick={handleBackHome}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Retour a l'accueil
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
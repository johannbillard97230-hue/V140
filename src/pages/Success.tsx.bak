import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle } from 'lucide-react';
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

export default function SuccessPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<BookingData | null>(null);
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bookingData');
    if (!stored) {
      navigate('/');
      return;
    }
    const bookingData: BookingData = JSON.parse(stored);
    setData(bookingData);

    // Open WhatsApp after 3 seconds
    const timer = setTimeout(() => {
      if (!whatsappOpened) {
        setWhatsappOpened(true);

        const days = bookingData.days;
        const basePrice = 7 + (days - 1) * 6;

        const lines = [
          'Nouvelle demande de réservation Free Day Parking Beauvais',
          '',
          '✅ Paiement : Confirmé',
          '',
          '--- CLIENT ---',
          'Nom : ' + bookingData.lastName,
          'Prénom : ' + bookingData.firstName,
          'Email : ' + bookingData.email,
          'Téléphone : ' + (bookingData.phone || 'Non renseigné'),
          'Adresse de facturation : ' + bookingData.billingAddress + ', ' + bookingData.billingPostalCode + ' ' + bookingData.billingCity,
          '',
          '--- VÉHICULE ---',
          'Modèle : ' + (bookingData.carModel || 'Non renseigné'),
          'Immatriculation : ' + (bookingData.licensePlate || 'Non renseignée'),
          'Type de parking : ' + (bookingData.parkingType === 'indoor' ? 'Couvert' : 'Extérieur'),
          '',
          '--- DATES ---',
          'Dates : ' + bookingData.startDate + ' - ' + bookingData.endDate,
          'Durée : ' + days + ' jours',
          '',
          'Décollage à Beauvais : ' + bookingData.startTime,
          'Atterrissage à Beauvais : ' + bookingData.endTime,
          'Voyageurs : ' + bookingData.travelers,
          'Bagages : ' + bookingData.bags,
          '',
          'Newsletter : ' + (bookingData.newsletter ? 'Oui (-2 jours offerts)' : 'Non'),
          '',
          '--- DÉTAIL DU PRIX ---',
          'Parking (' + days + ' jours) : ' + basePrice + '€',
        ];

        if (days < 7) {
          lines.push('Navette aller/retour : 10€');
        } else {
          lines.push('Navette aller/retour : Gratuite');
          lines.push('1 jour offert : -6€');
        }

        if (bookingData.newsletter) {
          lines.push('Newsletter (2 jours offerts) : -12€');
        }

        lines.push('');
        lines.push('PRIX TOTAL : ' + bookingData.price + '€');

        const message = encodeURIComponent(lines.join('\n'));
try {
  window.top.location.href = 'https://wa.me/33689826515?text=' + message;
} catch (e) {
  window.location.href = 'https://wa.me/33689826515?text=' + message;
}      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, whatsappOpened]);

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
          Merci ! Votre réservation est confirmée.
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
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <p>Une conversation WhatsApp va s'ouvrir pour finaliser votre réservation.</p>
          </div>

          {!whatsappOpened && (
            <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mx-auto" />
          )}

          {whatsappOpened && (
            <p className="text-green-600 text-sm font-medium">
              WhatsApp ouvert !
            </p>
          )}

          <button
            onClick={() => navigate('/')}
            className="mt-6 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

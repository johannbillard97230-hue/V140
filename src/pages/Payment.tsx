import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, ArrowLeft, Calendar, User, MapPin, Clock, Luggage, Loader2 } from 'lucide-react';

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

// API endpoint — Netlify Function
const API_URL = '/api/create-payment';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('bookingData');
    if (!stored) {
      navigate('/');
      return;
    }
    setData(JSON.parse(stored));
  }, [navigate]);

  const handlePay = async () => {
    if (!data) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: {
            currency: 'EUR',
            value: data.price.toFixed(2),
          },
          description: `Parking Beauvais - ${data.firstName} ${data.lastName} - ${data.days} jours`,
          metadata: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            startDate: data.startDate,
            endDate: data.endDate,
            days: data.days,
            startTime: data.startTime,
            endTime: data.endTime,
            travelers: data.travelers,
            bags: data.bags,
            billingAddress: data.billingAddress,
            billingPostalCode: data.billingPostalCode,
            billingCity: data.billingCity,
            price: data.price,
          },
        }),
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (!response.ok) {
        throw new Error(result.error + (result.field ? ` (field: ${result.field})` : ''));
      }

      if (result.checkoutUrl) {
        localStorage.setItem('paymentId', result.paymentId);
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error('URL de paiement manquante');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Erreur de connexion');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-500" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-6">
        <div className="max-w-2xl mx-auto px-4 flex items-center gap-3">
          <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Paiement de votre réservation</h1>
            <p className="text-sm text-white/70">Free Day Parking Beauvais</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Price Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-6 shadow-lg"
        >
          <p className="text-sm font-medium text-green-100 mb-1">Montant à payer</p>
          <p className="text-4xl font-bold">{data.price} €</p>
          <p className="text-sm text-green-100 mt-2">{data.days} jours de parking</p>
        </motion.div>

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{data.firstName} {data.lastName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{data.startDate} → {data.endDate} ({data.days} jours)</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Décollage {data.startTime} / Atterrissage {data.endTime}</span>
            </div>
            <div className="flex items-center gap-3">
              <Luggage className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{data.travelers} voyageur(s), {data.bags} bagage(s)</span>
            </div>
            {data.licensePlate && (
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{data.carModel} — {data.licensePlate}</span>
              </div>
            )}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Adresse de facturation</span>
              <span className="text-gray-700 text-right">{data.billingAddress}, {data.billingPostalCode} {data.billingCity}</span>
            </div>
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Payment Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Redirection vers Mollie...
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6" />
                Payer {data.price} € avec Mollie
              </>
            )}
          </button>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 py-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              Paiement sécurisé SSL
            </span>
            <span>PCI-DSS</span>
            <span>3D Secure</span>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-xs text-gray-400 space-y-1"
        >
          <p>Vous allez être redirigé vers Mollie, notre partenaire de paiement sécurisé.</p>
          <p>Aucune donnée bancaire n'est traitée sur ce site.</p>
        </motion.div>
      </div>
    </div>
  );
}

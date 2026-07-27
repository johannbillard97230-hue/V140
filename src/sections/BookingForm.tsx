import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Mail, 
  Check,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModernCalendar } from '@/components/ui/modern-calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimePicker } from '@/components/ui/time-picker';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useNavigate } from 'react-router-dom';
import type { BookingFormData } from '@/types';

const steps = [
  { id: 1, title: 'Dates', icon: Calendar },
  { id: 2, title: 'Contact', icon: Mail },
  { id: 3, title: 'Confirmation', icon: Check },
];

export function BookingForm() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licensePlate: '',
    carModel: '',
    startDate: null,
    endDate: null,
    startTime: '06:00',
    endTime: '18:00',
    parkingType: 'outdoor',
    newsletter: false,
    specialRequests: '',
    billingAddress: '',
    billingPostalCode: '',
    billingCity: '',
    travelers: 1,
    bags: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est obligatoire';
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est obligatoire';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    if (!formData.billingAddress.trim()) newErrors.billingAddress = 'L\'adresse de facturation est obligatoire';
    if (!formData.billingPostalCode.trim()) newErrors.billingPostalCode = 'Le code postal est obligatoire';
    if (!formData.billingCity.trim()) newErrors.billingCity = 'La ville est obligatoire';
    if (formData.travelers < 1) newErrors.travelers = 'Le nombre de voyageurs est obligatoire';
    if (formData.bags < 0) newErrors.bags = 'Le nombre de bagages est invalide';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const diff = formData.endDate.getTime() - formData.startDate.getTime();
    // +1 to count inclusively (e.g., 17th to 23rd = 7 days)
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const calculatePrice = () => {
    const days = calculateDays();
    if (days <= 0) return 0;
    
    let price = 7 + (days - 1) * 6;
    
    // Shuttle fee: 10€ for less than 7 days
    if (days < 7) {
      price += 10;
    }
    
    // Apply discounts
    if (days >= 7) {
      price -= 6; // 1 day free (6€)
    }
    if (formData.newsletter) {
      price -= 12; // Newsletter: -2 days (-12€) regardless of duration
    }
    
    return Math.max(price, 0);
  };

  const nextStep = () => {
    if (currentStep === 2 && !validateStep2()) {
      return; // Block navigation if validation fails
    }
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const days = calculateDays();
    const price = calculatePrice();

    // Store booking data in localStorage for the payment page
    const bookingData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      licensePlate: formData.licensePlate,
      carModel: formData.carModel,
      startDate: formData.startDate ? format(formData.startDate, 'dd/MM/yyyy') : '',
      endDate: formData.endDate ? format(formData.endDate, 'dd/MM/yyyy') : '',
      days,
      startTime: formData.startTime,
      endTime: formData.endTime,
      travelers: formData.travelers,
      bags: formData.bags,
      billingAddress: formData.billingAddress,
      billingPostalCode: formData.billingPostalCode,
      billingCity: formData.billingCity,
      parkingType: formData.parkingType,
      price,
      newsletter: formData.newsletter,
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    localStorage.removeItem('paymentInitiated');

    // Redirect to payment page
    navigate('/payment');
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        const dateRange = formData.startDate 
          ? { from: formData.startDate, to: formData.endDate || undefined }
          : { from: undefined, to: undefined };
        
        return (
          <div className="space-y-6">
            {/* Calendrier dans un popover */}
            <div>
              <Label className="text-gray-700 mb-3 block">Sélectionnez vos dates</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left font-normal h-12 px-4"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formData.startDate && formData.endDate ? (
                        <span className="text-gray-900">
                          Du {format(formData.startDate, 'dd/MM/yyyy')} au {format(formData.endDate, 'dd/MM/yyyy')} ({calculateDays()} jours)
                        </span>
                      ) : formData.startDate ? (
                        <span className="text-gray-900">
                          Départ : {format(formData.startDate, 'dd/MM/yyyy')} — Sélectionnez le retour
                        </span>
                      ) : (
                        <span className="text-gray-400">Cliquez pour choisir vos dates de parking</span>
                      )}
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none shadow-2xl" align="center">
                  <ModernCalendar
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range?.from) {
                        updateFormData('startDate', range.from);
                      } else {
                        updateFormData('startDate', null);
                      }
                      if (range?.to) {
                        updateFormData('endDate', range.to);
                        setIsCalendarOpen(false);
                      } else {
                        updateFormData('endDate', null);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Flight times */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 mb-2 block">Heure de décollage à Beauvais</Label>
                <TimePicker
                  value={formData.startTime}
                  onChange={(value) => updateFormData('startTime', value)}
                />
                <p className="text-xs text-gray-500 mt-1">Heure de départ de l'aéroport Beauvais</p>
              </div>
              <div>
                <Label className="text-gray-700 mb-2 block">Heure d'atterrissage à Beauvais</Label>
                <TimePicker
                  value={formData.endTime}
                  onChange={(value) => updateFormData('endTime', value)}
                />
                <p className="text-xs text-gray-500 mt-1">Heure d'arrivée à l'aéroport Beauvais</p>
              </div>
            </div>

            {/* Travelers and Bags */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 mb-2 block">
                  Nombre de voyageurs <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateFormData('travelers', Math.max(1, formData.travelers - 1))}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700 transition-colors select-none"
                  >
                    -
                  </button>
                  <div className={`flex-1 h-12 rounded-xl border flex items-center justify-center text-lg font-semibold ${errors.travelers ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}>
                    {formData.travelers}
                  </div>
                  <button
                    type="button"
                    onClick={() => updateFormData('travelers', Math.min(20, formData.travelers + 1))}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700 transition-colors select-none"
                  >
                    +
                  </button>
                </div>
                {errors.travelers && <p className="text-red-500 text-xs mt-1">{errors.travelers}</p>}
              </div>
              <div>
                <Label className="text-gray-700 mb-2 block">
                  Nombre de bagages <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateFormData('bags', Math.max(0, formData.bags - 1))}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700 transition-colors select-none"
                  >
                    -
                  </button>
                  <div className={`flex-1 h-12 rounded-xl border flex items-center justify-center text-lg font-semibold ${errors.bags ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}>
                    {formData.bags}
                  </div>
                  <button
                    type="button"
                    onClick={() => updateFormData('bags', Math.min(50, formData.bags + 1))}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700 transition-colors select-none"
                  >
                    +
                  </button>
                </div>
                {errors.bags && <p className="text-red-500 text-xs mt-1">{errors.bags}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            {/* Nom et Prénom */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 mb-2 block">
                  Nom <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <Label className="text-gray-700 mb-2 block">
                  Prénom <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label className="text-gray-700 mb-2 block">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

{/* Téléphone */}
<div>
  <Label className="text-gray-700 mb-2 block">
    Téléphone <span className="text-red-500">*</span>
  </Label>
  <Input
    type="tel"
    placeholder="06 12 34 56 78"
    value={formData.phone}
    onChange={(e) => updateFormData('phone', e.target.value)}
    className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}
  />
  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
</div>

            {/* Adresse de facturation */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                Adresse de facturation <span className="text-red-500">*</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="Adresse"
                    value={formData.billingAddress}
                    onChange={(e) => updateFormData('billingAddress', e.target.value)}
                    className={errors.billingAddress ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {errors.billingAddress && <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Input
                      placeholder="Code postal"
                      value={formData.billingPostalCode}
                      onChange={(e) => updateFormData('billingPostalCode', e.target.value)}
                      className={errors.billingPostalCode ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    {errors.billingPostalCode && <p className="text-red-500 text-xs mt-1">{errors.billingPostalCode}</p>}
                  </div>
                  <div>
                    <Input
                      placeholder="Ville"
                      value={formData.billingCity}
                      onChange={(e) => updateFormData('billingCity', e.target.value)}
                      className={errors.billingCity ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    {errors.billingCity && <p className="text-red-500 text-xs mt-1">{errors.billingCity}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Newsletter</p>
                  <p className="text-sm text-gray-600">+2 jours offerts à vie sur chaque réservation</p>
                </div>
              </div>
              <Switch
                checked={formData.newsletter}
                onCheckedChange={(checked) => updateFormData('newsletter', checked)}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        );

      case 3:
        const days = calculateDays();
        const price = calculatePrice();
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Récapitulatif de votre réservation</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Dates</span>
                <span className="font-medium">
                  {formData.startDate && format(formData.startDate, 'dd/MM/yyyy')} - {formData.endDate && format(formData.endDate, 'dd/MM/yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Durée</span>
                <span className="font-medium">{days} jours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Décollage</span>
                <span className="font-medium">{formData.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Atterrissage</span>
                <span className="font-medium">{formData.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Voyageurs</span>
                <span className="font-medium">{formData.travelers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bagages</span>
                <span className="font-medium">{formData.bags}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Client</p>
                <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                <p className="text-sm text-gray-600">{formData.email}</p>
              </div>
              <div className="pt-1">
                <p className="text-sm font-medium text-gray-900 mb-1">Adresse de facturation</p>
                <p className="text-sm text-gray-600">{formData.billingAddress}</p>
                <p className="text-sm text-gray-600">{formData.billingPostalCode} {formData.billingCity}</p>
              </div>
              
              {/* Détail des prix */}
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Parking ({days} jours)</span>
                  <span className="text-gray-700">{7 + (days - 1) * 6}€</span>
                </div>
                {days < 7 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Navette aller/retour</span>
                    <span className="text-gray-700">10€</span>
                  </div>
                )}
                {days >= 7 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Navette aller/retour</span>
                    <span className="text-green-600 font-medium">Gratuite</span>
                  </div>
                )}
                {days >= 7 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">1 jour offert</span>
                    <span className="text-green-600">-6€</span>
                  </div>
                )}
                {formData.newsletter && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Newsletter (2 jours offerts)</span>
                    <span className="text-green-600">-12€</span>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Prix total</span>
                  <span className="text-3xl font-bold text-green-600">{price}€</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                En confirmant, vous acceptez{' '}
                <a
                  href="https://www.freedayparkingbeauvais.com/conditions-generales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold hover:text-blue-900 transition-colors"
                >
                  nos conditions générales
                </a>.
                Une conversation WhatsApp sera ouverte avec le loueur qui reviendra vers vous dans les plus brefs délais.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      id="booking" 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-medium mb-4">
            Réservation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Réservez votre{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              place de parking
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Réservez en quelques clics et profitez de nos tarifs avantageux avec navette électrique incluse.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Progress Steps */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center ${
                    step.id <= currentStep ? 'text-white' : 'text-gray-500'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step.id < currentStep 
                        ? 'bg-green-500' 
                        : step.id === currentStep 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                          : 'bg-gray-700'
                    }`}>
                      {step.id < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 transition-all ${
                      step.id < currentStep ? 'bg-green-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={currentStep === 1 ? 'invisible' : ''}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              
              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  Continuer
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                >
                  Confirmer la réservation
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid sm:grid-cols-3 gap-4 mt-8"
        >
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Adresse</p>
              <p className="text-sm text-gray-500">8 Rue Maurice Segonds, Beauvais</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Annulation</p>
              <p className="text-sm text-gray-500">Gratuite 24h avant</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Navette</p>
              <p className="text-sm text-gray-500">100% électrique</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

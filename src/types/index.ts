// Types for Free Day Parking Beauvais

export interface PricingCalculation {
  days: number;
  basePrice: number;
  discountDays: number;
  discountAmount: number;
  newsletterDiscount: boolean;
  finalPrice: number;
  savings: number;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface ParkingOption {
  id: string;
  name: string;
  price7Days: number;
  freeDays: number;
  finalPrice: number;
  features: string[];
  highlighted?: boolean;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licensePlate: string;
  carModel: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  parkingType: 'indoor' | 'outdoor';
  newsletter: boolean;
  specialRequests?: string;
  billingAddress: string;
  billingPostalCode: string;
  billingCity: string;
  travelers: number;
  bags: number;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

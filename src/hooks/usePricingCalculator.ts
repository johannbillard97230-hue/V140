import { useState, useCallback, useMemo } from 'react';
import type { PricingCalculation } from '@/types';

const DAILY_RATE_FIRST = 7;
const DAILY_RATE_ADDITIONAL = 6;

export function usePricingCalculator() {
  const [days, setDays] = useState<number>(7);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const calculation: PricingCalculation = useMemo(() => {
    const basePrice = days > 0 
      ? DAILY_RATE_FIRST + (days - 1) * DAILY_RATE_ADDITIONAL 
      : 0;
    
    // Shuttle fee: 10€ for less than 7 days
    const shuttleFee = days < 7 ? 10 : 0;
    
    // 1 day free for 7+ days
    const discountDays = days >= 7 ? 1 : 0;
    // Newsletter: always -2 days (-12€) regardless of duration
    const newsletterDiscountDays = newsletterSubscribed ? 2 : 0;
    
    const totalDiscountDays = discountDays + newsletterDiscountDays;
    const discountAmount = totalDiscountDays * DAILY_RATE_ADDITIONAL;
    
    // First day is 7€, additional days are 6€
    // Discount applies to additional days first
    let finalPrice = basePrice + shuttleFee;
    if (totalDiscountDays > 0) {
      // Remove discount days from the calculation
      const paidDays = Math.max(1, days - totalDiscountDays);
      finalPrice = DAILY_RATE_FIRST + (paidDays - 1) * DAILY_RATE_ADDITIONAL + shuttleFee;
    }
    
    // Calculate savings compared to official parking (average 78€ for 7 days)
    const officialParkingPrice = days <= 7 ? 78 : 78 + (days - 7) * 13;
    const savings = officialParkingPrice - finalPrice;

    return {
      days,
      basePrice,
      discountDays,
      discountAmount,
      newsletterDiscount: newsletterSubscribed,
      finalPrice,
      savings: Math.max(0, savings),
    };
  }, [days, newsletterSubscribed]);

  const incrementDays = useCallback(() => {
    setDays(prev => Math.min(prev + 1, 30));
  }, []);

  const decrementDays = useCallback(() => {
    setDays(prev => Math.max(prev - 1, 1));
  }, []);

  const setExactDays = useCallback((value: number) => {
    setDays(Math.max(1, Math.min(value, 30)));
  }, []);

  const toggleNewsletter = useCallback(() => {
    setNewsletterSubscribed(prev => !prev);
  }, []);

  return {
    days,
    calculation,
    incrementDays,
    decrementDays,
    setExactDays,
    newsletterSubscribed,
    toggleNewsletter,
  };
}

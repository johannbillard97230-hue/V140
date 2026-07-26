import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { getNextAvailableDate, isTodayAvailable, getToday, formatDateFrench, isDateAllowed } from '@/config/availability';

/**
 * Get continuous available ranges across July-August 2026 (min 3 days)
 * Merges ranges that span across month boundaries
 */
function getMergedAvailabilityRanges(): string[] {
  const results: string[] = [];
  const allDates: Date[] = [];
  const monthNames = ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];

  // Collect all available dates from July 1 to August 31, 2026
  for (let month = 6; month <= 7; month++) {
    const daysInMonth = new Date(2026, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(2026, month, d);
      if (isDateAllowed(date)) {
        allDates.push(date);
      }
    }
  }

  if (allDates.length === 0) return results;

  // Helper: get day difference between two dates
  const dayDiff = (a: Date, b: Date) =>
    Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));

  let start = allDates[0];
  let prev = allDates[0];

  for (let i = 1; i <= allDates.length; i++) {
    if (i < allDates.length && dayDiff(allDates[i], prev) === 1) {
      prev = allDates[i];
    } else {
      // Range ended
      const length = dayDiff(prev, start) + 1;
      if (length >= 3) {
        if (start.getMonth() === prev.getMonth()) {
          // Same month
          if (start.getDate() === prev.getDate()) {
            results.push(`${start.getDate()} ${monthNames[start.getMonth()]}`);
          } else {
            results.push(`${start.getDate()}-${prev.getDate()} ${monthNames[start.getMonth()]}`);
          }
        } else {
          // Crosses month boundary
          results.push(`${start.getDate()} ${monthNames[start.getMonth()]} au ${prev.getDate()} ${monthNames[prev.getMonth()]}`);
        }
      }
      if (i < allDates.length) {
        start = allDates[i];
        prev = allDates[i];
      }
    }
  }

  return results;
}

export function Marquee() {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const availabilityRanges = useMemo(() => {
    return getMergedAvailabilityRanges();
  }, []);

  useEffect(() => {
    const updateMessage = () => {
      const todayAvailable = isTodayAvailable();
      const nextDate = getNextAvailableDate();

      if (todayAvailable) {
        setIsOpen(true);
        const today = getToday();
        setMessage(`Place disponible le ${formatDateFrench(today)}`);
      } else {
        setIsOpen(false);
        if (nextDate) {
          setMessage(`Actuellement complet — Prochaine place disponible le ${formatDateFrench(nextDate)}`);
        } else {
          setMessage('Actuellement complet — Nouvelles disponibilités à venir');
        }
      }
    };

    updateMessage();
    const interval = setInterval(updateMessage, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Build the display message with ranges
  const rangesText = availabilityRanges.length > 0
    ? `Plages disponibles : ${availabilityRanges.join(' — ')}`
    : '';

  const displayMessage = rangesText || message;
  void isOpen; // state used for gradient selection
  const gradientClass = 'from-emerald-600 to-green-600';

  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r ${gradientClass} text-white py-2.5 overflow-hidden`}>
      <div className="flex items-center">
        <motion.div
          className="flex items-center gap-4 whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="flex items-center gap-3 px-8">
              <CalendarCheck className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <span className="font-bold text-sm sm:text-base tracking-wide">
                {displayMessage}
              </span>
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex items-center gap-4 whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="flex items-center gap-3 px-8">
              <CalendarCheck className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <span className="font-bold text-sm sm:text-base tracking-wide">
                {displayMessage}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

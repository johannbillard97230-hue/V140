// Availability ranges for the booking calendar and marquee
// All dates use JavaScript Date (month is 0-indexed: 0=January, 5=June, 6=July)

export const juneAllowedRanges = [
  { from: new Date(2026, 5, 4), to: new Date(2026, 5, 7) },
  { from: new Date(2026, 5, 10), to: new Date(2026, 5, 10) },
  { from: new Date(2026, 5, 14), to: new Date(2026, 5, 14) },
  { from: new Date(2026, 5, 16), to: new Date(2026, 5, 16) },
  { from: new Date(2026, 5, 23), to: new Date(2026, 5, 27) },
];

export const julyAllowedRanges = [
  { from: new Date(2026, 6, 3), to: new Date(2026, 6, 3) },
  { from: new Date(2026, 6, 6), to: new Date(2026, 6, 6) },
  { from: new Date(2026, 6, 31), to: new Date(2026, 6, 31) },
];

// August 2026 availability: 1-3, 5, 7-13, 28-31
export const augustAllowedRanges = [
  { from: new Date(2026, 7, 1), to: new Date(2026, 7, 3) },
  { from: new Date(2026, 7, 5), to: new Date(2026, 7, 5) },
  { from: new Date(2026, 7, 7), to: new Date(2026, 7, 13) },
  { from: new Date(2026, 7, 28), to: new Date(2026, 7, 31) },
];

// September 2026 availability: 1, 6-24, 30 (blocks 2-5 and 25-29)
export const septemberAllowedRanges = [
  { from: new Date(2026, 8, 1), to: new Date(2026, 8, 1) },
  { from: new Date(2026, 8, 6), to: new Date(2026, 8, 24) },
  { from: new Date(2026, 8, 30), to: new Date(2026, 8, 30) },
];

export const allAllowedRanges = [
  ...juneAllowedRanges,
  ...julyAllowedRanges,
  ...augustAllowedRanges,
  ...septemberAllowedRanges,
];

/**
 * Check if a specific date is within an allowed range
 */
export function isDateAllowed(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Past dates are always blocked
  if (date < today) return false;

  // June 2026
  if (date.getFullYear() === 2026 && date.getMonth() === 5) {
    return juneAllowedRanges.some((range) => date >= range.from && date <= range.to);
  }

  // July 2026
  if (date.getFullYear() === 2026 && date.getMonth() === 6) {
    return julyAllowedRanges.some((range) => date >= range.from && date <= range.to);
  }

  // August 2026
  if (date.getFullYear() === 2026 && date.getMonth() === 7) {
    return augustAllowedRanges.some((range) => date >= range.from && date <= range.to);
  }

  // September 2026
  if (date.getFullYear() === 2026 && date.getMonth() === 8) {
    return septemberAllowedRanges.some((range) => date >= range.from && date <= range.to);
  }

  // October 2026 and beyond: all dates open
  return true;
}

/**
 * Find the next available date strictly after today
 * Returns the first day > today that is within an allowed range
 */
export function getNextAvailableDate(): Date | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check up to 365 days ahead
  for (let i = 1; i <= 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() + i);
    checkDate.setHours(0, 0, 0, 0);

    if (isDateAllowed(checkDate)) {
      return checkDate;
    }
  }

  return null;
}

/**
 * Check if today itself is available
 */
export function isTodayAvailable(): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return isDateAllowed(today);
}

/**
 * Get today's date
 */
export function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Format a date as "5 juin 2026" in French
 */
export function formatDateFrench(date: Date): string {
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

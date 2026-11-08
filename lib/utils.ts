import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Deterministically formats dates using UTC values to eliminate SSR and client
 * timezone and locale hydration mismatches.
 */
export function formatDate(
  dateInput?: string | number | Date | null,
  format: 'short' | 'long' | 'gb' = 'short'
): string {
  if (!dateInput) return 'Undated';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return 'Undated';

  const day = d.getUTCDate();
  const monthIdx = d.getUTCMonth();
  const year = d.getUTCFullYear();

  if (format === 'long') {
    return `${LONG_MONTHS[monthIdx]} ${day}, ${year}`;
  }
  if (format === 'gb') {
    return `${day} ${LONG_MONTHS[monthIdx]} ${year}`;
  }
  return `${SHORT_MONTHS[monthIdx]} ${day}, ${year}`;
}

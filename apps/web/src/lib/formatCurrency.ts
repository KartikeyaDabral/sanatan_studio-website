// ============================================================
// Utility: Currency formatting
// ============================================================

import type { Currency } from '@sanatan/types';

const CURRENCY_CONFIG: Record<Currency, { locale: string; symbol: string }> = {
  INR: { locale: 'en-IN', symbol: '₹' },
  USD: { locale: 'en-US', symbol: '$' },
  EUR: { locale: 'de-DE', symbol: '€' },
  GBP: { locale: 'en-GB', symbol: '£' },
};

/**
 * Formats a price value with the appropriate currency symbol and locale.
 * Prices are stored as whole numbers (e.g., 25000 = ₹25,000).
 */
export function formatCurrency(
  amount: number,
  currency: Currency = 'INR',
): string {
  const config = CURRENCY_CONFIG[currency] ?? CURRENCY_CONFIG.INR;
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a price with compact notation for large values.
 * e.g., ₹1,25,000 → ₹1.25L
 */
export function formatCurrencyCompact(
  amount: number,
  currency: Currency = 'INR',
): string {
  const config = CURRENCY_CONFIG[currency] ?? CURRENCY_CONFIG.INR;
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

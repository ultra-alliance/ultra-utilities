import numeral from 'numeral';

/**
 * @alpha
 * @category Formatters
 * @name formatNumeralAbreviation
 * @param `number` - count to format
 * @returns `string` formatted count
 * @description
 * Formats a number to a short form with a letter abreviation
 * @example
 * ```typescript
 * import { formatNumeralAbreviation } from '@/ult-alliance/ultra-sdk';
 *
 * formatNumeralAbreviation(1000); // 1K
 * formatNumeralAbreviation(1000000); // 1M
 * ```
 */

function formatNumeralAbreviation(count?: number): string {
  return numeral(Math.floor(count ?? 0))
    .format('0.a')
    .toLocaleUpperCase();
}

export default formatNumeralAbreviation;

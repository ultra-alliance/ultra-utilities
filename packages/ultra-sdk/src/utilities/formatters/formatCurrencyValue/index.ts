import numeral from 'numeral';
import { type tFormatCurrencyValue } from '../../interfaces';

/**
 * @alpha
 * @category Formatters
 * @name formatCurrencyValue
 * @param {tFormatCurrencyValue} args
 * @returns `string` - formatted currency value
 * @description
 * Formats a currency value to a string with a ticker
 * @example
 * ```typescript
 * import { formatCurrencyValue } from '@ultra-utilities/formatters';
 *
 * const formattedValue = formatCurrencyValue({
 *  value: 1000.55,
 *  ticker: 'oscar'
 * });
 *
 * // formattedValue = 'oscar 1,000.55'
 * ```
 */

function formatCurrencyValue({ value, ticker }: tFormatCurrencyValue): string {
  let formattedValue = '';
  if (ticker) {
    formattedValue = ticker + ' ';
  }

  formattedValue += numeral(value ?? 0).format('0,0.00');
  return formattedValue;
}

export default formatCurrencyValue;

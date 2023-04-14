import numeral from 'numeral';

/**
 * @alpha
 * @category Formatters
 * @name formatUosBalance
 * @param  balance - Balance to format
 * @returns  Formatted UOS balance
 * @description
 * Formats a UOS balance to a human readable format
 * @example
 * ```typescript
 * import { formatUosBalance } from '@ultra-alliance/ultra-sdk';
 *
 * const formattedBalance = formatUosBalance('10000000');
 * // formattedBalance = '10.00 K'
 * ```
 */

function formatUosBalance(balance: string): string {
  return numeral(Math.floor(parseFloat(balance))).format('(0.00 a)');
}

export default formatUosBalance;

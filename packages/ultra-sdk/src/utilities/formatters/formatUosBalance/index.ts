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
 * import { formatUosBalance } from '@ultraio/sdk';
 *
 * const formattedBalance = formatUosBalance('10000000');
 * // formattedBalance = '10.00 K'
 * ```
 */

function formatUosBalance(balance: string | undefined = '0'): string {
  return numeral(Math.floor(parseFloat(balance ?? '0'))).format('(0.00 a)');
}

export default formatUosBalance;

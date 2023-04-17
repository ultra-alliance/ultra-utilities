import numeral from 'numeral';
import { type tValidInput } from '../../interfaces';

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

function formatUosBalance(balance: tValidInput): string {
  let toFormat = 0;
  if (typeof balance === 'string') {
    toFormat = parseFloat(balance.split(' ')[0]);
  } else {
    toFormat = balance;
  }

  return numeral(toFormat).format('(0.00 a)');
}

export default formatUosBalance;

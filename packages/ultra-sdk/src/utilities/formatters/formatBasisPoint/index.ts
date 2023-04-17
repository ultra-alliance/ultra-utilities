import numeral from 'numeral';

/**
 * @alpha
 * @category Formatters
 * @name formatBasisPoint
 * @param basisPoint -  basis point to format
 * @returns `string` - formatted basis point as a percentage
 * @description
 * Formats a basis point value to a string with a percentage
 * @example
 * ```typescript
 * import { formatBasisPoint } from '@ultra-alliance/ultra-sdk';
 *
 * const formattedBasisPoint = formatBasisPoint(
 *  basisPoint: 600
 * );
 *
 * // formattedBasisPoint = '6.00%'
 * ```
 */

function formatBasisPoint(basisPoint: number): string {
  const percentage = (basisPoint / 100).toFixed(2);
  return numeral(percentage).format('0.00') + '%';
}

export default formatBasisPoint;

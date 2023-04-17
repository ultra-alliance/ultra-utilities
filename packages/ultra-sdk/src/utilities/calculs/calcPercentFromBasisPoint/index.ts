import { type tCalcPercentFromBasisPoint } from '../../interfaces';

/**
 * @alpha
 * @category Calculations
 * @name calcPercentFromBasisPoint
 * @param {tCalcPercentFromBasisPoint} args
 * @returns `number` - calculated percentage value
 * @description
 * Calculates the percentage value for a given basis point and number value.
 * @example
 * ```typescript
 * import { calcPercentFromBasisPoint } from '@ultra-alliance/ultra-sdk';
 *
 * const percent = calcPercentFromBasisPoint({
 *  basis_point: 600,
 *  value: 100
 * });
 *
 * // percent = 6
 * ```
 */

function calcPercentFromBasisPoint({
  basis_point,
  value,
}: tCalcPercentFromBasisPoint): number {
  return (basis_point / 10000) * value;
}

export default calcPercentFromBasisPoint;

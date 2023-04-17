/**
 * Calculates the total basis points for an array of resale share objects.
 * @category Calculations
 * @param resaleShares An array of resale share objects.
 * @returns `number` - The total basis points for the array of resale share objects.
 *
 *
 *
 * @example
 * ```typescript
 * const resaleShares = [
 *  { receiver: 'receiver1', basis_point: 100 },
 *  { receiver: 'receiver2', basis_point: 200 },
 * ]
 *
 * const totalBasisPoints = calcTotalResaleShare(resaleShares);
 * // totalBasisPoints = 300
 * ```
 */
import { type tResaleShare } from '../../../apis';
import { formatBasisPoint } from '../../formatters';

type tTotalResaleShare = {
  basis_point: number;
  formatted: string;
};

function calcTotalResaleShare(resaleShares: tResaleShare[]): tTotalResaleShare {
  const totalBasisPoints = resaleShares.reduce(
    (acc, cur) => acc + cur.basis_point,
    0,
  );
  return {
    basis_point: totalBasisPoints,
    formatted: formatBasisPoint(totalBasisPoints),
  };
}

export default calcTotalResaleShare;

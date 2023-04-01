import { type tCalcTotalPrice } from '../../interfaces';

/**
 * @alpha
 * @category Calculs
 * @groupe Utilities
 * @name calcTotalPrice
 * @param {tCalcTotalPrice} args
 * @returns `number` - The total value price of the user token balance.
 * @description
 * This function calculates the value of a token based on the base price
 * and the balance of the token.
 * @example
 * ```typescript
 * const args = {
 *    balance: 100,
 *    basePrice: 0.01
 * };
 *
 * const result = calcTotalPrice(args);
 * console.log(result);
 * // 1
 * ```
 */

const calcTotalPrice = ({ balance, basePrice }: tCalcTotalPrice): number => {
  return Number(parseFloat(balance.toString())) * Number(basePrice ?? 1);
};

export default calcTotalPrice;

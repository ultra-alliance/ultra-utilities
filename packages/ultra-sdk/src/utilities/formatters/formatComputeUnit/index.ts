import numeral from 'numeral';

/**
 * @alpha
 * @category Formatters
 * @name formatComputeUnit
 * @param number quota
 * @returns `string` formatted compute unit
 * @description
 * Formats a number to a human readable compute unit
 * @example
 * ```typescript
 * formatComputeUnit(1048576) // 1.05 MB
 * formatComputeUnit(1073741824) // 1.07 GB
 * ```
 */

function formatComputeUnit(quota?: number): string {
  return numeral(Math.floor(quota ?? 0)).format('0.00 b');
}

export default formatComputeUnit;

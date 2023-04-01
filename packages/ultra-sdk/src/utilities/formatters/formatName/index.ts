import { type tFormatName } from '../../interfaces';

/**
 * @alpha
 * @category Formatters
 * @name formatName
 * @param {tFormatName} args
 * @returns `string` formatted name
 * @description
 * Format a name to a specified length
 * @example
 * ```typescript
 * const args = {
 *    name: 'accountname',
 *    num: 3
 * };
 *
 * const result = formatName(args);
 * console.log(result);
 * // acc...ame
 * ```
 */

function formatName({ name, num = 3 }: tFormatName): string {
  const formattedAccountName = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (num === 0) {
    return formattedAccountName;
  }

  if (formattedAccountName.length <= num * 2) {
    return formattedAccountName;
  }

  // Otherwise, truncate the string to the first num characters followed by '...' and the last num characters
  return (
    formattedAccountName.slice(0, num) +
    '...' +
    formattedAccountName.slice(-num)
  );
}

export default formatName;

/**
 * Verifies if string is an account name
 * @param str string to verify
 * @param str string to verify
 * @returns true if string is an account name
 * @example
 * ```typescript
 * import { isAccountName } from '@ultra-alliance/ultra-sdk';
 *
 * const result = isAccountName('ultra');
 *
 * console.log('result', result);
 * ```
 */

function isAccountName(str: string): boolean {
  const regex = /^[a-z1-5.]{1,11}[a-z1-5]$/;
  return regex.test(str);
}

export default isAccountName;

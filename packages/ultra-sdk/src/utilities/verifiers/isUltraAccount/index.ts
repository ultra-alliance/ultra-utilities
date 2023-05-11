import { eUltraAccount } from '../constants';

/**
 * Determines if a given account string is a valid ultra account based on the values
 * of the {@link eUltraAccount} enum.
 *
 * @param account - The account string to check.
 * @returns `true` if the account string is a valid ultra account, `false` otherwise.
 */
function isUltraAccount(account?: string): boolean {
  if (!account) return false;
  if (account.includes('ultra')) {
    return true;
  }

  const ultraAccountKeys = Object.keys(eUltraAccount);
  return ultraAccountKeys.includes(account);
}

export default isUltraAccount;

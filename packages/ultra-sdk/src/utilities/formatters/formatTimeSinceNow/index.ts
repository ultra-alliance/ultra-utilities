import moment from 'moment';

/**
 * @alpha
 * @category Formatters
 * @name formatTimeSinceNow
 * @param {string | undefined} date - Date to format
 * @returns {string} - Formatted date
 * @description
 * Formats a date to show how many days ago it was
 * @example
 * ```typescript
 * import { formatTimeSinceNow } from '@ultra-alliance/ultra-sdk';
 * import moment from 'moment';
 *
 * const now = moment().toISOString();
 * const result = formatTimeSinceNow(now);
 * // result = '0 day(s) ago'
 * ```
 */

function formatTimeSinceNow(date: string | undefined): string {
  if (!date) {
    return 'Unknown';
  }

  const momentCreatedDate = moment(date);
  const momentNow = moment();
  const diffInDays = momentNow.diff(momentCreatedDate, 'days');

  return `${diffInDays} day(s) ago`;
}

export default formatTimeSinceNow;

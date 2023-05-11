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

  const now = moment();
  const diff = now.diff(date);
  const duration = moment.duration(diff);

  if (duration.asDays() >= 1) {
    return `${Math.floor(duration.asDays())} day(s) ago`;
  }

  if (duration.asHours() >= 1) {
    return `${Math.floor(duration.asHours())} hour(s) ago`;
  }

  if (duration.asMinutes() >= 1) {
    return `${Math.floor(duration.asMinutes())} minute(s) ago`;
  }

  return 'Just now';
}

export default formatTimeSinceNow;

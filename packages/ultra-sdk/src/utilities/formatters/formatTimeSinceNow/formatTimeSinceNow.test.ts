import moment from 'moment';
import formatTimeSinceNow from './index';

describe('formatTimeSinceNow', () => {
  it('should return "Unknown" if date is undefined', () => {
    const result = formatTimeSinceNow(undefined);
    expect(result).toBe('Unknown');
  });

  it('should return the correct number of days', () => {
    const fiveDaysAgo = moment().subtract(5, 'days').toISOString();
    const result = formatTimeSinceNow(fiveDaysAgo);
    expect(result).toBe('5 day(s) ago');
  });
});

import moment from 'moment';
import formatTimeSinceNow from './index';

describe('formatTimeSinceNow', () => {
  it('returns "Unknown" if date is undefined', () => {
    expect(formatTimeSinceNow(undefined)).toBe('Unknown');
  });

  it('returns "Just now" if date is the current time', () => {
    const now = moment().toISOString();
    expect(formatTimeSinceNow(now)).toBe('Just now');
  });

  it('returns "1 minute(s) ago" if date is one minute in the past', () => {
    const oneMinuteAgo = moment().subtract(1, 'minutes').toISOString();
    expect(formatTimeSinceNow(oneMinuteAgo)).toBe('1 minute(s) ago');
  });

  it('returns "1 hour(s) ago" if date is one hour in the past', () => {
    const oneHourAgo = moment().subtract(1, 'hours').toISOString();
    expect(formatTimeSinceNow(oneHourAgo)).toBe('1 hour(s) ago');
  });

  it('returns "1 day(s) ago" if date is one day in the past', () => {
    const oneDayAgo = moment().subtract(1, 'days').toISOString();
    expect(formatTimeSinceNow(oneDayAgo)).toBe('1 day(s) ago');
  });
});

import isAccountName from './index';

describe('matchesRegex', () => {
  test('returns true for matching strings', () => {
    expect(isAccountName('abcde')).toBe(true);
    expect(isAccountName('a.cde')).toBe(true);
    expect(isAccountName('abcde1')).toBe(true);
  });

  test('returns false for non-matching strings', () => {
    expect(isAccountName('')).toBe(false);
    expect(isAccountName('abcd.efghij23')).toBe(false);
    expect(isAccountName('abcde!')).toBe(false);
  });
});

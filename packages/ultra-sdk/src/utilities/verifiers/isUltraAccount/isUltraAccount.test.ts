import isUltraAccount from './index';

describe('isUltraAccount', () => {
  test('valid account returns true', () => {
    const validAccount = 'ultra.nft.ft';
    expect(isUltraAccount(validAccount)).toBe(true);
  });

  test('invalid account returns false', () => {
    const invalidAccount = 'invalid.account';
    expect(isUltraAccount(invalidAccount)).toBe(false);
  });

  test('empty string returns false', () => {
    expect(isUltraAccount('')).toBe(false);
  });
});

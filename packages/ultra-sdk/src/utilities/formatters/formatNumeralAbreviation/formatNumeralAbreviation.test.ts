import ormatNumeralAbreviation from './index';

describe('formatNumeralAbreviation', () => {
  it('formats the number to a guild member count', () => {
    const count = 1000;
    const expected = '1K';

    const result = ormatNumeralAbreviation(count);

    expect(result).toBe(expected);
  });

  it('formats undefined to 0', () => {
    const count = undefined;
    const expected = '0';

    const result = ormatNumeralAbreviation(count);

    expect(result).toBe(expected);
  });

  it('formats negative numbers to 0', () => {
    const count = -1000;
    const expected = '-1K';

    const result = ormatNumeralAbreviation(count);

    expect(result).toBe(expected);
  });

  it('uses Math.floor to round the number', () => {
    const count = 1999.99;
    const expected = '2K';

    const result = ormatNumeralAbreviation(count);
    expect(result).toBe(expected);
  });
});

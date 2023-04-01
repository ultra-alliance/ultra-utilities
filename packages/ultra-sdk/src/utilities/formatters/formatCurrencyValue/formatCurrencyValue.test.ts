import formatCurrencyValue from './index';

describe('formatCurrencyValue', () => {
  it('formats a whole number to a currency value', () => {
    const value = 1000;
    const expectedValue = '$ 1,000.00';
    const formattedValue = formatCurrencyValue({
      value,
      ticker: '$',
    });
    expect(formattedValue).toEqual(expectedValue);
  });

  it('formats a number with a decimal to a currency value', () => {
    const value = 1000.5;
    const expectedValue = '1,000.50';
    const formattedValue = formatCurrencyValue({ value });
    expect(formattedValue).toEqual(expectedValue);
  });

  it('formats a number with two decimals to a currency value', () => {
    const value = 1000.55;
    const expectedValue = 'oscar 1,000.55';
    const formattedValue = formatCurrencyValue({ value, ticker: 'oscar' });
    expect(formattedValue).toEqual(expectedValue);
  });

  it('formats a negative number to a currency value', () => {
    const value = -1000.5;
    const expectedValue = '-1,000.50';
    const formattedValue = formatCurrencyValue({ value });
    expect(formattedValue).toEqual(expectedValue);
  });

  it('formats a zero to a currency value', () => {
    const value = 0;
    const expectedValue = '0.00';
    const formattedValue = formatCurrencyValue({ value });
    expect(formattedValue).toEqual(expectedValue);
  });

  it('formats a large number to a currency value', () => {
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const value = 1234567890123.456789;
    const expectedValue = '1,234,567,890,123.46';
    const formattedValue = formatCurrencyValue({ value });
    expect(formattedValue).toEqual(expectedValue);
  });
});

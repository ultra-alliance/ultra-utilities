import formatUosBalance from './index';

describe('formatUosBalance', () => {
  it('returns the formatted balance with suffix', () => {
    const balance1 = '100';
    const balance2 = '1000';
    const balance3 = '1000000';

    expect(formatUosBalance(balance1)).toEqual('100.00 ');
    expect(formatUosBalance(balance2)).toEqual('1.00 k');
    expect(formatUosBalance(balance3)).toEqual('1.00 m');
  });

  it('returns 0 balance if the balance is undefined or not a number', () => {
    const balance2 = 'not a number';

    expect(formatUosBalance(balance2)).toEqual('0.00 ');
  });
});

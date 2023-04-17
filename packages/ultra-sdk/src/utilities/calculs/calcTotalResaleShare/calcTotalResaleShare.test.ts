import calcTotalResaleShare from './index';

describe('calcTotalResaleShare', () => {
  it('returns 0 for an empty array', () => {
    expect(calcTotalResaleShare([]).basis_point).toBe(0);
    expect(calcTotalResaleShare([]).formatted).toBe('0.00%');
  });

  it('correctly calculates the total basis points for an array of resale shares', () => {
    const resaleShares = [
      { receiver: 'receiver1', basis_point: 100 },
      { receiver: 'receiver2', basis_point: 200 },
      { receiver: 'receiver3', basis_point: 300 },
    ];
    expect(calcTotalResaleShare(resaleShares).basis_point).toBe(600);
    expect(calcTotalResaleShare(resaleShares).formatted).toBe('6.00%');
  });
});

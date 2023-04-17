import formatBasisPoint from './index';

describe('formatBasisPoint', () => {
  it('correctly formats a basis point value as a percentage string', () => {
    const basisPoint = 600;
    const formattedBasisPoint = formatBasisPoint(basisPoint);
    expect(formattedBasisPoint).toBe('6.00%');
  });

  it('correctly formats a basis point value of 0', () => {
    const basisPoint = 0;
    const formattedBasisPoint = formatBasisPoint(basisPoint);
    expect(formattedBasisPoint).toBe('0.00%');
  });

  it('correctly formats a basis point value of 1250', () => {
    const basisPoint = 1250;
    const formattedBasisPoint = formatBasisPoint(basisPoint);
    expect(formattedBasisPoint).toBe('12.50%');
  });

  it('correctly formats a basis point value with decimal places', () => {
    const basisPoint = 1050.35;
    const formattedBasisPoint = formatBasisPoint(basisPoint);
    expect(formattedBasisPoint).toBe('10.50%');
  });
});

import calcPercentFromBasisPoint from './index';

describe('calcPercentFromBasisPoint', () => {
  it('correctly calculates the percentage value for a given basis point and value', () => {
    const basis_point = 600;
    const value = 100;
    const percent = calcPercentFromBasisPoint({ basis_point, value });
    expect(percent).toBe(6);
  });

  it('correctly calculates the percentage value for a basis point of 0', () => {
    const basis_point = 0;
    const value = 100;
    const percent = calcPercentFromBasisPoint({ basis_point, value });
    expect(percent).toBe(0);
  });

  it('correctly calculates the percentage value for a value of 0', () => {
    const basis_point = 600;
    const value = 0;
    const percent = calcPercentFromBasisPoint({ basis_point, value });
    expect(percent).toBe(0);
  });

  it('correctly calculates the percentage value for a decimal value', () => {
    const basis_point = 250;
    const value = 0.5;
    const percent = calcPercentFromBasisPoint({ basis_point, value });
    expect(percent).toBe(0.0125);
  });
});

import { type tCalcTotalPrice } from '../../interfaces';
import calcTotalPrice from './index';

describe('calcTotalPrice', () => {
  it('should return the correct value when given valid inputs', () => {
    const input: tCalcTotalPrice = {
      balance: 10,
      basePrice: 5,
    };
    const expectedOutput = 50;
    const result = calcTotalPrice(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should return 0 when given a balance of 0', () => {
    const input: tCalcTotalPrice = {
      balance: 0,
      basePrice: 5,
    };
    const expectedOutput = 0;
    const result = calcTotalPrice(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should return the when given a null basePrice', () => {
    const input: tCalcTotalPrice = {
      balance: 10,
      basePrice: undefined,
    };
    const expectedOutput = 10;
    const result = calcTotalPrice(input);
    expect(result).toEqual(expectedOutput);
  });
});

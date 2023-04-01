import formatComputeUnit from './index';

describe('formatComputeUnit', () => {
  it('should format a RAM usage value in bytes', () => {
    const quota = 1024;
    const expectedOutput = '1.02 KB';
    const actualOutput = formatComputeUnit(quota);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should format a RAM usage value in megabytes', () => {
    const quota = 1048576;
    const expectedOutput = '1.05 MB';
    const actualOutput = formatComputeUnit(quota);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should format a RAM usage value in gigabytes', () => {
    const quota = 1073741824;
    const expectedOutput = '1.07 GB';
    const actualOutput = formatComputeUnit(quota);
    expect(actualOutput).toEqual(expectedOutput);
  });
});

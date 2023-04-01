import formatName from './index';

describe('formatName', () => {
  it('should return the formatted name when name is shorter than or equal to num*2', () => {
    expect(formatName({ name: 'accountname', num: 3 })).toBe('acc...ame');
  });

  it('should return the truncated name when name is longer than num*2', () => {
    expect(formatName({ name: 'longeraccountname', num: 3 })).toBe('lon...ame');
  });

  it('should use a default num of 3 if no num is provided', () => {
    expect(formatName({ name: 'accountname' })).toBe('acc...ame');
  });
});

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

  it('should return the name if num is 0', () => {
    const res = formatName({ name: 'accountname', num: 0 });
    expect(res).toBe('accountname');
  });

  it('should return the truncated name when name is longer than num*2', () => {
    expect(formatName({ name: 'yo', num: 3 })).toBe('yo');
    expect(formatName({ name: 'averylongaccountname', num: 3 })).toBe(
      'ave...ame',
    );
  });
  it('should be default 3 characters on each side', () => {
    expect(formatName({ name: '1aaa2bbbc333' })).toBe('1aa...333');
  });
});

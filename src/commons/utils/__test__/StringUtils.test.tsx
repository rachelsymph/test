import * as StringUtils from '../StringUtils';

describe('StringUtils', () => {
  it('should be trim', () => {
    const a: string = StringUtils.toTrimmedString('  test ');

    expect(a).toBe('test');
  });

  it('should be slugify', () => {
    const a: string = StringUtils.slugify('test  ');

    expect(a).toBe('test');
  });
});

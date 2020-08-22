import { sanitizeVersion } from '~/resolver/common/version-resolver';

describe('sanitizeVersion', () => {
  test('removes version suffix when present', () => {
    expect(sanitizeVersion('1.0.0-beta.1')).toBe('1.0.0');
  });
});

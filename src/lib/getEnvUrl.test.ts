import { describe, expect, it } from 'vitest';
import getEnvUrl from './getEnvUrl';

describe('getEnvUrl', () => {
  it('should return url values', () => {
    expect(getEnvUrl('url', 'path', 'key')).toBe('url/path/key');
    expect(getEnvUrl('url', '/path', 'key')).toBe('url/path/key');
    expect(getEnvUrl('url', 'path/', 'key')).toBe('url/path/key');
    expect(getEnvUrl('url', 'p/a/t/h', 'key')).toBe('url/path/key');
    expect(getEnvUrl('url/', 'path', 'key')).toBe('url/path/key');
    expect(getEnvUrl('url///', 'path', 'key')).toBe('url/path/key');
  });
});

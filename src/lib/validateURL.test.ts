import { describe, expect, it } from 'vitest';
import validateURL from './validateURL';

describe('validateURL', () => {
  it('should return true for valid urls', () => {
    expect(validateURL('http://fake.com')).toBeTruthy();
    expect(validateURL('https://fake.com')).toBeTruthy();
  });

  it('should return false for invalid urls', () => {
    expect(validateURL(null)).toBeFalsy();
    expect(validateURL(undefined)).toBeFalsy();
    expect(validateURL('')).toBeFalsy();
    expect(validateURL('fake.com')).toBeFalsy();
    expect(validateURL('ftp://fake.com')).toBeFalsy();
    expect(validateURL('http://url')).toBeFalsy();
  });
});

import { describe, expect, it } from 'vitest';
import validateName from './validateName';

describe('validateName', () => {
  it('should return true for valid names', () => {
    expect(validateName('Name')).toBeTruthy();
    expect(validateName('Spaced Name')).toBeTruthy();
    expect(validateName('W314d-Name')).toBeTruthy();
  });

  it('should return false for invalid names', () => {
    expect(validateName(null)).toBeFalsy();
    expect(validateName(undefined)).toBeFalsy();
    expect(validateName('')).toBeFalsy();
  });
});

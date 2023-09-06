import { describe, expect, it } from 'vitest';
import { getStorageItem, setStorageItem } from './localStorage';

describe('localStorage', () => {
  const key = 'my-key';
  const myObject = { prop: 'value' };
  const mySetObject = { prop: 'value-set' };

  it('should get the default value when storage key is null', () => {
    expect(getStorageItem(key, myObject)).toStrictEqual(myObject);
  });

  it('should set and get an object from storage', () => {
    setStorageItem(key, mySetObject);

    const result = getStorageItem(key, myObject);

    expect(result).not.toEqual(myObject);
    expect(result).toStrictEqual(mySetObject);
  });
});

export function getStorageItem<T>(key: string, defaultValue: T): T {
  let value: T | undefined = undefined;

  try {
    const _json = window.localStorage.getItem(key);

    if (!_json) {
      throw new Error();
    }

    value = JSON.parse(_json) as T;
  } catch {
    value = defaultValue;
  }

  return value;
}

export function setStorageItem<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

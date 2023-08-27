import { LocalStorageKey } from '@constants';
import { afterAll, afterEach, describe, expect, it, vi } from '@tests';
import { getTenantId, setTenantId } from './getTenantId';

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('getTenantId', () => {
  const idUrl = 'id-from-url';
  const idStorage = 'id-from-local-storage';

  const _location = window.location;

  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      search: '',
    },
  });

  afterAll(() => {
    window.location = _location;
  });

  function setup(urlId?: string, storageId?: string) {
    const search = new URLSearchParams(window.location.search);
    search.set(LocalStorageKey.tenantId, urlId ?? '');
    window.location.search = search.toString();

    Object.defineProperty(Object.getPrototypeOf(window.localStorage), 'getItem', {
      value: () => storageId ?? '',
    });
  }

  it('returns id from url', () => {
    setup(idUrl);

    expect(getTenantId()).toEqual(idUrl);
  });

  it('returns id from the local storage', () => {
    setup(undefined, idStorage);

    expect(getTenantId()).toEqual(idStorage);
  });

  it('returns id from the url as primary source', () => {
    setup(idUrl, idStorage);

    expect(getTenantId()).toEqual(idUrl);
  });

  it('returns undefined when id is not found', () => {
    setup();

    expect(getTenantId()).toEqual(undefined);
  });
});

describe('setTenantId', () => {
  const sessionSpy = vi.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');

  const getIdFromURL = () =>
    new URLSearchParams(window.location.search).get(LocalStorageKey.tenantId);

  it('setItem with a tenant id', () => {
    const _id = 'my-tenant-id';

    setTenantId(_id);
    expect(sessionSpy).toHaveBeenCalledTimes(1);
    expect(sessionSpy).toHaveBeenCalledWith(LocalStorageKey.tenantId, _id);
  });

  it('update url when id is updated', () => {
    const [firstId, secondId] = ['firstId', 'secondId'];
    window.history.replaceState(null, '', `?${LocalStorageKey.tenantId}=${firstId}`);

    expect(getIdFromURL()).toBe(firstId);
    expect(getTenantId()).toBe(firstId);

    setTenantId(secondId);

    expect(getIdFromURL()).toBe(secondId);
    expect(getTenantId()).toBe(secondId);
  });

  it('do not setItem on invalid id', () => {
    setTenantId(undefined);
    expect(sessionSpy).not.toHaveBeenCalled();

    setTenantId('');
    expect(sessionSpy).not.toHaveBeenCalled();
  });
});

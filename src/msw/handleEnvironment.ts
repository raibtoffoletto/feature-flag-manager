import { LocalStorageKey } from '@constants';
import { getStorageItem, setStorageItem } from '@lib/localStorage';
import { http } from 'msw';
import toJson from './toJson';
import toStatus from './toStatus';
import wait from './wait';

export default function handleEnvironment(route: string) {
  const getStorageKey = (id: string) => `${id}||${route}`;

  return [
    http.get(route, async ({ params, request }) => {
      await wait();

      const key = params.key;
      const tenant = request.headers.get(LocalStorageKey.tenantId);

      if (!tenant || !key) {
        return toStatus(403);
      }
      const flags = getStorageItem<FlagValue[]>(getStorageKey(tenant), []);

      const flag = flags.find((x) => x.key === key);

      if (!flag) {
        return toStatus(404);
      }

      return toJson(flag);
    }),

    http.put(route, async ({ params, request }) => {
      await wait(1333);

      const key = params.key;
      const tenant = request.headers.get(LocalStorageKey.tenantId);

      if (!tenant || !key) {
        return toStatus(403);
      }

      const storageKey = getStorageKey(tenant);

      const _flag = (await request.json()) as FlagValue;

      let flags = getStorageItem<FlagValue[]>(storageKey, []);

      const index = flags.findIndex((x) => x.key === key);

      if (index < 0) {
        flags = flags.concat([_flag]);
      } else {
        flags.splice(index, 1, _flag);
      }

      setStorageItem(storageKey, flags);

      return toStatus();
    }),

    http.delete(route, async ({ params, request }) => {
      await wait();

      const key = params.key;
      const tenant = request.headers.get(LocalStorageKey.tenantId);

      if (!tenant || !key) {
        return toStatus(403);
      }
      const storageKey = getStorageKey(tenant);

      setStorageItem(
        storageKey,
        getStorageItem<FlagValue[]>(storageKey, []).filter((f) => f.key !== key),
      );

      return toStatus();
    }),
  ];
}

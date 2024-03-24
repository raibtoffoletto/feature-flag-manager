import { LocalStorageKey } from '@constants';
import { getStorageItem, setStorageItem } from '@lib/localStorage';
import { http } from 'msw';
import toJson from './toJson';
import toStatus from './toStatus';
import wait from './wait';

function getStorageKey(tenant: string, url: string) {
  return `${tenant}||${url.replace(/\/[^/]*$/, '')}`;
}

export default function handleEnvironment(route: string) {
  return [
    http.get(route, async ({ params, request: { headers, url } }) => {
      await wait();

      const key = params.key;
      const tenant = headers.get(LocalStorageKey.tenantId);

      if (!tenant || !key) {
        return toStatus(412);
      }
      const flags = getStorageItem<FlagValue[]>(getStorageKey(tenant, url), []);

      const flag = flags.find((x) => x.key === key);

      if (!flag) {
        return toStatus(204);
      }

      return toJson(flag);
    }),

    http.put(route, async ({ params, request }) => {
      await wait(1333);

      const key = params.key;
      const tenant = request.headers.get(LocalStorageKey.tenantId);

      if (!tenant || !key) {
        return toStatus(412);
      }

      const storageKey = getStorageKey(tenant, request.url);

      try {
        const _flag = (await request.json()) as FlagValue;
        let flags = getStorageItem<FlagValue[]>(storageKey, []);

        const index = flags.findIndex((x) => x.key === key);

        if (index < 0) {
          flags = flags.concat([_flag]);
        } else {
          flags = flags.slice(0, index).concat([_flag, ...flags.slice(index + 1)]);
        }

        setStorageItem(storageKey, flags);

        return toStatus();
      } catch {
        return toStatus(500);
      }
    }),

    http.delete(route, async ({ params, request: { headers, url } }) => {
      await wait();

      const key = params.key;
      const tenant = headers.get(LocalStorageKey.tenantId);

      if (!tenant || !key) {
        return toStatus(412);
      }

      const storageKey = getStorageKey(tenant, url);

      setStorageItem(
        storageKey,
        getStorageItem<FlagValue[]>(storageKey, []).filter((f) => f.key !== key),
      );

      return toStatus();
    }),
  ];
}

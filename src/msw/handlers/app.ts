import { API, LocalStorageKey } from '@constants';
import { getStorageItem, setStorageItem } from '@lib/localStorage';
import { http } from 'msw';
import { flags, settings } from '../data/app';
import toJson from '../toJson';
import wait from '../wait';

const success = () => new Response(undefined, { status: 200 });

export const app = [
  http.get(API.settings, async () => {
    await wait();

    return toJson(getStorageItem(LocalStorageKey.settings, settings));
  }),

  http.post(API.settings, async ({ request }) => {
    await wait(2000);

    const _settings = (await request.json()) as Settings;

    setStorageItem(LocalStorageKey.settings, _settings);

    return success();
  }),

  http.get(API.flags, async () => {
    await wait();

    return toJson(getStorageItem(LocalStorageKey.flags, flags));
  }),

  http.put(API.flags, async ({ request }) => {
    await wait(1333);

    const _flag = (await request.json()) as Flag;

    const _flags: Flag[] = getStorageItem(LocalStorageKey.flags, flags).slice();

    const index = _flags.findIndex((x) => x.key === _flag.key);
    if (index < 0) {
      _flags.push(_flag);
    } else {
      _flags[index] = { ..._flag };
    }

    setStorageItem(LocalStorageKey.flags, _flags);

    return success();
  }),

  http.delete(`${API.flags}/:key`, async ({ params }) => {
    await wait();

    const _flags: Flag[] = getStorageItem(LocalStorageKey.flags, flags).slice();

    setStorageItem(
      LocalStorageKey.flags,
      _flags.filter((x) => x.key !== params.key),
    );

    return success();
  }),
];

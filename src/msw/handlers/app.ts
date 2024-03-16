import { API, LocalStorageKey } from '@constants';
import { getStorageItem, setStorageItem } from '@lib/localStorage';
import { http } from 'msw';
import { settings } from '../data/app';
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
];

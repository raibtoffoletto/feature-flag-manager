import { API, LocalStorageKey } from '@constants';
import { getStorageItem, setStorageItem } from '@lib/localStorage';
import { rest } from 'msw';
import { settings } from '../data/app';
import wait from '../wait';

export const app = [
  rest.get(API.settings, async (_, res, ctx) => {
    await wait();

    return res(
      ctx.status(200),
      ctx.json(getStorageItem(LocalStorageKey.settings, settings)),
    );
  }),

  rest.post(API.settings, async (req, res, ctx) => {
    await wait(2000);

    const _settings: Settings = await req.json();

    setStorageItem(LocalStorageKey.settings, _settings);

    return res(ctx.status(200));
  }),
];

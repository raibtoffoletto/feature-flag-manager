import { API, LocalStorageKey } from '@constants';
import { getStorageItem } from '@lib/localStorage';
import { rest } from 'msw';
import { settings } from '../data/app';

export const app = [
  rest.get(API.settings, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(getStorageItem(LocalStorageKey.settings, settings)),
    );
  }),
];

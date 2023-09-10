import { API } from '@constants';
import { rest } from 'msw';
import { user as userData } from '../data/user';
import wait from '../wait';

export const user = [
  rest.get(API.whoami, async (_, res, ctx) => {
    await wait();

    return res(ctx.status(200), ctx.json(userData));
  }),
];

import { API } from '@constants';
import { rest } from 'msw';
import { user as userData } from '../data/user';

export const user = [
  rest.get(API.whoami, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData));
  }),
];

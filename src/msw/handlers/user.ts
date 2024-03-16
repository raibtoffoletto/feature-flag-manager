import { API } from '@constants';
import { http } from 'msw';
import { user as userData } from '../data/user';
import toJson from '../toJson';
import wait from '../wait';

export const user = [
  http.get(API.whoami, async () => {
    await wait();

    return toJson(userData);
  }),
];

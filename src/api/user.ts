import { API } from '@constants';
import axios from './axios';

export function getUser(): Promise<User> {
  return axios.get(API.whoami);
}

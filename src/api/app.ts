import { API } from '@constants';
import axios from './axios';

export function getSettings(): Promise<Settings> {
  return axios.get(API.settings);
}

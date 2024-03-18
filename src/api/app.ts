import { API } from '@constants';
import axios from './axios';

export function getSettings(): Promise<Settings> {
  return axios.get(API.settings);
}

export function postSettings(settings: Settings): Promise<void> {
  return axios.post(API.settings, settings);
}

export function getFlags(): Promise<Flag[]> {
  return axios.get(API.flags);
}

export function putFlag(flag: Flag): Promise<void> {
  return axios.put(API.flags, flag);
}

export function deleteFlag(key: string): Promise<void> {
  return axios.delete(`${API.flags}/${key}`);
}

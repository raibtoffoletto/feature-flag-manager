import { LocalStorageKey } from '@constants';
import axios from './axios';

export function getTenantFlag(url: string, tenantId: string): Promise<FlagValue> {
  return axios.get(url, {
    headers: {
      [LocalStorageKey.tenantId]: tenantId,
    },
  });
}
export function putTenantFlag(
  flag: FlagValue,
  url: string,
  tenantId: string,
): Promise<void> {
  return axios.put(url, flag, {
    headers: {
      [LocalStorageKey.tenantId]: tenantId,
    },
  });
}

export function deleteTenantFlag(url: string, tenantId: string): Promise<void> {
  return axios.delete(url, {
    headers: {
      [LocalStorageKey.tenantId]: tenantId,
    },
  });
}

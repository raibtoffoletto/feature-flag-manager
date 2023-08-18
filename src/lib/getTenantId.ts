import { LocalStorageKey } from '@constants';

export function getTenantId() {
  const idFromURL = new URLSearchParams(window.location.search).get(
    LocalStorageKey.tenantId,
  );

  const idFromStorage = window.localStorage.getItem(LocalStorageKey.tenantId);

  const tenantId = idFromURL || idFromStorage || undefined;

  setTenantId(tenantId);

  return tenantId;
}

export function setTenantId(tenantId?: string) {
  if (!tenantId) {
    return;
  }

  const searchString = `${window.location.search}`;

  if (
    searchString.includes(LocalStorageKey.tenantId) &&
    !searchString.includes(tenantId)
  ) {
    window.history.replaceState(null, '', `?${LocalStorageKey.tenantId}=${tenantId}`);
  }

  window.sessionStorage.setItem(LocalStorageKey.tenantId, tenantId);
}

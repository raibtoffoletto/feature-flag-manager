export const API = Object.freeze({
  whoami: '/api/whoami',
  settings: '/api/settings',
});

export const LocalStorageKey = Object.freeze({
  tenantId: 'TenantId',
  settings: 'data-settings',
});

export const AppRoutes = Object.freeze({
  root: '/',
  settings: '/settings',
});

export const SettingsViewAction = Object.freeze({
  reset: 'reset',
  endpoint: 'endpoint',
  create: 'create',
  update: 'update',
  remove: 'remove',
});

export const URLActions = Object.freeze({
  action: 'action',
  edit: 'edit',
});

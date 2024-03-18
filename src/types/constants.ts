export const API = Object.freeze({
  whoami: '/api/whoami',
  settings: '/api/settings',
  flags: '/api/flags',
});

export const LocalStorageKey = Object.freeze({
  tenantId: 'TenantId',
  settings: 'data-settings',
  flags: 'data-flags',
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
  add: 'add',
});

export const ValueType = Object.freeze({
  string: 'string',
  boolean: 'boolean',
});

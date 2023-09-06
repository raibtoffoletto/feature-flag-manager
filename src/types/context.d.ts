interface IUserContext {
  user: User;
  tenant?: Tenant;
  switchTanant: (tenantId?: string) => void;
}

interface ISettingsContext {
  settings: Settings;
  updateEndpoint: (url?: string) => void;
  createEnv: (env?: Omit<Environment, 'id'>) => void;
  updateEnv: (env?: Environment) => void;
  removeEnv: (id?: number) => void;
}

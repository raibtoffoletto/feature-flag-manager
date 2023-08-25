interface IUserContext {
  user: User;
  tenant?: Tenant;
  switchTanant: (tenantId?: string) => void;
}

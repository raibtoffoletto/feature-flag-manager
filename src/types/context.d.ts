interface IUserContext {
  user: User;
  tenantId?: string;
  switchTanant: () => void;
}

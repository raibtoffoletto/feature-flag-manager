type IUserContext = {
  user: User;
  tenant?: Tenant;
  switchTanant: (tenantId?: string) => void;
};

type ISettingsContext = {
  settings: Settings;
  updateSettings: (settings?: Settings) => Promise<Settings | undefined>;
};

type ISettingsViewContext = Settings & {
  isEditing: boolean;
  dispatch: React.Dispatch<ISettingsViewAction>;
};

type ISettingsViewAction =
  | {
      type: 'reset';
      payload: Settings;
    }
  | {
      type: 'endpoint';
      payload: string;
    }
  | {
      type: 'create';
      payload: Omit<Environment, 'id'>;
    }
  | {
      type: 'update';
      payload: Environment;
    }
  | {
      type: 'remove';
      payload: number;
    };

type IFlagsContext = {
  isLoading: boolean;
  flags: Flag[];
  selectedFlag?: Flag;
  selected?: string;
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
  refetchFlags: () => Promise<void | Flag[] | undefined>;
};

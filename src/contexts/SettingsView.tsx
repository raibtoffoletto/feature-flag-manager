import { postSettings } from '@api/app';
import FloatingActions from '@components/common/FloatingActions';
import { SettingsViewAction } from '@constants';
import useSettingsContext from '@hooks/context/useSettingsContext';
import {
  Edit as EditIcon,
  Logout as ExitIcon,
  Save as SaveIcon,
  SettingsBackupRestore as UndoIcon,
} from '@mui/icons-material';
import { SpeedDialAction } from '@mui/material';
import testIds from '@testIds';
import { createContext, useReducer, useState } from 'react';

export const SettingsViewContext = createContext<ISettingsViewContext>({
  isEditing: false,
  endpoint: '',
  environments: [],
  dispatch: () => undefined,
});

function createEnvironment(state: Settings, payload: Omit<Environment, 'id'>): Settings {
  const id = Math.max(...state.environments.map((e) => e.id)) + 1;

  const environment = { id, ...payload };

  const _environments = state.environments.slice().concat([environment]);

  return {
    endpoint: state.endpoint,
    environments: _environments,
  };
}

function updateEnvironment(state: Settings, payload: Environment): Settings {
  const _environments = state.environments.slice();

  const index = _environments.findIndex((e) => e.id === payload.id);

  if (index < 0) {
    return state;
  }

  _environments[index] = { ...payload };

  return {
    endpoint: state.endpoint,
    environments: _environments,
  };
}

function stateReducer(state: Settings, { type, payload }: ISettingsViewAction): Settings {
  switch (type) {
    case SettingsViewAction.endpoint:
      return { ...state, endpoint: payload };

    case SettingsViewAction.create:
      return createEnvironment(state, payload);

    case SettingsViewAction.update:
      return updateEnvironment(state, payload);

    case SettingsViewAction.remove:
      return {
        ...state,
        environments: state.environments.filter((e) => e.id !== payload),
      };

    case SettingsViewAction.reset:
      return { ...payload };

    default:
      return state;
  }
}

export function SettingsViewContextProvider({ children }: IParent) {
  const { settings, updateSettings } = useSettingsContext();
  const [{ endpoint, environments }, dispatch] = useReducer(stateReducer, settings);
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleView = (view: boolean) => {
    setMenuOpen(false);

    setTimeout(() => setEditing(view), 350);
  };

  const floatingActions = isEditing
    ? [
        {
          id: testIds.Settings.actions_save,
          label: 'Save',
          icon: <SaveIcon />,
          action: async () => {
            try {
              setMenuOpen(false);
              setLoading(true);
              const _settings = { endpoint, environments };

              await postSettings(_settings);

              await updateSettings(_settings);

              setEditing(false);
            } catch (error: any) {
              console.log('[API Error]: ' + error?.message);
            } finally {
              setLoading(false);
            }
          },
        },
        {
          id: testIds.Settings.actions_undo,
          label: 'Undo',
          icon: <UndoIcon />,
          action: () => {
            setMenuOpen(false);
            dispatch({
              type: SettingsViewAction.reset,
              payload: settings,
            });
          },
        },
        {
          id: testIds.Settings.actions_exit,
          label: 'Exit',
          icon: <ExitIcon />,
          action: () => toggleView(false),
        },
      ]
    : [
        {
          id: testIds.Settings.actions_edit,
          label: 'Edit',
          icon: <EditIcon />,
          action: () => toggleView(true),
        },
      ];

  return (
    <SettingsViewContext.Provider value={{ isEditing, endpoint, environments, dispatch }}>
      {children}

      <FloatingActions
        loading={isLoading}
        open={menuOpen}
        onOpen={() => setMenuOpen(true)}
        onClose={() => setMenuOpen(false)}
        data-testid={testIds.Settings.actions}
      >
        {floatingActions.map((fa) => (
          <SpeedDialAction
            tooltipOpen
            key={fa.id}
            data-testid={fa.id}
            tooltipTitle={fa.label}
            icon={fa.icon}
            onClick={fa.action}
          />
        ))}
      </FloatingActions>
    </SettingsViewContext.Provider>
  );
}

import ErrorMessage from '@components/common/ErrorMessage';
import Loading from '@components/common/Loading';
import { LocalStorageKey } from '@constants';
import useSettings from '@hooks/swr/useSettings';
import { setStorageItem } from '@lib/localStorage';
import { createContext, useCallback } from 'react';

const initialContext: ISettingsContext = {
  settings: {
    endpoint: '',
    environments: [],
  },
  updateEndpoint: () => undefined,
  createEnv: () => undefined,
  updateEnv: () => undefined,
  removeEnv: () => undefined,
};

export const SettingsContext = createContext<ISettingsContext>(initialContext);

export function SettingsContextProvider({ children }: IParent) {
  const { data: settings, isLoading, error, mutate } = useSettings();

  const updateEndpoint = useCallback(
    (url?: string) => {
      if (!settings || !url) {
        return;
      }

      const _settings: Settings = { ...settings, endpoint: url };

      setStorageItem(LocalStorageKey.settings, _settings);
      mutate(_settings);
    },
    [settings, mutate],
  );

  const createEnv = useCallback(
    (env?: Omit<Environment, 'id'>) => {
      if (!settings || !env) {
        return;
      }

      const id = Math.max(...settings.environments.map((e) => e.id)) + 1;

      const _environments = settings.environments.slice().concat([
        {
          id,
          ...env,
        },
      ]);

      const _settings: Settings = {
        endpoint: settings.endpoint,
        environments: _environments,
      };

      setStorageItem(LocalStorageKey.settings, _settings);
      mutate(_settings);
    },
    [settings, mutate],
  );

  const updateEnv = useCallback(
    (env?: Environment) => {
      if (!settings || !env) {
        return;
      }

      const _environments = settings.environments.slice();

      const index = _environments.findIndex((e) => e.id === env.id);

      if (index < 0) {
        return;
      }

      _environments[index] = { ...env };

      const _settings: Settings = {
        endpoint: settings.endpoint,
        environments: _environments,
      };

      setStorageItem(LocalStorageKey.settings, _settings);
      mutate(_settings);
    },
    [settings, mutate],
  );

  const removeEnv = useCallback(
    (id?: number) => {
      if (!settings || id === undefined) {
        return;
      }

      const _environments = settings.environments.filter((e) => e.id !== id);

      const _settings: Settings = {
        endpoint: settings.endpoint,
        environments: _environments,
      };

      setStorageItem(LocalStorageKey.settings, _settings);
      mutate(_settings);
    },
    [settings, mutate],
  );

  if (isLoading) {
    return <Loading float />;
  }

  if (!settings || error) {
    return (
      <ErrorMessage
        message={`We failed to load your settings...`}
        action={{
          label: 'try again',
          onClick: () => mutate(),
        }}
      />
    );
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateEndpoint, createEnv, updateEnv, removeEnv }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

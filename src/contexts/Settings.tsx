import ErrorMessage from '@components/common/ErrorMessage';
import Loading from '@components/common/Loading';
import useSettings from '@hooks/swr/useSettings';
import getEnvUrl from '@lib/getEnvUrl';
import sw from '@msw';
import createHandler from '@msw-handler';
import { createContext, useEffect } from 'react';

const initialContext: ISettingsContext = {
  settings: {
    endpoint: '',
    environments: [],
  },
  updateSettings: async () => undefined,
};

export const SettingsContext = createContext<ISettingsContext>(initialContext);

export function SettingsContextProvider({ children }: IParent) {
  const { data: settings, isLoading, error, mutate } = useSettings();

  useEffect(() => {
    if (!settings) {
      return;
    }

    const routes = settings.environments.map((e) =>
      getEnvUrl(e.url, settings.endpoint, ':key'),
    );

    for (const route of routes) {
      sw.use(...createHandler(route));
    }
  }, [settings]);

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
    <SettingsContext.Provider value={{ settings, updateSettings: mutate }}>
      {children}
    </SettingsContext.Provider>
  );
}

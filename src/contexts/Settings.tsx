import ErrorMessage from '@components/common/ErrorMessage';
import Loading from '@components/common/Loading';
import useSettings from '@hooks/swr/useSettings';
import { createContext } from 'react';

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

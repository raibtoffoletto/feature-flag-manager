import { SettingsContextProvider } from '@contexts/Settings';
import { ThemeProvider } from '@contexts/Theme.tsx';
import { UserContextProvider } from '@contexts/User.tsx';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

export function TestProvider({ children }: IParent) {
  return (
    <MemoryRouter>
      <SWRConfig value={{ provider: () => new Map() }}>
        <ThemeProvider>
          <UserContextProvider>
            <SettingsContextProvider>{children}</SettingsContextProvider>
          </UserContextProvider>
        </ThemeProvider>
      </SWRConfig>
    </MemoryRouter>
  );
}

import { ThemeProvider } from '@contexts/Theme.tsx';
import { UserContextProvider } from '@contexts/User.tsx';
import { SWRConfig } from 'swr';

export function TestProvider({ children }: IParent) {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <ThemeProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}

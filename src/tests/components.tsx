import { ThemeProvider } from '@contexts/Theme.tsx';
import { UserContextProvider } from '@contexts/User.tsx';

export function TestProvider({ children }: IParent) {
  return (
    <ThemeProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </ThemeProvider>
  );
}

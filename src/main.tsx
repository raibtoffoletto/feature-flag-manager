import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@contexts/Theme.tsx';
import { UserContextProvider } from '@contexts/User.tsx';
import sw from '@msw';

await sw.start({
  quiet: true,
});

const root = document.getElementById('root');

if (!root) {
  throw new Error('Entry point not found!');
}

createRoot(root).render(
  <ThemeProvider>
    <UserContextProvider></UserContextProvider>
  </ThemeProvider>,
);

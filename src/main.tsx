import { ThemeProvider } from '@contexts/Theme.tsx';
import { UserContextProvider } from '@contexts/User.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import sw from '@msw';
import Router from '@views/Router';
import { createRoot } from 'react-dom/client';

await sw.start({
  quiet: true,
});

const root = document.getElementById('root');

if (!root) {
  throw new Error('Entry point not found!');
}

createRoot(root).render(
  <ThemeProvider>
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  </ThemeProvider>,
);

import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { UserContextProvider } from '@contexts/User.tsx';
import sw from '@msw';
import App from './App.tsx';

await sw.start({
  quiet: true,
});

const root = document.getElementById('root');

if (!root) {
  throw new Error('Entry point root component not found!');
}

createRoot(root).render(
  <ThemeProvider
    theme={createTheme({
      palette: {
        primary: { main: '#176' },
        secondary: { main: '#536' },
        error: { main: '#C22' },
      },
    })}
  >
    <UserContextProvider>
      <App />
    </UserContextProvider>

    <CssBaseline />
  </ThemeProvider>,
);

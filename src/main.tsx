import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import App from './App.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Entry point root component not found!');
}

createRoot(root).render(
  <ThemeProvider theme={createTheme()}>
    <App />

    <CssBaseline />
  </ThemeProvider>,
);

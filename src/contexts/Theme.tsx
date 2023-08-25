import { ThemeProvider as MuiProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';

export function ThemeProvider({ children }: IParent) {
  return (
    <MuiProvider
      theme={createTheme({
        palette: {
          primary: { main: '#50C' },
          secondary: { main: '#222' },
          error: { main: '#C22' },
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: `
              body {
                padding: 0px 8px 8px 8px;
                display: flex;
                flex-direction: column;
                overflow-x: hidden;
                overflow-y: auto;
                min-height: 100vh;
                align-items: center;
              }

              #root {
                width: 100%;
                max-width: 1200px;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                gap: 16px;
              }
            `,
          },
        },
      })}
    >
      <CssBaseline />

      {children}
    </MuiProvider>
  );
}

import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeModeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const stored = localStorage.getItem('themeMode');
    return stored === 'dark' ? 'dark' : 'light';
  });

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', next);
      return next;
    });
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'dark' ? {
        background: {
          default: '#181c1f',
          paper: '#23272a',
        },
      } : {
        background: {
          default: '#f7f7f7',
          paper: '#fff',
        },
      })
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: 'Cairo, Tahoma, Arial, sans-serif' },
  }), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

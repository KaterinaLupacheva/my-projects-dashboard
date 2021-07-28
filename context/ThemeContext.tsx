import { PaletteType, useMediaQuery } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import { darkTheme, lightTheme } from '../styles/theme';

type ThemeState = {
  themeType: PaletteType;
  setThemeType: (theme: PaletteType) => void;
};
type ThemeProviderProps = { children: React.ReactNode };

const ThemeContext = React.createContext<ThemeState | undefined>(undefined);

function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  //get system preferred color scheme
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeType, setThemeType] = React.useState<PaletteType>(
    prefersDarkMode ? 'dark' : 'light'
  );

  const theme = themeType === 'dark' ? darkTheme : lightTheme;

  const value = { themeType, setThemeType };
  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

function useThemeContext(): ThemeState {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a CountProvider');
  }
  return context;
}

export { ThemeProvider, useThemeContext };

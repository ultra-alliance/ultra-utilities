import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  createTheme,
  type ThemeOptions,
  GlobalStyles,
} from '@mui/material';
import * as React from 'react';

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme: ThemeOptions;
};

/**
 * @name ThemeProvider
 * @param  {ThemeProviderProps} - props for ThemeProvider
 * @returns {React.ReactElement} - React component
 * @constructor ThemeProvider - React component
 * @category ThemeProvider
 * @subcategory ThemeProvider
 * @component
 * @public
 * @example
 * <ThemeProvider theme={theme}>
 *  <p>Hello</p>
 * </ThemeProvider>
 * @see https://mui.com/customization/theming/
 *
 * */

const ThemeProvider = ({
  theme,
  children,
}: ThemeProviderProps): React.ReactElement => {
  const ultraTheme = createTheme(theme);
  return (
    <MuiThemeProvider theme={ultraTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { background: ultraTheme.palette.background.default },
        }}
      />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

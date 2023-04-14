// istanbul ignore file

import { CssBaseline, GlobalStyles } from '@mui/material';
import {
  ThemeProvider as MuiThemeProvider,
  type UltraTheme,
} from '@mui/material/styles';
import * as React from 'react';

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme: UltraTheme;
};

/**
 * @name ThemeProvider
 * @caterory Providers
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
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { background: theme.palette.background.default },
        }}
      />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import {
  createTheme,
  type Theme as MuiTheme,
  type ThemeOptions as MuiThemeOptions,
} from '@mui/material/styles';
import ultraColors from '../colors';
import { type tUltraTheme } from '../types';

declare module '@mui/material/styles' {
  export interface UltraTheme extends MuiTheme, tUltraTheme {}
  export interface UltraThemeOptions extends MuiThemeOptions, tUltraTheme {}

  export function createTheme(options?: UltraThemeOptions): UltraTheme;
  export function useTheme<T = UltraTheme>(): T;
}

export const ultraTheme = createTheme({
  ultra: ultraColors,
  dimensions: {
    drawerWidth: 60,
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: ultraColors.royalAmethyst,
      light: ultraColors.lilacLuster,
      dark: ultraColors.orchidHaze,
    },
    secondary: {
      main: ultraColors.midnightAshes,
      light: ultraColors.royalAmethyst,
      dark: ultraColors.irishEnchantment,
    },
    background: {
      default: ultraColors.midnightAshes,
      paper: ultraColors.midnightAshes,
    },
  },
  shape: {
    borderRadius: 4,
  },
  mixins: {
    toolbar: {
      minHeight: 48,
      width: 80,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: ultraColors.midnightAshes,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: ultraColors.royalAmethyst,
          color: 'white',
          fontWeight: 'bold',
          border: '1px solid',
          borderColor: ultraColors.royalAmethyst,
        },
        arrow: {
          color: ultraColors.royalAmethyst,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {},
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

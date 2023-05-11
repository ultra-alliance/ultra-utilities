/* eslint-disable @typescript-eslint/consistent-type-definitions */

/**
 * Custom Ultra theme module using MUI (Material-UI) library. This module exports an Ultra Theme object with custom theme specifications, including the Ultra color palette, breakpoints, typography, shape, and other MUI components with style overrides.
 *
 * @packageDocumentation
 */

import {
  createTheme,
  type Theme as MuiTheme,
  type ThemeOptions as MuiThemeOptions,
} from '@mui/material/styles';
import ultraColors from '../colors';
import { type tUltraTheme } from '../types';

/**
 * Extends the MuiTheme interface with the custom tUltraTheme interface.
 *
 * @category Theme
 */
declare module '@mui/material/styles' {
  export interface UltraTheme extends MuiTheme, tUltraTheme {}
  export interface UltraThemeOptions extends MuiThemeOptions, tUltraTheme {}

  /**
   * Overrides the default `createTheme` function and returns an UltraTheme object.
   *
   * @param options - Optional UltraThemeOptions object to customize the UltraTheme.
   *
   * @returns An UltraTheme object.
   *
   * @category Theme
   */
  export function createTheme(options?: UltraThemeOptions): UltraTheme;

  /**
   * Overrides the default `useTheme` function and returns a typed UltraTheme object.
   *
   * @returns A typed UltraTheme object.
   *
   * @category Theme
   */
  export function useTheme<T = UltraTheme>(): T;
  export function useTheme<T = UltraTheme>(): T;
}
/**
 * The Ultra Theme object with custom theme specifications.
 *
 * @category Theme
 */
export const ultraTheme = createTheme({
  ultra: ultraColors, // Ultra color palette
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
      paper: ultraColors.charcoalBlack,
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
          backgroundColor: ultraColors.darkSlate,
          color: 'white',
          fontWeight: 'bold',
          border: '1px solid',
          borderColor: '#5e5e5e',
        },
        arrow: {
          color: '#5e5e5e',
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
    MuiAvatar: {
      defaultProps: {
        variant: 'rounded',
      },
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
          background: ultraColors.darkSlate,
          color: 'white',
          fontWeight: 'bold',
        },
      },
    },
  },
});

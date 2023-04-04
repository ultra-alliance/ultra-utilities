import { type tUltraTheme } from '../types';

declare module '@mui/material/styles' {
  type Theme = {} & tUltraTheme;
  // allow configuration using `createTheme`
  type ThemeOptions = {} & tUltraTheme;
}

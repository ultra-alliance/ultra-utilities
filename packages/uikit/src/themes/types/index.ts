import { type ThemeOptions } from '@mui/material';

export type tUltraColors = {
  lilacLuster: string;
  orchidHaze: string;
  royalAmethyst: string;
  irishEnchantment: string;
  midnightAshes: string;
};

export type tUltraTheme = ThemeOptions & {
  dimensions: {
    drawerWidth: number;
  };
  ultra: tUltraColors;
};

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import ultraColors from '../colors';
import { type tUltraTheme } from '../types';

const ultraTheme: tUltraTheme = {
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
};

export default ultraTheme;

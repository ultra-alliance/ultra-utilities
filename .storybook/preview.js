import { create } from '@storybook/theming';
import { addDecorator } from '@storybook/react';
import { ultraColors, ThemeProvider, ultraTheme } from '../packages/uikit/src';
//import { UltraProvider } from '../src/ultrakit';

addDecorator(storyFn => (
  <ThemeProvider theme={ultraTheme}>{storyFn()}</ThemeProvider>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true,
  },

  options: {
    theme: create({
      base: 'dark',

      colorPrimary: ultraColors.royalAmethyst,
      colorSecondary: ultraColors.orchidHaze,

      // UI
      appBg: ultraColors.midnightAshes,
      appContentBg: ultraColors.midnightAshes,
      appBorderColor: 'grey',
      appBorderRadius: 4,

      // Typography
      fontBase: '"Inter, Open Sans", sans-serif',
      fontCode: 'monospace',

      // Text colors
      textColor: 'white',
      textInverseColor: 'rgba(255,255,255,0.9)',

      // Toolbar default and active colors
      barTextColor: 'white',
      barSelectedColor: ultraColors.lilacLuster,
      barBg: ultraColors.midnightAshes,

      // Form colors
      inputBg: ultraColors.midnightAshes,
      inputBorder: 'silver',
      inputTextColor: 'white',
      inputBorderRadius: 4,

      brandTitle: 'Ultra UI Kit',
      brandUrl: 'https://ultra.io',
      brandImage:
        'https://pbs.twimg.com/profile_images/1641936450428993538/3GQFhNyC_200x200.jpg',
      brandTarget: '_self',
    }),
  },
  layout: 'fullscreen',
  backgrounds: {
    default: 'blue',
    disabled: true,
    values: [
      {
        name: 'Dark',
        value: ultraColors.midnightAshes,
      },
      {
        name: 'Light',
        value: ultraColors.lilacLuster,
      },
    ],
  },
};

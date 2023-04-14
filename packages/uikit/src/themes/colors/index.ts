import { type tUltraColors } from '../types';

/**
tUltraColors defines the type of object for the Ultra color palette.
@typedef {Object} tUltraColors
@property {string} lilacLuster - Hexadecimal code for the color Lilac Luster (#C5ABFF).
@property {string} orchidHaze - Hexadecimal code for the color Orchid Haze (#A481F0).
@property {string} royalAmethyst - Hexadecimal code for the color Royal Amethyst (#7A52D1).
@property {string} irishEnchantment - Hexadecimal code for the color Irish Enchantment (#5F4B8B).
@property {string} midnightAshes - Hexadecimal code for the color Midnight Ashes (#3C3846).
@category Theme
@description The ultraColors object exports the Ultra color palette as an object with tUltraColors type.
@example
```tsx
import { ultraColors } from '@ultra-utilities/uikit';
```
*/

const ultraColors: tUltraColors = {
  lilacLuster: '#C5ABFF',
  orchidHaze: '#A481F0',
  royalAmethyst: '#7A52D1',
  irishEnchantment: '#5F4B8B',
  midnightAshes: '#3C3846',
};

export default ultraColors;

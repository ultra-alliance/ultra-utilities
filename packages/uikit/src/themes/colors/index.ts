import { type tUltraColors } from '../types';

/**
tUltraColors defines the type of object for the Ultra color palette.
@typedef {Object} tUltraColors
@property {string} lilacLuster - Hexadecimal code for the color Lilac Luster (#C5ABFF).
@property {string} orchidHaze - Hexadecimal code for the color Orchid Haze (#A481F0).
@property {string} royalAmethyst - Hexadecimal code for the color Royal Amethyst (#7A52D1).
@property {string} irishEnchantment - Hexadecimal code for the color Irish Enchantment (#5F4B8B).
@property {string} midnightAshes - Hexadecimal code for the color Midnight Ashes (#3C3846).
@property {string} blueExperimental - Hexadecimal code for the color localChain (#3EA8DE).
@property {string} pinkStaging- Hexadecimal code for the color Dark Slate (#F95BA5).
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
  midnightAshes: '#302C36',
  darkSlate: '#3C3846',
  charcoalBlack: '#28262c',
  eclipseTwilight: `linear-gradient(180deg, rgba(150,150,150,0.1) 0%, rgba(150,150,150,0) 100%), linear-gradient(180deg, #3c3846 0%,  #3c3846 100%)`,
  blueExperimental: '#3EA8DE',
  pinkStaging: '#F95BA5',
};

export default ultraColors;

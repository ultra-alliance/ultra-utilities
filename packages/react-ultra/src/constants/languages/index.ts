// istanbul ignore file

import { type tLanguage } from '../../models';

/**
 * List of languages
 * @type {tLanguage[]}
 * @constant
 * @default
 * @public
 * @readonly
 * @example
 * import { languages } from '@uta/react-ultra';
 *
 */

const languages: tLanguage[] = [
  {
    code: 'US',
    label: 'English',
  },
  {
    code: 'FR',
    label: 'French',
  },
  {
    code: 'ES',
    label: 'Spanish',
  },
];

export default languages;

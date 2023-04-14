// istanbul ignore file

import { type tLanguage } from '../../models';

/**
 * List of languages
 * @type {tLanguage[]}
 * @category Constants
 * @constant
 * @default
 * @public
 * @readonly
 * @example
 * import { LANGUAGES } from '@ultra-alliance/react-ultra';
 */

const LANGUAGES: tLanguage[] = [
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

export default LANGUAGES;

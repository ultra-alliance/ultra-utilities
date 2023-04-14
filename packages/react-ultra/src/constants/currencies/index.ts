// istanbul ignore file

import { type tCurrency } from '../../models';

/**
 * @description
 * List of currencies supported by the app.
 * @category Constants
 * @type {tCurrency[]}
 * @memberof Constants
 * @constant
 * @name CURRENCIES
 * @example
 * import { CURRENCIES } from '@ultra-utilities/react-ultra';
 */

const CURRENCIES: tCurrency[] = [
  {
    id: 0,
    symbol: 'ᕫ',
    ticker: 'UOS',
    name: 'Ultra',
    native: true,
  },
  {
    id: 1,
    symbol: '$',
    ticker: 'USD',
    name: 'US Dollar',
    native: false,
  },
  {
    id: 2,
    symbol: '€',
    ticker: 'EUR',
    name: 'Euro',
    native: false,
  },
  {
    id: 3,
    symbol: '£',
    ticker: 'GBP',
    name: 'British Pound',
    native: false,
  },
];

export default CURRENCIES;

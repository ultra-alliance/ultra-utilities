// istanbul ignore file

import { type tCurrency } from '../../models';

/**
 * @description
 * List of currencies supported by the app.
 * @type {tCurrency[]}
 * @memberof Constants
 * @constant
 * @name currencies
 * @example
 * import { currencies } from '@ultra-utilities/react-ultra';
 */

const currencies: tCurrency[] = [
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

export default currencies;

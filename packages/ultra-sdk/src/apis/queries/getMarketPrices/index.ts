// istanbul ignore file

import { get } from '../../commons';
import { type tMarketPrices } from '../types';

/**
 * @name getListedUniqs - Get all listed uniqs
 * @category Ultra Queries
 * @param {string} bpApiEndpoint - BP API endpoint
 * @returns {Promise<tGetListedUniqsOutput>} - Listed uniqs
 * @description
 * Returns all listed uniqs
 * @example
 * ```typescript
 * import { getListedUniqs } from '@ultra-alliance/ultra-sdk';
 *
 * const result = await getListedUniqs({})
 * console.log('result', result);
 * ```
 **/

type tCoinGeckoMarketData = {
  market_data: {
    current_price: Record<string, number>;
  };
};

async function getMarketPrices(): Promise<tMarketPrices> {
  const res: tCoinGeckoMarketData = await get({
    path: 'https://api.coingecko.com/api/v3/coins/ultra',
  });
  if (!res?.market_data?.current_price) {
    throw new Error('No market data found');
  }

  return {
    USD: res?.market_data?.current_price?.usd,
    EUR: res?.market_data?.current_price.eur,
    GBP: res?.market_data?.current_price.gbp,
  };
}

export default getMarketPrices;

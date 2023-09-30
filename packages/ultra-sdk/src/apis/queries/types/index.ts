import { type tGetZipContent, type tValidInput } from '../../../utilities';

export type tQueryConfig = {
  json?: boolean;
  lowerBound?: tValidInput;
  upperBound?: tValidInput;
  reverse?: boolean;
  limit?: number;
  key?: tValidInput;
  index_position?: tValidInput;
  show_payer?: boolean;
  key_type?: tValidInput;
};

/**
 * Arguments passed for each ultra query
 * @category Ultra Queries
 */
export type tUltraQuery = {
  bpApiEndpoint?: string;
  config?: tQueryConfig;
};

/**
 * Arguments passed for getAccount
 * @category Ultra Queries
 */
export type tGetAccount = tUltraQuery & {
  accountName: string;
};

/**
 * Arguments passed for getBlock
 * @category Ultra Queries
 */

export type tGetBlock = tUltraQuery & {
  blockNumOrId: number;
};

/**
 * Arguments passed for getAvatar
 * @category Ultra Queries
 */

export type tGetAvatar = tUltraQuery & {
  account: string;
};

/**
 * Arguments passed for getAbi
 * @category Ultra Queries
 */

export type tGetAbi = tUltraQuery & {
  accountName: string;
};

/**
 * Arguments passed for getCurrencyBalance
 * @category Ultra Queries
 */
export type tGetCurrencyBalance = tUltraQuery & {
  code: string;
  account: string;
  symbol: string;
};

/**
 * Arguments passed for getInfo
 * @category Ultra Queries
 */
export type tGetInfo = tUltraQuery;

/**
 * Arguments passed for getTableByScope
 * @category Ultra Queries
 */
export type tGetTableByScope = tUltraQuery & {
  code: string;
};

/**
 * Arguments passed for getTableRows
 * @category Ultra Queries
 */
export type tGetTableRows = tUltraQuery & {
  code: string;
  scope: string;
  table: string;
  key?: tValidInput;
};

/**
 * Arguments passed for getUniqOwned
 * @category Ultra Queries
 */

export type tGetUniqOwned = tUltraQuery & {
  account: string;
};

/**
 * Arguments passed for getUosBalance
 * @category Ultra Queries
 */
export type tGetUosBalance = tUltraQuery & {
  account: string;
};

/**
 * Arguments passed for getFactoryDetail
 * @category Ultra Queries
 */
export type tGetFactory = tUltraQuery & {
  factoryId: tValidInput;
};

/**
 * Arguments passed for getFactoryManifested
 * @category Ultra Queries
 */

export type tGetFactoryManifested = tUltraQuery & {
  factoryId: tValidInput;
  contentToUnzip?: tGetZipContent['contentToUnzip'];
};

export type tMarketPrices =
  | {
      USD: number;
      EUR: number;
      GBP: number;
    }
  | undefined;

import { type tValidInput } from '../../../utilities';

/**
 * Arguments passed for each ultra query
 * @category Ultra Queries
 */
export type tUltraQuery = {
  bpApiEndpoint?: string;
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
  limit: number;
  lowerBound?: tValidInput;
  upperBound?: tValidInput;
};

/**
 * Arguments passed for getTableRows
 * @category Ultra Queries
 */
export type tGetTableRows = tUltraQuery & {
  code: string;
  scope: string;
  table: string;
  limit: number;
  json?: boolean;
  lowerBound?: tValidInput;
  upperBound?: tValidInput;
};

/**
 * Arguments passed for getUniqOwned
 * @category Ultra Queries
 */

export type tGetUniqOwned = tUltraQuery & {
  account: string;
};

/**
 * Arguments passed for getUniqDetail
 * @category Ultra Queries
 */
export type tGetUosBalance = tUltraQuery & {
  account: string;
};

/**
 * Arguments passed for getUniqDetail
 * @category Ultra Queries
 */
export type tGetUniqDetail = tUltraQuery & {
  uniqId: number;
};

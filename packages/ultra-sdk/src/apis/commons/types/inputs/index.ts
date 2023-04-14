import { type tValidInput } from '../../../../utilities';

/**
 * Represents input for `getTableRows` function.
 * @category API Inputs
 */
export type tGetTableRowsInput = {
  [key: string]: unknown;
  code: string;
  scope: string;
  table: string;
  json: boolean;
  limit: number;
};

/**
 * Represents input for `getTableByScope` function.
 * @category API Inputs
 */
export type tGetTableByScopeInput = {
  code: string;
  limit?: number;
  lowerBound?: tValidInput;
  upperBound?: tValidInput;
};

/**
 * Represents input for `getAccount` function.
 * @category API Inputs
 */
export type tGetAccountInput = {
  account_name: string;
};

/**
 * Represents input for `getBlock` function.
 * @category API Inputs
 */
export type tGetBlockInput = {
  block_num_or_id: string;
};

/**
 * Represents input for `getCurrencyBalance` function.
 * @category API Inputs
 */
export type tGetCurrencyBalanceInput = {
  code: string;
  account: string;
  symbol: string;
};

/**
 * Represents input for `getAbi` function.
 * @category API Inputs
 */
export type tGetAbiInput = {
  account_name: string;
};

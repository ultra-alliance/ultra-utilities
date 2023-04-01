import { type tValidInput } from '../../../../utilities';

export type tGetTableRowsInput = {
  [key: string]: unknown;
  code: string;
  scope: string;
  table: string;
  json: boolean;
  limit: number;
};

export type tGetTableByScopeInput = {
  code: string;
  limit?: number;
  lowerBound?: tValidInput;
  upperBound?: tValidInput;
};

export type tGetAccountInput = {
  account_name: string;
};

export type tGetBlockInput = {
  block_num_or_id: string;
};

export type tGetCurrencyBalanceInput = {
  code: string;
  account: string;
  symbol: string;
};

export type tGetAbiInput = {
  account_name: string;
};

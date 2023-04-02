import { type tValidInput } from '../../../utilities';

export type tUltraQuery = {
  bpApiEndpoint?: string;
};

export type tGetAccount = tUltraQuery & {
  accountName: string;
};

export type tGetBlock = tUltraQuery & {
  blockNumOrId: number;
};

export type tGetAbi = tUltraQuery & {
  accountName: string;
};

export type tGetCurrencyBalance = tUltraQuery & {
  code: string;
  account: string;
  symbol: string;
};

export type tGetInfo = tUltraQuery;

export type tGetTableByScope = tUltraQuery & {
  code: string;
  limit: number;
  lowerBound?: tValidInput;
  upperBound?: tValidInput;
};

export type tGetTableRows = tUltraQuery & {
  code: string;
  scope: string;
  table: string;
  limit: number;
  json?: boolean;
  lowerBound?: tValidInput;
  upperBound?: tValidInput;
};

export type tGetUniqOwned = tUltraQuery & {
  account: string;
};

export type tGetUosBalance = tUltraQuery & {
  account: string;
};

export type tGetUniqDetail = tUltraQuery & {
  uniqId: number;
};

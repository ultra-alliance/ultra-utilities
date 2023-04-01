import {
  type tGetAbi,
  type tGetAbiOutput,
  type tGetAccount,
  type tGetAccountOutput,
  type tGetBlock,
  type tGetBlockOutput,
  type tGetCurrencyBalance,
  type tGetCurrencyBalanceOutput,
  type tGetTableByScope,
  type tGetTableByScopeOutput,
  type tGetTableRows,
  type tGetTableRowsOutput,
  type tGetInfoOutput,
} from '../../apis';

export type tUltraOptions = {
  bpApiEndpoint?: string;
};

export type tUltra = {
  bpApiEndpoint: string;
  getAbi: (params: tGetAbi) => Promise<tGetAbiOutput>;
  getAccount: (params: tGetAccount) => Promise<tGetAccountOutput>;
  getBlock: (params: tGetBlock) => Promise<tGetBlockOutput>;
  getCurrencyBalance: (
    params: tGetCurrencyBalance,
  ) => Promise<tGetCurrencyBalanceOutput>;
  getInfo: () => Promise<tGetInfoOutput>;
  getTableByScope: (
    params: tGetTableByScope,
  ) => Promise<tGetTableByScopeOutput>;
  getTableRows: (params: tGetTableRows) => Promise<tGetTableRowsOutput>;
};

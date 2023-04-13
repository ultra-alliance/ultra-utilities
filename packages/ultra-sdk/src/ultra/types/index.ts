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
  type tGetListedUniqsOutput,
  type tUniq,
  type tGetUniqOwnedOutput,
} from '../../apis';
import { type tValidInput } from '../../utilities/interfaces/index';

export type tUltraOptions = {
  bpApiEndpoint?: string;
};

export type tUltra = {
  bpApiEndpoint: string;
  getAbi: (params: tGetAbi) => Promise<tGetAbiOutput>;
  getAccount: (params: tGetAccount) => Promise<tGetAccountOutput | undefined>;
  getBlock: (params: tGetBlock) => Promise<tGetBlockOutput>;
  getCurrencyBalance: (
    params: tGetCurrencyBalance,
  ) => Promise<tGetCurrencyBalanceOutput>;
  getInfo: () => Promise<tGetInfoOutput>;
  getTableByScope: (
    params: tGetTableByScope,
  ) => Promise<tGetTableByScopeOutput>;
  getTableRows: (params: tGetTableRows) => Promise<tGetTableRowsOutput>;
  getListedUniqs: () => Promise<tGetListedUniqsOutput>;
  getUniqDetail: (uniqId: tValidInput) => Promise<tUniq>;
  getUniqsOwned: (account: string) => Promise<tGetUniqOwnedOutput>;
  getUosBalance: (account: string) => Promise<tGetCurrencyBalanceOutput>;
};

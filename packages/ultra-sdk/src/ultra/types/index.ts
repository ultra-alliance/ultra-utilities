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
/**
 * Defines the options object for the `Ultra` object.
 */
export type tUltraOptions = {
  bpApiEndpoint?: string;
};

/**
 * Defines the interface for the `Ultra` object.
 *
 * @category Ultra
 * @property {string} bpApiEndpoint - The URL for the BP API endpoint.
 * @property {Function} getAbi - The method to get ABI.
 * @property {Function} getAccount - The method to get account.
 * @property {Function} getBlock - The method to get block.
 * @property {Function} getCurrencyBalance - The method to get currency balance.
 * @property {Function} getInfo - The method to get info.
 * @property {Function} getTableByScope - The method to get table by scope.
 * @property {Function} getTableRows - The method to get table rows.
 * @property {Function} getListedUniqs - The method to get listed uniques.
 * @property {Function} getUniqDetail - The method to get unique detail.
 * @property {Function} getUniqsOwned - The method to get owned uniques.
 * @property {Function} getUosBalance - The method to get UOS balance.
 */
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

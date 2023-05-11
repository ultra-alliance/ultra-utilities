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
  type tFactory,
  type tFactoryManifested,
  type tUltraQuery,
  type tMarketPrices,
  type tListedUniq,
  type tTokenA,
} from '../../apis';
import { type tValidInput } from '../../utilities/interfaces/index';
/**
 * Defines the options object for the `Api` class.
 */
export type tApiOptions = {
  bpApiEndpoint?: string;
};

/**
 * Defines the interface for the `Api` object.
 *
 * @category API
 * @property {string} bpApiEndpoint - The URL for the BP API endpoint.
 * @property {Function} getAbi - The method to get ABI.
 * @property {Function} getAccount - The method to get account.
 * @property {Function} getBlock - The method to get block.
 * @property {Function} getCurrencyBalance - The method to get currency balance.
 * @property {Function} getInfo - The method to get info.
 * @property {Function} getTableByScope - The method to get table by scope.
 * @property {Function} getTableRows - The method to get table rows.
 * @property {Function} getListedUniqs - The method to get listed uniques.
 * @property {Function} getFactoryDetail - The method to get unique detail.
 * @property {Function} getUniqsOwned - The method to get owned uniques.
 * @property {Function} getUosBalance - The method to get UOS balance.
 * @property {Function} getFactoryManifested- The method to get a manifested factory.
 * @property {Function} getMarketPrices - The method to get market prices.
 */
export type tApi = {
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
  getTableRows: <TRow>(
    params: tGetTableRows,
  ) => Promise<tGetTableRowsOutput<TRow>>;
  getListedUniqs: (
    params: tUltraQuery,
  ) => Promise<tGetTableRowsOutput<tListedUniq>>;
  getFactoryDetail: (factoryId: tValidInput) => Promise<tFactory>;
  getUniqsOwned: (account: string) => Promise<tGetTableRowsOutput<tTokenA>>;
  getUosBalance: (account: string) => Promise<tGetCurrencyBalanceOutput>;
  getFactoryManifested: (factoryId: tValidInput) => Promise<tFactoryManifested>;
  updateBpApiEndpoint: (bpApiEndpoint: string) => void;
  getMarketPrices: () => Promise<tMarketPrices>;
};

// istanbul ignore file

import {
  getAbi,
  getAccount,
  getBlock,
  getCurrencyBalance,
  getInfo,
  getTableByScope,
  getTableRows,
  getUosBalance,
  getUniqsOwned,
  getFactory,
  getListedUniqs,
  getFactoryManifested,
  getMarketPrices,
  getFactories,
  getAvatar,
  DEFAULT_BP_API_ENDPOINT,
  type tGetAbi,
  type tGetBlock,
  type tGetAccount,
  type tGetAccountOutput,
  type tGetAbiOutput,
  type tGetBlockOutput,
  type tGetCurrencyBalance,
  type tGetCurrencyBalanceOutput,
  type tGetTableByScope,
  type tGetTableByScopeOutput,
  type tGetTableRows,
  type tGetTableRowsOutput,
  type tGetInfoOutput,
  type tGetAvatarOutput,
  type tFactory,
  type tFactoryManifested,
  type tUltraQuery,
  type tMarketPrices,
  type tTokenA,
  type tListedUniq,
  type tQueryConfig,
} from '../../../apis';
import { type tGetZipContent, type tValidInput } from '../../../utilities';
import { type tApi, type tApiOptions } from '../../types';

/**
 * @category API
 * @name Api
 * @param {tApiOptions} options - bp api endpoint
 * @returns {tApi} - Api class
 * @description  Api class providing methods to interact with the Ultra blockchain.
 * @example
 * ```typescript
 * import { Api } from '@ultra-alliance/ultra-sdk';
 *
 * const api = new Api({
 *     bpApiEndpoint: 'https://api.com',
 * });
 * ```
 **/

class Api implements tApi {
  bpApiEndpoint: string;

  constructor(options: tApiOptions) {
    this.bpApiEndpoint = options.bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT;
  }

  /**
   * @type {function}
   * @param {tGetAbi} params - account name
   * @returns {Promise<tGetAbiOutput>} - abi
   * @description Retrieve the ABI for an account.
   * @group Commons
   **/

  public async getAbi(params: tGetAbi): Promise<tGetAbiOutput> {
    const data = await getAbi({
      ...params,
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Account ${params.accountName} not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @param {tGetAccount} params - account name
   * @returns {Promise<tGetAccountOutput>} - account
   * @description Retrieve an account.
   * @group Commons
   * */

  public async getAccount(
    params: tGetAccount,
  ): Promise<tGetAccountOutput | undefined> {
    try {
      const data = await getAccount({
        ...params,
        bpApiEndpoint: this.bpApiEndpoint,
      });
      if (!data) {
        throw new Error(`Account ${params.accountName} not found`);
      }

      return data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * @type {function}
   * @param {tGetBlock} params - block number or id
   * @returns {Promise<tGetBlockOutput>} - block
   * @description Retrieve a block.
   * @group Commons
   * */

  public async getBlock(params: tGetBlock): Promise<tGetBlockOutput> {
    const data = await getBlock({
      ...params,
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Block ${params.blockNumOrId} not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @param {tGetTableRows} params - table name, scope, code, limit, lower bound, upper bound
   * @returns {Promise<tGetTableRowsOutput>} - table rows
   * @description Retrieve rows from a table.
   * @group Commons
   * */

  public async getCurrencyBalance(
    params: tGetCurrencyBalance,
  ): Promise<tGetCurrencyBalanceOutput> {
    const data = await getCurrencyBalance({
      ...params,
      bpApiEndpoint: this.bpApiEndpoint,
    });

    if (!data) {
      throw new Error(`Account ${params.account} not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @returns {Promise<tGetInfoOutput>} - info
   * @description Retrieve info.
   * @group Commons

   * */

  public async getInfo(): Promise<tGetInfoOutput> {
    const data = await getInfo({
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Info not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @param {tGetTableByScope} params - code, table, scope, limit, lower bound, upper bound
   * @returns {Promise<tGetTableByScopeOutput>} - table by scope
   * @description Retrieve a table by scope.
   *    @group Commons
   * */

  public async getTableByScope(
    params: tGetTableByScope,
  ): Promise<tGetTableByScopeOutput> {
    const data = await getTableByScope({
      ...params,
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Scope ${params.code} not found`);
    }

    return data;
  }

  /**
   *  @type {function}
   *  @param {tGetTableRows} params - table name, scope, code, limit, lower bound, upper bound
   * @returns {Promise<tGetTableRowsOutput>} - table rows
   * @description Retrieve rows from a table.
   *    @group Commons
   * */

  public async getTableRows<TRow>(
    params: tGetTableRows,
  ): Promise<tGetTableRowsOutput<TRow>> {
    const data = await getTableRows<TRow>({
      ...params,
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Table ${params.table} not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @param {tGetTransaction} params - transaction id
   * @returns {Promise<tGetCurrencyBalanceOutput>} - transaction
   * @description Retrieve a transaction.
   * */

  public async getUosBalance(
    account: string,
  ): Promise<tGetCurrencyBalanceOutput> {
    const data = await getUosBalance({
      account,
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Account ${account} not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @returns {Promise<tGetUniqsOutput>} - uniqs
   * @group Uniqs
   * @description Retrieve uniqs.
   * */

  public async getUniqsOwned(
    account: string,
  ): Promise<tGetTableRowsOutput<tTokenA>> {
    const data = await getUniqsOwned({
      account,
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Account ${account} not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @param {tValidInput} uniqId - factory id
   * @returns {Promise<tFactory>} - factory
   *   * @group Factories
   * @description
   * Retrieve factory.
   * */

  public async getFactory(factoryId: tValidInput): Promise<tFactory> {
    const data = await getFactory({
      factoryId: Number(factoryId),
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Factory ${factoryId} not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @param {tUltraQuery} params - query params
   * @returns {Promise<tGetListedUniqsOutput>} - uniqs
   * @description Retrieve uniqs listed as ready to sell.
   * @group Uniqs
   **/

  public async getListedUniqs(
    params: tUltraQuery,
  ): Promise<tGetTableRowsOutput<tListedUniq>> {
    const data = await getListedUniqs({
      bpApiEndpoint: this.bpApiEndpoint,
      ...params,
    });
    if (!data) {
      throw new Error(`Listed uniqs not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @param {tValidInput} factoryId - factoryId id
   * @returns {Promise<tUniqManifested>} - factoryId
   * @description Retrieve factoryId manifested.
   * @group Uniqs
   * */

  public async getFactoryManifested(
    factoryId: tValidInput,
    contentToUnzip?: tGetZipContent['contentToUnzip'],
  ): Promise<tFactoryManifested> {
    const data = await getFactoryManifested({
      factoryId: Number(factoryId),
      contentToUnzip,
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Uniq not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @param {string} bpApiEndpoint -  the new block producer api endpoint
   * @returns {void}
   * @description Update the block producer api endpoint.
   */
  public updateBpApiEndpoint(bpApiEndpoint: string): void {
    this.bpApiEndpoint = bpApiEndpoint;
  }

  /**
   * @type {function}
   * @description Retrieve market prices.
   * @returns {Promise<tMarketPrices>} - market prices
   * */

  public async getMarketPrices(): Promise<tMarketPrices> {
    const data = await getMarketPrices();
    if (!data) {
      throw new Error(`Market prices not found`);
    }

    return data;
  }

  /**
   * @type {function} - getFactories
   * @description Retrieve factories.
   * @returns {Promise<tFactory[]>} - factories
   * */

  public async getFactories(config?: tQueryConfig): Promise<tFactory[]> {
    const data = await getFactories({
      bpApiEndpoint: this.bpApiEndpoint,
      config,
    });

    if (!data) {
      throw new Error(`Factories not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @description Get the Avatar of an account.
   * @param {string} account - account name
   * @returns {Promise<tGetAvatarOutput>} -
   * */

  public async getAvatar(account: string): Promise<tGetAvatarOutput> {
    const data = await getAvatar({
      account,
      bpApiEndpoint: this.bpApiEndpoint,
    });

    if (!data) {
      throw new Error(`Avatar not found`);
    }

    return data;
  }
}

export default Api;

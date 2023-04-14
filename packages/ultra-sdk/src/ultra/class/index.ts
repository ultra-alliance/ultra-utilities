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
  getUniqDetail,
  getListedUniqs,
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
  type tGetListedUniqsOutput,
  type tGetUniqOwnedOutput,
  type tUniq,
} from '../../apis';
import { type tValidInput } from '../../utilities/interfaces/index';
import { type tUltra, type tUltraOptions } from '../types';

/**
 * @category Ultra
 * @name Ultra
 * @param {tUltraOptions} options - bp api endpoint
 * @returns {tUltra} - Ultra class
 * @description  Ultra class providing methods to interact with the Ultra blockchain.
 * @example
 * ```typescript
 * import { Ultra, getUniqsOwned, getListedUniqs } from '@ultra-alliance/ultra-sdk';
 *
 * const ultra = new Ultra({
 *     bpApiEndpoint: 'https://api.com',
 * });
 * ```
 **/

class Ultra implements tUltra {
  private readonly _bpApiEndpoint: string;

  constructor(options: tUltraOptions) {
    this._bpApiEndpoint = options.bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT;
  }

  /**
   * @type {string}
   * @description The URL for the BP API endpoint.
   * */

  get bpApiEndpoint(): string {
    return this._bpApiEndpoint;
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

  public async getTableRows(
    params: tGetTableRows,
  ): Promise<tGetTableRowsOutput> {
    const data = await getTableRows({
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

  public async getUniqsOwned(account: string): Promise<tGetUniqOwnedOutput> {
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
   * @param {tValidInput} uniqId - uniq id
   * @returns {Promise<tUniq>} - uniq
   *   * @group Uniqs
   * @description
   * Retrieve uniq.
   * */

  public async getUniqDetail(uniqId: tValidInput): Promise<tUniq> {
    const data = await getUniqDetail({ uniqId: Number(uniqId) });
    if (!data) {
      throw new Error(`Uniq ${uniqId} not found`);
    }

    return data;
  }

  /**
   * @type {function}
   * @returns {Promise<tGetListedUniqsOutput>} - uniqs
   * @description Retrieve uniqs listed as ready to sell.
   * @group Uniqs
   **/

  public async getListedUniqs(): Promise<tGetListedUniqsOutput> {
    const data = await getListedUniqs();
    if (!data) {
      throw new Error(`Listed uniqs not found`);
    }

    return data;
  }
}

export default Ultra;

import {
  getAbi,
  getAccount,
  getBlock,
  getCurrencyBalance,
  getInfo,
  getTableByScope,
  getTableRows,
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
} from '../../apis';
import { type tUltra, type tUltraOptions } from '../types';

/*
 * @name Ultra
 * @param {tUltraOptions} options - bp api endpoint
 * @returns {tUltra} - Ultra class
 * @description Ultra class
 * @example
 * ```typescript
 * import { Ultra } from '@ultra-alliance/ultra-sdk';
 *
 * const ultra = new Ultra({
 *     bpApiEndpoint: 'https://api.ultrain.io',
 * });
 * ```
 */

class Ultra implements tUltra {
  private readonly _bpApiEndpoint: string;

  constructor(options: tUltraOptions) {
    this._bpApiEndpoint = options.bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT;
  }

  get bpApiEndpoint(): string {
    return this._bpApiEndpoint;
  }

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

  public async getAccount(params: tGetAccount): Promise<tGetAccountOutput> {
    const data = await getAccount({
      ...params,
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Account ${params.accountName} not found`);
    }

    return data;
  }

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

  public async getInfo(): Promise<tGetInfoOutput> {
    const data = await getInfo({
      bpApiEndpoint: this.bpApiEndpoint,
    });
    if (!data) {
      throw new Error(`Info not found`);
    }

    return data;
  }

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
}

export default Ultra;

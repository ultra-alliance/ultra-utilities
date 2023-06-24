/* eslint-disable @typescript-eslint/consistent-type-definitions */
// istanbul ignore file
import { Account, type tExt } from '../../../account';
import { Api, DEFAULT_BP_API_ENDPOINT } from '../../../apis';
import { CHAINS } from '../../../constants';
import { getNetwork } from '../../../utilities';
import {
  type tChain,
  type tChainName,
  type tUltra,
  type tUltraOptions,
} from '../../types';

/**
 * @category Ultra
 * @name Ultra
 * @param {tUltraOptions} options - ultra class options
 * @returns {tUltra} - Ultra class
 * @description  Ultra class providing api & account object.
 * @example
 * ```typescript
 * import { Ultra, getUniqsOwned, getListedUniqs } from '@ultra-alliance/ultra-sdk';
 *
 * const ultra = new Ultra({
 *     bpApiEndpoint: 'https://api.com',
 * });
 * ```
 **/
declare global {
  interface Window {
    ultra: any;
  }
}

let window: Window;

class Ultra implements tUltra {
  api: Api;
  account: Account;

  private _chain: tChain;

  constructor(options: tUltraOptions) {
    this.init(options);
  }

  get chain(): tChain {
    return this._chain;
  }

  init(options: tUltraOptions) {
    this.api = new Api({
      bpApiEndpoint: options.bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT,
    });
    this.account = new Account({
      ext: options.extension ?? (window?.ultra as tExt),
      api: this.api,
    });

    this._chain = getNetwork(options.bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT);
  }

  public async changeChain(chainName: tChainName): Promise<tChain> {
    const chain = CHAINS[chainName];

    this.api.updateBpApiEndpoint(chain.bpApiEndpoint);
    await this.account.changeChain(chainName);

    this._chain = chain;
    return chain;
  }

  public async getNetwork(): Promise<tChain> {
    return this.chain;
  }
}

export default Ultra;

/* eslint-disable @typescript-eslint/consistent-type-definitions */
// istanbul ignore file
import { Account, type tExt } from '../../../account';
import { Api, DEFAULT_BP_API_ENDPOINT } from '../../../apis';
import { type tUltra, type tUltraOptions } from '../../types';

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

  constructor(options: tUltraOptions) {
    this.init(options);
  }

  init(options: tUltraOptions) {
    this.api = new Api({
      bpApiEndpoint: options.bpApiEndpoint ?? DEFAULT_BP_API_ENDPOINT,
    });
    this.account = new Account({
      ext: options.extension ?? (window?.ultra as tExt),
      api: this.api,
    });
  }
}

export default Ultra;

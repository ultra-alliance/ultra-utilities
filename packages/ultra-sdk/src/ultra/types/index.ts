import { type Account } from '../../account';
import { type tExt } from '../../account';
import { type Api } from '../../apis';

/**
 * Defines the options object for the `Ultra` object.
 */
export type tUltraOptions = {
  bpApiEndpoint?: string;
  extension?: tExt;
};

/**
 * Defines the interface for the `Ultra` object.
 *
 * @category Ultra
 * @property {Api} api - The API object.
 * @property {Account} Account - The Account object.

 */
export type tUltra = {
  api: Api;
  account: Account;
  init(options: tUltraOptions): void;
  changeChain(chainName: tChainName): Promise<tChain>;
};

export type tChain = {
  id: number;
  name: string;
  bpApiEndpoint: string;
  blockExplorerUrl?: string;
  type: tChainName;
};

export type tChainName = 'MAINNET' | 'TESTNET' | 'LOCAL';

export type tChainRecord = Record<tChainName, tChain>;

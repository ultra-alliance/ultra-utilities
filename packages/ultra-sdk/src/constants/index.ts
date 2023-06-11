import {
  DEFAULT_TESTNET_BP_API_ENDPOINT,
  DEFAULT_BP_API_ENDPOINT,
} from '../apis';
import { type tChainRecord } from '../ultra';

/**
 * @category Utils
 * @description
 * Constants related to links.
 * @remarks
 * These links are used throughout the package to provide easy access to important
 * resources and documentation related to the Ultra platform.
 */
export const LINKS = {
  /**
   * Link to download the Ultra wallet extension.
   */

  DOWNLOAD_WALLET:
    'https://chrome.google.com/webstore/detail/ultra-wallet/kjjebdkfeagdoogagbhepmbimaphnfln',
  /**
   * Link to download the Ultra Dev wallet extension.
   */
  DOWNLOAD_DEV_WALLET:
    'https://docs.ultra.io/blockchain/#/docs/ultra-wallet-extension/000_installing-extension',
  /**
   * Link to Ultra Download page.
   */
  DOWNLOAD_ULTRA: 'https://ultra.io/download',
  /**
   * Link to Ultra Is Life website.
   */
  ULTRA_IS_LIFE: 'https://ultraislife.com',

  /**
   * Link to Ultra times
   */
  ULTRA_TIMES: 'https://ultratimes.io',

  /**
   * Link to Ultra website.
   */
  ULTRA: 'https://ultra.io',

  /**
   * Link to Ultra documentation.
   */
  ULTRA_DOCS: 'https://docs.ultra.io/blockchain',

  /**
   * Link to Ultra Block Explorer
   */
  ULTRA_EXPLORER: 'https://explorer.mainnet.ultra.io',

  ULTRA_TESTNET_EXPLORER: 'https://explorer.testnet.ultra.io',

  /**
   * Link to Ultra Faucet
   */

  ULTRA_FAUCET: 'https://faucet.testnet.app.ultra.io',
};

export const CHAINS: tChainRecord = {
  MAINNET: {
    id: 0,
    name: 'mainnet',
    bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
    blockExplorerUrl: LINKS.ULTRA_EXPLORER,
    type: 'MAINNET',
  },
  TESTNET: {
    id: 1,
    name: 'testnet',
    bpApiEndpoint: DEFAULT_TESTNET_BP_API_ENDPOINT,
    blockExplorerUrl: LINKS.ULTRA_TESTNET_EXPLORER,
    type: 'TESTNET',
  },

  LOCAL: {
    id: 2,
    name: 'local',
    bpApiEndpoint: 'http://localhost:8888',
    type: 'LOCAL',
  },
};

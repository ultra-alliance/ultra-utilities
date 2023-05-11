/* istanbul ignore file */

/**
 * <img alt='' src='https://img.shields.io/badge/NOT PUBLISHED-100000?style=for-the-badge&logo=&logoColor=e57373&labelColor=FFFFFF&color=e57373'/>
 * @license MIT
 * @module ultra-sdk
 * @description
 * This module includes various enumerations, classes, and type aliases that facilitate the communication with the blockchain, such as authentication, tokenization, and smart contract interaction. It also provides a set of HTTP functions, formatters, and other utilities that streamline the development of UOS-connected applications.
 *
 * ## ⚙️ Quick Start
 *
 * You can install the package by running the following command:
 * ```bash
 * npm install @ultra-alliance/ultra-sdk
 * ```
 *
 * Then you can import functions, and classes from the SDK in your project:
 * ```typescript
 * import { getBlock, Ultra } from '@ultra-alliance/ultra-sdk';
 * ```
 *
 * ## 🚀 Usage
 *
 * If all methods are exported by the package, we also provide a {@link Ultra} class that allows you to instantiate a new Ultra instance with a given `bpApiEndpoint` (default will be {@link DEFAULT_BP_API_ENDPOINT}). This class is a wrapper of the SDK functions.
 *
 * ```typescript
 * import { Ultra } from '@ultra-alliance/ultra-sdk';
 *
 * const ultra = new Ultra({
 *  bpApiEndpoint: 'https://api.ultra.eossweden.org',
 * });
 *
 * ultra.api.getAccount("aaa1bbb2ccc3").then((account) => {
 *   console.log(account);
 * });
 *
 * ```
 *
 * This SDK provides a set of functions, formatters and utils that allow you to interact with the blockchain, among others:
 *
 * ### Classes
 * - {@link Ultra} to instantiate a new Ultra instance implementing instances of {@link Api} and {@link Account}
 *
 * ### APIs
 * - {@link getUosBalance} to get the UOS balance of an account
 * - {@link getBlock} to get a block by its number
 * - {@link getAccount} to get an account-detail by its name
 * - {@link getAbi} to get the ABI of a smart contract
 * - {@link getTableRows} to get the rows of a table
 * - {@link getFactoryDetail} to get the details of a factory
 * - {@link getUniqsOwned} to get the uniqs owned by an account
 * - {@link getInfo} to get the blockchain info
 * - {@link getListedUniqs} to get the uniqs listed on the marketplace
 *
 * ### Utilities
 * - {@link getZipContent} to get the content of a zip file and read the Uniq manifest
 *
 * ### Calculations
 * - {@link calcTotalPrice} to calculate the price value of a currency for a given amount in a given base price.
 *
 * ### Formatters
 * - {@link formatUosBalance} to format a UOS balance
 * - {@link formatName} to format a name (eg: aa1...cc3)
 * - {@link formatCurrencyValue} to format a currency value
 */

export * from './utilities';
export * from './apis';
export * from './ultra';
export * from './auth';
export * from './constants';
export * from './account';

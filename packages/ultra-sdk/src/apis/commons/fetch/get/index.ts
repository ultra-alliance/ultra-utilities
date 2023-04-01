import { type tGet } from '../../types/commons';
import http from '../http';

/**
 * @name get
 * @category API
 * @param {string} path - The path to the API endpoint
 * @param {object} config - The config object to pass to the fetch API
 * @returns {Promise} - The response from the API
 * @description
 * This function is used to make a GET request to the API.
 * It is a wrapper around the http function.
 * @example
 * ```typescript
 * import { get } from '@ultra-alliance/ultra-sdk';
 *
 * const response = await get({
 *  path: '/example',
 *  config: {},
 * });
 *
 * console.log(response);
 * ```
 */
async function get<T>({ path, config }: tGet): Promise<T> {
  const init = { method: 'GET', ...config };
  const res = (await http({
    path,
    config: init,
  })) as Promise<T>;
  return res;
}

export default get;

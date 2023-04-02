import { type tHttp } from '../../types/commons';

/**
 * @name http
 * @category API
 * @param {string} path - The path to the resource.
 * @param {object} config - The configuration object.
 * @returns {Promise} - The response object.
 * @description
 * This function is a wrapper for the fetch api.
 * @example
 * http({
 *  path: 'https://jsonplaceholder.typicode.com/todos/9999999',
 * config: {},
 * })
 * .then((response) => {
 * console.log(response);
 * })
 * .catch((error) => {
 * console.log(error);
 * });
 * @example
 * const response = await http({
 * path: 'https://jsonplaceholder.typicode.com/todos/9999999',
 * config: {},
 * });
 * console.log(response);
 */

async function http<T>({ path, config }: tHttp): Promise<T> {
  const response = await fetch(path, config);
  if (!response?.ok) {
    throw new Error(`${response.statusText}`);
  }

  const body = (await response.json()) as T;

  return body;
}

export default http;

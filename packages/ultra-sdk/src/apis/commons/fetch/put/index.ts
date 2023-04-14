import { type tPut } from '../../types/commons';
import http from '../http';

/**
 * @name put - PUT request
 * @category API Commons
 * @param {tPut} params - The request parameters
 * @returns {Promise} - A promise that resolves to the response body
 * @description
 * This function is a wrapper for the fetch API.
 * It is used to make a PUT request to the API.
 * It returns a promise that resolves to the response body.
 * If the response is not ok, it throws an error.
 * @example
 * import put from '@ultra-sdk/api/commons/fetchApi/put';
 *
 * const response = await put<{ body: string }, { data: string }>({
 *  path: '/example',
 *  body: { body: 'example body' },
 *  config: {},
 * });
 * console.log(response);
 * // { data: 'example data' }
 * @example
 * import put from '@ultra-sdk/api/commons/fetchApi/put';
 *
 * put<{ body: string }, { data: string }>({
 *    path: '/example',
 *    body: { body: 'example body' },
 *    config: {}
 * }).then(response => {
 *      console.log(response);
 *      // { data: 'example data' }
 * }).catch(error => {
 *      console.log(error);
 * });
 *
 */

async function put<T, U>({ path, body, config }: tPut<T>): Promise<U> {
  const init: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(body),
    ...config,
  };
  const res = await http<U>({
    path,
    config: init,
  });
  return res;
}

export default put;

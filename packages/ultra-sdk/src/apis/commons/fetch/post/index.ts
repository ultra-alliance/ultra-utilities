import { type tPost } from '../../types/commons';
import http from '../http';

/**
 * @name post
 * @category API Commons
 * @param {tPost} params - The parameters for the POST request
 * @returns {Promise} - The response from the server
 * @description This function is used to make a POST request to the server.
 * It is a wrapper around the fetch API.
 * @example
 * ```typescript
 * import { post } from '@ultra-alliance/ultra-sdk';
 *
 * const response = await post({
 *   path: '/example',
 *   body: {
 *     example: 'example',
 *    },
 *   config: {},
 *  });
 * console.log(response);
 * ```
 */
async function post<T, U>({ path, body, config }: tPost<T>): Promise<U> {
  const init: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
    ...config,
  };
  const res = await http<U>({
    path,
    config: init,
  });
  return res;
}

export default post;

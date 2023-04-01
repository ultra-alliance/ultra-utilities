import { type tUltraError } from '../types/commons';

/**
 * @name handleUltraError - Handle errors returned by the Ultra API
 * @param {Promise} promise - A promise that may return an error
 * @returns {Promise} - A promise that will return the result of the original promise or throw an error
 * @example
 * ```typescript
 * import { handleUltraError } from '@ultra-alliance/ultra-sdk';
 *
 * const result = await handleUltraError(promise);
 * ```
 * @description
 * This function is used to handle errors returned by the Ultra API. It will throw an error if the promise is rejected.
 * If the promise is rejected with an error that has a code of 404, it will throw an error with a message of "The resource you requested was not found.".
 * If the promise is rejected with an error that has a code of 401, it will throw an error with a message of "You are not authorized to access this resource.".
 * If the promise is rejected with an error that has a code that is not 404 or 401, it will throw an error with a message of "An error occurred: {error.message}".
 * ```
 */

async function handleUltraError<T>(promise: Promise<T>): Promise<T> {
  return promise.catch((error: tUltraError) => {
    if (error.code === 404) {
      // Handle 404 Not Found errors
      throw new Error(`The resource you requested was not found.`);
    } else if (error.code === 401) {
      // Handle 401 Unauthorized errors
      throw new Error(`You are not authorized to access this resource.`);
    } else {
      // Handle all other errors
      console.error(`An error occurred: ${error.message}`);
      throw new Error(`An error occurred: ${error.message}`);
    }
  });
}

export default handleUltraError;

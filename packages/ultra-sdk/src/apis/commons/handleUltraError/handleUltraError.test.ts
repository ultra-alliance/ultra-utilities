import { type tUltraError } from '../types/commons';
import handleUltraError from './index';

describe('handleUltraError', () => {
  it('should handle a 404 error', async () => {
    const error = { code: 404, message: 'Not found' };
    const promise = Promise.reject(error);
    await expect(handleUltraError(promise)).rejects.toThrow(
      'The resource you requested was not found.',
    );
  });

  it('should handle a 401 error', async () => {
    const error = { code: 401, message: 'Unauthorized' };
    const promise = Promise.reject(error);
    await expect(handleUltraError(promise)).rejects.toThrow(
      'You are not authorized to access this resource.',
    );
  });

  it('should handle other errors', async () => {
    const error: tUltraError = {
      name: 'Internal Server Error',
      code: 500,
      message: 'Internal Server Error',
    };
    const promise = Promise.reject(error);
    await expect(handleUltraError(promise)).rejects.toThrow(
      'An error occurred: Internal Server Error',
    );
  });

  it('should not modify a successful promise', async () => {
    const result = 'Hello, world!';
    const promise = Promise.resolve(result);
    await expect(handleUltraError(promise)).resolves.toBe(result);
  });
});

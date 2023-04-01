import get from './index';

describe('get', () => {
  beforeEach(() => {
    // Clear fetch mock before each test
    jest.resetAllMocks();
  });

  it('should fetch and return data for a successful request', async () => {
    // Mock a successful response from the fetch API
    const mockJsonResponse = { data: 'example data' };
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(mockJsonResponse),
      }),
    ) as jest.Mock;

    // Call the get function and assert that the expected data is returned
    const response = await get<{ data: string }>({
      path: '/example',
      config: {},
    });
    expect(response).toEqual(mockJsonResponse);

    // Assert that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('/example', { method: 'GET' });
  });

  it('should throw an error for a failed request', async () => {
    // Mock a failed response from the fetch API
    global.fetch = jest.fn(async () =>
      Promise.resolve({ ok: false, statusText: 'Not Found' }),
    ) as jest.Mock;

    // Call the get function and assert that it throws an error
    await expect(get({ path: '/example' })).rejects.toThrow('Not Found');

    // Assert that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('/example', { method: 'GET' });
  });

  it('should include custom headers in the request', async () => {
    // Mock a successful response from the fetch API
    const mockJsonResponse = { data: 'example data' };
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(mockJsonResponse),
      }),
    ) as jest.Mock;

    // Call the get function with custom headers and assert that the headers are included in the request
    const headers = { Authorization: 'Bearer myToken' };
    const response = await get({ path: '/example', config: { headers } });
    expect(response).toEqual(mockJsonResponse);

    // Assert that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('/example', { method: 'GET', headers });
  });
});

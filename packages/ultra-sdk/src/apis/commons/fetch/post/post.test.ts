import post from './index';

describe('post', () => {
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

    // Call the post function and assert that the expected data is returned
    const response = await post<{ body: string }, { data: string }>({
      path: '/example',
      body: { body: 'example body' },
      config: {},
    });
    expect(response).toEqual(mockJsonResponse);

    // Assert that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('/example', {
      method: 'POST',
      body: '{"body":"example body"}',
    });
  });

  it('should throw an error for a failed request', async () => {
    // Mock a failed response from the fetch API
    global.fetch = jest.fn(async () =>
      Promise.resolve({ ok: false, statusText: 'Not Found' }),
    ) as jest.Mock;

    // Call the post function and assert that it throws an error
    await expect(
      post<{ body: string }, { data: string }>({
        path: '/example',
        body: { body: 'example body' },
        config: {},
      }),
    ).rejects.toThrow('Not Found');

    // Assert that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('/example', {
      method: 'POST',
      body: '{"body":"example body"}',
    });
  });

  it('should include custom headers and config in the request', async () => {
    // Mock a successful response from the fetch API
    const mockJsonResponse = { data: 'example data' };
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(mockJsonResponse),
      }),
    ) as jest.Mock;

    // Call the post function with custom headers and config, and assert that they are included in the request
    const headers = { Authorization: 'Bearer myToken' };
    const response = await post<{ body: string }, { data: string }>({
      path: '/example',
      body: { body: 'example body' },
      config: { headers, mode: 'cors' },
    });
    expect(response).toEqual(mockJsonResponse);

    // Assert that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('/example', {
      method: 'POST',
      body: '{"body":"example body"}',
      headers,
      mode: 'cors',
    });
  });
});

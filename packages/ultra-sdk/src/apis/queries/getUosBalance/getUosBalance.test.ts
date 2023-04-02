import getCurrencyBalance from '../getCurrencyBalance';
import getUosBalance from '../getUosBalance';

// Mock the getCurrencyBalance function
jest.mock('../getCurrencyBalance', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('getUosBalance', () => {
  const account = 'testaccount';
  const bpApiEndpoint = 'https://example.com';

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
  });

  it('should call getCurrencyBalance with the correct arguments', async () => {
    // Call the function
    await getUosBalance({ account, bpApiEndpoint });

    // Check that getCurrencyBalance was called with the correct arguments
    expect(getCurrencyBalance).toHaveBeenCalledWith({
      code: 'eosio.token',
      account,
      symbol: 'UOS',
      bpApiEndpoint,
    });
  });

  it('should return the result of getCurrencyBalance', async () => {
    // Mock the return value of getCurrencyBalance
    const expectedResult = '10.0000 UOS';
    (getCurrencyBalance as jest.Mock).mockResolvedValue(expectedResult);

    // Call the function
    const result = await getUosBalance({ account, bpApiEndpoint });

    // Check that the result is correct
    expect(result).toBe(expectedResult);
  });
  it('should throw an error if getCurrencyBalance throws an error', async () => {
    // Mock the return value of getCurrencyBalance
    const expectedError = new Error('test error');
    (getCurrencyBalance as jest.Mock).mockRejectedValue(expectedError);

    // Call the function
    await expect(getUosBalance({ account, bpApiEndpoint })).rejects.toThrow(
      expectedError,
    );
  });
});

import { DEFAULT_BP_API_ENDPOINT } from '../../commons';
import getCurrencyBalance from './index';

const body = {
  code: 'eosio.token',
  account: 'ultra.nft.ft',
  symbol: 'UOS',
};

describe('getCurrencyBalance', () => {
  it('should return the currency balance', async () => {
    const mockResponse = ['1.0000 UOS'];

    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(mockResponse),
      }),
    ) as jest.Mock;

    const result = await getCurrencyBalance({
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
      ...body,
    });
    // assert that the result matches the expected result
    expect(result.length).toEqual(1);
    expect(result[0]).toBeDefined();
  });
  it('should return an error if fails', async () => {
    jest.resetAllMocks();

    await expect(
      getCurrencyBalance({
        bpApiEndpoint: 'hello-world',
        ...body,
      }),
    ).rejects.toThrowError();
  });
  it("should use default endpoint if it's not provided", async () => {
    const mockResponse = ['1.0000 UOS'];

    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(mockResponse),
      }),
    ) as jest.Mock;

    const result = await getCurrencyBalance({
      ...body,
    });
    // assert that the result matches the expected result
    expect(result.length).toEqual(1);
    expect(result[0]).toBeDefined();
  });
});

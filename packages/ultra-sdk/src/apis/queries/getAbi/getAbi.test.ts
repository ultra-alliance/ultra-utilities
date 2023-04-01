import { DEFAULT_BP_API_ENDPOINT } from './../../commons';
import getAbi from './index';

const accountName = 'ultra.tools';

const expectedResult = {
  account_name: accountName,
  abi: {
    version: 'eosio::abi/1.1',
    types: [],
  },
};

describe('getAbi', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the abi information', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getAbi({
      accountName,
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
    });
    // assert that the result matches the expected result
    expect(result.account_name).toEqual(accountName);
    expect(result.abi).toBeDefined();
  });
  it("should return an error if the block doesn't exist", async () => {
    await expect(
      getAbi({
        accountName: '6162404616724043',
        bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
      }),
    ).rejects.toThrowError();
  });
});

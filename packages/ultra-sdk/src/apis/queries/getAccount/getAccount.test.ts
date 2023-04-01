import { DEFAULT_BP_API_ENDPOINT } from '../../commons/constants/index';
import getAccount from './index';

const accountName = 'ultra';

const expectedResult = {
  account_name: accountName,
  head_block_num: 61670882,
  head_block_time: '2022-06-10T20:32:04.500',
  privileged: true,
  core_liquid_balance: '0.0000 ULTRA',
};

describe('getAccount', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the account information', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    // call the getAccount function
    const result = await getAccount({
      accountName,
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
    });

    // assert that the result matches the expected result
    expect(result.account_name).toEqual(accountName);
    expect(result.core_liquid_balance).toBeDefined();
  });
  it("should return an error if the account doesn't exist", async () => {
    await expect(
      getAccount({
        accountName: 'non-existent-account',
        bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
      }),
    ).rejects.toThrowError();
  });
});

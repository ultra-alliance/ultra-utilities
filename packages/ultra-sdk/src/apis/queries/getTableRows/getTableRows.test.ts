import { DEFAULT_BP_API_ENDPOINT } from '../../commons';
import getTableRows from './index';

const body = {
  code: 'eosio.nft.ft',
  table: 'factory.a',
  scope: 'eosio.nft.ft',
  json: true,
  limit: 5,
};

const expectedResult = {
  more: true,
  rows: [
    {
      id: 1,
    },
  ],
};

describe('getTableRows', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the tables rows', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getTableRows({
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
      ...body,
    });

    // assert that the result matches the expected result
    expect(result.more).toBeDefined();
    expect(result.more).toBe(true);
    expect(result.rows.length).toBeGreaterThan(0);
  });
  it('should return an error if fails', async () => {
    await expect(
      getTableRows({
        bpApiEndpoint: 'hello-world',
        ...body,
      }),
    ).rejects.toThrowError();
  });
});

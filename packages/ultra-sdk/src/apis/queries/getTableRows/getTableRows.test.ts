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
  it("should use default endpoint if it's not provided", async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getTableRows({
      ...body,
    });

    // assert that the result matches the expected result
    expect(result.more).toBeDefined();
    expect(result.more).toBe(true);
    expect(result.rows.length).toBeGreaterThan(0);
  });

  it('should have been called with json=true if not provided in the arguments', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    await getTableRows({
      code: 'eosio.nft.ft',
      table: 'factory.a',
      scope: 'eosio.nft.ft',
      limit: 5,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${DEFAULT_BP_API_ENDPOINT}/v1/chain/get_table_rows`,
      {
        method: 'POST',
        body: JSON.stringify({
          code: 'eosio.nft.ft',
          limit: 5,
          table: 'factory.a',
          scope: 'eosio.nft.ft',
          json: true,
        }),
      },
    );
  });
});

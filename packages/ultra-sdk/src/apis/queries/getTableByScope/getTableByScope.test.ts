import { DEFAULT_BP_API_ENDPOINT } from '../../commons';
import getTableByScope from './index';

const body = {
  code: 'eosio.token',
  limit: 2,
};

const expectedResult = {
  more: true,
  rows: [
    {
      balance: '0.0000 EOS',
    },
  ],
};

describe('getTableByScope', () => {
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
    const result = await getTableByScope({
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
      ...body,
    });
    // assert that the result matches the expected result
    expect(result.more).toBeDefined();
    expect(result.rows.length).toBeGreaterThan(0);
  });
  it('should return an error if fails', async () => {
    await expect(
      getTableByScope({
        bpApiEndpoint: 'hello-world',
        ...body,
      }),
    ).rejects.toThrowError();
  });
});

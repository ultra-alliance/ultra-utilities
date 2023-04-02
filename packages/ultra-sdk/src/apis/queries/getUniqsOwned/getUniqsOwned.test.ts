import { DEFAULT_BP_API_ENDPOINT } from '../../commons';
import getUniqsOwned from './index';

const account = 'ultra';

const expectedResult = {
  rows: [
    {
      id: 1,
      token_factory_id: 'test',
      mint_date: '2021-09-01T00:00:00.000',
      serial_number: 1,
    },
  ],
  more: true,
  next_key: 'test',
};

describe('getUniqsOwned', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should returns the table for factory.a corresponding to account', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getUniqsOwned({
      account,
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
    });

    // assert that the result matches the expected result
    expect(result.more).toBeDefined();
    expect(result.more).toBe(true);
    expect(result.next_key).toBeDefined();
    expect(result.rows.length).toBeGreaterThan(0);
  });
  it('should return an error if fails', async () => {
    await expect(
      getUniqsOwned({
        account,
        bpApiEndpoint: 'hello-world',
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
    const result = await getUniqsOwned({
      account,
    });

    // assert that the result matches the expected result
    expect(result.more).toBeDefined();
    expect(result.more).toBe(true);
    expect(result.rows.length).toBeGreaterThan(0);
  });
});

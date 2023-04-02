import getUniqDetail from './index';

const uniqId = 1;
const bpApiEndpoint = 'https://example.com';

const expectedResult = {
  rows: [
    {
      id: 1,
      asset_manager: 'owner',
    },
  ],
};

describe('getUniqDetail', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call getUniqDetail with the correct arguments', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;

    const result = await getUniqDetail({ uniqId, bpApiEndpoint });

    expect(result.asset_manager).toEqual('owner');
    expect(result).toBeDefined();
  });

  it('should return an error if rows length == 0', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () =>
          Promise.resolve({ rows: [], more: false, next_key: null }),
      }),
    ) as jest.Mock;
    await expect(getUniqDetail({ uniqId: 1, bpApiEndpoint })).rejects.toThrow(
      'Uniq not found',
    );
  });

  it('should return an error if fails to get a response', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(undefined),
      }),
    ) as jest.Mock;
    await expect(getUniqDetail({ uniqId: 1, bpApiEndpoint })).rejects.toThrow(
      'Uniq not found',
    );
  });

  it("should use default endpoint if it's not provided", async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getUniqDetail({ uniqId, bpApiEndpoint });

    expect(result.asset_manager).toEqual('owner');
    expect(result).toBeDefined();
  });
});

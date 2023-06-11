import getFactory from './index';

const factoryId = 1;
const bpApiEndpoint = 'https://example.com';

const expectedResult = {
  rows: [
    {
      id: 1,
      asset_manager: 'owner',
    },
  ],
};

describe('getFactory', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call getFactory with the correct arguments', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;

    const result = await getFactory({ factoryId, bpApiEndpoint });

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
    await expect(getFactory({ factoryId: 1, bpApiEndpoint })).rejects.toThrow(
      'Factory not found',
    );
  });

  it('should return an error if fails to get a response', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(undefined),
      }),
    ) as jest.Mock;
    await expect(getFactory({ factoryId: 1, bpApiEndpoint })).rejects.toThrow(
      'Factory not found',
    );
  });

  it("should use default endpoint if it's not provided", async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getFactory({ factoryId, bpApiEndpoint });

    expect(result.asset_manager).toEqual('owner');
    expect(result).toBeDefined();
  });
});

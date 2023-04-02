import getListedUniqs from './index';

const bpApiEndpoint = 'https://example.com';

const expectedResult = {
  rows: [
    {
      token_id: 10,
      owner: 'xo1ez2pc3po4',
      price: '4890.00000000 UOS',
      promoter_basis_point: 250,
    },
  ],
};

describe('getListedUniqs', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call getListedUniqs with the correct arguments', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;

    const result = await getListedUniqs(bpApiEndpoint);

    expect(result.rows[0].token_id).toEqual(10);
    expect(result).toBeDefined();
  });

  it('should return an error if fails', async () => {
    await expect(getListedUniqs(bpApiEndpoint)).rejects.toThrowError();
  });
  it("should use default endpoint if it's not provided", async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getListedUniqs();

    expect(result.rows[0].token_id).toEqual(10);
    expect(result).toBeDefined();
  });
});

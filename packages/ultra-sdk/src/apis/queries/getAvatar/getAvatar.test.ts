import getAvatar from './index';

const bpApiEndpoint = 'https://api.ultra.org';

const account = 'aa1aa2aa3ct4';

const expectedResult = {
  rows: [
    {
      nft_id: 403,
    },
  ],
};

describe('getAvatar', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call getAvatar with the correct arguments', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;

    const result = (
      await getAvatar({
        bpApiEndpoint,
        account,
      })
    ).rows;

    expect(result[0].nft_id).toEqual(expectedResult.rows[0].nft_id);
    expect(result).toBeDefined();
  });

  it('should return an error if fails', async () => {
    await expect(getAvatar({ bpApiEndpoint, account })).rejects.toThrowError();
  });
  it("should use default endpoint if it's not provided", async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getAvatar({ bpApiEndpoint, account });

    expect(result.rows[0].nft_id).toEqual(expectedResult.rows[0].nft_id);
    expect(result).toBeDefined();
  });
});

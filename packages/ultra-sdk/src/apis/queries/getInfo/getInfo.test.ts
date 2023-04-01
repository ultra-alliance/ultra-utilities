import { DEFAULT_BP_API_ENDPOINT } from '../../commons';
import getInfo from './index';

const expectedResult = {
  server_version: 'v2.0.0-rc1',
  chain_id: '0000',
  head_block_num: 1,
};

describe('getInfo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should return chain information', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    const result = await getInfo({
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
    });
    // assert that the result matches the expected result
    expect(result.server_version).toBeDefined();
    expect(result.chain_id).toBeDefined();
    expect(result.head_block_num).toBeDefined();
  });
  it('should return an error if fails', async () => {
    await expect(
      getInfo({
        bpApiEndpoint: 'hello-world',
      }),
    ).rejects.toThrowError();
  });
});

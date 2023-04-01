import { DEFAULT_BP_API_ENDPOINT } from '../../commons/';
import getBlock from './index';

const blockNumOrId = 61672404;

const expectedResult = {
  block_num: 61672404,
  timestamp: '2022-06-10T20:44:45.500',
};

describe('getBlock', () => {
  beforeEach(() => {
    // Clear fetch mock before each test
    jest.resetAllMocks();
  });

  it('should return the block information', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => Promise.resolve(expectedResult),
      }),
    ) as jest.Mock;
    // call the getBlock function
    const result = await getBlock({
      blockNumOrId,
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
    });
    // assert that the result matches the expected result
    expect(result.block_num).toEqual(blockNumOrId);
    expect(result.timestamp).toBeDefined();
  });
  it("should return an error if the block doesn't exist", async () => {
    await expect(
      getBlock({
        blockNumOrId: 6162404616724043,
        bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
      }),
    ).rejects.toThrowError();
  });
});

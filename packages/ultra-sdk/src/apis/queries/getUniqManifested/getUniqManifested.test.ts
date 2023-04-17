import { getZipContent } from '../../../utilities';
import getUniqDetail from '../getUniqDetail';
import getUniqManifested from './index';

jest.mock('../getUniqDetail');
jest.mock('../../../utilities');

describe('getUniqManifested', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return uniq with manifest', async () => {
    // Mock the response from getUniqDetail and getZipContent
    const uniq = { id: 'mock id', meta_uris: ['mock uri'] };
    const manifest = 'mock manifest';
    (getUniqDetail as jest.Mock).mockResolvedValueOnce(uniq);
    (getZipContent as jest.Mock).mockResolvedValueOnce({ manifest });

    const result = await getUniqManifested({
      uniqId: '1',
      bpApiEndpoint: 'https://api.ultrain.io',
    });

    expect(result.uniq).toEqual(uniq);
    expect(result.manifest).toEqual(manifest);
    expect(getUniqDetail).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if uniq not found', async () => {
    // Mock the response from getUniqDetail to return null
    (getUniqDetail as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      getUniqManifested({
        uniqId: '1',
        bpApiEndpoint: 'https://api.ultrain.io',
      }),
    ).rejects.toThrow('Uniq not found');

    expect(getUniqDetail).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(0);
  });

  it('should throw an error if getZipContent fails', async () => {
    // Mock the response from getUniqDetail and getZipContent to throw an error
    (getUniqDetail as jest.Mock).mockResolvedValueOnce({
      id: 'mock id',
      meta_uris: ['mock uri'],
    });
    (getZipContent as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to read manifest'),
    );

    await expect(
      getUniqManifested({
        uniqId: '1',
        bpApiEndpoint: 'https://api.ultrain.io',
      }),
    ).rejects.toThrow('Uniq not found');

    expect(getUniqDetail).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(1);
  });
});

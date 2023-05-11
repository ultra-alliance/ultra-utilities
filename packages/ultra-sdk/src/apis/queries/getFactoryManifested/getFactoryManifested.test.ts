import { getZipContent } from '../../../utilities';
import getFactoryDetail from '../getFactoryDetail';
import getFactoryManifested from './index';

jest.mock('../getFactoryDetail');
jest.mock('../../../utilities');

describe('getFactoryManifested', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return factory with manifest', async () => {
    // Mock the response from getFactoryDetail and getZipContent
    const factory = { id: 'mock id', meta_uris: ['mock uri'] };
    const manifest = 'mock manifest';
    (getFactoryDetail as jest.Mock).mockResolvedValueOnce(factory);
    (getZipContent as jest.Mock).mockResolvedValueOnce({ manifest });

    const result = await getFactoryManifested({
      factoryId: '1',
      bpApiEndpoint: 'https://api.ultrain.io',
    });

    expect(result.data).toEqual(factory);
    expect(result.manifest).toEqual(manifest);
    expect(getFactoryDetail).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if factory not found', async () => {
    // Mock the response from getFactoryDetail to return null
    (getFactoryDetail as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      getFactoryManifested({
        factoryId: '1',
        bpApiEndpoint: 'https://api.ultrain.io',
      }),
    ).rejects.toThrow('Factory not found');

    expect(getFactoryDetail).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(0);
  });

  it('should throw an error if getZipContent fails', async () => {
    // Mock the response from getFactoryDetail and getZipContent to throw an error
    (getFactoryDetail as jest.Mock).mockResolvedValueOnce({
      id: 'mock id',
      meta_uris: ['mock uri'],
    });
    (getZipContent as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to read manifest'),
    );

    await expect(
      getFactoryManifested({
        factoryId: '1',
        bpApiEndpoint: 'https://api.ultrain.io',
      }),
    ).rejects.toThrow('Factory not found');

    expect(getFactoryDetail).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(1);
  });
});

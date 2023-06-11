import { getZipContent } from '../../../utilities';
import getFactory from '../getFactory';
import getFactoryManifested from './index';

jest.mock('../getFactory');
jest.mock('../../../utilities');

describe('getFactoryManifested', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return factory with manifest', async () => {
    // Mock the response from getFactory and getZipContent
    const factory = { id: 'mock id', meta_uris: ['mock uri'] };
    const manifest = 'mock manifest';
    (getFactory as jest.Mock).mockResolvedValueOnce(factory);
    (getZipContent as jest.Mock).mockResolvedValueOnce({ manifest });

    const result = await getFactoryManifested({
      factoryId: '1',
      bpApiEndpoint: 'https://api.ultrain.io',
    });

    expect(result.data).toEqual(factory);
    expect(result.manifest).toEqual(manifest);
    expect(getFactory).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if factory not found', async () => {
    // Mock the response from getFactory to return null
    (getFactory as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      getFactoryManifested({
        factoryId: '1',
        bpApiEndpoint: 'https://api.ultrain.io',
      }),
    ).rejects.toThrow('Factory not found');

    expect(getFactory).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(0);
  });

  it('should throw an error if getZipContent fails', async () => {
    // Mock the response from getFactory and getZipContent to throw an error
    (getFactory as jest.Mock).mockResolvedValueOnce({
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

    expect(getFactory).toHaveBeenCalledTimes(1);
    expect(getZipContent).toHaveBeenCalledTimes(1);
  });
});

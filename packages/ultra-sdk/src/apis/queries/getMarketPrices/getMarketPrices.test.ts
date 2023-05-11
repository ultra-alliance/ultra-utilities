import { get } from '../../commons';
import getMarketPrices from '../getMarketPrices';

jest.mock('../../commons');

describe('getMarketPrices', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return market prices for USD, EUR, and GBP', async () => {
    const mockGetResponse = {
      market_data: {
        current_price: {
          usd: 1000,
          eur: 800,
          gbp: 700,
        },
      },
    };
    (get as jest.Mock).mockResolvedValue(mockGetResponse);

    const result = await getMarketPrices();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith({
      path: 'https://api.coingecko.com/api/v3/coins/ultra',
    });
    expect(result).toEqual({
      USD: 1000,
      EUR: 800,
      GBP: 700,
    });
  });

  it('should throw an error when no market data is found', async () => {
    const mockGetResponse = {};
    (get as jest.Mock).mockResolvedValue(mockGetResponse);

    await expect(getMarketPrices()).rejects.toThrow('No market data found');
  });
});

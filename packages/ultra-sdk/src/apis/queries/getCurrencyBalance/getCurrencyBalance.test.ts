import { DEFAULT_BP_API_ENDPOINT } from '../../commons';
import getCurrencyBalance from './index';

const body = {
  code: 'eosio.token',
  account: 'ultra.nft.ft',
  symbol: 'UOS',
};

describe('getCurrencyBalance', () => {
  it('should return the currency balance', async () => {
    const result = await getCurrencyBalance({
      bpApiEndpoint: DEFAULT_BP_API_ENDPOINT,
      ...body,
    });
    // assert that the result matches the expected result
    expect(result.length).toEqual(1);
    expect(result[0]).toBeDefined();
  });
  it('should return an error if fails', async () => {
    await expect(
      getCurrencyBalance({
        bpApiEndpoint: 'hello-world',
        ...body,
      }),
    ).rejects.toThrowError();
  });
});

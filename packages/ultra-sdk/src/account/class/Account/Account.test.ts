import {
  Api,
  type tTokenA,
  type tGetAccountOutput,
  type tListedUniq,
  type tGetTableRowsOutput,
  type tGetUniqOwnedOutput,
  type tFactoryManifested,
} from '../../../apis';
import { type tAccountOptions, type tExt } from '../../types';
import Account from './index';

describe('Account', () => {
  let account: Account;
  let options: tAccountOptions;
  let api: Api;

  beforeEach(() => {
    api = new Api({ bpApiEndpoint: 'http://localhost:8080' });
    options = {
      api,
      ext: {
        connect: jest.fn(),
        disconnect: jest.fn(),
        signTransaction: jest.fn(),
      } satisfies tExt,
    };

    account = new Account(options);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create an instance of Account', () => {
    expect(account).toBeInstanceOf(Account);
  });

  describe('connect', () => {
    it('should throw an error if the extension fails to connect', async () => {
      const mockConnect = jest.spyOn(options.ext, 'connect').mockResolvedValue({
        status: 'fail',
        data: {
          blockchainid: '',
          publicKey: '',
        },
      });

      await expect(account.connect()).rejects.toThrow(
        "Couldn't connect to Ultra",
      );
      expect(mockConnect).toHaveBeenCalled();
    });

    it('should refetch account data if the extension successfully connects', async () => {
      const mockConnect = jest.spyOn(options.ext, 'connect').mockResolvedValue({
        status: 'success',
        data: {
          blockchainid: 'test@ultra.io',
          publicKey: 'test',
        },
      });

      const mockFetchAccountData = jest
        .spyOn(account, 'fetchAccountData')
        .mockResolvedValue({
          data: {
            account_name: 'test',
          } as unknown as tGetAccountOutput,
          ownedUniqs: [] as tTokenA[],
          listedUniqs: [] as tListedUniq[],
          avatar: {
            nft_id: undefined,
            factory_id: undefined,
            manifest: undefined,
          },
        });

      await account.connect();
      expect(mockConnect).toHaveBeenCalled();
      expect(mockFetchAccountData).toHaveBeenCalled();
      expect(account.current).toBeDefined();
    });
  });

  describe('disconnect', () => {
    it('should set the current account to undefined if the extension successfully disconnects', async () => {
      const mockDisconnect = jest

        .spyOn(options.ext, 'disconnect')
        .mockResolvedValue({
          status: 'success',
          data: undefined,
        });

      await account.disconnect();
      expect(mockDisconnect).toHaveBeenCalled();
      expect(account.current).toBeUndefined();
    });
  });

  describe('fetchAccountData', () => {
    it('should return account data for the current account if no account is provided', async () => {
      const accountName = 'test';

      const mockGetAccount = jest.spyOn(api, 'getAccount').mockResolvedValue({
        account_name: accountName,
      } as unknown as tGetAccountOutput);

      const mockGetUniqsOwned = jest
        .spyOn(api, 'getUniqsOwned')
        .mockResolvedValue({
          rows: [],
        } as unknown as tGetUniqOwnedOutput);

      const mockGetListedUniqs = jest
        .spyOn(api, 'getListedUniqs')
        .mockResolvedValue({
          rows: [],
        } as unknown as tGetTableRowsOutput<tListedUniq>);

      const mockGetFactoryManifested = jest
        .spyOn(api, 'getFactoryManifested')
        .mockResolvedValue({
          data: {},
          manifest: {},
        } as unknown as tFactoryManifested);

      await account.fetchAccountData({
        account: undefined,
        withAvatarManifest: false,
      });

      expect(mockGetAccount).toHaveBeenCalled();
      expect(mockGetUniqsOwned).toHaveBeenCalled();
      expect(mockGetListedUniqs).toHaveBeenCalledWith({
        config: {
          limit: 10000,
        },
      });

      expect(mockGetFactoryManifested).not.toHaveBeenCalled();
    });

    it('should return account data for the specified account if provided', async () => {
      const accountName = 'test';
      const mockGetAccount = jest.spyOn(api, 'getAccount').mockResolvedValue({
        account_name: accountName,
      } as unknown as tGetAccountOutput);

      const mockGetUniqsOwned = jest
        .spyOn(api, 'getUniqsOwned')
        .mockResolvedValue({
          rows: [],
        } as unknown as tGetUniqOwnedOutput);

      const mockGetListedUniqs = jest
        .spyOn(api, 'getListedUniqs')
        .mockResolvedValue({
          rows: [],
        } as unknown as tGetTableRowsOutput<tListedUniq>);

      await account.fetchAccountData({
        account: accountName,
      });

      expect(mockGetAccount).toHaveBeenCalledWith({
        accountName,
      });
      expect(mockGetUniqsOwned).toHaveBeenCalledWith(accountName);
      expect(mockGetListedUniqs).toHaveBeenCalledWith({
        config: {
          limit: 10000,
        },
      });
    });
  });
});

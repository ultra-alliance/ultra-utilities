// istanbul ignore file

import {
  DEFAULT_BP_API_ENDPOINT,
  getAbi,
  getAccount,
  getBlock,
  getCurrencyBalance,
  getInfo,
  getTableByScope,
  getTableRows,
  getUosBalance,
  getFactory,
  getUniqsOwned,
  getFactoryManifested,
} from '../..';
import Api from './index';

jest.mock('../../../apis');

describe('Api', () => {
  const bpApiEndpoint = 'https://api.apiin.io';
  const api = new Api({ bpApiEndpoint });

  describe('constructor', () => {
    it('should set the bpApiEndpoint', () => {
      expect(api.bpApiEndpoint).toEqual(bpApiEndpoint);
    });
    it('should set the default bpApiEndpoint if none is provided', () => {
      const api = new Api({});
      expect(api.bpApiEndpoint).toEqual(DEFAULT_BP_API_ENDPOINT);
    });
  });

  describe('getAbi', () => {
    it('should call getAbi with the correct parameters', async () => {
      const accountName = 'testaccount';
      const abi = {};
      (getAbi as jest.Mock).mockResolvedValueOnce(abi);

      await api.getAbi({ accountName });

      expect(getAbi).toHaveBeenCalledWith({
        accountName,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getAbi returns null', async () => {
      (getAbi as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        api.getAbi({ accountName: 'nonexistingaccount' }),
      ).rejects.toThrow('Account nonexistingaccount not found');
    });
  });

  describe('getAccount', () => {
    it('should call getAccount with the correct parameters', async () => {
      const accountName = 'testaccount';
      const account = {};
      (getAccount as jest.Mock).mockResolvedValueOnce(account);

      await api.getAccount({ accountName });

      expect(getAccount).toHaveBeenCalledWith({
        accountName,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getAccount returns null', async () => {
      (getAccount as jest.Mock).mockResolvedValueOnce(null);

      const account = await api.getAccount({
        accountName: 'nonexistingaccount',
      });
      expect(account).toBeUndefined();
    });
  });

  describe('getBlock', () => {
    it('should call getBlock with the correct parameters', async () => {
      const blockNumOrId = 123;
      const block = {};
      (getBlock as jest.Mock).mockResolvedValueOnce(block);

      await api.getBlock({ blockNumOrId });

      expect(getBlock).toHaveBeenCalledWith({
        blockNumOrId,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getBlock returns null', async () => {
      (getBlock as jest.Mock).mockResolvedValueOnce(null);

      await expect(api.getBlock({ blockNumOrId: 12312 })).rejects.toThrow(
        'Block 12312 not found',
      );
    });
  });

  describe('getCurrencyBalance', () => {
    it('should call getCurrencyBalance with the correct parameters', async () => {
      const account = 'testaccount';
      const symbol = 'UTN';
      const code = 'utrio.token';
      const balance = {};
      (getCurrencyBalance as jest.Mock).mockResolvedValueOnce(balance);

      await api.getCurrencyBalance({ account, symbol, code });

      expect(getCurrencyBalance).toHaveBeenCalledWith({
        account,
        symbol,
        code,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getCurrencyBalance returns null', async () => {
      (getCurrencyBalance as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        api.getCurrencyBalance({
          account: 'nonexistingaccount',
          symbol: 'UTN',
          code: 'api.io',
        }),
      ).rejects.toThrow('Account nonexistingaccount not found');
    });
  });
  describe('getInfo', () => {
    it('should call getInfo with the correct parameters', async () => {
      const info = {};
      (getInfo as jest.Mock).mockResolvedValueOnce(info);

      await api.getInfo();

      expect(getInfo).toHaveBeenCalledWith({
        bpApiEndpoint,
      });
    });

    it('should throw an error if getInfo returns null', async () => {
      (getInfo as jest.Mock).mockResolvedValueOnce(null);

      await expect(api.getInfo()).rejects.toThrow('Info not found');
    });
  });

  describe('getTableByScope', () => {
    it('should call getTableByScope with the correct parameters', async () => {
      const code = 'testaccount';
      const limit = 10;
      const upperBound = 'testtable';
      const lowerBound = 'testtable';
      const tableByScope = {};
      (getTableByScope as jest.Mock).mockResolvedValueOnce(tableByScope);

      await api.getTableByScope({
        code,
        config: { limit, upperBound, lowerBound },
      });

      expect(getTableByScope).toHaveBeenCalledWith({
        code,
        config: {
          limit,
          upperBound,
          lowerBound,
        },
        bpApiEndpoint,
      });
    });

    it('should throw an error if getTableByScope returns null', async () => {
      (getTableByScope as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        api.getTableByScope({
          code: 'nonexistingaccount',
          config: {
            limit: 10,
            upperBound: 'testtable',
            lowerBound: 'testtable',
          },
        }),
      ).rejects.toThrow('Scope nonexistingaccount not found');
    });
  });

  describe('getTableRows', () => {
    it('should call getTableRows with the correct parameters', async () => {
      const code = 'testaccount';
      const table = 'testtable';
      const scope = 'testscope';
      const limit = 10;
      const upperBound = 'testtable';
      const lowerBound = 'testtable';
      const tableRows = {};
      const json = true;

      (getTableRows as jest.Mock).mockResolvedValueOnce(tableRows);

      await api.getTableRows({
        code,
        table,
        scope,
        config: {
          json,
          limit,
          upperBound,
          lowerBound,
        },
      });

      expect(getTableRows).toHaveBeenCalledWith({
        code,
        table,
        scope,
        config: {
          json,
          limit,
          upperBound,
          lowerBound,
        },
        bpApiEndpoint,
      });
    });

    it('should throw an error if getTableRows returns null', async () => {
      (getTableRows as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        api.getTableRows({
          code: 'nonexistingaccount',
          table: 'testtable',

          scope: 'testscope',
          config: {
            limit: 10,
            upperBound: 'testtable',
            lowerBound: 'testtable',
            json: true,
          },
        }),
      ).rejects.toThrow('Table testtable not found');
    });
  });
  describe('getUosBalance', () => {
    it('should call getUosBalance with the correct parameters', async () => {
      const account = 'api.io';

      (getUosBalance as jest.Mock).mockResolvedValueOnce(['10 UOS']);

      await api.getUosBalance(account);

      expect(getUosBalance).toHaveBeenCalledWith({
        account,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getUosBalance returns null', async () => {
      (getUosBalance as jest.Mock).mockResolvedValueOnce(null);
      const account = 'api.io';

      await expect(api.getUosBalance(account)).rejects.toThrow(
        `Account ${account} not found`,
      );
    });
  });
  describe('getUniqsOwned', () => {
    it('should call getUniqsOwned with the correct parameters', async () => {
      const account = 'api.io';

      (getUniqsOwned as jest.Mock).mockResolvedValueOnce({
        rows: [
          {
            asset_manager: 'hello',
          },
        ],
      });

      await api.getUniqsOwned(account);

      expect(getUniqsOwned).toHaveBeenCalledWith({
        account,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getUosBalance returns null', async () => {
      (getUniqsOwned as jest.Mock).mockResolvedValueOnce(null);
      const account = 'api.io';

      await expect(api.getUniqsOwned(account)).rejects.toThrow(
        `Account ${account} not found`,
      );
    });
  });
  describe('getFactory', () => {
    it('should call getFactory with the correct parameters', async () => {
      const factoryId = 10;

      (getFactory as jest.Mock).mockResolvedValueOnce({
        rows: [
          {
            asset_manager: 'hello',
          },
        ],
      });

      await api.getFactory(factoryId);

      expect(getFactory).toHaveBeenCalledWith({
        factoryId,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getUosBalance returns null', async () => {
      (getFactory as jest.Mock).mockResolvedValueOnce(null);
      const factoryId = 10;

      await expect(api.getFactory(factoryId)).rejects.toThrow(
        `Factory ${factoryId} not found`,
      );
    });
  });
  describe('getFactoryManifested', () => {
    it('should call getFactoryManifested with the correct parameters', async () => {
      const factoryId = 10;

      (getFactoryManifested as jest.Mock).mockResolvedValueOnce({
        rows: [
          {
            asset_manager: 'hello',
          },
        ],
      });

      await api.getFactoryManifested(factoryId);

      expect(getFactoryManifested).toHaveBeenCalledWith({
        factoryId,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getFactory returns null', async () => {
      (getFactoryManifested as jest.Mock).mockResolvedValueOnce(null);
      const factoryId = 10;

      await expect(api.getFactory(factoryId)).rejects.toThrow(
        `Factory 10 not found`,
      );
    });
  });
  describe('updateBpApiEndpoint', () => {
    it('should update the bpApiEndpoint', async () => {
      const newBpApiEndpoint = 'https://new.bp.endpoint';
      api.updateBpApiEndpoint(newBpApiEndpoint);
      expect(api.bpApiEndpoint).toEqual(newBpApiEndpoint);
    });
  });

  describe('getMarketPrices', () => {
    it('api class should have getMarketPrices method', () => {
      expect(api.getMarketPrices).toBeDefined();
    });
  });
});

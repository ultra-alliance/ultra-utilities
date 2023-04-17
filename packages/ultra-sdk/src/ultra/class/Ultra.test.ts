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
  getUniqDetail,
  getUniqsOwned,
  getUniqManifested,
} from '../../apis';
import Ultra from './index';

jest.mock('../../apis');

describe('Ultra', () => {
  const bpApiEndpoint = 'https://api.ultrain.io';
  const ultra = new Ultra({ bpApiEndpoint });

  describe('constructor', () => {
    it('should set the bpApiEndpoint', () => {
      expect(ultra.bpApiEndpoint).toEqual(bpApiEndpoint);
    });
    it('should set the default bpApiEndpoint if none is provided', () => {
      const ultra = new Ultra({});
      expect(ultra.bpApiEndpoint).toEqual(DEFAULT_BP_API_ENDPOINT);
    });
  });

  describe('getAbi', () => {
    it('should call getAbi with the correct parameters', async () => {
      const accountName = 'testaccount';
      const abi = {};
      (getAbi as jest.Mock).mockResolvedValueOnce(abi);

      await ultra.getAbi({ accountName });

      expect(getAbi).toHaveBeenCalledWith({
        accountName,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getAbi returns null', async () => {
      (getAbi as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        ultra.getAbi({ accountName: 'nonexistingaccount' }),
      ).rejects.toThrow('Account nonexistingaccount not found');
    });
  });

  describe('getAccount', () => {
    it('should call getAccount with the correct parameters', async () => {
      const accountName = 'testaccount';
      const account = {};
      (getAccount as jest.Mock).mockResolvedValueOnce(account);

      await ultra.getAccount({ accountName });

      expect(getAccount).toHaveBeenCalledWith({
        accountName,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getAccount returns null', async () => {
      (getAccount as jest.Mock).mockResolvedValueOnce(null);

      const account = await ultra.getAccount({
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

      await ultra.getBlock({ blockNumOrId });

      expect(getBlock).toHaveBeenCalledWith({
        blockNumOrId,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getBlock returns null', async () => {
      (getBlock as jest.Mock).mockResolvedValueOnce(null);

      await expect(ultra.getBlock({ blockNumOrId: 12312 })).rejects.toThrow(
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

      await ultra.getCurrencyBalance({ account, symbol, code });

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
        ultra.getCurrencyBalance({
          account: 'nonexistingaccount',
          symbol: 'UTN',
          code: 'ultra.io',
        }),
      ).rejects.toThrow('Account nonexistingaccount not found');
    });
  });
  describe('getInfo', () => {
    it('should call getInfo with the correct parameters', async () => {
      const info = {};
      (getInfo as jest.Mock).mockResolvedValueOnce(info);

      await ultra.getInfo();

      expect(getInfo).toHaveBeenCalledWith({
        bpApiEndpoint,
      });
    });

    it('should throw an error if getInfo returns null', async () => {
      (getInfo as jest.Mock).mockResolvedValueOnce(null);

      await expect(ultra.getInfo()).rejects.toThrow('Info not found');
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

      await ultra.getTableByScope({ code, limit, upperBound, lowerBound });

      expect(getTableByScope).toHaveBeenCalledWith({
        code,
        limit,
        upperBound,
        lowerBound,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getTableByScope returns null', async () => {
      (getTableByScope as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        ultra.getTableByScope({
          code: 'nonexistingaccount',
          limit: 10,
          upperBound: 'testtable',
          lowerBound: 'testtable',
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

      await ultra.getTableRows({
        code,
        json,
        table,
        scope,
        limit,
        upperBound,
        lowerBound,
      });

      expect(getTableRows).toHaveBeenCalledWith({
        code,
        json,
        table,
        scope,
        limit,
        upperBound,
        lowerBound,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getTableRows returns null', async () => {
      (getTableRows as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        ultra.getTableRows({
          code: 'nonexistingaccount',
          table: 'testtable',
          limit: 10,
          upperBound: 'testtable',
          lowerBound: 'testtable',
          json: true,
          scope: 'testscope',
        }),
      ).rejects.toThrow('Table testtable not found');
    });
  });
  describe('getUosBalance', () => {
    it('should call getUosBalance with the correct parameters', async () => {
      const account = 'ultra.io';

      (getUosBalance as jest.Mock).mockResolvedValueOnce(['10 UOS']);

      await ultra.getUosBalance(account);

      expect(getUosBalance).toHaveBeenCalledWith({
        account,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getUosBalance returns null', async () => {
      (getUosBalance as jest.Mock).mockResolvedValueOnce(null);
      const account = 'ultra.io';

      await expect(ultra.getUosBalance(account)).rejects.toThrow(
        `Account ${account} not found`,
      );
    });
  });
  describe('getUniqsOwned', () => {
    it('should call getUniqsOwned with the correct parameters', async () => {
      const account = 'ultra.io';

      (getUniqsOwned as jest.Mock).mockResolvedValueOnce({
        rows: [
          {
            asset_manager: 'hello',
          },
        ],
      });

      await ultra.getUniqsOwned(account);

      expect(getUniqsOwned).toHaveBeenCalledWith({
        account,
        bpApiEndpoint,
      });
    });

    it('should throw an error if getUosBalance returns null', async () => {
      (getUniqsOwned as jest.Mock).mockResolvedValueOnce(null);
      const account = 'ultra.io';

      await expect(ultra.getUniqsOwned(account)).rejects.toThrow(
        `Account ${account} not found`,
      );
    });
  });
  describe('getUniqDetail', () => {
    it('should call getUniqDetail with the correct parameters', async () => {
      const uniqId = 10;

      (getUniqDetail as jest.Mock).mockResolvedValueOnce({
        rows: [
          {
            asset_manager: 'hello',
          },
        ],
      });

      await ultra.getUniqDetail(uniqId);

      expect(getUniqDetail).toHaveBeenCalledWith({
        uniqId,
      });
    });

    it('should throw an error if getUosBalance returns null', async () => {
      (getUniqDetail as jest.Mock).mockResolvedValueOnce(null);
      const uniqId = 10;

      await expect(ultra.getUniqDetail(uniqId)).rejects.toThrow(
        `Uniq ${uniqId} not found`,
      );
    });
  });
  describe('getUniqManifested', () => {
    it('should call getUniqManifested with the correct parameters', async () => {
      const uniqId = 10;

      (getUniqManifested as jest.Mock).mockResolvedValueOnce({
        rows: [
          {
            asset_manager: 'hello',
          },
        ],
      });

      await ultra.getUniqManifested(uniqId);

      expect(getUniqManifested).toHaveBeenCalledWith({
        uniqId,
      });
    });

    it('should throw an error if getUniqDetail returns null', async () => {
      (getUniqManifested as jest.Mock).mockResolvedValueOnce(null);
      const uniqId = 10;

      await expect(ultra.getUniqDetail(uniqId)).rejects.toThrow(
        `Uniq 10 not found`,
      );
    });
  });
});

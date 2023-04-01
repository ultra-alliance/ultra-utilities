import {
  type tGetBlockOutput,
  type tGetAbiOutput,
  type tGetAccountOutput,
  type tGetTableByScopeOutput,
  type tGetTableRowsOutput,
  type tGetInfoOutput,
} from '../../apis';
import Ultra from './index';

jest.mock('../../apis', () => ({
  getAbi: jest.fn(),
  getAccount: jest.fn(),
  getBlock: jest.fn(),
  getCurrencyBalance: jest.fn(),
  getInfo: jest.fn(),
  getTableByScope: jest.fn(),
  getTableRows: jest.fn(),
  DEFAULT_BP_API_ENDPOINT: 'https://api.example.com',
}));

describe('Ultra', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // do nothing
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should set the bpApiEndpoint to the default value if not provided', () => {
      const ultra = new Ultra({});
      expect(ultra.bpApiEndpoint).toEqual('https://api.example.com');
    });

    it('should set the bpApiEndpoint to the provided value', () => {
      const ultra = new Ultra({
        bpApiEndpoint: 'https://custom-api.example.com',
      });
      expect(ultra.bpApiEndpoint).toEqual('https://custom-api.example.com');
    });
  });

  describe('getBlock', () => {
    it('should call getBlock with the correct parameters and return the result', async () => {
      const ultra = new Ultra({});
      const params = { blockNumOrId: 12323213124213 };
      const expectedResult = {
        block_num: 12323213124213,
      };

      // Spy on the getBlock function
      const spyGetBlock = jest.spyOn(ultra, 'getBlock');
      spyGetBlock.mockResolvedValueOnce(expectedResult as tGetBlockOutput);

      const result = await ultra.getBlock(params);

      // Assert that the getBlock function was called with the correct parameters
      expect(spyGetBlock).toHaveBeenCalledWith(params);

      // Assert that the result is equal to the expected result
      expect(result).toEqual(expectedResult);

      // Restore the original implementation of getBlock
      spyGetBlock.mockRestore();
    });

    it('should throw an error if the block does not exist', async () => {
      const ultra = new Ultra({});
      const params = { blockNumOrId: 12323213124213 };
      // Spy on the getBlock function
      const spyGetBlock = jest.spyOn(ultra, 'getBlock');
      spyGetBlock.mockRejectedValueOnce(new Error('Block does not exist'));

      await expect(ultra.getBlock(params)).rejects.toThrowError(
        'Block does not exist',
      );

      // Restore the original implementation of getBlock
      spyGetBlock.mockRestore();
    });
  });

  describe('getAbi', () => {
    it('should call getAbi with the correct parameters and return the result', async () => {
      const ultra = new Ultra({});
      const params = { accountName: 'ultra' };
      const expectedResult = {
        account_name: 'ultra',
      };

      // Spy on the getAbi function
      const spyGetAbi = jest.spyOn(ultra, 'getAbi');
      spyGetAbi.mockResolvedValueOnce(expectedResult as tGetAbiOutput);

      const result = await ultra.getAbi(params);
      // Assert that the getAbi function was called with the correct parameters
      expect(spyGetAbi).toHaveBeenCalledWith(params);

      // Assert that the result is equal to the expected result
      expect(result.account_name).toEqual('ultra');

      // Restore the original implementation of getAbi
      spyGetAbi.mockRestore();
    });

    it('should throw an error if the account does not exist', async () => {
      const ultra = new Ultra({});
      const params = { accountName: 'accountName' };
      // Spy on the getAbi function
      const spyGetAbi = jest.spyOn(ultra, 'getAbi');
      spyGetAbi.mockRejectedValueOnce(new Error('Account does not exist'));

      await expect(ultra.getAbi(params)).rejects.toThrowError(
        'Account does not exist',
      );

      // Restore the original implementation of getAbi
      spyGetAbi.mockRestore();
    });
  });

  describe('getAccount', () => {
    it('should call getAccount with the correct parameters and return the result', async () => {
      const ultra = new Ultra({});
      const params = { accountName: 'ultra' };
      const expectedResult = {
        account_name: 'ultra',
      };

      // Spy on the getAccount function
      const spyGetAccount = jest.spyOn(ultra, 'getAccount');
      spyGetAccount.mockResolvedValueOnce(expectedResult as tGetAccountOutput);

      const result = await ultra.getAccount(params);
      // Assert that the getAccount function was called with the correct parameters
      expect(spyGetAccount).toHaveBeenCalledWith(params);

      // Assert that the result is equal to the expected result
      expect(result.account_name).toEqual('ultra');

      // Restore the original implementation of getAccount
      spyGetAccount.mockRestore();
    });

    it('should throw an error if the account does not exist', async () => {
      const ultra = new Ultra({});
      const params = { accountName: 'accountName' };
      // Spy on the getAccount function
      const spyGetAccount = jest.spyOn(ultra, 'getAccount');
      spyGetAccount.mockRejectedValueOnce(new Error('Account does not exist'));

      await expect(ultra.getAccount(params)).rejects.toThrowError(
        'Account does not exist',
      );

      // Restore the original implementation of getAccount
      spyGetAccount.mockRestore();
    });
  });

  describe('getTableByScope', () => {
    it('should call getTableByScope with the correct parameters and return the result', async () => {
      const ultra = new Ultra({});
      const params = { code: 'ultra', table: 'accounts', limit: 2 };
      const expectedResult = {
        rows: [
          {
            code: 'ultra',
            scope: '1000000000.0000 ULTRA',
          },
        ],
      };

      // Spy on the getTableByScope function
      const spyGetTableByScope = jest.spyOn(ultra, 'getTableByScope');
      spyGetTableByScope.mockResolvedValueOnce(
        expectedResult as tGetTableByScopeOutput,
      );

      const result = await ultra.getTableByScope(params);
      // Assert that the getTableByScope function was called with the correct parameters
      expect(spyGetTableByScope).toHaveBeenCalledWith(params);

      // Assert that the result is equal to the expected result
      expect(result.rows[0].code).toEqual('ultra');
      // Restore the original implementation of getTableByScope
      spyGetTableByScope.mockRestore();
    });

    it('should throw an error if the table does not exist', async () => {
      const ultra = new Ultra({});
      const params = { code: 'ultra', table: 'accounts', limit: 2 };
      // Spy on the getTableByScope function
      const spyGetTableByScope = jest.spyOn(ultra, 'getTableByScope');
      spyGetTableByScope.mockRejectedValueOnce(
        new Error('Table does not exist'),
      );

      await expect(ultra.getTableByScope(params)).rejects.toThrowError(
        'Table does not exist',
      );

      // Restore the original implementation of getTableByScope
      spyGetTableByScope.mockRestore();
    });
  });

  describe('getTableRows', () => {
    it('should call getTableRows with the correct parameters and return the result', async () => {
      const ultra = new Ultra({});
      const params = {
        code: 'ultra',
        table: 'accounts',
        scope: '1000000000.0000 ULTRA',
        limit: 2,
        json: true,
      };
      const expectedResult = {
        rows: [
          {
            id: 0,
            asset_manager: 'ultra',
          },
        ],
      };

      // Spy on the getTableRows function
      const spyGetTableRows = jest.spyOn(ultra, 'getTableRows');
      spyGetTableRows.mockResolvedValueOnce(
        expectedResult as tGetTableRowsOutput,
      );

      const result = await ultra.getTableRows(params);
      // Assert that the getTableRows function was called with the correct parameters
      expect(spyGetTableRows).toHaveBeenCalledWith(params);

      // Assert that the result is equal to the expected result
      expect(result.rows[0].asset_manager).toEqual('ultra');

      // Restore the original implementation of getTableRows
      spyGetTableRows.mockRestore();
    });

    it('should throw an error if the table does not exist', async () => {
      const ultra = new Ultra({});
      const params = {
        code: 'ultra',
        table: 'accounts',
        limit: 2,
        json: true,
        scope: 'scope',
      };
      // Spy on the getTableRows function
      const spyGetTableRows = jest.spyOn(ultra, 'getTableRows');
      spyGetTableRows.mockRejectedValueOnce(new Error('Table does not exist'));

      await expect(ultra.getTableRows(params)).rejects.toThrowError(
        'Table does not exist',
      );

      // Restore the original implementation of getTableRows
      spyGetTableRows.mockRestore();
    });
  });

  describe('getCurrencyBalance', () => {
    it('should call getCurrencyBalance with the correct parameters and return the result', async () => {
      const ultra = new Ultra({});
      const params = { code: 'ultra', account: 'ultra', symbol: 'ULTRA' };
      const expectedResult = ['1000000000.0000 ULTRA'];

      // Spy on the getCurrencyBalance function
      const spyGetCurrencyBalance = jest.spyOn(ultra, 'getCurrencyBalance');
      spyGetCurrencyBalance.mockResolvedValueOnce(expectedResult);

      const result = await ultra.getCurrencyBalance(params);
      // Assert that the getCurrencyBalance function was called with the correct parameters
      expect(spyGetCurrencyBalance).toHaveBeenCalledWith(params);

      // Assert that the result is equal to the expected result
      expect(result[0]).toEqual('1000000000.0000 ULTRA');

      // Restore the original implementation of getCurrencyBalance
      spyGetCurrencyBalance.mockRestore();
    });

    it('should throw an error if the account does not exist', async () => {
      const ultra = new Ultra({});
      const params = { code: 'ultra', account: 'account', symbol: 'ULTRA' };
      // Spy on the getCurrencyBalance function
      const spyGetCurrencyBalance = jest.spyOn(ultra, 'getCurrencyBalance');
      spyGetCurrencyBalance.mockRejectedValueOnce(
        new Error('Account does not exist'),
      );

      await expect(ultra.getCurrencyBalance(params)).rejects.toThrowError(
        'Account does not exist',
      );

      // Restore the original implementation of getCurrencyBalance
      spyGetCurrencyBalance.mockRestore();
    });
  });

  describe('getInfo', () => {
    it('should call getInfo with the correct parameters and return the result', async () => {
      const ultra = new Ultra({});
      const expectedResult = {
        head_block_num: 1,
      };

      // Spy on the getInfo function
      const spyGetInfo = jest.spyOn(ultra, 'getInfo');
      spyGetInfo.mockResolvedValueOnce(expectedResult as tGetInfoOutput);

      const result = await ultra.getInfo();
      // Assert that the getInfo function was called with the correct parameters
      expect(spyGetInfo).toHaveBeenCalledWith();

      // Assert that the result is equal to the expected result
      expect(result.head_block_num).toEqual(1);

      // Restore the original implementation of getInfo
      spyGetInfo.mockRestore();
    });
    it('should throw an error if the getInfo function fails', async () => {
      const ultra = new Ultra({});
      // Spy on the getInfo function
      const spyGetInfo = jest.spyOn(ultra, 'getInfo');
      spyGetInfo.mockRejectedValueOnce(new Error('Error'));

      await expect(ultra.getInfo()).rejects.toThrowError('Error');

      // Restore the original implementation of getInfo
      spyGetInfo.mockRestore();
    });
  });
});

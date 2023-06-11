import * as crossFetch from 'cross-fetch';
import { Api, JsonRpc } from 'eosjs';
import { type TransactConfig } from 'eosjs/dist/eosjs-api-interfaces';
import { type JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { type Action } from 'eosjs/dist/eosjs-serialize';

import {
  type QueryArgs,
  type TransactionArgs,
  type UpdateAuthArgs,
  type QueryTableRes,
} from '../../types';

class UltraService {
  public rpcEndpoint: string | undefined;
  public rpc: JsonRpc | undefined;
  public api: Api | undefined;
  public transactionConfig: TransactConfig = {
    blocksBehind: 3,
    expireSeconds: 30,
  };

  constructor(rpcEndpoint: string) {
    this.rpcEndpoint = rpcEndpoint;
    this.rpc = new JsonRpc(rpcEndpoint, crossFetch);
  }

  disconnect() {
    this.rpc = undefined;
    this.api = undefined;
  }

  async signTx<tData>({
    action,
    data,
    contractName,
    signerName,
  }: TransactionArgs<tData>) {
    // Abstract out the transaction logic
    if (!this.api) throw new Error('api not initialized');

    try {
      const result = await this.api.transact(
        {
          actions: [
            {
              account: contractName,
              name: action,
              authorization: [{ actor: signerName, permission: 'active' }],
              data,
            },
          ],
        },
        this.transactionConfig,
      );

      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  populateTx<tData>({
    action,
    data,
    contractName,
    signerName,
  }: TransactionArgs<tData>): Action[] {
    return [
      {
        account: contractName,
        name: action,
        authorization: [{ actor: signerName, permission: 'active' }],
        data,
      },
    ];
  }

  async getTable<Row>({
    table,
    index,
    keyType,
    lowerBound,
    upperBound,
    limit,
    scope,
  }: QueryArgs): Promise<QueryTableRes<Row>> {
    // Abstract out the query table logic

    if (!this.rpc) throw new Error('rpc not initialized');
    const result = await this.rpc.get_table_rows({
      json: true,
      code: scope,
      scope,
      table,
      index_position: index,
      key_type: keyType,
      lower_bound: lowerBound,
      upper_bound: upperBound,
      limit,
    });

    return result as QueryTableRes<Row>;
  }

  async balance(
    account: string,
    symbol: string | undefined = undefined,
  ): Promise<number> {
    if (!this.rpc) throw new Error('rpc not initialized');

    try {
      const res = await this.rpc.get_currency_balance(
        'eosio.token',
        account,
        symbol,
      );
      if (res && res.length > 0) {
        return parseFloat(res[0].split(' ')[0]);
      }

      return 0;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  async uosBalance(account: string): Promise<number> {
    return this.balance(account);
  }

  async updateAuth({
    account,
    newPermissionActor,
    newPermissionName,
    contractName,
  }: {
    account: string;
    newPermissionActor: string;
    newPermissionName: string;
    contractName: string;
  }) {
    if (!this.rpc) throw new Error('rpc not initialized');
    if (!this.api) throw new Error('api not initialized');
    const accountInfo = await this.rpc.get_account(account);

    const activePermission = accountInfo.permissions.find(
      permission => permission.perm_name === 'active',
    );

    if (!activePermission) throw new Error('Active permission not found');

    const hasPermission = activePermission.required_auth.accounts.some(
      acc =>
        acc.permission.actor === newPermissionName &&
        acc.permission.actor === newPermissionActor,
    );

    if (hasPermission) return;

    const actionData: UpdateAuthArgs = {
      account: contractName,
      name: 'updateauth',
      authorization: [{ actor: account, permission: 'owner' }],
      data: {
        account,
        permission: 'active',
        parent: 'owner',
        auth: {
          threshold: activePermission.required_auth.threshold,
          keys: activePermission.required_auth.keys,
          accounts: [
            ...activePermission.required_auth.accounts,
            {
              permission: {
                actor: newPermissionActor,
                permission: newPermissionName,
              },
              weight: 1,
            },
          ],
          waits: [],
        },
      },
    };

    try {
      const result = await this.api.transact(
        {
          actions: [actionData],
        },
        this.transactionConfig,
      );
      return result;
    } catch (error) {
      console.error('Error CODE:', error);
      throw error;
    }
  }

  async addUosPermission({
    account,
    contractName,
  }: {
    account: string;
    contractName: string;
  }) {
    try {
      const res = await this.updateAuth({
        account,
        newPermissionActor: contractName,
        newPermissionName: 'eosio.code',
        contractName: 'eosio',
      });
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async transfer({
    from,
    to,
    quantity,
    memo,
  }: {
    from: string;
    to: string;
    quantity: string;
    memo: string;
  }) {
    try {
      const res = await this.signTx({
        action: 'transfer',
        data: {
          from,
          to,
          quantity,
          memo,
        },
        contractName: 'eosio.token',
        signerName: from,
      });

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  protected initApi(signatureProvider: JsSignatureProvider) {
    if (!this.rpc) throw new Error('rpc not initialized');
    this.api = new Api({
      rpc: this.rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
  }
}

export default UltraService;

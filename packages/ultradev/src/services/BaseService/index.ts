import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { type QueryArgs, type Signer } from '../../types/cdt';
import UltraService from '../UltraService';

type Init = {
  rpcEndpoint: string;
  signer: Signer;
  name: string;
};

/**
 * Interface for the constructor parameters of BaseService.
 */
class BaseService extends UltraService {
  public signer: Signer;
  public name: string;

  constructor({ rpcEndpoint, signer, name }: Init) {
    super(rpcEndpoint);
    const signatureProvider = new JsSignatureProvider([signer.privateKey]);
    this.initApi(signatureProvider);
    this.name = name;
    this.signer = signer;
  }

  connect(_signer: Signer): this {
    const newSignatureProvider = new JsSignatureProvider([_signer.privateKey]);
    this.initApi(newSignatureProvider);
    this.signer = _signer;
    return this;
  }

  async sendTransaction<tData>({
    action,
    data,
  }: {
    action: string;
    data: tData;
  }) {
    try {
      const result = await this.signTx<tData>({
        action,
        data,
        contractName: this.name,
        signerName: this.signer.name,
      });

      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  populateTransaction<tData>({
    action,
    data,
  }: {
    action: string;
    data: tData;
  }) {
    return this.populateTx<tData>({
      action,
      data,
      contractName: this.name,
      signerName: this.signer.name,
    });
  }

  async queryTable<tRow>({
    table,
    index,
    keyType,
    lowerBound,
    upperBound,
    limit,
  }: QueryArgs) {
    return this.getTable<tRow>({
      table,
      index,
      keyType,
      lowerBound,
      upperBound,
      limit,
      scope: this.name,
    });
  }

  async getBalance(symbol: string): Promise<number> {
    const balance = await super.balance(this.name, symbol);
    return balance;
  }

  async getUosBalance(): Promise<number> {
    const balance = await super.uosBalance(this.name);
    return balance;
  }

  async updateAuth({
    account,
    newPermissionActor,
    newPermissionName,
    contractName,
  }: {
    account?: string;
    newPermissionActor: string;
    newPermissionName: string;
    contractName: string;
  }) {
    if (!account) account = this.signer.name;
    try {
      const res = await super.updateAuth({
        account,
        newPermissionActor,
        newPermissionName,
        contractName,
      });
      return res;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  }

  async addUosPerm(account?: string) {
    if (!account) account = this.signer.name;
    try {
      const res = await super.addUosPermission({
        account,
        contractName: this.name,
      });
      return res;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  }

  // async addCodePermission(_account?: string): Promise<any> {
  //   if (!_account) _account = this.signer.name;
  //   const accountInfo = await this.rpc?.get_account(_account);
  //   const activePermission = accountInfo?.permissions.find(
  //     (permission) => permission.perm_name === "active"
  //   );

  //   if (!activePermission) throw new Error("Active permission not found");

  //   const hasCodePermission = activePermission?.required_auth.accounts.some(
  //     (acc) =>
  //       acc.permission.actor === "eosio.code" &&
  //       acc.permission.actor === this.name
  //   );

  //   if (hasCodePermission) return;

  //   const actionData = {
  //     account: "eosio",
  //     name: "updateauth",
  //     authorization: [
  //       {
  //         actor: _account,
  //         permission: "owner",
  //       },
  //     ],
  //     data: {
  //       account: _account,
  //       permission: "active",
  //       parent: "owner",
  //       auth: {
  //         threshold: activePermission?.required_auth.threshold,
  //         keys: activePermission?.required_auth.keys,
  //         accounts: [
  //           ...activePermission.required_auth.accounts,
  //           {
  //             permission: {
  //               actor: this.name,
  //               permission: "eosio.code",
  //             },
  //             weight: 1,
  //           },
  //         ],
  //         waits: [],
  //       },
  //     },
  //   };

  //   try {
  //     await this.api?.transact(
  //       {
  //         actions: [actionData],
  //       },
  //       this.transactConfig
  //     );
  //   } catch (error) {
  //     console.error("Error CODE:", error);
  //   }
  // }
}

export default BaseService;

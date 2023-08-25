// istanbul ignore file

import { type tChainName, CHAINS } from '../../..';
import { type tListedUniq, type Api } from '../../../apis';
import { eActions, eContracts, eErrors } from '../../constants';

import {
  type tExt,
  type tUltraAccount,
  type tAccountOptions,
  type tAccount,
  type tConnect,
  type tBuyUniq,
  type tResellUniq,
  type tCancelResellUniq,
  type tTransferUniq,
  type tTransferUos,
  type tSetAvatar,
  type tfetchAccountData,
} from '../../types';

/**
 * @category Account
 * @name Account
 * @param {tAccountOptions} options - The ultra account options
 * @description This class is used to interact with the Ultra Account via the extensions */

class Account implements tAccount {
  extension: tExt;
  current: tUltraAccount | undefined;
  private readonly _api: Api;

  constructor(options: tAccountOptions) {
    this._api = options.api;
    this.extension = options.ext;
  }

  public async changeChain(chainName: tChainName) {
    const chain = CHAINS[chainName];
    this.current = undefined;
    this._api.updateBpApiEndpoint(chain.bpApiEndpoint);
  }

  public async connect(props?: tConnect): Promise<tUltraAccount> {
    try {
      const response = await this.extension?.connect(props);
      if (response?.status !== 'success') {
        throw new Error('Failed to connect to Ultra');
      }

      const accountName = response.data.blockchainid.split('@')[0];
      this.current = await this.fetchAccountData({
        account: accountName,
        withAvatarManifest: props?.withAvatarManifest ?? false,
      });
      return this.current;
    } catch (err) {
      throw new Error("Couldn't connect to Ultra");
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.extension?.disconnect();
      this.current = undefined;
    } catch (err) {
      throw new Error("Couldn't disconnect from Ultra");
    }
  }

  public async fetchAccountData({
    account,
    withAvatarManifest,
  }: tfetchAccountData): Promise<tUltraAccount> {
    if (!withAvatarManifest) {
      withAvatarManifest = false;
    }

    if (!account) {
      account = this.current?.data?.account_name ?? '';
    }

    const ultraAccount: tUltraAccount = {
      data: undefined,
      ownedUniqs: undefined,
      listedUniqs: undefined,
      avatar: {
        nft_id: undefined,
        factory_id: undefined,
        manifest: undefined,
      },
    };

    ultraAccount.data = await this._api.getAccount({ accountName: account });
    ultraAccount.ownedUniqs = (await this._api.getUniqsOwned(account)).rows;
    ultraAccount.listedUniqs = (
      await this._api.getListedUniqs({
        config: {
          limit: 10000,
        },
      })
    ).rows?.filter((uniq: tListedUniq) => uniq.owner === account);

    const avatarFactoryId = ultraAccount.ownedUniqs?.find(
      uniq => uniq.id === ultraAccount.data?.avatar_id,
    )?.token_factory_id;

    ultraAccount.avatar = {
      nft_id: ultraAccount.data?.avatar_id,
      factory_id: avatarFactoryId,
      manifest:
        withAvatarManifest && avatarFactoryId
          ? await this._api.getFactoryManifested(avatarFactoryId, {
              square: true,
            })
          : undefined,
    };

    return ultraAccount;
  }

  public checkIsWalletInstalled(): boolean {
    return typeof this.extension === 'object';
  }

  public async signTransaction<TAction, TRes>(txObject: TAction) {
    try {
      const response = await this.extension?.signTransaction(txObject);
      if (response?.status !== 'success') {
        console.log(response);
        throw new Error('Failed to sign transaction');
      }

      return response.data as TRes;
    } catch (err) {
      console.error(err);
      throw new Error(eErrors.SIGN_TRANSACTION);
    }
  }

  public async buyUniq<TRes>({
    token_id,
    receiver,
    memo,
    max_price,
    promoter_id,
  }: tBuyUniq) {
    try {
      const response = await this.signTransaction({
        action: eActions.BUY,
        contract: eContracts.NFT,
        data: {
          buy: {
            token_id,
            buyer: this.current?.data?.account_name,
            receiver,
            max_price,
            memo,
            promoter_id,
          },
        },
      });

      if (!response) {
        throw new Error(eErrors.BUY_UNIQ);
      }

      return response as TRes;
    } catch (err) {
      throw new Error(eErrors.BUY_UNIQ);
    }
  }

  public async resellUniq<TRes>({
    token_id,
    price,
    promoter_basis_point,
  }: tResellUniq) {
    try {
      const res = await this.signTransaction({
        action: eActions.RESELL,
        contract: eContracts.NFT,
        data: {
          resell: {
            seller: this.current?.data?.account_name,
            token_id,
            memo: 'Listed Via UTA',
            price: `${parseFloat(price).toFixed(8)} UOS`,
            promoter_basis_point,
          },
        },
      });

      if (!res) {
        throw new Error(eErrors.RESELL_UNIQ);
      }

      return res as TRes;
    } catch (err) {
      throw new Error(eErrors.RESELL_UNIQ);
    }
  }

  public async cancelResellUniq<tRes>({ token_id }: tCancelResellUniq) {
    try {
      const res = await this.signTransaction({
        action: eActions.CANCEL_RESELL,
        contract: eContracts.NFT,
        data: {
          cancelresell: {
            token_id,
            memo: 'Sale closed via UTA!',
          },
        },
      });

      if (!res) {
        throw new Error(eErrors.CANCEL_RESELL_UNIQ);
      }

      return res as tRes;
    } catch (err) {
      throw new Error(eErrors.CANCEL_RESELL_UNIQ);
    }
  }

  public async transferUniq<TRes>({ token_ids, to, memo }: tTransferUniq) {
    try {
      const res = await this.signTransaction({
        action: eActions.TRANSFER,
        contract: eContracts.NFT,
        data: {
          transfer: {
            from: this.current?.data?.account_name,
            to,
            token_ids,
            memo: memo ?? 'Transferred via UTA',
          },
        },
      });

      if (!res) {
        throw new Error(eErrors.TRANSFER_UNIQ);
      }

      return res as TRes;
    } catch (err) {
      throw new Error(eErrors.TRANSFER_UNIQ);
    }
  }

  public async transferUos<TRes>({ to, quantity, memo }: tTransferUos) {
    try {
      const res = await this.signTransaction({
        action: eActions.TRANSFER,
        contract: eContracts.TOKEN,
        data: {
          from: this.current?.data?.account_name,
          to,
          quantity: `${parseFloat(quantity).toFixed(8)} UOS`,
          memo: memo ?? 'Transferred via UTA',
        },
      });

      if (!res) {
        throw new Error(eErrors.TRANSFER_UOS);
      }

      return res as TRes;
    } catch (err) {
      throw new Error(eErrors.TRANSFER_UOS);
    }
  }

  public async setAvatar<TRes>({ nft_id }: tSetAvatar) {
    try {
      const res = await this.signTransaction({
        action: eActions.SET_AVATAR,
        contract: eContracts.AVATAR,
        data: {
          user: this.current?.data?.account_name,
          nft_id,
        },
      });

      if (!res) {
        throw new Error(eErrors.SET_AVATAR);
      }

      return res as TRes;
    } catch (err) {
      throw new Error(eErrors.SET_AVATAR);
    }
  }

  public async clearAvatar<TRes>() {
    try {
      const res = await this.signTransaction({
        action: eActions.CLEAR_AVATAR,
        contract: eContracts.AVATAR,
        data: {
          user: this.current?.data?.account_name,
        },
      });

      if (!res) {
        throw new Error(eErrors.CLEAR_AVATAR);
      }

      return res as TRes;
    } catch (err) {
      throw new Error(eErrors.CLEAR_AVATAR);
    }
  }
}

export default Account;

// istanbul ignore file
import { type Api } from '../../apis';
import {
  type tListedUniq,
  type tGetAccountOutput,
  type tTokenA,
} from '../../apis';
import { type tValidInput } from '../../utilities';

/**
 * @category Account
 * A response from the Ultra Wallet extension
 */
export type tExtResponse<T> = {
  status: 'fail' | 'success' | 'error';
  data: T;
  message?: string;
};

/**
 * @category Account
 * A response from the connect method of the Ultra Wallet extension
 */
export type tExtConnectOutput = {
  blockchainid: string;
  publicKey: string;
};

/**
 * @category Account
 * The interface of the methods of the Ultra Wallet extension
 */

export type tConnect = {
  onlyIfTrusted?: boolean;
};

export type tExt = {
  connect: (props?: tConnect) => Promise<tExtResponse<tExtConnectOutput>>;
  disconnect: () => Promise<tExtResponse<void>>;
  signTransaction: <TAction, TRes>(
    txObject: TAction,
  ) => Promise<tExtResponse<TRes>>;
};

/**
 * @category Account
 * The options ot create a Wallet instance
 */
export type tAccountOptions = {
  ext: tExt;
  api: Api;
};

/**
 * @category Account
 * The interface of the UltraAccount class
 */

export type tUltraAccount = {
  data: tGetAccountOutput | undefined;
  ownedUniqs: tTokenA[] | undefined;
  listedUniqs: tListedUniq[] | undefined;
};

export type tBuyUniq = {
  token_id: tValidInput;
  receiver: string;
  memo: string;
  max_price: string;
  promoter_id?: string | null;
};

export type tResellUniq = {
  token_id: tValidInput;
  price: string;
  promoter_basis_point: number;
  memo: string;
};

export type tCancelResellUniq = {
  token_id: tValidInput;
  memo?: string;
};

export type tTransferUniq = {
  token_ids: tValidInput[];
  to: string;
  memo?: string;
};

export type tTransferUos = {
  memo?: string;
  to: string;
  quantity: string;
};

/**
 * @category Account
 */
export type tAccount = {
  extension: tExt;
  current: tUltraAccount | undefined;
  connect: (props?: tConnect) => Promise<tUltraAccount>;
  disconnect: () => Promise<void>;
  refetchAccountData: (account?: string) => Promise<tUltraAccount>;
  checkIsWalletInstalled: () => boolean;
  signTransaction: <TAction, TRes>(txObject: TAction) => Promise<TRes>;
  buyUniq: <TRes>(props: tBuyUniq) => Promise<tExtResponse<TRes>>;
  resellUniq: <TRes>(props: tResellUniq) => Promise<tExtResponse<TRes>>;
  cancelResellUniq: <TRes>(
    props: tCancelResellUniq,
  ) => Promise<tExtResponse<TRes>>;
  transferUniq: <TRes>(props: tTransferUniq) => Promise<tExtResponse<TRes>>;
  transferUos: <TRes>(props: tTransferUos) => Promise<tExtResponse<TRes>>;
};

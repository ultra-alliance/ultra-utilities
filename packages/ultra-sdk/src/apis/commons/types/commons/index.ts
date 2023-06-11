import { type tManifest } from '../../../../utilities';

/**
 * Represents a generic object for http request.
 * @category API Commons
 */
export type tHttp = {
  path: string;
  config: RequestInit;
};

/**
 * Represents a generic object for http get request.
 * @category API Commons
 */
export type tGet = {
  path: string;
  config?: RequestInit;
};

/**
 * Represents a generic object for http post request.
 * @category API Commons
 */
export type tPost<T> = {
  path: string;
  body: T;
  config?: RequestInit;
};

/**
 * Represents a generic object for http put request.
 * @category API Commons
 */
export type tPut<T> = {
  path: string;
  body: T;
  config?: RequestInit;
};

/**
 * represets a generic object
 * @category API Commons
 */
export type tRoute<T> = {
  path: string;
  method: string;
  args?: T;
};

/**
 * Represents an ABI field.
 * @category Ultra Commons
 */
export type tAbiField = {
  name: string;
  type: string;
};

/**
 * Represents an ABI struct.
 * @category Ultra Commons
 */
export type tAbiStruct = {
  name: string;
  base: string;
  fields: tAbiField[];
};

/**
 * Represents an ABI action.
 * @category Ultra Commons
 */
export type tAbiAction = {
  name: string;
  type: string;
  ricardian_contract: string;
};

/**
 * Represents an ABI table.
 * @category Ultra Commons
 */
export type tAbiTable = {
  name: string;
  index_type: string;
  key_names: string[];
  key_types: string[];
  type: string;
};

/**
 * Represents an ABI.
 * @category Ultra Commons
 */
export type tAbi = {
  version: string;
  types: unknown[];
  structs: tAbiStruct[];
  actions: tAbiAction[];
  tables: tAbiTable[];
  ricardian_clauses: unknown[];
  error_messages: unknown[];
  abi_extensions: unknown[];
  variants: unknown[];
};

/**
 * Represents an Ultra error.
 * @category API Commons
 */
export type tUltraError = Error & {
  code?: number;
};

/**
 * Represents a token.
 * @category Ultra Commons
 */
export type tTokenA = {
  id: number;
  token_factory_id: number;
  mint_date: string;
  serial_number: number;
};

/**
 * Represents the resale share details of an uniq.
 * @category Ultra Commons
 */
export type tResaleShare = {
  receiver: string;
  basis_point: number;
};

/**
 * Represents an Factory.
 * @category Ultra Commons
 */
export type tFactory = {
  id: number;
  asset_manager: string;
  asset_creator: string;
  minimum_resell_price: string;
  resale_shares: tResaleShare[];
  mintable_window_start: null;
  mintable_window_end: null;
  trading_window_start: null;
  trading_window_end: null;
  recall_window_start: number;
  recall_window_end: null;
  lockup_time: number;
  conditionless_receivers: string[];
  stat: number;
  factory_uri: string;
  factory_hash: string;
  default_token_hash: string;
  default_token_uri: string;
  max_mintable_tokens: number;
  minted_tokens_no: number;
  existing_tokens_no: number;
  authorized_tokens_no: null;
  account_minting_limit: null;
};

/**
 * Represents a listed uniq.
 * @category Ultra Commons
 */
export type tListedUniq = {
  token_id: number;
  owner: string;
  price: string;
  promoter_basis_point: number;
};

/**
 * Represents a manifested factory.
 * @category Ultra Commons
 */
export type tFactoryManifested = {
  data: tFactory;
  manifest: tManifest;
};

export type tHttp = {
  path: string;
  config: RequestInit;
};

export type tGet = {
  path: string;
  config?: RequestInit;
};

export type tPost<T> = {
  path: string;
  body: T;
  config?: RequestInit;
};

export type tPut<T> = {
  path: string;
  body: T;
  config?: RequestInit;
};

export type tRoute<T> = {
  path: string;
  method: string;
  args?: T;
};

export type tAbiField = {
  name: string;
  type: string;
};

export type tAbiStruct = {
  name: string;
  base: string;
  fields: tAbiField[];
};

export type tAbiAction = {
  name: string;
  type: string;
  ricardian_contract: string;
};

export type tAbiTable = {
  name: string;
  index_type: string;
  key_names: string[];
  key_types: string[];
  type: string;
};

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

export type tTableRow = {
  [key: string]: unknown;
  id: number;
  asset_manager: string;
};

export type tUltraError = Error & {
  code?: number;
};

export type tTokenA = {
  id: number;
  token_factory_id: number;
  mint_date: string;
  serial_number: number;
};

export type tResaleShare = {
  receiver: string;
  basis_point: number;
};

export type tUniq = {
  id: number;
  asset_manager: string;
  asset_creator: string;
  conversion_rate_oracle_contract: string;
  chosen_rate: never[];
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
  meta_uris: string[];
  meta_hash: string;
  max_mintable_tokens: number;
  minted_tokens_no: number;
  existing_tokens_no: number;
  authorized_tokens_no: null;
  account_minting_limit: null;
};

export type tListedUniq = {
  token_id: number;
  owner: string;
  price: string;
  promoter_basis_point: number;
};

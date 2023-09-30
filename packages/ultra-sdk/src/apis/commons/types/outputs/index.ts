import { type tTokenA, type tAbi } from '../commons';

/**
 * Represents output for `getAccount` function.
 * @category API Outputs
 */

export type tGetAccountOutput = {
  avatar_id?: number;
  account_name: string;
  head_block_num: number;
  head_block_time: string;
  privileged: boolean;
  last_code_update: string;
  created: string;
  core_liquid_balance: string;
  ram_quota: number;
  net_weight: number;
  cpu_weight: number;
  net_limit: {
    used: number;
    available: number;
    max: number;
  };
  cpu_limit: {
    used: number;
    available: number;
    max: number;
  };
  ram_usage: number;
  permissions: Array<{
    perm_name: string;
    parent: string;
    required_auth: Array<{
      threshold: number;
      keys: string[];
      accounts: Array<{
        permission: {
          actor: string;
          permission: string;
        };
        weight: number;
      }>;
    }>;
  }>;
  total_resources: {
    owner: string;
    power_weight: string;
    ram_bytes: number;
    flags: number;
  } | null;
  self_delegated_bandwidth: null;
  refund_request: null;
};

/**
 * Represents output for `getBlock` function.
 * @category API Outputs
 */
export type tGetBlockOutput = {
  timestamp: string;
  producer: string;
  confirmed: number;
  previous: string;
  transaction_mroot: string;
  action_mroot: string;
  schedule_version: number;
  new_producers: null;
  producer_signature: string;
  transactions: unknown[];
  id: string;
  block_num: number;
  ref_block_prefix: number;
};

/**
 * Represents output for `getAvatar` function.
 * @category API Outputs
 */

export type tGetAvatarOutput = tGetTableRowsOutput<{ nft_id: number }>;

/**
 * Represents output for `getUniqOwned` function.
 * @category API Outputs
 */

export type tGetUniqOwnedOutput = tGetTableRowsOutput<tTokenA>;

/**
 * Represents output for `getAbi` function.
 * @category API Outputs
 */
export type tGetAbiOutput = {
  account_name: string;
  abi: tAbi;
};

/**
 * Represents output for `getCurrencyBalance` function.
 * @category API Outputs
 */
export type tGetCurrencyBalanceOutput = string[];

/**
 * Represents output for `getInfo` function.
 * @category API Outputs
 */
export type tGetInfoOutput = {
  server_version: string;
  chain_id: string;
  head_block_num: number;
  last_irreversible_block_num: number;
  last_irreversible_block_id: string;
  head_block_id: string;
  head_block_time: string;
  head_block_producer: string;
  virtual_block_net_limit: number;
  block_cpu_limit: number;
  block_net_limit: number;
  server_version_string: string;
  fork_db_head_block_num: number;
  fork_db_head_block_id: string;
  server_full_version_string: string;
};

/**
 * @category API Outputs
 */
export type tGetTableByScopeOutput = {
  rows: Array<{
    [key: string]: unknown;
    code: string;
    scope: string;
    table: string;
    payer: string;
    count: number;
  }>;
  more: string;
};

/**
 * Represents output for `getTableRows` function.
 * @category API Outputs
 */
export type tGetTableRowsOutput<TRow> = {
  rows: TRow[];
  more: boolean;
  next_key: string;
};

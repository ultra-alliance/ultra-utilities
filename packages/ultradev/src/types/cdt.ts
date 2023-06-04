/* eslint-disable @typescript-eslint/no-explicit-any */

import { type Api, type JsonRpc } from 'eosjs';
import { type ecc } from 'eosjs/dist/eosjs-ecc-migration';
import { type Authority } from 'eosjs/dist/eosjs-rpc-interfaces';
import { type AssertService } from '../services';

export type QueryArgs = {
  table: string;
  index?: string;
  keyType?: string;
  lowerBound?: string;
  upperBound?: string;
  limit?: number;
  scope?: string;
};

export type TransactionArgs<Data> = {
  action: string;
  data: Data;
  contractName: string;
  signerName: string;
};

export type UpdateAuthArgs = {
  account: string;
  name: string;
  authorization: Array<{ actor: string; permission: string }>;
  data: {
    account: string;
    permission: string;
    parent: string;
    auth: Authority;
  };
};

export type QueryTableRes<Row> = {
  more: boolean;
  next_key: string;
  next_key_bytes?: string;
  rows: Row[];
};

export type Signer = {
  privateKey: string;
  name: string;
};

export type TypeGenConfig = {
  outdir: string;
  target: 'eosjs' | 'chrome-extension';
};

export type CleosOptions = {
  swallow: boolean;
  fetch: boolean;
};

export type ImportContractConfig = {
  account: string;
  contract: string;
};

export type TestingConfig = {
  requiresSystemContracts: boolean;
  importContracts: ImportContractConfig[];
  requiredAccounts: string[];
  requiredUnlimitedAccounts: string[];
};

export type DirectoriesConfig = {
  sources: string;
  tests: string;
  scripts: string;
  artifacts: string;
  includes: string;
  ricardians: string;
};

export type NetworkConfig = {
  rpcEndpoint: string;
  signer: Signer;
};

export type UltraDevConfig = {
  directories: DirectoriesConfig;
  typegen: TypeGenConfig;
  testing: TestingConfig;
  network: NetworkConfig;
};

export type Keychain = {
  generateAndReturnPublicKey: (account: string) => Promise<string>;
  getAccountKeys: (account: string) => string[] | null;
  setAccountKeys: (account: string, keyObject: any) => Promise<void>;
  getAllPublicKeys: () => string[];
  getPrivateKey: (publicKey: string) => string | null;
  getPublicKeyFromAccount: (account: string) => string | null;
  getPrivateKeyFromAccount: (account: string) => string | null;
  sign: (
    signArgs: object,
  ) => Promise<{ signatures: string[]; serializedTransaction: any }>; // Replace any with specific type
};

export type Common = {
  getSingleton: (account: string, scope: string, table: string) => Promise<any>; // Replace any with actual data structure
  getTable: (
    account: string,
    scope: string,
    table: string,
    limit?: number,
    showMore?: boolean,
  ) => Promise<any>; // Replace any with actual data structure
  getScopes: (account: string) => Promise<any>; // Replace any with actual data structure
  getAccount: (account: string) => Promise<any>; // Replace any with actual data structure
  createAccount: (
    account: string,
    ram?: number,
    tokens?: number,
  ) => Promise<boolean>;
  addUOS: (name: string, amount: string | number) => Promise<any>; // Replace any with actual data structure
  transfer: (
    from: string,
    to: string,
    fixedAmount: number,
    memo?: string,
  ) => Promise<any>; // Replace any with actual data structure
  transactAssert: (
    actions: Array<{
      account: string;
      name: string;
      authorization: Array<{ actor: string; permission: string }>;
      data: object;
    }>,
    assertionMessage: string,
  ) => Promise<boolean>;
  pushAction: (
    code: string,
    action: string,
    authority: string,
    args: any[],
  ) => Promise<any>; // Replace any with actual data structure
  getBalance: (account: string) => Promise<number>;
  addCodePermission: (account: string, permission?: string) => Promise<any>; // Replace any with actual data structure
  sleep: (milliseconds: number) => Promise<void>;
  post: (endpoint: string, body: object) => Promise<any>; // Replace any with actual data structure
  get: (endpoint: string) => Promise<any>; // Replace any with actual data structure
  updateAuth: (
    account: string,
    parent: string,
    permission: string,
    weight: number,
    keys: object[],
    accounts: object[],
  ) => Promise<any>; // Replace any with actual data structure
};

export type UltraTest = {
  assert: (condition: boolean, errorMessage: string) => void;
  endpoint: string;
  cleos: (command: string, options: CleosOptions) => Promise<any>; // Promise type depends on usage
  rpc: JsonRpc; // Add specific type according to eosjs documentation
  api: Api; // Add specific type according to eosjs documentation
  ecc: typeof ecc; // Add specific type according to eosjs documentation
  keychain: Keychain;
  common: Common;
};

export type TestFunc = () => Promise<void>;
export type TestGroup = Record<string, TestFunc>;
export type TestBlock = Record<string, TestFunc | TestGroup>;
export type SignerMap = Record<string, Signer>;

export type TestUtils<Suite = any, Services = any> = {
  ultratest: UltraTest;
  getRequiredAccounts: () => SignerMap;
  getSuite: () => Suite;
  getServices: () => Services;
  assert: AssertService['assert'];
};

export type BeforeEach<Suite = any, Services = any> = (
  oarams: TestUtils<Suite, Services>,
) => Promise<Suite>;

export type MakeUltra<Suite = any, Services = any> = (
  params: TestUtils<Suite, Services>,
) => TestBlock;

export type MakeUltraConfig<Suite = any, Services = any> = {
  beforeEach?: BeforeEach<Suite, Services>;
};

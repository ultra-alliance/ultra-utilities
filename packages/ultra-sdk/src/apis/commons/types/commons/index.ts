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

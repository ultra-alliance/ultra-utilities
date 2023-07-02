import { camelCase } from 'lodash';
import { type Abi } from '../../types';

enum eNamespaces {
  Action = 'ActionNames',
  Table = 'TableNames',
  Data = 'DataTypes',
  Contract = 'ContractNames',
}

const getType = (fieldType: string): string => {
  switch (fieldType) {
    case 'name':
      return 'string';
    case 'uint64':
      return 'number';
    case 'asset':
      return 'string';
    default:
      return 'unknown';
  }
};

const formatType = (type: string): string => {
  const str = camelCase(type);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const genActionName = (actionName: string): string => {
  return `${eNamespaces.Action}.${actionName.toUpperCase()}`;
};

const genTableName = (tableName: string): string => {
  return `${eNamespaces.Table}.${tableName.toUpperCase()}`;
};

const genDataType = (type: string): string => {
  return `${eNamespaces.Data}.${formatType(type)}Struct`;
};

const genContractType = (type: 'account' | 'name'): string => {
  if (type === 'account') {
    return `${eNamespaces.Contract}.ACCOUNT`;
  }

  return `${eNamespaces.Contract}.NAME`;
};

const genContractNamespaces = (abi: Abi): string => {
  let output = '';

  output += `export declare namespace ${eNamespaces.Contract} {\n\n`;

  output += `export const NAME = '${abi.name}';\n`;
  output += `export const ACCOUNT = '${abi.account}';\n`;

  output += `}\n\n`;

  return output;
};

const genActionNamespaces = (abi: Abi): string => {
  let output = '';
  output += `export declare namespace ${eNamespaces.Action} {\n\n`;

  for (const action of abi.actions) {
    output += `export const ${action.name.toUpperCase()} = '${action.name}';\n`;
  }

  output += `}\n\n`;

  return output;
};

const genTableNamespaces = (abi: Abi): string => {
  let output = '';
  output += `export declare namespace ${eNamespaces.Table} {\n\n`;

  for (const table of abi.tables) {
    output += `export const ${table.name.toUpperCase()} = '${table.name}';\n`;
  }

  output += `}\n\n`;

  return output;
};

const genDataTypes = (abi: Abi): string => {
  let output = '';
  output += `export declare namespace ${eNamespaces.Data} {\n\n`;
  for (const struct of abi.structs) {
    output += `export type ${formatType(struct.name)}Struct = {\n`;
    for (const field of struct.fields) {
      output += `  ${field.name}: ${getType(field.type)};\n`;
    }

    output += `}\n\n`;
  }

  output += `}\n\n`;

  return output;
};

const genAbiToClass = async (abi: Abi, name: string): Promise<string> => {
  let output = `
  import {  BaseService, tGetTable, Signer } from '@ultra-alliance/ultradev'\n\n`;

  output += genContractNamespaces(abi);

  output += genActionNamespaces(abi);

  output += genTableNamespaces(abi);

  output += genDataTypes(abi);

  output += `export class ${name}Service extends BaseService {\n\n`;

  output += `  name: string;\n\n`;

  output += `  constructor({ rpcEndpoint, signer, name }: { rpcEndpoint: string, signer: Signer, name?:string }) {
    super({ rpcEndpoint, signer, name: name || ${genContractType('account')} });
    this.name = name || ${genContractType('account')};
  }\n\n`;

  for (const action of abi.actions) {
    output += `  async ${camelCase(action.name)}(data: ${genDataType(
      action.type,
    )}) {
      return this.sendTransaction({ action: ${genActionName(
        action.name,
      )}, data });
    }\n\n`;
  }

  for (const action of abi.actions) {
    output += `  ${camelCase(action.name)}Raw(data: ${genDataType(
      action.type,
    )}) {
      return this.populateTransaction({ action: ${genActionName(
        action.name,
      )}, data });
    }\n\n`;
  }

  for (const table of abi.tables) {
    output += `  async get${formatType(table.name)}Table({
      index,
      keyType,
      lowerBound,
      upperBound,
      limit,
    }: tGetTable) {
      return this.queryTable<${genDataType(
        table.type,
      )}>({ table: ${genTableName(
      table.name,
    )}, index, lowerBound, upperBound, keyType, limit });
    }\n\n`;
  }

  output += `}\n\n`;

  return output;
};

export default genAbiToClass;

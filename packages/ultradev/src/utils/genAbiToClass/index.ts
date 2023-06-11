import { camelCase } from 'lodash';
import { type Abi } from '../../types';

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

const genAbiToClass = async (
  abi: Abi,
  name: string,
  account: string,
): Promise<string> => {
  let output = `import  BaseService  from '@ultra-alliance/ultradev/dist/esm/services/BaseService'\n
  import { Signer } from '@ultra-alliance/ultradev'\n\n`;
  for (const struct of abi.structs) {
    output += `type ${formatType(struct.name)} = {\n`;
    for (const field of struct.fields) {
      output += `  ${field.name}: ${getType(field.type)};\n`;
    }

    output += `}\n\n`;
  }

  output += `type tGetTable = {
    index?: string;
    keyType?: string;
    lowerBound?: string;
    upperBound?: string;
    limit?: number;
  }\n\n`;

  output += `class ${name}Service extends BaseService {\n\n`;

  output += `  name: string;\n\n`;

  output += `  constructor({ rpcEndpoint, signer, name }: { rpcEndpoint: string, signer: Signer, name?:string }) {
    super({ rpcEndpoint, signer, name: name || '${account}' });
    this.name = name || '${account}';
  }\n\n`;

  for (const action of abi.actions) {
    output += `  async ${camelCase(action.name)}(data: ${formatType(
      action.type,
    )}) {
      return this.sendTransaction({ action: '${action.name}', data });
    }\n\n`;
  }

  for (const action of abi.actions) {
    output += `  ${camelCase(action.name)}Raw(data: ${formatType(
      action.type,
    )}) {
      return this.populateTransaction({ action: '${action.name}', data });
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
      return this.queryTable<${formatType(table.type)}>({ table: '${
      table.name
    }', index, lowerBound, upperBound, keyType, limit });
    }\n\n`;
  }

  output += `}\n\n`;

  output += `export default ${name}Service;`;

  return output;
};

export default genAbiToClass;

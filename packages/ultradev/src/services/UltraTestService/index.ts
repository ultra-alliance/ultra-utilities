import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { getUltraConfig } from '../../functions';
import { type UltraDevConfig } from '../../types';

class UltraTestService {
  config: UltraDevConfig;

  constructor() {
    // async function to loadconfig
    this.config = getUltraConfig();
  }

  findPath(base: string, name: string): string {
    for (const item of readdirSync(base)) {
      const itemPath = join(base, item);
      if (statSync(itemPath).isDirectory()) {
        const wasmPath = join(itemPath, `${name}.wasm`);
        if (existsSync(wasmPath)) return itemPath;
        const nested = this.findPath(itemPath, name);
        if (nested) return nested;
      }
    }

    return base;
  }

  async initialize() {
    this.config = getUltraConfig();
  }

  requiresSystemContracts() {
    return this.config?.testing.requiresSystemContracts;
  }

  importContracts() {
    if (!this.config?.directories.artifacts)
      throw new Error('artifacts directory not found');

    return this.config?.testing.importContracts?.map(contract => {
      const { contract: contractName, account } = contract;
      const path =
        '../.' + this.findPath(this.config.directories.artifacts, contractName);

      return {
        account,
        contract: contractName,
        path,
      };
    });
  }

  requiredAccounts() {
    return this.config?.testing.requiredAccounts;
  }

  requiredUnlimitedAccounts() {
    return this.config?.testing.requiredUnlimitedAccounts;
  }

  describe(description: string, tests: () => void) {
    console.log(`Describe: ${description}`);
    tests();
  }

  it(description: string, test: () => void) {
    console.log(`It: ${description}`);
    test();
  }
}

export default UltraTestService;

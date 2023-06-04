import { type UltraDevConfig } from '../../types';
import FileService from '../FileService';

const fileService = new FileService();

class UltraTestService {
  config: UltraDevConfig | undefined;

  constructor() {
    // async function to loadconfig
    this.config = fileService.getUltraConfig();
  }

  async initialize() {
    this.config = fileService.getUltraConfig();
  }

  requiresSystemContracts() {
    return this.config?.testing.requiresSystemContracts ?? false;
  }

  importContracts() {
    if (!this.config || this.config.directories.artifacts === undefined) {
      throw new Error('artifacts directory not found');
    }

    return this.config?.testing.importContracts?.map(contract => {
      const { contract: contractName, account } = contract;

      const path =
        '../.' +
        fileService.findPath(
          this.config?.directories?.artifacts ?? 'artifacts',
          contractName,
        );
      console.log(path);

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

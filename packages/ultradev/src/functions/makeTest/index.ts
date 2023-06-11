/* eslint-disable @typescript-eslint/no-explicit-any */
import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import AssertService from '../../services/AssertService/index';

import {
  type Keychain,
  type Signer,
  type UltraDevConfig,
  type UltraTest,
} from '../../types';

import getConfig from '../getConfig/index';
import getServices from '../getServices/index';
import getSigners from '../getSigners/index';

type SignerMap = Record<string, Signer>;

type TestUtils<Suite = any, Services extends object = any> = {
  ultratest: UltraTest;
  getServices: () => Services;
  getRequiredAccounts: () => SignerMap;
  getSuite: () => Suite;
  assert: AssertService['assert'];
};

type TestBlock = Record<string, () => Promise<void>>;

type TestConfig<Suite = any, Services extends object = any> = {
  beforeEach?: (params: TestUtils<Suite, Services>) => Promise<Suite>;
};

type TestFunction<Suite = any, Services extends object = any> = (
  utils: TestUtils<Suite, Services>,
) => TestBlock;

const makeTest = <Suite = any, Services extends object = any>(
  testConfig: TestConfig<Suite, Services>,
  testFx: TestFunction<Suite, Services>,
) => {
  return class test {
    config: UltraDevConfig;
    signersMap: SignerMap = {};
    suite: Suite;
    servicesMap = {} as unknown as Services;

    constructor() {
      this.config = getConfig();
      this.suite = {} as unknown as Suite;
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

    requiresSystemContracts() {
      return this.config.testing.requiresSystemContracts;
    }

    importContracts() {
      if (!this.config.directories.artifacts)
        throw new Error('artifacts directory not found');

      return this.config.testing.importContracts.map(contract => {
        const { contract: contractName, account } = contract;
        const path =
          '../../' +
          this.findPath(this.config.directories.artifacts, contractName);

        return {
          account,
          contract: contractName,
          path,
        };
      });
    }

    requiredAccounts() {
      return this.config.testing.requiredAccounts;
    }

    requiredUnlimitedAccounts() {
      return this.config.testing.requiredUnlimitedAccounts;
    }

    loadServices(_ultratest: UltraTest, _accounts: SignerMap) {
      if (!this.config.testing.importContracts) {
        throw new Error('importContracts not found');
      }

      this.servicesMap = getServices(
        this.config.testing.importContracts,
        _ultratest,
        _accounts,
      ) as Services;
    }

    loadSigners(keychain: Keychain) {
      if (!this.config.testing.requiredAccounts) {
        throw new Error('requiredAccounts not found');
      }

      this.signersMap = getSigners(
        this.config.testing.requiredAccounts,
        keychain,
      );
    }

    getServices(): Services {
      const contracts = this.config.testing.importContracts.map(
        c => c.contract,
      );
      if (!contracts) {
        throw new Error('contracts not found');
      }

      return new Proxy(this.servicesMap, {
        get(target, prop, receiver) {
          if (typeof prop === 'string' && !contracts.includes(prop)) {
            throw new Error(`Service ${String(prop)} not found in Services`);
          }

          return Reflect.get(target, prop, receiver);
        },
      });
    }

    getRequiredAccounts(): SignerMap {
      return new Proxy(this.signersMap, {
        get(target, prop, receiver) {
          if (typeof prop === 'string' && !(prop in target)) {
            throw new Error(`Account ${prop} not found in signersMap`);
          }

          return Reflect.get(target, prop, receiver) as SignerMap;
        },
      });
    }

    getSuite(): Suite {
      return this.suite;
    }

    tests(_ultratest: UltraTest) {
      this.loadSigners(_ultratest.keychain);
      this.loadServices(_ultratest, this.signersMap);
      const assertionInstance = new AssertService(_ultratest);

      const originalTests: TestBlock = testFx({
        ultratest: _ultratest,
        getRequiredAccounts: this.getRequiredAccounts.bind(this),
        getServices: this.getServices.bind(this),
        getSuite: this.getSuite.bind(this),
        assert: assertionInstance.assert.bind(assertionInstance),
      });

      let tests: TestBlock = {};

      if (
        testConfig.beforeEach === undefined ||
        testConfig.beforeEach === null
      ) {
        tests = originalTests;
      } else {
        Object.keys(originalTests).forEach(testName => {
          const originalTest = originalTests[testName];

          if (typeof originalTest === 'function') {
            tests[testName] = async () => {
              this.suite = testConfig.beforeEach
                ? await testConfig.beforeEach({
                    ultratest: _ultratest,
                    getRequiredAccounts: this.getRequiredAccounts.bind(this),
                    getServices: this.getServices.bind(this),
                    getSuite: this.getSuite.bind(this),
                    assert: assertionInstance.assert.bind(assertionInstance),
                  })
                : ({} as unknown as Suite);
              await originalTest();
            };
          }
        });
      }

      return tests;
    }
  };
};

export default makeTest;

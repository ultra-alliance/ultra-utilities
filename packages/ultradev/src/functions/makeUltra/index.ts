/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSigners, getServices } from '../../functions';
import { AssertService } from '../../services';

import { UltraTestService } from '../../services';

import {
  type Keychain,
  type MakeUltraConfig,
  type MakeUltra,
  type SignerMap,
  type UltraTest,
  type TestBlock,
} from './../../types';

export function makeUltra<Suite = any, Services extends object = any>(
  config: MakeUltraConfig<Suite, Services>,
  callback: MakeUltra<Suite, Services>,
) {
  const { beforeEach } = config;
  return class MyTest extends UltraTestService {
    signersMap: SignerMap = {};
    beforeEachRes: Suite | undefined;
    suite: Suite;
    servicesMap = {} as unknown as Services;

    constructor() {
      super();
      this.suite = {} as unknown as Suite;
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

    getServices(): Services {
      const contracts = this.config?.testing.importContracts.map(
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

    loadSigners(keychain: Keychain) {
      if (!this.config?.testing.requiredAccounts) {
        throw new Error('requiredAccounts not found');
      }

      this.signersMap = getSigners(
        this.config?.testing.requiredAccounts,
        keychain,
      );
    }

    loadServices(_ultratest: UltraTest, _accounts: SignerMap) {
      if (!this.config?.testing.importContracts) {
        throw new Error('importContracts not found');
      }

      this.servicesMap = getServices(
        this.config.testing.importContracts,
        _ultratest,
        _accounts,
      ) as Services;
    }

    preventRollback() {
      return false;
    }

    tests(_ultratest: any): TestBlock {
      this.loadSigners(_ultratest.keychain as Keychain);
      this.loadServices(_ultratest as UltraTest, this.signersMap);
      const assertionInstance = new AssertService(_ultratest as UltraTest);

      const originalTests: TestBlock = callback({
        ultratest: _ultratest as UltraTest,
        getRequiredAccounts: this.getRequiredAccounts.bind(this),
        getServices: this.getServices.bind(this),
        getSuite: this.getSuite.bind(this),
        assert: assertionInstance.assert.bind(assertionInstance),
      });

      let tests: TestBlock = {};

      if (beforeEach) {
        Object.keys(originalTests).forEach(testName => {
          const originalTest = originalTests[testName];

          if (typeof originalTest === 'function') {
            tests[testName] = async () => {
              this.suite = await beforeEach({
                ultratest: _ultratest as UltraTest,
                getRequiredAccounts: this.getRequiredAccounts.bind(this),
                getServices: this.getServices.bind(this),
                getSuite: this.getSuite.bind(this),
                assert: assertionInstance.assert.bind(assertionInstance),
              });
              await originalTest();
            };
          }
        });
      } else {
        tests = originalTests;
      }

      return tests;
    }
  };
}

export default makeUltra;

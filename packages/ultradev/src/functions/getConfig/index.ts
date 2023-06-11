/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from 'fs';
import path from 'path';
import { type UltraDevConfig } from '../../types';

const ALICE_PRIVATE_KEY = String(process.env.ALICE_PRIVATE_KEY);
const ALICE_ACCOUNT_NAME = String(process.env.ALICE_ACCOUNT_NAME);

const getConfig = (): UltraDevConfig => {
  const projectPath = process.cwd();
  let configPath;
  let obj: any;

  // First, check if the TypeScript version exists
  if (fs.existsSync(path.join(projectPath, 'cache/ultradev.config.js'))) {
    configPath = path.join(projectPath, 'cache/ultradev.config.js');

    // Require the compiled JavaScript config
    obj = require(configPath);
    return obj.default as UltraDevConfig;
  }

  return {
    network: {
      rpcEndpoint: 'http://127.0.0.1:8888',
      signer: {
        name: ALICE_PRIVATE_KEY,
        privateKey: ALICE_ACCOUNT_NAME,
      },
    },
    testing: {
      requiresSystemContracts: true,
      importContracts: [
        {
          account: 'bankcontract',
          contract: 'bank',
        },
      ],
      requiredAccounts: ['alice', 'bob'],
      requiredUnlimitedAccounts: ['zidane'],
    },
    directories: {
      sources: 'contracts',
      artifacts: 'artifacts',
      tests: 'tests',
      scripts: 'scripts',
      includes: 'includes',
      ricardians: 'resources',
    },
    typegen: {
      outdir: './typegen',
      target: 'eosjs',
    },
  };
};

export default getConfig;

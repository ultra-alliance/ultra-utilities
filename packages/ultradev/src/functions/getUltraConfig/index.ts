/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-new-func */
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
import { type UltraDevConfig } from '../../types';

const getUltraConfig = () => {
  try {
    const projectPath = process.cwd();
    let configPath;
    let config;

    // First, check if the TypeScript version exists
    if (fs.existsSync(path.join(projectPath, 'ultradev.config.ts'))) {
      configPath = path.join(projectPath, 'ultradev.config.ts');
      const configSource = fs.readFileSync(configPath, { encoding: 'utf-8' });

      // Transpile the TypeScript code to JavaScript
      const transpiled = transpileModule(configSource, {
        compilerOptions: {
          module: ModuleKind.CommonJS,
          target: ScriptTarget.ES2018,
        },
      });

      // Evaluate the JavaScript code to get the config object
      const configFn = new Function('exports', transpiled.outputText);
      config = {};
      configFn(config);
    } else if (fs.existsSync(path.join(projectPath, 'ultradev.config.js'))) {
      // If TypeScript version doesn't exist, check the JavaScript version
      configPath = path.join(projectPath, 'ultradev.config.js');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      config = require(configPath);
    } else {
      // Throw an error if no config file is found
      throw new Error(
        'No ultradev.config.js/ts found in the current directory.',
      );
    }

    return JSON.parse(JSON.stringify(config.default)) as UltraDevConfig;
  } catch (error) {
    console.log(chalk.red.bold('\nError loading configuration:'), error);
    console.log(
      chalk.red.bold(
        '\nCould not find ultradev.config.ts in the current directory. Please make sure the config file exists and try again.\n',
      ),
    );
    throw error;
  }
};

export default getUltraConfig;

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type SpawnOptionsWithoutStdio, spawn } from 'child_process';
import findConfig from 'find-config';
import { DOCKER_CONTAINER_NAME, WORKDIR_NAME } from '../../constants';
import DockerService from '../DockerService';
import FileService from '../FileService';

const fileService = new FileService();

class TesterService {
  async readdirAsync(directory: string): Promise<string[]> {
    let result: string[] = [];

    const files = await fileService.fs.promises.readdir(directory, {
      withFileTypes: true,
    });

    const promises = files.map(async file => {
      const res = fileService.path.resolve(directory, file.name);
      if (file.isDirectory()) {
        result = result.concat(await this.readdirAsync(res));
      } else {
        result.push(res);
      }
    });

    await Promise.all(promises);

    return result;
  }

  async spawnAsync(
    command: string,
    args: string[],
    options: any,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const child = spawn(command, args, options as SpawnOptionsWithoutStdio);

      child.on('error', error => {
        reject(error);
      });

      child.on('exit', code => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`Command ${command} exited with code ${code ?? -1}`),
          );
        }
      });
    });
  }

  async runTests() {
    const config = fileService.getUltraConfig();
    if (!config) {
      throw new Error('ultradev config not found');
    }

    const { tests } = config.directories;

    await fileService.prepareDirectory('cache');
    const files = await this.readdirAsync(tests);

    const filteredFiles = files.filter(file => {
      return fileService.path.basename(file).includes('ultra_test');
    });

    const docker = new DockerService();
    await docker.launch();
    const cwd = process.cwd();

    const absoluteCwd = fileService.path.resolve(cwd);
    const splittedCwd = absoluteCwd.split('/');
    const index = splittedCwd.indexOf(WORKDIR_NAME);
    const pathCwd = splittedCwd.slice(index + 1).join('/');
    const additionalArguments = process.argv.slice(3).join(' ');

    const configPath = findConfig('ultradev.config.ts');
    if (configPath) {
      // Compile the TypeScript file using the TypeScript compiler (tsc)
      const compileCommand = `tsc ${configPath} --module commonjs --outDir cache --moduleResolution node --esModuleInterop true --target es2017 --strict true`;
      await this.spawnAsync('sh', ['-c', compileCommand], {
        stdio: 'inherit',
      });
    } else {
      throw new Error('ultradev config not found');
    }

    await Promise.all(
      filteredFiles.map(async file => {
        try {
          const filePath = file;

          // Check if the file is a TypeScript file
          if (filePath.endsWith('.ts')) {
            // Compile the TypeScript file using the TypeScript compiler (tsc)
            const compileCommand = `tsc ${filePath} --module commonjs --outDir cache --moduleResolution node --esModuleInterop true --target es2017 --strict true`;

            //           const compileCommand = `tsc ${filePath} --module commonjs --outDir cache --moduleResolution node --esModuleInterop true --target es2017`;
            await fileService.spawnAsync(
              'sh',
              ['-c', compileCommand],
              {
                stdio: 'inherit',
              },
              false,
            );
          }
        } catch (error) {
          console.log('error compiling tsc files');
          console.error(error);
        }
      }),
    );

    const command = `docker exec -it -w /opt/${WORKDIR_NAME}/${pathCwd} ${DOCKER_CONTAINER_NAME} ultratest ${additionalArguments}`;

    // Execute the ultratest command and display output in the container terminal
    const child = spawn('sh', ['-c', command], { stdio: 'inherit' });

    // Wait for the ultratest command to complete
    await new Promise(resolve => {
      child.on('exit', () => {
        resolve(1);
      });
      child.on('error', error => {
        console.log('error');
        console.error(error);
        resolve(1);
      });
    });
  }
}

export default TesterService;

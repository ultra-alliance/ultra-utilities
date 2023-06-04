import { spawn } from 'child_process';
import { join, basename, extname } from 'path';
import FileService from '../FileService';
import LogService from '../LogService';

type Directories = {
  contractsDir: string;
  artifactsDir: string;
  includesDir: string;
};

const log = new LogService();
const fileService = new FileService();

class CompilationService {
  successFullCompilation = 0;

  async runCompile(contractPath: string, command: string, args: string[]) {
    const spinner = log.start(
      `Compiling ${fileService.exctractFileName(contractPath)}...`,
    );

    return new Promise((resolve, reject) => {
      const originalCwd = process.cwd(); // Store the original current working directory
      process.chdir(fileService.directoryName(originalCwd)); // Change to the contract's directory

      const child = spawn(command, args);

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data: string) => {
        stdout += data.toString();
      });
      child.stderr.on('data', (data: string) => {
        stderr += data.toString();
      });

      child.on('close', code => {
        process.chdir(originalCwd); // Restore the original current working directory
        spinner.stop();
        if (code === 0) {
          spinner.succeed(
            log.chalk.bold(
              `Successfully compiled ${fileService.exctractFileName(
                contractPath,
              )}\n`,
            ),
          );
          resolve(stdout);
        } else {
          spinner.fail(log.chalk.red(stderr));
          reject(new Error(`Process exited with code ${code ?? -1}`));
        }
      });
    });
  }

  async cloneRepoDir(gitRepo: string, dirPath: string, cloneDir: string) {
    const commands = [
      `git init`,
      `git remote add -f origin ${gitRepo}`,
      `git config core.sparseCheckout true`,
      `echo "${dirPath}" >> .git/info/sparse-checkout`,
      `git pull origin master`,
    ];

    const toResolve = commands.map(async command => {
      const [cmd, ...args] = command.split(' ');
      return this.runCompile(cloneDir, cmd, args);
    });

    await Promise.all(toResolve);
  }

  async compileContractCommand(
    file: string,
    relativePath: string,
    directories: Directories,
  ) {
    const { contractsDir, artifactsDir, includesDir } = directories;
    const contractPath = join(contractsDir, relativePath, file);

    if ((await fileService.isFile(contractPath)) && extname(file) === '.cpp') {
      const contractName = basename(file, '.cpp');
      const wasmPath = join(artifactsDir, relativePath, `${contractName}.wasm`);

      // Check if the .wasm file exists
      const wasmExists = fileService.fileExists(wasmPath);

      // Get the modification time of the .wasm file
      let wasmMTime = 0;
      if (wasmExists) {
        wasmMTime = await fileService.getFileLastUpdateTime(wasmPath);
      }

      const stats = await fileService.getFileStats(contractPath);

      // Skip this file if the .wasm file is newer than the source file
      if (wasmExists && wasmMTime > stats.mtimeMs) {
        log.warn(
          `Contract ${contractName} has not changed since the last compilation, skipping...`,
        );
        return;
      }

      await fileService.prepareDirectory(join(artifactsDir));

      const [command, ...args] = [
        'eosio-cpp',
        '-abigen',
        '-no-missing-ricardian-clause',
        '-contract',
        contractName,
        '-o',
        wasmPath,
        contractPath,
        '-I',
        includesDir,
      ];

      try {
        await this.runCompile(contractPath, command, args);
        this.successFullCompilation++; // Increment the counter when a contract compiles successfully
      } catch (error) {
        const errorSpinner = log.start('');
        errorSpinner.fail(`Error compiling contract ${contractName}.cpp`);
        throw error;
      }
    }
  }

  async processDirectory(relativePath: string, directories: Directories) {
    const { contractsDir, artifactsDir, includesDir } = directories;
    const entries = await fileService.fsp.readdir(
      fileService.path.join(contractsDir, relativePath),
      {
        withFileTypes: true,
      },
    );

    const promises = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        promises.push(
          this.processDirectory(
            fileService.path.join(relativePath, entry.name),
            {
              contractsDir,
              artifactsDir,
              includesDir,
            },
          ),
        );
      } else if (entry.isFile()) {
        promises.push(
          this.compileContractCommand(entry.name, relativePath, {
            contractsDir,
            artifactsDir,
            includesDir,
          }),
        );
      }
    }

    await Promise.all(promises);
  }

  async compileContracts() {
    const {
      sources: contractsDir,
      artifacts: artifactsDir,
      includes: includesDir,
    } = fileService.getDirectoryFiles();
    await fileService.prepareDirectory(artifactsDir);
    try {
      this.successFullCompilation = 0;
      await this.processDirectory('', {
        contractsDir,
        artifactsDir,
        includesDir,
      });
      if (this.successFullCompilation === 0) {
        log.info('Nothing to compile\n');
      } else {
        log.boldSuccess(
          `Successfully compiled ${this.successFullCompilation} contracts\n`,
        );
      }
    } catch (error) {
      log.error('ERRO');
      log.print(error);
    }
  }
}

export default CompilationService;

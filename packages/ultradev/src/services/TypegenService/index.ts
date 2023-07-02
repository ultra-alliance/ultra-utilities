import { type SpawnOptionsWithoutStdio, spawn } from 'child_process';
import findConfig from 'find-config';
import { FileService, LogService } from '..';
import { type ImportContractConfig, type Abi } from '../../types';
import { genAbiToClass } from '../../utils';

const log = new LogService();
const fileService = new FileService();

class TypegenService {
  successfullGenerations = 0;
  generatedFiles: string[] = [];
  contractServices: Record<string, string> = {};

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

  async processABIFile(
    filePath: string,
    importContracts: ImportContractConfig[],
    outdir: string,
  ) {
    const contractName = fileService.path.basename(filePath, '.abi');

    const importedContract = importContracts.find(
      contract => contract.contract === contractName,
    );

    if (!importedContract) {
      log.warn(
        `Contract ${contractName} not found in importContracts config. Skipping...`,
      );
      return;
    }

    const spinner = log.start(`Reading file: ${contractName}.abi`);

    const abiData = fileService.readFile(filePath);
    const contract = JSON.parse(abiData) as Abi;
    contract.name = contractName;
    contract.account = importedContract?.account;

    const serviceClassName =
      contractName.charAt(0).toUpperCase() + contractName.slice(1);
    this.contractServices[contractName] = serviceClassName;
    spinner.start(
      `typing ${contractName}.cpp contract to ${serviceClassName} class `,
    );

    const typings = await genAbiToClass(contract, serviceClassName);

    // Write TypeScript typings to a file in the "typechain" folder
    const typingsFileName = `${serviceClassName}Service.ts`;
    this.generatedFiles.push(typingsFileName.replace('.ts', '')); // We only need the base name without extension
    const typingsFilePath = fileService.joinPaths(outdir, typingsFileName);
    fileService.writeFile(typingsFilePath, typings);

    spinner.succeed(
      `typed ${contractName}.cpp contract to ${serviceClassName}Service class `,
    );
  }

  generateIndexFile(outdir: string) {
    const abiSpinner = log.start(`Generating index exports`);

    const indexFilePath = fileService.joinPaths(outdir, 'index.ts');
    let indexContent = this.generatedFiles
      .map(filename => `export * from './${filename}';`)
      .join('\n');

    indexContent += "\n\n export * from './services';";
    fileService.writeFile(indexFilePath, indexContent);
    abiSpinner.succeed(`Generated index exports`);
  }

  async processFolder(
    importContracts: ImportContractConfig[],
    folderPath: string,
    outdir: string,
  ) {
    const files = fileService.fs.readdirSync(folderPath);

    const promises = files.map(async file => {
      const filePath = fileService.joinPaths(folderPath, file);
      const stats = fileService.fs.statSync(filePath);

      try {
        if (stats.isDirectory()) {
          await this.processFolder(importContracts, filePath, outdir); // Recursively process sub-folders
        } else if (fileService.exctractFileExtension(filePath) === '.abi') {
          await this.processABIFile(filePath, importContracts, outdir);
        }
      } catch (error: unknown) {
        log.boldError('\nError generating contract services.');
        log.print(error);
      }
    });

    await Promise.all(promises);
  }

  generateServicesFile(outdir: string) {
    const abiSpinner = log.start(`Generating services exports`);

    const servicesFilePath = fileService.joinPaths(outdir, 'services.ts');
    const importStatements = `import { ${this.generatedFiles
      .map(filename => `${filename} `)
      .join(',')} } from './index';`;

    const servicesContent = `${importStatements}\n\n\nexport type Services = { ${this.generatedFiles
      .map(filename => {
        this.successfullGenerations++;
        return `${filename
          .split('Service')[0]
          .toLocaleLowerCase()}: ${filename};`;
      })
      .join(' ')} };`;
    fileService.writeFile(servicesFilePath, servicesContent);
    abiSpinner.succeed(`Generated services types`);
  }

  async generateType() {
    log.title('Generating Contracts Services');
    await fileService.prepareDirectory('cache');

    try {
      const path = findConfig('ultradev.config.ts');
      if (path) {
        // Compile the TypeScript file using the TypeScript compiler (tsc)
        const compileCommand = `tsc ${path} --module commonjs --outDir cache --moduleResolution node --esModuleInterop true --target es2017 --strict true`;
        await this.spawnAsync('sh', ['-c', compileCommand], {
          stdio: 'inherit',
        });
      } else {
        throw new Error('ultradev config not found');
      }

      const ultraDevConfig = fileService.getUltraConfig();

      if (!ultraDevConfig) {
        throw new Error('ultradev config not found');
      }

      const { importContracts } = ultraDevConfig.testing;
      const { outdir } = ultraDevConfig.typegen;

      await fileService.prepareDirectory(outdir);
      await this.processFolder(
        importContracts,
        ultraDevConfig.directories.artifacts,
        outdir,
      );
      this.generateIndexFile(outdir);
      this.generateServicesFile(outdir);
      log.boldSuccess(
        `\nGenerated ${this.successfullGenerations} contract services\n`,
      );
    } catch (error: unknown) {
      log.boldError('\nError generating contract services.');
      log.print(error);
    }
  }
}

export default TypegenService;

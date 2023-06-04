/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type SpawnOptionsWithoutStdio,
  spawn,
  spawnSync,
  execSync,
  type ExecSyncOptionsWithBufferEncoding,
  type SpawnSyncOptions,
} from 'child_process';
import fs, { existsSync, readdirSync, statSync } from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { type Stream } from 'stream';
import fse from 'fs-extra';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
import LoggerService from '../LogService';
import { type DirectoriesConfig, type UltraDevConfig } from './../../types';

const log = new LoggerService();

class FileService {
  fs = fs;
  fsp = fsp;
  path = path;

  execCommandAndWait(
    command: string,
    opts: ExecSyncOptionsWithBufferEncoding,
  ): void {
    execSync(command, opts ?? { stdio: 'inherit' });
  }

  pathExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  joinPaths(...paths: string[]): string {
    return path.join(...paths);
  }

  readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  writeFile(filePath: string, data: string): void {
    fs.writeFileSync(filePath, data);
  }

  resolvePath(...paths: string[]): string {
    return path.resolve(...paths);
  }

  deleteFile(filePath: string): void {
    if (!this.pathExists(filePath)) {
      throw new Error(`File ${filePath} does not exist.`);
    }

    fs.unlinkSync(filePath);
  }

  async spawnAsync(
    command: string,
    args: string[],
    options?: any,
    shouldLog = true,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const childProcess = spawn(
        command,
        args,
        options as SpawnOptionsWithoutStdio,
      );

      childProcess.on('error', error => {
        reject(
          new Error(`Failed to start command: ${command}. ${error.message}`),
        );
      });

      childProcess.on('exit', code => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command ${command} exited with code ${code ?? 0}`));
        }
      });

      if (shouldLog) {
        childProcess.stdout?.on('data', (chunk: string) => {
          process.stdout.write(chunk);
        });
      }
    });
  }

  spawnSync(command: string, args: string[], options?: SpawnSyncOptions): void {
    const { error, status } = spawnSync(command, args, options);

    if (error) {
      throw new Error(`Failed to start command: ${command}. ${error.message}`);
    } else if (status !== 0) {
      throw new Error(`Command ${command} exited with code ${status ?? 0}`);
    }
  }

  demuxStream(
    stream: Stream,
    stdout: NodeJS.WritableStream,
    stderr: NodeJS.WritableStream,
  ): void {
    // Demux the stream to process stdout and stderr
    stream.on('data', (chunk: Buffer) => {
      const output = chunk.toString('utf-8');
      // Write to stdout or stderr based on the data received
      if (stdout && stream === (stdout as unknown as Stream)) {
        stdout.write(output);
      } else if (stderr && stream === (stderr as unknown as Stream)) {
        stderr.write(output);
      }
    });
  }

  // get file sin a directory with a condition to be applied on the files
  getFilesInDirectory(
    directoryPath: string,
    condition?: (fileName: string) => boolean,
  ): string[] {
    const files = fs.readdirSync(path.join(__dirname, directoryPath));
    if (!condition) return files;
    return files.filter(condition);
  }

  fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  createDir(directoryPath: string): void {
    fs.mkdirSync(directoryPath);
  }

  copyDir(source: string, destination: string): void {
    fse.copySync(source, destination);
  }

  async isFile(filePath: string): Promise<boolean> {
    const stats = await this.getFileStats(filePath);
    return stats.isFile();
  }

  async getFileStats(filePath: string): Promise<fs.Stats> {
    return fsp.lstat(filePath);
  }

  async getFileLastUpdateTime(filePath: string): Promise<number> {
    const stats = await this.getFileStats(filePath);
    return stats.mtimeMs;
  }

  async prepareDirectory(dirPath: string) {
    try {
      await fsp.access(dirPath);
      await fsp.chmod(dirPath, 0o777); // Set permissions to 777 if the directory already exists
    } catch {
      await fsp.mkdir(dirPath, { recursive: true, mode: 0o777 });
    }
  }

  exctractFileName(filedir: string, withExtension = true) {
    return withExtension
      ? path.basename(filedir)
      : path.basename(filedir, this.exctractFileExtension(filedir));
  }

  exctractFileExtension(filedir: string) {
    return path.extname(filedir);
  }

  directoryName(filedir: string) {
    return path.dirname(filedir);
  }

  getUltraConfig() {
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
        // eslint-disable-next-line no-new-func
        const configFn = new Function('exports', transpiled.outputText);
        config = {};
        configFn(config);
      } else if (fs.existsSync(path.join(projectPath, 'ultradev.config.js'))) {
        // If TypeScript version doesn't exist, check the JavaScript version
        configPath = path.join(projectPath, 'ultradev.config.js');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
        config = require(configPath);
      } else {
        // Throw an error if no config file is found
        throw new Error(
          'No ultradev.config.js/ts found in the current directory.',
        );
      }

      return JSON.parse(JSON.stringify(config.default)) as UltraDevConfig;
    } catch (error: unknown) {
      log.boldError('\nError loading configuration file.');
      if (error instanceof Error) log.lightError(error.message + '\n');
      log.print(error);

      return undefined;
    }
  }

  getDirectoryFiles() {
    const config = this.getUltraConfig();
    if (!config) throw new Error('No config file found');
    const { directories } = config;

    const directions: any = {};

    for (const [key, value] of Object.entries(directories)) {
      directions[key] = this.resolveDirCommand(value);
    }

    return directions as DirectoriesConfig;
  }

  resolveDirCommand(dir: string) {
    return path.resolve(process.cwd(), dir);
  }

  findPath(base: string, name: string): string {
    const items = readdirSync(base);
    for (const item of items) {
      const itemPath = path.join(base, item);
      if (statSync(itemPath).isDirectory()) {
        const wasmPath = path.join(itemPath, `${name}.wasm`);
        if (existsSync(wasmPath)) return itemPath;
        const nested = this.findPath(itemPath, name);
        if (nested) return nested;
      }
    }

    return base;
  }
}

export default FileService;

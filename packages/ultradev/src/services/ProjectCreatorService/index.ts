import axios, { type AxiosResponse } from 'axios';
import { FileService } from '..';
import { eQuestions } from '../../constants';
import { HOME, WORKDIR_NAME } from '../../constants';
import { askQuestion, logRecap } from '../../utils';

import LoggerService from '../LogService';

const log = new LoggerService();
const fileService = new FileService();

class ProjectCreator {
  type: string;
  name: string;
  language: string;

  constructor() {
    this.type = '';
    this.name = '';
    this.language = '';
  }

  checkEosioCppInstallation(): boolean {
    try {
      fileService.spawnSync('eosio-cpp', ['--version']);
      return true;
    } catch (error) {
      return false;
    }
  }

  async askProjectType() {
    const { type } = await askQuestion(eQuestions.ASK_PROJECT_TYPE);

    if (type === 'contracts' && !this.checkEosioCppInstallation()) {
      log.boldError(
        '\nPlease install eosio-cpp before creating a smart-contract project.\n',
      );
      log.error(
        '\n\thttps://developers.eos.io/welcome/latest/getting-started-guide/local-development-environment/installing-eosiocdt\n',
      );
      return false;
    }

    if (type === 'quit') {
      log.boldError('\nAborting project creation...\n');
      return false;
    }

    this.type = type;
    return true;
  }

  async askProjectName() {
    let { name }: { name: string } = await askQuestion(
      eQuestions.ASK_PROJECT_NAME,
    );
    if (!name) name = `my-ultra-${this.type}`;
    this.name = name;
  }

  async askProjectLanguage() {
    const { language } = await askQuestion(eQuestions.ASK_PROJECT_LANGUAGE);
    this.language = language;
  }

  async confirmProjectCreation() {
    logRecap({
      title: 'PROJECT RECAP',
      data: [
        { title: 'type', value: this.type },
        { title: 'name', value: this.name },
        { title: 'language', value: this.language },
      ],
    });

    const { confirmation } = await askQuestion(eQuestions.ASK_CONFIRMATION);
    if (!confirmation) {
      log.boldError('\nAborting project creation...\n');
      return false;
    }

    return true;
  }

  checkProjectDirectory() {
    // Check if directory already exists and if so, append a number to the name
    let directoryName = this.name;
    let counter = 1;
    const projectRootDir = `${HOME}/${WORKDIR_NAME}`; // Construct the project root directory path

    while (
      fileService.fileExists(
        fileService.joinPaths(projectRootDir, directoryName),
      )
    ) {
      directoryName = `${this.name}_${counter}`;
      counter++;
    }

    return directoryName;
  }

  async createDirectory(directoryName: string) {
    // Create the directory
    const projectRootDir = `${HOME}/${WORKDIR_NAME}`; // Construct the project root directory path
    const projectDir = fileService.joinPaths(projectRootDir, directoryName);
    fileService.createDir(projectDir);

    if (this.language === 'typescript') {
      const repo = 'ultra-alliance/uos-examples';
      const path = 'contracts/typescript';
      const url = `https://api.github.com/repos/${repo}/contents/${path}`;
      log.print('\n');

      const spinner = log.start(
        "Fetching files from 'ultra-alliance/uos-examples'...",
      );
      try {
        await this.fetchAndWriteFiles(url, projectDir);
        spinner.succeed();
      } catch (err) {
        spinner.fail(
          "Failed to fetch files from 'ultra-alliance/uos-examples'",
        );
        console.error(err);
      }
    }

    // Run npm install or yarn install in the project directory after all files are fetched and written
    if (this.language === 'javascript' || this.language === 'typescript') {
      const spinnerDeps = log.start('Installing project dependencies...');
      try {
        fileService.spawnSync('npm', ['install'], {
          cwd: projectDir, // execute the command in the project directory
          stdio: 'inherit', // this will allow the command output to be printed to the console
        });
        spinnerDeps.succeed('Project dependencies installed successfully.');
      } catch (err) {
        spinnerDeps.fail('Failed to install project dependencies.');
        console.error(err);
      }
    }

    log.boldSuccess(
      `\n${
        this.language.charAt(0).toUpperCase() + this.language.slice(1)
      } project created.`,
    );

    log.info(`Run the following command to go inside the directory:`);
    log.boldBlue(`\n\tcd ${projectDir}\n`);
  }

  async fetchAndWriteFiles(url: string, projectDir: string) {
    try {
      const response: AxiosResponse = await axios.get(url);

      if (!Array.isArray(response.data)) {
        console.error(`Unexpected response data from: ${url}`);
        return;
      }

      await Promise.all(
        response.data.map(
          async (file: {
            type: string;
            name: string;
            content: string;
            url: string;
            download_url: string;
          }) => {
            if (file.type === 'file') {
              let fileContent: string | null = null;
              try {
                if (file.content) {
                  fileContent = Buffer.from(file.content, 'base64').toString(
                    'utf8',
                  );
                } else if (file.download_url) {
                  const downloadResponse = await axios.get(file.download_url, {
                    responseType: 'text',
                  });
                  fileContent = downloadResponse.data as string;
                }
              } catch (error) {
                console.error(
                  `Failed to fetch file content from: ${file.download_url}`,
                  error,
                );
                return;
              }

              if (fileContent !== null) {
                const filePath = fileService.joinPaths(projectDir, file.name);
                try {
                  fileService.writeFile(filePath, fileContent);
                } catch (error) {
                  console.error(`Failed to write file: ${filePath}`, error);
                }
              }
            } else if (file.type === 'dir') {
              const newDir = fileService.joinPaths(projectDir, file.name);
              fileService.fs.mkdirSync(newDir, { recursive: true });
              await this.fetchAndWriteFiles(file.url, newDir);
            }
          },
        ),
      );
    } catch (error) {
      console.error(`Failed to fetch files from: ${url}`, error);
    }
  }

  async create() {
    if (!(await this.askProjectType())) return;
    await this.askProjectName();
    await this.askProjectLanguage();
    if (!(await this.confirmProjectCreation())) return;
    const directoryName = this.checkProjectDirectory();
    await this.createDirectory(directoryName);
  }
}

export default ProjectCreator;

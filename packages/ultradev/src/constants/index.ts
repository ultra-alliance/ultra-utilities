import { type Question } from '../types/cli';

export const HOST = 'http://127.0.0.1';
export const DOCKER_PORT = 2375;
export const OPERATING_SYSTEM = process.platform;
export const IS_LINUX = OPERATING_SYSTEM !== 'win32';
export const DOCKER_CONTAINER_NAME = 'ultra-dev';
export const DOCKER_IMAGE_NAME = 'quay.io/ultra.io/3rdparty-devtools:latest';
export const HOME = String(process.env.HOME);
export const WORKDIR_NAME = 'workdir';
export const STDIN = process.stdin;

export enum eQuestions {
  ASK_PROJECT_TYPE = 'ASK_PROJECT_TYPE',
  ASK_PROJECT_NAME = 'ASK_PROJECT_NAME',
  ASK_PROJECT_LANGUAGE = 'ASK_PROJECT_LANGUAGE',
  ASK_CONFIRMATION = 'ASK_CONFIRMATION',
}

export const QUESTIONS: Record<eQuestions, Question> = {
  [eQuestions.ASK_PROJECT_TYPE]: {
    type: 'list',
    name: 'type',
    message: 'What do you want to do?',
    choices: [
      {
        name: 'Create a smart-contract project',
        value: 'contracts',
      },
      {
        name: 'Create a client-side project',
        value: 'client',
      },
      {
        name: 'Create a server-side project',
        value: 'server',
      },
      {
        name: 'Quit',
        value: 'quit',
      },
    ],
  },

  [eQuestions.ASK_PROJECT_NAME]: {
    type: 'input',
    name: 'name',
    message: 'What is the name of your project?',
  },

  [eQuestions.ASK_PROJECT_LANGUAGE]: {
    type: 'list',
    name: 'language',
    message: 'With what language do you want to test your contracts?',
    choices: [
      {
        name: 'TypeScript (recommended)',
        value: 'typescript',
      },
      {
        name: 'JavaScript',
        value: 'javascript',
      },
    ],
  },
  [eQuestions.ASK_CONFIRMATION]: {
    type: 'confirm',
    name: 'confirmation',
    message: 'Are you sure?',
  },
};

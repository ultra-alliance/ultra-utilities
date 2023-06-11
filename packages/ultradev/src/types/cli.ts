/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type FileService,
  type DockerService,
  type LogService,
} from '../services';

export type CommandOption = {
  flags: string;
  description: string;
  defaultValue?: string | boolean | string[];
};

export type Services = {
  fileService: FileService;
  dockerService: DockerService;
  logService: LogService;
};

export type CommandProps = {
  name: string;
  args?: string;
  title?: string;
  description: string;
  options?: CommandOption[];
  action: (...args: any[]) => void | Promise<void>;
};

export type Choice = {
  name: string;
  value: any; // Value could be any type, you can replace 'any' with the actual type if known
  action?: () => Promise<void>;
};

export type Question = {
  type: string;
  name: string;
  message: string;
  choices?: Choice[];
};

export type Struct = {
  name: string;
  fields: Array<{ name: string; type: string }>;
};

export type Action = {
  name: string;
  type: string;
};

export type Table = {
  name: string;
  type: string;
};

export type Abi = {
  structs: Struct[];
  actions: Action[];
  tables: Table[];
  name?: string;
};

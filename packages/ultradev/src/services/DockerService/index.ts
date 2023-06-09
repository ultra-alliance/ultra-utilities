// import fs from 'fs';
import { type Stream } from 'stream';
import Docker from 'dockerode';
// import { ncp } from 'ncp';
// import tar from 'tar-fs';
import {
  DEV_PACKAGE,
  DOCKER_CONTAINER_NAME,
  DOCKER_IMAGE_NAME,
  DOCKER_PORT,
  HOME,
  HOST,
  PATH_TO_ULTRADEV,
  STDIN,
  WORKDIR_NAME,
} from '../../constants';
import FileService from '../FileService';
import LogService from '../LogService';

const log = new LogService();
const DOCKER_SOCKET_PATH = '/var/run/docker.sock';

class DockerService extends FileService {
  docker: Docker;
  container: Docker.Container | null;

  constructor(private readonly containerName: string = DOCKER_CONTAINER_NAME) {
    super();
    this.docker = this.getDockerInstance();
    this.container = null;
  }

  async getContainer(
    containerName: string = this.containerName,
  ): Promise<Docker.Container | null> {
    try {
      const containers = await this.docker.listContainers({ all: true }); // List all containers, not just running ones
      const containerInfo = containers.find(container =>
        container.Names.includes('/' + containerName),
      );

      if (containerInfo) {
        this.container = this.docker.getContainer(containerInfo.Id);
      } else {
        log.info(`Container not found, creating a new one...`);
        this.container = await this.createContainer(containerName);
      }
    } catch (err) {
      log.error(`Failed to get container: ${containerName}`);
      this.container = null;
    }

    return this.container;
  }

  async createContainer(
    containerName: string,
    imageName: string = DOCKER_IMAGE_NAME,
  ): Promise<Docker.Container> {
    let container: Docker.Container;
    const customWorkdir = `/opt/${WORKDIR_NAME}`;

    try {
      const Binds = [`${HOME}/${WORKDIR_NAME}:${customWorkdir}`];

      if (DEV_PACKAGE && PATH_TO_ULTRADEV !== undefined) {
        // Replace the absolute host path with the container path where the host path is being mounted
        // const path = `${PATH_TO_ULTRADEV}:${PATH_TO_ULTRADEV}`;
        // Binds.push(path);
        // Binds.push(
        //   '/Users/oscarmac/Desktop/ultra-alliance/prod/ultra-utilities:/Users/oscarmac/Desktop/ultra-alliance/prod/ultra-utilities',
        // );
      }

      container = await this.docker.createContainer({
        name: containerName,
        Image: imageName,
        ExposedPorts: {
          '8888/tcp': {},
          '9876/tcp': {},
        },
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Cmd: ['/bin/bash', '-c', 'tail -f /dev/null'],
        OpenStdin: false,
        StdinOnce: false,
        Volumes: {},
        HostConfig: {
          Binds,
          PortBindings: {
            '8888/tcp': [{ HostPort: '8888' }],
            '9876/tcp': [{ HostPort: '9876' }],
          },
        },
        Env: [],
      });

      // const packagePath = '/usr/local/lib/node_modules/@ultra-alliance';
      // const tempDir = this.joinPaths(
      //   '/usr/local/lib/node_modules/@ultra-alliance',
      //   'tempDir',
      // );

      // // Resolve symlinks and copy files to a new temporary directory
      // ncp.ncp(packagePath, tempDir, { dereference: true }, async err => {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }

      //   const containerPackagePath =
      //     '/usr/local/lib/node_modules/@ultra-alliance';

      //   // Pack the directory into a tar stream
      //   const tarStream = tar.pack(tempDir);

      //   // Upload the tar stream to the container
      //   await this.docker.getContainer(containerName).putArchive(tarStream, {
      //     path: containerPackagePath,
      //   });

      //   // Clean up: Delete the temporary directory after the tar file has been created and uploaded
      //   fs.rmdirSync(tempDir, { recursive: true });
      // });

      // copy file to container

      // await container.exec({
      //   Cmd: ['pwd'],
      //   AttachStdout: true,
      //   AttachStderr: true,
      // });
    } catch (err) {
      console.log(err);
      throw err;
    }

    return container;
  }

  async isDockerInstalled(): Promise<boolean> {
    try {
      await this.spawnAsync('docker', ['--version'], undefined, false);
      return true;
    } catch (err) {
      return false;
    }
  }

  async isDockerStarted(): Promise<boolean> {
    try {
      await this.docker.ping();
      return true;
    } catch (err) {
      return false;
    }
  }

  async hasImage(imageName: string = DOCKER_IMAGE_NAME): Promise<boolean> {
    try {
      await this.docker.getImage(imageName).inspect();
      return true;
    } catch (err) {
      return false;
    }
  }

  async loginQuay(): Promise<boolean> {
    try {
      // execute cmd `docker login`
      await this.spawnAsync('docker', ['login'], undefined);

      // await this.docker.checkAuth({
      //   username,
      //   password,
      //   email,
      //   serveraddress: 'https://quay.io/v1/',
      // });
      return true;
    } catch (err) {
      return false;
    }
  }

  async pullImage(name: string = DOCKER_IMAGE_NAME): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      void this.docker.pull(name, (err: unknown, stream: Stream) => {
        if (err) {
          reject(err);
          return;
        }

        this.docker.modem.followProgress(stream, (err: unknown) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        });
      });
    });
  }

  async isContainerRunning(): Promise<boolean | undefined> {
    try {
      if (!this.container) return undefined;
      const containerInfo = await this.container.inspect();
      return containerInfo.State.Running;
    } catch (err) {
      return undefined;
    }
  }

  async findContainerByName(
    containerName: string,
  ): Promise<Docker.Container | null> {
    const containers = await this.docker.listContainers();
    const containerInfo = containers.find(container =>
      container.Names.some(name => name === '/' + containerName),
    );

    return containerInfo
      ? this.docker.getContainer(containerInfo.Id)
      : this.getContainer();
  }

  async launch(): Promise<void> {
    const spinner = log.spin('Checking Docker');

    if (!(await this.isDockerInstalled())) {
      spinner.fail(
        'Docker is not installed! Please install Docker and try again.',
      );
      return;
    }

    const isDockerStarted = await this.isDockerStarted();
    if (!isDockerStarted) {
      spinner.fail('Docker is not running! Please start Docker and try again.');
      return;
    }

    spinner.text =
      'Docker is running. Checking for the right Docker container...';

    this.container = await this.getContainer(this.containerName);

    if (!this.container) {
      const hasImage = await this.hasImage();
      switch (hasImage) {
        case true:
          spinner.text = 'Starting a new Docker container...';
          this.container = await this.startContainer();
          spinner.succeed('Docker Container started!');
          break;

        case false:
          spinner.text = 'Logging into Docker...';
          if (await this.loginQuay()) {
            spinner.text = 'Pulling Docker image...';
            await this.pullImage();
            spinner.text = 'Starting a new Docker container...';
            this.container = await this.startContainer();
            spinner.succeed('Docker Container started!');
          } else {
            spinner.fail('Failed to log into Docker!');
          }

          break;

        default:
          spinner.fail('Failed to check if Docker image exists!');
      }
    } else if (await this.isContainerRunning()) {
      spinner.clear();
    } else {
      spinner.text = 'Starting the Docker container...';
      await this.container.start();
      spinner.clear();
    }
  }

  async startContainer(
    imageName: string = DOCKER_IMAGE_NAME,
  ): Promise<Docker.Container> {
    let container: Docker.Container;
    const customWorkdir = `/opt/${WORKDIR_NAME}`;

    try {
      container = await this.docker.createContainer({
        Image: imageName,
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Cmd: ['/bin/bash', '-c', 'tail -f /dev/null'],
        OpenStdin: false,
        StdinOnce: false,
        HostConfig: {
          Binds: [`${HOME}/${WORKDIR_NAME}:${customWorkdir}`],
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }

    await container.start();
    return container;
  }

  async stopContainer(container: Docker.Container): Promise<unknown> {
    return container.stop();
  }

  async executeCommand(cmd: string[]): Promise<void> {
    if (!this.container) {
      throw new Error('Container is undefined');
    }

    const exec = await this.container.exec({
      Cmd: cmd,
      AttachStdout: true,
      AttachStderr: true,
    });

    await new Promise<void>((resolve, reject) => {
      exec.start({ hijack: true, stdin: true }, async err => {
        if (err) {
          reject(err);
          return;
        }

        if (!this.container) {
          reject(Error('Container is undefined'));
          return;
        }

        this.container.attach(
          { stream: true, stdout: true, stderr: true, hijack: true },
          async (err, stream) => {
            if (err) {
              reject(err);
              return;
            }

            if (!stream) {
              reject(Error('Stream is undefined'));
              return;
            }

            if (!this.docker.modem.demuxStream) {
              reject(Error('Modem is undefined'));
              return;
            }

            this.demuxStream(stream, process.stdout, process.stderr);
            stream.on('end', resolve);
          },
        );
      });
    });
  }

  async attachContainer(): Promise<void> {
    if (!this.container) {
      throw new Error('Container is undefined');
    }

    const exec = await this.container.exec({
      Cmd: ['/bin/bash', '-c', `cd ${WORKDIR_NAME} && /bin/bash`],
      AttachStdout: true,
      AttachStderr: true,
      AttachStdin: true,
      Tty: true,
    });

    const stream = await exec.start({ hijack: true, stdin: true });
    const stdin = STDIN;

    stdin.setRawMode(true);
    stdin.resume();

    stdin.pipe(stream);

    this.docker.modem.demuxStream(stream, process.stdout, process.stderr);

    stream.on('end', () => {
      stdin.setRawMode(false);
      stdin.pause();

      log.print('\n');
      log.info(
        `Docker Image is potentially still running with name ${DOCKER_CONTAINER_NAME}`,
      );
      log.italicBlue('To stop the container run:');
      log.boldBlue('ultradev close\n');

      process.exit();
    });

    process.on('SIGINT', () => {
      stream.end('\x03'); // this is the signal for SIGINT
    });
  }

  getPathToProject(): string {
    const cwd = process.cwd();
    const absoluteCwd = this.path.resolve(cwd);
    const splittedCwd = absoluteCwd.split('/');
    const index = splittedCwd.indexOf(WORKDIR_NAME);
    const pathCwd = splittedCwd.slice(index + 1).join('/');
    return pathCwd;
  }

  async runCommand(cmd: string, log = true): Promise<void> {
    const pathCwd = this.getPathToProject();
    const command = `docker exec -it -w /opt/${WORKDIR_NAME}/${pathCwd} ${DOCKER_CONTAINER_NAME} ${cmd}`;

    // Execute the ultratest command and display output in the container terminal
    const child = this.spawn('sh', ['-c', command], {
      stdio: log ? 'inherit' : 'ignore',
    });

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

  private getDockerInstance(): Docker {
    return this.pathExists(DOCKER_SOCKET_PATH)
      ? new Docker({ socketPath: DOCKER_SOCKET_PATH })
      : new Docker({ host: HOST, port: DOCKER_PORT });
  }
}

export default DockerService;

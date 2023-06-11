import { DockerService, LogService } from '../services';
import { type CommandProps } from '../types/cli';
const log = new LogService();

const runCommand: CommandProps = {
  name: 'run',
  args: '<scripts/path>',
  description: 'Run a script to the configured chain',
  options: [],
  async action(args: string) {
    log.title('Running Scripts');
    const dockerService = new DockerService();
    await dockerService.launch();
    const spinner = log.start('Checking existing chain...');
    try {
      await dockerService.runCommand('cleos get info', false);
      spinner.succeed('Chain already running');
    } catch (e) {
      spinner.start('Starting Chain...');
      await dockerService.runCommand('ultratest -D');
      spinner.succeed('Chain started');
    }

    const child = dockerService.spawn(
      'sh',
      [
        '-c',
        `tsc ${args} --module commonjs --outDir cache --moduleResolution node --esModuleInterop true --target es2017 --strict true --lib dom`,
      ],
      {
        stdio: log ? 'inherit' : 'ignore',
      },
    );

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
    log.boldSuccess('\n' + args + '\n');
    await dockerService.runCommand(`node cache/${args.replace('.ts', '.js')}`);
    log.print('\n');
  },
};

export default runCommand;

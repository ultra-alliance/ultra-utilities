import { DockerService, LogService } from '../services';
import { type CommandProps } from '../types/cli';
const log = new LogService();

const closeCommand: CommandProps = {
  name: 'close',
  description: 'Close the Ultra container',
  options: [],
  async action() {
    log.title('Closing container');
    const dockerService = new DockerService();
    const container = await dockerService.getContainer();
    if (container === null) {
      log.info('No container to close');
      return;
    }

    const spinner = log.start('Stopping container');
    try {
      await dockerService.stopContainer(container);
    } catch (e) {}

    spinner.succeed('Container stopped\n');
  },
};

export default closeCommand;

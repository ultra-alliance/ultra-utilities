import { DockerService, LogService } from '../services';
import { type CommandProps } from '../types/cli';
const log = new LogService();

const startCommand: CommandProps = {
  name: 'start',
  description: 'Start the Ultra dev container',
  options: [],
  async action() {
    log.title('Starting Ultra Container');
    const dockerService = new DockerService();
    await dockerService.launch();
    log.info('Enter "ultradev close" to stop the container\n');
  },
};

export default startCommand;

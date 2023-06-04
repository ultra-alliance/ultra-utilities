import { DockerService, LogService } from '../services';
import { type CommandProps } from '../types/cli';
const log = new LogService();

const attachCommand: CommandProps = {
  name: 'attach',
  description: 'Attach shell to the ultra dev container',
  options: [],
  async action() {
    log.title('Attaching to container');
    log.info('Enter "exit" to exit the container\n');
    const dockerService = new DockerService();
    await dockerService.launch();
    await dockerService.attachContainer();
  },
};

export default attachCommand;

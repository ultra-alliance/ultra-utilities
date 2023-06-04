import { LogService, TesterService, TypegenService } from '../services';
import CompilationService from '../services/CompilationService';
import { type CommandProps } from '../types/cli';

const log = new LogService();

const startCommand: CommandProps = {
  name: 'test',
  description: 'Run the tests for the project contracts',
  options: [
    {
      flags: '-D, --dont-close',
      description: "Don't close the node after the tests are finished",
    },
    {
      flags: '-l, --logging',
      description: 'Show the nodeos logs in the console',
    },
  ],
  async action() {
    const typgenService = new TypegenService();
    const compilationService = new CompilationService();
    const testerService = new TesterService();
    try {
      log.title('Compiling project contracts');
      await compilationService.compileContracts();
      await typgenService.generateType();
      log.title('Running Ultra Tests');
      await testerService.runTests();
    } catch (e) {
      log.print(e);
    }
  },
};

export default startCommand;

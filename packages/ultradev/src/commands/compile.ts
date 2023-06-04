import { LogService } from '../services';
import CompilationService from '../services/CompilationService';
import { type CommandProps } from '../types/cli';

const log = new LogService();

const compileCommand: CommandProps = {
  name: 'compile',
  description: 'Compile the project smart contracts',
  options: [],
  async action() {
    log.title('Compiling project contracts');
    const compilationService = new CompilationService();
    await compilationService.compileContracts();
  },
};

export default compileCommand;

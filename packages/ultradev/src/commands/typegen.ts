import { LogService, TypegenService } from '../services';
import CompilationService from '../services/CompilationService';
import { type CommandProps } from '../types/cli';

const log = new LogService();

const startCommand: CommandProps = {
  name: 'typegen',
  description: 'Generate typescript typed services from abi',
  options: [],
  async action() {
    const typgenService = new TypegenService();
    const compilationService = new CompilationService();
    try {
      log.title('Compiling project contracts');
      await compilationService.compileContracts();
      await typgenService.generateType();
    } catch (e) {
      log.print(e);
    }
  },
};

export default startCommand;

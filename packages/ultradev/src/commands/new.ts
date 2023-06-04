import { LogService, ProjectCreatorService } from '../services';
import { type CommandProps } from '../types/cli';

const log = new LogService();

const newCommand: CommandProps = {
  name: 'new',
  description: 'Create a new Ultra project',
  options: [],
  async action() {
    log.title('Creating new Ultra project');
    const projectCreator = new ProjectCreatorService();
    if (!(await projectCreator.askProjectType())) return;
    await projectCreator.askProjectName();
    await projectCreator.askProjectLanguage();
    if (!(await projectCreator.confirmProjectCreation())) return;
    const directoryName = projectCreator.checkProjectDirectory();
    await projectCreator.createDirectory(directoryName);
  },
};

export default newCommand;

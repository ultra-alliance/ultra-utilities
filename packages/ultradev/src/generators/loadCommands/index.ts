import { type Command } from 'commander';
import { FileService } from '../../services';
import { type CommandProps } from '../../types/cli';

const fileService = new FileService();

export default async function loadCommands(program: Command) {
  const commandsDir = fileService.joinPaths('../../commands');
  const commandFiles = fileService.getFilesInDirectory(commandsDir);

  const commandPromises = commandFiles.map(async file => {
    const commandPath = fileService.joinPaths(commandsDir, file);
    const commandModule = (await import(commandPath)).default as CommandProps;

    program
      .command(commandModule.name)
      .description(commandModule.description)
      .action(async opts => {
        await commandModule.action(opts);
      });
  });

  await Promise.all(commandPromises);

  program.parse(process.argv);
}

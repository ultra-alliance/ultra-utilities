import { type Command } from 'commander';
import { FileService } from '../../services';
import { type CommandProps } from '../../types/cli';

const fileService = new FileService();

export default async function loadCommands(program: Command) {
  const commandsDir = fileService.joinPaths('../../commands');
  const commandFiles = fileService
    .getFilesInDirectory(commandsDir)
    .filter(file => file.endsWith('.js'));

  const commandPromises = commandFiles.map(async file => {
    const commandPath = fileService.joinPaths(commandsDir, file);
    const commandModule = (await import(commandPath)).default as CommandProps;

    const command = program
      .createCommand(commandModule.name)
      .description(commandModule.description);

    if (commandModule.args) {
      command.arguments(commandModule.args);
    }

    if (commandModule.options) {
      commandModule.options.forEach(option => {
        command.option(option.flags, option.description);
      });
    }

    command.action(async opts => {
      await commandModule.action(opts);
    });

    program.addCommand(command);
  });

  await Promise.all(commandPromises);

  program.parse(process.argv);
}

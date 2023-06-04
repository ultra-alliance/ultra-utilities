import { Command } from 'commander';
import { type LogService } from '../../services';

export default function loadProgram(log: LogService): Command {
  const program = new Command();
  program.version('0.0.1');
  program.name(log.ultra('ultradev'));
  program.usage(log.chalk.bold.italic('<command> [options]'));
  program.description(log.ultraBg('Version 0.0.1'));
  program.helpOption('--help', 'Display help for command');
  return program;
}

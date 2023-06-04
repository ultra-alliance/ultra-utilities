import { LogService, FileService } from '../services';
import { type CommandProps } from '../types/cli';
const log = new LogService();
const fileService = new FileService();

const cleanCommand: CommandProps = {
  name: 'clean',
  description: 'Clean artifacts, cache, types etc',
  options: [],
  async action() {
    log.title('Cleaning Projects');
    const spinner = log.start('Cleaning artifacts, cache, etc...');
    const config = fileService.getUltraConfig();
    if (!config) {
      spinner.fail('No ultradev config found');
      return;
    }

    const files = [
      './cache',
      config.typegen.outdir,
      config.directories.artifacts,
    ];

    const promises = files.map(async file => {
      if (fileService.fileExists(file)) {
        try {
          await fileService.fsp.rm(file, {
            recursive: true,
          });
        } catch (e) {
          log.error('Error cleaning file at: ' + file);
        }
      }
    });

    await Promise.all(promises);
    spinner.succeed('Cleaned artifacts, cache, etc...');
    log.print('\n');
  },
};

export default cleanCommand;
